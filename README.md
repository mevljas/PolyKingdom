# PolyKingdom

## Abstract

PolyKingdom is a third person adventure game.

The main purpose of the game is to liberate the territory that has been
occupied by barbarians. The player starts in the city of allies, seeks out barbarian settlements and occupies them. 
The game is made using JavaScript programming language and
uses the WebGL library. 


## Usage

**Controls**

`click + drag` : Rotate player

`scroll` : Zoom camera

`A,W,S,D` : Use to move the player.

`Space` : Use to attack enemies.

`R` : Reset camera.


## Setup

For local usage and debugging, please follow these instructions:

**(1)** Install dependencies with `npm install` or run installNpmElectron.ps1,

**(2)** Start a demo in the browser with `npm run dev` and open http://localhost:8000. or run runBrowser.ps1,

**(3)** Start a demo in Electron with `npm run dev:electron` or run runElectron.ps1.

If you just wanna build the project, run `npm run build` or run build.ps1.

When making changes, the project is automatically rebuilt and the `dist/` folder
is updated. Files in the `dist/` folder should not be included in pull
requests — they will be updated by project maintainers with each new release.
