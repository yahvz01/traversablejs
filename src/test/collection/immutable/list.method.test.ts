/*
    list method test
 */

import {listOf, Traversable} from "../../../main"

describe("List method test [Traversable]", () => {

    let emptyList : Traversable<number>
    let singleList : Traversable<number>
    let doubleList : Traversable<number>
    let multiList : Traversable<number>

    const oddNumberFunction = (value : number) => value % 2 != 0
    const evenNumberFunction = (value : number) => value % 2 == 0
    const over100Predicate = (value : number) => value > 100
    const notOver100Predicate = (value : number) => value <= 100

    beforeEach(() => {
        emptyList = listOf<number>()
        singleList = listOf<number>(111)
        doubleList = listOf<number>(95, 200)
        multiList = listOf<number>(1, 2, 3, 4, 5, 6)
    })

    test("method: slice", () => {
        expect(emptyList.slice(0, 0).size).toEqual(0)
        expect(emptyList.slice(0, 1).size).toEqual(0)

        expect(singleList.slice(0, 1)).toEqual(listOf(111))
        expect(singleList.slice(0, 1).size).toEqual(1)
        expect(singleList.slice(0, 2)).toEqual(listOf(111))
        expect(singleList.slice(0, 2).size).toEqual(1)

        expect(doubleList.slice(0, 1)).toEqual(listOf(95))
        expect(doubleList.slice(0, 1).size).toEqual(1)
        expect(doubleList.slice(0, 2)).toEqual(listOf(95, 200))
        expect(doubleList.slice(0, 2).size).toEqual(2)
        expect(doubleList.slice(0, 3).size).toEqual(2)

        expect(multiList.slice(0, 1)).toEqual(listOf(1))
        expect(multiList.slice(0, 1).size).toEqual(1)
        expect(multiList.slice(0, 2)).toEqual(listOf(1, 2))
        expect(multiList.slice(0, 2).size).toEqual(2)
        expect(multiList.slice(0, 5)).toEqual(listOf(1, 2, 3, 4, 5))
        expect(multiList.slice(0, 6)).toEqual(listOf(1, 2, 3, 4, 5, 6))
        expect(multiList.slice(0, 6).size).toEqual(6)
        //expect(() => multiList.slice(0, 7)).toThrowError()
    })

    test("method: foreach", () => {
        let emptyCount = 0
        const emptyCountValue = (value : number) => ++emptyCount
        emptyList.foreach(emptyCountValue)
        expect(emptyCount).toEqual(0)

        let singleCount = 0
        const singleCountValue = (value : number) => ++singleCount
        singleList.foreach(singleCountValue)
        expect(singleCount).toEqual(1)

        let doubleCount = 0
        const doubleCountValue = (value : number) => ++doubleCount
        doubleList.foreach(doubleCountValue)
        expect(doubleCount).toEqual(2)

        let multiCount = 0
        const multiCountValue = (value : number) => ++multiCount
        multiList.foreach(multiCountValue)
        expect(multiCount).toEqual(6)
    })

    test("method: take", () => {
        expect(emptyList.slice(0, 1).size).toEqual(0)
        expect(emptyList.slice(0, 1).size).toEqual(0)

        expect(singleList.slice(0, 1).size).toEqual(1)
        expect(singleList.slice(0, 2).size).toEqual(1)

        expect(doubleList.slice(0, 1).size).toEqual(1)
        expect(doubleList.slice(0, 2).size).toEqual(2)

        expect(multiList.slice(0, 1).size).toEqual(1)
        expect(multiList.slice(0, 2).size).toEqual(2)
        expect(multiList.slice(4, 6).size).toEqual(2)
        expect(multiList.slice(0, 6).size).toEqual(6)
        expect(multiList.slice(0, 641241).size).toEqual(6)
    })

    test.skip("method: drop", () => {
        expect(emptyList.drop(0).size).toEqual(0)
        expect(emptyList.drop(1).size).toEqual(0)

        expect(singleList.drop(0).size).toEqual(0)
        expect(singleList.drop(1).size).toEqual(0)
        expect(singleList.drop(2).size).toEqual(0)

        expect(doubleList.drop(0)).toEqual(listOf(95, 200))
        expect(doubleList.drop(1).size).toEqual(1)
/*
        expect(doubleList.drop(2).size).toEqual(0)
        expect(doubleList.drop(3).size).toEqual(0)

        expect(multiList.drop(0).size).toEqual(6)
        expect(multiList.drop(2).size).toEqual(4)
        expect(multiList.drop(4).size).toEqual(2)
        expect(multiList.drop(6).size).toEqual(0)
        expect(multiList.drop(641241).size).toEqual(0)
*/
    })

    test("method: takeWhile", () => {
        const over100Predicate = (value : number) => value > 100
        const notOver100Predicate = (value : number) => value <= 100
        expect(emptyList.takeWhile(oddNumberFunction).size).toEqual(0)
        expect(emptyList.takeWhile(evenNumberFunction).size).toEqual(0)

        expect(singleList.takeWhile(oddNumberFunction)).toEqual(listOf<number>())
        expect(singleList.takeWhile(oddNumberFunction).size).toEqual(0)

        expect(singleList.takeWhile(evenNumberFunction)).toEqual(listOf(111))
        expect(singleList.takeWhile(evenNumberFunction).size).toEqual(1)

        expect(singleList.takeWhile(over100Predicate).size).toEqual(0)
        expect(singleList.takeWhile(notOver100Predicate).size).toEqual(1)

        expect(doubleList.takeWhile(oddNumberFunction).size).toEqual(0)
        expect(doubleList.takeWhile(evenNumberFunction).size).toEqual(1)
        expect(doubleList.takeWhile(over100Predicate).size).toEqual(1)
        expect(doubleList.takeWhile(notOver100Predicate).size).toEqual(0)

        expect(multiList.takeWhile(oddNumberFunction).size).toEqual(0)
        expect(multiList.takeWhile(evenNumberFunction).size).toEqual(1)
    })

    describe("method dropWhile : total", () => {
        test("method: dropWhile : emptyList", () => {
            expect(emptyList.dropWhile(oddNumberFunction).size).toEqual(0)
            expect(emptyList.dropWhile(evenNumberFunction).size).toEqual(0)
        })

        test("method: dropWhile : singleList ", () => {
            expect(singleList.dropWhile(evenNumberFunction)).toEqual(listOf<number>())
            expect(singleList.dropWhile(evenNumberFunction).size).toEqual(0)

            expect(singleList.dropWhile(oddNumberFunction)).toEqual(listOf(111))
            expect(singleList.dropWhile(oddNumberFunction).size).toEqual(1)
        })
        test("method: dropWhile : doubleList ", () => {
            expect(doubleList.dropWhile(oddNumberFunction).size).toEqual(2)
            expect(doubleList.dropWhile(evenNumberFunction).size).toEqual(1)
            expect(doubleList.dropWhile(over100Predicate).size).toEqual(1)
            expect(doubleList.dropWhile(notOver100Predicate).size).toEqual(2)
        })
        test("method: dropWhile : multiList ", () => {
            expect(multiList.dropWhile(oddNumberFunction)).toEqual(listOf(1, 2, 3, 4, 5, 6))
            expect(multiList.dropWhile(oddNumberFunction).size).toEqual(6)
            expect(multiList.dropWhile(evenNumberFunction)).toEqual(listOf(2, 3, 4, 5, 6))
            expect(multiList.dropWhile(evenNumberFunction).size).toEqual(5)
        })
    })

    describe("method filter : total", () => {
        test("method: filter : emptyList", () => {
            expect(emptyList.filter(oddNumberFunction)).toEqual(listOf())
            expect(emptyList.filter(oddNumberFunction).size).toEqual(0)
            expect(emptyList.filter(evenNumberFunction)).toEqual(listOf())
            expect(emptyList.filter(evenNumberFunction).size).toEqual(0)
        })

        test("method: filter : singleList ", () => {
            expect(singleList.filter(evenNumberFunction)).toEqual(listOf<number>())
            expect(singleList.filter(evenNumberFunction).size).toEqual(0)

            expect(singleList.filter(oddNumberFunction)).toEqual(listOf(111))
            expect(singleList.filter(oddNumberFunction).size).toEqual(1)
        })
        test("method: filter : doubleList ", () => {
            expect(doubleList.filter(oddNumberFunction)).toEqual(listOf(95))
            expect(doubleList.filter(oddNumberFunction).size).toEqual(1)
            expect(doubleList.filter(evenNumberFunction)).toEqual(listOf(200))
            expect(doubleList.filter(evenNumberFunction).size).toEqual(1)

            expect(doubleList.filter(over100Predicate)).toEqual(listOf(200))
            expect(doubleList.filter(over100Predicate).size).toEqual(1)
            expect(doubleList.filter(notOver100Predicate)).toEqual(listOf(95))
            expect(doubleList.filter(notOver100Predicate).size).toEqual(1)
        })
        test("method: filter : multiList ", () => {
            expect(multiList.filter(oddNumberFunction)).toEqual(listOf(1,3,5))
            expect(multiList.filter(oddNumberFunction).size).toEqual(3)
            expect(multiList.filter(evenNumberFunction)).toEqual(listOf(2, 4, 6))
            expect(multiList.filter(evenNumberFunction).size).toEqual(3)
        })
    })

    describe("method forall : total", () => {
        // default Value is true
        test("method: forall : emptyList", () => {
            expect(emptyList.forall(oddNumberFunction)).toBeTruthy()
            expect(emptyList.forall(evenNumberFunction)).toBeTruthy()
        })

        test("method: forall : singleList ", () => {
            expect(singleList.forall(evenNumberFunction)).toBeFalsy()
            expect(singleList.forall(oddNumberFunction)).toBeTruthy()
        })
        test("method: forall : doubleList ", () => {
            expect(doubleList.forall(oddNumberFunction)).toBeFalsy()
            expect(doubleList.forall(evenNumberFunction)).toBeFalsy()

            expect(doubleList.forall(over100Predicate)).toBeFalsy()
            expect(doubleList.forall(notOver100Predicate)).toBeFalsy()
        })
        test("method: forall : multiList ", () => {
            expect(multiList.forall(oddNumberFunction)).toBeFalsy()
            expect(multiList.forall(evenNumberFunction)).toBeFalsy()

            expect(multiList.forall(over100Predicate)).toBeFalsy()
            expect(multiList.forall(notOver100Predicate)).toBeTruthy()
        })
    })

    describe("method exists : total", () => {
        // default Value is false
        test("method: exists : emptyList", () => {
            expect(emptyList.exists(oddNumberFunction)).toBeFalsy()
            expect(emptyList.exists(evenNumberFunction)).toBeFalsy()
        })

        test("method: exists : singleList ", () => {
            expect(singleList.exists(evenNumberFunction)).toBeFalsy()
            expect(singleList.exists(oddNumberFunction)).toBeTruthy()
        })
        test("method: exists : doubleList ", () => {
            expect(doubleList.exists(oddNumberFunction)).toBeTruthy()
            expect(doubleList.exists(evenNumberFunction)).toBeTruthy()

            expect(doubleList.exists(over100Predicate)).toBeTruthy()
            expect(doubleList.exists(notOver100Predicate)).toBeTruthy()
        })
        test("method: exists : multiList ", () => {
            expect(multiList.exists(oddNumberFunction)).toBeTruthy()
            expect(multiList.exists(evenNumberFunction)).toBeTruthy()

            expect(multiList.exists(over100Predicate)).toBeFalsy()
            expect(multiList.exists(notOver100Predicate)).toBeTruthy()
        })
    })

    describe("method count : total", () => {
        // default Value is false
        test("method: count : emptyList", () => {
            expect(emptyList.count(oddNumberFunction)).toEqual(0)
            expect(emptyList.count(evenNumberFunction)).toEqual(0)
        })

        test("method: count : singleList ", () => {
            expect(singleList.count(evenNumberFunction)).toEqual(0)
            expect(singleList.count(oddNumberFunction)).toEqual(1)
        })
        test("method: count : doubleList ", () => {
            expect(doubleList.count(oddNumberFunction)).toEqual(1)
            expect(doubleList.count(evenNumberFunction)).toEqual(1)

            expect(doubleList.count(over100Predicate)).toEqual(1)
            expect(doubleList.count(notOver100Predicate)).toEqual(1)
        })
        test("method: exists : multiList ", () => {
            expect(multiList.count(oddNumberFunction)).toEqual(3)
            expect(multiList.count(evenNumberFunction)).toEqual(3)

            expect(multiList.count(over100Predicate)).toEqual(0)
            expect(multiList.count(notOver100Predicate)).toEqual(6)
        })
    })

    describe("method foldLeft : total", () => {
        const addFunction = (acc : number, value : number) => acc + value
        const multiplyFunction = (acc : number, value : number) => acc * value

        // default Value is false
        test("method: count : emptyList", () => {
            expect(emptyList.foldLeft(0, addFunction)).toEqual(0)
            expect(emptyList.foldLeft(1, multiplyFunction)).toEqual(1)
        })

        test("method: count : singleList ", () => {
            expect(singleList.foldLeft(0, addFunction)).toEqual(111)
            expect(singleList.foldLeft(1, multiplyFunction)).toEqual(111)
        })
        test("method: count : doubleList ", () => {
            expect(doubleList.foldLeft(0, addFunction)).toEqual(95 + 200)
            expect(doubleList.foldLeft(1, multiplyFunction)).toEqual(95 * 200)
        })
        test("method: count : multiList ", () => {
            expect(multiList.foldLeft(0, addFunction)).toEqual(1 + 2 + 3 + 4 + 5 + 6)
            expect(multiList.foldLeft(1, multiplyFunction)).toEqual(2 * 3 * 4 * 5 * 6)
        })
    })

    describe("method foldRight : total", () => {
        const addFunction = (acc : number, value : number) => acc + value
        const multiplyFunction = (acc : number, value : number) => acc * value

        // default Value is false
        test("method: count : emptyList", () => {
            expect(emptyList.foldRight(0, addFunction)).toEqual(0)
            expect(emptyList.foldRight(1, multiplyFunction)).toEqual(1)
        })

        test("method: count : singleList ", () => {
            expect(singleList.foldRight(0, addFunction)).toEqual(111)
            expect(singleList.foldRight(1, multiplyFunction)).toEqual(111)
        })
        test("method: count : doubleList ", () => {
            expect(doubleList.foldRight(0, addFunction)).toEqual(95 + 200)
            expect(doubleList.foldRight(1, multiplyFunction)).toEqual(95 * 200)
        })
        test("method: count : multiList ", () => {
            expect(multiList.foldRight(0, addFunction)).toEqual(1 + 2 + 3 + 4 + 5 + 6)
            expect(multiList.foldRight(1, multiplyFunction)).toEqual(2 * 3 * 4 * 5 * 6)
        })
    })
})