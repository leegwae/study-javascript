# Standard Built-in Objects

- 표준 내장 객체(standard built-in object)는 전역 범위의 여러 객체를 의미한다.
- 전역 객체(global object)는 전역 범위에서 `this`나 `globalThis`를 사용하여 접근 가능한 객체이다.



## 값 프로퍼티

이 전역 프로퍼티들은 속성이나 메서드를 가지지 않으며 심플 값을 반환한다.

- `Infinity`
- `NaN`
- `undefined`
- `null` 리터럴
- `globalThis`



## 함수 프로퍼티

객체의 프로퍼티가 아니며 전역으로 호출한다. 반환값은 호출자에게 반환된다.



## 기초 객체

모든 객체의 기반 및 기초가 된다.

- `Object`
- `Function`
- `Boolean`
- `Symbol`
- `Error`



## 기타 객체

### 숫자 및 날짜

- `Number`
- `BigInt`
- `Math`
- `Date`



### 텍스트 처리

- `Strin`
- `RegExp`



### 인덱스 콜렉션

- `Array`
- `int8Array`



### 키 콜렉션

- `Map`
- `Set`
- `WeakMap`
- `WeakSet`



### 구조화된 데이터

- `ArrayBuffer`
- `JSON`



### 제어 추상화 객체

- `Promise`
- `Generator`
- `GeneratorFunction`
- `AsyncFunction`



### 리플렉션

- `Reflect`
- `Proxy`



### 기타

- `arguments`



## 참고

[MDN 표준 내장 객체](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects#%EA%B8%B0%EC%B4%88_%EA%B0%9D%EC%B2%B4)