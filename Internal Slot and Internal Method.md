# Internal Slot and Internal Method

> 내부 슬롯과 내부 메서드는 ECMAScript 명세에서 객체를 설명할 때 사용하는 알고리즘과 내부 상태이다.

- **내부 메서드(Internal method)**는 ECMAScript 명세가 객체의 런타임 동작을 설명하는 알고리즘을 가리키기 위해 사용하는 용어이다.
- **내부 슬롯(Internal slot)**은 ECMAScript 명세가 객체의 내부 상태를 가리키기 위해 사용하는 용어이다. 예를 들어, 모든 객체는 `[[Prototype]]`이라는 내부 슬롯을 가진다.
- ECMAScript 명세는 내부 메서드와 내부 슬롯의 이름을 `[[]]`로 감싸 표현한다.

## 모든 객체가 가지는 내부 슬롯

TODO

## 모든 객체가 가지는 내부 메서드

TODO

## 함수 객체가 추가로 가지는 내부 슬롯

### `[[Environment]]`

함수 정의가 평가될 당시의 환경을 나타내는 환경 레코드를 값으로 가진다. 함수 정의가 평가되어 실행된 함수 실행 컨텍스트의 렉시컬 환경의 외부 환경으로 사용된다. [실행 컨텍스트](https://github.com/leegwae/study-javascript/blob/main/Execution%20Context.md)와 [클로저](https://github.com/leegwae/study-javascript/blob/main/Closure.md)를 참고한다.



## 함수 객체가 추가로 가지는 내부 메서드

### `[[Call]]`

함수가 일반 함수로서 호출되면 내부 메서드 `[[Call]]`이 호출된다.

```js
function foo() {}
foo();	// 일반 함수로서 호출: [[Call]]이 호출된다.
```

내부 메서드 `[[Call]]`을 갖는 객체를 호출 가능(callable)하다고 한다. 호출할 수 있는 객체는 곧 함수이므로 모든 함수 객체는 반드시 호출 가능하다.

#### `[[Construct]]`

함수가 `new` 연산자와 함께 생성자 함수로서 호출되면 내부 메서드 `[[Construct]]`가 호출된다.

```js
function foo() {}
new foo();	// 생성자 함수로서 호출: [[Construct]]이 호출된다.
```

내부 메서드 `[[Construct]]`를 갖는 함수 객체를 constructor라고 한다. 모든 constructor는 함수이므로 `[[Call]]` 역시 가진다. 그러나 모든 함수가 constructor는 아니다.

constructor와 non-constructor에 대해서는 [Constructor Function](https://github.com/leegwae/study-javascript/blob/main/Constructor%20Function.md)를 참고한다.

## 참고

- 모던 자바스크립트 Deep Dive - 
- 모던 자바스크립트 Deep Dive - 17장 생상자 함수에 의한 객체 생성
- https://262.ecma-international.org/13.0/#sec-object-internal-methods-and-internal-slots
- https://262.ecma-international.org/13.0/#sec-ordinary-object-internal-methods-and-internal-slots
- https://262.ecma-international.org/13.0/#sec-ecmascript-function-objects