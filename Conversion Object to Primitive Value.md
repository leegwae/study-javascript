# Conversion Object to Primitive Value

자바스크립트에서 객체를 원시값으로 변환할 수 있다.

## Hint

객체의 형 변환은 hint를 기준으로 이루어진다. hint는 목표로 하는 자료형이다.

### `"string"`

객체가 문자열로 변환되기를 기대하는 연산을 수행할 때 hint는 `"string"`이다.

```javascript
alert(obj);	// alert 연산자는 문자열을 피연산자로 기대한다.
foo[obj] = 1; // 자바스크립트에서 프로퍼티 키는 Symbol 혹은 문자열이다.
```

### `"number"`

객체가 숫자로 변환되기를 기대하는 연산을 수행할 때 hint는 `"number"`이다.

```javascript
var num = Number(obj);
var num = +obj;	// 단항 덧셈 연산은 피연산자를 숫자로 변환한다.
var delta = date1 - date2;	// 이항 빼기 연산은 피연산자를 숫자로 변환한다.
let greater = user1 > user2;	// 비교 연산은 피연산자가 문자열이나 숫자를 기대하지만 hint는 'number'로 고정되어있다.
```

### `"default"`

연산자가 기대하는 데이터의 타입이 확실하지 않을 때 hint는 `"default"`이다.

```javascript
var total = obj1 + obj2;	// 이항 덧셈 연산은 피연산자가 문자열이거나 숫자이다.
if (user == 1) {}
```

### 빌트인 객체의 hint

- `Date`를 제외한 모든 빌트인 객체는 hint가 `default`일 때와 `number`일 때를 동일하게 처리한다.



## 형 변환 알고리즘

자바스크립트는 객체를 원시 값으로 형 변환할 때 다음과 같은 알고리즘을 실행한다.

1. 객체에 `obj[Symbol.toPrimitive](hint)` 메서드가 있는지 찾아 실행한다.
2. 메서드가 없다면 다음과 같이 한다.
   1. hint가 `"string"`이면 `obj.toString()`이나 `obj.valueOf()`를 호출한다.
   2. hint가 `"number"`이나 `"default"`이면 `obj.valueOf()`나 `obj.toString()`을 호출한다.



`Symbol.toPrimitive`와 `obj.toString()`, `obj.valueOf()`는 hint대로 형이 변환될 것을 보장하지 않으며, 원시값을 반환한다는 것만을 보장한다.



### `Symbol.toPrimitive`

`Symbol.toPrimitive`는 [내장 심볼(Well-Known Symbols)](https://theubermensch.tistory.com/203) 중 하나로, 사용자는 이 심볼을 사용하여 hint에 따라 어떤 동작을 할 지 정의할 수 있다. 단, 원시값을 반환하지 않으면 런타임에 이 메서드를 호출 시 `TypeError: Cannot convert object to primitive value`를 발생시킨다.

#### 예시) hint에 따라 다른 값 제공하기

```js
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



### `toString`, `valueOf`

`Symbol.toPrimitive` 메서드가 정의되어있지 않다면 `toString` 혹은 `valueOf`를 호출한다.

1. hint가 `"string"`인 경우, `toString`을 호출한다. 이때 원시값을 반환하지 않는다면 `valueOf`를 호출한다. 이때에도 원시값을 반환하지 않는다면 `TypeError`를 발생시킨다. 이 알고리즘의 결과가 원시값이라면, 최종적으로 이 원시값을 문자열로 변환하여 반환한다. (원시값을 문자열로 변환할 수 없는 경우는 없다.)
2. hint가 `"number"`나 `"default"`인 경우, `valueOf`를 호출한다. 이때 원시값을 반환하지 않는다면 `toString`을 호출한다. 이때에도 원시값을 반환하지 않는다면 `TypeError`를 발생시킨다. 이 알고리즘의 결과가 원시값이라면, hint가 `"number"`인 경우 최종적으로 이 원시값을 숫자로 변환하여 반환한다. 변환할 수 없다면 `NaN`을 반환한다.

사용자가 두 메서드를 모두 객체를 반환하도록 재정의하지 않는이상 `TypeError`가 발생하는 일은 없다. 또한 사용자가 두 메서드를 모두 재정의하지 않았고 내부적으로 재정의된 메서드가 없어도 프로토타입 체인에 따라 `Object.prototype.toString`과 `Object.prototype.valueOf`가 호출된다.

- `object.prototype.toString()`: 문자열 `"[object Object]"`를 반환한다.
- `object.prototype.valueOf()`: 객체 자신을 반환한다.

이 경우 객체는 어떤 경우의 hint를 가졌더라도 알고리즘에 따라 `"[object Object]"`로 변환된다. (hint가 `"number"`나 `"defualt"`여서 `valueOf`가 먼저 호출되어도 객체를 반환하기 때문에 `toString`의 반환값이 최종 변환값이 됨)

#### 빌트인 객체의 `toString`과 `valueOf`

 몇몇 빌트인 객체는 `toString`과 `valueOf`를 재정의하여 적절한 원시 값을 반환하고 있다.

```javascript
new Date().toString();		// 'Wed Apr 05 2023 00:00:10 GMT+0900 (한국 표준시)'
new Date().valueOf();		// 1680620557961
new Number().toString();	// '0'
new Number().valueOf();		// 0
```

#### 예시) `toString`과 `valueOf` 정의해보기

`toString`이 문자열을, `valueOf`가 숫자를 반환할 때의 결과를 알아보자.

```js
let obj = {
    toString() {
        return 'HELLO WORLD';
    },
    valueOf() {
        return 100;
    }
};

String(obj);		// 'HELLO WORLD': hint가 string이고 원시값도 문자열임
+obj;		// 100: hint가 number이고 원시값도 숫자임
obj + 100;	// 200: hint가 default이며 원시값이므로 그대로 반환
```

`valueOf`가 문자열을 반환할 때의 결과를 알아보자.

```javascript
let obj = {
    valueOf() {
        return '100';
    }
};

+obj;	// 100: hint가 number이므로 문자열 '100'을 숫자 100으로 변환
obj + 100;	// 100100: hint가 default이며 원시값이므로 그대로 반환
```



## 참고

- [Object to primitive conversion](https://javascript.info/object-toprimitive)
- [MDN - Object.prototype.toString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)
- [MDN - Object.prototype.valueOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)
