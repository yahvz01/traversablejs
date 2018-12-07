


function hashCode(data : any, seed : number = 5381) : number {
    let str = JSON.stringify(data)
    if(str == undefined){ str = "{}"}
    let hash = seed;
    let i    = str.length
    while(i) {
        hash = (hash * 33) ^ str.charCodeAt(--i);
    }
    return hash >>> 0;
}

function deepCopy(data : any) : any {
    let copy : any = {};
    if (typeof data === 'object' && data !== null) {
        for (let attr in data) {
            if (data.hasOwnProperty(attr)) {
                copy[attr] = deepCopy(data[attr]);
            }
        }
    } else {
        copy = data;
    }
    return copy;
}

export { hashCode, deepCopy }