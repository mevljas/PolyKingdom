import { Input_ResetCamera, keys } from './publicVariables.js';
import {playerWeaponAudio} from "./audio";
import {Input_AttackButton} from "./publicVariables";

class gltfKeyboardInput
{
    constructor()
    {
        this.onResetCamera = () => { };
    }

    setupGlobalInputBindings(document)
    {
        document.onkeydown = this.keyDownHandler.bind(this);
        document.onkeyup = this.keyUpHandler.bind(this);
    }

    setupCanvasInputBindings() { }

    keyDownHandler(event)
    {
        if (event.key === Input_ResetCamera)
        {
            this.onResetCamera();
        }
        keys[event.code] = true;
        if (event.code === Input_AttackButton){
            playerWeaponAudio.play();
        }
    }
    keyUpHandler(event)
    {
        keys[event.code] = false;
    }
}

export { gltfKeyboardInput };
