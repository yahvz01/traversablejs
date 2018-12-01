
class Gen {

    static to(from : number, to : number) : Gen {
        return Gen.until(from, to + 1)

    }
    static until(from : number, until : number) : Gen {
        return new Gen(from, until)
    }

    private constructor(private from : number, private until : number){
        if(from % 1 != 0 || until % 1 != 0)
            throw new Error("IllegalArgumentException : from, (until|to) index must be integer values")
        else if(from > until)
            throw new RangeError("from index is greater than end index(until|to)")
    }

    get size() : number {
        return this.until - this.from
    }
    get iterator() : Array<number>{
        const result = new Array<number>();
        let index = 0
        for(let curr = this.from; curr < this.until; ++curr){
            result[index] = curr;
            ++index
        }
        return result
    }

    public contains ( index : number ) : boolean {
        if(index >= this.from && index < this.until){
            return true
        }
        return false
    }
}

export default Gen