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
var Optional_1 = require("../../../../util/Optional");
var Gen_1 = require("../../../generic/Gen");
var Util_1 = require("../../../generic/Util");
var HashSet = /** @class */ (function () {
    function HashSet() {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        var _this = this;
        this.dataSet = {};
        this._size = null;
        // head
        this._head = null;
        // last
        this._last = null;
        data.forEach(function (value) {
            // Now Unchecked
            _this.insertData(value);
        });
    }
    HashSet.of = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        return new (HashSet.bind.apply(HashSet, [void 0].concat(data)))();
    };
    Object.defineProperty(HashSet.prototype, "size", {
        get: function () {
            if (this._size == null)
                this._size = 0;
            for (var key in this.dataSet)
                ++this._size;
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HashSet.prototype, "head", {
        get: function () {
            if (this._head == null)
                for (var key in this.dataSet) {
                    this._head = this.dataSet[key];
                    break;
                }
            if (this._head == null)
                throw new Error("NoSuchElementException");
            return this._head;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HashSet.prototype, "headOptional", {
        get: function () {
            return Optional_1["default"].of(this.head);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HashSet.prototype, "init", {
        get: function () {
            if (0 <= this.size - 2)
                return this.slice(0, this.size - 2);
            else
                return HashSet.of();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HashSet.prototype, "isEmpty", {
        get: function () { return this.size == 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HashSet.prototype, "last", {
        get: function () {
            var tmp = null;
            if (this._last == null) {
                for (var key in this.dataSet)
                    tmp = this.dataSet[key];
                this._last = tmp;
            }
            if (this._last == null)
                throw new Error("NoSuchElementException");
            return this._last;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HashSet.prototype, "lastOptional", {
        get: function () {
            return Optional_1["default"].of(this.last);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HashSet.prototype, "tail", {
        get: function () {
            var result = HashSet.of();
            result.dataSet = __assign({}, this.dataSet);
            var headKey = Util_1.hashCode(this.head);
            delete result.dataSet[headKey];
            return result;
        },
        enumerable: true,
        configurable: true
    });
    HashSet.prototype.count = function (predicate) {
        var count = 0;
        for (var key in this.dataSet) {
            if (predicate(this.dataSet[key]))
                ++count;
        }
        return count;
    };
    HashSet.prototype.take = function (index) {
        return this.slice(0, index + 1);
    };
    HashSet.prototype.takeWhile = function (predicate) {
        console.error("This Function dependOn Inner Hashing Machanism, Deprecated");
        var result = HashSet.of();
        for (var key in this.dataSet) {
            if (!predicate(this.dataSet[key]))
                this.insertData(this.dataSet[key], result);
            else
                break;
        }
        return result;
    };
    HashSet.prototype.drop = function (index) {
        return this.slice(index);
    };
    HashSet.prototype.dropWhile = function (predicate) {
        console.error("This Function dependOn Inner Hashing Machanism, Deprecated");
        var result = HashSet.of();
        var flag = false;
        for (var key in this.dataSet) {
            flag = predicate(this.dataSet[key]);
            if (flag == true)
                this.insertData(this.dataSet[key], result);
        }
        return result;
    };
    HashSet.prototype.exists = function (predicate) {
        var flag = false;
        for (var key in this.dataSet) {
            if (predicate(this.dataSet[key]))
                flag = true;
            if (flag == true)
                break;
        }
        return flag;
    };
    HashSet.prototype.filter = function (predicate) {
        var result = HashSet.of();
        for (var key in this.dataSet) {
            var data = this.dataSet[key];
            if (predicate(data)) {
                this.insertData(data, result);
            }
        }
        return result;
    };
    HashSet.prototype.foldLeft = function (init, folding) {
        var result = init;
        for (var key in this.dataSet) {
            result = folding(result, this.dataSet[key]);
        }
        return result;
    };
    HashSet.prototype.foldRight = function (init, folding) {
        var result = init;
        for (var key in this.dataSet) {
            result = folding(result, this.dataSet[key]);
        }
        return result;
    };
    HashSet.prototype.forall = function (predicate) {
        var flag = true;
        for (var key in this.dataSet) {
            flag = predicate(this.dataSet[key]);
            if (flag == false)
                break;
        }
        return flag;
    };
    HashSet.prototype.hasDefiniteSize = function () {
        return true;
    };
    HashSet.prototype.map = function (f) {
        var result = HashSet.of();
        for (var key in this.dataSet) {
            var mappedData = f(this.dataSet[key]);
            this.insertMappedData(mappedData, result);
        }
        return result;
    };
    HashSet.prototype.slice = function (from, until) {
        if (until === void 0) { until = this.size; }
        if (until > this.size) {
            throw new Error("NoSuchElementException");
        }
        var result = HashSet.of();
        var range = Gen_1["default"].until(from, until);
        var currIndex = 0;
        for (var key in this.dataSet) {
            if (range.contains(currIndex)) {
                result.dataSet[key] = this.dataSet[key];
            }
            ++currIndex;
        }
        return result;
    };
    HashSet.prototype.add = function (e) {
        var result = HashSet.of();
        result.dataSet = __assign({}, this.dataSet);
        this.insertData(e, result);
        return result;
    };
    HashSet.prototype.addAll = function (set) {
        var _this = this;
        var result = HashSet.of();
        result.dataSet = __assign({}, this.dataSet);
        set.foreach(function (value) {
            _this.insertData(value, result);
        });
        return result;
    };
    HashSet.prototype.contains = function (e) {
        var key = Util_1.hashCode(e);
        if (this.dataSet.hasOwnProperty(key)) {
            return true;
        }
        return false;
    };
    HashSet.prototype.remove = function (e) {
        var result = HashSet.of();
        result.dataSet = __assign({}, this.dataSet);
        var key = Util_1.hashCode(e);
        delete result.dataSet[key];
        return result;
    };
    HashSet.prototype.removeAll = function (set) {
        var result = HashSet.of();
        result.dataSet = __assign({}, this.dataSet);
        set.foreach(function (value) {
            delete result.dataSet[value];
        });
        return result;
    };
    HashSet.prototype.retain = function (predicate) {
        var _this = this;
        var result = HashSet.of();
        this.foreach(function (value) {
            if (predicate(value))
                _this.insertData(value, result);
        });
        return result;
    };
    HashSet.prototype.subsetOf = function (subset) {
        var _this = this;
        var flag = true;
        if (this.size < subset.size)
            return false;
        var _loop_1 = function (key) {
            flag = subset.exists(function (value) { return value == _this.dataSet[key]; });
            if (flag == false)
                return "break";
        };
        for (var key in this.dataSet) {
            var state_1 = _loop_1(key);
            if (state_1 === "break")
                break;
        }
        return flag;
    };
    HashSet.prototype.foreach = function (consumer) {
        for (var key in this.dataSet) {
            consumer(this.dataSet[key]);
        }
    };
    HashSet.prototype.insertData = function (data, target) {
        if (target === void 0) { target = this; }
        var key = Util_1.hashCode(data);
        if (!target.dataSet.hasOwnProperty(key)) {
            target.dataSet[key] = data;
            return true;
        }
        return false;
    };
    HashSet.prototype.insertMappedData = function (data, target) {
        var key = Util_1.hashCode(data);
        if (!target.dataSet.hasOwnProperty(key)) {
            target.dataSet[key] = data;
            return true;
        }
        return false;
    };
    return HashSet;
}());
exports["default"] = HashSet;
