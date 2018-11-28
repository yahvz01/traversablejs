"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Optional_1 = __importDefault(require("../../main/util/Optional"));
/**
 * Optional<_Tp> test case
 */
describe("Optional Type", function () {
    test("Optional NotNull GetSuccess", function () {
        var notNull = Optional_1.default.of("james");
        expect(notNull.get()).not.toBeNull();
        expect(notNull.get()).not.toBeUndefined();
    });
    test("Optional Nullable GetDefault", function () {
        var name = "james";
        var nullable = Optional_1.default.of(name);
        expect(nullable.getOrElse("default")).not.toBeNull();
    });
    test("Optional Consumer Check", function () {
        var param = Optional_1.default.of("james");
        param.ifPresent(function (value) {
            expect(value).toEqual("james");
        });
    });
});
//# sourceMappingURL=Optional.test.js.map