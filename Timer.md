# Timer

- 아래의 함수들은 일정한 시간이 흐른 뒤 비동기 코드를 실행할 수 있다. 비동기 코드는 메인 스레드에서 실행된다.
  - `setTimeout()`: 일정 시간 후 비동기 코드 한 번 실행
  - `setInterval()`: 일정한 간격으로 비동기 코드 반복 실행
  - `requestAnimationFrame()`: `setInterval()`의 최신 버전
    - 비동기 코드가 실행되는 환경에 관계없이 적절한 프레임 속도로 애니메이션 실행
    - 브라우저가 다음 화면을 보여주기 전에 비동기 코드 실행
- `setTimeout`과 `setInterval`은 자바스크립트 명세서에 명시되어 있지 않다.
  - 호스트 환경마다 스케줄링에 차이가 있을 수 있음.



## setTimeout()

```js
setTimeout(함수, 시간, 함수에 전달할 파라미터)
```

- `함수`는 `시간`이 지나면 콜백된다.
- `시간`은 밀리세컨드 단위이다. (1000ms = 1s)
- 타임아웃을 참조할 때 사용하는 식별자 값을 반환한다.
  - 스케줄링에 관한 명세가 없으므로 호스트에 따라 식별자 값이 달라질 수 있다.
    - 브라우저에서는 HTML5의 timers section을 준수하여 숫자형의 식별자 값을 반환한다.
    - Node에서는 타이머 객체를 반환한다.



```js
setTimeout(함수, 0)
```

- 위 함수는 즉시 실행되지 않을 수 있다. `setTimeout`에 전달된 콜백은 메인 스레드의 스택이 비어있으면 실행될 것이기 때문이다.
- 콜백 함수가 실행되는 시점
  - `setTimeout`에 전달한 시간은 실제 콜백 함수가 실행되는 시점이 아니다. 최소한 지나야하는 시간을 뜻한다.
  - 콜백은 메인 스레드의 스택이 비기 전까지는 실행되지 않는다.



### 예시

```js
let foo = setTimeout(() => {
    alert('HELLO WORLD!');
}, 2000);
```

- named function 사용하기

```js
function hello() {
    console.log('HELLO WORLD!');
}

let foo = setTimeout(hello, 2000);
```

- function statement 사용하기



### 매개변수 전달하기

```js
function hello(who) {
    console.log(`HELLO ${who}`);
}

let foo = setTimeout(hello, 2000, 'WORLD'); 
```



### timeout 취소하기

- timeout을 설정한 후, 콜백이 실행되기 전에 timeout을 취소하고 싶다면 해당 timeout의 식별자를 `clearTimeout(식별자)`에 전달한다.

```js
clearTimeout(foo);
```



## setInterval()

```js
setInterval(함수, 시간);
```

- `함수`는 일정 `시간` 간격으로 계속 실행된다.
- interval을 참조하는 식별자 값을 반환한다.



### 예시

```js
function displayTime() {
    let date = new Date();
    let time = date.toLocaleTimeString();
    console.log(time);
}

const createClock = setInterval(displayTime, 1000);
```

- 1초마다 시간을 업데이트한다.



### interval 취소하기

- interval을 취소하려면 `clearInterval()`에 식별자를 전달한다.

```js
clearInterval(createClock);
```



## 중첩 timeout

- `setTimeout()`으로 100ms마다 함수 호출

```js
let i = 1;

setTimeout(function foo() {
    console.log(i);
    i++;
    setTimeout(foo, 100);
}, 100);
```



- `setInterval()`로 100ms 마다 함수 호출

```js
let i = 1;

setInterval(function foo() {
    console.log(i);
    i++;
}, 100);
```



### 중첩 `setTimeout()`과 `setInterval()`의 차이

- `setTimeout()`은 실행과 실행 사이에 동일한 간격의 지연을 보장한다.
  - 비동기 코드가 실행된 후 다시 실행되기까지 100ms를 대기한다.
  - 이 간격은 코드 실행 시간에 관계없이 동일하다.
- `setInterval()`은 실행과 실행 사이에 동일한 간격의 지연을 보장하지 않는다.
  - 비동기 코드가 실행되는 시간이 다시 실행되기까지의 시간에 포함된다.
    - 예) 코드 실행에 30ms 걸렸다면 실행 후 다시 실행되기까지 간격이 70ms 걸린다.
  - 즉, 간격은 코드 실행 시간에 따라 달라진다.

- 하위 호환성을 위하여 다섯번째 중첩 타이머 이후부터는 대기 시간이 최소 4ms로 강제된다.



## 가비지 컬렉션과 스케줄링

- `setInterval`과 `setTimeout`에 전달된 함수는 내부적으로 참조가 만들어진다.
- 참조 정보는 스케줄러에 저장된다.
- 따라서 해당 함수를 참조하는 것이 없어도 가비지 컬렉션의 대상이 되지 않는다.
- 해당 함수가 외부 렉시컬 환경을 참조한다면, 참조하는 외부 변수 메모리에 남아있게 되므로 이 함수가 차지해야 하는 공간보다 더 많은 메모리 공간이 사용된다.
  - 이러한 문제를 해결하려면, 스케줄링할 필요가 없어진 함수는 반드시 `clear...`로 취소한다.



## 즉시 timeouts

```js
setTimeout(function() {
    alert('HELLO');
}, 0);

alert('WORLD!');
```

- 메인 스레드가 실행된 후 가능한 한 빨리 콜백 함수의 실행을 예약할 수 있다.
  - 즉, 현재 스크립트의 실행이 종료된 직후 원하는 함수를 실행할 수 있다.



## 참고

- [MDN Timeouts and intervals](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals)
- [모던 자바스크립트 - 호출 스케줄링](https://ko.javascript.info/settimeout-setinterval)

