/*
    MutableQueue (Adaptor) test
 */

import {MutableStack} from "../../../main/collection/mutable/adapter/Stack"
import {mutableStackOf} from "../../../main"
import Buffer from "../../../main/collection/mutable/buffer/Buffer"

describe('MutableQueue (Adaptor) property test', () => {

    let emptyStack: MutableStack<number>
    let singleStack: MutableStack<number>
    let doubleStack: MutableStack<number>
    let multiStack: MutableStack<number>

    beforeEach(() => {
        emptyStack = mutableStackOf<number>()
        singleStack = mutableStackOf(111)
        doubleStack = mutableStackOf(95, 200)
        multiStack = mutableStackOf(1, 2, 3, 4, 5, 6)
    })

    test("property: size", () => {
        expect(emptyStack.size).toEqual(0)
        expect(singleStack.size).toEqual(1)
        expect(doubleStack.size).toEqual(2)
        expect(multiStack.size).toEqual(6)
    })

    test("property: top", () => {
        expect(() => emptyStack.top).toThrowError()
        expect(singleStack.top).toEqual(111)
        expect(doubleStack.top).toEqual(200)
        expect(multiStack.top).toEqual(6)
    })

    test("property: isEmpty", () => {
        expect(emptyStack.isEmpty).toBeTruthy()
        expect(singleStack.isEmpty).toBeFalsy()
        expect(doubleStack.isEmpty).toBeFalsy()
        expect(multiStack.isEmpty).toBeFalsy()
    })

    test("property: hasNext", () => {
        expect(emptyStack.hasNext).toBeFalsy()
        expect(singleStack.hasNext).toBeTruthy()
        expect(doubleStack.hasNext).toBeTruthy()
        expect(multiStack.hasNext).toBeTruthy()
    })
})

describe('MutableQueue (Adaptor) method test', () => {

    let emptyStack: MutableStack<number>
    let singleStack: MutableStack<number>
    let doubleStack: MutableStack<number>
    let multiStack: MutableStack<number>

    beforeEach(() => {
        emptyStack = mutableStackOf<number>()
        singleStack = mutableStackOf(111)
        doubleStack = mutableStackOf(95, 200)
        multiStack = mutableStackOf(1, 2, 3, 4, 5, 6)
    })

    test("method: push", () => {
        expect(emptyStack.push(5).size).toEqual(1)
        expect(singleStack.push(5).size).toEqual(2)
        expect(doubleStack.push(5).size).toEqual(3)
        expect(multiStack.push(5).size).toEqual(7)
    })

    test("method: pushAll", () => {
        const buffer = Buffer.of(5)
        expect(emptyStack.pushAll(buffer).size).toEqual(1)
        expect(singleStack.pushAll(buffer).size).toEqual(2)
        expect(doubleStack.pushAll(buffer).size).toEqual(3)
        expect(multiStack.pushAll(buffer).size).toEqual(7)
    })

    test("method: pop", () => {
        expect(() => emptyStack.pop()).toThrowError()
        expect(singleStack.pop()).toEqual(111)
        expect(doubleStack.pop()).toEqual(200)
        expect(multiStack.pop()).toEqual(6)
    })

    test("method: popOptional", () => {
        expect(() => emptyStack.popOptional().get()).toThrowError()
        expect(emptyStack.popOptional().getOrElse(-1)).toEqual(-1)
        expect(singleStack.popOptional().get()).toEqual(111)
        expect(doubleStack.popOptional().get()).toEqual(200)
        expect(multiStack.popOptional().get()).toEqual(6)
    })
    test("method: popAll", () => {
        expect(emptyStack.popAll().size).toEqual(0)
        expect(singleStack.popAll().size).toEqual(1)
        expect(doubleStack.popAll().size).toEqual(2)
        expect(multiStack.popAll().size).toEqual(6)
    })

})