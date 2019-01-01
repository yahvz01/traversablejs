import Map from "../../Map"
import MapTuple from "../../../generic/MapTuple"
import Traversable, {Iterator, iteratorResultOf} from "../../../Traversable"

import { hashCode }  from "../../../generic/index"

import Optional from "../../../../util/Optional"
import Gen from "../../../generic/Gen"
import Buffer from "../../../mutable/buffer/Buffer"
import { Vector } from "../../index"

// Current Not Consider Hashing Confiliction

class HashMap<_TpK, _TpV> implements Map<_TpK, _TpV> {

    private keySet : Array<_TpK>
    private dataSet : any = {}

    static of<_TpK, _TpV>(...data : MapTuple<_TpK, _TpV>[]) : HashMap<_TpK, _TpV>{
        return new HashMap<_TpK, _TpV>(...data)
    }

    private constructor(...data : MapTuple<_TpK, _TpV>[]){
        this.keySet = new Array<_TpK>()
        data.forEach((value) => {
            this.insertData(value)
        })
    }

    private _size : number | null = null
    get size(): number {
        if(this._size == null){
            this._size = this.keySet.length
        }
        return this._size as number;
    }

    get isEmpty(): boolean { return this.size == 0 }

    get head() : MapTuple<_TpK, _TpV> {
        if(this.size == 0)
            throw new Error("NoSuchElementException")
        return this.apply(0)
    }

    get headOptional(): Optional<MapTuple<_TpK, _TpV>> {
        if(this.size == 0)
            return Optional.emptyOf()
        return Optional.of(
            this.apply(0)
        )
    }
    get last(): MapTuple<_TpK, _TpV> {
        if(this.size == 0)
            throw new Error("NoSuchElementException")
        return this.apply(this.size - 1)
    }
    get lastOptional(): Optional<MapTuple<_TpK, _TpV>> {
        if(this.size == 0)
            return Optional.emptyOf()
        return Optional.of(this.apply(this.size - 1))
    }

    get tail(): Traversable<MapTuple<_TpK, _TpV>> {
        if(this.size <= 1)
            return HashMap.of()
        return this.slice(1, this.size)
    }
    get init(): Traversable<MapTuple<_TpK, _TpV>> {
        if(this.size <= 1)
            return HashMap.of()
        return this.slice(0, this.size - 1)
    }

    hasDefiniteSize(): boolean {
        return true;
    }

    get keys(): Traversable<_TpK> {
        return Vector.of<_TpK>(...this.keySet)
    }
    get values(): Traversable<_TpV> {
        const result = Buffer.of<_TpV>()
        for(const hashKey in this.dataSet){
            result.push(this.dataSet[hashKey])
        }
        return result
    }

    clear(): Map<_TpK, _TpV> {
        console.error("Immutable Map is only return empty map")
        return HashMap.of<_TpK, _TpV>()
    }

    contains(key: _TpK): boolean {
        return this.dataSet.hasOwnProperty(hashCode(key))
    }

    filterKeys(predicate: (e : _TpK) => boolean): Traversable<_TpK> {
        const buffer = []
        for(const key of this.keySet){
            if(predicate(key))
                buffer.push(key)
        }
        return Vector.of(...buffer);
    }

    get(key: _TpK): _TpV {
        if(!this.dataSet.hasOwnProperty(hashCode(key)))
            throw new Error("NoSuchElementException")
        return this.dataSet[hashCode(key)];
    }

    getOrElse(key: _TpK, defaultValue: _TpV): _TpV {
        if(!this.dataSet.hasOwnProperty(hashCode(key)))
            return defaultValue
        return this.dataSet[hashCode(key)];
    }

    mapValue<_Tp>(f: (e: _TpV) => _Tp): Traversable<_Tp> {
        const result = []
        for(const key in this.dataSet){
            result.push(this.dataSet[key])
        }
        return Vector.of(...result);
    }

    put(value: MapTuple<_TpK, _TpV>): Map<_TpK, _TpV> {
        const result = HashMap.of<_TpK, _TpV>()
        this.insertData(value, result)
        return result
    }

    putAll(values: Traversable<MapTuple<_TpK, _TpV>>): Map<_TpK, _TpV> {
        const result = HashMap.of<_TpK, _TpV>()
        values.foreach((keyValue) => {
            this.insertData(keyValue, result)
        })
        return result
    }


    remove(value: _TpK): Map<_TpK, _TpV> {
        const result = HashMap.of<_TpK, _TpV>()
        this.copyHashMap(this, result)
        const removeTargetIndex = result.keySet.indexOf(value)
        if(removeTargetIndex != -1){
            delete result.dataSet[hashCode(result.keySet[removeTargetIndex])]
            result.keySet.splice(removeTargetIndex, 1)
        }
        return result
    }

    removeAll(values: Traversable<_TpK>): Map<_TpK, _TpV> {
        const result = HashMap.of<_TpK, _TpV>()
        this.copyHashMap(this, result)
        values.foreach((value) => {
            const removeTargetIndex = result.keySet.indexOf(value)
            if(removeTargetIndex != -1){
                delete result.dataSet[hashCode(result.keySet[removeTargetIndex])]
                result.keySet.splice(removeTargetIndex, 1)
            }
        })
        return result
    }

    // Traverable

    count(predicate: (e: MapTuple<_TpK, _TpV>) => boolean): number {
        let count = 0
        this.foreach((keyValue) => {
            if(predicate(keyValue)) ++count
        })
        return count;
    }

    forall(predicate: (e: MapTuple<_TpK, _TpV>) => boolean): boolean {
        let flag = true
        this.foreach((keyValue) => {
            if(!predicate(keyValue)) flag = false
        })
        return flag
    }

    exists(predicate: (e: MapTuple<_TpK, _TpV>) => boolean): boolean {
        let flag = false
        this.foreach((keyValue) => {
            if(predicate(keyValue)) flag = true
        })
        return flag
    }

    filter(predicate: (e: MapTuple<_TpK, _TpV>) => boolean): Traversable<MapTuple<_TpK, _TpV>> {
        const result = HashMap.of<_TpK, _TpV>()
        this.foreach((keyValue) => {
            if(predicate(keyValue))
                this.insertData(MapTuple.of(keyValue.key,keyValue.value), result)
        })
        return result
    }

    foldLeft<K>(init: K, folding: (acc: K, curr: MapTuple<_TpK, _TpV>) => K): K {
        let result = init
        this.foreach((keyValue) => {
            result = folding(result, keyValue)
        })
        return result;
    }

    foldRight<K>(init: K, folding: (acc: K, curr: MapTuple<_TpK, _TpV>) => K): K {
        // Not different with foldLeft
        return this.foldLeft(init, folding);
    }

    foreach(consumer: (e: MapTuple<_TpK, _TpV>) => void): void {
        this.keySet.forEach((value) => {
            consumer(MapTuple.of(value, this.get(value)))
        })
    }

    map<K>(f: (e: MapTuple<_TpK, _TpV>) => K): Traversable<K> {
        const result = Buffer.of<K>()
        this.foreach((keyValue) => {
            console.log("count")
            result.push( f(keyValue) )
        })
        console.log("inner Result : " + JSON.stringify(result))
        return result;
    }

    slice(from: number, until: number = this.size): Traversable<MapTuple<_TpK, _TpV>> {
        if(from > until)
            throw new RangeError("from index must be greater than to")
        const gen = Gen.until(from, until)
        const buffer = new Array<MapTuple<_TpK, _TpV>>()
        let currIndex = 0
        for(const key of this.keySet){
            if(gen.contains(currIndex))
                buffer.push(MapTuple.of(key, this.dataSet[hashCode(key)]))
            ++currIndex
        }
        return HashMap.of(...buffer)
    }

    take(index: number): Traversable<MapTuple<_TpK, _TpV>> {
        return this.slice(0, index)
    }

    takeWhile(predicate: (e: MapTuple<_TpK, _TpV>) => boolean): Traversable<MapTuple<_TpK, _TpV>> {
        const result = Buffer.of<MapTuple<_TpK, _TpV>>()
        for(const key of this.keySet){
            if(!predicate(MapTuple.of(key, this.dataSet[key]))) break;
            result.push(MapTuple.of(key, this.dataSet[key]))
        }
        return result
    }

    drop(index: number): Traversable<MapTuple<_TpK, _TpV>> {
        if(index >= this.size){
            return HashMap.of()
        }
        return this.slice(index)
    }

    dropWhile(predicate: (e: MapTuple<_TpK, _TpV>) => boolean): Traversable<MapTuple<_TpK, _TpV>> {
        const result = Buffer.of<MapTuple<_TpK, _TpV>>()
        for(const key of this.keySet){
            if(predicate(MapTuple.of(key, this.dataSet[key])))
                continue;
            result.push(MapTuple.of(key, this.dataSet[key]))
        }
        return result
    }

    private copyHashMap(from : HashMap<_TpK, _TpV>, to : HashMap<_TpK, _TpV>) : void {
        from.keySet.forEach((value) => {
            to.keySet.push(value)
        })
        to.dataSet = {...this.dataSet}
    }


    private insertData<_TpKey, _TpValue>(data : MapTuple<_TpK, _TpV>, target : HashMap<_TpK, _TpV> = this) : void {
        target.keySet.push(data.key)
        target.dataSet[hashCode(data.key)] = data.value
    }

    private apply(index : number) : MapTuple<_TpK, _TpV> {
        return MapTuple.of(
            this.keySet[index],
            this.dataSet[hashCode(this.keySet[index])]
        )
    }

    [Symbol.iterator](): Iterator<MapTuple<_TpK, _TpV>> {
        return new HashMapIterator(this);
    }
}

class HashMapIterator<_Tp> implements Iterator<_Tp> {

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
}



export default HashMap
