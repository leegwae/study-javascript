# Generator

ES6 **제너레이터 함수(Generator Function)**는 코드 블록의 실행을 멈추었다가 재개할 수 있는 함수이다. 제너레이터 함수는 일반 함수와 비교하여 다음과 같은 차이점을 가진다.

1. 일반 함수는 함수의 제어권을 함수가 독점하나, 제너레이터 함수는 함수의 제어권을 함수 호출자에게 양도(yield)할 수 있다.
2. 일반 함수는 실행되고 있는 동안 함수 외부와 상태를 주고받을 수 없으나, 제너레이터 함수는 실행되고 있는 동안 함수 외부와 상태를 주고받을 수 있다.
3. 일반 함수를 호출하면 함수 코드를 실행하고 값을 반환하나, 제너레이터 함수를 호출하면 함수 코드를 실행하지 않고 제너레이터 객체를 반환한다.

## 제너레이터 함수

제너레이터 함수는 `function*` 키워드로 선언한다.

```javascript
function* foo() { yield 1; }	// 제너레이터 함수 선언문
const bar = function* () { yield 1; };	// 제너레이터 함수 표현식
const obj = { * baz(){ yield 1; } };	// 제너레이터 메서드
class MyClass { * qux(){ yield 1; } }	// 제너레이터 클래스 메서드

const quux = * () => { yield 1; };	// Uncaught SyntaxError: Unexpected token '*', 제너레이터 함수는 화살표 함수로 선언할 수 없다.
new foo();	// Uncaught TypeError: foo is not a constructor, 제너레이터 함수는 생성자가 아니다.
```

## 제너레이터

제너레이터(generator)는 이터러블이면서 이터레이터이다.

```javascript
function* foo() { yield 1; }
const generator = foo();
console.log(Symbol.iterator in generator);	// true
console.log('next' in generator);	// true
```

### 제너레이터의 프로토타입 메서드

제너레이터는 `next`, `return`, `throw` 메서드를 가진다. 다음 제너레이터 함수로 생성한 제너레이터에서 프로토타입 메서드를 호출했을 때를 살펴보자.

```javascript
function* foo() {
  console.log('1까지 실행');
  yield 1;
  console.log('2까지 실행');
  yield 2;
  console.log('3까지 실행');
  yield 3;
}
```



#### `Generator.prototype.next`

```javascript
const generator = foo();

// 1까지 실행
console.log(generator.next());	// { value:1, done: false }

// 2까지 실행
console.log(generator.next()); // {value: 2, done: false}

// 3까지 실행
console.log(generator.next()); // {value: 3, done: false}

console.log(generator.next()); // {value: undefined, done: true}
```

`Generator.prototype.next`를 호출하면 제너레이터 함수 내부의 `yield` 표현식까지 코드를 실행한다. 그리고 `value`가 `yield`된 값이고 `done`이 `false`인 이터레이터 리절트를 호출자에게 반환한다. 제너레이터 함수가 끝까지 실행된 이후로는 `value`가 `undefined`이고 `done`이 `true`인 이터레이터 리절트를 호출자에게 반환한다.



한편, `Generator.prototype.next`에 전달한 인자는 첫번째 호출인 경우 무시되고, 그 이후의 호출에서는 **이전 `yield` 표현식의 평가 값**이 된다.

```javascript
function* bar() {
  const x = yield 1;
  const y = yield (x + 2);
  yield x + y;
}

const generator = bar();
console.log(generator.next(5));	// {value: 1, done: false}
console.log(generator.next(10));	// {value: 12, done: false}
console.log(generator.next(20));	// {value: 30, done: false}
console.log(generator.next(40));	// {value: undefined, done: true}
```

1. 첫번째 `next`에 전달한 인자는 무시된다. 반환된 이터레이터 리절트의 `value`는 `yield`된 값으로 즉 `1`이다.
2. 두번째 `next`에 전달한 인자는 첫번째 `yield` 표현식의 평가 값이 된다. 즉, `yield 1`은 `10`으로 평가되어 `x`에 `10`이 할당되었다. 반환된 이터레이터 리절트의 `value`는 `yield`된 값으로 즉 `10+2=12`이다.
3. 세번째 `next`에 전달한 인자는 두번째 `yield` 표현식의 평가 값이 된다. 즉, `yield (x + 2)`은 `20`으로 평가되어 `y`에 `20`이 할당되었다. 반환된 이터레이터 리절트의 `value`는 `yield`된 값으로 `10+20=30`이다.
4. 네번째 `next`에 전달한 인자는 세번째 `yield` 표현식의 평가 값이 된다. 즉, `yield x + y`는 `40`으로 평가되었다. 제너레이터 함수 내부의 모든 코드가 실행되어, 반한된 이터레이터 리절트의 `value`는 `undefined`이고 `done`은 `true`이다.

즉, 호출자는 `next`를 사용하여 제너레이터 내부로 데이터를 전달하고, 제너레이터는 `yield`를 사용하여 호출자에게 데이터를 전달한다.



제너레이터 함수의 `return`문은 `yield` 표현식처럼 `return`된 값이 `value`인 이터레이터 리절트를 반환하지만, 이때 `done`은 `true`이다.

```javascript
function* foo() {
  yield 1;
}

function* bar() {
  return 1;
}

const f = foo();
console.log(f.next());	// {value: 1, done: false}
console.log(f.next());	// {value: undefined, done: true}

const b = bar();
console.log(b.next());	// {value: 1, done: true}
console.log(b.next());	// {value: undefined, done: true}
```



#### `Generator.prototype.return`

```javascript
const generator = foo();

// 1까지 실행
console.log(generator.next());	// { value:1, done: false }
console.log(generator.return('End'));	// { value: 'End', done: true }
console.log(generator.next());	// {value: undefined, done: true}
```

`Generator.prototype.return`을 호출하면 `value`가 메서드에 전달한 인자이고 `done`이 `true`인 이터레이터 리절트를 호출자에게 반환한다. 이후 `Generator.prototype.next`를 호출하면 `value`가 `undefined`이고 `done`이 `true`인 이터레이터 리절트를 호출자에게 반환한다.

#### `Generator.prototype.throw`

```javascript
function* foo() {
  try {
    console.log('1까지 실행');
    yield 1;
    console.log('2까지 실행');
    yield 2;
  } catch (e) { console.log(e) }
}

const generator = foo();

// 1까지 실행
console.log(generator.next());	// { value:1, done: false }
// throw 실행!
console.log(generator.throw('throw 실행!'));	// {value: undefined, done: true }
```

`Generator.prototype.throw`를 호출하면 메서드에 전달한 인자를 throw한 후, `value`가 해당 인자이며 `done`이 `true`인 이터레이터 리절트를 호출자에게 반환한다.



## 제너레이터 활용하기

### 무한 이터러블 구현하기

제너레이터를 사용하여 피보나치 수열을 생성하는 함수를 구현해보자.

```javascript
function* fibonacciFn() {
  let [pre, cur] = [0, 1];
  
  while (true) {
    [pre, cur] = [cur, cur + pre];
    yield cur;
  }
}

const fiboGenerator = fibonacciFn();
console.log(fiboGenerator.next().value);	// 1
console.log(fiboGenerator.next().value);	// 2
console.log(fiboGenerator.next().value);	// 3
console.log(fiboGenerator.next().value);	// 5
console.log(fiboGenerator.next().value);	// 8
```



## 참고

- 모던 자바스크립트 Deep Dive 46장 제너레이터와 async/await