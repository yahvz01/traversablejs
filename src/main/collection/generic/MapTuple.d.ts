declare class MapTuple<_TpK, _TpV> {
    private _key;
    private _value;
    readonly key: _TpK;
    readonly value: _TpV;
    static of<_TpK, _TpV>(key: _TpK, value: _TpV): MapTuple<_TpK, _TpV>;
    private constructor();
}
export default MapTuple;
//# sourceMappingURL=MapTuple.d.ts.map