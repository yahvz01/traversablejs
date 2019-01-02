import {Stream} from "../../main"

describe("Stream", () => {

    let stream : Stream<number>

    beforeEach(() => {
        stream = Stream.of(1, (e) => e + 2);
        stream
    })

    test("   ", () => {
        const result = stream.next()
        expect(result.value).toEqual(3)
    })

    test("    ", () => {
        for(const el of stream){
            expect(el).toEqual(3)
            return;
        }
    })
})
