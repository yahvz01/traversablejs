"use strict";
exports.__esModule = true;
function hashCode(data, seed) {
    if (seed === void 0) { seed = 5381; }
    var str = JSON.stringify(data);
    var hash = seed, i = str.length;
    while (i) {
        hash = (hash * 33) ^ str.charCodeAt(--i);
    }
    return hash >>> 0;
}
exports.hashCode = hashCode;
function deepCopy(data) {
    var copy = {};
    if (typeof data === 'object' && data !== null) {
        for (var attr in data) {
            if (data.hasOwnProperty(attr)) {
                copy[attr] = deepCopy(data[attr]);
            }
        }
    }
    else {
        copy = data;
    }
    return copy;
}
exports.deepCopy = deepCopy;
