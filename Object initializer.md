# Object initializer

- 객체 이니셜라이저는 프로퍼티이름과 값의 쌍(`key: value`)을 콤마로 구분하고 `{}`로 묶은 것이다.

```js
let o = {
    a: 'foo',
    b: 42,
};
```

- `b: 42,` 처럼 마지막 프로퍼티의 끝에 붙은 콤마를 `trailing comma`라고 한다.



## 1. 객체 이니셜라이저로 객체 생성하기

```js
let album = {
    title: 'ultraviolence',
    writer: 'rey'
};
```



## 2. 변수를 프로퍼티의 값으로 넣기

```js
let a = 'foo',
    b = 1,
    c = {};

let o = {
    a: a,
    b: b,
    c: c
};
```



### 2.1 Shorthand property name(ES2015)

- 변수를 프로퍼티의 값으로 지정하고 싶을 때, `프로퍼티이름`과 `변수이름`이 같다면 다음과 같이 할 수 있다.

```js
let a = 'foo',
    b = 1,
    c = {};

let o = { a, b, c };
console.log(o.a === { a }.a);		// true
```



## 3. 중복된 프로퍼티의 이름

```js
let a = { x: 1, x: 2 };
console.log(a.x);		// 2
```

- 프로퍼티의 이름이 중복되면 후자의 것이 전자를 덮는다.
- ECMAScript5의 엄격모드에서는 프로퍼티 이름의 중복이 `SyntaxError`이다.
- ECMAScript 2015에서는 위 제한이 제거되었다.



## 4. Computed property names(ES2015)

- 프로퍼티 이름으로 표현식의 계산 결과를 사용할 수 있다. 
- 표현식을 `[]`로 감싸고 프로퍼티의 이름으로 명시한다(이는 대괄호 표기법으로 프로퍼티를 접근하는 것과 유사하다.)

```js
const PROS = 'name';
const obj = {
    [PROS]: 'rey'
};
console.log(obj.name);		// 'rey'
```



## 5. Spread syntax in Object Initializer

- 전개 구문(`...`)을 사용하여 객체를 얕은 복사(shallow-cloning)할 수 있다.

```js
let obj1 = { a: 1, x: 2 };
let obj2 = { a: 3, y: 4 };

let cloned = { ...obj1 };		// { a: 1, x: 2 }
let merged = { ...obj1, ...obj2 };	// { a: 3, x: 2, y: 4}
```



## 6. Array Literals

- 배열 리터럴 역시 객체 리터럴의 일종으로, 배열 리터럴로 배열을 만들 수 있다.

```js
const COLORS = [ 'BLUE', 'PURPLE', 'YELLOW' ];
```



## 참고

- [MDN object lierals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#object_literals)
- [MDN array literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#array_literals)
- [MDN Object initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)
