import Traversable, {Iterator, iteratorResultOf} from "../../Traversable"
import Optional from "../../../util/Optional"
import Gen from "../../generic/Gen"
import MutableSeq from "../MutableSeq"
class Buffer<_Tp> implements MutableSeq<_Tp>{

    private buffer : Array<_Tp>

    static from<_Tp>(data : Array<_Tp>) : Buffer<_Tp>{
        return new Buffer(data)
    }

    static of<_Tp>(...data : _Tp[]) : Buffer<_Tp>{
        return new Buffer(data)
    }

    private constructor(data : _Tp[]){
        this.buffer = data
    }

    get size(): number {
        return this.buffer.length
    }
    get head(): _Tp {
        if(this.size <= 0) throw new Error("NoSuchElementException")
        return this.buffer[0]
    }
    get headOptional(): Optional<_Tp> {
        return Optional.of(this.buffer[0])
    }
    get init(): Traversable<_Tp>{
        return Buffer.from(
            this.buffer.slice(0, this.size - 1)
        )
    }
    get isEmpty(): boolean { return this.size == 0}
    get last(): _Tp {
        if(this.size <= 1) throw new Error("NoSuchElementException")
        return this.buffer[this.size - 1]
    }
    get lastOptional(): Optional<_Tp> {
        return Optional.of(this.buffer[this.size - 1])
    }
    get tail(): Traversable<_Tp> {
        return Buffer.from(
            this.buffer.slice(1, this.size)
        )
    }

    apply(index: number): Optional<_Tp> {
        return Optional.of<_Tp>(this.buffer[index])
    }


    indices(): Gen {
        return Gen.until(0, this.size - 1)
    }

    pop(): _Tp {
        let result : _Tp
        if(this.size == 0)
            throw new Error("NoSuchElement")
        else {
             result = this.buffer.pop() as _Tp
        }
        return result
    }

    push(e: _Tp): void {
        this.buffer.push(e)
    }

    remove(index: number): void {
        this.buffer = this.buffer.splice(index, 1)
    }

    shift(): _Tp {
        let result : _Tp
        if(this.size == 0)
            throw new Error("NoSuchElement")
        else {
            result = this.buffer.shift() as _Tp
        }
        return result
    }

    unshift(e: _Tp): void {
        this.buffer.unshift(e)
    }

    updated(index: number, e: _Tp): void {
        if(index > this.size - 1)
            throw new Error("NoSuchElementException")
        this.buffer[index] = e
    }


    count(predicate : (e: _Tp) => boolean): number {
        let result = 0
        for(const value of this.buffer){
            if(predicate(value))
                ++result
        }
        return result;
    }

    exists(predicate: (e: _Tp) => boolean): boolean {
        let flag = false
        for(const value of this.buffer)
            if(predicate(value)){
                flag = true
                break
            }
        return flag
    }

    filter(predicate: (e: _Tp) => boolean): Traversable<_Tp> {
        const newBuffer = new Array<_Tp>()
        this.buffer.forEach((value) =>{
            if(predicate(value))
                newBuffer.push(value)
        })
        return Buffer.of(...newBuffer)

    }

    foldLeft<K>(init: K, folding: (acc: K, curr: _Tp) => K): K {
        let result = init
        for(const value of this.buffer){
            result = folding(result, value)
        }
        return result
    }

    foldRight<K>(init: K, folding: (acc: K, curr: _Tp) => K): K {
        let result = init
        for(const value of this.buffer.reverse()){
            result = folding(result, value)
        }
        return result
    }

    forall(predicate: (e: _Tp) => boolean): boolean {
        let flag = true
        for(const value of this.buffer)
            if(!predicate(value)) flag = false
        return flag
    }

    foreach(consumer: (e: _Tp) => void): void {
        this.buffer.forEach((value) => {
            consumer(value)
        })
    }

    hasDefiniteSize(): boolean {
        return true;
    }

    map<K>(f: (e: _Tp) => K): Traversable<K> {
        return Buffer.from(
            this.buffer.map<K>((value) => {
                return f(value)
            })
        );
    }

    slice(from: number, until: number): Traversable<_Tp> {
        if(from < 0 || from > until)
            throw new RangeError()
        if(until > this.size)
            throw new Error("NoSuchElementExceoption")
        return Buffer.from(
            this.buffer.slice(from, until)
        )
    }

    take( count : number): Traversable<_Tp> {
        if(count < 0)
            throw new RangeError()
        if( count > this.size)
            throw new Error("NoSuchElementException")
        const newBuffer = this.buffer.slice(0, count)
        return Buffer.from(newBuffer);
    }

    takeWhile(predicate: (e: _Tp) => boolean): Traversable<_Tp> {
        const newBuffer = new Array<_Tp>()
        for(const value of this.buffer){
            if(predicate(value)) break;
            newBuffer.push(value)
        }
        return Buffer.from(newBuffer)
    }


    drop(index: number): Traversable<_Tp> {
        if(index < 0)
            throw new RangeError()
        const newBuffer = new Array<_Tp>()
        for(let i = index; i < this.size; ++i){
            newBuffer.push(this.buffer[i])
        }
        return Buffer.from(newBuffer);
    }

    dropWhile(predicate: (e: _Tp) => boolean): Traversable<_Tp> {
        const newBuffer = new Array<_Tp>()
        for(const value of this.buffer){
            if(predicate(value)) continue;
            newBuffer.push(value)
        }
        return Buffer.from(newBuffer)
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
}

export default Buffer
