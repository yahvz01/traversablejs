/*
    Buffer<number> (Mutable) ...
 */

import Buffer from "../../../main/collection/mutable/buffer/Buffer"
import {MutableTraversable, Traversable} from "../../../main"

describe("Buffer property test [Traversable]", () => {

    let emptyBuffer : MutableTraversable<number>
    let singleBuffer : MutableTraversable<number>
    let doubleBuffer : MutableTraversable<number>
    let multiBuffer : MutableTraversable<number>

    beforeEach(() => {
        emptyBuffer = Buffer.of<number>()
        singleBuffer = Buffer.of<number>(111)
        doubleBuffer = Buffer.of(95, 200)
        multiBuffer = Buffer.of<number>(1, 2, 3, 4, 5, 6)
    })

    test("property: isEmpty", () => {
        expect(emptyBuffer.isEmpty).toBeTruthy()
        expect(singleBuffer.isEmpty).not.toBeTruthy()
        expect(multiBuffer.isEmpty).not.toBeTruthy()
    })

    test("property: size", () => {
        expect(emptyBuffer.size).toEqual(0)
        expect(singleBuffer.size).toEqual(1)
        expect(multiBuffer.size).toEqual(6)
    })

    test("property: hasDifiniteSize", () => {
        expect(emptyBuffer.hasDefiniteSize()).toBeTruthy()
        expect(singleBuffer.hasDefiniteSize()).toBeTruthy()
        expect(multiBuffer.hasDefiniteSize()).toBeTruthy()
    })

    test("property: head", () => {
        expect(() => emptyBuffer.head).toThrowError()
        expect(singleBuffer.head).toEqual(111)
        expect(multiBuffer.head).toEqual(1)
    })

    test("property: headOption", () => {
        expect(emptyBuffer.headOptional.getOrElse(-1)).toEqual(-1)
        expect(singleBuffer.headOptional.get()).toEqual(111)
        expect(singleBuffer.headOptional.getOrElse(-1)).toEqual(111)
        expect(multiBuffer.headOptional.get()).toEqual(1)
        expect(multiBuffer.headOptional.getOrElse(-1)).toEqual(1)
    })

    test("property: last", () => {
        expect(() => emptyBuffer.last).toThrowError()
        expect( () => singleBuffer.last).toThrowError()
        expect(multiBuffer.last).toEqual(6)
    })

    test("property: lastOption", () => {
        expect(() => emptyBuffer.lastOptional.get()).toThrowError()
        expect(emptyBuffer.lastOptional.getOrElse(-1)).toEqual(-1)
        expect(singleBuffer.lastOptional.get()).toEqual(111)
        expect(singleBuffer.lastOptional.getOrElse(-1)).toEqual(111)
        expect(multiBuffer.lastOptional.get()).toEqual(6)
        expect(multiBuffer.lastOptional.getOrElse(-1)).toEqual(6)
    })

    test("property: tail", () => {
        expect(emptyBuffer.tail.size).toEqual(0)
        expect(singleBuffer.tail.size).toEqual(0)
        expect(doubleBuffer.tail.size).toEqual(1)
        //console.log(JSON.stringify(multiBuffer))
        //console.log(JSON.stringify(multiBuffer.tail))
        expect(multiBuffer.tail).toEqual(Buffer.of(2,3,4,5,6))
        expect(multiBuffer.tail.size).toEqual(5)
    })

    test("property: init", () => {
        expect(emptyBuffer.init.size).toEqual(0)
        expect(singleBuffer.init.size).toEqual(0)
        expect(doubleBuffer.init.size).toEqual(1)
        expect(multiBuffer.init.size).toEqual(5)
    })

    test("buffer : Symbol.iterator { Traversable }", () => {
        let resultArray = [];
        for(const el of emptyBuffer){
            resultArray.push(el)
        }
        expect(emptyBuffer.size).toEqual(resultArray.length);

        resultArray = [];
        for(const el of singleBuffer){
            resultArray.push(el)
        }
        expect(singleBuffer.size).toEqual(resultArray.length)

        resultArray = [];
        for(const el of doubleBuffer){
            resultArray.push(el)
        }
        expect(doubleBuffer.size).toEqual(resultArray.length)

        resultArray = [];
        for(const el of multiBuffer){
            resultArray.push(el)
        }
        expect(multiBuffer.size).toEqual(resultArray.length)
    })
})
