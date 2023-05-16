# Standard Built-in Objects

- **표준 내장 객체(standard built-in objects)**는 ECMAScript에 정의된 객체로, 모든 런타임에서 **전역 객체(global object)**의 프로퍼티로 제공된다.

## 생성자 함수인 객체와 그렇지 않은 객체

표준 내장 객체는 생성자 함수와 생상자 함수가 아닌 객체로 나눌 수 있다.

| 구분                              | 제공하는 메서드                        | 종류                                            |
| --------------------------------- | -------------------------------------- | ----------------------------------------------- |
| 생성자 함수인 표준 내장 객체      | - 프로토타입 메서드<br />- 정적 메서드 | 생성자 함수가 아닌 표준 내장 객체를 제외한 전부 |
| 생성자 함수가 아닌 표준 내장 객체 | - 정적 메서드                          | `Math`, `Reflect`, `JSON`                       |

## 표준 내장 객체의 종류

### 주요 객체

JavaScript에서 기초가 되는 객체이다.

- `Object`
- `Function`
- `Boolean`
- `Symbol`
- `Error`

### 숫자와 날짜

숫자와 날짜를 나타내고 조작할 때 사용한다.

- `Number`
- `BigInt`
- `Math`
- `Date`

### 텍스트 처리

텍스트를 나타내고 조작할 때 사용한다.

- `String`
- `RegExp`

### 인덱스 콜렉션

인덱스 값으로 정렬된 데이터의 컬렉션을 나타낸다. 배열과 유사-배열 구조를 가진다.

- [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [`Int8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int8Array)
- [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
- [`Uint8ClampedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray)
- [`Int16Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int16Array)
- [`Uint16Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint16Array)
- [`Int32Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array)
- [`Uint32Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array)
- [`BigInt64Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt64Array)
- [`BigUint64Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigUint64Array)
- [`Float32Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array)
- [`Float64Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float64Array)

### 키 콜렉션

키를 사용하여 접근하는 데이터의 컬렉션을 나타낸다.

- `Map`
- `Set`
- `WeakMap`
- `WeakSet`

### 구조화된 데이터

구조화된 데이터를 나타낼 때 사용한다.

- `ArrayBuffer`
- `SharedArrayBuffer`
- `DataView`
- `Atomics`
- `JSON`

### 메모리 관리

가비지 컬렉션 메커니즘과 관련하여 객체를 제어할 수 있다.

- `WeakRef`
- `FinalizationRegistry`

### 제어 추상화 객체

코드를 구조화하는데 도움이 된다. 가령, async 코드를 사용하여 콜백 지옥 없이 사용할 수 있다.

- [`Iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)
- [`AsyncIterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator)
- [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [`GeneratorFunction`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction)
- [`AsyncGeneratorFunction`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGeneratorFunction)
- [`Generator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)
- [`AsyncGenerator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator)
- [`AsyncFunction`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction)

### 리플렉션

- `Reflect`
- `Proxy`



## 참고

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
- 모던 자바스크립트 Deep Dive 21장 빌트인 객체