# Strict Mode

- ES6 도입으로 기존 기능의 일부가 변경되었으나 하위 호환성을 위하여 기본 모드에서는 변경사항이 활성화되지 않는다.
- **엄격 모드(strict mode)**는 변경사항을 활성화하고 오류를 발생시킬 수 있는 코드에 명시적으로 에러를 발생시킨다.



## 엄격 모드 적용하기

엄격 모드(strict mode)는 전체 스크립트 또는 모듈, 함수에 개별적으로 적용할 수 있다.

### 스크립트에 엄격 모드 적용하기

- 지시자 `use strict`를 스크립트 최상단에 적으면 전체 스크립트에 엄격 모드가 적용된다.

```js
'use strict'

let foo = 'hello world!';
```

### 함수에 엄격 모드 적용하기

- 지시자 `use strict`를 함수 본문에 적으면 해당 지시문 이후부터 함수에 엄격 모드가 적용된다.

```js
function foo() {
    'use strict';
    function bar() { return 'hello world!'; }
    return bar();
}
```

### 모듈에 엄격 모드 적용하기

- 자바스크립트 모듈에는 기본적으로 엄격 모드가 적용된다.

```js
function foo() {
    
}
export default foo;
```

### 브라우저 콘솔에서 엄격 모드 사용하기

```js
'use strict';
// <SHFIT> + <ENTER>
// 테스트할 코드
```



## 엄격 모드가 발생시키는 에러

엄격 모드를 적용하면 다음 코드에서 에러를 발생시킨다.

1. 암묵적 전역에 `ReferenceError`를 발생시킨다.
2. `delete`로 변수, 함수, 매개변수를 삭제하면 `SyntaxError`를 발생시킨다.
3. 매개변수의 이름을 중복하면 `SyntaxError`를 발생시킨다.
4. `with`문을 사용하면 `SyntaxError`를 발생시킨다.



## 엄격 모드가 변경하는 것들

엄격 모드를 적용하면 다음의 경우를 기본 모드와 다르게 처리한다.

### `this`의 값

함수를 일반 함수로서 호출할 경우 `this`의 값이 `undefined`가 된다.

- 기본 모드의 경우, 함수에서 `this`의 값이 nullish인 경우 전역 객체로 박싱한다.
- 엄격 모드의 경우, 함수에서 `this`의 값이어도 래퍼 객체로 변환하지 않는다.

| 함수 호출 방식       | `this`가 참조하는 값          | 엄격 모드의 경우              |
| -------------------- | ----------------------------- | ----------------------------- |
| 일반 함수로서 호출   | 전역 객체                     | `undefined`                   |
| 메서드로서 호출      | 메서드를 호출한 객체          | 메서드를 호출한 객체          |
| 생성자 함수로서 호출 | 생성자 함수가 생성할 인스턴스 | 생성자 함수가 생성할 인스턴스 |

한편 `this`의 값은 함수가 호출되는 문맥에 따라 달라진다. [keyword this](https://github.com/leegwae/study-javascript/blob/main/Keyword%20this.md)를 참고한다.

### `arguments` 객체

매개변수에 전달된 인수를 재할당해도 `arguments` 객체에 반영되지 않는다.

## 참고

- [모던 JavaScript 튜토리얼 - 엄격 모드](https://ko.javascript.info/strict-mode) 참고
