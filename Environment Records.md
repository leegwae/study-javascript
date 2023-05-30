# Environment Records

- **환경 레코드(Enviroment Record)**는 특정한 문법 구조를 가지는 ECMAScript 코드(함수 선언문, 블록문, Try문의 Catch절)이 평가될 때마다 생성되어, 평가된 코드가 만드는 식별자 바인딩을 기록한다.

- 환경 레코드는 ECMAScript 명세에서 메커니즘을 설명하기 위해 사용되는 타입으로, ECMAScript 구현체에 대응하지 않을 수 있다. EMCAScript 프로그램이 환경 레코드의 값에 직접적으로 접근하거나 조작하는 것은 불가능하다.

## `[[OuterEnv]]`

모든 환경 레코드는 `[[OuterEnv]]` 필드를 가진다. `[[OuterEnv]]`는 외부 환경 레코드(outer environment record)에 대한 참조이다. 외부 환경 레코드란 어떤 환경 레코드에 대하여 이 환경 레코드를 논리적으로 둘러싼 환경 레코드이다.

## 환경 레코드의 종류

환경 레코드의 종류는 세 가지이다.

- 선언적 환경 레코드(declarative Environment Record)
- 객체 환경 레코드(object Enviroment Record)
- 전역 환경 레코드(global Enviroment Record)

객체지향적인 관점에서 환경 레코드를 추상 메서드를 가진 추상 클래스로 본다면, 이들은 상속받은 추상 메서드를 구현하는 서브 클래스로 볼 수 있다. 메서드의 세부 구현은 환경 레코드의 종류에 따라 다르다.

### 선언적 환경 레코드

하나의 **선언적 환경 레코드(declarative Environment Record)**는 하나의 ECMAScript 프로그램 스코프에 대하여 이 스코프에 속한 선언들(var, const, let, class, import, function)에 의해 정의된 식별자들의 집합을 바인딩한다.

선언적 환경 레코드의 종류는 다음과 같다.

- 함수 환경 레코드(function Environment Record)
- 모듈 환경 레코드(module Environment Record)

#### 함수 환경 레코드

**함수 환경 레코드(function Environment Record)**는 하나의 함수가 호출되었을 때 이 함수 내부의 최상위 스코프를 표현하기 위해 사용되는 선언적 환경 레코드이다.

1. 함수가 화살표 함수가 아니면 `this` 바인딩을 제공한다.
2. 함수가 화살표가 아니며 `super`를 참조하면 `super` 메서드를 호출할 때 사용되는 상태를 포함한다.

#### 모듈 환경 레코드

**모듈 환경 레코드(module Enviroment Record)**는 ECMAScript 모듈의 외부 스코프를 표현하기 위해 사용되는 선언적 환경 레코드이다. 변경가능한 바인딩과 변경불가능한 바인딩, 변경불가능한 import 바인딩(다른 환경 레코드에 존재하는 바인딩에 간접적으로 접근하는 바인딩)을 제공한다.

### 객체 환경 레코드

`with`문을 동작을 정의하기 위해 만들어졌으므로 대충 넘어간다.

하나의 객체 환경 레코드(object Enviroment Record)는 하나의 객체에 대하여 이 객체의 프로퍼티 이름에 직접적으로 대응하는 문자열 식별자 이름의 집합을 바인딩한다. 객체 환경 레코드에 연관된 객체를 바인딩 객체(binding object)라고 한다.

### 전역 환경 레코드

하나의 **전역 환경 레코드(function Enviroment Record)**는 common realm에서 처리되는 모든 ECMAScript 스크립트의 요소들이 공유하는 가장 바깥의 스코프를 표현할 때 사용한다. 전역 환경 레코드는 빌트인 전역 객체들과 전역 객체의 프로퍼티, 스크립트 내부의 최상위 선언에 대한 바인딩을 제공한다.

전역 환경 레코드는 논리적으로 하나의 레코드이지만 캡슐화된 객체 환경 레코드와 선언 환경 레코드로 구성된다.

## Realms

realm은 기본적인(intrinsic) 객체의 집합, ECMAScirpt 전역 환경, 이 전역 환경의 스코프에 로드되는 모든 ECMAScript 코드, 기타 상태와 자원으로 구성된다. 따라서 모든 ECMAScript 코드는 평가되기 전에 realm에 연관되야 한다.

realm은 JavaScript 프로그램마다 동일한 전역 실행 환경을 제공한다.

## 참고

- https://262.ecma-international.org/13.0/#sec-environment-records
- https://262.ecma-international.org/13.0/#realm