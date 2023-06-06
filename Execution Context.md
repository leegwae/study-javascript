# Execution Context

- 실행 컨텍스트(Exeuction Context)는 실행 가능한 코드를 평가하여 생성되며, 평가된 코드에 대한 스코프를 관리한다.
- 실행 컨텍스트는 ECMAScript 명세에서 메커니즘을 설명하기 위해 사용되는 장치로, EMCAScript 구현체에 대응하지 않을 수 있다. ECMAScript 코드가 실행 컨텍스트에 직접적으로 접근하거나 조작하는 것은 불가능하다.

## 실행 컨텍스트의 구성

실행 컨텍스트는 다음 세 가지의 컴포넌트를 가진다.

1. `LexicalEnvironment` 컴포넌트: 식별자를 탐색할 때 사용하는 **환경 레코드(Environment Record)**에 대한 참조이다.
2. `VariableEnvironment` 컴포넌트: 특별한 경우가 아니면 `LexicalEnvironment`와 같은 값을 가진다.
3. `PrivateEnvironment` 컴포넌트: 클래스의 private name 바인딩을 기록한 PrivateEnvironment Record에 대한 참조이다.

환경 레코드에 대해서는 [**Environment Record**](https://github.com/leegwae/study-javascript/blob/main/Environment%20Records.md)를 참고한다.

### 렉시컬 환경과 스코프 체인

1. 현재 실행 중인 실행 컨텍스트의 `LexicalEnvironment`가 참조하는 환경 레코드에서 식별자를 탐색한다.
2. 없으면 해당 환경 레코드의 `[[OuterEnv]]`가 참조하는 환경 레코드가 참조하는 환경 레코드로 옮겨가 식별자를 탐색한다.
3. 환경 레코드가 `null`이 될 때까지 반복한다.

## 실행 가능한 코드의 평가와 실행

자바스크립트 엔진은 소스코드(실행 가능한 코드, ECMAScript 코드)를 실행하기 전 평가한다. 소스코드 평가와 소스코드 실행 단계로 나뉘며, 소스코드 평가 단계에서는 선언문을 처리하고 소스코드 실행 단계에서는 선언문 이외의 문을 처리한다.

1. **소스코드 평가 단계**: 런타임 이전에 JavaScript 엔진이
   1. 소스코드를 평가하여 실행 컨텍스트를 생성한다.
   2. 선언문을 실행하여 실행 컨텍스트가 관리하는 스코프에 식별자를 키로 등록한다.
2. **소스코드 실행 단계**: 런타임에 JavaScript 엔진이
   1. 실행 컨텍스트가 관리하는 스코프에서 소스코드 실행에 필요한 식별자를 검색하여 참조를 가져온다.
   2. 소스코드를 실행한다.
   3. 소스코드의 실행 결과로 생긴 변경(변수 값의 교체 등)은 실행 컨텍스트가 관리하는 스코프에 등록한다.

## 소스코드의 종류

ECMAScript 코드는 네 가지 종류로 구분한다. 각 코드가 평가되어 생성되는 실행 컨텍스트는 서로 세부 동작과 관리하는 내용이 다르다.

- 전역 코드
- 함수 코드
- `eval` 코드
- 모듈 코드

### 전역 코드의 평가와 실행

**전역 코드(global code)**는 전역에 존재하는 소스코드이다. 전역에 정의된 함수의 내부와 클래스의 내부 코드는 포함하지 않는다.

1. 전역 코드 평가: 전역 코드를 평가하여 전역 실행 컨텍스트를 생성한다. 전역 실행 컨텍스트는 전역 스코프를 관리한다.
   1. 전역 변수 선언문과 함수 선언문을 실행한다. 전역 변수와 전역 함수가 전역 스코프에 등록된다.
   2. 전역 객체의 프로퍼티로 `var` 키워드로 선언한 전역 변수를 바인딩한다.
   3. 전역 객체의 메서드로 전역 함수를 바인딩한다.
2. 전역 코드 실행

### 함수 코드의 평가와 실행

**함수 코드(function code)**는 함수 내부에 존재하는 소스코드이다. 함수 내부에 중첩된 함수, 클래스의 내부 코드는 포함하지 않는다.

1. 함수 코드 평가: 함수 코드를 평가하여 함수 실행 컨텍스트를 생성한다. 함수 실행 컨텍스트는 지역 스코프를 관리한다.
   1. 매개변수와 지역 변수 선언문을 실행한다. 매개변수와 지역 변수가 지역 스코프에 등록된다.
   2. `arguments` 객체를 생성한다. `arguments`는 지역 스코프에 등록된다.
   3. `this` 바인딩을 결정한다.
   4. 스코프 체인에 지역 스코프를 연결한다.
2. 함수 코드 실행

### `eval` 코드의 평가와 실행

**`eval` 코드(eval code)**는 빌트인 전역 함수 `eval` 함수에 인수로 전달되어 실행되는 소스코드이다.

1. `eval` 코드 평가: `eval` 코드를 평가하여 `eval` 실행 컨텍스트를 생성한다. `eval` 실행 컨텍스트는 `eval` 스코프를 관리한다. (스코프는 엄격 모드에서는 독립적이다.)
2. `eval` 코드 실행

### 모듈 코드의 평가와 실행

**모듈 코드(module code)**는 모듈 내부에 존재하는 소스코드이다. 무듈 내부의 함수와 클래스의 내부 코드는 포함하지 않는다.

1. 모듈 코드 평가: 모듈 코드를 평가하여 모듈 실행 컨텍스트를 생성한다. 모듈 실행 컨텍스트는 독립적인 모듈 스코프를 관리한다.
2. 모듈 코드 실행

### 예시 1

```js
var x;
x = 1;
```

위 소스코드의 처리를 알아보자. 먼저 소스코드를 평가한다.

````js
var x;
````

`var` 키워드로 선언한 변수의 선언문을 실행하여 변수 식별자 `x`를 생성한다. 식별자 `x`는 실행 컨텍스트가 관리하는 스코프에 등록되고 `undefined`로 초기화된다. 그다음은 소스코드를 실행한다.

```js
x = 1;
```

식별자 `x`가 선언된 변수인지 확인하기 위해 실행 컨텍스트가 관리하는 스코프에 `x`를 검색한다. 스코프에 등록되어있다면 `1`로 값을 변경한다.

### 예시 2

```js
const x = 1;

function foo() {
    const x = 10;

    console.log(x);
}

foo();	// 10
console.log(x);	// 1
```

위 소스코드의 처리를 알아보자. 두 가지로 나눌 수 있다.

1. 전역 코드 처리
2. 함수 코드 처리

한편 각 소스코드의 처리는 `평가`와 `실행` 단계로 나눌 수 있다. 따라서 네 개의 세부 단계로 이해해보자.

1. 전역 코드 평가: 전역 코드의 선언문을 처리하여 전역 실행 컨텍스트를 생성한다.

   1. 전역 코드의 변수 선언문과 함수 선언문을 실행한다.

      `line 1`와 `line 3`를 실행한다.

   2. 생성된 전역 변수와 전역 함수를 실행 컨텍스트가 관리하는 전역 스코프에 등록한다.

      `x`와 `foo`를 전역 스코프에 등록한다.

   3. `var` 키워드로 선언된 전역 변수와 함수 선언문으로 정의된 전역 함수는 전역 객체의 프로퍼티와 메서드로 바인딩한다.

      `foo`가 전역 객체 `window`의 메서드로 바인딩되었다.

2. 전역 코드 실행: 선언문을 제외한 전역 코드의 문를 순차적으로 실행하여 전역 실행 컨텍스트를 수정한다.

   1. 전역 변수에 값이 할당된다.

      `x`에 `1`이 할당되었다.

   2. 함수가 호출되면 전역 코드의 실행을 중단하고 함수 내부로 진입한다.

      `foo`가 호출되어 `foo`의 내부로 진입했다.

3. 함수 코드 평가: 함수 코드의 선언문을 처리하여 함수 실행 컨텍스트를 생성한다.

   1. 매개변수와 지역 변수 선언문을 실행한다.

      `line 4`을 실행한다.

   2. 생성된 매개변수와 지역 변수를 실행 컨텍스트가 관리하는 지역 스코프에 등록한다.

      `x`를 지역 스코프에 등록한다.

   3. `arguments` 객체를 생성하여 지역 스코프에 등록한다.

   4. `this` 바인딩을 결정한다.

4. 함수 코드 실행: 선언문을 제외한 함수 코드의 문을 순차적으로 실행하여 함수 실행 컨텍스트를 수정한다.

   1. 매개변수와 지역 변수에 값이 할당된다.

      `x`에 `10`이 할당되었다.

   2. 식별자를 만나면 스코프 체인에서 검색한다. 이때 메서드와 프로퍼티를 참조한다면 객체의 프로토타입 체인을 통해 검색한다.

      식별자 `console`를 스코프 체인에서 검색한다. 지역 스코프에는 존재하지 않으며 상위 스코프인 전역 스코프에 등록되어있다. `log` 프로퍼티는 `console` 객체의 프로토타입 체인에서 검색한다. 그 후 인자 `x`를 스코프 체인에서 검색하여 전달, `log`를 호출한다.

   3. 함수 실행이 종료되면 함수 호출 이전으로 되돌아간다.

      전역 코드 실행(`line 7` 이후)으로 되돌아간다.



## 실행 컨텍스트 스택

**에이전트(agent)**는 실제로 코드를 실행하는 주체로 실행 컨텍스트의 집합과 실행 컨텍스트 스택 등으로 구성된다. 에이전트는 **실행 컨텍스트 스택(exeuction context stack)**을 사용하여 코드의 실행 순서를 관리한다.

1. 에이전트는 언제나 실행 컨텍스트 스택의 최상위 요소인 실행 컨텍스트를 실행한다. 이 실행 컨텍스트를 **현재 실행 중인 실행 컨텍스트(running exeuction context)**라고 한다.
2. 제어가 이동하면(현재 실행 중인 실행 컨텍스트에 대한 코드가 아니라 새로운 코드로 제어가 이동하면), 이 코드를 평가하고 새로운 실행 컨텍스트를 생성한다.
3. 새로운 실행 컨텍스트를 실행 컨텍스트에 push한다. 기존의 실행 컨텍스트의 실행은 일시중지(suspend)된다.
4. 현재 실행 중인 실행 컨텍스트의 실행이 종료되면 스택에서 pop한다.

### 예시

[예시 2](#예시-2)와 같은 경우를 생각해보자.

1. 전역 코드를 평가하여 전역 실행 컨텍스트를 생성하고 push한다.
2. 에이전트가 전역 실행 컨텍스트를 실행한다.
3. `foo` 함수의 호출로 `foo` 함수 내부로 제어가 이동한다.
4. `foo` 함수 코드를 평가하여 `foo` 함수 실행 컨텍스트를 생성하고 실행 컨텍스트 스택에 push한다.
5. 에이전트가 `foo` 함수 실행 컨텍스트를 실행한다.
6. `foo` 함수 실행 컨텍스트의 실행이 끝나 실행 컨텍스트 스택에서 pop한다.
7. 에이전트가 전역 실행 컨텍스트를 실행한다.

## 추상화한 코드로 살피기

### EnvironmentRecord

- `EnvironmentRecord`는 평가된 코드에 대한 바인딩을 기록한다. `[[OuterEnv]]`는 외부 환경 레코드 객체를 가리킨다.

```
EnvironmentRecord {
	[[OuterEnv]]: null or reference to outer EnvironmentRecord,
}
```

- 객체 지향적 관점에서 `EnvironmentRecord`를 추상 클래스라고 한다면, `DeclarativeEnvironmentRecord`/`ObjectEnvironmentRecord`/`GlobalEnvironmentRecord`는 `EnvironmentRecord`를 상속받은 서브 클래스이다. 따라서 `[[OuterEnv]]` 필드를 가지며 상속받은 추상 메서드들을 각자 다르게 구현한다.

### PrivateEnvironmentRecord

- `PrivateEnvironmentRecord`는 클래스의 private name을 관리한다.

```
PrivateEnvironmentRecord {
	[[OuterPrivateEnvironment]]: null or reference to outer OuterPrivateEnvironment,
	[[Names]]: private names declared by class
}
```

### DeclarativeEnvironmentRecord

- `DeclarativeEnvironmentRecord`는 함수 선언, 변수 선언, Catch 절에 대한 바인딩을 관리한다.

```
DeclarativeEnvironmentRecord extends EnvironmentRecord {}
```

#### FunctionEnvironmentRecord

- `FunctionEnvironmentRecord`은 하나의 함수 호출 내에서 최상위 선언 대한 바인딩을 관리하는 `DeclarativeEnvironmentRecord`이다.

```
FunctionEnvironmentRecord extends DeclarativeEnvironmentRecord {
	/* additional state fields */,
	[[ThisValue]]: this value,
	[[ThisBindingStatus]]: lexical/initialized/uninitialized,
	[[Functionobject]]: function object who invocated,
	[[NewTarget]]: parameter `newTarget` of [[Construct]],
}
```

#### ModuleEnvironmentRecord

- `ModuleEnvironmentRecord`는 하나의 모듈의 최상위 선언에 대한 바인딩을 관리하는 `DeclarativeEnvironmentRecord`이다. `[[OuterEnv]]`는 전역 환경 레코드가 된다.

```
ModuleEnvironmentRecord extends DeclarativeEnvironmentRecord {
	[[OuterEnv]]: GlobalEnvironmentRecord {},
}
```

### ObjectEnvironmentRecord

- `ObjectEnvironmentRecord`은 하나의 객체에 대하여 프로퍼티 이름에 대한 바인딩을 관리한다.

```
ObjectEnvironmentRecord extends EnvironmentRecord {
	/* additional state fields */
	[[BindingObject]]: associated object,
	[[IsWithEnvironment]]: is created by `with` statement,
}
```

### GlobalEnvironmentRecord

- `GlobalEnvironmentRecord`는 전역 선언에 대한 바인딩을 관리한다. `[[OuterEnv]]`는 `null`이 된다. 하나의 `ObjectEnvironmentRecord`와 하나의 `DeclarativeEnvironmentRecord`로 구성된다.

```
GlobalEnvironmentRecord extends EnvironmentRecord {
	[[OuterEnv]]: null,
	
	/* additional state fields */,
	[[GlobalThisValue]]: global object,
	[[ObjectRecord]]: ObjectEnvironmentRecord {
		[[BindingObject]]: global object,
	},
	[[DeclarativeRecord]]: DeclarativeEnvironmentRecord {},
	[[VarNames]]: string names bound,
}
```

### ExeuctionContext

- `ExeuctionContext`는 코드가 평가될 때마다 생성되어 해당 코드를 실행하기 위한 상태를 관리한다. 특수한 경우가 아니면 `LexicalEnvironment`과 `VariableEnvironment`는 동일한 환경 레코드 객체를 가리킨다.

```
ExeuctionContext {
	LexicalEnvironment: EnvironmentRecord {},
	VariableEnvironment: EnvironmentRecord {},
	PrivateEnvironment: PrivateEnvironmentRecord {}
}
```

- 전역 코드가 평가되어 생성된 실행 컨텍스트 객체의 `LexicalEnvironment`가 가리키는 환경 레코드 객체는 `GlobalEnvironmentRecord`이다.

```
globalEX = ExuectionContext {
	LexicalEnvironment: GlobalEnvironmentRecord {},
	...생략,
}
```



### 추상화한 실행 컨텍스트 스택 예시

```javascript
var k = 1;
const x = 2;
function foo(a) {
    const y = 3;
    function bar (b) {
        const z = 4;
    }
    bar(20); // <- bar 함수 종료 전, EC stack의 모습은?
}
foo(10);
```

```
window = {
	k: 1,
	foo: <foo function object>,
}

|---------------------------------------------------------------| EC stack[2] <- top of EC stack

barEC = ExeuctionContext {
	LexicalEnvironment: FunctionEnvironmentRecord {
		[[OuterEnv]]: fooEC.[[LexicalEnvironment]],
		[[ThisValue]]: ref to window,
		[[Functionobject]]: ref to bar,
		
		b: 20,
		arguments: { 0: 20, length: 1, callee: bar}
		z: 4,
	}
}

|---------------------------------------------------------------| EC stack[1]

fooEC = ExeuctionContext {
	LexicalEnvironment: FunctionEnvironmentRecord {
		[[OuterEnv]]: globalEC.[[LexicalEnvironment]],
		[[ThisValue]]: ref to window,
		[[Functionobject]]: ref to foo,
		
		a: 10,
		arguments: { 0: 10, length: 1, callee: foo },
		y: 3,
		bar: <bar function object>,
	}
}

|---------------------------------------------------------------| EC stack[0]

globalEC = ExuectionContext {
	LexicalEnvironment: GlobalEnvironmentRecord {
		[[OuterEnv]]: null,
		[[GlobalThisValue]]: ref to window,
		[[ObjectRecord]]: ObjectEnvironmentRecord {
			[[BindingObject]]: ref to window,
		},
		[[DeclarativeRecord]]: DeclarativeEnvironmentRecord {
			x: 2,
		},
	}
}
```



## 참고

- 모던 자바스크립트 Deep Dive 23장: 실행 컨텍스트
- https://262.ecma-international.org/13.0/#sec-types-of-source-code
- https://262.ecma-international.org/13.0/#sec-executable-code-and-execution-contexts
- https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0
- https://codeburst.io/js-demystified-04-execution-context-97dea52c8ac6
- https://ko.javascript.info/closure#ref-227



## 번역 정리 텍스트

- **실행 컨텍스트(Execution Context)**는 ECMAScript 구현체에서 코드의 런타임 평가를 추적하기 위해 사용하는 명세 상의 장치이다. 실행 컨텍스트는 연관된 코드의 실행 진행도를 추적하는데 필요한 모든 상태를 포함한다.
- 실제로 코드를 실행하는 것은 **에이전트(agent)**이며, 하나의 에이전트는 어느 시점이든 하나의 실행 컨텍스트를 실행한다. 이때 에이전트가 실행하고 있는 실행 컨텍스트를 **현재 실행중인 실행 컨텍스트(running execution context)**라고 한다.
- 에이전트의 **실행 컨텍스트 스택(running execution stack)**은 실행 컨텍스트들을 추적하는데 사용된다. 현재 실행중인 실행 컨텍스트는 언제나 스택의 첫번째 요소이다. 새로운 실행 컨텍스트는 제어가 현재 실행중인 실행 컨텍스트에 연관한 실행가능한 코드에서 현재 실행중이 아닌 실행 컨텍스트에 연관한 실행가능한 코드로 옮겨갈 때 생성된다. 새롭게 생성된 실행 컨텍스트는 스택에 푸쉬되고 현재 실행중인 실행 컨텍스트가 된다.
- 현재 실행중인 실행 컨텍스트에 의한 코드의 평가는 여러 시점에서 중지될 수 있다. 현재 실행중인 실행 컨텍스트가 일시중지(suspended)되면 다른 실행 컨텍스트가 현재 실행중인 실행 컨텍스트가 되며 이 실행 컨텍스트에 연관된 코드가 평가되기 시작한다. 시간이 지나 실행중지된 실행 컨텍스트가 현재 실행중인 실행 컨텍스트가 되면 이 실행 컨텍스트에 연관된 코드를 실행중지되기 전까지 평가되었던 곳부터 평가가 재개된다. 실행 컨텍스트 간에 현재 실행중인 실행 컨텍스트 상태 전환은 스택과 같은 LIFO(후입선출)로 이루어진다. 하지만 어떤 ECMAScript 기능들은 실행 컨텍스트의 변경이 LIFO이 아닌 형태로 이루어져야한다.
- 실행 컨텍스트는 렉시컬 환경(`LexicalEnvironment`), `VariableEnvironment`, `PrivateEnvironment` 컴포넌트를 가진다. 렉시컬 환경 컴포넌트는 식별자 참조를 탐색할 때 사용하는 환경 레코드에 대한 참조이다. 즉, 실행 컨텍스트는 렉시컬 환경 컴포넌트의 환경 레코드를 사용하여 스코프를 관리한다. (`PrivateEnviroment`는 PrivateEnvironment Record라는 걸 참조하는 컴포넌트이다. PrivateEnvironment Record는 클래서 선언과 클래스 표현식의 렉시컬 중첩 구조에 기반한 Private Name을 추적할 때 사용하는 명세 상의 메커니즘이다. Private Name은 private 클래스 요소의 키를 나타내는 전역적으로 고유한 이름으로 명세 상의 타입이다. `VariableEnvironment`는 특수한 경우가 아니면 현재 실행 중인 실행 컨텍스트에서 `LexicalEnvironment`와 동일한 환경 레코드를 가리킨다.)
