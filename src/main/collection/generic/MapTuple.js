"use strict";
exports.__esModule = true;
var MapTuple = /** @class */ (function () {
    function MapTuple(key, value) {
        this._key = key;
        this._value = value;
    }
    Object.defineProperty(MapTuple.prototype, "key", {
        get: function () { return this._key; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapTuple.prototype, "value", {
        get: function () { return this._value; },
        enumerable: true,
        configurable: true
    });
    MapTuple.of = function (key, value) {
        return new MapTuple(key, value);
    };
    return MapTuple;
}());
exports["default"] = MapTuple;
