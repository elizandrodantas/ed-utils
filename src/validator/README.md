# Validators

validators details

## isCpf

```ts
function isCpf(cpf: string): boolean
```

```js
const { isCpf } = require('./index');

isCpf('00000000000');
```

## isEmail

```ts
interface IEmailValidatorOption {
    whitelist: string | string[]
}

function isEmail(email: string, option?: IEmailValidatorOption): boolean
```

```js
const { isEmail } = require('./index');

isEmail('test@elizandro.com');
```

## isMd5

```ts
function isMd5(md5: string): boolean
```

```js
const { isMd5 } = require('./index');

isMd5('af5597c29467a96523a70787c319f4db');
```

## isObjectId

```ts
function isObjectId(objectId: string): boolean
```

```js
const { isObjectId } = require('./index');

isObjectId('551137c2f9e1fac808a5f572');
```

## isPhone

```ts
interface IOptionsValidatorPhone {
    countryCodePresent: boolean,
    areaCodePresent: boolean,
    justTypeNumber: boolean,
    allowMobileOnly: boolean,
    allowFixedOnly: boolean,
    checkDigitNine: boolean
}

function isPhone(phone: string, options?: IOptionsValidatorPhone): boolean | string
```

```js
const { isPhone } = require('./index');

isPhone('89 9 8100-0000');
```

## isUuidv4

```ts
function isUuidv4(uuidv4: string): boolean
```

```js
const { isUuidv4 } = require('./index');

isUuidv4('b671de51-b0f1-4dac-8d1d-11280b5a775c');
```

## TypeOf

```ts
function isString(value: any): boolean
function isNumber(value: any): boolean
function isObject(value: any): boolean
function isArray(value: any): boolean
function isBoolen(value: any): boolean
function isFunction(value: any): boolean
function isUndefined(value: any): boolean
```
