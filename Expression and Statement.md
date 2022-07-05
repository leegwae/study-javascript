# Expression and Statement

## Value

- **값(value)**은 식(expression)이 평가(evaluate)되어 생성된 결과이다. 

```js
3 + 5; // 3 + 5라는 식은 평가되어 값 8을 생성한다.
```

```javascript
var sum = 3 + 5;
```

변수 `sum`에는 `3 + 5`가 평가되어 생성된 결과인 `8`이 할당된다. 즉, `3 + 5`는 할당 이전에 평가되어 값을 생성한다.



## Literal

- **리터럴(literal)**은 사람이 이해할 수 있는 문자 또는 기호를 사용하여 값을 생성하는 표기법이다.

```javascript
4;
```

`4`는 아라비아 숫자 4를 사용해  기술한 숫자 리터럴이다. 자바스크립트 엔진은 이 숫자 리터럴 `4`를 평가하여 메모리에 숫자 값 4를 생성한다.

- 자바스크립트 엔진은 코드가 실행되는 시점인 **런타임(runtime)**에 값을 평가하여 메모리에 값을 생성한다.



다른 타입의 리터럴은 [Literals](https://github.com/leegwae/study-javascript/blob/main/Literals.md) 참고



## Expression

- **식(expression; 표현식)**은 값으로 평가될 수 있는 문(statement)이다. 식은 평가되면 기존의 값을 참조하거나 새로운 값을 생성한다. 즉, **값으로 평가될 수 있는 문은 모두 식이다**.
- 리터럴은 값으로 평가되므로 식이다.

```js
var age = 24;		// 숫자 리터럴 24는 값으로 평가되므로 식이다.
var age = 20 + 4;	// 20 + 4는 값으로 평가되므로 식이다.
```

- 한편, 변수 식별자를 참조하면 변수 값으로 평가된다. 즉 식별자 참조는 식이다.

```js
age;		// 변수 식별자 age는 24라는 값으로 평가되므로 식이다.
```

- 문법적으로 값이 위치할 수 있는 자리에는 표현식도 위치할 수 있다.

```js
var x = 1 + 2;
3 + 4;
x + 4;
```

`3`번째 줄에서 왼쪽 항의 `x`는 식별자 표현식이다.



## Statement

- **문(statement; 명령문)**은 프로그램을 구성하는 기본 단위이며 최소 실행 단위다. 프로그램은 문의 집합이다.
- 문은 여러 개의 **토큰(token)**으로 구성된다. 토큰은 문법적으로 더 이상 나눌 수 없는 코드의 기본 요소이다.

```js
var sum = 1 + 2;
```

여기서는 `var`, `sum`, `=`, `1`, `+`, `2`, `+`, `;`이 토큰에 속한다.

- 문은 선언문, 할당문, 조건문, 반복문 등으로 나눌 수 있다.

```js
var x;		// 선언문
x = 13;		// 할당문
if (x > 1) { console.log(x); }		// 조건문
for (var i = 0; i < x; i++) { console.log(i); }		// 반복문
```



## Semicolon and ASI

- **세미콜론(`;`)**은 문의 종료를 나타낸다. 자바스크립트 엔진은 세미콜론을 통해 문이 종료한 위치를 파악하고 순차적으로 문을 하나씩 실행한다.
- 코드 블록(`{}`) 뒤에는 세미콜론을 붙이지 않는다. 이들은 문의 종료를 의미하는 자체 종결성(self closing)을 갖는다.
- **ASI(automatic semicolon insertion; 세미콜론 자동 삽입 기능)**: 자바스크립트 엔진은 소스코드를 해석할 때 문의 끝을 예측하여 세미콜론을 자동으로 붙여준다. 따라서 코드를 작성할 때 세미콜론은 생략할 수 있다.



## Expression and Statement

- 모든 문이 표현식인 것은 아니다. 문은 표현식에 속한다.

```js
var x;
```

변수 선언문은 값으로 평가될 수 없으므로 식이 아니다.

```js
x = 1 + 2;
```

할당문은 값으로 평가될 수 있으므로 식이다. 따라서 값처럼 사용할 수 있다.

```js
var y = x = 1 + 2;
```

`1+2`는 `3`으로 평가되어 `x`에 할당되고, `x`는 `3`으로 평가되어 `y`에 할당된다.



### Executing statement in chrome dev console

- 크롬 개발자 도구에서 표현식이 아닌 문을 실행하면 `undefined`를 출력하며 이것을 완료 값이라고 한다. 완료 값은 평가 결과가 아니므로 할당하거나 참조할 수 없다.
- 크롬 개발자 도구에서 표현식인 문을 실행하면 평가된 값을 반환한다.