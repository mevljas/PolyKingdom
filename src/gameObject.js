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
        this.environmentMap = "Courtyard of the Doge's palace"

        this.lastMouseX = 0.00;
        this.lastMouseY = 0.00;
        this.mouseDown = false;

        this.lastTouchX = 0.00;
        this.lastTouchY = 0.00;
        this.touchDown = false;

        this.canvas = canvas;
        this.canvas.style.cursor = "grab";

        this.loadingTimer = new Timer();
        this.gltf = undefined;
        this.lastDropped = undefined;

        this.scaledSceneIndex = 0;
        this.scaledGltfChanged = true;
        this.sceneScaleFactor = 1;

        this.renderingParameters = new gltfRenderingParameters(this.environmentMap);
        this.userCamera = new UserCamera(this);
        this.currentlyRendering = false;
        this.renderer = new gltfRenderer(canvas, this.userCamera, this.renderingParameters);

        this.gltfLoadedCallback = function(){};



        // Holds the last camera index, used for scene scaling when changing to user camera.
        this.prevCameraIndex = null;

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

    // callback = function(gltf) {}
    setGltfLoadedCallback(callback)
    {
        this.gltfLoadedCallback = callback;
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
        input.onPan = (deltaX, deltaY) =>
        {
            if (this.renderingParameters.userCameraActive())
            {
                this.userCamera.pan(deltaX, deltaY);
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
        input.onDropFiles = this.loadFromFileObject.bind(this);
    }

    loadFromFileObject(mainFile, additionalFiles)
    {
        this.lastDropped = { mainFile: mainFile, additionalFiles: additionalFiles };

        const gltfFile = mainFile.name;
        this.notifyLoadingStarted(gltfFile);

        const reader = new FileReader();
        const self = this;
        if (getIsGlb(gltfFile))
        {
            reader.onloadend = function(event)
            {
                const data = event.target.result;
                const glbParser = new GlbParser(data);
                const glb = glbParser.extractGlbData();
                self.createGltf(gltfFile, glb.json, glb.buffers);
            };
            reader.readAsArrayBuffer(mainFile);
        }
        else
        {
            reader.onloadend = function(event)
            {
                const data = event.target.result;
                const json = JSON.parse(data);
                self.createGltf(gltfFile, json, additionalFiles);
            };
            reader.readAsText(mainFile);
        }
    }

    loadFromPath(gltfFile)
    {
        this.lastDropped = undefined;

        gltfFile =  gltfFile;
        this.notifyLoadingStarted(gltfFile);

        const isGlb = getIsGlb(gltfFile);

        const self = this;
        return axios.get(gltfFile, { responseType: isGlb ? "arraybuffer" : "json" }).then(function(response)
        {
            let json = response.data;
            let buffers = undefined;
            if (isGlb)
            {
                const glbParser = new GlbParser(response.data);
                const glb = glbParser.extractGlbData();
                json = glb.json;
                buffers = glb.buffers;
            }
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
        if(this.gltfLoadedCallback !== undefined)
        {
            this.gltfLoadedCallback(gltf);
        }

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
                        .filter(n => n.mesh !== undefined)
                        .reduce((acc, n) => acc.concat(self.gltf.meshes[n.mesh].primitives), [])
                        .map(p => self.gltf.materials[p.material].alphaMode);

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

        this.animateNode(gltf);

        scene.applyTransformHierarchy(gltf);

        const transform = mat4.create();

        let scaled = false;
        if (this.renderingParameters.userCameraActive() && (this.scaledGltfChanged || this.scaledSceneIndex !== this.renderingParameters.sceneIndex || this.prevCameraIndex !== this.renderingParameters.cameraIndex))
        {
            this.sceneScaleFactor = getScaleFactor(gltf, this.renderingParameters.sceneIndex);

            scaled = true;
            this.scaledGltfChanged = false;
            this.scaledSceneIndex = this.renderingParameters.sceneIndex;
            console.log("Rescaled scene " + this.scaledSceneIndex + " by " + this.sceneScaleFactor);
        }
        else if(!this.renderingParameters.userCameraActive() && this.prevCameraIndex !== this.renderingParameters.cameraIndex)
        {
            this.sceneScaleFactor = 1;
        }

        this.prevCameraIndex = this.renderingParameters.cameraIndex;

        mat4.scale(transform, transform, vec3.fromValues(this.sceneScaleFactor,  this.sceneScaleFactor,  this.sceneScaleFactor));
        scene.applyTransformHierarchy(gltf, transform);

        if(scaled)
        {
            this.userCamera.fitViewToScene(gltf, this.renderingParameters.sceneIndex);
        }
    }

    animateNode(gltf)
    {
        if(gltf.animations !== undefined && !this.renderingParameters.animationTimer.paused)
        {
            const t = this.renderingParameters.animationTimer.elapsedSec();

            if(this.renderingParameters.animationIndex === "all")
            {
                // Special index, step all animations.
                for(const anim of gltf.animations)
                {
                    if(anim)
                    {
                        anim.advance(gltf, t);
                    }
                }
            }
            else
            {
                // Step selected animation.
                const anim = gltf.animations[this.renderingParameters.animationIndex];
                if(anim)
                {
                    anim.advance(gltf, t);
                }
            }
        }
    }


    notifyLoadingStarted(path)
    {
        this.loadingTimer.start();

        this.showSpinner();
    }

    notifyLoadingEnded(path)
    {
        this.loadingTimer.stop();

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
