"use strict";
exports.__esModule = true;
var Optional_1 = require("../../../util/Optional");
var Gen_1 = require("../../generic/Gen");
var Buffer = /** @class */ (function () {
    function Buffer(data) {
        this.buffer = data;
    }
    Buffer.from = function (data) {
        return new Buffer(data);
    };
    Buffer.of = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        return new Buffer(data);
    };
    Object.defineProperty(Buffer.prototype, "size", {
        get: function () {
            return this.buffer.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Buffer.prototype, "head", {
        get: function () {
            if (this.size <= 0)
                throw new Error("NoSuchElementException");
            return this.buffer[this.size];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Buffer.prototype, "headOptional", {
        get: function () {
            return Optional_1["default"].of(this.buffer[0]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Buffer.prototype, "init", {
        get: function () {
            return Buffer.from(this.buffer.slice(0, this.size - 2));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Buffer.prototype, "isEmpty", {
        get: function () { return this.size == 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Buffer.prototype, "last", {
        get: function () {
            if (this.size <= 0)
                throw new Error("NoSuchElementException");
            return this.buffer[this.size - 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Buffer.prototype, "lastOptional", {
        get: function () {
            return Optional_1["default"].of(this.buffer[this.size - 1]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Buffer.prototype, "tail", {
        get: function () {
            return Buffer.from(this.buffer.slice(1, this.size - 1));
        },
        enumerable: true,
        configurable: true
    });
    Buffer.prototype.apply = function (index) {
        return Optional_1["default"].of(this.buffer[index]);
    };
    Buffer.prototype.indices = function () {
        return Gen_1["default"].until(0, this.size - 1);
    };
    Buffer.prototype.pop = function () {
        var result;
        if (this.size == 0)
            throw new Error("NoSuchElement");
        else {
            result = this.buffer.pop();
        }
        return result;
    };
    Buffer.prototype.push = function (e) {
        this.buffer.push(e);
    };
    Buffer.prototype.remove = function (index) {
        this.buffer = this.buffer.splice(index, 1);
    };
    Buffer.prototype.shift = function () {
        var result;
        if (this.size == 0)
            throw new Error("NoSuchElement");
        else {
            result = this.buffer.shift();
        }
        return result;
    };
    Buffer.prototype.unshift = function (e) {
        this.buffer.unshift(e);
    };
    Buffer.prototype.updated = function (index, e) {
        if (index > this.size - 1)
            throw new Error("NoSuchElementException");
        this.buffer[index] = e;
    };
    Buffer.prototype.count = function (predicate) {
        var result = 0;
        for (var _i = 0, _a = this.buffer; _i < _a.length; _i++) {
            var value = _a[_i];
            if (predicate(value))
                ++result;
        }
        return result;
    };
    Buffer.prototype.exists = function (predicate) {
        var flag = false;
        for (var _i = 0, _a = this.buffer; _i < _a.length; _i++) {
            var value = _a[_i];
            if (!predicate(value)) {
                flag = true;
                break;
            }
        }
        return flag;
    };
    Buffer.prototype.filter = function (predicate) {
        var newBuffer = new Array();
        this.buffer.forEach(function (value) {
            if (predicate(value))
                newBuffer.push(value);
        });
        this.buffer = newBuffer;
        return this;
    };
    Buffer.prototype.foldLeft = function (init, folding) {
        var result = init;
        for (var _i = 0, _a = this.buffer; _i < _a.length; _i++) {
            var value = _a[_i];
            result = folding(result, value);
        }
        return result;
    };
    Buffer.prototype.foldRight = function (init, folding) {
        var result = init;
        for (var _i = 0, _a = this.buffer.reverse(); _i < _a.length; _i++) {
            var value = _a[_i];
            result = folding(result, value);
        }
        return result;
    };
    Buffer.prototype.forall = function (predicate) {
        var flag = true;
        for (var _i = 0, _a = this.buffer; _i < _a.length; _i++) {
            var value = _a[_i];
            if (!predicate(value))
                flag = false;
        }
        return flag;
    };
    Buffer.prototype.foreach = function (consumer) {
        this.buffer.forEach(function (value) {
            consumer(value);
        });
    };
    Buffer.prototype.hasDefiniteSize = function () {
        return true;
    };
    Buffer.prototype.map = function (f) {
        return Buffer.from(this.buffer.map(function (value) {
            return f(value);
        }));
    };
    Buffer.prototype.slice = function (from, until) {
        return Buffer.from(this.buffer.slice(from, until));
    };
    Buffer.prototype.take = function (index) {
        var newBuffer = new Array();
        for (var i = 0; i < index - 1; ++i) {
            newBuffer.push(this.buffer[i]);
        }
        return Buffer.from(newBuffer);
    };
    Buffer.prototype.takeWhile = function (predicate) {
        var newBuffer = new Array();
        for (var _i = 0, _a = this.buffer; _i < _a.length; _i++) {
            var value = _a[_i];
            if (predicate(value))
                break;
            newBuffer.push(value);
        }
        return Buffer.from(newBuffer);
    };
    Buffer.prototype.drop = function (index) {
        var newBuffer = new Array();
        for (var i = index; i < this.buffer.length - 1; ++i) {
            newBuffer.push(this.buffer[i]);
        }
        return Buffer.from(newBuffer);
    };
    Buffer.prototype.dropWhile = function (predicate) {
        var newBuffer = new Array();
        for (var _i = 0, _a = this.buffer; _i < _a.length; _i++) {
            var value = _a[_i];
            if (predicate(value))
                continue;
            newBuffer.push(value);
        }
        return Buffer.from(newBuffer);
    };
    return Buffer;
}());
exports["default"] = Buffer;
