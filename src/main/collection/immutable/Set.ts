import Traversable from "../Traversable";


interface Set<_Tp> extends Traversable<_Tp>{

    contains(e : _Tp) : boolean
    subsetOf(subset : Set<_Tp>) : boolean

    add(e : _Tp) : Set<_Tp>

    addAll(set : Set<_Tp>) : Set<_Tp>

    remove(e : _Tp) : Set<_Tp>

    removeAll(set : Set<_Tp>) : Set<_Tp>

    retain(predicate : (e : _Tp) => boolean) : Set<_Tp>

}

export default Set