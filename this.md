# this

- 키워드 `this`는 객체 내부에서 객체 자신의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수(self-referencing variable)이다. 따라서 `this`에 담기는 값은 문맥에 따라 달라지며, 엄격 모드인지 아닌지에 따라 달라지기도 한다. 이처럼 동적으로 바인딩이 결정되는 것을 런타임 바인딩(runtime binding)이라고 한다.



## Gobal context

`this`는 전역 문맥에서 전역 객체를 참조한다.

```js
this === window;		// true

// 전역 변수 선언
a = 10;
window.a;	// 10

this.b = 20;
window.b;	// 20
```



## Function context

`this` 바인딩은 함수 호출 방식에 따라 동적으로 결정된다.

| 함수 호출 방식       | `this`가 참조하는 값          | 엄격 모드의 경우              |
| -------------------- | ----------------------------- | ----------------------------- |
| 일반 함수로서 호출   | 전역 객체                     | `undefined`                   |
| 메서드로서 호출      | 메서드를 호출한 객체          | 메서드를 호출한 객체          |
| 생성자 함수로서 호출 | 생성자 함수가 생성할 인스턴스 | 생성자 함수가 생성할 인스턴스 |

```js
function foo() {
    console.log(this);
    return this;
}

// 일반 함수로서 호출
let thisVal = foo();	// window
console.log(window === thisVal);	// true

const obj = { foo };
// 메서드로서 호출
thisVal = obj.foo();	// {foo: ƒ}
console.log(obj === thisVal);	// true

// 생성자 함수로서 호출
const instance = new foo();	// foo {}
```

일반 함수로서 호출할 때 `this`는 전역 객체를 가리키게 되므로 `this.프로퍼티`로 할당한 값은 전역 객체의 프로퍼티에 할당이 된다. 따라서 생성자로 정의한 함수가 일반 함수로 호출될 경우를 주의해야한다.

```javascript
function Foo(name) {
    this.name = name;
}

Foo('Chromatics');
console.log(name)	// Chromatics
```





### 일반 함수로 호출

- 모든 함수는 일반 함수로 호출했다면 일반 함수 내의 `this`는 전역 객체를 참조한다.

```js
function foo() {
    console.log(this);
}
foo();	// window
```

- 그러나 엄격 모드의 경우 `this`는 `undefined`를 바인딩한다.

```js
function foo() {
    'use strict';
    
    console.log(this);
}
foo();	// undefined
```

전역 함수 `foo`는 전역 객체 `window`의 프로퍼티이지만 `window`가 `foo`를 메서드로서 호출한 것으로 보지 않는다.



#### 중첩 함수와 콜백 함수 문제

- 메서드 내에 정의된 중첩 함수도 일반 함수로 호출한다면 중첩 함수 내의 `this`는 전역 객체를 참조한다.

```js
const obj = {
    foo() {
        console.log(this === obj);
        
        function bar() {
            console.log(this === window);
        }
        bar();	// true
    }
}

obj.foo();	// true
```

- 콜백 함수도 일반 함수로 호출된다면 콜백 함수 내의 `this`는 전역 객체를 참조한다.

```js
const val = 1;

const obj = {
    val: 100,
    foo() {
        setTimeout(function () {
            console.log(`this의 값: ${this}`);	// window
            console.log(`this.val의 값: ${this.val}`);	// 1
        }, 100);
    }
};

obj.foo();
```



#### 해결

- 이 경우 임의의 변수에 `this`를 할당하여 중첩 함수나 콜백 함수에서 사용한다.

```js
const val = 1;

const obj = {
    val: 100,
    foo() {
        const self = this;

        setTimeout(function () {
            console.log(`this.val의 값: ${self.val}`);
        }, 100);
    }
};

obj.foo();	// this.val의 값: 100
```

- 아니면 `Function.prototype`의 `apply`, `call`, `bind` 메서드를 사용한다.

```js
const val = 1;

const obj = {
    val: 100,
    foo() {
        setTimeout(function () {
            console.log(`this.val의 값: ${this.val}`);
        }.bind(this), 100);
    }
};

obj.foo();	// this.val의 값: 100
```

[간접 호출하기](#간접-호출하기)를 참고한다.



### 메서드로 호출

메서드로 호출했다면 메서드 내부의 `this`는 메서드를 호출한 객체에 바인딩된다.

```js
const lux = {
    name: 'lux',
    getName() {
        return this.name;
    }
}

const rammus = {
    name: 'rammus'
};
rammus.getName = lux.getName;
console.log(rammus.getName());	// rammus

const getName = lux.getName;
console.log(getName());	// ''
```

`line 15`에서 `getName()`은 일반 함수를 호출하는 것이므로`this`는 전역 객체 `window`에 바인딩되고 `window.name`을 반환한다. 한편, 브라우저 환경에서 `window.name`은 브라우저 창의 이름을 나타내고 기본값은 `''`이다.

```javascript
function Champion(name) {
    this.name = name;
}

Champion.prototype.name = 'prototype';
Champion.prototype.getName = function () {
    console.log(this.name);
}

const c = new Champion('lux');
console.log(c.getName());	// lux
```

이러한 `this`의 특성을 사용한 것이 프로토타입 체인으로 상속받은 메서드를 호출하는 방식이다. `getName` 메서드를 소유한 것은 `Champion.prototype`이라는 객체이지만, 호출하는 것은 `c`이기 때문에 `'prototype'`이 아니라 `'lux'`가 출력되는 것이다.



### 생성자 함수로 호출

생성자 함수로 호출했다면 생성자 함수 내부의 `this`는 생성자 함수가 생성할 인스턴스에 바인딩된다.

```js
function Champion(name) {
    this.name = name;
}

const lux = new Champion('lux');
console.log(lux.name);	// lux
```



## 간접 호출하기

ES5의 `Function.prototype.apply/call/bind`를 사용하면 함수 내부에서 사용할 `this` 값을 명시적으로 지정할 수 있다. 즉, 자신의 프로토타입 체인에 속하지 않는 메서드를 간접적으로 호출할 수 있다.

| 메서드                          | 설명                                                       |
| ------------------------------- | ---------------------------------------------------------- |
| `Function.prototype.apply/call` | 함수 내부의 `this`를 지정하고 함수를 호출한다.             |
| `Function.prototype.bind`       | 함수 내부의 `this`가 지정한 값으로 고정된 함수를 반환한다. |



### `Function.prototype.apply/call`

`Function.prototype.apply`와 `Function.prototype.call`을 사용하면 함수를 호출할 때 함수 내부 `this`의 값을 지정할 수 있다.

```js
호출할 함수.apply(this에 바인딩할 값, 인수의 배열);
호출할 함수.call(this에 바인딩할 값, 인수1, 인수2, ...);
```

- `apply`의 `인수의 배열`이나 `call`의 `인수`들은 `호출할 함수`의 매개변수로 전달된다. `호출할 함수`에 전달할 인수가 없다면 생략할 수 있다.
- `apply`의 `인수의 배열`은 배열이거나 유사 배열 객체일 수 있다.
- `this에 바인딩할 값`은 `호출할 함수` 내부의 `this`에 바인딩된다.
- `this에 바인딩할 값`이 객체가 아니면 객체로 변환한 값이 `this`에 바인딩된다.
  - `null`, `undefined`: 전역 객체
  - 원시 값: 래퍼 객체로 변환

```js
const champion = {
    name: 'lux'
};

function getName() {
    return this.name;
}

console.log(getName.call(champion));	// lux
```

- 보통 어떤 객체가 자신의 프로토타입 체인에 존재하지 않는 프로퍼티나 메서드를 사용하고 싶을 때 사용한다. 예를 들어 유사 배열 객체 `arguments`가 배열 메서드(`Array.prototype`의 메서드)를 사용하고자 할 때 `call`이나 `apply`로 간접 호출한다.

```js
function sum() {
    // return [...arguments].reduce((acc, cur) => acc + cur, 0);
    return Array.prototype.reduce.call(arguments,
                                      (acc, cur) => acc + cur,
                                      0);
}
```



### `Function.prototype.bind`

`Function.prototype.bind`는 `Function.prototype.call/apply`처럼 `this`의 값이 바뀐 함수를 호출하지 않고 다만 반환한다.

```js
함수.bind(this에 바인딩할 값);
```

- `this에 바인딩할 값`은 `함수` 내부의 `this`에 바인딩된다.
- 보통 메서드 내부의 `this`와 메서드 내부의 중첩 함수 또는 콜백 함수의 `this`가 일치하지 않는 문제를 해결하기 위해 사용한다.

```js
var val = 'unknown';
console.log(this.val);	// unknown

const lux = {
    val: 'lux',
    foo(callback) {
        setTimeout(callback.bind(this), 100);
    }
};

const rammus = {
    val: 'rammus',
    foo(callback) {
        setTimeout(callback, 100);
    }
};

lux.foo(function () {
    console.log(this.val);
});	// lux

rammus.foo(function () {
    console.log(this.val);
});	// unknown
```



## 화살표 함수

- 화살표 함수 내부에 있는 `this`의 값은 영구적으로 생성 시점에서 `this`를 감싼 정적 범위(enclosing lexcial context)이다. 
  - 즉, 전역 코드(global code)에서는 전역 객체(global object)가 값이 된다.
  - `call`, `bind`, `apply`로 `this`의 값을 정해주어도 무시한다.

```js
/* 전역 객체 */
let obj = this;

/* foo를 둘러싼 scope는 전역 */
let foo = () => this;
console.log(foo() === obj);		// true

let bar = { func: foo };
bar.foo() === obj;			// true
```

```js
let obj = {
    // 함수 A
    func: function() {
        // 함수 B
        let x = () => this;
        
        return x;
    }
};

console.log(obj.func()() === obj);		// true

let func1 = obj.func();
console.log(func1() === obj);			// true

let func2 = obj.func;
console.log(func2()() === window);		// true
```

함수 B가 호출될 때, B의 `this`는 함수 A의 `this`로 고정된다.

- `this`는 lexical이므로, `this`에 관한 엄격 모드의 규칙은 무시된다.

```js
let foo = () => { 'use strict'; return this; }
foo() === window;	// true
```


## 참고

- [MDN this](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this)
- [MDN Functions](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Functions#%EC%82%AC%EC%A0%84%EC%A0%81_this)
- 모던 자바스크립트 Deep Dive 22장: this

