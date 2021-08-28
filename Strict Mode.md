# Strict Mode

[모던 JavaScript 튜토리얼 - 엄격 모드](https://ko.javascript.info/strict-mode) 참고

- ECMAScript5에 새로운 기능이 추가되며 기존 기능 일부가 변경되었다. 이 변경 사항은 기본 모드에서 활성화되지 않는다.
- 변경 사항을 활성화하려면 엄격 모드(strict mode)를 사용한다.



## 1.엄격 모드 적용하기

- 엄격 모드는 전체 스크립트 혹은 부분 함수(individual function)에 적용할 수 있다.



### 1.1 스크립트에 엄격 모드 적용하기

```js
'use strict'

let foo = 'hello world!';
```

- 지시자 `use strict`를 스크립트 최상단에 적으면 전체 스크립트에 엄격 모드가 적용된다.



### 1.2 함수에 엄격 모드 적용하기

```js
function foo() {
    'use strict';
    function bar() { return 'hello world!'; }
    return bar();
}
```

- 지시자 `use strict`를 함수 본문 최상단에 적으면 해당 함수에 엄격 모드가 적용된다.



### 1.3 모듈에 엄격 모드 적용하기

```js
function foo() {
    
}
export default strict;
```

- 자바스크립트 모듈은 기본적으로 엄격 모드가 적용된다.



## 2. 엄격 모드가 변경하는 것들(수정중)

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode#%EC%97%84%EA%B2%A9%ED%95%9C_%EB%AA%A8%EB%93%9C_%EB%B3%80%EA%B2%BD



## 3. 브라우저 콘솔에서 엄격 모드 사용하기

```js
'use strict';
// <SHFIT> + <ENTER>
// 테스트할 코드
```

