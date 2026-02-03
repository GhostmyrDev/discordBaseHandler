const { glob } = require("glob");
const path = require("path");
const fs = require("fs");

async function deleteCachedFile(file) {
    const filePath = path.resolve(file);
    if(require.cache[filePath]) {
        delete require.cache[filePath]
    }
}

async function loadFiles(dirName) {
    try {
        let files = await glob(path.join(process.cwd(), dirName, "**/*.js").replace(/\\/g, "/"));
        const jsFiles = files.filter(file => path.extname(file) === ".js");
        await Promise.all(jsFiles.map(deleteCachedFile));
        return jsFiles;
        
        
    } catch (e) {
        /**
         *  any dir errors will be redirected here
         */

        console.log(`There's trouble loading the files from ${dirName}: ${e}`);
    }
}

async function loadSubcommandFiles(dirName) {
    const foldersPath = path.join(process.cwd(), dirName); // "commands" folder
    const commandFolders = fs.readdirSync(foldersPath); // files within "commands" folder (more folders) ./commands/(file 1)
    //                  (file 2), etc
    let arr = [];
    for(const folder of commandFolders) {
        const categories = path.join(foldersPath, folder); // join path of each file  (basically, join commandFolders, so we're in categories like "Dev", "Music")
        const cats = fs.readdirSync(categories); // read files within (file 1), (file 2). aka "Dev", "Music"...
        for(const check of cats) {
            const joinToCheck = path.join(categories, check);
            let replaceCheckString = joinToCheck.replace(/\\/g, "\\").toString();
            try {
                const stats = await fs.promises.stat(replaceCheckString);
                if (stats.isDirectory()) {
                  arr.push(replaceCheckString);
                }
              } catch (err) {
                console.error('Error:', err);
              }
        }
    }
    // console.log(arr);
    return arr;
}

module.exports = {
    loadFiles,
    loadSubcommandFiles
}

/**
 * @author  Leth
 * @note    * (Reading this... fills you with DETERMINATION.)
 * @license Apache License 2.0
 */
