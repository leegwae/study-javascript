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



## 생성자의 메서드

### Object.getOwnPropertyDescriptor()

```js
Object.getOwnPropertyDescriptor(객체, 프로퍼티);
```

- 피연산자 `객체`의 `프로퍼티`에 대한 설명자(descriptor)를 반환한다.

```js
const champion = {
    name: 'lux',
};
const descriptor = Object.getOwnPropertyDescriptor(champion, 'name');
console.log(JSON.stringify(descriptor, null, 2))
```

```
{
  "value": "lux",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
```

- 자바스크립트에서 프로퍼티는 문자열로 된 이름이나 `Symbol`, 그리고 프로퍼티 설명자로 이루어진다.



### Object.defineProperty()

```js
Object.defineProperty(객체, 프로퍼티, 설명자);
```

- 피연산자 `객체`에 `프로퍼티`를 정의하거나 이미 존재하는 프로퍼티라면 수정하고 해당 객체를 반환한다.

```js
const obj = {};
console.log(obj === Object.definedProperty(obj, 'name', {
    value: 'umi',
    writable: true
}));	// true
```

- **프로퍼티 설명자(desciprtor)**는 두 가지 타입으로 나뉜다.
  - 데이터 설명자(data descriptor): 값을 가지는 프로퍼티를 기술할 때 사용
  - 접근자 설명자(accessor descriptor): 게터-세터 함수를 한 쌍으로 가지는 프로퍼티를 기술할 때 사용
- 설명자는 두 타입 중 하나의 타입만 될 수 있다.
  - `설명자` 객체를 전달할 때 이 객체에 데이터 설명자에 속하는 속성과 접근자 설명자에 속하는 속성 둘 다 존재하면 오류가 발생한다.
- 데이터 설명자는 다음 속성들을 가진다.

| 속성       | 디폴트      | 설명                                  |
| ---------- | ----------- | ------------------------------------- |
| `value`    | `undefined` | 프로퍼티에 관련된 값                  |
| `writable` | `true`      | 프로퍼티의 값을 바꿀 수 있으면 `true` |

- 접근자 설명자는 다음 속성들을 가진다.

| 속성  | 디폴트      | 설명                   |
| ----- | ----------- | ---------------------- |
| `get` | `undefined` | getter로 기능하는 함수 |
| `set` | `undefined` | setter로 기능하는 함수 |

- 두 타입의 설명자는 아래의 속성들을 공통으로 가진다.

| 속성           | 디폴트  | 설명                                                         |
| -------------- | ------- | ------------------------------------------------------------ |
| `configurable` | `false` | 설명자의 속성의 값이 변경될 수 있고, 프로퍼티가 삭제될 수 있으면 `true` |
| `enumerable`   | `false` | 객체의 프로퍼티 열거 시 열거된다면 `true`                    |

- `configurable: false`는 다음을 제약한다.
  - `configurable` 플래그 수정 불가능: 따라서 한번 `false`로 지정하면 `true`로 돌릴 수 없음.
  - `enumerable` 플래그 수정 불가능
  - `writable: false`를 `true`로 수정 불가능
  - `get`/`set` 변경 불가능: 새로이 만들어야함.



### Object.defineProperties()

```js
Object.defineProperties(객체, {
   프로퍼티1: 설명자1,
   프로퍼티2: 설명자2,
});
```

- `객체`에 설명자를 여러 개 정의할 수 있다.



### Object.getOwnPropertyDescriptors()

```js
Object.getOwnPropertyDescriptors(객체);
```

- `객체`의 모든 설명자를 가져온다.

