PolyKingdom
======================


Usage
-----

**Controls**

`click + drag` : Rotate model

`scroll` : Zoom camera

`GUI` : Use to change models and settings


Setup
-----

For local usage and debugging, please follow these instructions:

**(1)** Install dependencies with `npm install` or run installNpmElectron.ps1,

**(2)** Start a demo in the browser with `npm run dev` and open http://localhost:8000. or run runBrowser.ps1,

**(3)** Start a demo in Electron with `npm run dev:electron` or run runElectron.ps1.

If you just wanna build the project, run `npm run build` or run build.ps1.

When making changes, the project is automatically rebuilt and the `dist/` folder
is updated. Files in the `dist/` folder should not be included in pull
requests — they will be updated by project maintainers with each new release.
