"use strict";
exports.__esModule = true;
var Optional_1 = require("../../../../util/Optional");
var Gen_1 = require("../../../generic/Gen");
var Vector = /** @class */ (function () {
    function Vector() {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        this.dataSet = null;
        this._size = null;
        this.dataSet = data;
    }
    Vector.of = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        return new (Vector.bind.apply(Vector, [void 0].concat(data)))();
    };
    Object.defineProperty(Vector.prototype, "size", {
        get: function () {
            if (this._size == null)
                this._size = this.dataSet.length;
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "isEmpty", {
        get: function () { return this.size == 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "head", {
        get: function () {
            if (this.isEmpty)
                throw new Error("NoSuchElementException");
            return this.dataSet[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "headOptional", {
        get: function () {
            return Optional_1["default"].of(this.dataSet[0]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "init", {
        get: function () {
            return this.copyDataSet(0, this.size - 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "last", {
        get: function () {
            return this.dataSet[this.dataSet.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "lastOptional", {
        get: function () { return Optional_1["default"].of(this.dataSet[this.size - 1]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "tail", {
        get: function () {
            if (this.size > 2)
                return this.copyDataSet(1);
            else
                return Vector.of();
        },
        enumerable: true,
        configurable: true
    });
    Vector.prototype.apply = function (index) {
        return Optional_1["default"].of(this.dataSet[index]);
    };
    Vector.prototype.count = function (p) {
        var count = 0;
        this.dataSet.forEach(function (value) {
            if (p(value))
                ++count;
        });
        return count;
    };
    Vector.prototype.take = function (index) {
        var result = this.copyEmptyDataSet();
        var currIndex = 0;
        this.dataSet.forEach(function (value) {
            if (currIndex > index) {
                return result;
            }
            result.dataSet.push(value);
            ++currIndex;
        });
        return result;
    };
    Vector.prototype.takeWhile = function (predicate) {
        var result = this.copyEmptyDataSet();
        this.dataSet.forEach(function (value) {
            if (!predicate(value)) {
                result.dataSet.push(value);
            }
        });
        return result;
    };
    Vector.prototype.drop = function (index) {
        return this.copyDataSet(index + 1);
    };
    Vector.prototype.dropWhile = function (predicate) {
        var result = new Vector();
        result.dataSet = [];
        this.dataSet.forEach(function (value) {
            if (!predicate(value))
                result.dataSet.push(value);
            else
                return result;
        });
        return result;
    };
    Vector.prototype.filter = function (predicate) {
        var result = new Vector();
        result.dataSet = [];
        this.dataSet.forEach(function (value) {
            if (predicate(value))
                result.dataSet.push(value);
        });
        return result;
    };
    Vector.prototype.forall = function (predicate) {
        var flag = true;
        this.dataSet.forEach(function (value) {
            if (!predicate(value)) {
                flag = false;
            }
        });
        return flag;
    };
    Vector.prototype.exists = function (predicate) {
        var flag = false;
        this.dataSet.forEach(function (value) {
            if (predicate(value)) {
                flag = true;
            }
        });
        return flag;
    };
    Vector.prototype.foldLeft = function (init, folding) {
        var result = init;
        this.dataSet.forEach(function (value) {
            result = folding(result, value);
        });
        return result;
    };
    Vector.prototype.foldRight = function (init, folding) {
        var result = init;
        this.dataSet.reverse().forEach(function (value) {
            result = folding(result, value);
            //result += foling(result, value)
        });
        return result;
    };
    Vector.prototype.foreach = function (consumer) {
        this.dataSet.forEach(function (value) { consumer(value); });
    };
    Vector.prototype.hasDefiniteSize = function () {
        return true;
    };
    Vector.prototype.indices = function () {
        return Gen_1["default"].to(0, this.size);
    };
    Vector.prototype.map = function (f) {
        var result = new Vector();
        result.dataSet = [];
        this.dataSet.forEach(function (value) {
            result.dataSet.push(f(value));
        });
        return result;
    };
    Vector.prototype.remove = function (index) {
        var currIndex = 0;
        var result = new Vector();
        result.dataSet = [];
        this.dataSet.forEach(function (value) {
            if (currIndex != index)
                result.dataSet.push(value);
        });
        return result;
    };
    Vector.prototype.slice = function (from, until) {
        return this.copyDataSet(from, until);
    };
    Vector.prototype.unshift = function (e) {
        var result = this.copyDataSet();
        result.dataSet.unshift(e);
        return result;
    };
    Vector.prototype.shift = function () {
        var result = this.copyDataSet();
        result.dataSet.shift();
        return result;
    };
    Vector.prototype.push = function (e) {
        var result = this.copyDataSet();
        result.dataSet.push(e);
        return result;
    };
    Vector.prototype.pop = function () {
        var result = this.copyDataSet();
        result.dataSet.pop();
        return result;
    };
    Vector.prototype.updated = function (index, e) {
        var result = this.copyDataSet();
        result.dataSet[index] = e;
        return result;
    };
    Vector.prototype.copyEmptyDataSet = function () {
        return this.copyDataSet(0, 0);
    };
    Vector.prototype.copyDataSet = function (start, end) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = this.size; }
        if (start > end)
            throw new RangeError();
        var result = new Vector();
        //slice endindex is not include
        result.dataSet = this.dataSet.slice(start, end);
        return result;
    };
    return Vector;
}());
exports["default"] = Vector;
