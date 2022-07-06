# Nullish Coalescing

**널 병합(nullish coalescing) 연산자 `??`**는 ES11에 도입되었다. 객체가 nullish(`null` 혹은 `undefined`)라면 적합한 값을 재할당하고자 할 때 유용하다.



## 1. 도입 이전

- 객체 `b`가 객체 `a`와 같은 데이터를 참조하도록 하고 싶다. 한편, `a`가 `null` 혹은 `undefined`라면 임의의 값 `hello`로 초기화하고 싶다. 보통 논리 연산자 `||`와 단축 평가로 참조가 Falsy인지 확인하고 임의의 초기값을 할당하곤 했다.

```js
let a;
let b = a || 'hello';
console.log(b);		// 'hello'
```

- 다만, `||`는 왼쪽 피연산자가 Falsy라면 오른쪽 피연산자를 반환한다. 즉 `a`가 nullish인 경우에만 `hello`로 초기화하고 싶을 뿐 `false`나 `0`과 같은 nullish 아닌 Falsy인 경우에는 해당 값을 `b`에 할당하고 싶다면 `||`을 사용하는 것은 적절하지 않다.

```js
let a = false
let b = a || 'hello';	// 기대값은 a의 값 false가 b에 할당되는 것
console.log(b);		// 'hello'
```

`a`의 값은 `false`로 Falsy이기 때문에`b`에는 왼쪽 피연산자의 값 `'hello'`가 할당되어 기대되는 값인 `false`가 `b`에 할당되지 않았다.



## 2. 널 병합 연산자란 무엇인가

- 널 병합 연산자 `??`는 왼쪽 항의 피연산자가 nullish(`null` 혹은 `undefined`)이면 오른쪽 항의 피연산자를 반환한다. 그렇지 않다면, 단축 평가를 사용하여 오른쪽 항의 피연산자를 평가하지 않고 왼쪽 항의 피연산자를 반환한다.

```js
false ?? 'hello';	// false
```



## 3. 널 병합 연산자를 논리 AND와 OR과 함께 사용하기

`&&`과 `||`를 `??`과 직접적으로 체이닝할 수 없다.

```js
null || undefined ?? 'foo';	// SyntaxError: Unexpected token '??'
```

괄호와 함께 명시하면 괜찮다.

```js
(null || undefined)?? 'foo';	// 'foo'
```

