# Arrow Function

## 화살표 함수 정의하기

ES6 **화살표 함수(arrow function)**는 `function` 키워드가 아닌 화살표(`=>`)를 사용한다.

```js
const 변수이름 = (파라미터1, ...) => {
    // 함수 본문
}
```

- 화살표 함수는 항상 **익명**이다.
- 파라미터가 0개라면 중괄호를 생략할 수 없다.
- 파라미터가 1개라면 중괄호를 생략할 수 있다.
- 함수 본문에 `return`문만 있다면 중괄호와 `return` 키워드를 생략할 수 있다.
  - 중괄호를 생략한 본문을 concise body라고 한다.
  - 중괄호를 생략하지 않은 본문을 block body라고 한다.
  - 단, 객체 리터럴을 반환하는 경우 `()`로 감싸야 한다.


```js
/* 객체 리터럴 반환하기 */
() => ({ foo: 'bar' });
```

```js
/* block body */
const add = (a, b) => {
    return a + b;
}
/* concise body */
const add = (a, b) => a + b;
```

## 화살표 함수와 일반 함수의 차이

1. 화살표 함수는 non-constructor이다.
2. 중복된 매개변수 이름을 선언할 수 없다.
3. 화살표 함수는 함수 자체에 `this`, `arguments`, `super`, `new.target` 바인딩을 갖지 않는다. 이들은 화살표 함수 내부에서 스코프 체인을 통해 상위 스코프의 `this`, `arguments`, `super`, `new.target`을 참조한다.

## 콜백 함수의 `this`

콜백 함수가 일반 함수로 호출된다면 콜백 함수 내의 `this`는 전역 객체를 참조한다. 또한, 클래스 내부에서 콜백 함수를 전달할 경우 클래스는 strict mode가 적용되어 `this`는 `undefined`를 참조한다. 이러한 문제를 해결하기 위해 다음과 같은 방법을 사용할 수 있다.

1. 임의의 변수에 `this`를 할당하고 참조한다.

   ```javascript
   const obj = {
       val: 100,
       foo() {
           const self = this;
           setTimeout(function () {
               console.log(self.val);
           }, 1000);
       }
   }
   obj.foo();
   ```

2. `this`를 파라미터로 전달받은 몇몇 API를 사용한다. (예: `Array.prototype.map`)

   ```javascript
   class Prefixer {
       constructor(prefix) {
           this.prefix = prefix;
       }
       add(arr) {
           return arr.map(function(e) {
               return ${this.prefix}${e};
           }, this);
       }
   }
   ```

3. `Function.prototype.bind` 메서드를 사용하여 직접 바인딩한다.

   ```javascript
   const obj = {
       val: 100,
       foo() {
           setTimeout(function () {
               console.log(this.val);
           }.bind(this), 1000);
       }
   };
   obj.foo();
   ```

이렇게 콜백 함수에 `this`를 사용하는 경우 발생할 수 있는 문제를 화살표 함수를 사용하여 해결할 수 있다.

## 화살표 함수의 `this`

화살표 함수는 자체적으로 `this`를 바인딩하지 않고 스코프 체인을 통해서 검색한다. 즉, 화살표 함수의 `this`는 렉시컬이다. 이를 가리켜 **lexical this**라고 한다.

- 화살표 함수는 `this`를 바인딩하지 않으므로 `Function.prototype.call/apply/bind` 메서드를 사용할 때 `this` 교체를 하지 않는다.

  ```javascript
  window.x = 1;
  const obj = { x: 10 };
  
  const add = (y) => this.x + y;
  
  console.log(add.call(obj, 2));	// 3
  console.log(add.call(null, 2));	// 3
  ```

- 화살표 함수가 중첩되어 있는 경우에도 스코프 체인에 따라 탐색하여 상위 함수 중 가장 가까운 화살표 함수가 아닌 함수의 `this`를 참조한다.

  ```javascript
  const obj = { x: 10 };
  (function(){
      const fn = () => () => console.log(this);
      fn()();
  }).call(obj); // { x: 10 }
  ```

- 전역 함수의 상위 스코프는 전역이며, 전역에서 `this`는 전역 객체이므로 전역에 생성한 화살표 함수의 `this`는 전역 객체를 가리킨다.

  ```javascript
  const fn = () => console.log(this);
  
  fn();	// window;
  ```

- 객체 리터럴에서 프로퍼티에 할당한 화살표 함수는 전역 `this`를 참조한다.

  ```javascript
  const obj = {
      normal() {
          console.log(this);
      },
      arrow: () => console.log(this),
  };
  
  obj.normal();	// {normal: ƒ, arrow: ƒ}
  obj.arrow();	// window
  ```

- 클래스 필드에 할당한 화살표 함수의 상위 스코프는 사실상 `constructor`이다. 클래스 필드에 할당한 화살표 함수는 인스턴스 메서드라 `constructor` 내부에서 할당하는 것과 같기 때문이다. `constructor` 내부에서 `this`는 클래스가 생성할 인스턴스를 바인딩한다.

  ```javascript
  class Person {
      name = '럭스';
      hello = () => console.log(this.name);
  }
  
  class Person {
      constructor(name) {
          this.name = '럭스';
          hello = () => console.log(this.name);
      }
  }
  ```

  같은 이유로 클래스 필드에 할당한 화살표 함수 내부에서 참조한 `super`도 `constructor` 내부에서 바인딩하는 `super`를 가리킨다.

  ```javascript
  class Parent {
      name = 'world';
      hello() {
          return this.name;
      }
  }
  
  class Child extends Parent {
      hello() {
          console.log(`hello, ${super.hello()}!`);
      }
  }
  
  new Child().hello();	// hello, world!
  ```

이러한 이유로 화살표 함수는 ES6 메서드보다는 함수 정의 시점에서 `this`의 값을 렉시컬로 결정해야하는 콜백 함수에 적합하다.
