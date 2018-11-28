import { Vector, Traversable } from "../../../main";

// Traversable
describe("Vector implements Traversable only property", () => {

    function makeEmpty(){
        testVector = Vector.of();
    }

    let emptyVector : Traversable<number>
    let testVector : Traversable<number>

    beforeEach(() => {
        emptyVector = Vector.of<number>()
        testVector = Vector.of(1, 2, 3, 4, 5)
    })


    test("vector isEmpty", () => {
        expect(emptyVector.isEmpty).toBeTruthy()
        expect(testVector.isEmpty).not.toBeTruthy()
    })
    test("vector size", () => {
        expect(testVector.size).toEqual(5)
    })
    test("vector hasDefinedSize", () => {
        expect(testVector.hasDefiniteSize()).toBeTruthy()
    })

    // 크기정보
    // head
    test("vector head", () => {
        expect(() => emptyVector.head).toThrowError()
        expect(testVector.head).toEqual(1)
    })

    test("vector headOption get", () => {
        expect(testVector.headOptional.get()).toBe(1)
    })

    test("vector headerOption getOrElse", () => {
        makeEmpty();
        expect(testVector.headOptional.getOrElse(-1)).toEqual(-1)
    })

    // head
    test("vector last", () => {
        expect(testVector.last).toBe(5)
    })

    test("vector last throw Error", () => {
        expect(() => emptyVector.last).toThrowError()
    })

    test("vector lastOption get", () => {
        expect(testVector.lastOptional.get()).toBe(5)
    })

    test("vector lastOption get throw Error", () => {
        expect(emptyVector.lastOptional.getOrElse(-1)).toEqual(-1)
    })

    test("vector lastOption getOrElse", () => {
        makeEmpty();
        expect(testVector.lastOptional.getOrElse(-1)).toEqual(-1)
    })

    test("vector tail", () => {
        expect(testVector.tail).toEqual(Vector.of(2,3,4,5))
    })

    test("vector tail Empty", () => {
        makeEmpty();
        expect(testVector.tail).toEqual(Vector.of())
    })
});