
import {HashMap, Traversable, tupleOf, MapTuple} from "../../../main"


describe("Hash property test [Traversable]", () => {

    let emptyHashMap : Traversable<MapTuple<number, string>>
    let singleHashMap : Traversable<MapTuple<number, string>>
    let doubleHashMap : Traversable<MapTuple<number, string>>
    let testHashMap : Traversable<MapTuple<number, string>>

    beforeEach(() => {
        emptyHashMap = HashMap.of()
        singleHashMap = HashMap.of(tupleOf(111, "111a"))
        doubleHashMap = HashMap.of(
            tupleOf(95, "95a"),
            tupleOf(200, "200a")
        )
        testHashMap = HashMap.of(
            tupleOf(1, "1a"),
            tupleOf(2, "2a"),
            tupleOf(3, "3a"),
            tupleOf(4, "4a"),
            tupleOf(5, "5a"),
            tupleOf(6, "6a")
        )
    })

    test("hashmap : property isEmpty { Traversable}", () => {
        expect(emptyHashMap.isEmpty).toBeTruthy()
        expect(singleHashMap.isEmpty).toBeFalsy()
        expect(doubleHashMap.isEmpty).toBeFalsy()
        expect(testHashMap.isEmpty).toBeFalsy()
    })

    test("hashmap : property size { Traversable}", () => {
        expect(emptyHashMap.size).toEqual(0)
        expect(singleHashMap.size).toEqual(1)
        expect(doubleHashMap.size).toEqual(2)
        expect(testHashMap.size).toEqual(6)
    })

    test("hashmap : property hasDefiniteSize { Traversable}", () => {
        expect(emptyHashMap.hasDefiniteSize()).toBeTruthy()
        expect(singleHashMap.hasDefiniteSize()).toBeTruthy()
        expect(doubleHashMap.hasDefiniteSize()).toBeTruthy()
        expect(testHashMap.hasDefiniteSize()).toBeTruthy()
    })

    test("hashmap : property head { Traversable }", () => {
        expect(() => emptyHashMap.head).toThrowError()
        expect(singleHashMap.head.key).toEqual(111)
        expect(() => singleHashMap.head).not.toThrowError()
        expect(doubleHashMap.head.key).toEqual(95)
        expect(() => doubleHashMap.head).not.toThrowError()
        expect(testHashMap.head.key).toEqual(1)
        expect(() => testHashMap.head).not.toThrowError()
    })

    test("hashmap : property headOptional { Traversable }", () => {
        expect(() => emptyHashMap.headOptional.get()).toThrowError()
        expect(emptyHashMap.headOptional.getOrElse(tupleOf(-1, "-1a")).key).toEqual(-1)

        expect(() => singleHashMap.headOptional.get()).not.toThrowError()
        expect(singleHashMap.headOptional.get().key).toEqual(111)
        expect(singleHashMap.headOptional.getOrElse(tupleOf(-1, "-1a")).key).toEqual(111)

        expect(() => doubleHashMap.headOptional.get()).not.toThrowError()
        //expect(doubleHashMap.headOptional.get().key).or
        //expect(doubleHashMap.headOptional.getOrElse(tupleOf(-1, "-1a")).key).toEqual(95)

        expect(() => testHashMap.headOptional.get()).not.toThrowError()
        //expect(testHashMap.headOptional.get()).toEqual(1)
        //expect(testHashMap.headOptional.getOrElse(-1)).toEqual(1)
    })

    test("hashmap : property last { Traversable }", () => {
        expect(() => emptyHashMap.last).toThrowError()

        expect(singleHashMap.last.key).toEqual(111)
        expect(() => singleHashMap.last).not.toThrowError()

        //expect(doubleHashMap.last.key).toEqual(200)
        //expect(() => doubleHashMap.last).not.toThrowError()

        //expect(testHashMap.last).not.toBeNaN()
        //expect(() => testHashMap.last).not.toThrowError()
    })

    test("hashmap : property lastOptional { Traversable }", () => {
        expect(() => emptyHashMap.lastOptional.get()).toThrowError()
        expect(emptyHashMap.lastOptional.getOrElse(tupleOf(-1, "-1a")).key).toEqual(-1)

        expect(() => singleHashMap.lastOptional.get()).not.toThrowError()
        //expect(singleHashMap.lastOptional.get()).toEqual(111)
        //expect(singleHashMap.lastOptional.getOrElse(-1)).toEqual(111)

        expect(() => doubleHashMap.lastOptional.get()).not.toThrowError()
        //expect(doubleHashMap.lastOptional.get()).not.toBeNaN()
        //expect(doubleHashMap.lastOptional.getOrElse(-1)).not.toEqual(-1)

        expect(() => testHashMap.lastOptional.get()).not.toThrowError()
        //expect(testHashMap.lastOptional.get()).not.toBeNaN()
        //expect(testHashMap.lastOptional.getOrElse(-1)).not.toEqual(-1)

    })

    test("hashmap : property tail { Traversable }", () => {
        expect(emptyHashMap.tail.size).toEqual(0)
        expect(singleHashMap.tail.size).toEqual(0)
        expect(doubleHashMap.tail.size).toEqual(1)
        expect(testHashMap.tail.size).toEqual(5)
    })

    test("hashmap : property init { Traversable }", () => {
        expect(emptyHashMap.init.size).toEqual(0)
        expect(singleHashMap.init.size).toEqual(0)
        expect(doubleHashMap.init.size).toEqual(1)
        expect(testHashMap.init.size).toEqual(5)
    })

})