const getPath = function(currentElement) {
    if (!currentElement || !(currentElement instanceof Element)) return;
    let path = [];
    //цикл от элементов к родителям
    while (currentElement.nodeType === Node.ELEMENT_NODE) {
        //селектор для текущего элемента
        let currentSelector = currentElement.nodeName.toLowerCase();
        
        //при наличии id элемента => добавить его в итоговый путь
        if (currentElement.id) {
            currentSelector += `#${currentElement.id}`;
        } else {
            let sibling = currentElement;
            let siblingNext = sibling.nextElementSibling;
            let nth = 1;
            //поиск и подсчет аналогичных смежных элементов
            while (sibling = sibling.previousElementSibling) {
                if (sibling.nodeName.toLowerCase() == currentSelector)  //элемент имеет соответствующий селектор
                   nth++;
            }
            //Дописываем к селектору пути его последнее значение (для уникальности)
            if (nth > 1 || (nth == 1 && siblingNext != null && siblingNext.nodeName.toLowerCase() == currentSelector)) {
                currentSelector += `:nth-child(${nth})`;
            }
            //при наличии класса элемента => добавить его в итоговый путь
            else if (currentElement.classList.length > 0) {
                for (i = 0; i < currentElement.classList.length; i++) {
                    currentSelector += `.${currentElement.classList[i]}`;
                }
            }
        }            
        path.unshift(currentSelector);
        //текущим элементом устанавливаем родительский узел
        currentElement = currentElement.parentNode;
    }
    return path.join(' ');
}