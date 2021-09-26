# Symbol

- 심볼(symbol)은 객체 프로퍼티로 쓸 고유한 식별자를 만들 때 사용한다.



## 1. Symbol 생성하기

- `symbol` 타입은 primitive data type에 속하며, 따라서 `symbol` 타입의 값은 primitive data이다. 

```js
Symbol('선택적 문자열: 디버깅에 사용할 심볼 설명');
typeof Symbol() === 'symbol';		// true
```

- `symbol()`은 고유한 심볼 값을 반환한다.
  - 따라서, 아래와 같이 `symbol` 데이터의 비교는 무조건 `false`를 반환한다.

```js
Symbol('foo') === Symbol('foo');		// false
```

- `Symbol`은 `new Symbol()`을 지원하지 않아 생성자의 관점에서는 불완전한 내장 객체 클래스이다.

```js
let sym = new Symbol();
// Uncaught TypeError: Symbol is not a constructor
```



## 2. 심볼과 문자열 변환

- `symbol`에서 `string`사이의 자동 형 변환은 이루어지지 않는다.

```js
let sym = Symbol('symbol');
console.log(sym)
```

- 디버깅용 메시지를 출력하려면 다음과 같이 한다.

```js
// toString() 메서드 사용
let sym = Symbol('sym');
console.log(sym.toString());		// 'Symbol('sym')'

// descrption 프로퍼티 사용
console.log(sym.descrption);		// 'sym'
```



## 3. 숨겨진 프로퍼티

- 숨겨진(hidden) 프로퍼티는 외부에서 접근이 불가능하며 값을 덮어쓸 수 없다.

