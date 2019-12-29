import { vec3 } from 'gl-matrix';
import { gltfCamera } from './camera.js';
import { jsToGl, clamp } from './utils.js';
import { getSceneExtends } from './gltf_utils.js';

const VecZero = vec3.create();

class UserCamera extends gltfCamera
{
    constructor(
        viewer,
        position = [0, 0, 0],
        target = [0, 0,0],
        up = [0, 1, 0],
        xRot = 0,
        yRot = 0,
        //how much we zoom in
        zoom)
    {
        super();

        this.position = jsToGl(position);
        this.target = jsToGl(target);
        this.up = jsToGl(up);
        this.xRot = xRot;
        this.yRot = yRot;
        //zoom at the begining
        this.initialZoom = 0.02;
        this.zoom = this.initialZoom;
        this.zoomFactor = 1.04;
        this.rotateSpeed = 1 / 180;
        this.scaleFactor = 1;
        this.viewer = viewer;
    }

    updatePosition()
    {
        //camera direction
        const direction = vec3.fromValues(-1, 0.5, 0);
        this.toLocalRotation(direction);

        const position = vec3.create();
        vec3.scale(position, direction, this.zoom);
        vec3.add(position, position, this.target);

        this.position = position;
    }

    reset()
    {
        this.xRot = 0;
        this.yRot = 0;
        this.zoom = this.initialZoom;
    }

    zoomIn(value)
    {
        if (value > 0)
        {
            this.zoom *= this.zoomFactor;
        }
        else
        {
            this.zoom /= this.zoomFactor;
        }
    }

    rotate(x, y)
    {
        const yMax = Math.PI / 2 - 0.01;
        this.xRot += (x * this.rotateSpeed);
        this.yRot += (y * this.rotateSpeed);
        this.yRot = clamp(this.yRot, -yMax, yMax);
    }

    pan(x, y)
    {
        const moveSpeed = 1 / (this.scaleFactor * 200);

        const left = vec3.fromValues(-1, 0, 0);
        this.toLocalRotation(left);
        vec3.scale(left, left, x * moveSpeed);

        const up = vec3.fromValues(0, 1, 0);
        this.toLocalRotation(up);
        vec3.scale(up, up, y * moveSpeed);

        vec3.add(this.target, this.target, up);
        vec3.add(this.target, this.target, left);
    }

    fitViewToScene()
    {
        this.fitCameraTargetToExtends();
    }

    toLocalRotation(vector)
    {
        vec3.rotateX(vector, vector, VecZero, -this.yRot);
        vec3.rotateY(vector, vector, VecZero, -this.xRot);
    }

    getLookAtTarget()
    {
        return this.target;
    }

    getPosition()
    {
        return this.position;
    }


    fitCameraTargetToExtends()
    {
        //player initial position
        this.target[0] = -0.058;
        this.target[2] = 0.006;

    }

    moveCamera(array){
        ///move camera as player moves
        let scale = 0.0023;
        this.target[0] += array[0]  * scale;
        this.target[2] += array[2]  * scale;
    }
}

export { UserCamera };
