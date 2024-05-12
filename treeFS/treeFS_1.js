const { resolve, join, basename } = require('path');
const { readdir, access } = require('fs').promises;

const {argv} = require('process');
const currDir = argv[2] || '.';
const depthCurrent = argv[3] || 2;

function buildPrefix(countIndent = 0){
    let prefix = '';
    for (let i = 0; i< countIndent; i++) {
      prefix += '   ';
    }
    return prefix;
}

async function listDir(dir, depth = 0, maxDepth = 2) {
    const dirents = await readdir(dir, { withFileTypes: true });
    let prefix = buildPrefix(depth);
    const files = await Promise.all(dirents.map((dirent) => (async() => { 
        let result = maxDepth == 0 ? '' : dirent.isDirectory() ? 
                                            await listDir(join(dir, dirent.name), depth + 1, maxDepth - 1) : dirent.name;
        return  maxDepth == 0 ? '' : dirent.isDirectory() ? `\r\n${prefix}|---${dirent.name}${result}` : `\r\n${prefix}|___${result}`;
    })()));
    return files;
  }

const treeFS = async() => {    
    const exists = await access(currDir).then(() => true).catch(() => false);
    if (!exists) {
        console.log('Dir doesnt exist!');
        return;
    }
    let itogFiles = await listDir(currDir, 0, depthCurrent);
    console.log(basename(currDir) + String(itogFiles).replaceAll(',', ''));
    let resultsFiles = `${String(itogFiles).split('|---').length - 1} directories, ${String(itogFiles).split('|___').length - 1} files`;
    console.log(resultsFiles);
};

treeFS();