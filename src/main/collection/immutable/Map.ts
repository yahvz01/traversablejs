import Traversable from "../Traversable"
import MapTuple from "../generic/MapTuple"


interface Map<_TpK, _TpV> extends Traversable< MapTuple<_TpK, _TpV> >{

    keys : Traversable<_TpK>
    values : Traversable<_TpV>

    get(key : _TpK) : _TpV
    getOrElse(key : _TpK, defaultValue : _TpV) : _TpV
    contains(key : _TpK) : boolean

    //Transformation
    filterKeys(predicate : (e : _TpK) => boolean) : Traversable<_TpK>
    mapValue<_Tp>(f : (e : _TpV) => _Tp) : Traversable<_Tp>

    put(value : MapTuple<_TpK, _TpV>) : Map<_TpK, _TpV>
    putAll(values : Traversable<MapTuple<_TpK, _TpV>>) : Map<_TpK, _TpV>

    remove(value : _TpK) : Map<_TpK, _TpV>
    removeAll(values : Traversable<_TpK>) : Map<_TpK, _TpV>

    clear() : Map<_TpK, _TpV>
}

export default Map