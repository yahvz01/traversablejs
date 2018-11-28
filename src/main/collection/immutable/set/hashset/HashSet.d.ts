import Traversable from "../../../Traversable";
import Optional from "../../../../util/Optional";
import Set from "../../Set";
declare class HashSet<_Tp> implements Set<_Tp> {
    private dataSet;
    static of<_Tp>(...data: _Tp[]): HashSet<_Tp>;
    private constructor();
    private _size;
    readonly size: number;
    private _head;
    readonly head: _Tp;
    readonly headOptional: Optional<_Tp>;
    readonly init: Traversable<_Tp>;
    readonly isEmpty: boolean;
    private _last;
    readonly last: _Tp;
    readonly lastOptional: Optional<_Tp>;
    readonly tail: Traversable<_Tp>;
    count(predicate: (e: _Tp) => boolean): number;
    take(index: number): Traversable<_Tp>;
    takeWhile(predicate: (e: _Tp) => boolean): Traversable<_Tp>;
    drop(index: number): Traversable<_Tp>;
    dropWhile(predicate: (e: _Tp) => boolean): Traversable<_Tp>;
    exists(predicate: (e: _Tp) => boolean): boolean;
    filter(predicate: (e: _Tp) => boolean): Traversable<_Tp>;
    foldLeft(init: _Tp, folding: (acc: _Tp, curr: _Tp) => _Tp): _Tp;
    foldRight(init: _Tp, folding: (acc: _Tp, curr: _Tp) => _Tp): _Tp;
    forall(predicate: (e: _Tp) => boolean): boolean;
    hasDefiniteSize(): boolean;
    map<K>(f: (e: _Tp) => K): Traversable<K>;
    slice(from: number, until?: number): Traversable<_Tp>;
    add(e: _Tp): Set<_Tp>;
    addAll(set: Set<_Tp>): Set<_Tp>;
    contains(e: _Tp): boolean;
    remove(e: _Tp): Set<_Tp>;
    removeAll(set: Set<_Tp>): Set<_Tp>;
    retain(predicate: (e: _Tp) => boolean): Set<_Tp>;
    subsetOf(subset: Set<_Tp>): boolean;
    foreach(consumer: (e: _Tp) => void): void;
    private insertData;
    private insertMappedData;
}
export default HashSet;
//# sourceMappingURL=HashSet.d.ts.map