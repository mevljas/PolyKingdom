import {vec3} from "gl-matrix";
import {keys} from "./publicVariables";
import {
    enemyDetectionSounds,
    zombieHurtAudio,
    heartSound,
    combatMusic,
    playCombatMusic,
    stopCombatMusic
} from "./audio";

class colliison {
    static intervalIntersection(min1, max1, min2, max2) {
        return !(min1 > max2 || min2 > max1);
    }

    static aabbIntersection(aabb1, aabb2) {
        return this.intervalIntersection(aabb1.min[0], aabb1.max[0], aabb2.min[0], aabb2.max[0])
            // && this.intervalIntersection(aabb1.min[1], aabb1.max[1], aabb2.min[1], aabb2.max[1])
            //removed because we dont care about height
            && this.intervalIntersection(aabb1.min[2], aabb1.max[2], aabb2.min[2], aabb2.max[2]);
    }

    static resolveCollision(a, b, player) {
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
        // console.log(a.name+" is colliding with "+b.name);
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

        //pickup heart
        if (a.name === "player" && b.name.includes("Heart")) {
            this.resolveHeartCollision(player, b);
        }
    }

    static resolveHeartCollision(player, heart) {
        heart.alive = false;
        player.lives = 100;
        heartSound.play();
    }

    static resolveWeaponCollision(first, second, dt) {

        let a = first.node;
        let b = second.node;
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
            // console.log(b.name+" weaponHit");
            second.subLives();
            //prevents multiple hits.
            zombieHurtAudio.play();
            second.moveBack(dt);
        }


    }


    static checkIfEnemyCaughtPlayer(first, second) {


        let a = first.node;
        let b = second.node;
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
        // console.log(b.name+" caught you!");
        second.takeAHit();


    }

    static checkIfPlayerEscaped(enemy, player, gltf) {
        if (vec3.distance(enemy.node.translation, player.node.translation) >= enemy.detectionEscapeRange) {
            enemy.playerDetection = false;
            gltf.subEnemies();
        }


    }

    static resolveEnemyDetectionRange(player, enemy, gltf) {
        if (vec3.distance(enemy.node.translation, player.node.translation) <= enemy.detectionRange) {
            enemy.playerDetection = true;
            enemyDetectionSounds.play();
            if (gltf.awakeEnemies++ === 0) {
                playCombatMusic();
            }
        }


    }
}


export {colliison};