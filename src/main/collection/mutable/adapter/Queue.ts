import Traversable from "../../Traversable"
import Buffer from "../buffer/Buffer"
import Optional from "../../../util/Optional"


interface MutableQueue<_Tp> {

    front : _Tp
    size : number
    isEmpty : boolean
    hasNext : boolean

    enqueue( e: _Tp) : MutableQueue<_Tp>

    dequeue() : _Tp
    dequeueOptional() : Optional<_Tp>

}

class BufferedQueue<_Tp> implements MutableQueue<_Tp> {

    private dataSet : Buffer<_Tp>

    static of<_Tp>(...data : _Tp[]) : MutableQueue<_Tp> {
        return new BufferedQueue(...data)
    }

    private constructor(...data : _Tp[]){
        this.dataSet = Buffer.of<_Tp>(...data)
    }
    get front() : _Tp {
        if(this.isEmpty)
            throw new Error("NoSuchElementException")
        return this.dataSet.head
    }
    get size() : number { return this.dataSet.size }
    get isEmpty() : boolean { return this.dataSet.isEmpty }
    get hasNext() : boolean { return !this.isEmpty }

    dequeue(): _Tp {
        if(this.isEmpty)
            throw new Error("NoSuchElementException")
        return this.dataSet.shift();
    }

    dequeueOptional(): Optional<_Tp> {
        if(this.dataSet.isEmpty){
            return Optional.emptyOf()
        } else {
            const result = Optional.of(this.dataSet.head)
            this.dataSet.shift()
            return result;
        }

    }

    enqueue( e : _Tp):  MutableQueue<_Tp> {
        this.dataSet.push(e)
        return this
    }
}

export { MutableQueue, BufferedQueue }