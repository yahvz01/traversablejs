import {MutableTraversable, Traversable} from "../Traversable"
import Gen from "../generic/Gen"
import Optional from "../../util/Optional"

interface MutableSeq<_Tp> extends MutableTraversable<_Tp> {
    apply( index : number ) : Optional<_Tp>
    indices() : Gen

    // 변경
    updated(index : number, e : _Tp) : void
    remove(index : number) : void
}

export default MutableSeq
