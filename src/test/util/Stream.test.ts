import {Stream} from "../../main"

describe("Stream", () => {

    let stream : Stream<number>
    let limitedStream : Stream<number>

    beforeEach(() => {
        stream = Stream.of(1, (e) => e + 2);
        limitedStream = Stream.of(1, (e) => e + 2, e => e < 3)
    })

    test("   ", () => {
        const result = stream.next()
        expect(result.value).toEqual(3);
        limitedStream.next()
        const limitedResult = limitedStream.next()
        expect(limitedResult.value).toBeUndefined()
        expect(limitedResult.done).toBeTruthy()
    })


    test("    ", () => {
        for(const el of stream){
            expect(el).toEqual(3)
            return;
        }
        for(const el of limitedStream){

        }
        const limitedResult = limitedStream.next()
        console.log(limitedResult.done + " " + limitedResult.value)
        expect(limitedResult.done).toBeTruthy()
        expect(limitedResult.value).toBeUndefined()
    })

    test("Stream hasLimiter", () => {
        expect(stream.hasLimiter).toBeFalsy()
        expect(limitedStream.hasLimiter).toBeTruthy()
    })
})
