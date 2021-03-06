# Optional Chaining

**옵셔널 체이닝(optional chaining) 연산자 `?.`**는 ES11에 도입되었다. 객체가 nullish가 아닌 경우에만 프로퍼티에 접근하고자 할 때 유용하다.



## 1. 도입 이전

- 참조가 `null` 또는 `undefined`인 객체의 프로퍼티를 접근하려고 시도하면 다음과 같은 에러가 발생한다.

```
let foo;
console.log(foo.a);
// Uncaught TypeError: Cannot read property 'a' of undefined
```

- 따라서 `TypeError`의 발생을 피하기 위해 논리 AND 연산자 `&&`와 단축 평가로 참조가 nullish인지 확인해야했다.

```js
let obj = { foo: undefined };
let prop = obj.foo && obj.foo.a;
```



## 2. optional chaining이란 무엇인가

- 옵셔널 체이닝 연산자 `?.`은 왼쪽 항의 피연산자가 nullish(`null` 혹은 `undefined`)이면 `undefined`를 반환한다. 그렇지 않으면 오른쪽 항의 프로퍼티를 참조한다.

```js
let obj = null;
let prop = obj?.foo;	// undefined
```

- 단, 평가의 대상은 반드시 선언되어 있어야 한다.

```js
// obj is not defined
let popr = obj?.foo;
// Uncaught ReferenceError: obj is not defined
```

- `?.`의 동작 방식은 아래와 같다.

```js
let prop = ((obj.foo === null || obj.foo === undefined) ? undefined : obj.foo.a);
```



## 3. optional chaining으로 프로퍼티에 접근하기

- optional chaining은 세 가지 형태로 사용할 수 있다.
  - `obj?.foo`: `obj`가 nullish가 아니면 `obj.prop`를 반환한다.
  - `obj?.[foo]`: `obj`가 nullish가 아니면 `obj[foo]`를 반환한다.
  - `obj?.foo()`: `obj`가 nullish가 아니면 `obj.foo()`를 호출한다.

```js
const arr = []
let item = arr?.[1];
console.log(item);		// undefined
```



## 4. optional chaining으로 읽고 삭제하기

- `?.`은 할당문의 좌측에서 사용할 수 없으므로, **쓰기에는 사용할 수 없다**.

```js
let obj = {};
obj?.foo = 1;	// Uncaught SyntaxError: Invalid left-hand side in assignment
```

- `?.`은 `읽기`와 `삭제`를 지원한다.

```js
let obj = { foo: 1 };
delete obj?.foo;		// true
obj;		// {}
```



## 참고

- [모던 자바스크립트 옵셔널 체이닝](https://ko.javascript.info/optional-chaining)
- [MDN optional chaining](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Optional_chaining)