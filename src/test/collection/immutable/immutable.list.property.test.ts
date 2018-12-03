import Traversable from "../../../main/collection/Traversable"
import {listOf} from "../../../main"

describe("List property test [Traversable]", () => {

    let emptyList : Traversable<TestWrapper>
    let singleList : Traversable<TestWrapper>
    let doubleList : Traversable<TestWrapper>
    let multiList : Traversable<TestWrapper>

    beforeEach(() => {
        emptyList = listOf()
        singleList = listOf(TestWrapper.of(111))
        doubleList = listOf(TestWrapper.of(95), TestWrapper.of(200))
        multiList = listOf<TestWrapper>(
            TestWrapper.of(1),
            TestWrapper.of(2),
            TestWrapper.of(3),
            TestWrapper.of(4),
            TestWrapper.of(5),
            TestWrapper.of(6))
    })

    afterEach(() => {
        expect(emptyList.size).toEqual(0)
        expect(singleList.size).toEqual(1)
        expect(singleList).toEqual(listOf(TestWrapper.of(111)))
        expect(doubleList.size).toEqual(2)
        expect(doubleList).toEqual(listOf(TestWrapper.of(95), TestWrapper.of(200)))
        expect(multiList.size).toEqual(6)
        expect(multiList).toEqual(listOf<TestWrapper>(
            TestWrapper.of(1),
            TestWrapper.of(2),
            TestWrapper.of(3),
            TestWrapper.of(4),
            TestWrapper.of(5),
            TestWrapper.of(6))
        )
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
        expect(singleList.head).toEqual(TestWrapper.of(111))
        expect(doubleList.head).toEqual(TestWrapper.of(95))
        expect(multiList.head).toEqual(TestWrapper.of(1))
    })

    test("property: headOptional", () => {
        expect(() => emptyList.headOptional.get()).toThrowError()
        expect(emptyList.headOptional.getOrElse(TestWrapper.of(-1))).toEqual(TestWrapper.of(-1))

        expect(singleList.headOptional.get()).toEqual(TestWrapper.of(111))
        expect(singleList.headOptional.get().data).toEqual(111)
        expect(singleList.headOptional.getOrElse(TestWrapper.of(-1))).toEqual(TestWrapper.of(111))

        expect(doubleList.headOptional.get()).toEqual(TestWrapper.of(95))
        expect(doubleList.headOptional.getOrElse(TestWrapper.of(-1))).toEqual(TestWrapper.of(95))
        expect(doubleList.headOptional.getOrElse(TestWrapper.of(-1))).not.toEqual(TestWrapper.of(-1))

        expect(multiList.headOptional.get()).toEqual(TestWrapper.of(1))
        expect(multiList.headOptional.getOrElse(TestWrapper.of(-1)).data).toEqual(1)
        expect(multiList.headOptional.getOrElse(TestWrapper.of(-1)).data).not.toEqual(-1)

    })

    test("property: last", () => {
        expect(() => emptyList.last).toThrowError()
        expect(singleList.last).toEqual(TestWrapper.of(111))
        expect(doubleList.last).toEqual(TestWrapper.of(200))
        expect(multiList.last).toEqual(TestWrapper.of(6))
    })

    test("property: lastOptional", () => {
        expect(() => emptyList.lastOptional.get()).toThrowError()
        expect(emptyList.lastOptional.getOrElse(TestWrapper.of(-1))).toEqual(TestWrapper.of(-1))

        expect(singleList.lastOptional.get()).toEqual(TestWrapper.of(111))
        expect(singleList.lastOptional.getOrElse(TestWrapper.of(-1))).toEqual(TestWrapper.of(111))

        expect(doubleList.lastOptional.get()).toEqual(TestWrapper.of(200))
        expect(doubleList.lastOptional.getOrElse(TestWrapper.of(-1))).toEqual(TestWrapper.of(200))
        expect(doubleList.lastOptional.getOrElse(TestWrapper.of(-1))).not.toEqual(TestWrapper.of(-1))

        expect(multiList.lastOptional.get()).toEqual(TestWrapper.of(6))
        expect(multiList.lastOptional.getOrElse(TestWrapper.of(-1)).data).toEqual(6)
        expect(multiList.lastOptional.getOrElse(TestWrapper.of(-1)).data).not.toEqual(-1)
    })

    test("property: tail", () => {
        expect(emptyList.tail).toEqual(emptyList)
        expect(emptyList.tail.size).toEqual(0)

        expect(singleList.tail).toEqual(listOf())
        expect(singleList.tail.size).toEqual(0)

        expect(doubleList.tail).toEqual(listOf(TestWrapper.of(200)))
        expect(doubleList.tail.size).toEqual(1)

        expect(multiList.tail).toEqual(listOf<TestWrapper>(
            TestWrapper.of(2),
            TestWrapper.of(3),
            TestWrapper.of(4),
            TestWrapper.of(5),
            TestWrapper.of(6)))
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


class TestWrapper {
    private _data : number
    get data() : number { return this._data }

    static of(data : number ) : TestWrapper {
        return new TestWrapper(data)
    }
    private constructor(data : number){
        this._data = data
    }
}
