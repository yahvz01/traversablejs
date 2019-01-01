import { Gen } from "../../../main"


describe("Range types Verification", () => {

    let zeroUntilTen: Gen
    let zeroToTen: Gen

    beforeEach(() => {
        zeroUntilTen = Gen.until(0, 10);
        zeroToTen = Gen.to(0, 10);
    })

    test("static method : to", () => {
        expect(() => Gen.to(11.1, 10).size).toThrowError()
        expect(() => Gen.to(12, 10)).toThrowError()
        expect(Gen.to(0, 10).size).toEqual(11)
    })

    test("static method : until", () => {
        expect(() => Gen.until(11.1, 10).size).toThrowError()
        expect(() => Gen.until(11, 10).size).toThrowError()
        expect(Gen.until(0, 10).size).toEqual(10)
    })

    test("property : size", () => {
        expect(zeroUntilTen.size).toEqual(10)
        expect(zeroToTen.size).toEqual(11)
    })

    test("method : iterator", () => {
        const zeroUntilTenArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        const zeroToTenArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        expect(zeroUntilTen.iterator).toEqual(zeroUntilTenArray)
        expect(zeroToTen.iterator).toEqual(zeroToTenArray)
    })

    test("method : ES6 Iterator test", () => {
        const zeroUntilTenArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        const zeroToTenArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

        let count = 0;
        for(const el of zeroUntilTen){
            expect(el).toEqual(zeroUntilTenArray[count])
            ++count;
        }
        count = 0;
        for(const el of zeroToTen){
            expect(el).toEqual(zeroToTenArray[count])
            ++count;
        }
    })

    test("method : contains", () => {
        expect(zeroUntilTen.contains(0)).toBeTruthy()
        expect(zeroUntilTen.contains(5)).toBeTruthy()
        expect(zeroUntilTen.contains(10)).toBeFalsy()

        expect(zeroToTen.contains(0)).toBeTruthy()
        expect(zeroToTen.contains(5)).toBeTruthy()
        expect(zeroToTen.contains(10)).toBeTruthy()
        expect(zeroToTen.contains(11)).toBeFalsy()

    })
})
