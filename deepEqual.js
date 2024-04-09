const obj1 = {
    a: { b: 1, },
};
const obj2 = {
    a: { b: 2, },
};
const obj3 = {
    a: { b: 1,},
};
const obj4 = {
    c: { b: 1,},
};

const obj5 = {
    a: 12, 
    c: 'abc'
}
const obj6 = {
    a: { b: {c: 2}, },
};
const obj7 = {
    a: { b: {d: 2}, },
};

const isObject = (obj) => {
  return obj != null && typeof obj === "object";
};


//Получить путь от объекта к заданному свойству c определенным значением
function getPath(objectParent, nameProp, valueProp, currPath = ''){
    let currentPath = currPath || '';
    if (!isObject(objectParent)) {
        return currentPath;
    }

    for (let i in objectParent){
      if (i == nameProp && objectParent[i] == valueProp){
        currentPath = currentPath ? `${currentPath}.${nameProp}`: nameProp;
      }
      else if (isObject(objectParent[i])){
        return getPath(objectParent[i], nameProp, valueProp, currentPath ? `${currentPath}.${i}` : i);
      }
    }

    return currentPath;
};

function deepEqual(actual, expected, rootObject = {}){
    let resultEquals = 'Ok';
    let currentPath = '';
    
    if (actual && expected) {
        if (isObject(actual) && isObject(expected)) {
            let rootActualObject = Object.keys(rootObject).length == 0 ? actual : rootObject;
            const keysActual = Object.keys(actual);
            const keysExpected = Object.keys(expected);

            for(let key of keysActual) {
                //отсутствие во втором массиве свойства из первого массива
                if (!keysExpected.some(x => x == key)) {
                    currentPath = getPath(/*actual*/rootActualObject, key, actual[key]);
                    resultEquals = `Error: ${currentPath}`;
                    break;
                }
                //значения одного и того же свойства различны
                if (typeof actual[key] != typeof expected[key]) {
                    currentPath = getPath(/*actual*/rootActualObject, key, actual[key]);
                    resultEquals = `Error: ${currentPath}.value`;
                    break;
                }
                
                if(isObject(actual[key]) && isObject(expected[key])) {
                    resultEquals = deepEqual(actual[key], expected[key], rootActualObject);
                    if (resultEquals != 'Ok') {
                        break;
                    }
                }
                else if (actual[key] != expected[key]) {
                    currentPath = getPath(/*actual*/rootActualObject, key, actual[key]);
                    resultEquals = `Error: ${currentPath}`;
                    break;
                }
            }
        }
        else {
            resultEquals = 'В функции некорректно заданы объекты для сравнения';
        }
    }
    return resultEquals;
}

console.log(deepEqual(obj1, obj1))
console.log(deepEqual(obj1, obj2))
console.log(deepEqual(obj1, obj3));
console.log(deepEqual(obj1, obj4));
console.log(deepEqual(obj1, obj5));
console.log(deepEqual(obj6, obj7));