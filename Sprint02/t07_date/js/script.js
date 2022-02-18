function getFormattedDate(dateObject) {let infobject = createObject(dateObject); return createReturnString(infobject);}
function time(dataTime) {return String(dataTime).length === 1 ? '0' + dataTime : dataTime;}
function date(dataData) {return String(dataData).length === 1 ? '0' + dataData : dataData;}
function createObject(dateObject) {
    let infobject = new Object();
    infobject.day = dateObject.getDate();
    infobject.month = dateObject.getMonth() + 1;
    infobject.year = dateObject.getFullYear();
    infobject.hours = dateObject.getHours();
    infobject.minutes = dateObject.getMinutes();
    infobject.weekday = dateObject.toLocaleString("en-US", {weekday: 'long'});
    return infobject;
}
function createReturnString(infobject) {return `${date(infobject.day)}.${date(infobject.month)}.${infobject.year} ${time(infobject.hours)}:${time(infobject.minutes)} ${infobject.weekday}`;}

