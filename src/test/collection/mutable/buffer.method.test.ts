import {MutableTraversable, Traversable, Buffer} from "../../../main"


describe("Buffer property test [Traversable]", () => {

    let emptyBuffer : MutableTraversable<number>
    let singleBuffer : MutableTraversable<number>
    let doubleBuffer : MutableTraversable<number>
    let multiBuffer : MutableTraversable<number>


    const evenNumberFunction = (value : number) => value % 2 == 0
    const oddNumberFunction = (value : number) => value % 2 != 0

    function printObj( obj : any){
        console.log(`Result : ${JSON.stringify(obj)}`)
    }
    beforeEach(() => {
        emptyBuffer = Buffer.of<number>()
        singleBuffer = Buffer.of<number>(111)
        doubleBuffer = Buffer.of(95, 200)
        multiBuffer = Buffer.of<number>(1, 2, 3, 4, 5, 6)
    })

    test("method slice", () => {
        expect(emptyBuffer.slice(0, 0).size).toEqual(0)
        expect(() => emptyBuffer.slice(0, 1)).toThrowError()
        expect(() => emptyBuffer.slice(2, 1)).toThrowError()

        expect(singleBuffer.slice(0, 0).size ).toEqual(0)
        expect(singleBuffer.slice(0, 1).size).toEqual(1)
        expect(() => singleBuffer.slice(0, 2).size).toThrowError()

        expect(doubleBuffer.slice(0, 0).size).toEqual(0)
        expect(doubleBuffer.slice(0, 1).size).toEqual(1)
        expect(doubleBuffer.slice(0, 2).size).toEqual(2)
        expect(doubleBuffer.slice(1, 2).size).toEqual(1)

        expect(multiBuffer.slice(0,0).size).toEqual(0)
        expect(multiBuffer.slice(0,5).size).toEqual(5)
        expect(multiBuffer.slice(3,5).size).toEqual(2)
        expect(() => multiBuffer.slice(5,0).size).toThrowError()
    })

    test("method take", () => {
        expect(emptyBuffer.take(0).size).toEqual(0)
        expect(() => emptyBuffer.take(1)).toThrowError()

        expect(singleBuffer.take(0).size).toEqual(0)
        expect(singleBuffer.take(1).size).toEqual(1)

        expect(doubleBuffer.take(0).size).toEqual(0)
        expect(doubleBuffer.take(1).size).toEqual(1)
        expect(doubleBuffer.take(2).size).toEqual(2)
        expect(() => doubleBuffer.take(3).size).toThrowError()

        expect(() => multiBuffer.take(-1)).toThrowError()
        expect(multiBuffer.take(0).size).toEqual(0)
        expect(multiBuffer.take(1).size).toEqual(1)
        expect(multiBuffer.take(2).size).toEqual(2)
        expect(multiBuffer.take(multiBuffer.size).size).toEqual(multiBuffer.size)
        expect(() => multiBuffer.take(multiBuffer.size + 1).size).toThrowError()
    })

    test("method drop", () => {
        expect(emptyBuffer.drop(0).size).toEqual(0)
        expect(emptyBuffer.drop(1).size).toEqual(0)

        //expect(() => emptyBuffer.drop(1)).toThrowError()
        //expect(() => emptyBuffer.drop(1)).toThrowError()

        expect(singleBuffer.drop(0).size).toEqual(1)

        expect(doubleBuffer.drop(0).size).toEqual(2)
        expect(doubleBuffer.drop(1).size).toEqual(1)

        expect(multiBuffer.drop(0).size).toEqual(multiBuffer.size)
        expect(multiBuffer.drop(1).size).toEqual(multiBuffer.size - 1)
        expect(multiBuffer.drop(2).size).toEqual(multiBuffer.size - 2)
        expect(multiBuffer.drop(5).size).toEqual(1)
    })

    test("method takeWhile", () => {
        const over3NumberFunction = (value : number) => value > 3

        expect(emptyBuffer.takeWhile(evenNumberFunction).size).toEqual(0)
        expect(emptyBuffer.takeWhile(oddNumberFunction).size).toEqual(0)

        expect(singleBuffer.takeWhile(value => value == 111).size).toEqual(0)
        expect(singleBuffer.takeWhile(value => value != 111).size).toEqual(1)

        expect(doubleBuffer.takeWhile(evenNumberFunction).size).toEqual(1)
        expect(doubleBuffer.takeWhile(oddNumberFunction).size).toEqual(0)

        expect(multiBuffer.takeWhile(over3NumberFunction).size).toEqual(3)
        //expect(multiBuffer.takeWhile(over3NumberFunction).size).toEqual(0)
    })

    test("method dropWhile", () => {

    })

    test("method filter", () => {
        expect(emptyBuffer.filter(evenNumberFunction).size).toEqual(0)
        expect(emptyBuffer.filter(oddNumberFunction).size).toEqual(0)

        expect(singleBuffer.filter(evenNumberFunction).size).toEqual(0)
        expect(singleBuffer.filter(oddNumberFunction).size).toEqual(1)

        expect(doubleBuffer.filter(evenNumberFunction).size).toEqual(1)
        expect(doubleBuffer.filter(oddNumberFunction).size).toEqual(1)

        expect(multiBuffer.filter(evenNumberFunction).size).toEqual(3)
        expect(multiBuffer.filter(oddNumberFunction).size).toEqual(3)
    })

    test("method forall", () => {
        // empty 상태에서는 기본적으로 default로 true
        expect(emptyBuffer.forall(evenNumberFunction)).toBeTruthy()
        expect(emptyBuffer.forall(oddNumberFunction)).toBeTruthy()

        expect(singleBuffer.forall(evenNumberFunction)).not.toBeTruthy()
        expect(singleBuffer.forall(oddNumberFunction)).toBeTruthy()

        expect(doubleBuffer.forall(evenNumberFunction)).not.toBeTruthy()
        expect(doubleBuffer.forall(oddNumberFunction)).not.toBeTruthy()

        expect(multiBuffer.forall(value => value < 10)).toBeTruthy()
        expect(multiBuffer.forall(value => value > 10)).not.toBeTruthy()
    })

    test("method exists", () => {
        // empty 상태에서는 기본적으로 default로 false
        expect(emptyBuffer.exists(evenNumberFunction)).not.toBeTruthy()
        expect(emptyBuffer.exists(oddNumberFunction)).not.toBeTruthy()

        expect(singleBuffer.exists(evenNumberFunction)).not.toBeTruthy()
        expect(singleBuffer.exists(oddNumberFunction)).toBeTruthy()

        expect(doubleBuffer.exists(evenNumberFunction)).toBeTruthy()
        expect(doubleBuffer.exists(oddNumberFunction)).toBeTruthy()

        expect(multiBuffer.exists(value => value < 10)).toBeTruthy()
        expect(multiBuffer.exists(value => value > 10)).not.toBeTruthy()
    })

    test("method count", () => {
        expect(emptyBuffer.count(evenNumberFunction)).toEqual(0)
        expect(emptyBuffer.count(oddNumberFunction)).toEqual(0)

        expect(singleBuffer.count(evenNumberFunction)).toEqual(0)
        expect(singleBuffer.count(oddNumberFunction)).toEqual(1)

        expect(doubleBuffer.count(evenNumberFunction)).toEqual(1)
        expect(doubleBuffer.count(oddNumberFunction)).toEqual(1)

        expect(multiBuffer.count(value => value < 10)).toEqual(6)
        expect(multiBuffer.count(value => value > 10)).toEqual(0)
    })

    test("method foldLeft", () => {
        const accFunction = (acc : number, value : number) =>  acc + value
        const mulFunction = (acc : number, value : number) =>  acc * value
        expect(emptyBuffer.foldLeft(0, accFunction)).toEqual(0)

        expect(singleBuffer.foldLeft(0, accFunction)).toEqual(111)

        expect(doubleBuffer.foldLeft(0, accFunction)).toEqual(95 + 200)
        expect(doubleBuffer.foldLeft(1, mulFunction)).toEqual(95 * 200)

        expect(multiBuffer.foldLeft(0, accFunction)).toEqual(1 + 2 + 3 + 4 + 5 + 6)
        expect(multiBuffer.foldLeft(1, mulFunction)).toEqual(1 * 2 * 3 * 4 * 5 * 6)
    })

    test("method foldRight", () => {
        const accFunction = (acc : number, value : number) =>  acc + value
        const mulFunction = (acc : number, value : number) =>  acc * value
        expect(emptyBuffer.foldRight(0, accFunction)).toEqual(0)

        expect(singleBuffer.foldRight(0, accFunction)).toEqual(111)

        expect(doubleBuffer.foldRight(0, accFunction)).toEqual(95 + 200)
        expect(doubleBuffer.foldRight(1, mulFunction)).toEqual(95 * 200)

        expect(multiBuffer.foldRight(0, accFunction)).toEqual(1 + 2 + 3 + 4 + 5 + 6)
        expect(multiBuffer.foldRight(1, mulFunction)).toEqual(1 * 2 * 3 * 4 * 5 * 6)
    })
})
