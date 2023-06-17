# Scope

식별자의 **스코프(scope)**는 식별자를 참조할 수 있는 유효범위를 뜻한다. 스코프를 벗어난 식별자는 참조할 수 없어 `ReferenceError`를 발생시키거나 예상하지 못한 결과가 나올 수 있다. 식별자의 스코프는 식별자가 선언된 위치에 따라 결정된다.

스코프 내에서 식별자는 고유하다. 그러나 스코프가 다르다면 식별자의 이름은 같을 수 있다. 자바스크립트 엔진은 두 개의 변수가 이름이 같은 경우 스코프를 통해 어떤 변수를 참조할 것인지 결정한다. 이를 **식별자 결정(identifier resolution)**이라고 한다.

한편, 호이스팅은 스코프를 단위로 동작하여 변수의 선언은 자신이 속한 스코프의 최상단으로 끌어 올려진다. [Hoisting](https://github.com/leegwae/study-javascript/blob/main/Hoisting.md)을 침고한다.



## 스코프의 구분

스코프는 전역과 지역으로 구분할 수 있다.



### 전역

**전역(global)**은 코드의 가장 바깥 영역을 뜻한다. 전역에 선언된 변수는 **전역 변수(global variable)**라 하며 전역 스코프를 가진다.  전역 스코프는 프로그램이 시작할 때 생성되어 프로그램이 종료될 때까지 생존한다. 전역 변수는 어디서든 참조할 수 있다.



### 지역

**지역(local)**은 블록 혹은 함수의 내부 영역을 뜻한다. 지역에 선언된 변수는 **지역 변수(local variable)**이라 하며 지역 스코프를 가진다. 지역 스코프는 스코프가 생성된 후 참조되는 동안 생존한다. 지역 변수는 자신이 선언된 함수와 그 하위 지역 스코프에서 참조할 수 있다.

```js
function foo() {
    var x = 1;
}
```

변수 `x`는 함수 `foo`에 지역적이다.



## 스코프 체인

함수를 중첩할 때 바깥에 있는 함수는 외부 함수, 내부에 있는 함수를 중첩 함수라고 한다. 이때 스코프는 계층 구조를 가지며, 이것을 **스코프 체인(scope chain)**이라고 한다. 자바스크립트 엔진은 변수를 참조할 때, 변수를 참조하는 코드의 스코프부터 스코프 체인을 통해 상위 스코프 방향으로 이동하며 선언된 변수를 검색한다. 자바스크립트 엔진은 식별자를 키로 가지는 자료구조인 렉시컬 환경(lexical environment)을 연결(체이닝; chaining)하여 스코프 체인을 생성한다.

렉시컬 환경은 코드를 평가하여 생성되는 실행 컨텍스트(Execution Context)의 컴포넌트 중 하나이다. 렉시컬 환경과 실행 컨텍스트에 대해서는 [Execution Context](https://github.com/leegwae/study-javascript/blob/main/Execution%20Context.md)을 참고한다.

```js
var x = 'global x';

function outer() {
    var x = 'local x to outer';

    function inner() {
        var x = 'local x to inner';
        console.log(x);
    }
    inner();	// local x to inner
    console.log(x);	// local x to outer
}

outer();
console.log(x);	// global x
```

`inner`의 지역 스코프에 대하여 상위 스코프는 `outer`의 지역 스코프이다. `outer`의 지역 스코프에 대하여 상위 스코프는 전역 스코프가 된다. 상위 스코프에서 유효한 변수는 하위 스코프에서 참조할 수 있으나 그 역은 성립하지 않는다.



## 지역 스코프

지역 스코프는 스코프를 생성하는 기준에 따라 둘로 구분할 수 있다.

- 함수 레벨 스코프(function level scope)
- 블록 레벨 스코프(block level scope)



### 함수 레벨 스코프

`var`로 선언된 변수는 함수 몸체에 지역적이다. 이때 지역 스코프는 함수에 의해서 생성이 되고, 이를 **함수 레벨 스코프(function-level scope)**라고 한다.

```js
function foo() {
    var x = 1;
}
console.log(x);	// ReferenceError: x is not defined
```

`x`는 `foo`에 지역적이므로, `foo` 바깥에서 사용할 수 없다.

```js
if (true) {
    var x = 1;
}
console.log(x);	// 1
```

`x`는 코드 블록에 지역적이지 않다. 즉, 전역 스코프를 가지므로 코드 블록 바깥에서 사용할 수 있다.



### 블록 레벨 스코프

`let`과 `const`로 선언된 변수는 코드 블록에 지역적이다. 이때 지역 스코프는 코드 블록에 의해서 생성이 되고, 이를 **블록 레벨 스코프(block-level scope)**라고 한다.

```js
if (true) {
    const x = 1;
}
console.log(x);	// ReferenceError: x is not defined
```

`x`는 코드 블록에 지역적이므로 코드 블록 바깥에서 사용할 수 없다.



## 렉시컬 스코프

> 자바스크립트의 스코프는 정적 스코프이다.

**렉시컬 스코프(lexical scope)** 또는 **정적 스코프(static scope)**는 함수 정의가 평가되는 시점에 상위 스코프를 정적으로 결정한다. 함수 정의가 평가되어 생성된 함수 객체는 결정된 상위 스코프를 기억하여 함수가 호출될 때마다 자신이 기억하는 스코프를 상위 스코프로 사용한다.

```js
var x = 1;

function foo() {
    var x = 10;
    bar();
}

function bar() {
    console.log(x);
}

foo();	// 1
bar();	// 1
```

함수를 호출하는 시점에 상위 스코프를 동적으로 결정하는 동적 스코프(dynamic scope)라면 `bar`를 호출하는 시점에서 상위 스코프를 `foo`로 결정하여 `foo`의 지역 변수 `x`의 값인 `10`을 출력했을 것이다. 그러나 렉시컬 스코프에서는 `bar`의 정의가 평가되는 시점에서 상위 스코프를 전역으로 결정하여 전역 변수 `x`의 값 `1`을 출력한다.



## 변수의 생명 주기

변수는 자신의 생명 주기 동안 참조할 수 있다. 변수의 **생명 주기(life cycle)**은 메모리 공간을 확보(allocate)하여 변수를 생성하는 시점부터 가비지 컬렉터가 메모리 공간을 해제(release)하고 메모리 풀(memory pool)에 반환하여 변수가 소멸되는 시점까지이다.



### 지역 변수의 생명주기

지역 변수의 생명 주기는 대개 함수가 호출되어 실행하는 동안이다. 어떤 경우는 함수가 종료된 후에도 생존한다. [Closure](https://github.com/leegwae/study-javascript/blob/main/Closure.md)를 참고한다.



### 전역 변수의 생명 주기

전역 변수의 생명 주기는 프로그램이 실행된 후 종료될 때까지이다.

`var`로 선언한 전역 변수는 전역 객체의 프로퍼티가 된다. 따라서 `var`로 선언한 전역 변수의 생명 주기는 전역 객체의 생명 주기와 일치한다. 브라우저 환경에서 전역 객체의 생명 주기는 브라우저를 닫기 전까지 유효하다.

```js
var a = 1;
window.a;	// 1
```



## 참고

- 모던 자바스크립트 Deep Dive 13장: 스코프
- 모던 자바스크립트 Deep Dive 14장: 전역 변수의 문제점
- 모던 자바스크립트 Deep Dive 15장: `let`, `const` 키워드와 블록 레벨 스코프