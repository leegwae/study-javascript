# Closure

- **클로저(closure)**는 함수와 이 함수를 둘러싼 상태(**렉시컬 환경**)의 조합이다. 달리 말하여, closure를 통해 inner function에서 outer function의 scope에 접근할 수 있다.
- 자바스크립트에서 closure는 함수 생성 시간인, 함수가 생성되는 시간마다 만들어진다.



## 1. Lexical Scoping

- *렉시컬 스코핑(lexical scoping)*은 함수가 중첩되었을 때 어떻게 파서가 변수 이름을 파싱할 것인지 기술한 것이다.
  - 렉시컬 환경(lexcial environment)는 이를 설명하는 이론상의 객체이다.
- *렉시컬(lexical)*은 렉시컬 스코핑이 소스 코드에 선언된 변수의 위치를 그 변수가 유효한 곳인지 결정하는데 사용한다는 것을 의미한다.



## 2. Closure

- **클로저(closures)**는 inner function이 어떤 식이로든 outer function 밖의 모든 scope에서 사용할 수 있으면 형성된다.
  - inner function이 outer function 안에 정의된 모든 변수와 함수(그리고 outer function이 접근할 수 있는 모든 변수와 함수)에 접근할 수 있게 한다.
  - inner function에 대한 일종의 캡슐화 제공: outer function은 inner function 안에 정의된 변수와 함수에 접근할 수 없다.
  - 따라서 inner가 outer의 수명(life)보다 오래 살 경우, outer 안에 선언된 변수나 함수가 outer의 실행 시간보다 오래 산다.



### 2.1 렉시컬 환경 자세히 보기

- 자바스크립트에서 실행 중인 함수, 코드 블록, 스크립트 전체는 **렉시컬 환경(lexical environment)**라고 불리는 내부 숨김 연관 객체(interal hidden associated object)를 갖는다.
  - 스크립트 전체와 관련한 렉시컬 환경은 전역 렉시컬 환경(gloal lexcial environment)라고 한다.
- 렉시컬 환경 객체는 두 부분으로 구성된다.
  - 환경 레코드(environment record): 모든 지역 변수를 프로퍼티로 저장하는 객체
  - 외부 렉시컬 환경(outer lexical eviroment)에 대한 참조: 외부 코드와 관련
- 즉, 변수는 `환경 레코드`의 프로퍼티임을 뜻하며, 변수에 접근하고 변경하는 것은 환경 레코드의 프로퍼티에 접근하고 변경함을 의미한다.



#### 2.1.2 lexical environment의 변화 과정 보기

https://ko.javascript.info/closure#ref-410



- 자바스크립트의 모든 함수는 함수가 생성된 시점의 렉시컬 환경에 대한 참조를 `[[Environment]]`라는 숨김 프로퍼티에 저장한다.



#### 2.1.1 lexical environment 형성 예시 보기

```js
const foo = (name)=> {
    const getName = () => name;
    
    return getName;
};

const bar = foo('umi');
bar();		// 'umi'
```

- 자바스크립트는 함수의 중첩을 허용한다. 중첩된 함수는  클로저를 형성한다.
- *closure*는 함수와 그 함수가 선언된 렉시컬 환경의 조합이다. 이 환경은 closure가 생성된 시점에 유효한 범위에 있는 모든 지역 변수로 구성된다.
- 위 코드에서 변수 `name`를 유효하게 사용할 수 있는 이유
  - `bar`는 `foo`가 실행되었을 때 생성된 함수 `getName`의 인스턴스를 참조한다.
  - `getName`의 인스턴스는 그것의 렉시컬 환경에 대한 참조를 `[[Enviroment]]`에 유지하고, 이 환경에는 변수 `bar`가 생존해있다.
  - 따라서 `foo`가 호출되었을 때 변수 `name`은 유효하게 사용할 수 있게 남아있다.

```js
function makeAdder(x) {
    return function(y) {
        return x + y;
    };
};

let add5 = makeAdder(5);
let add10 = makeAdder(10);

console.log(add5(2));		// 7
console.log(add5(2));		// 12

console.log(makeAdder(5)(2));	// 7
console.log(makeAdder(10)(2));	// 12
```

- `makeAdder`는 함수를 만들어 반환한다.
  - 이 예시에서는 두 개의 함수 - 인수에 `5`를 더하는 `add5` 함수와 `10`을 더하는 `add10` 함수를 만들어낸다.
- `add5`와 `add10`은 모두 클로저를 형성한다.
- 둘은 동일한 함수 본문 정의를 공유하나, 서로 다른 렉시컬 환경를 저장한다.
  - `add5`의 렉시컬 환경에서 `x`는 `5`이다.
  - `add10`의 렉시컬 환경에서 `x`는 `10`이다.



## 3. 이름 충돌

- 이름 충돌(name conflict): outer에 정의한 변수와 inner에 정의한 변수의 이름이 같을 경우, inner function 안에서 전자에 접근할 수 있는 방법이 없다.
- 스코프 체인(scope chain): 더 안쪽에 있는 범위가 우선순위를 가지고, 더 바깥쪽에 있는 범위가 가장 낮은 우선순위를 갖는다.

```js
const outer = () => {
    let x = 1;
    const inner = (x) => x;
    
    return inner;
}

outer()(2);	// 1 대신 2 리턴
```



## 4. 가비지 컬렉션

https://ko.javascript.info/closure#ref-414

https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Functions#efficiency_considerations



## 참고

- [MDN - Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#closures)
- [MDN - Closure](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures)
- [모던 자바스크립트 - closure](https://ko.javascript.info/closure)

