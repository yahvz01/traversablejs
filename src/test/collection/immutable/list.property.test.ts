/*
    list property test
 */

import {listOf, Traversable} from "../../../main"

describe("List property test [Traversable]", () => {

    let emptyList : Traversable<number>
    let singleList : Traversable<number>
    let doubleList : Traversable<number>
    let multiList : Traversable<number>

    beforeEach(() => {
        emptyList = listOf<number>()
        singleList = listOf<number>(111)
        doubleList = listOf<number>(95, 200)
        multiList = listOf<number>(1, 2, 3, 4, 5, 6)
    })

    test("property: isEmpty", () => {
        expect(emptyList.isEmpty).toBeTruthy()
        expect(singleList.isEmpty).toBeFalsy()
        expect(doubleList.isEmpty).toBeFalsy()
        expect(multiList.isEmpty).toBeFalsy()
    })

    test("property: size", () => {
        expect(emptyList.size).toEqual(0)
        expect(singleList.size).toEqual(1)
        expect(doubleList.size).toEqual(2)
        expect(multiList.size).toEqual(6)
    })

    test("property: hasDefiniteSize", () => {
        expect(emptyList.hasDefiniteSize()).toBeTruthy()
        expect(singleList.hasDefiniteSize()).toBeTruthy()
        expect(doubleList.hasDefiniteSize()).toBeTruthy()
        expect(multiList.hasDefiniteSize()).toBeTruthy()
    })

    test("property: head", () => {
        expect(() => emptyList.head).toThrowError()
        expect(singleList.head).toEqual(111)
        expect(doubleList.head).toEqual(95)
        expect(multiList.head).toEqual(1)
    })

    test("property: headOptional", () => {
        expect(() => emptyList.headOptional.get()).toThrowError()
        expect(emptyList.headOptional.getOrElse(-1)).toEqual(-1)
        //console.log(JSON.stringify(singleList))
        //console.log(JSON.stringify(singleList.headOptional))

        expect(singleList.headOptional.get()).toEqual(111)
        expect(singleList.headOptional.getOrElse(-1)).toEqual(111)

        expect(doubleList.headOptional.get()).toEqual(95)
        expect(doubleList.headOptional.getOrElse(-1)).toEqual(95)

        expect(multiList.headOptional.get()).toEqual(1)
        expect(multiList.headOptional.getOrElse(-1)).toEqual(1)

    })

    test("property: last", () => {
        expect(() => emptyList.last).toThrowError()
        expect(singleList.last).toEqual(111)
        expect(doubleList.last).toEqual(200)
        expect(multiList.last).toEqual(6)
    })

    test("property: lastOptional", () => {
        expect(() => emptyList.lastOptional.get()).toThrowError()
        expect(emptyList.lastOptional.getOrElse(-1)).toEqual(-1)

        expect(singleList.lastOptional.get()).toEqual(111)
        expect(singleList.lastOptional.getOrElse(-1)).toEqual(111)

        expect(doubleList.lastOptional.get()).toEqual(200)
        expect(doubleList.lastOptional.getOrElse(-1)).toEqual(200)

        expect(multiList.lastOptional.get()).toEqual(6)
        expect(multiList.lastOptional.getOrElse(-1)).toEqual(6)
    })

    test("property: tail", () => {
        expect(emptyList.tail.size).toEqual(0)

        expect(singleList.tail.size).toEqual(0)

        expect(doubleList.tail).toEqual(listOf(200))
        expect(doubleList.tail.size).toEqual(1)

        expect(multiList.tail.size).toEqual(5)
        expect(multiList.tail.size).toEqual(5)
    })

    test("property init", () => {
        expect(emptyList.init.size).toEqual(0)

        expect(singleList.init.size).toEqual(0)

        expect(doubleList.init.init.size).toEqual(0)
        expect(doubleList.init.size).toEqual(1)

        expect(multiList.init.init.size).toEqual(4)
        expect(multiList.init.size).toEqual(5)
    })
})