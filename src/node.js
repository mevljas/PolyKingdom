import { mat4, quat, quat2 } from 'gl-matrix';
import { jsToGl } from './utils.js';
import { GltfObject } from './gltf_object.js';

// contain:
// transform
// child indices (reference to scene array of nodes)

class gltfNode extends GltfObject
{
    constructor(type)
    {
        super();
        this.camera = undefined;
        this.children = [];
        this.matrix = undefined;
        this.rotation = jsToGl([0, 0, 0, 1]);
        this.scale = jsToGl([1, 1, 1]);
        this.translation = jsToGl([0, 0, 0]);
        this.lastTranslation = [0,0,0];
        this.name = undefined;
        this.mesh = undefined;
        this.skin = undefined;

        // non gltf
        this.worldTransform = mat4.create();
        this.inverseWorldTransform = mat4.create();
        this.normalMatrix = mat4.create();
        this.light = undefined;
        this.changed = true;

        //defines node type
        this.type = type;
        //velocity for movement
        this.velocity = [0, 0, 0];
        this.friction = 0.2;
        this.maxSpeed = 3;
        this.acceleration = 20;
    }

    initGl()
    {
        if (this.matrix !== undefined)
        {
            this.applyMatrix(this.matrix);
        }
        else
        {
            if (this.scale !== undefined)
            {
                this.scale = jsToGl(this.scale);
            }

            if (this.rotation !== undefined)
            {
                this.rotation = jsToGl(this.rotation);
            }

            if (this.translation !== undefined)
            {
                this.translation = jsToGl(this.translation);
            }
        }
        this.changed = true;
    }

    applyMatrix(matrixData)
    {
        this.matrix = jsToGl(matrixData);

        mat4.getScaling(this.scale, this.matrix);
        
        // To extract a correct rotation, the scaling component must be eliminated.
        const mn = mat4.create();
        for(const col of [0, 1, 2])
        {
            mn[col] = this.matrix[col] / this.scale[0];
            mn[col + 4] = this.matrix[col + 4] / this.scale[1];
            mn[col + 8] = this.matrix[col + 8] / this.scale[2];
        }
        mat4.getRotation(this.rotation, mn);
        quat.normalize(this.rotation, this.rotation);
        
        mat4.getTranslation(this.translation, this.matrix);
        
        this.changed = true;
    }

    // vec3
    applyTranslation(translation)
    {
        this.translation = translation;
        this.changed = true;
    }

    // quat
    applyRotation(rotation)
    {
        this.rotation = rotation;
        this.changed = true;
    }

    // vec3
    applyScale(scale)
    {
        this.scale = scale;
        this.changed = true;
    }

    resetTransform()
    {
        this.rotation = jsToGl([0, 0, 0, 1]);
        this.scale = jsToGl([1, 1, 1]);
        this.translation = jsToGl([0, 0, 0]);
        this.changed = true;
    }

    getLocalTransform()
    {
        if(this.transform === undefined || this.changed)
        {
            this.transform = mat4.create();
            mat4.fromRotationTranslationScale(this.transform, this.rotation, this.translation, this.scale);
            this.changed = false;
        }

        return mat4.clone(this.transform);
    }
    //calulates new rotation array
    rotate(angle) {

    angle *= 0.5;

    let qax = this.rotation[0], qay = this.rotation[1], qaz = this.rotation[2], qaw = this.rotation[3],
        qbx = Math.sin(angle), qbw = Math.cos(angle);

        this.rotation[0] = qax * qbw + qaz * qbx;
        this.rotation[1] = qay * qbw + qaw * qbx;
        this.rotation[2] = qaz * qbw - qax * qbx;
        this.rotation[3] = qaw * qbw - qay * qbx;

    this.applyRotation(this.rotation);
};




}

export { gltfNode };
