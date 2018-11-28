import IndexedSeq from "../IndexedSeq"
import Seq from "../../Seq"
import {Gen, Optional, Traversable} from "../../../../index"

class Vector<_Tp> implements IndexedSeq<_Tp>{

    private dataSet: Array<_Tp>
    private _size : number | null = null

    static of<_Tp>( ...data :_Tp[]) : Vector<_Tp> {
        return new Vector<_Tp>(...data)
    }

    constructor( ...data :_Tp[]){
        this.dataSet = data
    }

    get size() : number {
        if(this._size == null)
            this._size = this.dataSet.length
        return this._size
    }

    get isEmpty(): boolean { return this.size == 0 }

    get head() : _Tp {
        if(this.isEmpty)
            throw new Error("NoSuchElementException")
        return this.dataSet[0];
    }
    get headOptional() : Optional<_Tp> {
        return Optional.of(this.dataSet[0]);
    }
    get init(): Traversable<_Tp> {
        return this.copyDataSet(0, this.size - 1)
    }

    get last(): _Tp {
        if(this.isEmpty)
            throw new Error("NoSuchElementException")
        return this.dataSet[this.dataSet.length - 1]
    }
    get lastOptional(): Optional<_Tp> { return Optional.of(this.dataSet[this.size - 1]) }
    get tail(): Traversable<_Tp> {
        if(this.size > 2)
            return this.copyDataSet(1)
        else
            return Vector.of()
    }

    apply(index: number): Optional<_Tp> {
        return Optional.of(this.dataSet[index]);
    }

    count(p: (e: _Tp) => boolean): number {
        let count = 0;
        this.dataSet.forEach((value) => {
            if(p(value)) ++count
        });
        return count;
    }

    take(count: number): Traversable<_Tp> {
        const result = this.copyEmptyDataSet()
        let currIndex = 0;
        for(currIndex; currIndex < count; ++currIndex){
            if(currIndex >= count)
                break;
            result.dataSet.push(this.dataSet[currIndex])
        }
        return result
    }

    takeWhile(predicate: (e: _Tp) => boolean): Traversable<_Tp> {
        const result = this.copyEmptyDataSet()
        this.dataSet.forEach((value) => {
            if(!predicate(value)) {
                result.dataSet.push(value)
            }
        })
        return result
    }

    drop(index: number): Traversable<_Tp> {
        return this.copyDataSet(index + 1)
    }

    dropWhile(predicate: (e: _Tp) => boolean): Traversable<_Tp> {
        const result = new Vector<_Tp>()
        result.dataSet = []
        this.dataSet.forEach((value) => {
            if(!predicate(value))
                result.dataSet.push(value);
            else
                return result
        })
        return result
    }


    filter(predicate: (e: _Tp) => boolean): Traversable<_Tp> {
        const result = new Vector<_Tp>();
        result.dataSet = []
        this.dataSet.forEach((value) => {
            if(predicate(value))
                result.dataSet.push(value)
        });
        return result
    }

    forall(predicate: (e: _Tp) => boolean): boolean {
        let flag : boolean = true;
        this.dataSet.forEach((value) => {
            if(!predicate(value)){
                flag = false
            }
        })
        return flag;
    }

    exists(predicate: (e: _Tp) => boolean): boolean {
        let flag : boolean = false;
        this.dataSet.forEach((value) => {
            if(predicate(value)){
                flag = true;
            }
        })
        return flag;
    }

    foldLeft(init: _Tp, folding: (acc: _Tp, curr: _Tp) => _Tp): _Tp {
        let result = init;
        this.dataSet.forEach((value) => {
            result = folding(result, value)
        });
        return result
    }

    foldRight(init: _Tp, folding: (acc: _Tp, curr: _Tp) => _Tp): _Tp {
        let result = init
        this.dataSet.reverse().forEach((value) => {
            result = folding(result, value)
            //result += foling(result, value)
        })
        return result
    }

    foreach(consumer: (e: _Tp) => void): void {
        this.dataSet.forEach((value) => { consumer(value); })
    }

    hasDefiniteSize(): boolean {
        return true;
    }

    indices(): Gen {
        return Gen.until(0, this.size);
    }

    map<K>(f: (e: _Tp) => K): Traversable<K> {
        const result = new Vector<K>()
        result.dataSet = []
        this.dataSet.forEach((value) => {
            result.dataSet.push(f(value))
        })
        return result;
    }


    remove(index: number): Seq<_Tp> {
        let currIndex = 0
        const result = new Vector<_Tp>()
        result.dataSet = []
        this.dataSet.forEach((value) => {
            if(currIndex != index)
                result.dataSet.push(value)
        })
        return result;
    }

    slice(from: number, until: number): Traversable<_Tp> {
        return this.copyDataSet(from, until);
    }


    unshift(e: _Tp): Seq<_Tp> {
        const result = this.copyDataSet()
        result.dataSet.unshift(e)
        return result
    }
    shift(): Seq<_Tp> {
        const result = this.copyDataSet()
        result.dataSet.shift()
        return result
    }

    push(e: _Tp): Seq<_Tp> {
        const result = this.copyDataSet()
        result.dataSet.push(e)
        return result
    }

    pop(): Seq<_Tp> {
        const result = this.copyDataSet()
        result.dataSet.pop()
        return result
    }

    updated(index: number, e: _Tp): Seq<_Tp> {
        const result = this.copyDataSet()
        result.dataSet[index] = e
        return result
    }

    private copyEmptyDataSet(){
        return this.copyDataSet(0, 0)
    }

    private copyDataSet(start : number = 0, end : number = this.size){
        if(start > end)
            throw new RangeError()
        const result = new Vector<_Tp>()
        //slice endindex is not include
        result.dataSet = this.dataSet.slice(start, end)
        return result
    }
}

export default Vector;