import { Vector, Traversable } from "../../../main";

// Traversable
describe("Vector implements Traversable only property", () => {

    function makeEmpty(){
        multiVector = Vector.of();
    }

    let emptyVector : Traversable<number>
    let singleVector : Traversable<number>
    let doubleVector : Traversable<number>
    let multiVector : Traversable<number>

    beforeEach(() => {
        emptyVector = Vector.of<number>()
        singleVector = Vector.of(111)
        doubleVector = Vector.of(95, 200)
        multiVector = Vector.of(1, 2, 3, 4, 5)
    })
    
    afterEach(() => {
        // immutable Size Check
        expect(emptyVector.size).toEqual(0)
        expect(singleVector.size).toEqual(1)
        expect(doubleVector.size).toEqual(2)
        expect(multiVector.size).toEqual(5)
    })

    test("vector isEmpty", () => {
        expect(emptyVector.isEmpty).toBeTruthy()
        expect(multiVector.isEmpty).not.toBeTruthy()
    })
    test("vector size", () => {
        expect(multiVector.size).toEqual(5)
    })
    test("vector hasDefinedSize", () => {
        expect(multiVector.hasDefiniteSize()).toBeTruthy()
    })

    // 크기정보
    // head
    test("vector head", () => {
        expect(() => emptyVector.head).toThrowError()
        expect(multiVector.head).toEqual(1)
    })

    test("vector headOption get", () => {
        expect(multiVector.headOptional.get()).toBe(1)
    })

    test("vector headerOption getOrElse", () => {
        expect(emptyVector.headOptional.getOrElse(-1)).toEqual(-1)
    })

    // head
    test("vector last", () => {
        expect(multiVector.last).toBe(5)
    })

    test("vector last throw Error", () => {
        expect(() => emptyVector.last).toThrowError()
    })

    test("vector lastOption get", () => {
        expect(multiVector.lastOptional.get()).toBe(5)
    })

    test("vector lastOption get throw Error", () => {
        expect(emptyVector.lastOptional.getOrElse(-1)).toEqual(-1)
    })

    test("vector lastOption getOrElse", () => {
        expect(emptyVector.lastOptional.getOrElse(-1)).toEqual(-1)
    })

    test("vector tail", () => {
        expect(multiVector.tail).toEqual(Vector.of(2,3,4,5))
    })

    test("vector tail Empty", () => {
        expect(emptyVector.tail).toEqual(Vector.of())
    })
});