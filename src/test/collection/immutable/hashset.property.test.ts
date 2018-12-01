import { HashSet, Traversable } from "../../../main";


describe('hashset property', function () {


    let emptyHashSet: Traversable<number>
    let singleHashSet : Traversable<number>
    let doubleHashSet : Traversable<number>
    let testHashSet : Traversable<number>

    beforeEach(() => {

        emptyHashSet = HashSet.of()
        singleHashSet = HashSet.of(111)
        doubleHashSet = HashSet.of(95, 200)
        testHashSet = HashSet.of(1, 2, 3, 4, 5, 5, 6)
    })

    afterEach(() => {
        // immutable Check
        expect(emptyHashSet.size).toEqual(0)
        expect(singleHashSet.size).toEqual(1)
        expect(doubleHashSet.size).toEqual(2)
        expect(testHashSet.size).toEqual(6)
    })

    // Traversable
    test("Traversable isEmpty", () => {
        expect(emptyHashSet.isEmpty).toBeTruthy()
        expect(singleHashSet.isEmpty).toBeFalsy()
        expect(doubleHashSet.isEmpty).toBeFalsy()
        expect(testHashSet.isEmpty).toBeFalsy()

    })
    test("Traverable size Empty", () => {
        expect(emptyHashSet.size).toEqual(0)
        expect(singleHashSet.size).toEqual(1)
        expect(doubleHashSet.size).toEqual(2)
        expect(testHashSet.size).toEqual(6)

    })
    test("Traverable hasDefiniteSize", () => {
        expect(emptyHashSet.hasDefiniteSize()).toEqual(true)
        expect(singleHashSet.hasDefiniteSize()).toEqual(true)
        expect(doubleHashSet.hasDefiniteSize()).toEqual(true)
        expect(testHashSet.hasDefiniteSize()).toEqual(true)
    })

    test("Traverable head", () => {
        expect(() => emptyHashSet.head).toThrowError()
        expect(singleHashSet.head).toEqual(111)
        expect(doubleHashSet.head).toEqual(95)
        expect(testHashSet.head).not.toBeNaN()
    })
    test("Traverable headOptional", () => {
        expect(emptyHashSet.headOptional.getOrElse(-1)).toEqual(-1)
        //expect(singleHashSet.headOptional.get()).toEqual(111)
        expect(singleHashSet.headOptional.getOrElse(-1)).not.toEqual(-1)
        //expect(doubleHashSet.headOptional.get()).toEqual(95)
        expect(doubleHashSet.headOptional.getOrElse(-1)).not.toEqual(-1)
        //expect(testHashSet.headOptional.get()).toEqual(1)
        expect(testHashSet.headOptional.getOrElse(-1)).not.toEqual(-1)
    })
    test("Traverable last", () => {

        expect(() => emptyHashSet.last).toThrowError()
        expect(singleHashSet.last).toEqual(111)
        expect(testHashSet.last).not.toBeNaN()
        expect(testHashSet.last).not.toBeNaN()
    })

    test("Traverable lastOption", () => {
        expect(testHashSet.lastOptional.get()).not.toBeNaN()
        //expect(() => emptyHashSet.lastOptional.get()).toThrowError()
        expect(emptyHashSet.lastOptional.getOrElse(-1)).toEqual(-1)
        expect(singleHashSet.lastOptional.get()).toEqual(111)
        expect(singleHashSet.lastOptional.getOrElse(-1)).toEqual(111)
    })

    test("Traverable tail", () => {
        //expect(testHashSet.tail).to
        expect(() => emptyHashSet.tail).toThrowError()
        expect(singleHashSet.tail.size).toEqual(0)
    })

    test("Traverable init", () => {
        expect(singleHashSet.init.size).toEqual(0)
        expect(emptyHashSet.size).toEqual(0)
    })
})
