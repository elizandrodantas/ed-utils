# Random

random details

## randomArray

```ts
function array<T>(array: T[]): T
```

```js
const { array } = require('./index');

array([1, 2, 3]) // output 1 or 2 or 3
```

## hash

```ts
interface IOptionGenerateHash {
    number: boolean, // default: true
    upper: boolean,
    special: boolean,
    onlyUpper: boolean
}

function hash(length: number = 16, options?: IOptionGenerateHash): string
```

## number

```ts
function number(max: number, min: number = 0): number
```

```js
const { number } = require('./index');

number(3, 1)
```

## ObjectId

```js
function objectId(): string
```
## Uuidv4

```ts
function uuidv4(): string
```
