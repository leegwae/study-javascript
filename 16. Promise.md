# 16. Promise

## 16.1 프로미스란 무엇인가

- **프로미스(Promise)**는 연산의 중간 상태(intermediate state)를 나타내는 객체이다. 즉, 미래의 어느 지점에서 반환될 어느 종류의 결과를 *약속하는* 것이다.
- 프로미스는 연산이 완료된 후 언제 결과를 반환하는지는 보장하지 않는다.



### 16.1.1 왜 콜백 방식 대신 프로미스를 사용할까?

[Introducing Asynchronous JavaScript](./Introducing Asynchronous JavaScript.md)의 [프로미스와 콜백의 비교] 참고

- 프로미스로 `A` 완료 후 `B`를, `B` 완료 후 `C`를, `C` 완료 후 `D`를 실행하도록 하자. 그리고 각각의 작업에서 오류가 생기면 `failureCallback`으로 에러 핸들링을 해보자.

```js
A()
.then(function(param1){
 return B(param1);   
})
.then(function(param2){
    return C(param2);
})
.then(function(param3){
    D(param3);
})
.catch(failureCallback);
```

- 위 작업을 콜백으로 표현하면 아래와 같다. 이렇게 읽기 힘든 코드를 콜백 지옥이라고 한다.

```js
A(function(param1) {
  B(param1, function(param2) {
    C(param2, function(param3) {
      D(param3);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```

- 프로미스를 사용하면 얻을 수 있는 이점은 아래와 같다.
  - 콜백보다 가독성이 좋다.
  - 하나의 `.catch()` 블럭으로 모든 에러를 핸들할 수 있다.
  - 메인 스레드를 블로킹하지 않는다.
  - 각각의 연산은 이전의 연산이 완료된 후 진행됨을 보장한다.
  - 비동기 작업을 연쇄적으로 처리할 수 있다.
    - 이전의 연산 즉 각각의 `.then()` 블럭은 자신의 작업이 끝나면 그 결과를 새로운 프로미스로 반환한다.



### 16.1.2 프로미스와 화살표 함수

- 화살표 함수 사용하기

```js
A()
.then(param1 =>
      B(param1)
})
.then(param2 =>
      C(param2)
})
.then(param3 =>
      D(param3)
})
.catch(failureCallback);
```

```js
A()
.then(param1 => B(param1)})
.then(param2 => C(param2)})
.then(param3 => D(param3)})
.catch(failureCallback);
```



### 16.1.3 프로미스와 이벤트 리스너의 차이

- 프로미스는 단 한 번 성공하거나 실패한다. 두 번 성공하거나 실패할 수 없다. 작업이 완료되면 성공에서 실패로 혹은 실패에서 성공으로 바뀔 수 없다.
- If a promise has succeeded or failed and you later add a success/failure callback, the correct callback will be called, even though the event took place earlier.



### 16.1.4 프로미스 사용 예시

```js
let promise1 = fetch('유미.jpg');
```

- `promise1`은 `fetch()`의 결과로 반환된 프로미스 객체를 저장한다. 이 프로미스 객체는 중간 상태(성공도 실패도 아닌 상태)를 가지고 있다. 이러한 상태를 **pending** 상태라고 한다.

```js
let promise2 = promise1.then(response => reponse.blob());
```

- `.then()` 블록 안의 콜백을 **executor**라고 한다.
  - executor는 프로미스 `promise1`이 성공으로 완료되고 (이 예시의 경우) `Response` 객체가 반환될 때만 실행된다.
  - 이때 프로미스 `promise1`를 **fulfilled**라고 한다.
  - 반환된 `Response` 객체는 매개변수 `reponse`에 전달된다.

```js
let promise3 = promise2.then(myBlob => {
    let objectURL = URL.createObjectURL(myBlob);
	let img = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
});
```

- 프로미스 `promise3`이 fulfills일 때 반환된 blob이 `myBlob`에 전달된다.

```js
let errorCase = promise3.catch(e => {
    console.log(e.message);
});
```

- 프로미스에서 에러가 발생한 경우를 **rejects**라고 한다.
- 오류는 `.catch()` 블럭으로 핸들링한다.



## 16.2 프로미스의 상태 관련 용어 정리

- **executor**: `.then()` 블록의 콜백 함수
- (1) **pending** 상태: 프로미스가 생성되었을 때 중간 상태(성공도 실패도 아닌 상태)를 가진다.
- (2) **resolved** 상태: 프로미스의 결과가 반환되었을 때, 즉 작업이 완료되었을 때를 가리킨다.
  - **fulfilled** 상태: 성공적으로 처리된 프로미스의 상태
    - 이때 프로미스 객체는 프로미스 체인의 다음 `.then()` 블럭에서 사용할 수 있는 값을 반환한다.
    - `.then()` 블럭의 executor 함수는 반환된 값을 파라미터로 전달받는다.
  - **rejected**: 실패한 프로미스의 상태
    - 왜 프로미스가 거절되었는지 나타내는 에러 객체가 반환된다.
    - 이 에러 객체는 `.catch()` 블럭에서 다룰 수 있다.



## 16.3 프로미스 심화

### 16.3.1 모든 프로미스가 모두 fullfilled일 경우 코드 실행하기

| 메서드          | 파라미터        | 반환                 | 설명                                                         |
| --------------- | --------------- | -------------------- | ------------------------------------------------------------ |
| `Promise.all()` | 프로미스의 배열 | 프로미스 객체의 배열 | 배열의 모든 프로미스가 fullfill이면 프로미스 객체들의 배열을 반환한다. |

```js
Promise.all([a, b, c]).then(values => {
  ...
});
```

https://developer.mozilla.org/ko/docs/Learn/JavaScript/Asynchronous/Promises#running_code_in_response_to_multiple_promises_fulfilling



### 16.3.2 모든 프로미스가 완료되면 코드 실행하기

https://developer.mozilla.org/ko/docs/Learn/JavaScript/Asynchronous/Promises#running_some_final_code_after_a_promise_fulfillsrejects



## 16.4 사용자 정의 프로미스 만들기

### 16.4.1 Promise 생성자 사용하기

- 구식 비동기 API 코드를 프로미스 기반 코드로 만들고 싶을 경우 주로 사용한다.

https://developer.mozilla.org/ko/docs/Learn/JavaScript/Asynchronous/Promises#building_your_own_custom_promises





##  참고

- [MDN 프로미스로 프로그래밍하기](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises)
- [MDN 프로미스 사용하기](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Using_promises)
- [MDN 프로미스](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [모던 자바스크립트 프로미스](https://ko.javascript.info/promise-basics)

