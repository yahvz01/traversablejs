import { Seq, Traversable, Vector, Gen } from "../../../main";

describe("Vector implements Traversable only method", () => {


    let emptyVector : Traversable<number>
    let singleVector : Traversable<number>
    let doubleVector : Traversable<number>
    let multiVector : Traversable<number>

    beforeEach(() => {
        emptyVector = Vector.of<number>()
        singleVector = Vector.of<number>(111)
        doubleVector = Vector.of<number>(2, 3)
        multiVector = Vector.of(1, 2, 3, 4, 5)
    })

    afterEach(() => {
        // immutable Check
        expect(emptyVector.size).toEqual(0)
        expect(singleVector.size).toEqual(1)
        expect(doubleVector.size).toEqual(2)
        expect(multiVector.size).toEqual(5)
    })

    // 하위 컬렉션

    test("vector slice", () => {
        expect(multiVector.slice(1,3)).toEqual(Vector.of(2, 3))
    })

    test("vector slice from until equal", () => {
        expect(multiVector.slice(1,1)).toEqual(Vector.of())
    })

    test("vector slice indexing Error", () => {
        expect(() => multiVector.slice(3,2)).toThrowError()
    })

    test("vector take", () => {
        expect(emptyVector.take(0)).toEqual(Vector.of())
        expect(emptyVector.take(0).size).toEqual(0)

        expect(singleVector.take(1)).toEqual(Vector.of(111))
        expect(singleVector.take(1).size).toEqual(1)

        expect(doubleVector.take(1)).toEqual(Vector.of(2))
        expect(doubleVector.take(1).size).toEqual(1)

        expect(doubleVector.take(2)).toEqual(Vector.of(2, 3))
        expect(doubleVector.take(2).size).toEqual(2)

        expect(multiVector.take(1)).toEqual(Vector.of(1))
        expect(multiVector.take(1).size).toEqual(1)
        expect(multiVector.take(5)).toEqual(Vector.of(1,2,3,4,5))
        expect(multiVector.take(5).size).toEqual(5)
    })

    test("vector takeWhile", () => {
        const result = multiVector.takeWhile((value) => value > 3)
        expect(result).toEqual(Vector.of(1, 2, 3))
    })

    test("vector drop", () => {
        expect(multiVector.drop(1)).toEqual(Vector.of(3, 4, 5))
    })

    test("vector dropWhile", () => {
        const result = multiVector.dropWhile((value) => value < 3)
        expect(result).toEqual(Vector.of(3, 4, 5))
    })

    test("vector filter", () => {
        const result = multiVector.filter((value) => value % 2 == 0)
        expect(result).toEqual(Vector.of(2, 4))
    })

    // 원소 조건
    test("vector forall", () => {
        expect(multiVector.forall((value) => value < 6 )).toBeTruthy()
        expect(multiVector.forall((value) => value == 6)).toBeFalsy()
    })
    test("vector exists", () => {
        const result = multiVector.exists((value) => {
            return value == 5;
        });
        expect(result).toBeTruthy()
    })
    test("vector count", () => {
        const result = multiVector.count((value) => value % 2 == 0)
        expect(result).toEqual(2)
    })

    // Fold
    test("vector foldLeft", () => {
        const result = multiVector.foldLeft(0, ((acc, curr) => acc + curr))
        expect(result).toEqual( 1 + 2 + 3 + 4 + 5)
    })
    test("vector foldRight", () => {
        const result = multiVector.foldRight(0, ((acc, curr) => acc + curr))
        expect(result).toEqual( 1 + 2 + 3 + 4 + 5)
    })

})

describe("Vector implements Seq only method", () => {

    let testVector : Seq<number>

    beforeEach(() => {
        testVector = Vector.of(1, 2, 3, 4, 5)
    })

    // 인덱스와 길
    test("vector apply(search) and get", () => {
        expect(testVector.apply(3).get()).toEqual(4)
    })
    test("vector apply(search) and get and throw Error", () => {
        expect(() => testVector.apply(6).get()).toThrowError()
    })

    test("vector apply(search) and getOrElse", () => {
        expect(testVector.apply(4).getOrElse(-1)).toEqual(5)
    })

    test("vector apply(search) and getOrElse return default value", () => {
        expect(testVector.apply(5).getOrElse(-1)).toEqual(-1)
    })

    test("vector indice Generator", () => {
        expect(testVector.indices()).toEqual(Gen.to(0, 4))
    })

    // 추가
    test("vector unshift", () => {
        expect(testVector.unshift(0)).toEqual(Vector.of(0, 1, 2, 3, 4, 5))
    })
    test("vector shift", () => {
        expect(testVector.shift()).toEqual(Vector.of(2, 3, 4, 5))
    })
    test("vector push", () => {
        expect(testVector.push(6)).toEqual(Vector.of(1, 2, 3, 4, 5, 6))
    })
    test("vector pop", () => {
        expect(testVector.pop()).toEqual(Vector.of(1, 2, 3, 4))
    })
})