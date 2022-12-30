# Object Initializer

**객체 이니셜라이저(object initializer)**는 **객체 리터럴(object literal)**을 사용하여 객체를 생성하는 것을 의미한다.



## 객체 이니셜라이저로 초기화하기

```js
let album = {
    title: 'ultraviolence',
    artist: 'lana',
    displayTitle: function() { console.log(this.title); }
};
```

객체 리터럴은 값으로 평가될 수 있는 표현식이므로 값으로서 변수에 할당할 수 있다.



## ES6에 도입된 기능

### Shorthand property name

변수의 값을 프로퍼티의 값으로 지정할 수 있다.

```js
let a = 'foo', b = 1;
let obj = {
    a: a,
    b: b
};
```

이때 프로퍼티의 이름이 식별자의 이름이 같다면 프로퍼티의 이름을 생략할 수 있다.

```js
let a = 'foo', b = 1;
let obj = {
    a,
    b
};
```



### Duplicate properties

프로퍼티의 이름이 중복된다면 후자의 것이 전자의 것을 덮는다.

```js
let a = { x: 1, x: 2 };
console.log(a.x);		// 2
```

ES5의 엄격 모드에서는 `SyntaxError`을 발생시켰다.



### Computed property names

문자열 또는 문자열로 타입 변환할 수 있는 값으로 평가되는 표현식을 사용하여 프로퍼티 키를 동적으로 생성할 수 있다. 이를 **계산된 프로퍼티 이름(compouted property name)**이라고 한다. 단, 대괄호 표기법을 사용해야 한다.

```js
const key = 'name';
const obj = {
    [key]: 'rey'
};
console.log(obj.name);		// 'rey'
```



### Cloning by Spread syntax

**전개 구문(`...`)**을 사용하여 객체를 얕은 복사(shallow-cloning)할 수 있다.

```js
let obj1 = { a: 1, x: 2 };
let obj2 = { a: 3, y: 4 };

let cloned = { ...obj1 };		// { a: 1, x: 2 }
let merged = { ...obj1, ...obj2 };	// { a: 3, x: 2, y: 4}
```



### Shorthand method notation

메서드를 정의할 때 `function` 키워드를 생략할 수 있다.

```js
let obj1 = {
    print: function() {
        console.log('hello obj1');
    }
};

let obj2 = {
    print() {
        console.log('hello obj2');
    }
}
```

이때 메서드 축약 표현으로 정의한 메서드는 프로퍼티에 할당한 함수와 다르게 동작한다. [Constructor Function - constructor와 non-constructor의 구분](https://github.com/leegwae/study-javascript/blob/main/Constructor%20Function.md#constructor와-non-constructor의-구분)을 참고한다.



## Array Literals

- 배열 리터럴 역시 객체 리터럴의 일종으로, 배열 리터럴로 배열을 만들 수 있다.

```js
const COLORS = [ 'BLUE', 'PURPLE', 'YELLOW' ];
```



## 참고

- [MDN object lierals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#object_literals)
- [MDN array literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#array_literals)
- [MDN Object initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)
