# Hoisting

- **호이스팅(hoisting)**: `var`로 선언된 Javascript 변수가 "끌어올려"지거나, 함수나 statement의 최상단으로 올려지는 것이다. (변수 선언들은 코드가 실행되기 전에 처리하므로, 최상위에 선언한 것과 동일하기 때문이다.) 전역 범위에 선언된 함수 선언 역시 끌어올려진다.
- 이때, **끌어올려진 것은 '선언' 뿐이다**.
  - 따라서 선언 이전에 참조한 변수가 `ReferenceError`를 발생시키지 않지만 초기화되지 않은 변수가 가지는 기본값 `undefined`를 반환할 수 있다.
- 따라서 함수 내의 모든 `var`문은 함수 상단에 두는 것이 좋다.
- ECMAScript 2015의 `let`, `const`는 호이스팅하지 않으므로, 선언 이전에 참조한 변수는 `ReferenceError`를 발생시킨다.



## 1. 변수 호이스팅

- 선언 이전에 참조해도 `ReferenceError`를 발생시키지 않으나 해당 변수는 `undefined` 값을 반환한다.

```js
console.log(x === undefined);	// true
var x = 1;

// 암묵적으로 아래와 같다.
var x;
console.log(x === undefined);	// true
x = 1;
```

- 선언 이후에 참조해도 호이스팅으로 인하여 `undefined` 값을 반환할 수 있다.

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



## 2. 함수 호이스팅

- 함수 호이스팅: 함수 선언(function statement)은 곧 함수 정의이므로, 상단으로 끌어올려진다.

```javascript
foo();	// Hello, world

/* 함수 선언 */
function foo() {
    console.log("Hello, world!")
}
```

- 변수 호이스팅: 함수 표현식(function expression)이 할당된 변수는 그 선언만 끌어올려지므로, 함수 선언과 같이 수행되지 않는다.

```js
foo();	// TypeError: fun is not a function

/* 함수 표현식 */
var foo = function() {
    console.log("Hello, world!")
}
```



## 참고

[MDN Hoisting](https://developer.mozilla.org/ko/docs/Glossary/Hoisting)

[MDN var](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/var#var_%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85(hoisting))

[MDN 자바스크립트 안내서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Grammar_and_types#%EB%B3%80%EC%88%98_%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85)

