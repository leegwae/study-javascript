# Promise

```javascript
new Promise(executor);
```

프로미스는 비동기(혹은 지연된) 처리의 상태와 결과 값을 나타낸다. `Promise` 생성자는 비동기 로직을 구현한 함수 `executor`를 인수로 전달받는데, `executor`는 `resolve`과 `reject` 함수를 인수로 전달받는다. `executor`를 전달하지 않으면 오류가 발생한다.

```javascript
new Promise();
// 💥 Uncaught TypeError: Promise resolver undefined is not a function
```

## exeuctor

사용자는 프로미스의 인자 `executor`를 직접 정의하여 비동기 로직을 구현할 수 있다.

```javascript
(resolve, reject) => {}
```

- 비동기 처리가 성공한 경우 받고 싶은 값 `successValue`을 인자로 넘겨 `resolve`를 호출한다. 생성된 객체의 `[[PromiseState]]`는 `fulfilled`가 되고 `[[PromiseResult]]`는 `successValue`가 된다.
- 비동기 처리가 실패한 경우 받고 싶은 값 `errorValue`를 인자로 넘겨 `reject`를 호출한다. 생성된 객체의 `[[PromiseState]]`는 `rejected`가 되고 `[[PromiseResult]]`는 `errorValue`가 된다.

```javascript
const get = url => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    
    xhr.onload = () => {
        if (xhr.status === 202) resolve(JSON.parse(xhr.response));
        else reject(new Error(xhr.status));
    }
});
```

## 프로미스의 상태 `[[PromiseState]]`

프로미스 객체는 일반 객체에 대해 추가적으로 `[[PromiseState]]` 내부 슬롯을 가진다. `[[PromiseState]]`는 프로미스 객체의 상태를 값으로 가진다.

프로미스 객체의 상태는 비동기 처리의 상태를 의미한다. 다음 세 가지 상태는 상호배타적으로 일단 상태를 옮기면 더이상 변하지 않는다.

- `pending`: 기본값으로 비동기 처리가 아직 수행되지 않은 상태를 나타낸다. `settled` 상태로 변화할 수 있다. 이때 `[[PromiseResult]]`는 의미가 없다.
- settled: 비동기 처리가 수행이 완료된 상태를 나타낸다. `fulfilled` 또는 `rejected` 상태이다.
  - `fulfilled`: 비동기 처리가 성공으로 완료되었음을 나타낸다. `resolve` 함수를 호출하여 `pending`에서 변화한다.
  - `rejected`: 비동기 처리가 실패로 완료되었음을 나타낸다. `reject` 함수를 호출하여 `pending`에서 변화한다.

## 프로미스의 결과 값 `[[PromiseResult]]`

프로미스 객체는 일반 객체에 대해 추가적으로 `[[PromiseResult]]` 내부 슬롯을 가진다. `[[PromiseResult]]`는 사용자가 정의한 비동기 처리의 결과 값(`executor` 내부에서 `resolve` 혹은 `reject`를 호출했을 때 넘긴 인자)을 값으로 가진다. `[[PromiseState]]`가 `pending`이 아닐 때만 의미가 있다.

기본적으로 자바스크립트 값이면 모두 가능하지만 `reject`를 호출하는 경우 `Error` 객체를 생성하여 전달할 것을 권고한다. 상태가 `rejected`인 프로미스 객체는 해당 값을 throw하고 실행을 중단시키기 때문이다.

```javascript
new Promise((_, reject) => reject(1));	// 💥 Uncaught (in promise) 1
```

## 프로미스의 프로토타입 메서드

우리가 원하는 값은 비동기 처리가 완료되었을 때 프로미스가 가진 결과 값이다. 프로미스 는 프로미스가 가진 결과 값을 처리할 수 있는 콜백을 인자로 전달받는 프로토타입 메서드를 제공한다. 각 프로토타입 메서드는 프로미스 객체를 반환하므로, 프로미스 체이닝(promise chaining)을 사용할 수 있다.

### `Promise.prototype.then`

```javascript
new Promise(executor).then(onFulfilled, onRejected);
```

- `ouFulfilled`: 프로미스가 `fulfilled` 상태이면 호출할 함수이다. 인자로 프로미스의 결과 값이 전달된다. 함수가 아니라 값을 전달하면 항등 함수(`(x) => x`)로 변환된다.
- `onRejected`: 프로미스가 `rejected` 상태이면 호출할 함수를 전달한다. 인자로 프로미스의 결과 값이 전달된다. 함수가 아니라 값을 전달하면 thrower 함수(`(x) => { throw x; }`)로 변환된다.
- 반환값: 실행된 콜백 함수가 반환하는 프로미스 객체이다. 프로미스가 아니면 해당 값을 `resolve`한 프로미스를 반환하는데, 값을 throw하면 해당 값을 `reject`한 프로미스를 반환한다.

```javascript
new Promise(resolve => resolve(1)).then(value => console.log(value));	// 1
new Promise((_, reject) => reject(1)).then(undefined, (reason) => console.log(reason));	// 1
```

### `Promise.prototype.catch`

```javascript
new Promise(executor).catch(onRejected);
```

`then(null, onRejected)`와 같다. 단, `then(onFulfilled, onRejected)`를 사용하면 `onRejected`는 `onFulfilled`를 처리할 수 없으므로 `catch`를 따로 두는 것이 좋다.

```javascript
new Promise(executor).then(onFulfilled).catch(onRejected);
```

### `Promise.prototype.finally`

```javascript
new Promise(executor).finally(onFinally)
```

- `onFinally`: 프로미스의 성공이나 실패 상태에 상관없이 한 번 호출된다. 인자로 프로미스의 결과 값이 전달된다. `then`, `catch` 메서드에서 공통적인 로직이 있을 때 유용한다.
- 반환값: 실행된 콜백 함수가 반환하는 프로미스 객체이다. 프로미스가 아니면 해당 값을 `resolve`한 프로미스를 반환하는데, 값을 throw하면 해당 값을 `reject`한 프로미스를 반환한다.

## 프로미스의 정적 메서드

### `Promise.resolve`

```javascript
Promise.resolve(value);
```

인자로 전달받은 값을 `resolve`하는 프로미스 객체를 반환한다.

```javascript
new Promise(resolve => resolve(1));
Promise.resolve(1);
```

위 두 예제는 동일하게 동작한다.

### `Promise.reject`

```javascript
Promise.reject(reason);
```

인자로 전달받은 값을 `reject`하는 프로미스 객체를 반환한다.

```javascript
new Promise((_, reject) => reject(1)).catch(v => console.log(v));	// 1
Promise.resolve(1).catch(v => console.log(v));	// 1
```

위 두 예제는 동일하게 동작한다.

### `Promise.all`

```javascript
Promise.all(iterable);
```

- 이터러블을 인자로 받는다. 이때 프로미스가 아닌 요소는 `Promise.resolve`로 프로미스로 래핑한다. 인자가 빈 배열이면 동기적으로 실행되지만 그렇지 않으면 비동기적으로 실행된다.
- 프로미스를 반환한다.
  - 인자로 전달된 모든 프로미스를 병렬로 실행하고 모든 프로미스가 `fulfilled` 상태가 되면 `resolve`된 처리 결과를 배열로 가진 프로미스를 반환한다.
  - 프로미스 중 하나라도 `rejected` 상태가 되면 나머지가 `fulfilled` 상태가 되는 것을 기다리지 않고 해당 `reject`된 처리 결과를 가진 프로미스를 반환한다.

### `Promise.race`

```javascript
Promise.race(iterable)
```

- 이터러블을 인자로 받는다. 이때 프로미스가 아닌 요소는 `Promise.resolve`로 프로미스로 래핑한다.
- 가장 먼저 settled(`fulfilled`나 `rejected`) 상태가 된 프로미스를 반환한다. 단, 인자가 빈 배열이면 `pending` 상태의 프로미스를 반환한다.

### `Promise.allSetteld`

```javascript
Promise.allSetteld(iterable);
```

- 이터러블을 인자로 갖는다.
- 모든 프로미스가 settled(`fulfilled`나 `rejected`) 상태가 되면 해당 상태와 결과 값을 요소로한 배열을 가진 프로미스를 반환한다.

```javascript
Promise
    .allSettled([Promise.resolve(1), Promise.reject(2)])
    .then(console.log);
/*
[
	{status: 'fulfilled', value: 1},
	{status: 'rejected', reason: 2}
]
*/
```

## 프로미스와 에러 핸들링

executor 내부에서 오류가 발생하거나 `throw`로 값을 던지면 해당 값을 `reject`한다. executor 주위에 암시적으로 `try...catch`문이 있어 에러를 잡고 `reject`처럼 다루는 것이다.

```javascript
new Promise(() => {
    throw new Error('에러 발생!');
}).catch(e => console.log(e));	// Error: 에러 발생!

new Promise(() => {
    throw 1;
}).catch(reason => console.log(reason));	// 1
```

프로미스의 프로토타입 메서드 `then`, `catch`, `finally`는 인자로 받은 콜백이 반환하는 프로미스를 반환하거나 값을 반환한 경우 해당 값을 `resolve` 혹은 `reject`한 프로미스를 반환하므로, 에러를 다시 던져 다른 핸들러에서 처리하도록 할 수 있다.

```javascript
new Promise((_, reject) => {
    reject('에러 발생!');
}).catch(reason => {
    if (error instanceof AuthError) handleAuthError();
    else throw reason;
}).catch(reason => {
    if (error instanceof NotFoundError) handleNotFoundError();
    else throw reason;
}).catch(reason => handleError());
```

## `async`와 `await`

ES8에 도입된 키워드 `async`와 `await`를 사용하면 동키 코드처럼 프로미스를 사용할 수 있다.

```javascript
async function get(url) {
    const res = await fetch(url);
    const data = await res.json();
    
    return res;
}
```

`async`/`await`에 대해서는 [async와 await](https://github.com/leegwae/study-javascript/blob/main/async%20and%20await.md)를 참고한다.



##  참고

- https://262.ecma-international.org/14.0/#sec-promise-objects
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise
- https://ko.javascript.info/promise-basics
- 모던 자바스크립트 Deep Dive 45장 프로미스

