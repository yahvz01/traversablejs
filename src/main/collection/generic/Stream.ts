
class Stream<_Tp> {

    private stream : Generator

    static of<_Tp>(inital : _Tp, generator : (e :_Tp) => _Tp, limiter : (e : _Tp) => boolean = null) : Stream<_Tp>{
        return new Stream(inital, generator, limiter);
    }

    private constructor(private initial : _Tp, private generator : (e :_Tp) => _Tp, private limiter : (e : _Tp) => boolean | null = null){
        function *gen(){
            while(true){
                initial = generator(initial);
                if(limiter != null && !limiter(initial)){
                    return initial
                }
                yield initial;

            }
        }
        this.stream = gen();
    }

    next() : IteratorResult<_Tp>{
        return this.stream.next()
    }

    *[Symbol.iterator](): Iterator<_Tp> {
        while(true){
            this.initial = yield this.generator(this.initial);
        }
    }

    get hasLimiter() : boolean {
        return this.limiter != null;
    }
}

export default Stream;
