# Hoisting

- **호이스팅(hoisting)**: 식별자가 자신이 속한 스코프의 최상단으로 끌어올려지는 것이다. `var`로 선언된 변수는 함수에 지역적이라면 함수의 최상단으로 호이스팅되며 전역 스코프를 가지면 코드의 최상단으로 호이스팅된다. 전역에 `function`으로 선언된 함수 선언문 역시 코드의 최상단으로 호이스팅된다.
- 이때, **끌어올려진 것은 '선언' 뿐이다**. 선언 이전에 참조한 `var` 변수는 `ReferenceError`를 발생시키지 않지만 초기화되지 않은 변수가 가지는 기본값 `undefined`를 반환할 수 있다. 따라서 함수 내의 모든 `var`문은 함수 상단에 두는 것이 좋다.

```js
console.log(a);	// undefined
var a = 1;
```

- ES6의 `let`, `const`, `class`를 사용한 선언문도 호이스팅되나, `undefined`로 초기화되지 않아 선언 이전에 참조한 식별자는 `ReferenceError`를 발생시킨다.

```js
console.log(a);	// ReferenceError: a is not defined
let a = 1;
```



## 1. 변수 호이스팅

### `var`로 선언한 변수

- `var`로 선언한 변수는 선언 이전에 참조해도 `ReferenceError`를 발생시키지 않으나 해당 변수는 `undefined` 값을 반환한다.

```js
console.log(x === undefined);	// true
var x = 1;
console.log(x === 1);	// true

// 암묵적으로 아래와 같다.
var x;
console.log(x === undefined);	// true
x = 1;
```

- 함수 내부에 `var`로 선언된 변수 역시 호이스팅으로 함수의 최상단으로 끌어올려져 선언 이후에 참조해도 `undefined` 값을 반환할 수 있다.

```js
var y = 2;
(function() {
    console.log(y);		// undefined
    var y = 3;
})();

// 암묵적으로 아래와 같다.
var y = 2;
(function() {
    var y;
    console.log(y);		// undefined
    y = 3;
})();
```



### `let`과 `const`로 선언한 변수

- `let`과 `const`로 선언한 변수 역시 호이스팅이 발생하나 선언 전의 참조는 `ReferenceError`를 일으키므로 그렇지 않은 것처럼 보인다. 

```js
let a = 1;
{
    console.log(a);	// ReferenceError: Cannot access 'a' before initialization
    let a = 2;
}
```

그러나 블록 내부에서 `let`으로 선언된 변수 `a`가 블록의 최상단으로 호이스팅되지 않았다면, `console.log`에서는 블록 바깥에 선언된 변수 `a`의 값을 가져왔을 것이다. 블록 내부의 `a`는 호이스팅되었으나 초기화되기 전에 참조되었으므로 `ReferenceError`를 발생시킨다.

```js
let a = 1;
{
    console.log(a);	// 1
}
```

여기서는 호이스팅된 것이 없으므로 블록 내부의 `console.log(a)`는 블록 바깥의 `a`를 참조한다.



## 2. 함수 호이스팅

- 함수 호이스팅: 함수 선언문의 경우 선언이므로 상단으로 끌어올려진다.

```javascript
foo();	// Hello, world

/* 함수 선언문 */
function foo() {
    console.log("Hello, world!")
}
```

- 변수 호이스팅: 함수 표현식의 경우 변수 선언만 끌어올려지고 객체 리터럴은 런타임에 평가된다.

```js
foo();	// TypeError: fun is not a function

/* 함수 표현식 */
var foo = function() {
    console.log("Hello, world!")
}
```



### 블록 내부의 함수 선언과 호이스팅

ES6 이전 ECMAScript 명세는 블록 내부에 함수 선언문을 사용하는 것을 허용하지 않았으나 많은 브라우저들이 이를 구현했다(구현 명세도 서로 달랐다). 레거시와의 호환성을 위해 ES6부터 strict mode에서 블록 내부에 함수 선언문을 사용하는 것을 허용한다. 이때 선언된 함수는 블록 레벨 스코프를 가지며, 가장 가까운 블록의 최상단으로 호이스팅된다.

```javascript
{
    function foo () { return 1 }
    foo() === 1
    {
        function foo () { return 2 }
        foo() === 2
    }
    foo() === 1
}
```

자세한 것은 [ECMAScript 13.0 Block-level Function Declarations Web Legacy Compatibility Semantics](https://262.ecma-international.org/13.0/#sec-block-level-function-declarations-web-legacy-compatibility-semantics)를 참고한다.



## 함수 호이스팅이 변수 호이스팅보다 우선한다

함수 선언과 변수 선언이 중복되면 함수 선언이 우선하여 중복 선언을 무시한다.

```javascript
console.log(typeof foo);

var foo;
function foo() {}
```

자바스크립트 엔진은 위 코드를 다음과 같이 해석한다.

```javascript
function foo() {}
console.log(typeof foo);	// function
```

그렇다면 다음 코드는 어떤가?

```javascript
var foo = 1;
function foo() {}

console.log(typeof foo);
```

자바스크립트 엔진은 다음과 같이 해석한다.

```javascript
function foo() {}
foo = 1;

console.log(typeof foo);	// number
```



## 참고

- [MDN Hoisting](https://developer.mozilla.org/ko/docs/Glossary/Hoisting)
- [MDN var](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/var#var_%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85(hoisting))
- [MDN 자바스크립트 안내서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Grammar_and_types#%EB%B3%80%EC%88%98_%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85)
- 모던 자바스크립트 Deep Dive 4장 변수
- 모던 자바스크립트 Deep Dive 15장: `let`, `const` 키워드와 블록 레벨 스코프
- You Don't Know JS Scope and Closures Chapter 4 Hoisting
- [Variable and Function Hoisting in JavaScript](https://medium.com/@e.be.walk/variable-and-function-hoisting-in-javascript-e0c8ce1d31a5)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block#block_scoping_rules_with_var_or_function_declaration_in_non-strict_mode
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
- http://es6-features.org/#BlockScopedFunctions
- https://262.ecma-international.org/13.0/#sec-block-level-function-declarations-web-legacy-compatibility-semantics



