# traversablejs
## This generic collection library, written by Typescript


[!npm][npm-url]

in JavaScript
in TypeScript
```ts
const {  Optional, Vector, seqOf, Set, setOf, Map, mapOf  } = require(“traversable”) 

Optional.empty()
Optional.of(“james”)

Vector.of(1, 2, 3, 4, 5)
seOf(1, 2, 3, 4, 5)

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

## Test

```bash
yarn install
yarn test
```

## License

[MIT](LICENSE)

[npm-url]: https://npmjs.org/package/traversable
