import { HashSet, Traversable } from "../../../main";


describe('hashset property', function () {

    let testHashSet : Traversable<number>
    let emptyHashSet: Traversable<number>
    let singleHashSet : Traversable<number>

    beforeEach(() => {
        testHashSet = HashSet.of(1, 2, 3, 4, 5, 5, 6)
        emptyHashSet = HashSet.of()
        singleHashSet = HashSet.of(111)
    })

    // Traversable
    test("Traversable isEmpty", () => {
        expect(emptyHashSet.isEmpty).toEqual(true)
        // Immutable Check
        //emptyHashSet.add(1)
        expect(emptyHashSet.isEmpty).toEqual(true)
    })
    test("Traverable size Empty", () => {
        expect(emptyHashSet.size).toEqual(0)
        expect(testHashSet.size).toEqual(6)

    })
    test("Traverable hasDefiniteSize", () => {
        expect(testHashSet.hasDefiniteSize()).toEqual(true)
        expect(testHashSet.hasDefiniteSize()).toEqual(true)

    })

    test("Traverable head", () => {
        expect(testHashSet.head).not.toBeNaN()
        expect(() => emptyHashSet.head).toThrowError()
        expect(singleHashSet.head).toEqual(111)
    })
    test("Traverable headOptional", () => {
        expect(singleHashSet.headOptional.get()).toEqual(111)
        expect(singleHashSet.headOptional.getOrElse(-1)).toEqual(111)
        //expect(emptyHashSet.headOptional.get()).toThrowError()
        expect(emptyHashSet.headOptional.getOrElse(-1)).toEqual(-1)
    })
    test("Traverable last", () => {
        expect(testHashSet.last).not.toBeNaN()
        expect(() => emptyHashSet.last).toThrowError()
        expect(singleHashSet.last).toEqual(111)
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
