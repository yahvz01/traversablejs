
import Optional from "../../util/Optional";
import Gen from "../generic/Gen";
import { Traversable } from "../Traversable";

interface Seq<_Tp> extends Traversable<_Tp> {
    // 인덱스와 길이
    apply( index : number ) : Optional<_Tp>
    indices() : Gen

    // 변경
    updated(index : number, e : _Tp) : Seq<_Tp>
    remove(index : number) : Seq<_Tp>
}

export default Seq
