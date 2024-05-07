//const testFolder = 'D:\\abaturova\\учеба';
//const testFolder = 'D:\\abaturova\\разное\\ЭкоМеталл';
const currDir = process.env.npm_config_curr_dir /*|| testFolder*/ || ".";
const d = process.env.npm_config_depth || process.env.npm_config_d || 2;

const fs = require('fs');
const path = require('path');
let hierarchyDir = {};

function findObject(currentObject, oneKeyValue){
    if (currentObject && currentObject instanceof Object && oneKeyValue) {
        if (currentObject.hasOwnProperty('name') && currentObject['name'] == oneKeyValue) {
            return currentObject;
        }
        if (currentObject.hasOwnProperty('items')) {
            okItemsObjects = currentObject['items'];
            if (okItemsObjects.length > 0) {
                for (let i = 0; i < okItemsObjects.length; i++) {
                    let searchObject = findObject(okItemsObjects[i], oneKeyValue);
                    if (searchObject) {
                        return searchObject;
                    }
                }
            }
        }
        //не нашлось свойств 'name' или 'items' у объекта. => Это м.б. массив объектов
        for (let keyObj of Object.keys(currentObject)) {
            if (typeof currentObject[keyObj] === 'object' && currentObject[keyObj] !== null) {
                let searchTwoObject = findObject(currentObject[keyObj], oneKeyValue);
                if (searchTwoObject) {
                    return searchTwoObject;
                }
            }
        }
    }
    return null;
}

const fillDataFiles = async (nameFolder, dataArray = {}, currentDir = '') => {    
    let currObject = currentDir ? findObject(dataArray, currentDir) : null;

    fs.readdir(nameFolder,{ withFileTypes: true }, (err, files) => {
        if (err) {
            throw err;
        }
        if (files && files.length > 0) {
            files.forEach(file => {
                if (file.isDirectory()) {
                    if (currentDir) {
                        if (currObject) {
                            if (!currObject.hasOwnProperty('items')) {
                                currObject.items = [];
                            }
                            currObject.items.push({name: file.name, items: []});
                        }
                    }
                    else {
                        if (!dataArray.hasOwnProperty('items')) {
                            dataArray.items = [];
                        }
                        dataArray.items.push({name: file.name, items: []});
                    }
                    (async() => await fillDataFiles(path.join(nameFolder, file.name), dataArray, file.name))();
                }
                else {
                    if (currentDir) {
                        if (currObject) {
                            if (!currObject.hasOwnProperty('items')) {
                                currObject.items = [];
                            }
                            currObject.items.push({name: file.name});                        
                        }
                    }
                    else {
                        if (!dataArray.hasOwnProperty('items')) {
                            dataArray.items = [];
                        }
                        dataArray.items.push({name: file.name});
                    }
                }
            });
        }
    });
};

//сбор "дерева файлов/каталогов" в строку
function addDataObjectForString(currentObj, resultString = '', depthCount = Number.MAX_VALUE, countIndent = 0) {
    if (typeof currentObj === 'object' && currentObj != null) {
        resultString += currentObj.name || '';

        if (currentObj.hasOwnProperty('items') && Array.isArray(currentObj.items) && currentObj.items.length > 0) {            
            depthCount = depthCount != Number.MAX_VALUE ?  --depthCount : depthCount;
            let currentDirs = currentObj.items.filter(x => x.hasOwnProperty('items') && Array.isArray(x.items) && x.items.length > 0);
            let currentFiles = currentObj.items.filter(x => x.hasOwnProperty('name') && !x.hasOwnProperty('items'));

            if (currentDirs.length > 0 && depthCount >= -1) {
                currentDirs.forEach((oneDir) => {
                    if (typeof oneDir === 'object' && oneDir != null) {
                        if (oneDir.hasOwnProperty('name')){
                            resultString += '\r\n';
                            for(let i = 0; i <= countIndent; i++){
                                resultString += `   `;
                            }
                            resultString += `|---`;
                        }
                        resultString = addDataObjectForString(oneDir, resultString, depthCount, oneDir.hasOwnProperty('name') ? countIndent + 1 : countIndent);
                    }
                });
            }

            if (currentFiles.length > 0 && depthCount >= -1){
                currentFiles.forEach((oneFile) => {
                    resultString += '\r\n';
                    for (let i = 0; i <= countIndent; i++) {
                        resultString += `   `;
                    }
                    resultString += '|___';
                    resultString += oneFile.name || '';
                });
            }
        }
    }
    return resultString;
}

const tree = async (nameDir, depthCount = Number.MAX_VALUE) => {
    let hierarchicalResult = '';
    await fillDataFiles(nameDir, hierarchyDir);
    setTimeout( () => {
        let allFilesHietarchy = {
            name: String(nameDir).split('\\').slice(-1)[0],
            items: [hierarchyDir]
        };
        hierarchicalResult = addDataObjectForString(allFilesHietarchy, hierarchicalResult, depthCount);
        console.log(hierarchicalResult);
        let itogsTree = `${hierarchicalResult.split('|---').length - 1} directories, ${hierarchicalResult.split('|___').length - 1} files`;
        console.log(itogsTree);
    }, 1000);
}

tree(currDir, d);
