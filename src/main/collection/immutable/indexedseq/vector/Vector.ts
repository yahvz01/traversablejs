import {Iterator, iteratorResultOf, List} from "../../../index"
import {LinearSeq} from "../../index"
import IndexedSeq from "../IndexedSeq"
import Seq from "../../Seq"
import {Gen, listOf, Optional, Traversable} from "../../../../index"


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

    get length() : number {
        return this.size
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
            if(this.dataSet[currIndex] == null){
                break;
            }
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

    foldLeft<K>(init: K, folding: (acc: K, curr: _Tp) => K): K {
        let result = init;
        this.dataSet.forEach((value) => {
            result = folding(result, value)
        });
        return result
    }

    foldRight<K>(init: K, folding: (acc: K, curr: _Tp) => K): K {
        let result = init
        this.dataSet.reverse().forEach((value) => {
            result = folding(result, value)
            //result += foling(result, value)
        })
        return result
    }

    foreach(consumer: (e: _Tp, index : number) => void): void {
        this.dataSet.forEach((value, index) => { consumer(value, index); })
    }

    hasDefiniteSize(): boolean {
        return true;
    }

    indices(): Gen {
        return Gen.until(0, this.size);
    }

    map<K>(f: (e: _Tp, index : number) => K): Traversable<K> {
        const result = new Vector<K>()
        result.dataSet = []
        let index = -1;
        this.dataSet.forEach((value) => {
            ++index;
            result.dataSet.push(f(value, index))
        })
        return result;
    }



    remove(index: number): Seq<_Tp> {
        const result = new Vector<_Tp>()
        result.dataSet = []
        this.dataSet.forEach((value, currIndex) => {
            if(currIndex != index){
                result.dataSet.push(value);
            }
        })
        return result;
    }

    slice(from: number, until: number): Traversable<_Tp> {
        return this.copyDataSet(from, until);
    }


    unshift(e: _Tp): Traversable<_Tp> {
        const result = this.copyDataSet()
        result.dataSet.unshift(e)
        return result
    }
    shift(): Traversable<_Tp> {
        const result = this.copyDataSet()
        result.dataSet.shift()
        return result
    }

    push(e: _Tp): Traversable<_Tp> {
        const result = this.copyDataSet()
        result.dataSet.push(e)
        return result;
    }
    pushAll(list: Traversable<_Tp>): Traversable<_Tp> {
        const result = this.copyDataSet()
        list.foreach( e => {
            result.dataSet.push(e);
        })
        return result;
    }

    pop(): Traversable<_Tp> {
        const result = this.copyDataSet()
        result.dataSet.pop()
        return result;
    }

    updated(index: number, e: _Tp): Seq<_Tp> {
        const result = this.copyDataSet()
        result.dataSet[index] = e
        return result;
    }


    toArray(): Array<_Tp> {
        return [...this.dataSet];
    }

    toList(): LinearSeq<_Tp> {
        return List.of(...this.dataSet);
    }

    toSeq(): IndexedSeq<_Tp> {
        return this;
    }



    private copyEmptyDataSet(){
        return this.copyDataSet(0, 0)
    }

    private copyDataSet(start : number = 0, end : number = this.size){
        if(start > end)
            throw new RangeError()
        const result = new Vector<_Tp>()
        result.dataSet = this.dataSet.slice(start, end)
        return result
    }

    [Symbol.iterator](): Iterator<_Tp> {
        return new VectorIterator(this.dataSet, this.size)
    }
}

class VectorIterator<_Tp> implements Iterator<_Tp>{

    private currIndex : number;
    constructor(private dataSource : Array<_Tp>, private size : number){
        this.currIndex = 0;
    }

    next(value?: _Tp): IteratorResult<_Tp> {
        if(this.currIndex < this.size){
            const value = this.dataSource[this.currIndex++];
            return iteratorResultOf(false, value);
        } else if(value != null){
            return iteratorResultOf(true, value);
        } else {
            return iteratorResultOf(true);
        }
    }

    [Symbol.iterator](): Iterator<_Tp>{
        return this;
    }
}

export default Vector;
