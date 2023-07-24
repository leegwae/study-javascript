# async and await

ES8 `async`와 `await` 키워드는 프로미스를 기반으로 한다. 프로미스 체이닝 없이도 동기 코드처럼 작성할 수 있도록 해준다.

## `async` 함수

```javascript
async function 함수이름 {}
```

`async` 키워드를 함수 선언문이나 함수 표현식, 화살표 함수 앞에 붙이면 함수가 항상 프로미스를 반환하도록 할 수 있다. 함수가 명시적으로 프로미스를 반환하면 그대로 반환하지만, 함수가 프로미스가 아닌 값을 반환하면 해당 값을 `resolve`한 프로미스를, 값을 던지면 해당 값을 `reject`한 프로미스를 반환한다.

```javascript
async function foo() { return 1; }
console.log(foo());	// Promise { <fulfilled>: 1 }

async function bar() { throw 1 }
console.log(bar());	// Promise { <rejected>: 1 }
```

*예외적으로 클래스의 `constructor`에는 `async`를 붙일 수 없다. `constructor`는 인스턴스를 반환해야하나 `async` 함수는 언제나 프로미스를 반환해야하기 때문이다.

## `await` 키워드

```javascript
await 프로미스;
```

- `await` 키워드를 프로미스와 함께 사용하면, 해당 프로미스가 비동기 처리를 완료할 때까지 기다린다. 프로미스가 아닌 값을 사용하면 해당 값을 `resolve`한 프로미스로 변환한다(`throw`문을 사용할 수는 없다). 
- `await` 키워드는 반드시 `async` 함수 내부에서만 사용할 수 있으며, ES2020부터는 top-level `await`(모듈의 최상위 스코프에서 `await` 사용 가능)도 가능하다.
- `await`는 프로미스가 setteld 상태가 될 때까지 함수나 전역 코드의 실행을 일시 정지한다. 프로미스가 `resolve`되면 정지한 부분부터 다시 실행하며 `await`문의 반환값은 `resolve`된 값이다. 프로미스가 `reject`되면 `await`문은 `reject`된 값을 `throw`한다.

```javascript
// index.mjs

console.log(await 1);	// 1
console.log(await Promise.reject(1));	// Uncaught 1
```

이 차이 때문에 `async` 함수를 정의할 때 명시적으로 프로미스를 반환하지 않는 경우, 본문에서 프로미스를 `resolve`만 한다면 결과 값이 `undefined`인 `fulfilled` 상태의 프로미스가 반환된다. 프로미스를 `reject`만 한다면 결과 값이 `reject`된 값인 `rejected` 상태의 프로미스가 반환된다.

```javascript
async function foo() { await Promise.resolve(1); }
console.log(await foo());	// undefined

async function bar() { await Promise.reject(1); }
try {
    await bar();
} catch (v) {
    console.log(v);	// 1
}
```



## 에러 핸들링

- `catch` 메서드를 사용하여 프로미스 체이닝으로 처리할 수 있다.

```javascript
async function foo() {
    await Promise.reject(1);
}

foo().catch(v => console.log(v));	// 1
```

- `async` 내부에서 `try...catch` 블록을 사용하여 동기 코드처럼 처리할 수 있다.

```javascript
async function foo() {
    try {
        await Promise.reject(1);
    } catch (v) {
        console.log(v);	// 1
    } 
}

foo();
```

## `await`, `return`, `return await`의 비교

```javascript
async function wait() {
    await new Promise(r => setTimeout(r, 1000));
    const coin = Boolean(Math.round(Math.random()));
    
    if (coin) return '성공!';
    throw Error('실패!');
}
```

함수 `wait`는 1초 후에 동전을 던지고 앞면이면 `'성공'`을 `resolve`한 프로미스를, 뒷면이면 `Error('실패')`를 `reject`한 프로미스를 반환한다. 

`wait`를 어떻게 호출하느냐에 따라 `wait`를 호출하는 `foo`의 반환값이 달라질 수 있다.

### 그냥 호출하기

```javascript
async function foo() {
    try {
        wait();
    } catch (e) {
        return 'caught';
    }
}
```

`foo`는 항상 1초를 기다리지 않고 `undefined`를 값으로 가진 `fulfilled` 상태의 프로미스를 반환한다. 왜냐하면 비동기 함수 `wait`를 호출할 때 `await`를 사용하지 않아 해당 함수가 비동기 처리를 완료할 때까지 기다리지 않기 때문이다. 아마 1초 후에 `wait`는 비동기 처리를 완료하고 값을 반환하지만, `wait`의 호출자(`foo`의 문맥)로 반환되지 않기 때문에 성공한 경우 값은 볼 수 없고 실패한 경우 오류는 발생할 것이다.

### `await`

```javascript
async function foo() {
    try {
        await wait();
    } catch (e) {
        return 'caught';
    }
}
```

`foo`가 반환한 `pending` 상태의 프로미스는 1초 후 `undefined`를 값으로 가진 `fulfilled` 상태의 프로미스나 `'caught'`를 값으로 가진 `fulfilled` 상태의 프로미스로 이행한다.

1. 비동기 함수 `wait`를 `await`와 함께 호출하여 함수가 비동기 처리를 완료하는 것을 기다린다.
2. `wait`가 `'성공'`을 값으로 가진 `fulfilled` 상태의 프로미스를 반환한다면, `await`문은 `'성공'`으로 평가된다. 오류는 발생하지 않았으므로 `try...catch`문을 벗어나고 반환문이 없으니 암묵적으로 `undefined`를 반환한다. 이때 `foo`는 `async`이므로 `'undefined'`을 resolve한 프로미스를 반환한다.
3. `wait`가 `'실패'`을 값으로 가진 `rejected` 상태의 프로미스를 반환한다면, `await`문은 `'실패'`를 `throw`한다. 던진 값은 `catch`절에서 포착하고 `return 'caught'`문이 실행된다. 이때 `foo`는 `async`이므로 `'caught'`을 resolve한 프로미스를 반환한다.

### `return`

```javascript
async function foo() {
    try {
        return wait();
    } catch (e) {
        return 'caught';
    }
}
```

`foo`가 반환한 `pending` 상태의 프로미스는 1초를 기다리고 `'성공'`을 값으로 가진 `fulfilled` 상태의 프로미스나 `'실패'`를 값으로 가진 `rejected` 상태의 프로미스로 이행한다. `foo`가 호출되고 바로 `wait`의 호출식이 반환되어 마치 `foo()`는 `wait()`와 같아지기 때문이다.

### `return await`

```javascript
async function foo() {
    try {
        return await wait();
    } catch (e) {
        return 'caught';
    }
}
```

`foo`가 반환한 `pending` 상태의 프로미스는 1초를 기다리고 `'성공'`을 값으로 가진 `fulfilled` 상태의 프로미스나 `'caught'`를 값으로 가진 `fulfilled` 상태의 프로미스로 이행한다.

1. 비동기 함수 `wait`를 `await`와 함께 호출하여 함수가 비동기 처리를 완료하는 것을 기다린다.
2. `wait`가 `'성공'`을 값으로 가진 `fulfilled` 상태의 프로미스를 반환한다면, `await`문은 `'성공'`으로 평가된다. `return '성공'`문이 실행되는데, 이때 `foo`는 `async`이므로 `'성공'`을 resolve한 프로미스를 반환한다.
3. `wait`가 `'실패'`을 값으로 가진 `rejected` 상태의 프로미스를 반환한다면, `await`문은 `'실패'`를 `throw`한다. 던진 값은 `catch`절에서 포착하고 `return 'caught'`문이 실행된다. 이때 `foo`는 `async`이므로 `'caught'`을 resolve한 프로미스를 반환한다.

헷갈린다면 다음 코드를 봐도 좋겠다.

```javascript
async function foo() {
    try {
        const val = await wait();
        return val;
    } catch (e) {
        return 'caught';
    }
}
```



## 참고

- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/await
- https://jakearchibald.com/2017/await-vs-return-vs-return-await/
- https://ko.javascript.info/async-await
- 모던 자바스크립트 Deep Dive 46.6 async/await

