# Introducing Asynchronous JavaScript

## General Concept

### blocking code

- **blocking**
  - 예시) 웹 애플리케이션이 브라우저에서 특정 코드를 실행하느라 브라우저에게 제어권을 돌려주지 않으면 브라우저가 정지된 것처럼 보일 수 있다 => 사용자의 입력을 처리하느라 웹 앱이 프로세서에 대한 제어권을 브라우저에게 반환하지 않는 현상
  - 어떠한 테스크가 완료될 때까지, 다른 테스크를 실행하지 않는 것
- 자바스크립트가 싱글 스레드이기 때문에 블로킹 현상이 발생된다.
- 블로킹 현상을 해결하기 위해 web worker라는 툴을 사용하기도 한다.



### Asynchronous code

- web worker는 DOM에 접근할 수 없다.
- worker에서 실행되는 코드는 블로킹되지 않을 뿐 동기적으로 실행된다.
  - 이전 프로세스의 결과를 받아올 수 없는 경우도 있다.
- 이를 해결하기 위해 `Promise`를 사용한다.
  - 비동기 작업이 진행되는 동안 메인 스레드가 블로킹되지 않는다.



## Synchronous JavaScript

```js
const btn = document.querySelector('button');
btn.addEventListener('click', () => {
  alert('You clicked me!');

  let pElem = document.createElement('p');
  pElem.textContent = 'This is a newly-added paragraph.';
  document.body.appendChild(pElem);
});

```

- 위는 동기식 코드의 예시이다.
  - DOM에 미리 정의된 `<button>` 엘리먼트를 참조한다.
  - `click` 이벤트 리스너를 만들어 버튼이 클릭되었을 때 아래의 기능을 차례로 실행한다.
    - `alert()` 메서드 실행
    - `<p>` 엘리먼트 생성
    - `<p>` 엘리먼트 하위에 텍스트 넣기
    - DOM에 `<p>` 엘리먼트 추가
  - 자바스크립트는 싱글 스레드이므로,
    - 메인 스레드에서 각각의 작업이 처리되는 동안 렌더링은 일시 중지되고
    - 하나의 작업이 완료되어야 다음 작업이 실행된다.



## Asynchronous JavaScript

```js
let response = fetch('이미지.png');
let blob = reponse.blob();
// 가져온 이미지 표시하기
```

- 외부에서 리소스를 가져오는 경우를 생각해보자. 이미지가 다운로드된 후에야 가져온 이미지를 표시할 수 있을 것이다. 그러니 `response`가 반환되기 전까지 기다려야한다. 
- 위와 같은 이유로 많은 웹 API가 비동기 코드를 사용하여 실행된다.
- [비동기란 무엇인가](https://github.com/leegwae/TIL/blob/main/web/Asynchronous.md)
- 자바스크립트에서 비동기 작업은 두 가지 유형으로 처리한다.
  - 콜백
  - 프로미스



## Async callbacks

- **비동기 콜백(async callback)**은 백그라운드에서 코드를 실행할 함수를 호출할 때 인수로 전달되는 함수이다.
- 백그라운드 코드가 실행을 마치면, 콜백 함수를 호출한다.
- 콜백을 사용하는 것은 예전 방식이다.

```js
btn.addEventListener('click', () => {
  alert('You clicked me!');

  let pElem = document.createElement('p');
  pElem.textContent = 'This is a newly-added paragraph.';
  document.body.appendChild(pElem);
});
```

- 위 코드는 비동기 콜백의 예시이다.
  - 첫번째 파라미터는 이벤트 리스너의 타입이다.
  - 두번째 파라미터는 이벤트가 발생할 때 호출되는 콜백 함수이다.
- 콜백 함수를 다른 함수의 인수로 전달할 때, 전달하는 것은 오로지 인수로서의 함수의 참조이다.
  - 콜백 함수는 **즉시 실행되지 않는다.**
  - 콜백 함수를 인자로 전달받은 함수는 때가 되면 콜백 함수를 실행한다.
- 모든 콜백 함수가 비동기인 것은 아니다.



## Promises

- 프로미스는 모던 웹 API에서 사용되는 새로운 스타일의 비동기 코드이다.
  - `fetch()` API가 좋은 예시로, `XMLHttpRequest` 보다 더 현대적이다.

```js
fetch('products.json').then(function(response) {
  return response.json();
}).then(function(json) {
  let products = json;
  initialize(products);
}).catch(function(err) {
  console.log('Fetch problem: ' + err.message);
});
```

- 위 코드는 프로미스의 예시이다.
  - `fetch()`는 매개변수로 리소스의 URL을 전달받는다.
  - `then()` 블럭: 이전 작업이 완료되었을 때 실행되는 콜백 함수.
    - 이전 작업의 결과를 전달받는다.
    - 각각의 콜백은 프로미스를 반환한다.
  - `catch()` 블럭: `then()` 중 하나라도 실패하면 동작한다.
    - `try...catch`는 `async`/`await`에서 동작하나 프로미스와 함께 동작하지 않는다.



### The event queue

- 프로미스와 같은 비동기 연산은 **이벤트 큐(event queue)**에 들어간다.
- 이벤트 큐는 메인 스레드가 프로세싱을 종료한 후 실행되어 후속하는 자바스크립트 코드를 블로킹하지 않는다.
- queued 연산은 가능한 빠르게 완료되어 연산 결과를 자바스크립트 환경에 반환한다.



### 프로미스와 콜백의 비교

```javascript
// 프로미스 체이닝
A()
.then(function(param1) {
    return B(param1);
})
.then(function(param2) {
    return C(param2);
})
.then(function(param3) {
    D(param3);
})
.catch(failureCallback);

// 콜백 지옥
A(function(param1) {
  B(param1, function(param2) {
    C(param2, function(param3) {
      D(param3);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```

- 프로미스는 콜백에 비해 다음과 같은 장점을 가진다.
  - `.then()` 연산을 사용하여 여러 개의 동기 연산을 체이닝할 수 있다.
    - 연산의 결과는 그 다음 `.then()` 연산의 입력이 된다.
    - 콜백은 콜백을 계속 중첩하여 콜백 지옥을 만들 수도 있음.
  - 프로미스 콜백은 이벤트 큐에 배치된 순대로 엄격히 호출된다.
  - 에러 핸들링이 더 좋다.
    - 모든 에러는 단일한 `.catch()` 블록으로 처리된다.
  - 서드 파티 라이브러리로 콜백을 전달할 때 함수를 실행할 수 있다.



## 참고

- [MDN 일반적인 비동기 개념](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Concepts)
- [MDN 비동기 자바스크립트 입문](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing)
- [MDN 프로미스로 프로그래밍하기](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises) 

