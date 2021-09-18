# Arrow Function



## 1. 기본 문법

[11.2.3 the arrow function expression](11. Functions.md) 참고



## 2. 화살표 함수가 전통적인 함수 표현과 다른 것

### 2.1 this와 super에 대한 바인딩이 없다

- 화살표 함수는 `this`를 가지지 않으며, 화살표 함수 내부에서 사용한 `this`는 화살표 함수를 둘러싸는 lexical scope의 `this`를 가리킨다.

```js
function Person(){
  this.age = 0;

  setInterval(() => {
    this.age++; // |this|는 Person 객체를 참조
  }, 1000);
}

var p = new Person();
```

- `this`는 lexical이므로, `this`에 관한 엄격 모드의 규칙(??)은 무시된다.

