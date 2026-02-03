# Discord-Base-Handler
My own interpretation of the perfect base Discord bot file organisation.

## Quick guide
Once you're done cloning this repo and setting up your private tokens in a safe place (such as tokens.txt, or choose on your own perhaps), use `npm i` to install all dependencies. Perhaps go to package-json and install any dependencies that are shown there. Once installed, and token set, you can run the code with npm run test.

Please **DO NOT** push any non legitimate dependencies into the file to avoid any conflicts.

In order words...
1. Once cloning this git, please include files you do not wish to share with others in `.gitignore`.
2. Run `npm i` to install all dependencies (or `npm i` followed by the dependencies cited at the bottom of this README file)
3. Input your bot's token in `config/config.json` in (path). **DO NOT INPUT USER OR UNRECOGNISED TOKENS, YOU WILL BE BANNED FOR SELF-BOTTING, AND DO NOT USE MY CODE FOR SELF-BOTTING. THANK YOU.**
4. Input your server's ID (in case you have plans of using the server bot privately and want to lock its usage to the input servers then do so, if not, ignore) in `config/config.json` in (path).
5. Once done, run `npm run start`.

## Requirements
Node.js v19 or newer (v20 is recommended, LTS 20 to be specific). LTS 22 and **specially** LTS 24 may cause npm to keep very simple npm commands hanging, and may disturb bot operation.

Final recommendation? **Use Node.js LTS 20**. Downgrade if you have to.

## WARNING
By accessing to this repo (and regardless of whether you've read this or not) you agree to the licensing terms written in the LICENSE file in regards to the Apache 

### Used dependencies
ALL dependencies are visible in `package-lock.json`.

> discord.js fs glob ms nodemon path colors distube @discordjs/voice

### Miscellaneous
1. **YES**, this code has been tested before published.
2. If you're not using the `nodemon` dependency, ABSTAIN YOURSELF FROM USING THE `npm run dev`SCRIPT.
3. If you won't be using music features, or at least any from the `distube` package, just remove it (on your own, will ya...), of course uninstall `distube`.
4. Yes I plan to update. No ETA.
5. * (Reading this... fills you with DETERMINATION.)