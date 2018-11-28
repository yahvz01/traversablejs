import Optional from "../util/Optional";
interface Traversable<_Tp> {
    foreach(consumer: (e: _Tp) => (void)): void;
    map<K>(f: (e: _Tp) => K): Traversable<K>;
    isEmpty: boolean;
    size: number;
    hasDefiniteSize(): boolean;
    head: _Tp;
    headOptional: Optional<_Tp>;
    last: _Tp;
    lastOptional: Optional<_Tp>;
    tail: Traversable<_Tp>;
    init: Traversable<_Tp>;
    slice(from: number, until: number): Traversable<_Tp>;
    take(index: number): Traversable<_Tp>;
    drop(index: number): Traversable<_Tp>;
    takeWhile(predicate: (e: _Tp) => boolean): Traversable<_Tp>;
    dropWhile(predicate: (e: _Tp) => boolean): Traversable<_Tp>;
    filter(predicate: (e: _Tp) => boolean): Traversable<_Tp>;
    forall(predicate: (e: _Tp) => boolean): boolean;
    exists(predicate: (e: _Tp) => boolean): boolean;
    count(predicate: (e: _Tp) => boolean): number;
    foldLeft(init: _Tp, folding: (acc: _Tp, curr: _Tp) => _Tp): _Tp;
    foldRight(init: _Tp, folding: (acc: _Tp, curr: _Tp) => _Tp): _Tp;
}
export default Traversable;
//# sourceMappingURL=Traversable.d.ts.map