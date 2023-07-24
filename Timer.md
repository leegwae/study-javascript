# Timer

**호출 스케줄링(scheduling a call)**은 일정 시간이 지난 후 함수가 호출되도록 실행을 예약하는 것이다. 호출 스케줄링은 호스트 객체로서 제공되는 타이머 함수에 원하는 함수와 시간을 전달하여 가능하다. 타이머 함수는 비동기 처리 방식으로 동작하여, 콜백 함수는 태스크 큐에 적재된 후 콜 스택이 비면 콜 스택으로 push된다. 타이머 함수는 ECMAScript 명세에 정의되어 있지 않으므로 호스트 환경마다 차이가 있을 수 있다. 이 글은 [HTML 5](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#microtask-queuing) 명세의 타이머 함수를 기준으로 한다.

## `setTimeout`/`clearTimeout`

```javascript
const timerId = setTimeout(func, delay, param1, param2, ...);
```

`setTimeout`은 `delay`만큼 타이머를 설정하고, 타이머 만료 이후 `func`을 단 한 번 실행한다.

- `func`: 타이머 만료 이후 호출될 콜백 함수. 문자열일 수 있다.
- `delay`: 타이머 만료 시간이다. 단위는 `ms`이고 기본값은 `0`이다. 4ms 이하라면 최소 지연 시간으로 4ms로 지정된다.
- `param1`: `func`에 전달할 인수이다.
- 타이머를 식별할 수 있는 `timerId`를 반환한다. 브라우저의 경우 `number`이며 Node.js의 경우 타이머 객체이다.

```javascript
clearTimeout(timerId);
```

`clearTimeout`은 전달받은 `timerId`의 타이머를 취소한다.

## `setInterval`/`clearInterval`

```javascript
const timerId = setInterval(func, delay, param1, param2, ...);
```

`setInterval`은 `delay`마다 반복하는 타이머를 설정하고, 타이머 만료 이후 `func`을 실행한다.

- `func`: 타이머 만료 이후 호출될 콜백 함수. 문자열일 수 있다.
- `delay`: 타이머 만료 시간이다. 단위는 `ms`이고 기본값은 `0`이다. 4ms 이하라면 최소 지연 시간으로 4ms로 지정된다.
- `param1`: `func`에 전달할 인수이다.
- 타이머를 식별할 수 있는 `timerId`를 반환한다. 브라우저의 경우 `number`이며 Node.js의 경우 타이머 객체이다.

## 중첩 `setTimeout`과 `setInterval`의 차이

```javascript
let i = 1;

setTimeout(function foo() {
    console.log(i);
    i++;
    setTimeout(foo, 100);
}, 100);
```

```javascript
let i = 1;

setInterval(function foo() {
    console.log(i);
    i++;
}, 100);
```

중첩 `setTimeout`은 최소한 `delay`만큼의 지연 간격을 보장하지만 `setInterval`은 이를 보장하지 않는다.

- 중첩 `setTimeout`의 경우, 콜백의 실행 시간이 지연 간격에 포함되지 않는다. 콜백의 실행이 종료된 후부터 100ms를 대기한다.
- `setInterval`의 경우, 콜백의 실행 시간이 지연 간격에 포함된다. 예를 들어 코드 실행에 30ms가 걸렸다면 그 다음 콜백의 실행까지는 70ms가 걸린다. 그래서 콜백의 실행 시간이 지연 간격보다 긴 경우 지연 없이 다음 콜백이 바로 호출된다.

## 반드시 cleanup하기

`setInterval`과 `setTimeout`에 전달한 콜백 함수의 참조는 스케줄러에 저장된다. `setInterval`의 경우 `clearInterval`이 호출되기 전까지 함수에 대한 참조가 메모리에 유지되므로 스케줄링할 필요가 없어지면 반드시 타이머 clear 함수로 cleanup한다.



## 참고

- [MDN Timeouts and intervals](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals)
- [모던 자바스크립트 - 호출 스케줄링](https://ko.javascript.info/settimeout-setinterval)
- 모던 자바스크립트 Deep Dive 41장 타이머

