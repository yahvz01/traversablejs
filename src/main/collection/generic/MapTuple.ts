
class MapTuple<_TpK, _TpV> {

    readonly key : _TpK
    readonly value : _TpV

    static of<_TpK, _TpV>(key : _TpK, value : _TpV) : MapTuple<_TpK, _TpV> {
        return new MapTuple(key, value);
    }

    private constructor(key : _TpK, value : _TpV) {
        this.key = key
        this.value = value
    }
}

export default MapTuple
