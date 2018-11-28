import { Optional } from "../../main";

/**
 * Optional<_Tp> test case
 */

describe("Optional Type", () => {
    test("Optional NotNull GetSuccess", () => {
        const notNull = Optional.of("james")
        expect(notNull.get()).not.toBeNull()
        expect(notNull.get()).not.toBeUndefined()
    })

    test("Optional Nullable GetDefault", () => {
        const name = "james"
        const nullable = Optional.of(name)
        expect(nullable.getOrElse("default")).not.toBeNull()
    })

    test("Optional Consumer Check", () => {
        const param = Optional.of("james")
        param.ifPresent((value) => {
            expect(value).toEqual("james")
        })
    })
})