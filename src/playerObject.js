import {GltfObject} from "./gltf_loader/gltf_object";
import {initGlForMembers, objectFromJson, objectsFromJsons} from "./gltf_loader/utils";
import {gltfAsset} from "./gltf_loader/asset";
import {gltfCamera} from "./gltf_loader/camera";
import {gltfAccessor} from "./gltf_loader/accessor";
import {gltfMesh} from "./gltf_loader/mesh";
import {gltfSampler} from "./gltf_loader/sampler";
import {gltfMaterial} from "./gltf_loader/material";
import {gltfBuffer} from "./gltf_loader/buffer";
import {gltfBufferView} from "./gltf_loader/buffer_view";
import {gltfScene} from "./gltf_loader/scene";
import {gltfTexture} from "./gltf_loader/texture";
import {gltfNode} from "./gltf_loader/node";
import {gltfLight} from "./gltf_loader/light";
import {gltfImage} from "./gltf_loader/image";
import {gltfAnimation} from "./gltf_loader/animation";
import {gltfSkin} from "./gltf_loader/skin";
import {vec3} from "gl-matrix";
import {keys} from "./publicVariables";
import {enemyDeathAudio, enemyDetectionSounds, playerHurtAudio, zombieHurtAudio, playerWalkingSound} from "./audio";
import {colliison} from "./collision";

class playerObject {
    constructor(node, gtlf) {
        this.node = node;
        this.gltf = gtlf;
        this.directionVector = 0;
        this.direction = "up";
        this.lives = 100;

    }





    checkMovement() {
        const right = vec3.set(vec3.create(),
            -Math.sin(this.node.initialRotation[1]), 0, -Math.cos(this.node.initialRotation[1]));
        const forward = vec3.set(vec3.create(),
            Math.cos(this.node.initialRotation[1]), 0, -Math.sin(this.node.initialRotation[1]));

        // 1: add movement acceleration
        let acc = vec3.create();
        //rotate
        if (keys['KeyW'] && keys['KeyA']) {
            vec3.sub(acc, acc, right);
            vec3.sub(acc, acc, forward);
            this.node.rotate(5.49779);  //315


        } else if (keys['KeyW'] && keys['KeyD']) {
            vec3.sub(acc, acc, forward);
            vec3.add(acc, acc, right);
            this.node.rotate(-2.35619);  //-135

        } else if (keys['KeyD'] && keys['KeyS']) {
            vec3.add(acc, acc, right);
            vec3.add(acc, acc, forward);
            this.node.rotate(2.35619);  //135


        } else if (keys['KeyS'] && keys['KeyA']) {
            vec3.add(acc, acc, forward);
            vec3.sub(acc, acc, right);
            this.node.rotate(0.785398);  //45

        } else if (keys['KeyW']) {
            vec3.sub(acc, acc, forward);
            this.node.rotate(-1.5708);  //-90

        } else if (keys['KeyS']) {
            vec3.add(acc, acc, forward);
            this.node.rotate(1.5708);  //90
        } else if (keys['KeyD']) {
            vec3.add(acc, acc, right);
            this.node.rotate(3.14159); //180
        } else if (keys['KeyA']) {
            vec3.sub(acc, acc, right);
            this.node.rotate(6.28319);  //360
        }

        // 2: update velocity
        vec3.scaleAndAdd(this.node.velocity, this.node.velocity, acc, this.node.acceleration);
        let tempVec = Array.from(this.node.translation);
        vec3.add(tempVec, tempVec, this.node.velocity,);
        this.node.applyTranslation(tempVec);
        if (JSON.stringify(this.node.velocity) !== "[0,0,0]") {
            this.node.moved = true;
            playerWalkingSound.play();
        }
        this.node.velocity = [0, 0, 0];


    }

    update() {
        this.checkMovement();
        this.checkCollision();
        this.setHealtBar();
    }


    checkCollision() {
        if (this.node.moved || keys['Space']) {
            for (var i = 0, len = this.gltf.nodes.length; i < len; i++) {
                let node = this.gltf.nodes[i];
                if (this.node !== node && !node.name.includes("_floor") && node.alive) {
                    colliison.resolveCollision(this.node, node);
                }

            }
            this.node.moved = false;
        }

    }



    takeAHit(){
        playerHurtAudio.play();
        if (--this.lives <= 0){
            window.location.replace("Game_Over.html");
        }

    }

    setHealtBar(){
        document.getElementById("healtBar").style.width = this.lives +"%";
    }

}






export { playerObject };