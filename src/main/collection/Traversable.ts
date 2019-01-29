import Optional from "../util/Optional";
import {IndexedSeq, LinearSeq} from "./immutable"

interface MutableTraversable<_Tp> extends Iterable<_Tp> {
    //크기 정보
    isEmpty : boolean
    size : number
    length : number
    hasDefiniteSize() : boolean

    // 원소 가져오기
    head : _Tp
    headOptional : Optional<_Tp>
    last : _Tp
    lastOptional : Optional<_Tp>

    // 하위 컬렉션
    tail : MutableTraversable<_Tp>
    init : MutableTraversable<_Tp>

    foreach( consumer : ( e : _Tp, index : number) => (void)) : void
    [Symbol.iterator]() : Iterator<_Tp>

    // Mapping
    //map<K>(f : (e : _Tp) => K) : Traversable<K>
    map<K>(f : (e : _Tp, index : number) => K) : MutableTraversable<K>

    // slice method Not Throw Exception
    slice( from : number, until : number ) : MutableTraversable<_Tp>
    take( count : number ) : MutableTraversable<_Tp>
    // drop method Not Throw Exception
    drop( index : number ) : MutableTraversable<_Tp>
    takeWhile( predicate : (e : _Tp) => boolean ) : MutableTraversable<_Tp>
    dropWhile( predicate : (e : _Tp) => boolean  ) : MutableTraversable<_Tp>

    filter( predicate : (e : _Tp) => boolean ) : MutableTraversable<_Tp>

    // Condition of Element
    forall( predicate : (e : _Tp) => boolean) : boolean
    exists( predicate : (e : _Tp) => boolean) : boolean
    count( predicate : (e : _Tp) => boolean) : number

    // Folding
    foldLeft<K>(init: K, folding : (acc : K, curr : _Tp) => K) : K
    foldRight<K>(init: K, folding : (acc : K, curr : _Tp) => K) : K

    unshift( e : _Tp) : void
    shift() : _Tp
    push( e : _Tp) : void
    pushAll( e : MutableTraversable<_Tp> ) : void
    pop() : _Tp

    // Convert Other Data Structure
    toArray() : Array<_Tp>;
    toSeq() : IndexedSeq<_Tp>;
    toList() : LinearSeq<_Tp>;
}

interface Traversable<_Tp> extends Iterable<_Tp>{
    //크기 정보
    isEmpty : boolean
    size : number
    length : number
    hasDefiniteSize() : boolean

    // 원소 가져오기
    head : _Tp
    headOptional : Optional<_Tp>
    last : _Tp
    lastOptional : Optional<_Tp>
    
    // 하위 컬렉션
    tail : Traversable<_Tp>
    init : Traversable<_Tp>

    foreach( consumer : ( e : _Tp, index : number) => (void)) : void
    [Symbol.iterator]() : Iterator<_Tp>

    // Mapping
    //map<K>(f : (e : _Tp) => K) : Traversable<K>
    map<K>(f : (e : _Tp, index : number) => K) : Traversable<K>

    // slice method Not Throw Exception
    slice( from : number, until : number ) : Traversable<_Tp>
    take( count : number ) : Traversable<_Tp>
    // drop method Not Throw Exception
    drop( index : number ) : Traversable<_Tp>
    takeWhile( predicate : (e : _Tp) => boolean ) : Traversable<_Tp>
    dropWhile( predicate : (e : _Tp) => boolean  ) : Traversable<_Tp>

    filter( predicate : (e : _Tp) => boolean ) : Traversable<_Tp>

    // Condition of Element
    forall( predicate : (e : _Tp) => boolean) : boolean
    exists( predicate : (e : _Tp) => boolean) : boolean
    count( predicate : (e : _Tp) => boolean) : number

    // Folding
    foldLeft<K>(init: K, folding : (acc : K, curr : _Tp) => K) : K
    foldRight<K>(init: K, folding : (acc : K, curr : _Tp) => K) : K

    unshift( e : _Tp) : Traversable<_Tp>
    shift() : Traversable<_Tp>
    push( e : _Tp) : Traversable<_Tp>
    pushAll( e : Traversable<_Tp> ) : Traversable<_Tp>
    pop() : Traversable<_Tp>

    // Convert Other Data Structure
    toArray() : Array<_Tp>;
    toSeq() : IndexedSeq<_Tp>;
    toList() : LinearSeq<_Tp>;
}

export interface Iterable<_Tp> {
    [Symbol.iterator]() : Iterator<_Tp>
}

export interface Iterator<_Tp> {
    next(value?: _Tp): IteratorResult<_Tp>;
    return?(value: _Tp): IteratorResult<_Tp>;
    throw?(e: _Tp): IteratorResult<_Tp>;
    [Symbol.iterator]?() : Iterator<_Tp>;
}


export function iteratorResultOf<_Tp>(done : boolean, currValue? : _Tp) : IteratorResult<_Tp>{
    if(currValue != undefined || currValue != null){
        return new IteratorResultCreator<_Tp>(done, currValue);
    } else {
        return new IteratorResultCreator<_Tp>(done);
    }
}

class IteratorResult<T> {
    done: boolean = true;
    value: (T | undefined) = undefined;
}

class IteratorResultCreator<T> extends IteratorResult<T> {
    constructor(done : boolean, value : T | undefined = undefined){
        super();
        this.done = done;
        this.value = value;
    }
}


export {
    MutableTraversable,
    Traversable
}
