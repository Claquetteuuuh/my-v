export default function (cList, cName){
    const name = cName + "=";
    const cDecoded = decodeURIComponent(cList);
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res
}