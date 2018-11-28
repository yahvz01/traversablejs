"use strict";
// morder
exports.__esModule = true;
var Optional = /** @class */ (function () {
    function Optional(data) {
        this.data = data;
    }
    Optional.of = function (data) {
        return new Optional(data);
    };
    Optional.prototype.get = function () {
        if (!this.isPresent(this.data)) {
            throw new Error("IllegalException");
        }
        return this.data;
    };
    Optional.prototype.getOrElse = function (defaultData) {
        if (!this.isPresent(this.data))
            return defaultData;
        else
            return this.data;
    };
    Optional.prototype.ifPresent = function (consumer) {
        if (!this.isPresent(this.data)) {
            consumer(this.data);
        }
    };
    Optional.prototype.isPresent = function (data) {
        if (this.data == undefined || this.data == null) {
            return false;
        }
        else {
            return true;
        }
    };
    return Optional;
}());
exports["default"] = Optional;
