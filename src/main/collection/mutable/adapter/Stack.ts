import Traversable from "../../Traversable"
import Buffer from "../buffer/Buffer"
import Optional from "../../../util/Optional"

interface MutableStack<_Tp> {

    size : number
    top : _Tp // peek
    isEmpty : boolean
    hasNext : boolean

    push( e : _Tp ) : MutableStack<_Tp>
    pushAll( inCollection : Traversable<_Tp>) : MutableStack<_Tp>
    pop() : _Tp
    popOptional() : Optional<_Tp>
    popAll() : Traversable<_Tp>
}

class BufferedStack<_Tp> implements MutableStack<_Tp>{

    private dataSet : Buffer<_Tp>

    static of<_Tp>(...data : _Tp[]) : MutableStack<_Tp>{
        return new BufferedStack(...data)
    }

    private constructor(...data : _Tp[]){
        this.dataSet = Buffer.of<_Tp>()
        data.forEach((value) => this.dataSet.unshift(value) )
    }

    get size() : number { return this.dataSet.size }
    get top(): _Tp { return this.dataSet.head }
    get isEmpty() : boolean { return this.dataSet.isEmpty }
    get hasNext() : boolean { return !(this.isEmpty) }

    pop(): _Tp {
        return this.dataSet.shift()
    }

    popOptional(): Optional<_Tp> {
        const result = this.dataSet.headOptional
        try{
            this.dataSet.shift()
        } finally {
            return result
        }
    }

    popAll(): Traversable<_Tp> {
        const result = this.dataSet.map( value => value )
        this.dataSet = Buffer.of<_Tp>()
        return result
    }

    push(e: _Tp): MutableStack<_Tp> {
        this.dataSet.unshift(e)
        return this
    }

    pushAll(inCollection: Traversable<_Tp>): MutableStack<_Tp> {
        inCollection.foreach((value) => this.dataSet.push(value))
        return this
    }
}


export { MutableStack, BufferedStack }