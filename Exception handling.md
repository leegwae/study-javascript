# Exception handling

자바스크립트에서는 **예외(exception; 런타임 에러runtime error)**가 발생하면 현재 함수의 실행이 중지되고 예외는 호출자(caller; 함수를 호출한 함수 또는 전역) 방향으로 전파된다. 즉, 예외는 콜 스택의 아래 방향으로 전파된다. 이때 첫번째로 만나는 `try`문의 `catch` 블록(`catch` 블록이 평가될 때마다 환경 레코드가 생성된다)으로 전달되며 `catch` 블록을 만나지 못한다면 프로그램이 종료된다. `try...catch`문을 사용하여 오류를 처리하는 방법을 알아본다.

## throw문

`throw`문을 사용하면 사용자 정의 예외를 발생(throw) 시킬 수 있다.

```javascript
throw 표현식;
```

기본적으로 모든 자바스크립트 표현식을 던질 수 있으나, 일반적으로 에러 객체를 던진다.

## try...catch

```javascript
try {
    // 실행되는 코드(예외가 발생할 가능성이 있는 코드)
} catch (예외값) {
    // 예외 발생 시 처리하는 코드
} finally {
    // 예외 발생과 관계없이 한 번 실행되는 코드
}
```

- `try` 블록은 실행할 코드이다. 예외가 발생하는 즉시 제어를 그 다음 `catch` 블록으로 옮긴다.
- `catch` 블록은 `try`문이나 앞선 `catch` 블록에서 예외가 발생하면 예외값을 받아와 처리하는 코드이다. 예외값이 필요없다면 받아오는 부분을 생략할 수 있다. 0개 이상 작성할 수 있다. 
- `finally` 블록은 예외 발생에 관계없이 한 번 실행되는 코드이다. 생략 가능하다.

```javascript
try {
    throw new Error('에러 발생');
} catch (err) {
    console.log(err);
} finally {
    console.log('코드 끝');
}
```

### `catch` 블록은 동기적으로 예외를 잡아낸다

```javascript
try {
    setTimeout(() => {
        throw new Error('에러 발생');
    });
} catch (err) {
    console.log(err.message);
}

// Uncaught Error: 에러 발생
```

비동기 함수에서 발생한 예외는 `catch`문에서 처리되지 않는다. 비동기 함수는 콜백 큐에 푸시된 후 콜 스택이 비고 나서야 콜 스택에 푸쉬된다. 이때 콜 스택에는 `catch` 블록이 남아있지 않으므로 해당 비동기 함수에서 발생한 에러는 처리되지 않는다.

### `finally` 블록은 `try...catch` 절을 빠져나가도 실행된다

```javascript
function foo() {
    try {
        return 1;
    } finally {
        console.log('foo 함수 끝');
    }
}

console.log(foo());
// foo 함수 끝
// 1
```

`try...catch` 절을 빠져나가는 어떤 경우에도 `finally` 블록은 실행된다. 이는 `return`문으로 명시적으로 빠져나가는 경우도 포함한다. 위 예시의 경우 `foo`에서 전역으로 반환하기 전 `finally`를 실행한다.

## 런타임 제공 에러 핸들링

자바스크립트 런타임은 자체적으로 에러 핸들링을 제공한다. 브라우저의 경우 `window.onerror`로 전역으로 오류를 처리할 수 있다.

```javascript
window.onerror = function (message, url, line, col, error) {
}
```

- `message`: 에러 메시지
- `url`: 에러가 발생한 스크립트의 URL
- `line`: 줄 번호
- `col`: 열 번호
- `error`: 에러 객체



## TODO

```javascript
throw new Error('에러 발생');
console.log('끝!');
```

프로그램 종료로 끝 출력 안 됨

```javascript
setTimeout(() => {
    throw new Error('에러 발생');
});
setTimeout(() => {
    console.log('끝!');
});
```

끝 출력 됨??



## 참고

- 모던 자바스크립트 Deep Dive 47장 에러 처리
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
- https://ko.javascript.info/try-catch