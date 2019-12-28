import { gltfAccessor } from './accessor.js';
import { gltfBuffer } from './buffer.js';
import { gltfBufferView } from './buffer_view.js';
import { gltfCamera } from './camera.js';
import { gltfImage } from './image.js';
import { gltfLight } from './light.js';
import { gltfMaterial } from './material.js';
import { gltfMesh } from './mesh.js';
import { gltfNode } from './node.js';
import { gltfSampler } from './sampler.js';
import { gltfScene } from './scene.js';
import { gltfTexture } from './texture.js';
import { initGlForMembers, objectsFromJsons, objectFromJson } from './utils';
import { gltfAsset } from './asset.js';
import { GltfObject } from './gltf_object.js';
import { gltfAnimation } from './animation.js';
import { gltfSkin } from './skin.js';
import { keys } from './publicVariables.js';
import { vec3 } from 'gl-matrix';
import { UserCamera } from './user_camera.js';


class glTF extends GltfObject
{
    constructor(file, viewer)
    {
        super();
        this.asset = undefined;
        this.accessors = [];
        this.nodes = [];
        this.scene = undefined; // the default scene to show.
        this.scenes = [];
        this.cameras = [];
        this.lights = [];
        this.textures = [];
        this.images = [];
        this.samplers = [];
        this.meshes = [];
        this.buffers = [];
        this.bufferViews = [];
        this.materials = [];
        this.animations = [];
        this.skins = [];
        this.path = file;
        this.playerNode = null;
        this.viewer = viewer;
        this.playerDirection = undefined;
    }

    initGl()
    {
        initGlForMembers(this, this);
    }

    fromJson(json)
    {
        super.fromJson(json);

        this.asset = objectFromJson(json.asset, gltfAsset);
        this.cameras = objectsFromJsons(json.cameras, gltfCamera);
        this.accessors = objectsFromJsons(json.accessors, gltfAccessor);
        this.meshes = objectsFromJsons(json.meshes, gltfMesh);
        this.samplers = objectsFromJsons(json.samplers, gltfSampler);
        this.materials = objectsFromJsons(json.materials, gltfMaterial);
        this.buffers = objectsFromJsons(json.buffers, gltfBuffer);
        this.bufferViews = objectsFromJsons(json.bufferViews, gltfBufferView);
        this.scenes = objectsFromJsons(json.scenes, gltfScene);
        this.textures = objectsFromJsons(json.textures, gltfTexture);
        this.nodes = objectsFromJsons(json.nodes, gltfNode);
        this.lights = objectsFromJsons(getJsonLightsFromExtensions(json.extensions), gltfLight);
        this.images = objectsFromJsons(json.images, gltfImage);
        this.animations = objectsFromJsons(json.animations, gltfAnimation);
        this.skins = objectsFromJsons(json.skins, gltfSkin);

        this.materials.push(gltfMaterial.createDefault());
        this.samplers.push(gltfSampler.createDefault());

        if (json.scenes !== undefined)
        {
            if (json.scene === undefined && json.scenes.length > 0)
            {
                this.scene = 0;
            }
            else
            {
                this.scene = json.scene;
            }
        }
        this.findPlayer();
    }

    findPlayer(){
        this.nodes.forEach(function(node){
            if (node.name === "player"){
                this.playerNode = node;
                this.playerDirection = this.playerNode.rotation[1];

            }
        }.bind(this));
    }

    updatePlayer(dt){


        const forward = vec3.set(vec3.create(),
            -Math.sin(this.playerDirection), 0, -Math.cos(this.playerDirection));
        const right = vec3.set(vec3.create(),
            Math.cos(this.playerDirection), 0, -Math.sin(this.playerDirection));

        // 1: add movement acceleration
        let acc = vec3.create();
        if (keys['KeyW']) {
            vec3.sub(acc, acc, forward);
            // this.playerNode.rotateX(0.1);
        }
        if (keys['KeyS']) {
            vec3.add(acc, acc, forward);
        }
        if (keys['KeyD']) {
            vec3.sub(acc, acc, right);
        }
        if (keys['KeyA']) {
            vec3.add(acc, acc, right);
        }

        // 2: update velocity
        vec3.scaleAndAdd(this.playerNode.velocity, this.playerNode.velocity, acc, dt * this.playerNode.acceleration);

        // 3: if no movement, apply friction
        if (!keys['KeyW'] &&
            !keys['KeyS'] &&
            !keys['KeyD'] &&
            !keys['KeyA'])
        {
            vec3.scale(this.playerNode.velocity, this.playerNode.velocity, 1 - this.playerNode.friction);
        }

        // 4: limit speed
        const len = vec3.len(this.playerNode.velocity);
        if (len > this.playerNode.maxSpeed) {
            vec3.scale(this.playerNode.velocity, this.playerNode.velocity, this.playerNode.maxSpeed / len);
        }


    }
    update(dt) {

        this.nodes.forEach(function(node){
            if (JSON.stringify(node.velocity) !== JSON.stringify([0,0,0])) {
                let tempVec = Array.from(node.translation);
                vec3.scaleAndAdd(tempVec, tempVec, node.velocity, dt);
                node.applyTranslation(tempVec);
                if (node.name === "player"){
                    if (JSON.stringify(node.lastTranslation) === JSON.stringify(node.translation)){
                        node.velocity = [0,0,0];
                    }
                    node.lastTranslation = node.translation;
                }
            }
        }.bind(this));
    }

}

function getJsonLightsFromExtensions(extensions)
{
    if (extensions === undefined)
    {
        return [];
    }
    if (extensions.KHR_lights_punctual === undefined)
    {
        return [];
    }
    return extensions.KHR_lights_punctual.lights;
}

export { glTF };
