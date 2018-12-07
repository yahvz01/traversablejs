import Traversable from "../../../main/collection/Traversable"
import MapTuple from "../../../main/collection/generic/MapTuple"
import HashMap from "../../../main/collection/immutable/map/hashmap/HashMap"
import {tupleOf} from "../../../main"


describe("hashmap method test", () => {

    let emptyHashMap : Traversable<MapTuple<number, string>>
    let singleHashMap : Traversable<MapTuple<number, string>>
    let doubleHashMap : Traversable<MapTuple<number, string>>
    let testHashMap : Traversable<MapTuple<number, string>>

    beforeEach(() => {
        emptyHashMap = HashMap.of()
        singleHashMap = HashMap.of(tupleOf(111, "111a"))
        doubleHashMap = HashMap.of(
            tupleOf(95, "95a"),
            tupleOf(200, "200a")
        )
        testHashMap = HashMap.of(
            tupleOf(1, "1a"),
            tupleOf(2, "2a"),
            tupleOf(3, "3a"),
            tupleOf(4, "4a"),
            tupleOf(5, "5a"),
            tupleOf(6, "6a")
        )
    })
    test("treeset : method slice Traversable", () => {

    })
})