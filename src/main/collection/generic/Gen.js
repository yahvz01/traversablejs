"use strict";
exports.__esModule = true;
var Gen = /** @class */ (function () {
    function Gen(from, to) {
        this.from = from;
        this.to = to;
        if (from > to)
            throw new RangeError("from index is greeter than end index(until|ti)");
    }
    Gen.to = function (from, to) {
        return new Gen(from, to);
    };
    Gen.until = function (from, until) {
        return Gen.to(from, until - 1);
    };
    Gen.prototype.toIter = function () {
        var result = new Array();
        var index = 0;
        for (var curr = this.from; curr < this.to; ++curr) {
            result[index] = curr;
            ++index;
        }
        return result;
    };
    Gen.prototype.contains = function (index) {
        if (index % 1 == 0) {
            if (index >= this.from && index <= this.to) {
                return true;
            }
        }
        return false;
    };
    return Gen;
}());
exports["default"] = Gen;
