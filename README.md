# traversablejs

Generic collection library, written by Typescript


 [npm][npm-url]
 

in JavaScript
in TypeScript
```ts
const {  Optional, Vector, seqOf, Set, setOf, Map, mapOf  } = require(“traversable”) 

Optional.empty()
Optional.of(“james”)

Vector.of(1, 2, 3, 4, 5)
seqOf(1, 2, 3, 4, 5)

Set.of(1,  2 , 3 , 4 , 4,  5)
setOf(1,  2 , 3 , 4 , 4,  5)

Map.of( MapTuple.of(1, “a”),
	    MapTuple.of(2, “b”),	
	    MapTuple.of(3, “c”) )

mapOf( tupleOf(1, “a”),  tupleOf(2, “b”), tupleOf(3, “b) )
```



## Installaction

This is a Collection Library, and avaiable throught the npm registry.

Installation is done using the npm or yarn install command :
```bash
> npm install traversable
> yarn add traversable
```



## Feature
- Optional util
- Immutable collection
- mutable collection



## Collection library API Structure

This Generic Collection recommend static factory methods instead of constructors

```ts
// immutable helper
const { seqOf, listOf, setOf, mapOf, tupleOf } = require("traversable")
// immutable class
const { Vector, List, HashSet, HashMap, TreeSet } = require("traversable")

// mutable helper
const { mutableStackOf, mutableQueueOf } = require("traversable")
// mutable class
const { Buffer, BufferedStack, BufferedQueue } = require("traversable")
```

```bash
* Traversable(Interface) 

# Immutable Collection

++ Seq (Interface)
++++ IndexedSeq (Interface)
++++++ Vector (Class)
++++ LinearSeq(Interface)
++++++ List (Class)

++ Set(Interface)
++++ HashSet (Class)
++++ TreeSet (Class)

++ Map(Interface)
++++ HashMap (Class)


# Mutable Collection

++ Buffer
++ MutableStack(Interface)
++++ BufferedStack (Class)

++ MutableQueue(Interface)
++++ BufferedQueue (Class)
```

## Immutable Collection

#### Interface Traversable<_Tp> (not JavaScript)

At the top of the collection hierarchy is trait Traversable

```ts
const {  Traversable  } = require(“traversable”)
// import { Traversable } from "traversable"
```

```ts

isEmpty : boolean
size : number
hasDefiniteSize() : boolean
head : _Tp
headOptional : Optional<_Tp>
last : _Tp
lastOptional : Optional<_Tp>

// Sub Collection
tail : Traversable<_Tp>
init : Traversable<_Tp>

foreach( consumer : ( e : _Tp) => (void)) : void

// Mapping
map<K>(f : (e : _Tp) => K) : Traversable<K>

slice( from : number, until : number ) : Traversable<_Tp>
take( count : number ) : Traversable<_Tp>

drop( index : number ) : Traversable<_Tp>
takeWhile( predicate : (e : _Tp) => boolean ) : Traversable<_Tp>
dropWhile( predicate : (e : _Tp) => boolean  ) : Traversable<_Tp>
filter( predicate : (e : _Tp) => boolean ) : Traversable<_Tp>

// Condition of Element
forall( predicate : (e : _Tp) => boolean) : boolean
exists( predicate : (e : _Tp) => boolean) : boolean
count( predicate : (e : _Tp) => boolean) : number

// Folding
foldLeft<K>(init: K, folding : (acc : K, curr : _Tp) => K) : K
foldRight<K>(init: K, folding : (acc : K, curr : _Tp) => K) : K

```


#### Interface Seq { Vector / List }

```ts
const {  Vector, List  } = require(“traversable”)
// import {  Vector, List  } from "traversable"
```

```ts
interface Seq<_Tp> extends Traversable<_Tp> 

// 인덱스와 길이
apply( index : number ) : Optional<_Tp>
indices() : Gen

// 추가
unshift( e : _Tp) : Seq<_Tp>
shift() : Seq<_Tp>
push( e : _Tp) : Seq<_Tp>
pop() : Seq<_Tp>

// 변경
updated(index : number, e : _Tp) : Seq<_Tp>
remove(index : number) : Seq<_Tp>
```

#### Interface Set { HashSet / TreeSet }

```ts
const {  HashSet, TreeSet  } = require(“traversable”)
// import {  HashSet, TreeSet  } from "traversable"
```

```ts
interface Set<_Tp> extends Traversable<_Tp>

contains(e : _Tp) : boolean
subsetOf(subset : Set<_Tp>) : boolean

add(e : _Tp) : Set<_Tp>
addAll(set : Set<_Tp>) : Set<_Tp>

remove(e : _Tp) : Set<_Tp>
removeAll(set : Set<_Tp>) : Set<_Tp>

retain(predicate : (e : _Tp) => boolean) : Set<_Tp>

```

#### Interface Map { HashMap }

```ts
const {  HashMap  } = require(“traversable”)
// import {  HashMap  } from "traversable"
```


```ts
interface Map<_TpK, _TpV> extends Traversable<MapTuple<_TpK, _TpV>>

keys : Traversable<_TpK>
values : Traversable<_TpV>

get(key : _TpK) : _TpV
getOrElse(key : _TpK, defaultValue : _TpV) : _TpV
contains(key : _TpK) : boolean

filterKeys(predicate : (e : _TpK) => boolean) : Traversable<_TpK>
mapValue<_Tp>(f : (e : _TpV) => _Tp) : Traversable<_Tp>

put(value : MapTuple<_TpK, _TpV>) : Map<_TpK, _TpV>
putAll(values : Traversable<MapTuple<_TpK, _TpV>>) : Map<_TpK, _TpV>

remove(value : _TpK) : Map<_TpK, _TpV>
removeAll(values : Traversable<_TpK>) : Map<_TpK, _TpV>

clear() : Map<_TpK, _TpV>

```

## Mutable Collection


#### Interface MutableSeq { Buffer }

```ts
const {  Buffer  } = require(“traversable”)
// import {  Buffer  } from "traversable"
```

```ts
interface MutableSeq<_Tp> extends Traversable<_Tp>

apply( index : number ) : Optional<_Tp>
indices() : Gen

unshift( e : _Tp) : void
push( e : _Tp) : void
shift() : _Tp
pop() : _Tp

updated(index : number, e : _Tp) : void
remove(index : number) : void

```

#### Interface MutableStack { BufferedStack }

```ts
const {  BufferedStack, mutableStackOf  } = require(“traversable”)
// import {  BufferedStack, mutableStackOf  } from "traversable"
```

```ts
interface MutableStack<_Tp>

size : number
isEmpty : boolean
hasNext : boolean
top : _Tp // peek

push( e : _Tp ) : MutableStack<_Tp>
pushAll( inCollection : Traversable<_Tp>) : MutableStack<_Tp>
pop() : _Tp
popOptional() : Optional<_Tp>

```

#### Interface MutableQueue { BufferedQueue }

```ts
const {  BufferedQueue, mutableQueueOf  } = require(“traversable”)
// import {  BufferedQueue, mutableQueueOf  } from "traversable"
```


```ts

interface MutableQueue<_Tp> 

front : _Tp
size : number
isEmpty : boolean
hasNext : boolean

enqueue( e: _Tp) : MutableQueue<_Tp>
dequeue() : _Tp
dequeueOptional() : Optional<_Tp>

```
## Util

#### class Optional<_Tp> 

```ts
const {  Optional  } = require(“traversable”)
// import { Optional } from "traversable"
```

```ts

static emptyOf<_Tp>() : Optional<_Tp>

static of<_Tp>(data: _Tp) : Optional<_Tp>

private constructor

public get(): _Tp 

public getOrElse( defaultData : _Tp ) : _Tp

public ifPresent( consumer : (value : _Tp | null ) => void ) : void

public isPresent( data : _Tp | null ): boolean 

```



## Test

```bash
yarn install
yarn test
```

## License

[MIT](LICENSE)

[npm-url]: https://npmjs.org/package/traversable
