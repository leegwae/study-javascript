# Conversion Object to Primitive Value

- 객체의 형 변환은 hint를 기준으로 세 종류로 구분된다.
  - `"string"`
  - `"number"`
  - `"default"`



## ToPrimitive

- hint가 `"string"`인 경우: 문자열을 기대하는 연산을 수행할 때

```js
alert(obj);
foo[obj] = 1;
```

- hint가 `"number"`인 경우: 수학 연산할 때

```js
let num = Number(obj);
let num = +obj;
let num = obj1 - obj2;
let isGreater = obj1 > obj2;
```

- hint가 `"default"`인 경우: 연산자가 기대하는 자료형이 확실하지 않을 때
  - 이항 더하기 연산자 `+` : 피연산자에 `string`이 있다면 string concatenation하고 그렇지 않다면 더하기 연산
  - 동등 연산자 `==`: `object` - `number`/`string`/`symbol`로 비교하면 어떤 자료형으로 바꿔야할 지 알 수 없음.

```js
let sum = obj1 + obj2;
if (obj == 1) { ... };
```



### 형 변환 알고리즘

- 자바스크립트는 형 변환이 필요할 때 아래의 알고리즘을 실행한다.
  - 객체에 `obj[Symbol.toPrimitive](hint)` 메서드가 있는지 찾아 실행한다.
  - 메서드가 없다면 다음과 같이 한다.
    - hint가 `"string"`이면 `obj.toString()`이나 `obj.valueOf()`를 호출한다.
    - hint가 `"number"`이나 `"default"`이면 `obj.valueOf()`나 `obj.toString()`을 호출한다.
- `Symbol.toPrimitive`와 `toString()`, `valueOf()`는 hint대로 형 변환을 보장하지 않는다. 다만 원시값을 반환한다는 것을 보장한다.
  - `Symbol.toPrimitive`: 원시값을 반환하지 않으면 에러가 발생한다.
  - 그 외: 원시값을 반환하지 않으면 무시된다.



### Symbol.toPrimitive

- `Symbol.toPrimitive`는 내장 심볼로, 목표로 하는 자료형(hint)를 명명하는데 사용한다.

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



### toString, valueOf

- hint가 `"string"`인 경우 `toString()` -> `valueOf()` 순으로 호출된다.
- 그 외의 경우 `valueOf()` -> `toString()` 순으로 호출된다.
- `toString()`과 `valueOf()`는 반드시 원시값을 반환해야 하므로 객체를 반환하는 경우 그 결과가 무시된다. 즉, 메서드가 존재하지 않는 것처럼 다룬다.
- 메서드는 각각 다음을 반환한다.
  - `toString()`: 문자열 `"[object Object]"`를 반환한다.
  - `valueOf()`: 객체 자신을 반환한다.

```js
let obj = {
    a: 'HELLO WORLD',
    b: 100,
    
    toString() {
        return this.a;
    },
    valueOf() {
        return this.b;
    }
};

alert(user);		// HELLO WORLD
alert(+user);		// 100
alert(user + 100);	// 200
```







## 참고

- [모던 자바스크립트 - 객체를 원시형으로 변환하기](https://ko.javascript.info/object-toprimitive)

