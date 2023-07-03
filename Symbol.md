# Symbol

```javascript
typeof Symbol() === 'symbol';
```

ES6 **심볼(symbol)**은 원시 데이터 타입으로, **유일하고** 변경 불가능한 원시 값이다.

## Symbol 생성하기

심벌 값은 `Symbol` 생성자를 사용하여 생성할 수 있다.

```javascript
const s = Symbol(문자열);
```

- `문자열`은 `Symbol.prototype.description`에 저장되는 인자로 동일한 문자열을 전달해도 동일한 값의 심벌이 생성되지 않는다.

  ```javascript
  Symbol('hello') === Symbol('hello');	// false
  ```

- `new` 연산자는 인스턴스를 생성할 때 사용하므로 원시 값인 심벌 값을 만들기 위해 `new` 연산자를 사용할 수 없다.

  ```javascript
  new Symbol();	// Uncaught TypeError: Symbol is not a constructor
  ```

- `Symbol` 래퍼 객체를 통해 프로토타입 프로퍼티나 메서드에 접근할 수 있다.

  ```javascript
  const mySymbol = Symbol('심볼!');
  console.log(mySymbol);	// 심볼!
  console.log(mySymbol.toString());	// Symbol(심볼!)
  ```

### 타입 변환

- 심벌 값은 암묵적으로 문자열이나 숫자 타입으로 변환되지 않는다.

  ```javascript
  console.log(Symbol() + '');	// Uncaught TypeError: Cannot convert a Symbol value to a string
  console.log(+Symbol())	// Uncaught TypeError: Cannot convert a Symbol value to a number
  
  ```

- 심벌 값은 암묵적으로 불리언 타입으로 변환된다.

  ```javascript
  console.log(!!Symbol()); // true
  ```

### `Symbol.for`/`Symbol.keyFor`

| 메서드               | 파라미터 | 설명                                                         |
| -------------------- | -------- | ------------------------------------------------------------ |
| `Symbol.for(문자열)` | `string` | 전역 심벌 레지스트리에서 `문자열`을 키로 심벌 값을 검색한다. 있다면 반환한다. 없다면 심벌 값을 생성하여 전역 심벌 레지스트리에 해당 `문자열`로 저장하고 반환한다. |

`Symbol`을 호출하여 만든 심벌 값은 전역 심벌 레지스트리에 등록되지 않으나 `Symbol.for`를 사용하면 전역 심벌 레지스트리에 등록하여 문자열 키 값을 사용해 관리할 수 있다. 동일한 문자열을 전달하면 동일한 심볼 값을 반환하도록 보장한다.

```javascript
Symbol.for('mySymbol') === Symbol.for('mySymbol');	// true
```

| 메서드                | 파라미터 | 설명                                                         |
| --------------------- | -------- | ------------------------------------------------------------ |
| `Symbol.keyFor(심볼)` | `symbol` | 전역 심벌 레지스트리에서 `심볼`에 대응하는 키 값을 반환한다. 없다면 `undefined`를 반환한다. |

```javascript
const hello = Symbol.for('hello')
console.log(Symbol.keyFor(hello));	// hello
const world = Symbol('world');
console.log(Symbol.keyFor(world));	// undefined
```

## 프로퍼티 키

심볼은 대개 유일한 이름의 프로퍼티 키를 만들기 위해 사용한다. (자바스크립트에서 프로퍼티의 키로는 문자열과 심볼을 사용한다. [11. 객체 - 프로퍼티의 키](https://github.com/leegwae/study-javascript/blob/main/11.%20Objects.md#%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0%EC%9D%98-%ED%82%A4)를 참고한다.)

```javascript
const obj = {
    [Symbol.for('mySymbol')]: 10,
};
console.log(obj[Symbol.for('mySymbol')]);	// 10
```

유일한 값이므로, 표준 빌트인 객체를 확장할 때 사용하면 버전이 갱신되어도 이름이 충돌되지 않으니 좋다.

### 프로퍼티 은닉

심볼 값을 프로퍼티 키로 사용한 프로퍼티는 외부에 노출되지 않는다. `Object.getOwnPropertySymbols`에 객체를 넘기면 해당 객체가 가지고 있는 심볼 프로퍼티 키를 배열로 반환한다.

```javascript
const obj = {
    [Symbol.for('hello')]: 1,
    [Symbol.for('world')]: 2,
};
console.log(Object.getOwnPropertySymbols(obj));	// [Symbol(hello), Symbol(world)]
```

## Well-known Symbol

**Well-known Symbol**은 자바스크립트 엔진의 내부 알고리즘에 사용되는 빌트인 심볼 값이다. 사용자는 직접 객체의 프로퍼티로 well-known symbol을 사용하여 객체의 동작을 정의할 수 있다. 보통 명세에서는 well-known symbol을 `@@심볼이름`으로 표현한다.

현재 ECMA2023 기준 well-known symbol은 13개이다. [참고](https://262.ecma-international.org/14.0/#sec-well-known-symbols)

### `Symbol.iterator`: 객체를 이터러블로 만들기

명세의 이터러블 프로토콜(메서드가 제너레이터를 반환하도록 한다)을 준수하여 `Symbol.iterator` 메서드를 정의하면 객체를 이터러블로 만들 수 있다.

```javascript
let obj = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
    },
};

for (const val of obj) {
    console.log(val);
};
// 1
// 2
// 3
```

### `Symbol.toPrimitive`: 객체를 원시 값으로 형변환하기

```javascript
let obj = {
    a: 'HELLO WORLD',
    b: 100,
    
    [Symbol.toPrimitive](hint) {
        console.log(`hint: ${hint}`);
        return hint == 'string' ? this.a : this.b;
    },
}

// hint가 "string"인 경우
alert(obj);
// hint: string
// HELLO WORLD

// hint가 "number"인 경우
alert(+obj);
// hint: number
// 100

// hint가 "default"인 경우
alert(obj+100);	
// hint: deafult
// 200
```

객체를 원시 값으로 형변환하는 것에 대해서는 [객체를 원시 값으로 변환하기](https://github.com/leegwae/study-javascript/blob/main/Conversion Object to Primitive Value.md)를 참고한다.



## 참고

- 모던 자바스크립트 Deep Dive 33장 7번째 데이터 타입 Symbol
- https://262.ecma-international.org/14.0/#sec-ecmascript-language-types-symbol-type

