import { mat4, vec3 } from 'gl-matrix';
import axios from '../libs/axios.min.js';
import { glTF } from './gltf.js';
import { gltfLoader } from './gltf_loader/loader.js';
import { gltfModelPathProvider } from './gltf_loader/model_path_provider.js';
import { gltfRenderer } from './renderer.js';
import { gltfRenderingParameters, Environments, UserCameraIndex } from './rendering_parameters.js';
import { UserCamera } from './user_camera.js';
import { jsToGl, getIsGlb, Timer, getContainingFolder } from './gltf_loader/utils.js';
import { GlbParser } from './gltf_loader/glb_parser.js';
import { gltfEnvironmentLoader } from './gltf_loader/environment.js';
import { getScaleFactor, computePrimitiveCentroids } from './gltf_loader/gltf_utils.js';




class gameObject
{
    constructor(
        canvas,
        modelIndex,
        input)
    {
        this.onRendererReady = undefined;
        this.initialModel = "map";

        this.canvas = canvas;
        this.canvas.style.cursor = "grab";

        this.gltf = undefined;

        this.scaledSceneIndex = 0;
        this.scaledGltfChanged = true;
        this.sceneScaleFactor = 1;

        this.renderingParameters = new gltfRenderingParameters();
        this.userCamera = new UserCamera(this);
        this.currentlyRendering = false;
        this.renderer = new gltfRenderer(canvas, this.userCamera, this.renderingParameters);






        this.setupInputBindings(input);

        const self = this;
        this.pathProvider = new gltfModelPathProvider( modelIndex);
        this.pathProvider.initialize().then(() =>
        {
            self.loadFromPath(self.pathProvider.resolve(self.initialModel),undefined);
        });

        this.render(); // Starts a rendering loop.
    }



    setCamera(eye = [0.0, 0.0, 0.05], target = [0.0, 0.0, 0.0], up = [0.0, 1.0, 0.0],
        type = "perspective",
        znear = 0.01, zfar = 10000.0,
        yfov = 45.0 * Math.PI / 180.0, aspectRatio = 16.0 / 9.0,
        xmag = 1.0, ymag = 1.0)
    {
        this.renderingParameters.cameraIndex = UserCameraIndex; // force use default camera

        this.userCamera.target = jsToGl(target);
        this.userCamera.up = jsToGl(up);
        this.userCamera.position = jsToGl(eye);
        this.userCamera.type = type;
        this.userCamera.znear = znear;
        this.userCamera.zfar = zfar;
        this.userCamera.yfov = yfov;
        this.userCamera.aspectRatio = aspectRatio;
        this.userCamera.xmag = xmag;
        this.userCamera.ymag = ymag;
    }

    setAnimation(animationIndex = 'all', play = false, timeInSec = undefined)
    {
        this.renderingParameters.animationIndex = animationIndex;
        if(timeInSec !== undefined)
        {
            this.renderingParameters.animationTimer.setFixedTime(timeInSec);
        }
        else if(play)
        {
            this.renderingParameters.animationTimer.start();
        }
    }


    setupInputBindings(input)
    {
        const self = this;
        input.onRotate = (deltaX, deltaY) =>
        {
            if (this.renderingParameters.userCameraActive())
            {
                this.userCamera.rotate(deltaX, deltaY);
            }
        };
        input.onZoom = (delta) =>
        {
            if (this.renderingParameters.userCameraActive())
            {
                this.userCamera.zoomIn(delta);
            }
        };
        input.onResetCamera = () =>
        {
            if (this.renderingParameters.userCameraActive())
            {
                self.userCamera.reset(self.gltf, self.renderingParameters.sceneIndex);
            }
        };

    }


    loadFromPath(gltfFile)
    {


        this.notifyLoadingStarted(gltfFile);


        const self = this;
        return axios.get(gltfFile, { responseType:  "json" }).then(function(response)
        {
            let json = response.data;
            let buffers = undefined;
            return self.createGltf(gltfFile, json, buffers);
        }).catch(function(error)
        {
            console.error(error.stack);
            self.hideSpinner();
        });
    }

    createGltf(path, json, buffers)
    {
        this.currentlyRendering = false;

        // unload previous scene
        if (this.gltf !== undefined)
        {
            gltfLoader.unload(this.gltf);
            this.gltf = undefined;
        }

        const gltf = new glTF(path, this);
        gltf.fromJson(json);

        this.injectEnvironment(gltf);

        const self = this;
        return gltfLoader.load(gltf, buffers)
            .then(() => self.startRendering(gltf));
    }

    injectEnvironment(gltf)
    {
        // this is hacky, because we inject stuff into the gltf

        // because the environment loader adds images with paths that are not relative
        // to the gltf, we have to resolve all image paths before that
        for (const image of gltf.images)
        {
            image.resolveRelativePath(getContainingFolder(gltf.path));
        }

        const environment = Environments[this.renderingParameters.environmentName];
        new gltfEnvironmentLoader().addEnvironmentMap(gltf, environment);
    }

    startRendering(gltf)
    {
        this.notifyLoadingEnded(gltf.path);

        if (gltf.scenes.length === 0)
        {
            throw "No scenes in the gltf";
        }

        this.renderingParameters.cameraIndex = UserCameraIndex;
        this.renderingParameters.sceneIndex = gltf.scene ? gltf.scene : 0;
        this.renderingParameters.animationTimer.reset();
        this.renderingParameters.animationIndex = "all";


        this.gltf = gltf;
        this.currentlyRendering = true;
        this.scaledGltfChanged = true;

        this.prepareSceneForRendering(gltf);
        this.userCamera.fitViewToScene(gltf, this.renderingParameters.sceneIndex);

        computePrimitiveCentroids(gltf);
    }

    render()
    {
        const self = this;
        function renderFrame()
        {




            if (self.currentlyRendering)
            {
                self.prepareSceneForRendering(self.gltf);

                self.renderer.resize(self.canvas.clientWidth, self.canvas.clientHeight);
                self.renderer.newFrame();

                if (self.gltf.scenes.length !== 0)
                {
                    self.userCamera.updatePosition();

                    const scene = self.gltf.scenes[self.renderingParameters.sceneIndex];

                    // Check if scene contains transparent primitives.

                    const nodes = scene.gatherNodes(self.gltf);

                    const alphaModes = nodes
                        .filter(n => n.mesh !== undefined) //return only defined ones
                        .reduce((acc, n) => acc.concat(self.gltf.meshes[n.mesh].primitives), [])
                        .map(p => self.gltf.materials[p.material].alphaMode); //create new array

                    let hasBlendPrimitives = false;
                    for(const alphaMode of alphaModes)
                    {
                        if(alphaMode === "BLEND")
                        {
                            hasBlendPrimitives = true;
                            break;
                        }
                    }

                    if(hasBlendPrimitives)
                    {
                        // Draw all opaque and masked primitives. Depth sort is not yet required.
                        self.renderer.drawScene(self.gltf, scene, false, primitive => self.gltf.materials[primitive.material].alphaMode !== "BLEND");

                        // Draw all transparent primitives. Depth sort is required.
                        self.renderer.drawScene(self.gltf, scene, true, primitive => self.gltf.materials[primitive.material].alphaMode === "BLEND");
                    }
                    else
                    {
                        // Simply draw all primitives.
                        self.renderer.drawScene(self.gltf, scene, false);
                    }
                }

                if (self.onRendererReady)
                {
                    self.onRendererReady();
                }
            }


            window.requestAnimationFrame(renderFrame);
        }

        // After this start executing render loop.
        window.requestAnimationFrame(renderFrame);
    }

    prepareSceneForRendering(gltf )
    {
        const scene = gltf.scenes[this.renderingParameters.sceneIndex];

        gltf.update();


        scene.applyTransformHierarchy(gltf);

        const transform = mat4.create();

        let scaled = false;
        if (this.renderingParameters.userCameraActive() && (this.scaledGltfChanged || this.scaledSceneIndex !== this.renderingParameters.sceneIndex ))
        {
            this.sceneScaleFactor = getScaleFactor(gltf, this.renderingParameters.sceneIndex);

            scaled = true;
            this.scaledGltfChanged = false;
            this.scaledSceneIndex = this.renderingParameters.sceneIndex;
        }
        else if(!this.renderingParameters.userCameraActive() )
        {
            this.sceneScaleFactor = 1;
        }


        mat4.scale(transform, transform, vec3.fromValues(this.sceneScaleFactor,  this.sceneScaleFactor,  this.sceneScaleFactor));
        scene.applyTransformHierarchy(gltf, transform);

        if(scaled)
        {
            this.userCamera.fitViewToScene(gltf, this.renderingParameters.sceneIndex);
        }
    }



    notifyLoadingStarted()
    {

        this.showSpinner();
    }

    notifyLoadingEnded()
    {

        this.hideSpinner();
    }

    showSpinner()
    {
        let spinner = document.getElementById("gltf-rv-model-spinner");
        if (spinner !== undefined)
        {
            spinner.style.display = "block";
        }
    }

    hideSpinner()
    {
        let spinner = document.getElementById("gltf-rv-model-spinner");
        if (spinner !== undefined)
        {
            spinner.style.display = "none";
        }
    }


}


export { gameObject };
