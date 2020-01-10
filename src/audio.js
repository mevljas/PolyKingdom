const playerWeaponAudio = new Audio('assets/sounds/playerWeaponAttack.mp3');
const playerHurtAudio = new Audio('assets/sounds/playerHurt.ogg');
const zombieHurtAudio = new Audio('assets/sounds/zombieHurt.mp3');
const enemyDeathAudio = new Audio('assets/sounds/enemyDeath.mp3');
const enemyDetectionSounds = new Audio('assets/sounds/enemyDetectionSound.mp3');
const playerWalkingSound = new Audio('assets/sounds/playerWalkingSound.mp3');
const heartSound = new Audio('assets/sounds/heartSound.mp3');
const combatMusic = new Audio('assets/sounds/combatMusic.mp3');
const backgroundMusic = new Audio('assets/sounds/backgroundMusic.mp3');

let music = false;
let inCombat = false;


function controlMusic() {
    music = !music;
    if (music) {
        if (inCombat){
            playCombatMusic()
        }
        else{
            playBackgroundMusic();
        }


    } else {
        stopBackgroundMusic();
        stopCombatMusic();
    }

}


function playBackgroundMusic() {
    inCombat = false;
    if (music) {
        backgroundMusic.loop = true;
        stopCombatMusic();
        backgroundMusic.volume = 0.2;
        backgroundMusic.play();
    }


}

function stopBackgroundMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;

}

function playCombatMusic() {
    inCombat = true;
    if (music) {
        combatMusic.loop = true;
        stopBackgroundMusic();
        combatMusic.volume = 0.05;
        combatMusic.play();
    }


}

function stopCombatMusic() {
    combatMusic.pause();
    combatMusic.currentTime = 0;

}


export
{
    playerWeaponAudio,
    playerHurtAudio,
    zombieHurtAudio,
    enemyDeathAudio,
    enemyDetectionSounds,
    playerWalkingSound,
    heartSound,
    backgroundMusic,
    combatMusic,
    controlMusic,
    playBackgroundMusic,
    stopBackgroundMusic,
    playCombatMusic,
    stopCombatMusic
};

