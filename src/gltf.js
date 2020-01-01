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
import { vec3, mat4 } from 'gl-matrix';
import { UserCamera } from './user_camera.js';


class glTF extends GltfObject {
    constructor(file, viewer) {
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
        this.playerDirectionVector = 0;
        this.playerDirection = "up";
        this.setUpAABB = true;
        this.enemies = [];
    }

    initGl() {
        initGlForMembers(this, this);
    }

    fromJson(json) {
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

        if (json.scenes !== undefined) {
            if (json.scene === undefined && json.scenes.length > 0) {
                this.scene = 0;
            } else {
                this.scene = json.scene;
            }
        }
        this.initPlayerAndEnemies();
    }

    initPlayerAndEnemies() {
        this.nodes.forEach(function (node) {
            //save player
            if (node.name === "player") {
                this.playerNode = node;

            } else if (node.name.includes("enemy")) {
                this.enemies.push(node);
            }

        }.bind(this));
    }


    checkMovement() {
        const right = vec3.set(vec3.create(),
            -Math.sin(this.playerNode.initialRotation[1]), 0, -Math.cos(this.playerNode.initialRotation[1]));
        const forward = vec3.set(vec3.create(),
            Math.cos(this.playerNode.initialRotation[1]), 0, -Math.sin(this.playerNode.initialRotation[1]));

        // 1: add movement acceleration
        let acc = vec3.create();
        //rotate
        if (keys['KeyA'] && keys['KeyW']) {
            vec3.add(acc, acc, forward);
            vec3.add(acc, acc, right);
            this.playerNode.rotate(0.785398);

        } else if (keys['KeyW'] && keys['KeyD']) {
            vec3.add(acc, acc, forward);
            vec3.sub(acc, acc, right);
            this.playerNode.rotate(-0.785398);

        } else if (keys['KeyD'] && keys['KeyS']) {
            vec3.sub(acc, acc, right);
            vec3.sub(acc, acc, forward);
            this.playerNode.rotate(-2.35619);

        } else if (keys['KeyS'] && keys['KeyA']) {
            vec3.sub(acc, acc, forward);
            vec3.add(acc, acc, right);
            this.playerNode.rotate(2.35619);

        } else if (keys['KeyW']) {
            vec3.add(acc, acc, forward);
            this.playerNode.rotate(0);

        } else if (keys['KeyS']) {
            vec3.sub(acc, acc, forward);
            this.playerNode.rotate(3.14159);
        } else if (keys['KeyD']) {
            vec3.sub(acc, acc, right);
            this.playerNode.rotate(-1.5708);
        } else if (keys['KeyA']) {
            vec3.add(acc, acc, right);
            this.playerNode.rotate(1.5708);
        }

        // 2: update velocity
        vec3.scaleAndAdd(this.playerNode.velocity, this.playerNode.velocity, acc, this.playerNode.acceleration);
        let tempVec = Array.from(this.playerNode.translation);
        vec3.add(tempVec, tempVec, this.playerNode.velocity,);
        this.playerNode.applyTranslation(tempVec);
        if (JSON.stringify(this.playerNode.velocity) !== "[0,0,0]") {
            this.playerNode.moved = true;
        }
        this.playerNode.velocity = [0, 0, 0];


    }

    updatePlayer() {
        this.checkMovement();
        this.checkplayerCollision();
    }

    updateEnemies() {
        this.checkEnemyCollision();
    }

    checkplayerCollision() {
        if (this.playerNode.moved || keys['Space']) {
            for (var i = 0, len = this.nodes.length; i < len; i++) {
                let node = this.nodes[i];
                if (this.playerNode !== node && !node.name.includes("_floor")) {
                    this.resolveCollision(this.playerNode, node);
                    if (keys['Space']) {
                        this.resolveWeaponCollision(this.playerNode, node);
                    }
                }

            }
            this.playerNode.moved = false;
        }

    }

    checkEnemyCollision() {
        for (var i = 0, len = this.enemies.length; i < len; i++) {
            let enemy = this.enemies[i];
            if (!enemy.playerDetection) {
                this.resolveEnemyDetectionRange(this.playerNode, enemy);
            } else {
                this.moveEnemy(enemy);
                this.checkIfEnemyCaughtPlayer(enemy, this.playerNode);
                this.nodes.forEach(function (node2) {
                    if (enemy !== node2 && !node2.name.includes("_floor")){
                        this.resolveCollision(enemy, node2)
                    }


                }.bind(this));
            }


        }

    }

    initAABB() {
        let weaponScalingFactor = 1.6;     //for weapon collsion
        let enemyRangeScalingFactor = 5;     //for enemy detection range
        this.nodes.forEach(function (node2) {
            // copy AABB
            if (typeof this.meshes[node2.mesh] !== 'undefined' && this.meshes[node2.mesh].primitives !== 'undefined') {
                let accesorNumber = this.meshes[node2.mesh].primitives[0].attributes.POSITION;
                node2.aabbmin = this.accessors[accesorNumber].min;
                node2.aabbmax = this.accessors[accesorNumber].max;
                //setup wepon aabb
                //weapon has a range equal to boundingbox * weaponScalingFactor
                vec3.scale(node2.aabbWeaponMin, this.accessors[accesorNumber].min, weaponScalingFactor);
                vec3.scale(node2.aabbWeaponMax, this.accessors[accesorNumber].max, weaponScalingFactor);
                //enemy has a detection range equal to boundingbox * enemyRangeScalingFactor
                vec3.scale(node2.aabbEnemyRangeMin, this.accessors[accesorNumber].min, enemyRangeScalingFactor);
                vec3.scale(node2.aabbEnemyRangeMax, this.accessors[accesorNumber].max, enemyRangeScalingFactor);
                this.setUpAABB = false;

            }
        }.bind(this));


    }

    update() {

        if (this.setUpAABB) {
            this.initAABB();
        }

        this.updatePlayer()
        this.updateEnemies();
    }

    intervalIntersection(min1, max1, min2, max2) {
        return !(min1 > max2 || min2 > max1);
    }

    aabbIntersection(aabb1, aabb2) {
        return this.intervalIntersection(aabb1.min[0], aabb1.max[0], aabb2.min[0], aabb2.max[0])
            // && this.intervalIntersection(aabb1.min[1], aabb1.max[1], aabb2.min[1], aabb2.max[1])
            //removed because we dont care about height
            && this.intervalIntersection(aabb1.min[2], aabb1.max[2], aabb2.min[2], aabb2.max[2]);
    }

    resolveCollision(a, b) {
        //get current position
        const posa = a.translation;
        const posb = b.translation;

        //get bounding box
        const mina = vec3.add(vec3.create(), posa, a.aabbmin);
        const maxa = vec3.add(vec3.create(), posa, a.aabbmax);
        const minb = vec3.add(vec3.create(), posb, b.aabbmin);
        const maxb = vec3.add(vec3.create(), posb, b.aabbmax);

        // Check if there is collision.
        const isColliding = this.aabbIntersection({
            min: mina,
            max: maxa
        }, {
            min: minb,
            max: maxb
        });

        if (!isColliding) {
            return;
        }
        // console.log(b.name);


        // Move node A minimally to avoid collision.
        const diffa = vec3.sub(vec3.create(), maxb, mina);
        const diffb = vec3.sub(vec3.create(), maxa, minb);

        let minDiff = Infinity;
        let minDirection = vec3.create();
        if (diffa[0] >= 0 && diffa[0] < minDiff) {
            minDiff = diffa[0];
            minDirection = [minDiff, 0, 0];
        }
        if (diffa[1] >= 0 && diffa[1] < minDiff) {
            minDiff = diffa[1];
            minDirection = [0, minDiff, 0];
        }
        if (diffa[2] >= 0 && diffa[2] < minDiff) {
            minDiff = diffa[2];
            minDirection = [0, 0, minDiff];
        }
        if (diffb[0] >= 0 && diffb[0] < minDiff) {
            minDiff = diffb[0];
            minDirection = [-minDiff, 0, 0];
        }
        if (diffb[1] >= 0 && diffb[1] < minDiff) {
            minDiff = diffb[1];
            minDirection = [0, -minDiff, 0];
        }
        if (diffb[2] >= 0 && diffb[2] < minDiff) {
            minDiff = diffb[2];
            minDirection = [0, 0, -minDiff];
        }

        vec3.add(a.translation, a.translation, minDirection);
        a.applyTranslation(a.translation);
    }

    resolveWeaponCollision(a, b) {
        //get current position
        const posa = a.translation;
        const posb = b.translation;

        //get bounding box
        //player boudning box should be bigger
        const mina = vec3.add(vec3.create(), posa, a.aabbWeaponMin);
        const maxa = vec3.add(vec3.create(), posa, a.aabbWeaponMax);
        //enemy bounding box shouldb be the same ( scalin with big models)
        const minb = vec3.add(vec3.create(), posb, b.aabbmin);
        const maxb = vec3.add(vec3.create(), posb, b.aabbmax);

        // Check if there is collision.
        const isColliding = this.aabbIntersection({
            min: mina,
            max: maxa
        }, {
            min: minb,
            max: maxb
        });

        if (isColliding) {
            // console.log(b.name+" weapon");
            //prevents multiple hits.
            keys['Space'] = false;
        }


    }

    resolveEnemyDetectionRange(a, b) {
        //get current position
        const posa = a.translation;
        const posb = b.translation;

        //get bounding box
        //player boudning box should be bigger
        const mina = vec3.add(vec3.create(), posa, a.aabbEnemyRangeMin);
        const maxa = vec3.add(vec3.create(), posa, a.aabbEnemyRangeMax);
        //enemy bounding box shouldb be the same ( scalin with big models)
        const minb = vec3.add(vec3.create(), posb, b.aabbmin);
        const maxb = vec3.add(vec3.create(), posb, b.aabbmax);

        // Check if there is collision.
        const isColliding = this.aabbIntersection({
            min: mina,
            max: maxa
        }, {
            min: minb,
            max: maxb
        });

        if (isColliding) {
            console.log("Enemy detection");
            b.playerDetection = true;
        }


    }

    moveEnemy(enemy) {
        // console.log("moving")
        let enemyVector = enemy.translation;
        let playerVector = this.playerNode.translation;
        let vectorFromEnemyToPlayer = vec3.create();
        vec3.set(vectorFromEnemyToPlayer, playerVector[0] - enemyVector[0], playerVector[1] - enemyVector[1], playerVector[2] - enemyVector[2]);
        vec3.scaleAndAdd(enemy.translation, enemy.translation, vectorFromEnemyToPlayer, enemy.movementSpeed);
        enemy.applyTranslation(enemy.translation);


    }

    checkIfEnemyCaughtPlayer(a, b) {
        //get current position
        const posa = a.translation;
        const posb = b.translation;

        //get bounding box
        const mina = vec3.add(vec3.create(), posa, a.aabbmin);
        const maxa = vec3.add(vec3.create(), posa, a.aabbmax);
        const minb = vec3.add(vec3.create(), posb, b.aabbmin);
        const maxb = vec3.add(vec3.create(), posb, b.aabbmax);

        // Check if there is collision.
        const isColliding = this.aabbIntersection({
            min: mina,
            max: maxa
        }, {
            min: minb,
            max: maxb
        });

        if (!isColliding) {
            return;
        }
        console.log("Enemy caught you!");


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
