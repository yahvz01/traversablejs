
import {listOf, seqOf} from "../../../../index"
import Traversable, {Iterator, iteratorResultOf} from "../../../Traversable"
import Optional from "../../../../util/Optional"
import Gen from "../../../generic/Gen"
import {IndexedSeq, LinearSeq} from "../../index"
import Set from "../../Set"
import { hashCode } from "../../../generic/Util"

class HashSet<_Tp> implements Set<_Tp> {

    private dataSet : any = {}

    static of<_Tp>( ...data :_Tp[]) : HashSet<_Tp> {
        return new HashSet<_Tp>(...data)
    }

    private constructor(...data : _Tp[]){
        data.forEach((value) => {
            // Now Unchecked
            this.insertData(value)
        })
    }

    private _size : number | null = null
    get size(): number {
        if(this._size == null){
            this._size = 0
            for(const key in this.dataSet)
                ++this._size
        }
        return this._size
    }

    get length() : number {
        return this.size
    }

    // head
    private _head : _Tp | null = null
    get head(): _Tp {
        if(this._head == null)
            for(const key in this.dataSet){
                this._head = this.dataSet[key]
                break;
            }
        if(this._head == null) throw new Error("NoSuchElementException")
        return this._head as _Tp
    }
    get headOptional(): Optional<_Tp> {
        if(this._head == null){
            for(const key in this.dataSet){
                this._head = this.dataSet[key]
                break;
            }
        }
        return Optional.of(this._head as _Tp)
    }

    get init(): Traversable<_Tp> {
        if(0 <= this.size - 2)
            return this.slice(0, this.size - 2)
        else
            return HashSet.of<_Tp>()
    }
    get isEmpty(): boolean { return this.size == 0 }

    // last
    private _last : _Tp | null = null
    get last(): _Tp {
        let tmp : _Tp | null = null
        if(this._last == null){
            for(const key in this.dataSet)
                tmp = this.dataSet[key]
            this._last = tmp
        }
        if(this._last == null) throw new Error("NoSuchElementException")
        return this._last as _Tp
    }
    get lastOptional(): Optional<_Tp> {
        let tmp : _Tp | null = null
        if(this._last == null){
            for(const key in this.dataSet)
                tmp = this.dataSet[key]
            this._last = tmp
        }
        return Optional.of(this._last as _Tp)
    }


    get tail(): Traversable<_Tp> {
        const result = HashSet.of<_Tp>()
        result.dataSet = { ...this.dataSet }
        const headKey = hashCode(this.head)
        delete result.dataSet[headKey]
        return result
    }

    count(predicate: (e: _Tp) => boolean): number {
        let count = 0
        for( const key in this.dataSet ){
            if(predicate(this.dataSet[key]))
                ++count
        }
        return count;
    }

    take(index: number): Traversable<_Tp> {
        return this.slice(0, index)
    }

    takeWhile(predicate: (e: _Tp) => boolean): Traversable<_Tp> {
        console.error("This Function dependOn Inner Hashing Machanism, Deprecated")
        const result = HashSet.of<_Tp>()
        for(const key in this.dataSet){
            if(!predicate(this.dataSet[key]))
                this.insertData(this.dataSet[key], result)
            else
                break;
        }
        return result
    }

    drop(index: number): Traversable<_Tp> {
        return this.slice(index)
    }

    dropWhile(predicate: (e: _Tp) => boolean): Traversable<_Tp> {
        console.error("This Function dependOn Inner Hashing Machanism, Deprecated")
        const result = HashSet.of<_Tp>()
        let flag = false
        for(const key in this.dataSet){
            flag = predicate(this.dataSet[key])
            if(flag == true)
                this.insertData(this.dataSet[key], result)
        }
        return result
    }

    exists(predicate: (e: _Tp) => boolean): boolean {
        let flag = false
        for( const key in this.dataSet ){
            if(predicate(this.dataSet[key]))
                flag = true
            if(flag == true) break;
        }
        return flag
    }

    filter(predicate: (e: _Tp) => boolean): Traversable<_Tp> {
        const result = HashSet.of<_Tp>()
        for( const key in this.dataSet ){
            const data = this.dataSet[key]
            if(predicate(data)){
                this.insertData(data, result)
            }
        }
        return result
    }

    foldLeft<K>(init: K, folding: (acc: K, curr: _Tp) => K): K {
        let result = init
        for( const key in this.dataSet ){
            result = folding(result, this.dataSet[key])
        }
        return result
    }

    foldRight<K>(init: K, folding: (acc: K, curr: _Tp) => K): K {
        let result = init
        for( const key in this.dataSet ){
            result = folding(result, this.dataSet[key])
        }
        return result
    }

    forall(predicate: (e: _Tp) => boolean): boolean {
        let flag = true
        for(const key in this.dataSet){
            flag = predicate(this.dataSet[key])
            if(flag == false)
                break;
        }
        return flag;
    }

    hasDefiniteSize(): boolean {
        return true;
    }

    map<K>(f: (e: _Tp, index : number) => K): Traversable<K> {
        const result = HashSet.of<K>()
        let index = -1;
        for( const key in this.dataSet ){
            ++index;
            const mappedData = f(this.dataSet[key], index)
            this.insertMappedData(mappedData, result)
        }
        return result
    }

    slice(from: number, until: number = this.size): Traversable<_Tp> {
        if(from < 0)
            throw new RangeError("from index should be greater than 0")

        const result = HashSet.of<_Tp>()
        const range = Gen.until(from, until)
        let currIndex = 0;
        for(const key in this.dataSet){
            if(range.contains(currIndex)){
                result.dataSet[key] = this.dataSet[key]
            }
            ++currIndex
        }
        return result
    }

    add(e: _Tp): Set<_Tp> {
        const result = HashSet.of<_Tp>()
        result.dataSet = { ...this.dataSet}
        this.insertData(e, result)
        return result
    }

    addAll(set: Set<_Tp>): Set<_Tp> {
        const result = HashSet.of<_Tp>()
        result.dataSet = { ...this.dataSet}
        set.foreach((value) => {
            this.insertData(value, result)
        })
        return result
    }



    contains(e: _Tp): boolean {
        const key = hashCode(e)
        if(this.dataSet.hasOwnProperty(key)){
            return true
        }
        return false
    }

    remove(e: _Tp): Set<_Tp> {
        const result = HashSet.of<_Tp>()
        result.dataSet = { ...this.dataSet }
        const key = hashCode(e)
        delete result.dataSet[key]
        return result
    }

    removeAll(set: Set<_Tp>): Set<_Tp> {
        const result = HashSet.of<_Tp>()
        result.dataSet = { ...this.dataSet}
        set.foreach((value) => {
            delete result.dataSet[hashCode(value)]
        })
        return result
    }

    retain(predicate: (e: _Tp) => boolean): Set<_Tp> {
        const result = HashSet.of<_Tp>()
        this.foreach((value) => {
            if(predicate(value))
                this.insertData(value, result)
        })
        return result
    }

    subsetOf(subset: Set<_Tp>): boolean {
        let flag = true
        if(this.size < subset.size) return false
        for(const key in this.dataSet){
            flag = subset.exists((value) => value == this.dataSet[key])
            if(flag == false) break;
        }
        return flag
    }

    foreach(consumer: (e: _Tp, index: number) => void): void {
        let index = -1;
        for(const key in this.dataSet){
            consumer(this.dataSet[key], index);
        }
    }

    toArray(): Array<_Tp> {
        const result = new Array<_Tp>();
        this.foreach(it => result.push(it));
        return result;
    }

    toList(): LinearSeq<_Tp> {
        return listOf(...(this.toArray()))
    }

    toSeq(): IndexedSeq<_Tp> {
        return seqOf(...(this.toArray()))
    }



    private insertData(data : _Tp, target : HashSet<_Tp> = this) : boolean {
        const key = hashCode(data)
        if(!target.dataSet.hasOwnProperty(key)){
            target.dataSet[key] = data
            return true
        }
        return false
    }
    private insertMappedData<K>(data : K, target : HashSet<K>) : boolean {
        const key = hashCode(data)
        if(!target.dataSet.hasOwnProperty(key)){
            target.dataSet[key] = data
            return true
        }
        return false
    }

    [Symbol.iterator](): Iterator<_Tp> {
        return new HashSetIterator(this);
    }
}

class HashSetIterator<_Tp> implements Iterator<_Tp> {

    constructor( private dataSource : Traversable<_Tp> ) {

    }
    next(value?: _Tp): IteratorResult<_Tp> {
        if(this.dataSource.headOptional.isPresent()){
            const result = this.dataSource.head;
            this.dataSource = this.dataSource.tail;
            return iteratorResultOf(false, result);
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


export default HashSet
