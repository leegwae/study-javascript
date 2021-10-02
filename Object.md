# Object

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
