//function to clean arr
function cleanArr(x) {
    let help1 = [];
    for (let i = 0; i < x.length; i++) {
        if (x[i]) {
            help1.push(x[i]);
        }
    }
    let help2 = [];
    for (let i = 0; i < help1.length; i++) {
        let current = help1[i];
        if (!~help2.indexOf(current)) {
            help2.push(current);
        }
    }
    return help2;
}

function addWords(obj, data) {
    let addArr = Object.values(obj);
    addArr = String(addArr);
    addArr = addArr + " " + data;
    addArr = addArr.split(" ");
    addArr = cleanArr(addArr);
    obj["words"] = addArr.join(" ");
    return obj;
}

function removeWords(obj, data) {
    let remove = Object.values(obj);
    remove = String(remove);
    remove = remove.split(" ");
    remove = cleanArr(remove);
    let rems = cleanArr(data.split(" "));
    for (let i = 0; i < rems.length; i++) {
        let elem = rems[i]
        let index = remove.indexOf(elem)
        if (index > -1) {
            remove.splice(index, i)
        }
    }
    obj["words"] = remove.join(" ")
    return obj
}

let changeWords = (obj, data, newdata) => {
    let changeArr = Object.values(obj)
    changeArr = String(changeArr)
    changeArr = changeArr.split(" ")
    changeArr = cleanArr(changeArr)
    let news = cleanArr(newdata.split(" "))
    let olds = cleanArr(data.split(" "))
    for (let i = 0; i < olds.length; i++) {
        let elem = olds[i]
        let index = changeArr.indexOf(elem)
        if (index > -1) {
            changeArr.splice(index, i)
        }
    }
    for (let i = 0; i < news.length; i++) {
        let elem = news[i]
        changeArr.push(elem)
    }
    obj["words"] = changeArr.join(" ")
    return obj
}

