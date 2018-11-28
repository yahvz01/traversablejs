import LinearSeq from "../LinearSeq"
import Optional from "../../../../util/Optional"
import Traversable from "../../../Traversable"
import Gen from "../../../generic/Gen"
import Seq from "../../Seq"

class List<_Tp> implements LinearSeq<_Tp> {

    private _dummyHead : Node<_Tp>
    private _last : Node<_Tp> | null = null

    static of<_Tp>(...data : _Tp[]) : List<_Tp>{
        return new List<_Tp>(...data)
    }

    private constructor(...data : _Tp[]){
        this._dummyHead = Node.of<_Tp>(null, null)
        data.forEach((value) => {
            this.insertData(value)
        })
    }

    private _size : number = 0
    get size(): number { return this._size }

    get head(): _Tp {
        if(this.isEmpty)
            throw new Error("NoSuchElementException")
        return this._dummyHead.next.data
    }
    get headOptional(): Optional<_Tp> {
        if(this.isEmpty){
            return Optional.emptyOf<_Tp>()
        } else {
            return Optional.of( this._dummyHead.next.data )
        }
    }

    get last(): _Tp {
        if(this._last == null)
            throw new Error("NoSuchElementException")
        return this._last.data
    }

    get lastOptional(): Optional<_Tp> {
        if(this._last == null){
            return Optional.emptyOf<_Tp>()
        } else {
            return Optional.of<_Tp>(this._last.data)
        }
    }

    private _isEmpty : boolean = true
    get isEmpty(): boolean {
        return this._isEmpty
    }

    get tail(): Traversable<_Tp> {
        let firstFlag = true
        const buffer = new Array<_Tp>()
        this.foreach((value) => {
            if(firstFlag == false){
                buffer.push(value)
            }
            firstFlag = false
        })
        return List.of<_Tp>(...buffer);
    }
    get init(): Traversable<_Tp>{
        const buffer = new Array<_Tp>()
        this.foreach((value) => {
            buffer.push(value)
        })
        return List.of<_Tp>();
    }


    hasDefiniteSize(): boolean {
        return true;
    }


    indices(): Gen {
        return Gen.until(0, this.size);
    }

    pop(): Seq<_Tp> {
        let currIndex = 0
        const lastIndex = this.size - 1
        const buffer = new Array<_Tp>()
        for(
            let currNode = this._dummyHead.next;
            !currNode.hasNext();
            currNode = currNode.next
        ){
            if( currIndex == lastIndex){
                break;
            }
            buffer.push(currNode.data)
        }
        return List.of(...buffer);
    }

    push(e: _Tp): Seq<_Tp> {
        const buffer = new Array<_Tp>()
        this.foreach(value => buffer.push(value))
        buffer.push(e)
        return List.of(...buffer);
    }

    remove(index: number): Seq<_Tp> {
        const buffer = new Array<_Tp>()
        let currIndex = 0
        this.foreach( value => {
            // InnerReturn
            if(currIndex == index)
                return
            buffer.push(value)
        })
        return List.of(...buffer);
    }

    shift(): Seq<_Tp> {
        const buffer = new Array<_Tp>()
        let currIndex = 0
        this.foreach( value => {
            // InnerReturn
            if(currIndex == 0)
                return
            buffer.push(value)
        })
        return List.of(...buffer);
    }

    unshift(e: _Tp): Seq<_Tp> {
        const buffer = [e]
        let currIndex = 0
        this.foreach( value => {
            // InnerReturn
            if(currIndex == 0)
                return
            buffer.push(value)
        })
        return List.of(...buffer);
    }

    updated(index: number, e: _Tp): Seq<_Tp> {
        const buffer = new Array<_Tp>()
        this.foreach( value =>  buffer.push(value))
        buffer[index] = e
        return List.of(...buffer);
    }


    apply(index: number): Optional<_Tp> {
        if(index >= this.size)
            throw new Error("NoSuchElementException")
        let currIndex : number = 0
        let currNode : Node<_Tp>
        for(
            currNode = this._dummyHead.next;
            !currNode.hasNext();
            currNode = currNode.next
        ){
            if(currIndex >= index){ break; }
            ++currIndex
        }
        return Optional.of( currNode.data )
    }

    count(predicate: (e: _Tp) => boolean): number {
        let count = 0;
        this.foreach((value) => {
            if(predicate(value))
                ++count
        });
        return count
    }

    filter(predicate: (e: _Tp) => boolean): Traversable<_Tp> {
        const buffer = new Array<_Tp>()
        this.foreach((value) => {
            if(predicate(value))
                buffer.push(value)
        })
        return List.of(...buffer);
    }

    foldLeft(init: _Tp, folding: (acc: _Tp, curr: _Tp) => _Tp): _Tp {
        let result = init
        this.foreach( value => {
            result = folding(result, value)
        })
        return result;
    }

    foldRight(init: _Tp, folding: (acc: _Tp, curr: _Tp) => _Tp): _Tp {
        // Not Recommanded
        let result = init
        const buffer = new Array<_Tp>()
        this.foreach( value => buffer.push(value))
        buffer.reverse().forEach( value => {
            result = folding(result, value)
        })
        return result;
    }

    forall(predicate: (e: _Tp) => boolean): boolean {
        let forallFlag = true
        if(this.isEmpty) return forallFlag;
        let currNode = this._dummyHead
        do {
            currNode = currNode.next
            if(!predicate(currNode.data)){
                forallFlag = false
                break;
            }
        } while(currNode.hasNext())

        return forallFlag
    }

    exists(predicate: (e: _Tp) => boolean): boolean {
        let existsFlag = false
        if(this.isEmpty) return existsFlag;
        let currNode = this._dummyHead
        do {
            currNode = currNode.next
            if(predicate(currNode.data)){
                existsFlag = true
                break;
            }
        } while(currNode.hasNext())

        return existsFlag
    }


    map<K>(f: (e: _Tp) => K): Traversable<K> {
        const buffer = new Array<K>()
        this.foreach( value => {
            buffer.push( f(value) )
        })
        return List.of(...buffer);
    }

    slice(from: number, until: number = (this.size - 1)): Traversable<_Tp> {
        if(from < 0)
            throw new RangeError("From index must be greater than zero")
        //if(until > this.size)
        //   throw new RangeError(`Until index must be less than size ( curr size + ${this.size})`)
        let currIndex = 0
        const range = Gen.until(from, until)
        const buffer = new Array<_Tp>()

        this.foreach((value) => {
            if(range.contains(currIndex))
                buffer.push(value)
            ++currIndex
        })

        return List.of(...buffer);
    }

    drop(count: number): Traversable<_Tp> {
        if(count >= this.size - 1){
            return List.of<_Tp>()
        }
        return this.slice(count)

        /*
            drop index is start index
         */
    }

    dropWhile(predicate: (e: _Tp) => boolean): Traversable<_Tp> {
        if(this.isEmpty) return List.of<_Tp>();

        let startFlag = false
        const buffer = new Array<_Tp>()
        this.foreach((value) => {
            if(predicate(value) || startFlag == true){
                buffer.push(value)
                startFlag = true
            }
        })
        return List.of<_Tp>(...buffer);
    }


    take(index: number): Traversable<_Tp> {
        return this.slice(0, index);
    }

    takeWhile(predicate: (e: _Tp) => boolean): Traversable<_Tp> {
        if(this.isEmpty) return List.of<_Tp>();

        const buffer = new Array<_Tp>()
        let currNode = this._dummyHead
        do {
            currNode = currNode.next
            if(predicate(currNode.data)){
                break;
            } else {
                buffer.push(currNode.data)
            }
        } while(currNode.hasNext())

        return List.of<_Tp>(...buffer);

    }

    foreach(consumer: (e: _Tp) => void): void {
        if(this.isEmpty) return;
        let currNode = this._dummyHead
        do {
            currNode = currNode.next
            consumer(currNode.data)
        } while(currNode.hasNext())
    }

    private insertData(data : _Tp){
        const newNode = Node.of(data)
        if( this.isEmpty ){
            this._isEmpty = false
            this._last = newNode
            this._dummyHead.next = this._last
        } else {
            (this._last as Node<_Tp>).next = newNode
            this._last = newNode
        }
        ++this._size
    }
}

class Node<_Tp> {

    _data : _Tp | null = null
    get data() : _Tp {
        if(this._data == null)
            throw new Error("NoSuchElementException")
        return this._data as _Tp
    }

    get dataOptional() : Optional<_Tp> {
        return Optional.of<_Tp>(this._data as _Tp)
    }

    _next : Node<_Tp> | null = null
    get next() : Node<_Tp> {
        if(this._next == null)
            throw new Error("NoSuchElementException")
        return this._next
    }
    set next( value : Node<_Tp> ) {
        this._next = value
    }
    get nextOptional() : Optional<Node<_Tp>> {
        return Optional.of(
            this._next as Node<_Tp>
        )
    }

    static of<_Tp>(data : _Tp | null, next : Node<_Tp> | null = null) : Node<_Tp> {
        return new Node<_Tp>(data, next)
    }

    private constructor(data : _Tp| null, next : Node<_Tp>| null = null){
        this._data = data
        this._next = next
    }

    hasNext() : boolean {
        if(this._next == null)
            return false
        else
            return true
    }
}

export default List