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
    a: { b: 1, },
    b: 12, 
    c: 'abc'
}
const obj7 = {
    a: { b: {c: 2}, },
};
const obj8 = {
    a: { b: {d: 2}, },
};
const obj9 = {
     a: { b: 1, },
     b: { b: 12, },
     c: { b: 'sdf', },
    
};

const obj10 = {
     a: { b: 1, },
     b: { b: { q: 12} , },
     c: { b: 'sdf', },
    
};

const isObject = (obj) => {
  return obj != null && typeof obj === "object";
};

const doJoin = (arrayData) => {
    //console.log(arrayData);
    return arrayData ? arrayData.length > 1 ? arrayData.join('.') : arrayData[0] : '';
};

function deepEqual(actual, expected, currentPath = []){
    let resultEquals = 'Ok';
    
    /*if (currentPath.length > 0) {
        console.log(currentPath);
    }*/
    
    if (actual && expected) {
        if (isObject(actual) && isObject(expected)) {
			if (actual === expected) {
                return resultEquals;
            }
            
            const keysActual = Object.keys(actual);
            const keysExpected = Object.keys(expected);
            
            if (keysActual.length != keysExpected.length) { 
                //"проход" по 1-му массиву
                for (let i = 0; i < keysActual.length; i++) {
                    let keyActual = keysActual[i];
                    let keyExpected = keysExpected[i];
                    //неравенство ключей
                    if (keyActual != keyExpected) {
                        currentPath.push(keyActual);
                        resultEquals = `Error: ${doJoin(currentPath)}`;
                        break;
                    }
                    //неравенство типов значений    
                    else if (typeof actual[keyActual] != typeof expected[keyExpected]) {
                        currentPath.push(keyActual);
                        resultEquals = `Error: ${doJoin(currentPath)}.value`;
                        break;
                    }
                    //оба значения - объекты (=> рекурсия)
                    else if (isObject(actual[keyActual]) && isObject(expected[keyExpected])) {
                        currentPath.push(keyActual);
                        resultEquals = deepEqual(actual[keyActual], expected[keyExpected], currentPath);
                        if (resultEquals != 'Ok') {
                            break;
                        }
                        //Если сравнение объектов-значений успешно, то исключаем из массива указание на это поле
                        else {
                            currentPath.pop();
                        }
                    }
                    //просто неравенство значений
                    else if (actual[keyActual] != expected[keyExpected]){
                        currentPath.push(keyActual);
                        resultEquals = `Error: ${doJoin(currentPath)}`;
                        break;
                    }
                }
                
                //если по первому массиву проход результата не выдал, а число ключей все-таки различается, то => вывести первый неученнный элемент из 2 массива
                if (resultEquals == 'Ok') {
                    currentPath.push(keysExpected[keysActual.length]);
                    resultEquals = `Error path for object 2: ${doJoin(currentPath)}`;
                }
                return resultEquals;
            }

            for (let key of keysActual) {
                //отсутствие во втором массиве свойства из первого массива
                if (!keysExpected.some(x => x == key)) {
                    currentPath.push(key);
                    resultEquals = `Error: ${doJoin(currentPath)}`;
                    break;
                }
                //значения одного и того же свойства различны
                if (typeof actual[key] != typeof expected[key]) {
                    currentPath.push(key);
                    resultEquals = `Error: ${doJoin(currentPath)}.value`;
                    break;
                }
                
                if (isObject(actual[key]) && isObject(expected[key])) {
                    currentPath.push(key);
                    resultEquals = deepEqual(actual[key], expected[key], currentPath);
                    if (resultEquals != 'Ok') {
                        break;
                    }
                }
                else if (actual[key] != expected[key]) {
                    currentPath.push(key);
                    resultEquals = `Error: ${doJoin(currentPath)}`;
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

console.log('obj1 + obj1: ' + deepEqual(obj1, obj1))
console.log('obj1 + obj2: ' + deepEqual(obj1, obj2))
console.log('obj1 + obj3: ' + deepEqual(obj1, obj3));
console.log('obj1 + obj4: ' + deepEqual(obj1, obj4));
console.log('obj1 + obj5: ' + deepEqual(obj1, obj5));
console.log('obj1 + obj6: ' + deepEqual(obj1, obj6));
console.log('obj7 + obj8: ' + deepEqual(obj7, obj8));
console.log('obj1 + obj9: ' + deepEqual(obj1, obj9));
console.log('obj9 + obj1: ' + deepEqual(obj9, obj1));
console.log('obj10 + obj9: ' + deepEqual(obj10, obj9));