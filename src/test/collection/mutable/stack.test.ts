import {mutableStackOf, MutableStack, listOf} from "../../../main"

describe("BufferedStack test { MutableStack }", () => {

    let emptyStack : MutableStack<number>
    let singleStack : MutableStack<number>
    let doubleStack : MutableStack<number>
    let testStack : MutableStack<number>

    beforeEach(() => {
        // mutable
        emptyStack = mutableStackOf();
        singleStack = mutableStackOf(111);
        doubleStack = mutableStackOf(95, 200);
        testStack = mutableStackOf(1, 2, 3, 4, 5, 6)
    })

    test("MutableStack : property size ", () => {
        expect(emptyStack.size).toEqual(0)
        expect(singleStack.size).toEqual(1)
        expect(doubleStack.size).toEqual(2)
        expect(testStack.size).toEqual(6)
    })

    test("MutableStack : property isEmpty ", () => {
        expect(emptyStack.isEmpty).toBeTruthy()
        expect(singleStack.isEmpty).toBeFalsy()
        expect(doubleStack.isEmpty).toBeFalsy()
        expect(testStack.isEmpty).toBeFalsy()
    })

    test("MutableStack : property hasNext ", () => {
        expect(emptyStack.hasNext).toBeFalsy()
        expect(singleStack.hasNext).toBeTruthy()
        expect(doubleStack.hasNext).toBeTruthy()
        expect(testStack.hasNext).toBeTruthy()
    })

    test("MutableStack : property top ", () => {
        expect(() => emptyStack.top).toThrowError()
        expect(singleStack.top).toEqual(111)
        expect(doubleStack.top).toEqual(200)
        expect(testStack.top).toEqual(6)
    })

    test("MutableStack : method push", () => {
        emptyStack.push(59)
        expect(emptyStack.top).toEqual(59)
        expect(emptyStack.size).toEqual(1)

        singleStack.push(59)
        expect(singleStack.top).toEqual(59)
        expect(singleStack.size).toEqual(2)

        doubleStack.push(59)
        expect(doubleStack.top).toEqual(59)
        expect(doubleStack.size).toEqual(3)

        testStack.push(59)
        expect(testStack.top).toEqual(59)
        expect(testStack.size).toEqual(7)
    })

    test("MutableStack : method pushAll ", () => {
        const traversable = listOf( 34, 59)
        emptyStack.pushAll(traversable)
        expect(emptyStack.top).toEqual(59)
        expect(emptyStack.size).toEqual(2)

        singleStack.pushAll(traversable)
        expect(singleStack.top).toEqual(59)
        expect(singleStack.size).toEqual(3)

        doubleStack.pushAll(traversable)
        expect(doubleStack.top).toEqual(59)
        expect(doubleStack.size).toEqual(4)

        testStack.pushAll(traversable)
        expect(testStack.top).toEqual(59)
        expect(testStack.size).toEqual(8)
    })

    test("MutableStack : method pop", () => {
        expect(() => emptyStack.pop()).toThrowError()
        expect(singleStack.pop()).toEqual(111)
        expect(singleStack.size).toEqual(0)

        expect(doubleStack.pop()).toEqual(200)
        expect(doubleStack.top).toEqual(95)
        expect(doubleStack.size).toEqual(1)

        expect(testStack.pop()).toEqual(6)
        expect(testStack.top).toEqual(5)
        expect(testStack.size).toEqual(5)
    })

    test("MutableStack : method popOptional ", () => {
        expect(() => emptyStack.popOptional().get()).toThrowError()
        expect(emptyStack.popOptional().getOrElse(-1)).toEqual(-1)

        expect(singleStack.popOptional().get()).toEqual(111)

        expect(doubleStack.popOptional().get()).toEqual(200)
        expect(doubleStack.popOptional().getOrElse(-1)).toEqual(95)

        expect(testStack.popOptional().get()).toEqual(6)
        expect(testStack.popOptional().getOrElse(-1)).toEqual(5)
    })
})