import {iteratorResultOf} from "../index"

class Gen implements Iterable<number> {

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

    [Symbol.iterator](): Iterator<number> {
        return new GenIterator(this, this.from, this.until);
    }



    public contains ( index : number ) : boolean {
        if(index >= this.from && index < this.until){
            return true
        }
        return false
    }
}

class GenIterator implements Iterator<number> {

    private currIndex : number;

    constructor(private gen : Gen, from : number, private until : number){
        this.currIndex = from;
    }

    next(value? : number): IteratorResult<number> {

        if(this.currIndex < this.until){
            return iteratorResultOf<number>(false, this.currIndex++);
        } else if(value != null){
            return iteratorResultOf<number>(true, value);
        } else {
            return iteratorResultOf<number>(true);
        }
    }



}

export default Gen
