import Optional from "../../util/Optional";
import Gen from "../generic/Gen";
import Traversable from "../Traversable";
interface Seq<_Tp> extends Traversable<_Tp> {
    apply(index: number): Optional<_Tp>;
    indices(): Gen;
    unshift(e: _Tp): Seq<_Tp>;
    shift(): Seq<_Tp>;
    push(e: _Tp): Seq<_Tp>;
    pop(): Seq<_Tp>;
    updated(index: number, e: _Tp): Seq<_Tp>;
    remove(index: number): Seq<_Tp>;
}
export default Seq;
//# sourceMappingURL=Seq.d.ts.map