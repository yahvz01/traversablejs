
class MapTuple<_TpK, _TpV> {

    private _key : _TpK
    private _value : _TpV
    get key() : _TpK { return this._key }
    get value() : _TpV { return this._value }

    static of<_TpK, _TpV>(key : _TpK, value : _TpV) : MapTuple<_TpK, _TpV> {
        return new MapTuple(key, value)
    }

    private constructor(key : _TpK, value : _TpV) {
        this._key = key
        this._value = value
    }
}

export default MapTuple