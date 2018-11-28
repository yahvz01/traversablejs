import Traversable from "../Traversable";
import Gen from "../generic/Gen"
import Optional from "../../util/Optional"

interface MutableSeq<_Tp> extends Traversable<_Tp> {
    apply( index : number ) : Optional<_Tp>
    indices() : Gen

    // 추가
    unshift( e : _Tp) : void
    push( e : _Tp) : void

    shift() : _Tp

    pop() : _Tp
    // 변경
    updated(index : number, e : _Tp) : void
    remove(index : number) : void
}

export default MutableSeq