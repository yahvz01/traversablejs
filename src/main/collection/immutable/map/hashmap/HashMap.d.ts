import Map from "../../Map";
import MapTuple from "../../../generic/MapTuple";
import Traversable from "../../../Traversable";
import Optional from "../../../../util/Optional";
declare class HashMap<_TpK, _TpV> implements Map<_TpK, _TpV> {
    private keySet;
    private dataSet;
    static of<_TpK, _TpV>(...data: MapTuple<_TpK, _TpV>[]): HashMap<_TpK, _TpV>;
    private constructor();
    private apply;
    private _size;
    readonly size: number;
    readonly isEmpty: boolean;
    readonly head: MapTuple<_TpK, _TpV>;
    readonly headOptional: Optional<MapTuple<_TpK, _TpV>>;
    readonly last: MapTuple<_TpK, _TpV>;
    readonly lastOptional: Optional<MapTuple<_TpK, _TpV>>;
    readonly tail: Traversable<MapTuple<_TpK, _TpV>>;
    readonly init: Traversable<MapTuple<_TpK, _TpV>>;
    hasDefiniteSize(): boolean;
    readonly keys: Traversable<_TpK>;
    readonly values: Traversable<_TpV>;
    clear(): Map<_TpK, _TpV>;
    contains(key: _TpK): boolean;
    filterKeys(predicate: (e: _TpK) => boolean): Traversable<_TpK>;
    get(key: _TpK): _TpV;
    getOrElse(key: _TpK, defaultValue: _TpV): _TpV;
    mapValue<_Tp>(f: (e: _TpV) => _Tp): Traversable<_Tp>;
    put(value: MapTuple<_TpK, _TpV>): Map<_TpK, _TpV>;
    putAll(values: Traversable<MapTuple<_TpK, _TpV>>): Map<_TpK, _TpV>;
    remove(value: _TpK): Map<_TpK, _TpV>;
    removeAll(values: Traversable<_TpK>): Map<_TpK, _TpV>;
    count(predicate: (e: MapTuple<_TpK, _TpV>) => boolean): number;
    forall(predicate: (e: MapTuple<_TpK, _TpV>) => boolean): boolean;
    exists(predicate: (e: MapTuple<_TpK, _TpV>) => boolean): boolean;
    filter(predicate: (e: MapTuple<_TpK, _TpV>) => boolean): Traversable<MapTuple<_TpK, _TpV>>;
    foldLeft(init: MapTuple<_TpK, _TpV>, folding: (acc: MapTuple<_TpK, _TpV>, curr: MapTuple<_TpK, _TpV>) => MapTuple<_TpK, _TpV>): MapTuple<_TpK, _TpV>;
    foldRight(init: MapTuple<_TpK, _TpV>, folding: (acc: MapTuple<_TpK, _TpV>, curr: MapTuple<_TpK, _TpV>) => MapTuple<_TpK, _TpV>): MapTuple<_TpK, _TpV>;
    foreach(consumer: (e: MapTuple<_TpK, _TpV>) => void): void;
    map<K>(f: (e: MapTuple<_TpK, _TpV>) => K): Traversable<K>;
    slice(from: number, until?: number): Traversable<MapTuple<_TpK, _TpV>>;
    take(index: number): Traversable<MapTuple<_TpK, _TpV>>;
    takeWhile(predicate: (e: MapTuple<_TpK, _TpV>) => boolean): Traversable<MapTuple<_TpK, _TpV>>;
    drop(index: number): Traversable<MapTuple<_TpK, _TpV>>;
    dropWhile(predicate: (e: MapTuple<_TpK, _TpV>) => boolean): Traversable<MapTuple<_TpK, _TpV>>;
    private copyHashMap;
    private insertData;
}
export default HashMap;
//# sourceMappingURL=HashMap.d.ts.map