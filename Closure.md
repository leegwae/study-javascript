# Closure

> Closure is when a function is able to remember and access its lexical scope even when that function is executing outside its lexical scope. 클로저는 어떤 함수에 대하여, 함수가 그것의 렉시컬 스코프 바깥에서 실행될 때에도 그 렉시컬 스코프를 기억하고 그것에 접근할 수 있는 함수를 말한다.
> You don't know JS - Scope and Closure Chapter 5. Scope Closure

```javascript
function foo() {
    const x = 10;
    
    function bar() {
        console.log(x);
    }
    
    return bar;
}

const x = 1;
const baz = foo();
baz();	// 10
```

`bar`는 `foo()` 반환값으로, `baz`에 담기게 되었다. 따라서 `baz()`는 `bar()`와 같다. `bar`가 호출되며 `bar` 함수 코드가 평가되고 `bar`에 대한 함수 실행 컨텍스트가 생성된다. 그런데 `bar`는 전역에서 호출되었으나, `bar`에 대한 실행 컨텍스트의 렉시컬 환경의 외부 렉시컬 환경 필드는 전역 실행 컨텍스트의 렉시컬 환경을 참조하지 않는다. `foo`에 대한 실행 컨텍스트의 렉시컬 환경을 참조한다.

이처럼 함수는 자신이 정의된 환경(상위 스코프)을 기억하고 있다. 달리 말하여 함수의 상위 스코프는 함수 정의가 평가되어 함수 객체가 생성될 때 결정된다. 이것을 렉시컬 스코프라고 한다.

## 함수 객체의 내부 슬롯 `[[Environment]]`

함수 객체는 일반 객체에 대해 추가적으로 `[[Environment]]`라는 내부 슬롯을 가진다. `[[Environment]]`는 함수 선언문이 실행되어 함수 정의가 평가되고 그 결과 함수 객체가 생성된 환경, 곧 현재 실행 중인 실행 컨텍스트의 렉시컬 환경을 참조한다. 이후 함수 호출식이 실행되어 함수 내부 코드가 평가되고, 함수 실행 컨텍스트가 생성될 때 이 실행 컨텍스트의 렉시컬 환경은 함수 객체의 `[[Environment]]`를 참조하게 된다.

```javascript
function bar() {}
bar()
```

위 코드의 실행을 따라가보자.

1. 전역 코드 평가와 실행: `bar` 함수 선언문이 실행되어 `bar` 함수 정의가 평가된다. 그 결과 `bar` 함수 객체가 생성되었다. 이때 `bar` 함수 객체의 `[[Environment]]` 내부 슬롯은 `bar` 함수가 정의된 전역 실행 컨텍스트의 렉시컬 환경(현재 실행 중인 실행 컨텍스트의 렉시컬 환경)을 참조한다.
2. `bar` 함수 코드 평가와 실행: `bar()` 함수 호출식이 실행되어 `bar` 함수 코드가 평가된다. 그 결과 `bar` 함수 실행 컨텍스트가 생성되었다. 이때 실행 컨텍스트의 렉시컬 환경의 `[[OuterEnv]]` 필드는 `bar` 함수 객체의 `[[Environment]]` 내부 슬롯이 참조하는 렉시컬 환경을 참조한다.

맨 처음에 나왔던 코드를 실행 컨텍스트 스택으로 살펴보자. 라인 12에서 `foo`를 호출하여 제어가 라인 7에 있을 때 실행 컨텍스트 스택의 상태는 아래와 같다.

```
window = {
	foo: Function {
		[[Environment]]: globalEX.LexicalEnvironment
	}
}

|---------------------------------------------------------------| EC stack[1] <- top of EC stack

fooEX = ExecutionContext {
	LexicalEnvironment: FunctionEnvironmentRecord {
		[[OuterEnv]]: globalEX.LexicalEnvironment,
		[[ThisValue]]: ref to window,
		[[FunctionObject]]: ref to foo,
		
		x: 10,
		bar: Function {
			[[Environment]]: fooEX.LexicalEnvironment
		}
	}
}

|---------------------------------------------------------------| EC stack[0]

globalEX = ExeuctionContext {
	LexicalEnvironment: GlobalEnvironmentRecord {
		[[OuterEnv]]: null,
		[[GlobalThisValue]]: ref to window,
		[[ObjectRecord]]: ObjectEnvironmentRecord {
			[[BindingObject]]: ref to window,
		},
		[[DeclarativeRecord]]: DeclarativeEnvironmentRecord {
			x: 1,
			baz: ref to bar
		}
	}
}
```

라인 13에서 `bar`를 호출하여 제어가 라인 5에 있을 때 실행 컨텍스트 스택의 상태는 다음과 같다.

```
window = {
	foo: Function {
		[[Environment]]: globalEX.LexicalEnvironment
	}
}

|---------------------------------------------------------------| EC stack[1] <- top of EC stack

barEX = ExuectionContext {
	LexicalEnvironment: FunctionEnvironmentRecord {
		[[OuterEnv]]: fooEX.LexicalEnvironment,
		[[ThisValue]]: ref window,
		[[FunctionObject]]: ref to bar,
	}
}

|---------------------------------------------------------------| EC stack[0]

globalEX = ExeuctionContext {
	LexicalEnvironment: GlobalEnvironmentRecord {
		[[OuterEnv]]: null,
		[[GlobalThisValue]]: ref to window,
		[[ObjectRecord]]: ObjectEnvironmentRecord {
			[[BindingObject]]: ref to window,
		},
		[[DeclarativeRecord]]: DeclarativeEnvironmentRecord {
			x: 1,
			baz: ref to bar
		}
	}
}
```



## 클로저란 무엇인가

> A closure is the combination of a function and the lexical environment within which that function was declared. 클로저는 함수와 이 함수가 선언된 렉시컬 환경의 조합이다. In other words, a closure gives you access to an outer function's scope from an inner function. 달리 말하여 클로저는 중첩 함수에서 외부 함수의 스코프에 접근할 수 있도록 한다.

이에 따르면 클로저는 단순히 중첩 함수를 말하는 것이 아니다.

```javascript
function foo() {
    const x = 10;
    
    function bar() {
        console.log(x);
    }
    
    return bar;
}

const bar = foo();
bar();	// 10
```

라인 11에서 외부 함수 `foo`는 호출이 종료되었다. 즉 `foo`의 생명 주기가 종료되었으나 `foo` 내부의 지역 변수들 역시 생명 주기가 종료되어야 한다. 그러나 `foo`의 지역 변수 `x`에 접근할 수 있다. 이렇듯 상위 스코프를 기억하고 접근할 수 있는 함수를 클로저라고 한다. 한편 클로저에 의해 참조되는 상위 스코프의 변수를 **자유 변수(free variable)**라고 한다.

실행 컨텍스트의 관점에서 살펴보자. `foo`에 대한 실행 컨텍스트는 실행 컨텍스트 스택에서 pop되었으나, 이 실행 컨텍스트의 렉시컬 환경은 `bar`에 대한 실행 컨텍스트의 렉시컬 환경의 외부 환경 필드와 `bar` 함수 객체의 `[[Environment]]` 내부 슬롯에 의해 참조되고 있다. 참조되고 있으니 가비지 컬렉터에 의해 회수되지 않는다.

### 모든 함수는 클로저인가?

JavaScript의 모든 함수는 상위 스코프를 기억하고 있으므로 이론적으로는 클로저이다.

1. 그러나 모던 브라우저는 중첩 함수가 외부 함수의 변수를 참조하지 않는 경우 상위 스코프를 기억하지 않도록 최적화하고 있다. (변수를 참조하는 경우에는 해당 식별자만 기억하도록 최적화하기도 한다.)

2. 중첩 함수가 외부 함수보다 오래 살아남지 않는 경우도 일반적으로 클로저라고 하지 않는다. 전역 변수를 참조하는 전역 함수도 마찬가지이다.

   ```javascript
   function foo() {
       const x = 1;
       function bar() {
           console.log(x);
       }
       
       bar();	// bar는 foo의 종료와 함께 생명주기가 끝난다.
   }
   foo();
   ```

그러니 클로저는 다음과 같이 정의하는 것이 정확하겠다.

> **(1) 중첩 함수가 외부 함수보다 더 오래 유지되며 (2) 중첩 함수가 외부 함수의 변수를 참조하는 경우, 이 중첩 함수를 클로저**라고 한다.

## 클로저 활용하기

### 은닉하기

```javascript
const counter = (function () {
    let count = 0;
    
    return function () {
        return ++count;
    }
})();
```

상태를 변경하는 함수를 반환하는 즉시 실행 함수를 사용하여, 상태는 의도적으로 변경되지 않도록 은닉하고 변경 함수만 제공하도록 할 수 있다. 생성자 함수를 반환하는 예제로 바꿔보면 아래와 같다.

```javascript
const Counter = (function() {
    let count = 0;
    function Counter() {}
    Counter.prototype.increase = function () {
        return ++count;
    }
    return Counter
})();

const counter = new Counter();
counter.increase();
```

그러나 생성자 함수를 반환해도 재사용할 수는 없다.

```javascript
const c1 = new Counter();
console.log(counter.increase());	// 1
const c2 = new Counter();
console.log(counter.increase());	// 2
```

다음 예시로 확인해보자.

```javascript
const Champion = (function() {
    let _name = 0;
    function Champion(name) {
        _count = name;
    }
    Champion.prototype.sayName = function () {
        console.log(_count);
    }
    return Champion;
})();

const lux = new Champion('lux');
lux.sayName();	// lux
const azir = new Champion('azir');
azir.sayName();	// azir

lux.sayName();	// azir
```

즉시 실행 함수로 반환된 `Champion`은 `new` 생성자를 사용하여 인스턴스를 만들 수 있지만, `Champion` 함수 객체의 렉시컬 환경은 고정되어 있기 때문에 위와 같은 출력 결과가 나온다.



## 참고

- [MDN - Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#closures)
- [MDN - Closure](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures)
- [모던 자바스크립트 - closure](https://ko.javascript.info/closure)
- You Don't Know JS Scope and Closure Chapter 5. Scope Closure
