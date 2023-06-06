# study-javascript

자바스크립트 개인 독스

구글 크롬 개발자 콘솔 기준 출력.



**현재 문서 이름을 바꾸는 중이니, 링크 오류가 난다면 TOC에서 관련 문서를 찾아주세요.**



## TOC

- [01. Introduction](https://github.com/leegwae/study-javascript/blob/main/01.%20Introduction.md): 자바스크립트의 역사와 특징에 대하여
- [02. JavaScript Runtime](https://github.com/leegwae/study-javascript/blob/main/02.%20JavaScript%20Runtime.md): 자바스크립트 개발 환경과 자바스크립트 실행하기
- [Lexical Grammar](https://github.com/leegwae/study-javascript/blob/main/Lexical%20Grammar.md): 자바스크립트의 어휘적 분석
- [03. Variable and Constant](https://github.com/leegwae/study-javascript/blob/main/03.%20Variable%20and%20Constant.md): 식별자, 변수, 상수
  - [Scope](https://github.com/leegwae/study-javascript/blob/main/Scope.md): 자바스크립트 식별자의 스코프
  - [Hoisting](https://github.com/leegwae/study-javascript/blob/main/Hoisting.md): 자바스크립트의 호이스팅
- [04. Expression and Statement](https://github.com/leegwae/study-javascript/blob/main/04.%20Expression%20and%20Statement.md): 표현식과 문
- [05. Data Types](https://github.com/leegwae/study-javascript/blob/main/05.%20Data%20Types.md): 동적 타이핑, 자바스크립트의 데이터 타입
  - [Object](https://github.com/leegwae/study-javascript/blob/main/Object.md): Object 객체의 명세
- [06. Literals](https://github.com/leegwae/study-javascript/blob/main/06.%20Literals.md): 리터럴의 종류
- [07. Type Conversion](https://github.com/leegwae/study-javascript/blob/main/07.%20Type%20Conversion.md): 자바스크립트의 형 변환
  - 원시 값을 원시 값 혹은 객체로 변환하기
  - [Conversion Object to Primitive Value](https://github.com/leegwae/study-javascript/blob/main/Conversion%20Object%20to%20Primitive%20Value.md): 객체를 원시 값으로 변환하기
- [08. Operator](https://github.com/leegwae/study-javascript/blob/main/08.%20Operator.md): 자바스크립트의 연산자
  - [Optional Chaning](https://github.com/leegwae/study-javascript/blob/main/Optional%20Chaining.md): 자바스크립트의 옵셔널 체이닝
  - [Nullish Coalescing](https://github.com/leegwae/study-javascript/blob/main/Nullish%20Coalescing.md): 자바스크립트의 널 병합 연산
- [09. Control flow](https://github.com/leegwae/study-javascript/blob/main/09.%20Control%20flow.md): block statement와 if, switch statement
- [10. Loop and Iteration](https://github.com/leegwae/study-javascript/blob/main/10.%20Loop%20and%20Iteration.md): for/while statement와 jump statement
- [11. Objects](https://github.com/leegwae/study-javascript/blob/main/11.%20Objects.md): 자바스크립트의 객체
  - [Object Initializer](https://github.com/leegwae/study-javascript/blob/main/Object%20Initializer.md): 객체 리터럴로 객체 생성하기
  - [Constuctor Function](https://github.com/leegwae/study-javascript/blob/main/Constructor%20Function.md): 생성자 함수로 객체 생성하기
  - [Property Attributes](https://github.com/leegwae/study-javascript/blob/main/Property%20Attributes.md): 프로퍼티 어트리뷰트
  - [Standard Built-in Objects](https://github.com/leegwae/study-javascript/blob/main/Standard%20Built-in%20Objects.md): 표준 내장 객체
- [12. Functions](https://github.com/leegwae/study-javascript/blob/main/12.%20Functions.md): 자바스크립트의 함수
  - [Call by Sharing](https://github.com/leegwae/study-javascript/blob/main/Call%20by%20Sharing.md): 자바스크립트의 평가 전략
- [15. Prototype and Inheritance](https://github.com/leegwae/study-javascript/blob/main/15.%20Prototype%20and%20Inheritance.md): 프로토타입 기반 언어 자바스크립트에서 상속은 어떻게 이루어지는가
- [Keyword this](https://github.com/leegwae/study-javascript/blob/main/Keyword%20this.md): 키워드 this
- Executable Code and Execution Contexts
  - [Environment Records](https://github.com/leegwae/study-javascript/blob/main/Environment%20Records.md): 환경 레코드란 무엇인가
  - [Agent](https://github.com/leegwae/study-javascript/blob/main/Agent.md): 에이전트란 무엇인가
  - [Exeuction Context](https://github.com/leegwae/study-javascript/blob/main/Execution%20Context.md): 실행 컨텍스트란 무엇인가
- [Module](https://github.com/leegwae/study-javascript/blob/main/Module.md):  자바스크립트의 모듈 시스템
- [Destructuring assignment](https://github.com/leegwae/study-javascript/blob/main/Destructuring%20assignment.md)
- [Strict Mode](https://github.com/leegwae/study-javascript/blob/main/Strict%20Mode.md): 자바스크립트의 엄격 모드

***

문서 개편 필요

- [Symbol](https://github.com/leegwae/study-javascript/blob/main/Symbol.md): 자바스크립트의 Symbol 객체 명세
- [Function](https://github.com/leegwae/study-javascript/blob/main/Function.md): Function 객체의 명세
- [Arrow Function](https://github.com/leegwae/study-javascript/blob/main/Arrow%20Function.md): 화살표 함수
- [Closure](https://github.com/leegwae/study-javascript/blob/main/Closure.md): 클로저
- [16. Asynchronous JavaScript](https://github.com/leegwae/study-javascript/blob/main/16.%20Asynchronous%20JavaScript.md)
  - [Introducing Asynchrnous JavaScript](https://github.com/leegwae/study-javascript/blob/main/Introducing%20Asynchronous%20JavaScript.md): 일반적인 비동기 개념과 비동기를 위한 자바스크립트의 콜백과 프로미스 도입
  - [Timeouts and intervals](https://github.com/leegwae/study-javascript/blob/main/Timeouts%20and%20intervals.md)
  - [Promise](https://github.com/leegwae/study-javascript/blob/main/Promise.md): 비동기 연산을 위한 자바스크립트의 프로미스
  - [async and await](https://github.com/leegwae/study-javascript/blob/main/async%20and%20await.md): ES6의 async, await
- [17. Iterator and Generator](https://github.com/leegwae/study-javascript/blob/main/17.%20Iterator%20and%20Generator.md)
- [13. Indexed collections](https://github.com/leegwae/study-javascript/blob/main/13.%20Indexed%20collections.md): 자바스크립트의 배열
- [14. Keyed collections](https://github.com/leegwae/study-javascript/blob/main/14.%20Keyed%20collections.md): 자바스크립트의 맵과 집합



## 참고

- [모던 JavaScript 튜토리얼](https://ko.javascript.info/)
- [MDN JavaScript](https://developer.mozilla.org/ko/docs/Web/JavaScript)
- [ECMA-262, 12th edition](https://262.ecma-international.org/12.0/)
- 모던 자바스크립트 Deep Dive(이용모 저)
- [모던 자바스크립트 딥다이브 스터디](https://www.youtube.com/watch?v=3ZP3VPlrr0U&list=PLjQV3hketAJnP_ceUiPCc8GnNQ0REpCqr)



## TODO

- [ ] **제목에서 번호 매긴 거 빼기** 혹은 번호 잘 정리하기
- [ ] **링크 오류 수정하기**
- [ ] ECMA발표연도 -> ES*로 바꾸기
- [ ] ECMA 연도별로 정리
- [ ] 하이퍼링크가 md 파일이면 확장자 명시하기
- [ ] Introduction.md
  - [ ] 브라우저 부분 02.JavaScript Runtime.md로 옮기기
- [ ] **JavaScript Runtime.md**
  - [x] ~~다른 문서로 편입하기~~ 문서 내용 새롭게 개편
  - [ ] 브라우저와 Node.js 런타임으로서의 기능 중심으로 보충하기
  - [ ] 자바스크립트 엔진
- [ ] Variable and Constant 참고 링크 보고 TDZ 섹션 파기
- [ ] Execution Context 공부하고 Scope.md 다듬기 
- [ ] Lexical Grammar
  - [ ] 3.5 토큰 - 키워드, 식별자, 리터럴, 구분자 보충
- [ ] 06. Literals
  - [ ] 부동소수점 리터럴 정리하기
  - [ ] 정규표현식 문서 따로 파기(Regular Expression Literal.md)
- [ ] 08. Operator
  - [ ] 8.5 비트 연산자 보충
  - [ ] 8.10.3 `void` 연산자 보충
- [ ] 12. Functions.md
  - [ ] [화살표 함수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Arrow_functions#%EA%B3%A0%EA%B8%89_%EA%B5%AC%EB%AC%B8) 내용 보충하기
    - [ ] 바인딩하지 않는 것들
  - [ ] [생성자와 함수 선언 차이](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function#function_%EC%83%9D%EC%84%B1%EC%9E%90%EC%99%80_%ED%95%A8%EC%88%98_%EC%84%A0%EC%96%B8%EC%9D%98_%EC%B0%A8%EC%9D%B4)
  - [ ] 제너레이터 함수 분리하기
    - [ ] The generator function declaration(`function*`문)
    - [ ] The generator function expression(`function*`표현식)
    - [ ] The GeneratorFunction constructor(`GeneratorFunction` 생성자)
- [ ] 11. Objects.md
  - [ ] hidden class (p.147 v8 엔진 동작 상세)
- [ ] Objects.md: 모르는 메서드나 프로퍼티 볼 때마다 추가하기
  - [ ] 생성자 메서드
  - [ ] 프로토타입 메서드
- [ ] 13. Indexed collections.md
  - [ ] [배열 메서드](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections#array_methods) 따로 문서 만들기
- [ ] 14. Keyed collections.md
  - [ ] 14.1.2 [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections#weakmap_object) 보충
  - [ ] set 메서드 따로 문서 만들기
- [ ] 15. Prototype and Inheritance.md
  - [ ] `[[Prototype]]` [링크]((https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain#inheriting_properties)) 참고
  - [ ] 15.3.3 `hasOwn`과 `hasOwnProperty` 보충
  - [ ] 15.5.3 [생성자의 global information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Details_of_the_Object_Model#global_information_in_constructors)
- [ ] Destructuring assignment.md
  - [ ] [Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) 참고해서 보충
- [ ] keyword this.md
  - [ ] 보충
- [ ] Object initializer.md
  - [ ] `...`와 `Object.assign()` 비교(얕은 복사, 깊은 복사56 관련하여)
    - [ ] [참조에 의한 객체 복사](https://ko.javascript.info/object-copy)
- [ ] Stricit Mode.md
  - [ ] 2 [엄격 모드가 변경하는 것들](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode#%EC%97%84%EA%B2%A9%ED%95%9C_%EB%AA%A8%EB%93%9C_%EB%B3%80%EA%B2%BD) 참고해서 보충
  - [ ] 함수 내에서 `this`와 엄격모드
- [ ] [얕은 복사, 깊은 복사](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals)
  - [ ] https://ko.javascript.info/object-copy
- [ ] Introduction to ES6
- [ ] Symbol
  - [ ] 보충(https://ko.javascript.info/symbol#ref-559)
- [ ] Iterator and Geneartor
  - [ ] https://ko.javascript.info/iterable 예시 보충
  - [ ] [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Iterators_and_Generators#%EC%82%AC%EC%9A%A9%EC%9E%90_%EC%A0%95%EC%9D%98_iterable) 예시 보충
- [ ] object.keys, values, entries
- [ ] JSON
- [ ] garbage collection
- [ ] 프로토타입과 object....property() 메서드들
- [ ] 클로저
  - [ ] [MDN closure](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures#%EC%8B%A4%EC%9A%A9%EC%A0%81%EC%9D%B8_%ED%81%B4%EB%A1%9C%EC%A0%80) 보충
  - [ ] [모던 자바스크립트 closure](https://ko.javascript.info/closure#ref-410) 보충
    - [ ] 환경 객체 변화 과정
    - [ ] 가비지 컬렉션
  - [ ] function 생성자 사용했을 때의 렉시컬(https://ko.javascript.info/new-function#ref-158)
- [ ] web worker
- [ ] timeoutand intervals 보충
  - [ ] requestAnimationFrame() [MDN](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals)
- [ ] 16. Promise.md
- [ ] 콜백 문서 만들기
- [ ] async and await.md
- [ ] 자바스크립트의 예약어 정리
- [ ] 코드 블록 js -> javascript
- [ ] 참고 형식 통일하고 참고 없으면 참고 찾아서 넣기
- [ ] [hiden class](https://v8.dev/blog/fast-properties)
- [ ] https://medium.com/jspoint/how-javascript-works-in-browser-and-node-ab7d0d09ac2f
- [ ] https://medium.com/jspoint
- [ ] https://medium.com/sessionstack-blog/how-javascript-works/home
- [ ] `Function` 생성자를 사용하지 않는 이유
- [ ] [느슨한 비교](https://262.ecma-international.org/13.0/#sec-islooselyequal), [엄격한 비교](https://262.ecma-international.org/13.0/#sec-isstrictlyequal)