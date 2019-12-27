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

class glTF extends GltfObject
{
    constructor(file)
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
            }
        }.bind(this));
    }

    updatePlayer(dt){


        const forward = vec3.set(vec3.create(),
            -Math.sin(this.playerNode.rotation[1]), 0, -Math.cos(this.playerNode.rotation[1]));
        const right = vec3.set(vec3.create(),
            Math.cos(this.playerNode.rotation[1]), 0, -Math.sin(this.playerNode.rotation[1]));

        // 1: add movement acceleration
        let acc = vec3.create();
        if (keys['KeyW']) {
            console.log("W");
            vec3.add(acc, acc, forward);
        }
        if (keys['KeyS']) {
            vec3.sub(acc, acc, forward);
        }
        if (keys['KeyD']) {
            vec3.add(acc, acc, right);
        }
        if (keys['KeyA']) {
            vec3.sub(acc, acc, right);
        }

        // 2: update velocity
        vec3.scaleAndAdd(this.playerNode.velocity, this.playerNode.velocity, acc, dt * this.playerNode.acceleration);
        // vec3.scaleAndAdd(this.playerNode.velocity, this.playerNode.velocity, acc,  this.playerNode.acceleration);

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
