// morder

class Optional<_Tp> {

    private data : _Tp | null

    static emptyOf<_Tp>() : Optional<_Tp>{
        return new Optional<_Tp>(null)
    }
    static of<_Tp>(data: _Tp) : Optional<_Tp>{
        return new Optional<_Tp>(data)
    }

    private constructor(data: _Tp | null ){
        this.data = data
    }

    public get(): _Tp {
        if(!this.isPresent(this.data)){
            throw new Error("IllegalException");
        }
        return this.data as _Tp
    }
    public getOrElse( defaultData : _Tp ) : _Tp {
        if(!this.isPresent(this.data))
            return defaultData
        else
            return this.data as _Tp
    }
    public getOrElseByLazy( defaultData : () => _Tp ) : _Tp {
        if(!this.isPresent(this.data))
            return defaultData()
        else
            return this.data as _Tp
    }
    public ifPresent( consumer : (value : _Tp | null ) => void ) : void {
        if(!this.isPresent(this.data)){
            consumer(this.data)
        }
    }
    public isPresent( data : _Tp | null ): boolean {
        if(this.data == undefined || this.data == null) {
            return false;
        } else {
            return true;
        }
    }
}

export default Optional