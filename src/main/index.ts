
import {
    Traversable, // traverable
    Gen, MapTuple, hashCode, deepCopy, // generic
    Seq, Set, Map,
    List,
    Vector, HashSet, HashMap, // immutable
    Buffer, MutableStack, BufferedStack, MutableQueue, BufferedQueue   // mutable
} from "./collection"
import {
    Optional
} from "./util"

function listOf<_Tp>(...data : _Tp[]) : List<_Tp>{
    return List.of(...data)
}

function mutableQueueOf<_Tp>(...data : _Tp[]) : MutableQueue<_Tp> {
    return BufferedQueue.of(...data)
}

function mutableStackOf<_Tp>(...data : _Tp[]) : MutableStack<_Tp>{
    return BufferedStack.of(...data)
}

function seqOf<_Tp>(...data : _Tp[]) : Seq<_Tp> {
    return Vector.of(...data)
}

function setOf<_Tp>(...data : _Tp[]) : Set<_Tp>{
    return HashSet.of(...data)
}

function mapOf<_TpK, _TpV>(...data : MapTuple<_TpK, _TpV>[]) : Map<_TpK, _TpV>{
    return HashMap.of(...data)
}

function tupleOf<_TpK, _TpV>(key : _TpK, value : _TpV) : MapTuple<_TpK, _TpV>{
    return MapTuple.of(key, value)
}


export {
    Traversable, // traverable
    Seq, Set, Map,
    Gen, MapTuple, hashCode, deepCopy, // generic
    Vector, HashSet, HashMap, List,// immutable
    listOf, seqOf, setOf, mapOf, tupleOf,// immutable Helper function
    Buffer, MutableStack, BufferedStack, MutableQueue, BufferedQueue,  // mutable
    mutableQueueOf, mutableStackOf, // mutableHelper
    Optional
}


/*

 */