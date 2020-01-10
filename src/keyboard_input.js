import {Input_ResetCamera, keys} from './publicVariables.js';
import {controlMusic, playerWeaponAudio} from "./audio";
import {Input_AttackButton, Input_MusicButton} from "./publicVariables";

class gltfKeyboardInput {
    constructor() {
        this.onResetCamera = () => {
        };
    }

    setupGlobalInputBindings(document) {
        document.onkeydown = this.keyDownHandler.bind(this);
        document.onkeyup = this.keyUpHandler.bind(this);
    }

    setupCanvasInputBindings() {
    }

    keyDownHandler(event) {
        if (event.key === Input_ResetCamera) {
            this.onResetCamera();
        }
        keys[event.code] = true;
        if (event.code === Input_AttackButton) {
            playerWeaponAudio.play();
        } else if (event.code === Input_MusicButton) {
            controlMusic();
        }
    }

    keyUpHandler(event) {
        keys[event.code] = false;
    }
}

export {gltfKeyboardInput};
