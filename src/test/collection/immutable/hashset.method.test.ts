import {HashSet, Traversable, Set} from "../../../main";

describe('hashset : Traversable property', () => {

    let testHashSet : Traversable<number>
    let emptyHashSet: Traversable<number>
    let singleHashSet : Traversable<number>

    beforeEach(() => {
        testHashSet = HashSet.of(1, 2, 3, 4, 5, 5, 6)
        emptyHashSet = HashSet.of()
        singleHashSet = HashSet.of(111)
    })

    test("Traversable slice", () => {
        //length
        expect(testHashSet.slice(0, 2).size).toEqual(2)
        expect(singleHashSet.slice(0, 1).size).toEqual(1)
        expect(() => singleHashSet.slice(2,3)).toThrowError()
        expect(() => emptyHashSet.slice(0, 1)).toThrowError()
    })

    test("Traverable slice from index greater than to", () => {
        expect(testHashSet.slice(1, 1).size).toEqual(0)
        expect(() => testHashSet.slice(2, 1)).toThrowError()
        expect(() => singleHashSet.slice(2,2).size).toThrowError()
        expect(() => emptyHashSet.slice(0, 1)).toThrowError()
    })

    test("Traversable take", () => {
        expect(testHashSet.take(5).size).toEqual(6)
        expect(testHashSet.take(0).size).toEqual(1)
        expect(singleHashSet.take(0).size).toEqual(1)

    })

    test("Traversable take Throw", () => {
        expect(() => testHashSet.take(111)).toThrowError()
        expect(() => singleHashSet.take(6)).toThrowError()
        expect(() => emptyHashSet.take(1)).toThrowError()
    })

    test("Traversable drop", () => {
        expect(testHashSet.drop(1).size).toEqual(5)
        expect(testHashSet.drop(0).size).toEqual(6)
        expect(singleHashSet.drop(0).size).toEqual(1)
    })

    test("Traversable takeWhile", () => {
        // UnExpected This Test only depend on hash function
    })
    test("Traversable dropWhile", () => {
        // UnExpected This Test only depend on hash function
    })
    test("Traversable filter", () => {
        const evenCheck = ( e: number ) =>  e % 2 == 0
        expect(testHashSet.filter(evenCheck).size).toEqual(3)
        expect(singleHashSet.filter(evenCheck).size).toEqual(0)
        expect(emptyHashSet.filter(evenCheck).size).toEqual(0)
    })

    test("Traversable forall", () => {
        const isDigitCheck = ( e : number ) => e < 10
        expect(testHashSet.forall(isDigitCheck)).toEqual(true)
        expect(singleHashSet.forall(isDigitCheck)).not.toEqual(true)
        expect(emptyHashSet.forall(isDigitCheck)).toEqual(true)
    })
    test("Traversable exists", () => {
        const isOverFiveCheck = ( e : number ) => e > 5
        expect(testHashSet.exists(isOverFiveCheck)).toEqual(true)
        expect(singleHashSet.exists(isOverFiveCheck)).toEqual(true)
        expect(emptyHashSet.exists(isOverFiveCheck)).not.toEqual(true)

    })
    test("Traversable count", () => {
        const oddCheck = ( e: number ) =>  e % 2 != 0
        expect(testHashSet.count(oddCheck)).toEqual(3)
        expect(singleHashSet.count(oddCheck)).toEqual(1)
        expect(emptyHashSet.count(oddCheck)).toEqual(0)
    })
    test("Traversable foldLeft", () => {
        const addAccumulation = ( acc : number, curr : number ) => acc + curr
        const mutiplyAccumulation = ( acc : number, curr : number ) => acc * curr

        expect(testHashSet.foldLeft(0, addAccumulation)).toEqual( 1 + 2 + 3 + 4 + 5 + 6)
        expect(testHashSet.foldLeft(1, mutiplyAccumulation)).toEqual( 1 * 2 * 3 * 4 * 5 * 6)

        expect(singleHashSet.foldLeft(0, addAccumulation)).toEqual( 111)
        expect(singleHashSet.foldLeft(1, mutiplyAccumulation)).toEqual( 111)

        expect(emptyHashSet.foldLeft(0, addAccumulation)).toEqual( 0)
        expect(emptyHashSet.foldLeft(0, mutiplyAccumulation)).toEqual( 0)
    })
    test("Traversable foldRight", () => {
        // Not Different with foldLeft
    })
})


describe('hashset:Set property', () => {
    let testHashSet : Set<number>
    let emptyHashSet: Set<number>
    let singleHashSet : Set<number>

    beforeEach(() => {
        testHashSet = HashSet.of(1, 2, 3, 4, 5, 5, 6)
        singleHashSet = HashSet.of(111)
        emptyHashSet = HashSet.of()
    })

    test("Set contains", () => {
        expect(testHashSet.contains(3)).toBeTruthy()
        expect(testHashSet.contains(7)).not.toBeTruthy()
        expect(singleHashSet.contains(111)).toBeTruthy()
        expect(singleHashSet.contains(222)).not.toBeTruthy()
        expect(emptyHashSet.contains(222)).not.toBeTruthy()
    })

    test("Set subsetOf", () => {
        expect(testHashSet.subsetOf(singleHashSet)).not.toBeTruthy()
        expect(testHashSet.subsetOf(HashSet.of(1,2,3))).not.toBeTruthy()

        expect(singleHashSet.subsetOf(HashSet.of(111))).toBeTruthy()
        expect(singleHashSet.subsetOf(HashSet.of(222))).not.toBeTruthy()

        expect(emptyHashSet.subsetOf(emptyHashSet)).toBeTruthy()
        expect(emptyHashSet.subsetOf(singleHashSet)).not.toBeTruthy()
    })

    test("Set add", () => {
        expect(testHashSet.add(5)).toEqual(testHashSet)
        expect(testHashSet.add(8)).not.toEqual(testHashSet)

        expect(singleHashSet.add(111)).toEqual(singleHashSet)
        expect(singleHashSet.add(222)).not.toEqual(singleHashSet)

        const oneHashSet = emptyHashSet.add(5)
        expect(emptyHashSet).toEqual(HashSet.of<number>())
        expect(oneHashSet).toEqual(HashSet.of<number>(5))
    })
    test("Set addAll", () => {
        const addSingleSet = HashSet.of(333)
        const addMultiSet = HashSet.of(1,2,3,4,5)

        expect(testHashSet.addAll(addMultiSet)).toEqual(testHashSet)
        expect(testHashSet.addAll(addSingleSet)).toEqual(testHashSet.add(333))

        expect(singleHashSet.addAll(addSingleSet)).toEqual(HashSet.of(111,333))
        expect(singleHashSet.addAll(HashSet.of(111))).toEqual(HashSet.of(111))

        expect(emptyHashSet.addAll(addSingleSet)).toEqual(HashSet.of(333))
    })
    test("Set remove", () => {

        expect(testHashSet.remove(4)).toEqual(HashSet.of(1, 2, 3, 5, 6))
        expect(testHashSet.remove(8)).toEqual(testHashSet)

        expect(singleHashSet.remove(333)).toEqual(HashSet.of(111))
        expect(singleHashSet.remove(111)).toEqual(HashSet.of<number>())

        expect(emptyHashSet.remove(9294)).toEqual(HashSet.of())
    })
    test("Set removeAll", () => {
        const addMultiSet = HashSet.of(1,2,3,4,5)
        const addSingleSet = HashSet.of(333)

        expect(testHashSet.removeAll(addMultiSet)).toEqual(HashSet.of(6))
        expect(testHashSet.removeAll(addSingleSet)).toEqual(testHashSet)

        expect(singleHashSet.removeAll(addSingleSet)).toEqual(HashSet.of(111))
        expect(singleHashSet.removeAll(HashSet.of(111))).toEqual(HashSet.of<number>())

        expect(emptyHashSet.addAll(addSingleSet)).toEqual(HashSet.of(333))
    })
    test("Set retain", () => {
        const oddNumberPredicateFunction = (e : number) => e % 2 != 0
        const evenNumberPredicateFunction = (e : number) => e % 2 == 0

        expect(testHashSet.retain(evenNumberPredicateFunction)).toEqual(HashSet.of(2,4,6))

        expect(singleHashSet.retain(oddNumberPredicateFunction)).toEqual(HashSet.of(111))

        expect(singleHashSet.retain(evenNumberPredicateFunction)).toEqual(HashSet.of())

        expect(emptyHashSet.retain(oddNumberPredicateFunction)).toEqual(HashSet.of())
        expect(emptyHashSet.retain(evenNumberPredicateFunction)).toEqual(HashSet.of())

    })
})
