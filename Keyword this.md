# this

- 자바스크립트에서 키워드 `this`는 객체 자신의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수(self-referencing variable)이다.
- 따라서 `this`의 바인딩(`this`가 참조하는 값)은 맥락에 따라 달라진다.
  - 런타임 바인딩(runtime binding): 함수가 어떻게 호출되었는지 그 방법에 따라 결정된다.
  - ES5 `bind()`: 호출 방법에 관계없이 함수의 `this` 값 지정 가능
  - ES6 arrow function: `this`를 바인드하지 않는다.




## 역사

- `this`는 호출 방법에 따라 그 값이 달라지므로 객체 지향 스타일에 적합하지 않았다.

```js
function Foo() {
    this.a = 0;
    
    setInterval(function () {
        this.a++;
    }, 1000);
}

let f = new Foo();
f.a === 0;	// true
```

- ES5, `this`를 변수에 할당하여 해결하였다.

```js
function Foo() {
    let self = this;
    self.a = 0;
    
    setInterval(function () {
        self.a++;
    }, 1000);
}

let f = new Foo();
```

- ES6, 화살표 함수는 전역 스코프의 `this`를 사용하므로 해결된다.

```js
function Foo() {
    this.a = 0;
    
    setInterval(() => {
        this.a++;
    }, 1000);
}

let f = new Foo();
```



## 1. Gobal context

- `this`는 엄격 모드 여부에 관계없이 전역 객체를 참조한다.

```js
// 웹 브라우저에서 전역 객체는 window 객체
this === window;		// true

// 전역 변수 선언
a = 10
window.a;	// 10

this.b = 20;
window.b;	// 20
```



## 2. Function context

- `this`는 함수를 호출한 방법에 의해 값이 결정된다.



| 함수 호출 방식       | `this`가 참조하는 값          |
| -------------------- | ----------------------------- |
| 일반 함수로서 호출   | 전역 객체                     |
| 메서드로서 호출      | 메서드를 호출한 객체          |
| 생성자 함수로서 호출 | 생성자 함수가 생성할 인스턴스 |

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



### 2.1 단순 호출

- 비엄격 모드: 호출에 의해 값이 설정되지 않으므로, 전역 객체 참조

```js
function foo() { return this; }
foo() === window;
```

- 비엄격 모드: `this` 값을 설정하려면 `call` 혹은 `apply` 메서드를 사용한다.
  - 이 메서드들은 `this`로 전달된 값이 객체가 아니면 객체로 변환하기 위해 시도한다(박싱).
    - `null`, `undefined`: 전역 객체
    - 원시값: 래퍼 객체를 이용하여 객체로 변환

```js
let obj = 'custom';
function foo() { return this };

foo() === window;		// true
foo.call(obj);	// [object String]
foo.apply(undefined); // [object global] 
```

- 엄격 모드: `this`의 값이 excution context(실행 문맥)에 진입한다.
  - 아래의 경우에서 `foo()`는 객체의 메서드나 속성으로 호출하지 않고 직접 호출하였으므로 `this`는 `undefined` (Strict Mode.md 참고)
  - `window.foo()`는 `window` 객체의 메서드로서 호출되었으므로 `this`는 `window`

```js
function foo() {
    'use strict';
    return this;
}

foo() === undefined;	// true
window.foo() === window;	// true
```



### 2.2 bind 메서드

- 호출 방법에 관계없이 `this`의 값을 영구적으로 `bind`의 첫번째 매개변수로 고정(그 외 매개변수는 함수의 인수로 전달)

```js
function foo() { return this.a; };

let a = foo.bind({a: 'prometheus'});
console.log(a());
let b = foo.bind({a: 'lost paradise'});
console.log(b());
```



### 2.3 화살표 함수

- `this`의 값은 영구적으로 생성 시점에서 `this`를 감싼 정적 범위(enclosing lexcial context)이다. 
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

- 함수 B가 호출될 때, B의 `this`는 함수 A의 `this`로 고정된다.

```js
let foo = () => { 'use strict'; return this; }
foo() === window;	// true
```

- `this`는 lexical이므로, `this`에 관한 엄격 모드의 규칙은 무시된다.



### 2.4 메서드로 호출

- 함수가 어떤 객체의 메서드로 호출되면 `this`의 값은 그 객체이다.

```js
let foo = {
    func: () => this,
};

let bar = {
    func: function () { return this; },
}

foo.func() === window;		// true
bar.func() === bar;			// true
```



### 2.5 생성자 호출

- 생성자로서 `new` 키워드와 함께 호출된 함수의 `this` 값은 새로 생긴 객체이다.

```js
function foo() { this.a = 12 };
let obj = new foo();
obj.a;		// 12

function bar() {
    this.a = 12;
    return { a: 7 };
}

obj = new bar();
obj.a;		// 7
```



## 참고

[MDN this](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this)

[MDN Functions](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Functions#%EC%82%AC%EC%A0%84%EC%A0%81_this)

