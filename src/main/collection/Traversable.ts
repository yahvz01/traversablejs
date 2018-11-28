import Optional from "../util/Optional";

interface Traversable<_Tp>{
    foreach( consumer : ( e : _Tp) => (void)) : void

    // 맵핑
    map<K>(f : (e : _Tp) => K) : Traversable<K>
    
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

    // slice method Not Throw Exception
    slice( from : number, until : number ) : Traversable<_Tp>
    take( count : number ) : Traversable<_Tp>
    // drop method Not Throw Exception
    drop( index : number ) : Traversable<_Tp>
    takeWhile( predicate : (e : _Tp) => boolean ) : Traversable<_Tp>
    dropWhile( predicate : (e : _Tp) => boolean  ) : Traversable<_Tp>

    filter( predicate : (e : _Tp) => boolean ) : Traversable<_Tp>

    // 원소 조건
    forall( predicate : (e : _Tp) => boolean) : boolean
    exists( predicate : (e : _Tp) => boolean) : boolean
    count( predicate : (e : _Tp) => boolean) : number

    //폴드
    foldLeft(init: _Tp, folding : (acc : _Tp, curr : _Tp) => _Tp) : _Tp
    foldRight(init: _Tp, folding : (acc : _Tp, curr : _Tp) => _Tp) : _Tp
}


export default Traversable