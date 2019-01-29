import { Traversable, MapTuple, HashMap } from "../../../main"

describe("hashmap method test { Traversable }", () => {

    let emptyHashMap : Traversable<MapTuple<number, string>>
    let singleHashMap : Traversable<MapTuple<number, string>>
    let doubleHashMap : Traversable<MapTuple<number, string>>
    let testHashMap : Traversable<MapTuple<number, string>>

    const isNum = ( keyValue : MapTuple<number, string> ) => typeof(keyValue.key) == "number"
    const sum = ( acc : MapTuple<number, string>, keyValue : MapTuple<number, string> ) => typeof(keyValue.key) == "number"

    beforeEach(() => {
        emptyHashMap = HashMap.of()
        singleHashMap = HashMap.of( MapTuple.of(111, "111a") )
        doubleHashMap = HashMap.of(
            MapTuple.of(95, "95a"),
            MapTuple.of(200, "200a")
        )
        testHashMap = HashMap.of(
            MapTuple.of(1, "1a"),
            MapTuple.of(2, "2a"),
            MapTuple.of(3, "3a"),
            MapTuple.of(4, "4a"),
            MapTuple.of(5, "5a"),
            MapTuple.of(6, "6a")
        )
    })
    test("hashmap : method foreach Traversable", () => {
        let emptyCount = 0
        emptyHashMap.foreach( value => ++emptyCount)
        expect(emptyCount).toEqual(0)

        let singleCount = 0
        singleHashMap.foreach( value => ++singleCount)
        expect(singleCount).toEqual(1)

        let doubleCount = 0
        doubleHashMap.foreach( value => ++doubleCount)
        expect(doubleCount).toEqual(2)

        let testCount = 0
        testHashMap.foreach( value => ++testCount)
        expect(testCount).toEqual(6)
    })

    test("hashmap : method map Traversable", () => {
        const emptyResult = emptyHashMap.map( keyValue => keyValue.key )
        expect(emptyResult.size).toEqual(0)

        const singleResult = singleHashMap.map( keyValue => keyValue.key )
        console.log(singleResult)

        const doubleResult = doubleHashMap.map( keyValue => keyValue.key )
        expect(doubleResult.size).toEqual(2)

        const testResult = testHashMap.map( keyValue => keyValue.key )
        expect(testResult.size).toEqual(6)
    })

    test("hashmap : method slice Traversable", () => {
        expect(emptyHashMap.slice(0, 4).size).toEqual(0)
        expect(singleHashMap.slice(0, 4).size).toEqual(1)
        expect(doubleHashMap.slice(0, 4).size).toEqual(2)
        expect(testHashMap.slice(0, 4).size).toEqual(4)
    })

    test("hashmap : method take Traversable", () => {
        expect(emptyHashMap.take(4).size).toEqual(0)
        expect(singleHashMap.take(4).size).toEqual(1)
        expect(doubleHashMap.take(4).size).toEqual(2)
        expect(testHashMap.take(4).size).toEqual(4)
    })

    test("hashmap : method drop Traversable", () => {
        expect(emptyHashMap.drop(4).size).toEqual(0)
        expect(singleHashMap.drop(4).size).toEqual(0)
        expect(doubleHashMap.drop(4).size).toEqual(0)
        expect(testHashMap.drop(4).size).toEqual(2)
    })

    test("hashmap : method takeWhile Traversable", () => {
        expect(emptyHashMap.takeWhile(isNum).size).toEqual(0)
        expect(singleHashMap.takeWhile(isNum).size).toEqual(1)
        expect(doubleHashMap.takeWhile(isNum).size).toEqual(2)
        expect(testHashMap.takeWhile(isNum).size).toEqual(6)
    })

    test("hashmap : method dropWhile Traversable", () => {
        expect(emptyHashMap.dropWhile(isNum).size).toEqual(0)
        expect(singleHashMap.dropWhile(isNum).size).toEqual(0)
        expect(doubleHashMap.dropWhile(isNum).size).toEqual(0)
        expect(testHashMap.dropWhile(isNum).size).toEqual(0)
    })

    test("hashmap : method filter Traversable", () => {
        expect(emptyHashMap.filter(isNum).size).toEqual(0)
        expect(singleHashMap.filter(isNum).size).toEqual(1)
        expect(doubleHashMap.filter(isNum).size).toEqual(2)
        expect(testHashMap.filter(isNum).size).toEqual(6)
    })

    test("hashmap : method forall Traversable", () => {
        expect(emptyHashMap.forall(isNum)).toBeTruthy()
        expect(singleHashMap.forall(isNum)).toBeTruthy()
        expect(doubleHashMap.forall(isNum)).toBeTruthy()
        expect(testHashMap.forall(isNum)).toBeTruthy()
    })

    test("hashmap : method exists Traversable", () => {
        expect(emptyHashMap.exists(isNum)).toBeFalsy()
        expect(singleHashMap.exists(isNum)).toBeTruthy()
        expect(doubleHashMap.exists(isNum)).toBeTruthy()
        expect(testHashMap.exists(isNum)).toBeTruthy()
    })

    test("hashmap : method count Traversable", () => {
        expect(emptyHashMap.count(isNum)).toEqual(0)
        expect(singleHashMap.count(isNum)).toEqual(1)
        expect(doubleHashMap.count(isNum)).toEqual(2)
        expect(testHashMap.count(isNum)).toEqual(6)
    })

    test("hashmap : method foldLeft Traversable", () => {
        //expect(emptyHashMap.foldLeft(isNum)).toEqual(0)
        //expect(singleHashMap.foldLeft(isNum)).toEqual(1)
        //expect(doubleHashMap.foldLeft(isNum)).toEqual(2)
        //expect(testHashMap.foldLeft(isNum)).toEqual(6)
    })

    test("hashmap : method foldRight Traversable", () => {

    })

})


describe("hashmap method test { Map }", () => {

    let emptyHashMap : Traversable<MapTuple<number, string>>
    let singleHashMap : Traversable<MapTuple<number, string>>
    let doubleHashMap : Traversable<MapTuple<number, string>>
    let testHashMap : Traversable<MapTuple<number, string>>

    beforeEach(() => {
        emptyHashMap = HashMap.of()
        singleHashMap = HashMap.of(MapTuple.of(111, "111a"))
        doubleHashMap = HashMap.of(
            MapTuple.of(95, "95a"),
            MapTuple.of(200, "200a")
        )
        testHashMap = HashMap.of(
            MapTuple.of(1, "1a"),
            MapTuple.of(2, "2a"),
            MapTuple.of(3, "3a"),
            MapTuple.of(4, "4a"),
            MapTuple.of(5, "5a"),
            MapTuple.of(6, "6a")
        )
    })

    test("hashmap : method get Map", () => {

    })

    test("hashmap : method getOrElse Map", () => {

    })

    test("hashmap : method filterKeys Map", () => {

    })

    test("hashmap : method mapValue Map", () => {

    })

    test("hashmap : method put Map", () => {

    })

    test("hashmap : method putAll Map", () => {

    })

    test("hashmap : method remove Map", () => {

    })

    test("hashmap : method removeAll Map", () => {

    })

    test("hashmap : method clear Map", () => {

    })
})
