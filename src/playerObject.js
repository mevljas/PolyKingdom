import {vec3} from "gl-matrix";
import {
    Input_MoveDownButton,
    Input_MoveLeftButton,
    Input_MoveRightButton,
    Input_MoveUpButton,
    keys
} from "./publicVariables";
import {playerHurtAudio, playerWalkingSound} from "./audio";
import {colliison} from "./collision";

class playerObject {
    constructor(node, gtlf) {
        this.node = node;
        this.gltf = gtlf;
        this.directionVector = 0;
        this.direction = "up";
        this.lives = 50;
        this.speed = 18;


    }


    move( dt) {
        const right = vec3.set(vec3.create(),
            -Math.sin(this.node.initialRotation[1]), 0, -Math.cos(this.node.initialRotation[1]));
        const forward = vec3.set(vec3.create(),
            Math.cos(this.node.initialRotation[1]), 0, -Math.sin(this.node.initialRotation[1]));

        // 1: add movement acceleration
        let acc = vec3.create();
        //rotate
        if (keys[Input_MoveUpButton] && keys[Input_MoveLeftButton]) {
            vec3.sub(acc, acc, right);
            vec3.sub(acc, acc, forward);
            this.node.rotate(5.49779);  //315
            playerWalkingSound.play();


        } else if (keys[Input_MoveUpButton] && keys[Input_MoveRightButton]) {
            vec3.sub(acc, acc, forward);
            vec3.add(acc, acc, right);
            this.node.rotate(-2.35619);  //-135
            playerWalkingSound.play();

        } else if (keys[Input_MoveRightButton] && keys[Input_MoveDownButton]) {
            vec3.add(acc, acc, right);
            vec3.add(acc, acc, forward);
            this.node.rotate(2.35619);  //135
            playerWalkingSound.play();


        } else if (keys[Input_MoveDownButton] && keys[Input_MoveLeftButton]) {
            vec3.add(acc, acc, forward);
            vec3.sub(acc, acc, right);
            this.node.rotate(0.785398);  //45
            playerWalkingSound.play();

        } else if (keys[Input_MoveUpButton]) {
            vec3.sub(acc, acc, forward);
            this.node.rotate(-1.5708);  //-90
            playerWalkingSound.play();

        } else if (keys[Input_MoveDownButton]) {
            vec3.add(acc, acc, forward);
            this.node.rotate(1.5708);  //90
            playerWalkingSound.play();

        } else if (keys[Input_MoveRightButton]) {
            vec3.add(acc, acc, right);
            this.node.rotate(3.14159); //180
            playerWalkingSound.play();

        } else if (keys[Input_MoveLeftButton]) {
            vec3.sub(acc, acc, right);
            this.node.rotate(6.28319);  //360
            playerWalkingSound.play();
        }

        //move

        vec3.scaleAndAdd(this.node.translation, this.node.translation,  acc, dt * this.speed);
        this.node.applyTranslation(this.node.translation);


    }



    update ( dt) {
        this.move( dt);
        this.checkCollision();
        this.setHealtBar();
    }


    checkCollision() {
        for (var i = 0, len = this.gltf.nodes.length; i < len; i++) {
            let node = this.gltf.nodes[i];
            if (this.node !== node && !node.name.includes("_floor") && node.alive) {
                colliison.resolveCollision(this.node, node);
            }

        }

    }


    takeAHit() {
        playerHurtAudio.play();
        if (--this.lives <= 0) {
            window.location.replace("Game_Over.html");
        }

    }

    setHealtBar() {
        document.getElementById("healtBar").style.width = this.lives * 2 + "%";
    }

}


export {playerObject};