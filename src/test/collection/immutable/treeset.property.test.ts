
import {TreeSet, Traversable} from "../../../main"

describe("Treeset property test [Traversable]", () => {

    let emptyTreeSet : Traversable<number>
    let singleTreeSet : Traversable<number>
    let doubleTreeSet : Traversable<number>
    let testTreeSet : Traversable<number>

    beforeEach(() => {
        emptyTreeSet = TreeSet.of<number>()
        singleTreeSet = TreeSet.of(111)
        doubleTreeSet = TreeSet.of(95, 200)
        testTreeSet = TreeSet.of(1, 2, 3, 4, 4, 5, 5, 5, 6)
    })

    test("treeset : property isEmpty { Traversable}", () => {
        expect(emptyTreeSet.isEmpty).toBeTruthy()
        expect(singleTreeSet.isEmpty).toBeFalsy()
        expect(doubleTreeSet.isEmpty).toBeFalsy()
        expect(testTreeSet.isEmpty).toBeFalsy()
    })

    test("treeset : property size { Traversable}", () => {
        expect(emptyTreeSet.size).toEqual(0)
        expect(singleTreeSet.size).toEqual(1)
        expect(doubleTreeSet.size).toEqual(2)
        expect(testTreeSet.size).toEqual(6)
    })

    test("treeset : property size { Traversable}", () => {
        expect(emptyTreeSet.size).toEqual(0)
        expect(singleTreeSet.size).toEqual(1)
        expect(doubleTreeSet.size).toEqual(2)
        expect(testTreeSet.size).toEqual(6)
    })

    test("treeset : property size { Traversable}", () => {
        expect(emptyTreeSet.size).toEqual(0)
        expect(singleTreeSet.size).toEqual(1)
        expect(doubleTreeSet.size).toEqual(2)
        expect(testTreeSet.size).toEqual(6)
    })

    test("treeset : property hasDefiniteSize { Traversable}", () => {
        expect(emptyTreeSet.hasDefiniteSize()).toBeTruthy()
        expect(singleTreeSet.hasDefiniteSize()).toBeTruthy()
        expect(doubleTreeSet.hasDefiniteSize()).toBeTruthy()
        expect(testTreeSet.hasDefiniteSize()).toBeTruthy()
    })

    test("treeset : property head { Traversable }", () => {
        expect(() => emptyTreeSet.head).toThrowError()
        expect(singleTreeSet.head).toEqual(111)
        expect(() => singleTreeSet.head).not.toThrowError()
        expect(doubleTreeSet.head).toEqual(95)
        expect(() => doubleTreeSet.head).not.toThrowError()
        expect(testTreeSet.head).toEqual(1)
        expect(() => testTreeSet.head).not.toThrowError()
    })

    test("treeset : property headOptional { Traversable }", () => {
        expect(() => emptyTreeSet.headOptional.get()).toThrowError()
        expect(emptyTreeSet.headOptional.getOrElse(-1)).toEqual(-1)

        expect(() => singleTreeSet.headOptional.get()).not.toThrowError()
        expect(singleTreeSet.headOptional.get()).toEqual(111)
        expect(singleTreeSet.headOptional.getOrElse(-1)).toEqual(111)

        expect(() => doubleTreeSet.headOptional.get()).not.toThrowError()
        expect(doubleTreeSet.headOptional.get()).toEqual(95)
        expect(doubleTreeSet.headOptional.getOrElse(-1)).toEqual(95)

        expect(() => testTreeSet.headOptional.get()).not.toThrowError()
        expect(testTreeSet.headOptional.get()).toEqual(1)
        expect(testTreeSet.headOptional.getOrElse(-1)).toEqual(1)
    })

    test("treeset : property last { Traversable }", () => {
        expect(() => emptyTreeSet.last).toThrowError()

        expect(singleTreeSet.last).toEqual(111)
        expect(() => singleTreeSet.last).not.toThrowError()

        expect(doubleTreeSet.last).toEqual(200)
        expect(() => doubleTreeSet.last).not.toThrowError()

        expect(testTreeSet.last).not.toBeNaN()
        expect(() => testTreeSet.last).not.toThrowError()
    })

    test("treeset : property lastOptional { Traversable }", () => {
        expect(() => emptyTreeSet.lastOptional.get()).toThrowError()
        expect(emptyTreeSet.lastOptional.getOrElse(-1)).toEqual(-1)

        expect(() => singleTreeSet.lastOptional.get()).not.toThrowError()
        expect(singleTreeSet.lastOptional.get()).toEqual(111)
        expect(singleTreeSet.lastOptional.getOrElse(-1)).toEqual(111)

        expect(() => doubleTreeSet.lastOptional.get()).not.toThrowError()
        expect(doubleTreeSet.lastOptional.get()).not.toBeNaN()
        expect(doubleTreeSet.lastOptional.getOrElse(-1)).not.toEqual(-1)

        expect(() => testTreeSet.lastOptional.get()).not.toThrowError()
        expect(testTreeSet.lastOptional.get()).not.toBeNaN()
        expect(testTreeSet.lastOptional.getOrElse(-1)).not.toEqual(-1)

    })

    test("treeset : property tail { Traversable }", () => {
        expect(emptyTreeSet.tail.size).toEqual(0)
        expect(singleTreeSet.tail.size).toEqual(0)
        expect(doubleTreeSet.tail.size).toEqual(1)
        expect(testTreeSet.tail.size).toEqual(5)
    })

    test("treeset : property init { Traversable }", () => {
        expect(emptyTreeSet.init.size).toEqual(0)
        expect(singleTreeSet.init.size).toEqual(0)
        expect(doubleTreeSet.init.size).toEqual(1)
        expect(testTreeSet.init.size).toEqual(5)
    })

})