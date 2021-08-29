# Destructuring assignment

-  **[구조 분해 할당(destructuring assignment)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)**: 배열의 요소나 객체의 프로퍼티를 개별 변수에 담을 수 있게 한다.



## 1. 배열 구조 분해

- 변수 할당

```js
const COLORS = [ 'BLUE', 'YELLOW' ];
let [ a, b ] = COLORS;
```

- 리터럴 할당

```js
let [ a, b ] = [ 'BLUE', 'YELLOW' ];
```

- 분해한 값이 `undefined`인 경우 기본값 사용하기

```js
let [ a=1, b=2 ] = [ 3 ];
// a는 3, b는 2
```

- 값 swap하기

```js
let a = 1, b = 3;
[ a, b ] = [ b, a ];
```

- 일부 반환 값 무시하기

```js
let [ a, , b ] = [ 1, 2, 3 ];
```

- spread syntax(`...`) 이용하기

```js
let [ a, b, ...c ] = [ 1, 2, 3, 4 ];
console.log(c);	// [ 3, 4 ]
```



## 2. 객체 구조 분해

- 변수 할당

```js
let o = { a: 1, b: true };
let { a, b } = o;
```

- 새로운 변수 이름에 할당하기

```js
let { a: x, b: y } = o;
console.log(x);	// 1
console.log(y);	// true
```

- 분해한 값이 `undefined`인 경우 기본값 사용하기

```js
let { a = 1, b = 2 } = { a: 3 }
// a는 3, b는 2
```

- 새로운 변수 이름에 기본값 사용하기

```js
var {a: aa = 1, b: bb = 2} = {a: 3};

console.log(aa); // 3
console.log(bb); // 2
```

- computed property name 사용하기

```js
let key = 'a';
let { [key]: b } = { a: 'HELLO' }; 
console.log(b);		// HELLO
```

- spread syntax 사용하기

```js
let { a, b, ...c } = { a: 1, b: 2, c: 3, d: 4 };
console.log(c);	// { c: 3, d: 4 }
```

- property shorthand 사용하기

```js
let a = 1, foo = { a: 2, b: 3 };
foo = { ...foo, a };	// { a: 1, b: 3}
```

