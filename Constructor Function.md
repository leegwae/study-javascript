# Constructor Function

**생성자 함수**(constructor function)는 객체 지향 프로그래밍의 클래스처럼 동작하여 첫번째, 인스턴스를 생성하고 두번째, 생성한 인스턴스를 초기화한다.

생성자 함수는 자바스크립트가 제공하는, 표준 내장 객체를 생성하는 **빌트인**(built-in) 생성자 함수와 사용자가 정의한 타입의 객체를 생성하는 **사용자 정의**(user-define) 생성자 함수로 나뉜다.

여기서는 사용자 정의 생성자 함수를 주로 다룬다.



## 생성자 함수 정의하기

- 생성자 함수의 이름은 **대문자**로 시작한다.
- 생성자 함수 내부의 `this`는 생성자 함수가 생성할 인스턴스를 가리킨다.
- 따라서 생성될 인스턴스가 가질 프로퍼티는 `this`를 참조하여 `this.프로퍼티`로 선언한다.
  - 이때 생성자 함수가 함수로서 전달받은 인자를 선언한 프로퍼티에 할당할 수 있다.

```js
function Champion(name) {
    this.name = name;
    this.displayName = function() { console.log(this.name); };
}
```



### 생성자 함수의 인스턴스 생성 과정

생성자 함수의 인스턴스 생성 과정은 다음과 같다.

1. 인스턴스 생성과 `this` 바인딩
2. 인스턴스 초기화
3. 인스턴스 반환

```javascript
function Champion(name) {
    this.name = name;
}
```

위 생성자 함수 선언문을 기준으로 알아본다.



#### 인스턴스 생성과 `this` 바인딩

런타임 이전에 인스턴스의 생성과 `this` 바인딩이 실행된다.

1. 인스턴스의 생성: 암묵적으로 빈 객체가 생성된다. 이 객체는 생성자 함수가 생성할 인스턴스이다.
2. `this` 바인딩: 인스턴스는 생성자 함수 내부의 `this`에 바인딩된다.

```js
function Champion(name) {
    // 1. 암묵적으로 빈 객체가 생성되고 this에 바인딩된다.
    console.log(this);	// Champion {}
    
    this.name = name;
}
```



#### 인스턴스 초기화

`this.프로퍼티이름`으로 `this`에 바인딩되어 있는 인스턴스에 프로퍼티를 추가하고 생성자 함수가 함수로서 전달받은 인자를 인스턴스 프로퍼티에 할당하여 초기화한다.

```js
function Champion(name) {
    // 2. this에 바인딩된 인스턴스를 초기화한다.
    this.name = name;
}
```

여기서는 인자를 전달받은 파라미터 `name`의 값을 `this.name`에 할당하여 인스턴스의 프로퍼티 `name`을 초기화하고 있다.



#### 인스턴스 반환

생성자 함수는 자동적으로 인스턴스가 바인딩된 `this`를 반환하기 때문에 `return`문을 명시하지 않는다.

```js
function Champion(name) {
    this.name = name;
    // 3. 인스턴스가 바인딩된 this를 반환한다.
}
```

단, `return`문을 명시하여 객체를 반환하는 경우 해당 객체가 반환되며 원시 값을 반환하면 무시하고 `this`를 반환한다. 따라서 생성자 함수에는 `return`문을 명시하지 않도록 한다.

```js
function Foo() {
    this.a = 1;
    
	return { b: 1 };
}

function Bar() {
    this.a = 1;
    
    return 2;
}

console.log(new Foo());	// {b: 1}
console.log(new Bar());	// {a: 1}
```



## 생성자 함수 호출하기

생성자 함수를 호출할 때에는 `new` 연산자를 함께 사용한다.

```js
const lux = new Champion('luxanna');
```

 전달할 인자가 없다면 괄호 `()`를 생략하여 호출할 수 있다.

```js
let unnamed = new Champion;
console.log(unnamed);	// {name: undefined}
```



## 생성자 함수로 호출할 수 있는 함수

함수 객체는 다음과 같이 구분할 수 있다.

- callable이면서 constructor: 일반 함수 또는 생성자 함수로서 호출할 수 있는 객체
- callable이면서 non-constructor: 일반 함수로서만 호출할 수 있는 객체

즉, 모든 함수 객체는 callable하지만 모든 함수 객체를 생성자 함수로서 호출할 수는 없다.



### 내부 메서드 `[[Call]]`과 `[[Construct]]`

함수는 객체로서 내부 슬롯과 내부 메서드를 가지며, 추가적으로 `[[Environment]]`, `[[FormalParameters]]` 내부 슬롯과 `[[Call]]`, `[[Construct]]` 내부 메서드를 가진다.



#### `[[Call]]`

함수는 일반 함수로서 호출되면 내부 메서드 `[[Call]]`이 호출된다.

```js
function foo() {}
foo();	// 일반 함수로서 호출: [[Call]]이 호출된다.
```

내부 메서드 `[[Call]]`을 갖는 함수 객체를 호출 가능(callable)하다고 한다. 호출할 수 있는 객체는 곧 함수이므로 모든 함수 객체는 반드시 호출 가능하다.



#### `[[Construct]]`

`new` 연산자와 함께 생성자 함수로서 호출되면 내부 메서드 `[[Construct]]`가 호출된다.

```js
function foo() {}
new foo();	// 생성자 함수로서 호출: [[Construct]]이 호출된다.
```

내부 메서드 `[[Construct]]`를 갖는 함수 객체를 constructor라고 하며, 갖지 않는 함수 객체를 non-constructor라고 한다. constructor 객체는 생성자 함수로서 호출할 수 있는 함수이며, non-constructor 객체는 생성자 함수로서 호출할 수 없는 함수이다.



### constructor와 non-constructor의 구분

자바스크립트 엔진은 함수 정의를 평가하여 함수를 constructor와 non-constructor로 구분한다.

- **constructor**: 함수 선언문, 함수 표현식, 클래스로 정의된 함수
- **non-constructor**: 메서드와 화살표 함수

이때 ECMAScript 사양에서 **메서드로 인정하는 함수는 오직 ES6의 메서드 축약 표현으로 정의된 함수**이다.



#### constructor

함수 선언문, 함수 표현식, 클래스로 정의된 함수는 constructor이므로 `new` 연산자와 함께 생성자 함수로서 호출하면 내부 메서드 `[[Construct]]`가 호출된다.

- 함수 선언문

````js
/* 함수 선언문 */
function foo() {}
new foo();	// foo {}
````

- 함수 표현식

```js
/* 함수 표현식 */
const bar = function () {}
new bar();	// bar {}

/* 메서드이나 ECMAScript가 메서드로 인정하지 않음 */
const obj = {
    baz: function () {}
};
new obj.baz();	// baz {}
```



#### non-constructor

메서드(메서드 축약 표현으로 정의된 프로퍼티)와 화살표 함수는 non-constructor이므로 내부 메서드 `[[Construct]]` 생성자 함수로 호출할 수 없다.

- 메서드: ES6의 메서드 축약 표현으로 정의된 프로퍼티

```js
/* 메서드: ECMAScript가 메서드로 인정함 */
const obj = {
    bar() {}
};

new obj.bar();	// TypeError: obj.bar is not a constructor
```

- 화살표 함수

```js
/* 화살표 함수 */
const foo = () => {};

new foo();	// TypeError: foo is not a constructor
```



#### `prototype` 프로퍼티

constructor는 `prototype` 프로퍼티를 가지나 non-constructor는 `prototype` 프로퍼티를 가지지 않는다.

```js
(function() {}).hasOwnProperty('prototype');	// true
(() => {}).hasOwnProperty('prototype');	// false
```

`prototype` 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킨다.



## 생성자 함수로 호출되도록 하기

생성자 함수가 `new` 연산자 없이 호출되는 것을 방지하기 위해 ES6의 `new.target`을 사용할 수 있다. 한편, IE에서 ES의 최신 문법을 지원하지 않는 등 `new.target`을 사용할 수 없는 상황이라면 스코프 세이프 생성자 패턴을 사용할 수 있다.



### `new.target`

생성자 함수가 `new` 연산자 없이 호출되는 것을 방지하기 위해 ES6의 `new.target`을 사용할 수 있다. `new.target`은 메타 프로퍼티라고 부르며, `this`와 유사하게 사용된다. `new.target`의 값은 함수가 무엇으로 호출되느냐에 따라 다르다.

- 함수가 생성자 함수로서 호출되면 `new.target`은 함수 자신을 가리킨다. 
- 함수가 일반 함수로서 호출되면 `new.target`은 `undefined`다.

```js
function Champion(name) {
    if (!new.target) {
        return new Champion(name);
    }
    
    this.name = name;
}

const champion = Champion('lux');
console.log(champion.name);	// lux
```

일반 함수로서 호출되었을 때 `new.target === undefined`이므로 `!new.target`은 `true`로 평가된다. 이때 `new Champion(name)`을 반환하도록 하여 `new` 연산자 없이 호출되어도 생성자 함수로서 호출될 수 있도록 한다.



### 스코프 세이프 생성자 패턴

**스코프 세이프 생성자 패턴**(scope-safe constructor)는 `instanceof` 연산자를 사용한다.

```js
function Champion(name) {
    if (!(this instance of Champion)) {
        return new Champion(name);
    }
    
    this.name = name;
}

const champion = Champion('lux');
console.log(champion.name);	// lux
```

생성자 함수가 `new` 연산자와 함께 호출되면 빈 객체를 생성하고 `this`에 바인딩하는데, 이때 `this`와 `Champion`은 프로토타입에 의해 연결된다. 만약 일반 함수로 호출되었다면 `this`는 전역 객체 `window`를 가리키므로 `this`와 `Champion`은 프로토타입에 의해 연결되지 않는다. 이 경우 `this instance of Champion === false`이므로 `!(this...생략)`은 `true`로 평가된다. 이때 `new Champion(name)`을 반환하도록 하여 `new` 연산자 없이 호출되어도 생성자 함수로서 호출될 수 있도록 한다.

`this`의 값은 문맥에 따라 달라질 수 있다. [Keyword this.md](https://github.com/leegwae/study-javascript/blob/main/Keyword%20this.md)를 참고한다.



### 빌트인 생성자 함수의 호출

대부분의 빌트인 생성자 함수는 `new` 연산자와 함께 호출되었는지를 확인한 후 적절한 값을 반환한다. `Object`와 `Function` 생성자 함수의 경우 `new` 연산자 없이 호출해도 생성자 함수로서 동작한다. 그러나 `String`, `Number`, `Boolean` 생성자 함수는 `new` 연산자 없이 호출하면 피연산자를 각각의 타입의 원시값으로 변환한 값을 반환한다.

```js
/* Object 생성자 함수 */
const foo = new Object();
console.log(foo);	// {}
const bar = Object();
console.log(bar);	// {}

/* String 생성자 함수 */
const obj = new String(123);
console.log(obj);	// String {'123'}
const str = String(123);
console.log(str);	// 123
```

