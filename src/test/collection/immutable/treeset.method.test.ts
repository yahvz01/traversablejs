import { Traversable, HashSet } from "../../../main"

describe('hashset method test', () => {

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

    test("treeset : method slice Traversable", () => {

    })
})
