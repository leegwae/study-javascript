# Optional Chaining

## 1. chaining operator

- 참조가 `null` 또는 `undefined`인 객체의 프로퍼티를 접근하려고 시도하면 다음과 같은 에러가 발생한다.

```
let foo;
console.log(foo.a);
// Uncaught TypeError: Cannot read property 'a' of undefined
```

- 따라서 참조가 nullish인지 확인해야했다.

```js
let obj = { foo: undefined };
// let prop = obj.foo.a;
// Uncaught TypeError: Cannot read properties of undefined (reading 'a')
let prop = obj.foo && obj.foo.a;
```



## 2. optional chaining

- `?.`은 평가의 대상이 nullish(`null` 혹은 `undefined`)이면 `undefined`를 반환한다.

```js
let obj = null;
let prop = obj?.foo;	// undefined
```

- 평가의 대상은 반드시 선언되어 있어야 한다.

```js
// obj is not defined
let popr = obj?.foo;
// Uncaught ReferenceError: obj is not defined
```

- 즉, `?.`의 동작 방식은 아래와 같다.

```js
let prop = ((obj.foo === null obj.foo === undefined)) ? undefined : obj.foo.a;
```



## 3. optional chaining으로 프로퍼티에 접근하기

- optional chaining은 세 가지 형태로 사용할 수 있다.
  - `obj?.foo`: `obj`가 존재하면 `obj.prop`를 반환한다.
  - `obj?.[foo]`: `obj`가 존재하면 `obj[foo]`를 반환한다.
  - `obj?.foo()`: `obj`가 존재하면 `obj.foo()`를 호출한다.

```js
// optional chaining을 배열에 사용하기
let item = arr?.[1];
```



## 4. optional chaining으로 읽고 삭제하기

- `?.`은 할당문의 좌측에서 사용할 수 없으므로, `쓰기`에는 사용할 수 없다.

```js
let obj = {};
obj?.foo = 1;
// Uncaught SyntaxError: Invalid left-hand side in assignment
```

- `?.`은 `읽기`와 `삭제`를 지원한다.

```js
let obj = { foo: 1 };
delete obj.foo;		// true
obj;				// {}
```



## 참고

- [모던 자바스크립트 옵셔널 체이닝](https://ko.javascript.info/optional-chaining)
- [MDN optional chaining](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Optional_chaining)