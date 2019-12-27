import { Input_ResetCamera, keys } from './publicVariables.js';

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
    }
    keyUpHandler(event)
    {
        keys[event.code] = false;
    }
}

export { gltfKeyboardInput };
