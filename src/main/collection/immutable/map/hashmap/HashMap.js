"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var MapTuple_1 = require("../../../generic/MapTuple");
var generic_1 = require("../../../generic/index");
var Optional_1 = require("../../../../util/Optional");
var Gen_1 = require("../../../generic/Gen");
var Buffer_1 = require("../../../mutable/buffer/Buffer");
var __1 = require("../../index");
// Current Not Consider Hashing Confiliction
var HashMap = /** @class */ (function () {
    function HashMap() {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        var _this = this;
        this.keySet = [];
        this.dataSet = {};
        this._size = null;
        data.forEach(function (value) {
            _this.insertData(value);
        });
    }
    HashMap.of = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        return new (HashMap.bind.apply(HashMap, [void 0].concat(data)))();
    };
    HashMap.prototype.apply = function (index) {
        return MapTuple_1["default"].of(this.keySet[index], this.dataSet[generic_1.hashCode(this.keySet[index])]);
    };
    Object.defineProperty(HashMap.prototype, "size", {
        get: function () {
            if (this._size == null)
                this._size = this.keySet.length;
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HashMap.prototype, "isEmpty", {
        get: function () { return this.size == 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HashMap.prototype, "head", {
        get: function () {
            if (this.size == 0)
                throw new Error("NoSuchElementException");
            return this.apply(0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HashMap.prototype, "headOptional", {
        get: function () {
            return Optional_1["default"].of(this.apply(0));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HashMap.prototype, "last", {
        get: function () {
            if (this.size == 0)
                throw new Error("NoSuchElementException");
            return this.apply(this.size - 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HashMap.prototype, "lastOptional", {
        get: function () {
            return Optional_1["default"].of(this.apply(this.size - 1));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HashMap.prototype, "tail", {
        get: function () {
            return this.slice(1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HashMap.prototype, "init", {
        get: function () {
            return this.slice(0, this.size - 2);
        },
        enumerable: true,
        configurable: true
    });
    HashMap.prototype.hasDefiniteSize = function () {
        return true;
    };
    Object.defineProperty(HashMap.prototype, "keys", {
        get: function () {
            return (this.dataSet.keySet);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HashMap.prototype, "values", {
        get: function () {
            var result = Buffer_1["default"].of();
            for (var hashKey in this.dataSet) {
                result.push(this.dataSet[hashKey]);
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    HashMap.prototype.clear = function () {
        console.error("Immutable Map is only return empty map");
        return HashMap.of();
    };
    HashMap.prototype.contains = function (key) {
        return this.dataSet.hasOwnProperty(generic_1.hashCode(key));
    };
    HashMap.prototype.filterKeys = function (predicate) {
        var buffer = [];
        for (var _i = 0, _a = this.keySet; _i < _a.length; _i++) {
            var key = _a[_i];
            if (predicate(key))
                buffer.push(key);
        }
        return __1.Vector.of.apply(__1.Vector, buffer);
    };
    HashMap.prototype.get = function (key) {
        if (!this.dataSet.hasOwnProperty(generic_1.hashCode(key)))
            throw new Error("NoSuchElementException");
        return this.dataSet[generic_1.hashCode(key)];
    };
    HashMap.prototype.getOrElse = function (key, defaultValue) {
        if (!this.dataSet.hasOwnProperty(generic_1.hashCode(key)))
            return defaultValue;
        return this.dataSet[generic_1.hashCode(key)];
    };
    HashMap.prototype.mapValue = function (f) {
        var result = [];
        for (var key in this.dataSet) {
            result.push(this.dataSet[key]);
        }
        return __1.Vector.of.apply(__1.Vector, result);
    };
    HashMap.prototype.put = function (value) {
        var result = HashMap.of();
        this.insertData(value, result);
        return result;
    };
    HashMap.prototype.putAll = function (values) {
        var _this = this;
        var result = HashMap.of();
        values.foreach(function (keyValue) {
            _this.insertData(keyValue, result);
        });
        return result;
    };
    HashMap.prototype.remove = function (value) {
        var result = HashMap.of();
        this.copyHashMap(this, result);
        var removeTargetIndex = result.keySet.indexOf(value);
        if (removeTargetIndex != -1) {
            delete result.dataSet[generic_1.hashCode(result.keySet[removeTargetIndex])];
            result.keySet.splice(removeTargetIndex, 1);
        }
        return result;
    };
    HashMap.prototype.removeAll = function (values) {
        var result = HashMap.of();
        this.copyHashMap(this, result);
        values.foreach(function (value) {
            var removeTargetIndex = result.keySet.indexOf(value);
            if (removeTargetIndex != -1) {
                delete result.dataSet[generic_1.hashCode(result.keySet[removeTargetIndex])];
                result.keySet.splice(removeTargetIndex, 1);
            }
        });
        return result;
    };
    // Traverable
    HashMap.prototype.count = function (predicate) {
        var count = 0;
        this.foreach(function (keyValue) {
            if (predicate(keyValue))
                ++count;
        });
        return count;
    };
    HashMap.prototype.forall = function (predicate) {
        var flag = true;
        this.foreach(function (keyValue) {
            if (!predicate(keyValue))
                flag = false;
        });
        return flag;
    };
    HashMap.prototype.exists = function (predicate) {
        var flag = false;
        this.foreach(function (keyValue) {
            if (predicate(keyValue))
                flag = true;
        });
        return flag;
    };
    HashMap.prototype.filter = function (predicate) {
        var _this = this;
        var result = HashMap.of();
        this.foreach(function (keyValue) {
            if (predicate(keyValue))
                _this.insertData(MapTuple_1["default"].of(keyValue.key, keyValue.value), result);
        });
        return result;
    };
    HashMap.prototype.foldLeft = function (init, folding) {
        var result = init;
        this.foreach(function (keyValue) {
            result = folding(result, keyValue);
        });
        return result;
    };
    HashMap.prototype.foldRight = function (init, folding) {
        // Not different with foldLeft
        return this.foldLeft(init, folding);
    };
    HashMap.prototype.foreach = function (consumer) {
        var _this = this;
        this.keySet.forEach(function (value) {
            consumer(MapTuple_1["default"].of(value, _this.get(value)));
        });
    };
    HashMap.prototype.map = function (f) {
        var result = __1.Vector.of();
        this.foreach(function (keyValue) {
            result.push(f(keyValue));
        });
        return result;
    };
    HashMap.prototype.slice = function (from, until) {
        if (until === void 0) { until = this.size - 1; }
        if (from > until)
            throw new RangeError("from index must be greater than to");
        var result = HashMap.of();
        var gen = Gen_1["default"].until(from, until);
        var currIndex = 0;
        for (var _i = 0, _a = this.keySet; _i < _a.length; _i++) {
            var key = _a[_i];
            if (gen.contains(currIndex))
                MapTuple_1["default"].of(key, this.dataSet[generic_1.hashCode(key)]);
            ++currIndex;
        }
        return result;
    };
    HashMap.prototype.take = function (index) {
        return this.slice(0, index);
    };
    HashMap.prototype.takeWhile = function (predicate) {
        var result = Buffer_1["default"].of();
        for (var _i = 0, _a = this.keySet; _i < _a.length; _i++) {
            var key = _a[_i];
            if (!predicate(MapTuple_1["default"].of(key, this.dataSet[key])))
                break;
            result.push(MapTuple_1["default"].of(key, this.dataSet[key]));
        }
        return result;
    };
    HashMap.prototype.drop = function (index) {
        return this.slice(index);
    };
    HashMap.prototype.dropWhile = function (predicate) {
        var result = Buffer_1["default"].of();
        for (var _i = 0, _a = this.keySet; _i < _a.length; _i++) {
            var key = _a[_i];
            if (predicate(MapTuple_1["default"].of(key, this.dataSet[key])))
                continue;
            result.push(MapTuple_1["default"].of(key, this.dataSet[key]));
        }
        return result;
    };
    HashMap.prototype.copyHashMap = function (from, to) {
        from.keySet.forEach(function (value) {
            to.keySet.push(value);
        });
        to.dataSet = __assign({}, this.dataSet);
    };
    HashMap.prototype.insertData = function (data, target) {
        if (target === void 0) { target = this; }
        target.keySet.push(data.key);
        target.dataSet(generic_1.hashCode(data.key), data.value);
    };
    return HashMap;
}());
exports["default"] = HashMap;
