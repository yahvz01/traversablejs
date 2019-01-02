import {Optional, Set, Traversable} from "../../../../../main"
import {Iterator, iteratorResultOf} from "../../../Traversable"



class TreeSet<_Tp> implements Set<_Tp> {

    private _root : TreeNode<_Tp> | null = null

    static of<_Tp>(...data : _Tp[]) : TreeSet<_Tp> {
        return new TreeSet<_Tp>(...data)
    }

    private constructor(...data : _Tp[]){
        data.forEach((value) => {
            this.insertData(value)
        })
    }

    get isEmpty(): boolean { return this._root == null }
    _size : number | null = null
    get size(): number {
        if(this._size == null){
            if(this.isEmpty){
                this._size = 0
            } else {
                this._size = 0;
                this.foreach(value => ++(this._size as number))
            }
        }
        return this._size
    }

    hasDefiniteSize(): boolean { return true; }

    get head(): _Tp {
        if(this._root == null)
            throw new Error("NoSuchElementException")
        return this._root.data
    }
    get headOptional(): Optional<_Tp> {
        if(this._root == null){
            return Optional.emptyOf<_Tp>()
        }
        return this._root.dataOptional
    }

    private _last : _Tp | null = null;
    get last(): _Tp {
        if(this.isEmpty)
            throw new Error("NoSuchElementException")
        if(this._last == null){
            let result : _Tp | null = null
            this.foreach( value => result = value)
            this._last = result
        }
        return this._last as _Tp
    }

    get lastOptional(): Optional<_Tp> {
        if(this.isEmpty)
            return Optional.emptyOf<_Tp>()
        if(this._last == null){
            let result : _Tp | null = null
            this.foreach( value => result = value)
            this._last = result
        }
        return Optional.of(this._last as _Tp)
    }

    get init(): Traversable<_Tp> {
        const buffer = new Array<_Tp>()
        this.foreach((value) => {
            buffer.push(value)
        })
        buffer.pop()
        return TreeSet.of(...buffer)
    }

    get tail(): Traversable<_Tp> {
        const buffer = new Array<_Tp>()
        this.foreach((value) => {
            buffer.push(value)
        })
        buffer.shift()
        return TreeSet.of(...buffer)
    }

    add(e: _Tp): Set<_Tp> {
        const buffer = new Array<_Tp>()
        this.foreach( value => buffer.push(value) )
        buffer.push(e)
        return TreeSet.of(...buffer)
    }

    addAll(set: Set<_Tp>): Set<_Tp> {
        const buffer = new Array<_Tp>()
        set.foreach( (value : _Tp) => buffer.push(value) )
        this.foreach( (value : _Tp) => buffer.push(value) )
        return TreeSet.of(...buffer)
    }

    contains(e: _Tp): boolean {
        return this.binarySearch(e);
    }

    remove(e: _Tp): Set<_Tp> {
        const buffer = new Array<_Tp>()
        this.foreach( (value) => {
            if(value != e){
                buffer.push(value)
            }
        })
        return TreeSet.of(...buffer)
    }

    removeAll(set: Set<_Tp>): Set<_Tp> {
        const buffer = new Array<_Tp>()
        this.foreach((value) => {
            set.foreach((target) => {
                if(value != target){
                    buffer.push(value)
                }
            })
        })
        return TreeSet.of(...buffer)
    }

    retain(predicate: (e: _Tp) => boolean): Set<_Tp> {
        const buffer = new Array<_Tp>()
        this.foreach((value) => {
            if(predicate(value)){
                buffer.push(value)
            }
        })
        return TreeSet.of(...buffer);
    }

    subsetOf(subset: Set<_Tp>): boolean {
        let flag = true
        subset.foreach( (value) => {
            if(flag){
                flag = this.binarySearch(value)
            }
        })
        return flag;
    }

    count(predicate: (e: _Tp) => boolean): number {
        let count = 0;
        this.foreach((value) => {
            if(predicate(value)){
                ++count
            }
        });
        return count;
    }

    exists(predicate: (e: _Tp) => boolean): boolean {
        return this.binarySearchWithPredicate(predicate);
    }

    forall(predicate: (e: _Tp) => boolean): boolean {
        let flag = true
        this.foreach((value) => {
            if(predicate(value)){
                flag = false
            }
        });
        return flag;
    }

    foreach(consumer: (e: _Tp) => void, rootNode : TreeNode<_Tp> = (this._root as TreeNode<_Tp>)): void {
        if(rootNode != null) {
            if(rootNode.hasLeft){
                this.foreach(consumer, rootNode.left);
            }
            consumer(rootNode.data);
            if(rootNode.hasRight){
                this.foreach(consumer, rootNode.right);
            }
        }
    }

    map<K>(f: (e: _Tp) => K): Traversable<K> {
        const buffer = new Array<K>()
        this.foreach(value =>  buffer.push(f(value)) )
        return TreeSet.of(...buffer)
    }

    slice(from: number, until: number = this.size ): Traversable<_Tp> {
        if(from > until)
            throw new RangeError("until index should be greater than from index")
        let count = 0
        const buffer = new Array<_Tp>()
        this.foreach(value => {
            if(count > from && count < until){
                buffer.push(value)
            }
            ++count;
        })
        return TreeSet.of(...buffer);
    }

    take(count: number): Traversable<_Tp> {
        return this.slice(0, count);
    }

    drop(index: number): Traversable<_Tp> {
        return this.slice(index);
    }

    filter(predicate: (e: _Tp) => boolean): Traversable<_Tp> {
        const buffer = new Array<_Tp>()
        this.foreach( value => {
            if(predicate(value)){
                buffer.push(value)
            }
        })
        return TreeSet.of(...buffer)
    }

    takeWhile(predicate: (e: _Tp) => boolean): Traversable<_Tp> {
        let stopFlag = false
        const buffer = new Array<_Tp>()
        this.foreach(value => {
            if(predicate(value)){
                stopFlag = true
            }
            if(!stopFlag){
                buffer.push(value)
            }
        })
        return TreeSet.of(...buffer)
    }

    dropWhile(predicate: (e: _Tp) => boolean): Traversable<_Tp> {
        let startFlag = false;
        const buffer = new Array<_Tp>()
        this.foreach(value => {
            if(predicate(value)){
                startFlag = true
            }
            if(startFlag){
                buffer.push(value)
            }
        })
        return TreeSet.of(...buffer)
    }

    foldLeft<K>(init: K, folding: (acc: K, curr: _Tp) => K): K {
        let result = init;
        this.foreach( value => {
            result = folding(result, value)
        })
        return result
    }

    foldRight<K>(init: K, folding: (acc: K, curr: _Tp) => K): K {
        let result = init
        const buffer = new Array<_Tp>()
        this.foreach( value => {
            buffer.unshift(value)
        })
        buffer.forEach( value => { result = folding(result, value) })
        return result;
    }


    private insertData( value : _Tp, rootNode : TreeNode<_Tp> = (this._root as TreeNode<_Tp>)){
        if(this.isEmpty){
            this._root = TreeNode.of(value)
        } else {
            if(rootNode.data == value){
                return;
            } if(rootNode.data > value){
                if(rootNode.hasLeft){
                    this.insertData(value, rootNode.left)
                } else {
                    rootNode.left = TreeNode.of(value)
                }
            } else {
                if(rootNode.hasRight){
                    this.insertData(value, rootNode.right)
                } else {
                    rootNode.right = TreeNode.of(value)
                }
            }
        }
    }
    private binarySearch( value : _Tp, rootNode : TreeNode<_Tp> = (this._root as TreeNode<_Tp>)): boolean {
        if(this.isEmpty){
            return false
        } else {
            if(rootNode.data == value)
                return true
            if(rootNode.data > value){
                if(rootNode.hasLeft){
                    return this.binarySearch(value, rootNode.left)
                } else {
                    return false
                }
            } else {
                if(rootNode.hasRight){
                    return this.binarySearch(value, rootNode.right)
                } else {
                    return false
                }
            }
        }
    }
    private binarySearchWithPredicate( predicate : (e : _Tp) => boolean , rootNode : TreeNode<_Tp> = (this._root as TreeNode<_Tp>)): boolean {
        if(this.isEmpty){
            return false
        } else {
            if(predicate(rootNode.data))
                return true;
            if(rootNode.hasLeft){
                return this.binarySearchWithPredicate(predicate, rootNode.left)
            }
            if(rootNode.hasRight){
                return this.binarySearchWithPredicate(predicate, rootNode.right)
            }
            return false
        }
    }

    [Symbol.iterator](): Iterator<_Tp> {
        return new HashSetIterator(this);
    }
}


class HashSetIterator<_Tp> implements Iterator<_Tp> {

    constructor( private dataSource : Traversable<_Tp> ) {

    }
    next(value?: _Tp): IteratorResult<_Tp> {
        if(this.dataSource.headOptional.isPresent()){
            const result = this.dataSource.head;
            this.dataSource = this.dataSource.tail;
            return iteratorResultOf(false, result);
        } else if(value != null){
            return iteratorResultOf(true, value);
        } else {
            return iteratorResultOf(true);
        }
    }
    [Symbol.iterator](): Iterator<_Tp>{
        return this;
    }
}


class TreeNode<_Tp>{

    static of<_Tp>(data : _Tp, left : TreeNode<_Tp> | null = null, right : TreeNode<_Tp> | null = null) : TreeNode<_Tp>{
        return new TreeNode<_Tp>(data, left, right)
    }

    private constructor(data : _Tp, left : TreeNode<_Tp> | null, right : TreeNode<_Tp> | null) {
        this._data = data
        this._left = left
        this._right = right
    }

    private _data : _Tp | null = null
    get data() : _Tp {
        if(this._data == null){
            throw new Error("NoSuchElementException")
        }
        return this._data
    }
    get dataOptional() : Optional<_Tp> {
        if(this._data == null){
            return Optional.emptyOf<_Tp>()
        }
        return Optional.of(this._data)
    }

    private _left : TreeNode<_Tp> | null = null
    get left() : TreeNode<_Tp> {
        if(this._left == null){
            throw new Error("NoSuchElementException")
        }
        return this._left
    }
    set left( value : TreeNode<_Tp>) {
        this._left = value
    }
    get hasLeft() : boolean { return this._left != null }

    private _right : TreeNode<_Tp> | null = null
    get right() : TreeNode<_Tp> {
        if(this._right == null){
            throw new Error("NoSuchElementException")
        }
        return this._right
    }
    set right( value : TreeNode<_Tp>) {
        this._right = value
    }
    get hasRight() : boolean { return this._right != null }
}

export default TreeSet;
