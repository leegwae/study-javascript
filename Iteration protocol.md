# Iteration protocol

ES6 이터레이션 프로토콜(Iteration protocol)은 순회 가능한 자료구조를 만들기 위한 규약이다. ES6 이전의 순회 가능한 자료구조들은 이터레이션 프로토콜을 준수하는 이터러블로 통일되었다. 

이터레이션 프로토콜은 두 개의 프로토콜로 나누어진다.

1. 이터러블 프로토콜(iterable protocol)은 `@@iterator` 메서드를 호출하면 이터레이터를 반환하는 규약이다. 이터러블 프로토콜을 준수한 객체를 이터러블(`Iterable`)이라고 한다. 이터러블은 `for...of` 문으로 순회 가능하며 스프레드 문법과 디스트럭처링 문법을 사용할 수 있다.
2. 이터레이터 프로토콜(iterator protocol)은 `next` 메서드를 호출하면 이터레이터 리절트(`IteratorResult`)를 반환하는 규약이다. 이터레이터 프로토콜을 준수한 객체를 이터레이터(`Iterator`)라고 한다. 이터레이터는 이터러블의 요소를 탐색하기 위한 포인터 역할을 한다.

## 이터러블

이터러블은 이터레이터를 반환하도록 `Symbol.iterator` 메서드를 정의하거나 또는 상속받은 객체이다.

- 이터러블은 `for...of`문으로 순회 가능하며 스프레드 문법과 디스트럭처링 문법을 사용할 수 있다. 
  ```javascript
  const arr = [1, 2, 3];
  
  // 이터러블은 for...of로 순회가능하다.
  for (const element of arr) {
    console.log(element);
  }
  
  // 이터러블은 스프레드 문법을 사용할 수 있다.
  const cp = [...arr];
  
  // 이터러블은 디스트럭처링 문법을 사용할 수 있다.
  const [a, ...rest] = arr;
  console.log(a, rest);	// 1 [2, 3]
  ```

- 이터러블이 아닌 객체는 `for...of` 문으로 순회할 수 없다. 한편, 스프레드 문법과 디스트럭처링 문법을 사용할 수 있다. (??)
  ```javascript
  const obj = { a:1, b: 2 };
  
  for (const val of obj) {
    console.log(val);
  }	// Uncaught TypeError: obj is not iterable
  
  const cp = { ...obj };
  const {a, ...rest } = obj;
  console.log(a, rest); // 1 {b, 2}

### 빌트인 이터러블

자바스크립트에서 제공하는 빌트인 이터러블은 생성자의 프로토타입에 `Symbol.iterator` 메서드가 구현되어있다. `String`, `Array`, `TypedArray`, `Map`, `Set`이 여기에 속하며, `arguments` 객체와 DOM 컬렉션인 `NodeList`, `HTMLCollection`의 프로토타입 객체도 해당 메서드를 구현하였다.

## 이터레이터

이터레이터는 이터레이터 리절트를 반환하는 `next` 메서드를 가지는 객체이다. 즉, 이터러블의 `Symbol.iterator`를 호출하면 이터레이터가 반환되며, 이터레이터의 `next` 메서드를 호출하면 이터레이터 리절트를 반환한다. 이터레이터 리절트는 현재 순회 중인 이터러블의 값을 나타내는 `value`와 이터러블의 순회 완료를 나타내는 `done`이라는 프로퍼티를 가진다.

```javascript
const arr = [1, 2, 3];
const iterator = arr[Symbol.iterator]();
console.log(iterator.next());	// {value: 1, done: false}
console.log(iterator.next());	// {value: 2, done: false}
console.log(iterator.next());	// {value: 3, done: false}
console.log(iterator.next());	// {value: undefined, done: true}
```

### for...of문

```javascript
for (변수선언문 of 이터러블) {}
```

`for...of`문은 내부적으로 `이터러블`의 `Symbol.iterator` 메서드가 반환한 이터레이터를 사용하여 이터러블을 순회한다.

1. 이터레이터의 `next` 메서드를 호출하여 이터레이터 리절트의 `value` 프로퍼티를 `변수선언문`의 변수에 할당한다.
2. 이터레이터 리절트의 `done` 프로퍼티가 `true`이면, 이터러블 순회를 계속한다(1번부터 다시). `false`이면 이터러블 순회를 종료한다.

이와 달리 `for...in`문은 프로토타입 체인에서 프로퍼티 어트리뷰트가 `[[Enumerable]]`이 `true`인 프로퍼티를 순회하여 열거하는 것이다.

## 이터러블과 유사 배열 객체

- **유사 배열(array-like) 객체**는 마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고 `length` 프로퍼티를 갖는 객체이다. 그러나 `Symbol.iterator`를 구현하지 않았다면 이터러블이 아니다.
- `arguments`, `NodeList`, `HTMLCollection`은 유사 배열 객체이나 ES6 이터러블 도입 이후 `Symbol.iterator`를 구현하여 이터러블이다.
- ES6 `Array.from`을 사용하여 유사 배열 객체 또는 이터러블을 배열로 변환할 수 있다.

```javascript
const arrayLike = {0:1, 1:2, 2:3, length: 3};
const arr = Array.from(arrayLike);
console.log(arr);	// [1, 2, 3]
```

## 사용자 정의 이터러블

예시로 피보나치 수열을 사용해보자.

1. 이터러블 생성 함수 만들기
   ```javascript
   const fibonacciFn = function (max) {
     let [pre, cur] = [0, 1];
     
     return {
       [Symbol.iterator]() {
         return {
           next() {
             [pre, cur] = [cur, pre + cur];
             
             return { value: cur, done: cur >= max };
         	},
         };
       },
     };
   };
   
   const iterator = fibonacciFn(10);
   const iterable = iterable[Symbol.iterator]();
   for (const num of iterator) {
     console.log(num);
   }
   ```

2. 이터러블이면서 이터레이터 생성 함수 만들기
   ```javascript
   const fibonacciFn = function (max) {
     let [pre, cur] = [0, 1];
     
     return {
       [Symbol.iterator]() { return this; },
       next() {
         [pre, cur] = [cur, pre + cur];
         return { value: cur, done: cur >= max };
       },
     };
   };
   
   const iter = fibonacciFn(10);
   for (const num of iter) {
     console.log(num);
   }
   ```

3. 무한 이터러블 생성 함수 만들기
   ```javascript
   const fibonacciFn = function () {
     let [pre, cur] = [0, 1];
     
     return {
       [Symbol.iterator]() { return this; },
       next() {
         [pre, cur] = [cur, pre + cur];
         return { value: cur };
       },
     };
   };
   
   const max = 10;
   for (const num of iter) {
     if (num >= max) break;
     console.log(num);
   }
   
   const [f1, f2, f3] = fibonacciFn();
   console.log(f1, f2, f3);	// 1 2 3
   ```

   이 경우 무한 이터러블이 지연 평가(lazy evaluation; 데이터가 필요한 시점에 데이터를 생성하는 기법)를 사용하여, `next` 메서드가 호출되면 그제야 다음 순서의 피보나치 수열의 요소를 생성하여 반환한다.



## 참고

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
- 모던 자바스크립트 Deep Dive 34장 이터러블
- https://tc39.es/ecma262/2023/#sec-common-iteration-interfaces