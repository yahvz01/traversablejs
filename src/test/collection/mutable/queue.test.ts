import {MutableQueue, mutableQueueOf} from "../../../main"


describe("BufferedQueue test { MutableQueue }", () => {

    let emptyQueue : MutableQueue<number>
    let singleQueue : MutableQueue<number>
    let doubleQueue : MutableQueue<number>
    let testQueue : MutableQueue<number>

    beforeEach(() => {
        // mutable
        emptyQueue = mutableQueueOf();
        singleQueue = mutableQueueOf(111);
        doubleQueue = mutableQueueOf(95, 200);
        testQueue = mutableQueueOf(1, 2, 3, 4, 5, 6)
    })

    test("MutableQueue : property size ", () => {
        expect(emptyQueue.size).toEqual(0)
        expect(singleQueue.size).toEqual(1)
        expect(doubleQueue.size).toEqual(2)
        expect(testQueue.size).toEqual(6)
    })

    test("MutableQueue : property isEmpty ", () => {
        expect(emptyQueue.isEmpty).toBeTruthy()
        expect(singleQueue.isEmpty).toBeFalsy()
        expect(doubleQueue.isEmpty).toBeFalsy()
        expect(testQueue.isEmpty).toBeFalsy()
    })

    test("MutableQueue : property front ", () => {
        expect(() => emptyQueue.front).toThrowError()
        expect(singleQueue.front).toEqual(111)
        expect(doubleQueue.front).toEqual(95)
        expect(testQueue.front).toEqual(1)
    })

    test("MutableQueue : property hasNext ", () => {
        expect(emptyQueue.hasNext).toBeFalsy()
        expect(singleQueue.hasNext).toBeTruthy()
        expect(doubleQueue.hasNext).toBeTruthy()
        expect(testQueue.hasNext).toBeTruthy()
    })

    test("MutableQueue : method enqueue ", () => {
        expect(emptyQueue.enqueue(59).size).toEqual(1)
        expect(singleQueue.enqueue(59).size).toEqual(2)
        expect(doubleQueue.enqueue(59).size).toEqual(3)
        expect(testQueue.enqueue(59).size).toEqual(7)
    })

    test("MutableQueue : method dequeue ", () => {
        expect(() => emptyQueue.dequeue()).toThrowError()
        expect(singleQueue.dequeue()).toEqual(111)
        expect(doubleQueue.dequeue()).toEqual(95)
        expect(testQueue.dequeue()).toEqual(1)
    })

    test("MutableQueue : method dequeueOptional ", () => {
        expect(() => emptyQueue.dequeueOptional().get()).toThrowError()
        expect(emptyQueue.dequeueOptional().getOrElse(-1)).toEqual(-1)
        expect(singleQueue.dequeueOptional().getOrElse(-1)).toEqual(111)
        expect(doubleQueue.dequeueOptional().getOrElse(-1)).toEqual(95)
        expect(testQueue.dequeueOptional().getOrElse(-1)).toEqual(1)
    })
})