# Iterator and Generator

## Iterator

- **반복자(iterator)**는 시퀀스와 종료시의 잠재적으로 반환할 값을 정의한다.
- 반복자는 `next()` 메서드로 iterator protocol을 구현한 모든 객체이다.
  - `next()` 메서드는 다음 두 개의 프로퍼티를 가진 객체를 반환한다.
    - `value`: 반복 시퀀스의 다음값
    - `done`: 시퀀스의 마지막 값이 이미 소모되었다면 `true`이다.
    - 즉, `{done: Boolean, value: any}`의 형태를 가진다.
- 반복자의 메커니즘
  - 반복자 객체는 일단 생성되면, `next()` 메서드를 반복적으로 호출하여 명시적으로 반복될 수 있다.
  - 반복자를 반복하는 것 일반적으로 단 한 번만 가능하므로, 반복자를 소모한다고 말한다.
  - 종료 후에 `next()`를 호출하면 계속해서 `{done: true}`를 반환한다.



## Generator

- **생성자(generator) 함수**는 실행이 연속적이지 않은 함수를 통하여 반복 알고리즘을 정의할 수 있게 한다.
- 생성자 함수는 `function*` 구문으로 작성한다.
- 생성자의 메커니즘
  - 생성자 함수가 호출되면, 이 함수는 초기에 이 코드를 실행하지 않는다.
  - 대신 **생성자(Generator)**라고 불리는 특별한 타입의 반복자를 반환한다.
  - 생성자의 `next` 메서드를 호출하여 값이 소모될 때 생성자 함수는 `yield` 키워드를 마주칠 때까지 실행한다.
- 생성자 함수는 원하는만큼 호출할 수 있으며, 호출할 때마다 새로운 생성자를 반환한다. 각각의 생성자는 단 한 번 반복될 것이다.



## Iterables

- **반복가능한(iterable)** 객체(혹은 프로토타입 체인에 있는 객체)가 **@@iterator** 메서드, 즉 `Symbol.iterator` 프로퍼티를 구현한다.
- `@@iterator`의 의미는 [`@@`의 의미](https://theubermensch.tistory.com/203)를 참고한다.



### 반복가능한 내장 객체

- `String`, `Array`, `TypedArray`, `Map`, `Set`
  - 프로토타입 객체가 `Symbol.iterator` 프로퍼티를 정의하고 있다.



### 반복가능한 객체 만들기

- `for...of` 문법으로 `1, 2, 3` 출력하는 객체 정의하기
  - `for...of`는 시작하며 `Symbol.iterator`를 호출한다. (해당 프로퍼티가 없으면 에러 발생)
  - `Symbol.iterator` 메서드는 반복자(`next` 메서드를 정의한 객체)를 반환한다.
  - `for...of`는 다음 루프에서 다시 반복자의 `next` 메서드를 호출한다.
  - `next()` 메서드는 `{done: Boolean, value: any}` 형태의 값을 반환한다.

```js
let obj = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
    },
};

for (let val of obj) {
    console.log(val);
};
// 1
// 2
// 3
```



### 

