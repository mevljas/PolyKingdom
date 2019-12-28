PolyKingdom
======================


Usage
-----

**Controls**

`click + drag` : Rotate model

`scroll` : Zoom camera

`GUI` : Use to change models and settings

**Change glTF model**

* Choose one of the glTF models in the selction list

or

* Drag and drop glTF files into viewer

Setup
-----

For local usage and debugging, please follow these instructions:

**(1)** Checkout the [`master`](../../tree/master) branch

**(2)** Install dependencies with `npm install`

**(3)** Pull the submodules for the required [glTF sample models](https://github.com/KhronosGroup/glTF-Sample-Models) and [environments](https://github.com/ux3d/Sample-Environments) `git submodule update  --init --recursive`

**(4a)** Start a demo in the browser with `npm run dev`, and open http://localhost:8000.

**(4b)** Start a demo in Electron with `npm run dev:electron`.

When making changes, the project is automatically rebuilt and the `dist/` folder
is updated. Files in the `dist/` folder should not be included in pull
requests — they will be updated by project maintainers with each new release.
