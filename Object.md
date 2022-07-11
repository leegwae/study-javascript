# Object

`Object`의 메서드와 프로퍼티를 설명한다.



## `Object()`

- `Object` 생성자는 전달된 값의 객체 래퍼를 생성한다.

| 인자                                    | 반환                    |
| --------------------------------------- | ----------------------- |
| 객체                                    | 해당 객체               |
| `null`, `undefined`, 전달하지 않은 경우 | 빈 객체                 |
| nullish 아닌 원시값들                   | 원시값의 원시 래퍼 객체 |

```js
new Object(1) instanceof Number;		// true
new Object(true) instanceof Boolean;	// true
```



## Object 인스턴스와 Object 프로토타입 객체

- 모든 객체는 `Object`의 자손이다.

```js
객체 instanceof Object;		// true
```

- 따라서 모든 객체는 `Object.prototype`으로부터 메서드와 프로퍼티를 상속받는다.



## 프로토타입의 메서드

### Object.prototype.valueOf()

- 피연산자 객체의 원시값 `[[PrimitiveValue]]`을 반환한다.

```js
const numObj = new Number(1);
const num = numObj.valueOf();
console.log(num);		// 1
```

- 피연산자 객체가 원시값을 가지지 않는다면 자신을 반환한다.

```js
const obj = new Object();
const val = obj.valueOf();
console.log(obj === val);		// true
```

- 사용자 정의 객체에서 재정의할 수 있다.
  - [Conversion Object to Primitive Value](./Conversion Object to Primitive Value.md) 참고



## 생성자의 메서드

### `Object.getOwnPropertyDescriptor()`

하나의 프로퍼티에 대하여 프로퍼티 디스크립터 객체를 반환한다.

```js
Object.getOwnPropertyDescriptor(객체, 프로퍼티);
```

- `객체`에 객체의 참조를 전달한다.
- `프로퍼티`에 프로퍼티의 이름(문자열 혹은 심볼)을 전달한다.
- 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다.
- 존재하지 않거나 상속받은 프로퍼티의 경우 `undefined`를 반환한다.



```js
const champion = {
    name: 'lux',
};
const descriptor = Object.getOwnPropertyDescriptor(champion, 'name');
console.log(JSON.stringify(descriptor));
// {"name":{"value":"lux","writable":true,"enumerable":true,"configurable":true}}
```



### `Object.getOwnPropertyDescriptors()`

객체의 모든 프로퍼티에 대하여 각각 프로퍼티 디스크립터 객체를 반환한다.

```js
Object.getOwnPropertyDescriptors(객체);
```

- `객체`에 객체의 참조를 전달한다.
- 객체의 모든 프로퍼티에 대하여 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환한다.

```js
const champion = {
    name: 'lux',
    class: '마법사'
};
const descriptors = Object.getOwnPropertyDescriptors(champion);
console.log(JSON.stringify(descriptors, null, 2));
```

```
{
  "name": {
    "value": "lux",
    "writable": true,
    "enumerable": true,
    "configurable": true
  },
  "class": {
    "value": "마법사",
    "writable": true,
    "enumerable": true,
    "configurable": true
  }
}
```



### `Object.defineProperty()`

객체에 프로퍼티 어트리뷰트를 명시하여 프로퍼티를 정의하거나 프로퍼티 어트리뷰트를 수정한다.

```js
Object.defineProperty(객체, 프로퍼티, 디스크립터);
```

- `객체`에 객체의 참조를 전달한다.
- `프로퍼티`에 프로퍼티의 이름(문자열 혹은 심볼)을 전달한다.
- `디스크립터`에 프로퍼티 디스크립터 객체를 전달한다.
- 프로퍼티가 정의된 `객체`를 그대로 반환한다.

```js
const obj = {};
console.log(obj === Object.definedProperty(obj, 'name', {
    value: 'umi',
    writable: true
}));	// true
```



### `Object.defineProperties()`

여러 개의 프로퍼티를 정의하거나 프로퍼티 어트리뷰트를 수정할 수 있다.

```js
Object.defineProperties(객체, {
   프로퍼티1: 디스크립터1,
   프로퍼티2: 디스크립터2,
});
```

- `객체`에 객체의 참조를 전달한다.
- `프로퍼티`에 프로퍼티의 이름(문자열 혹은 심볼)을 전달한다.
- `디스크립터`에 프로퍼티 디스크립터 객체를 전달한다.
- 프로퍼티가 정의된 `객체`를 그대로 반환한다.

```js
const champion = {};
Object.defineProperties(obj, {
    firstName: {
        value: 'Luxanna',
        writable: true,
        enumerable: true,
        configurable: true,
    },
    lastName: {
        value: 'Crownguard',
    }
});
console.log(champion.firstName);	// Luxanna
console.log(champion.lastName);	// Crownguard
```





