/*
    MutableQueue (Adaptor) test
 */


import {BufferedQueue, MutableQueue, mutableQueueOf} from "../../../main"

describe('MutableQueue (Adaptor) property test', () => {

    let emptyQueue : MutableQueue<number>
    let singleQueue : MutableQueue<number>
    let doubleQueue : MutableQueue<number>
    let multiQueue : MutableQueue<number>

    beforeEach(() => {
        emptyQueue = mutableQueueOf()
        singleQueue = mutableQueueOf(111)
        doubleQueue = mutableQueueOf(95, 200)
        multiQueue = mutableQueueOf(1, 2, 3, 4, 5, 6)
    })

    test("property: size", () => {

        expect(emptyQueue.size).toEqual(0)
        expect(emptyQueue.size).not.toEqual(1)

        expect(singleQueue.size).toEqual(1)
        expect(singleQueue.size).not.toEqual(0)

        expect(doubleQueue.size).toEqual(2)
        expect(doubleQueue.size).not.toEqual(1)

        expect(multiQueue.size).toEqual(6)
        expect(multiQueue.size).not.toEqual(0)
    })

    test("property: top", () => {
        expect(() => emptyQueue.front).toThrowError()
        //expect(emptyQueue.front).not.toEqual(1)

        expect(singleQueue.front).toEqual(111)
        expect(() => singleQueue.front).not.toThrowError()

        expect(doubleQueue.front).toEqual(95)
        expect(doubleQueue.front).not.toEqual(200)

        expect(multiQueue.front).toEqual(1)
        expect(() => multiQueue.front).not.toThrowError()
    })

    test("property: isEmpty", () => {
        expect(emptyQueue.isEmpty).toBeTruthy()
        //expect(emptyQueue.isEmpty).not.toEqual(1)

        expect(singleQueue.isEmpty).not.toBeTruthy()
        expect(singleQueue.isEmpty).not.toBeTruthy()

        expect(doubleQueue.isEmpty).not.toBeTruthy()
        expect(doubleQueue.isEmpty).not.toBeTruthy()

        expect(multiQueue.isEmpty).not.toBeTruthy()
        expect(multiQueue.isEmpty).not.toBeTruthy()
    })

    test("property: hasNext", () => {
        expect(emptyQueue.hasNext).not.toBeTruthy()
        //expect(emptyQueue.front).not.toEqual(1)

        expect(singleQueue.hasNext).toBeTruthy()
        expect(singleQueue.hasNext).toBeTruthy()

        expect(doubleQueue.hasNext).toBeTruthy()
        expect(doubleQueue.hasNext).toBeTruthy()

        expect(multiQueue.hasNext).toBeTruthy()
        expect(multiQueue.hasNext).toBeTruthy()
    })
})

describe('MutableQueue (Adaptor) method test', () => {

    let emptyQueue : MutableQueue<number>
    let singleQueue : MutableQueue<number>
    let doubleQueue : MutableQueue<number>
    let multiQueue : MutableQueue<number>

    beforeEach(() => {
        emptyQueue = BufferedQueue.of<number>()
        singleQueue = BufferedQueue.of(111)
        doubleQueue = BufferedQueue.of(95, 200)
        multiQueue = BufferedQueue.of(1, 2, 3, 4, 5, 6)
    })

    test("method : enqueue", () => {
        expect(emptyQueue.size).toEqual(0)
        expect(emptyQueue.enqueue(5).size).toEqual(1)

        expect(singleQueue.size).toEqual(1)
        expect(singleQueue.enqueue(5).size).toEqual(2)
        expect(singleQueue.enqueue(5).size).toEqual(3)

        expect(doubleQueue.size).toEqual(2)
        expect(doubleQueue.enqueue(5).size).toEqual(3)
        expect(doubleQueue.enqueue(5).size).toEqual(4)

        expect(multiQueue.size).toEqual(6)
        expect(multiQueue.enqueue(5).size).toEqual(7)
        expect(multiQueue.enqueue(5).size).toEqual(8)
    })

    test("method : dequeue", () => {
        expect(() => emptyQueue.dequeue()).toThrowError()

        //expect(singleQueue.s/ize).toEqual(1)
        expect(singleQueue.dequeue()).toEqual(111)
        expect(() => singleQueue.dequeue()).toThrowError()


        expect(doubleQueue.dequeue()).toEqual(95)
        expect(doubleQueue.dequeue()).toEqual(200)
        expect(() => doubleQueue.dequeue()).toThrowError()


        expect(multiQueue.dequeue()).toEqual(1)
        expect(multiQueue.dequeue()).toEqual(2)
        expect(multiQueue.dequeue()).toEqual(3)
        expect(multiQueue.dequeue()).toEqual(4)
        expect(multiQueue.dequeue()).toEqual(5)
        expect(multiQueue.dequeue()).toEqual(6)
        expect(() => multiQueue.dequeue()).toThrowError()
    })


    test("method : dequeueOptional", () => {

        expect(() => emptyQueue.dequeueOptional().get()).toThrowError()
        expect(emptyQueue.dequeueOptional().getOrElse(-1)).toEqual(-1)

        //expect(singleQueue.s/ize).toEqual(1)
        expect(singleQueue.dequeueOptional().get()).toEqual(111)
        expect(singleQueue.dequeueOptional().getOrElse(-1)).toEqual(-1)


        expect(doubleQueue.dequeueOptional().get()).toEqual(95)
        expect(doubleQueue.dequeueOptional().getOrElse(-1)).toEqual(200)

        expect(multiQueue.dequeueOptional().get()).toEqual(1)
        expect(multiQueue.dequeueOptional().get()).toEqual(2)
        expect(multiQueue.dequeueOptional().getOrElse(-1)).toEqual(3)
        expect(multiQueue.dequeueOptional().get()).toEqual(4)
        expect(multiQueue.dequeueOptional().getOrElse(-1)).toEqual(5)
        expect(multiQueue.dequeueOptional().get()).toEqual(6)
        expect(() => multiQueue.dequeueOptional().get()).toThrowError()
    })
})
