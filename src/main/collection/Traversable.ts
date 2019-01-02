import Optional from "../util/Optional";

interface Traversable<_Tp> extends Iterable<_Tp>{
    //크기 정보
    isEmpty : boolean
    size : number
    hasDefiniteSize() : boolean

    // 원소 가져오기
    head : _Tp
    headOptional : Optional<_Tp>
    last : _Tp
    lastOptional : Optional<_Tp>
    
    // 하위 컬렉션
    tail : Traversable<_Tp>
    init : Traversable<_Tp>

    foreach( consumer : ( e : _Tp) => (void)) : void
    [Symbol.iterator]() : Iterator<_Tp>

    // Mapping
    map<K>(f : (e : _Tp) => K) : Traversable<K>

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


export default Traversable
