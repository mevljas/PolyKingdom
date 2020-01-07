import { ImageMimeType } from "./gltf_loader/image";
import { AnimationTimer } from "./gltf_loader/utils";

const UserCameraIndex = "orbit camera";

class gltfRenderingParameters
{
    constructor()
    {
        this.environmentName = "Courtyard of the Doge's palace";
        this.useIBL = true;
        this.usePunctual = true;
        this.exposure = 1.0;
        this.clearColor = [169,228,232];
        this.toneMap = "Linear";
        this.useShaderLoD = true;
        this.debugOutput = "None";
        this.sceneIndex = 0;
        this.cameraIndex = UserCameraIndex;
        this.animationTimer = new AnimationTimer();
        this.animationIndex = "all";
        this.skinning = true;
        this.morphing = true;
    }

    userCameraActive()
    {
        return this.cameraIndex === UserCameraIndex;
    }
}



const Environments =
{
    "Courtyard of the Doge's palace": { folder: "doge2", mipLevel: 11, type: ImageMimeType.HDR }
};

export { UserCameraIndex, gltfRenderingParameters, Environments };
