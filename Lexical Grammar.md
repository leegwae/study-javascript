# 03. Lexical Grammar

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Lexical_grammar

- ECMAScript 스크립트는 왼쪽에서 오른쪽으로 분석되며, 일련의 input element들은 토큰(tokens), 제어 문자(control characters), 개행 문자(line terminators), 주석(comments) 혹은 공백(white space)으로 변환된다.



## 3.1 제어 문자

제어 문자(control characters)는 텍스트의 해석을 제어하는 데 사용된다.



## 3.2 공백 문자

공백 문자(white spaces)는 소스의 가독성을 높이고 토큰을 구분한다.



## 3.3 개행 문자

개행 문자(line terminators)는 소스의 가독성을 높인다.



## 3.4 주석

```javascript
// 한 줄 주석

/*
 * 여러 줄 주석
 */
```



## 3.5 토큰

https://262.ecma-international.org/12.0/#sec-syntactic-and-lexical-grammars

> Input elements other than white space and comments form the terminal symbols for the syntactic grammar for ECMAScript and are called ECMAScript *tokens*. **These tokens are the reserved words, identifiers, literals, and punctuators of the ECMAScript language.** 
>
> 5.1.2 The Lexical and RegExp Grammars



- **토큰(tokens)**은 프로그램을 구성하는 최소 단위이다.
- ECMAScript에서는 다음이 토큰에 속한다.
  - **예약어(reserved words)**: 키워드(keywords)라고도 한다.
    - 식별자로 사용되지 않는 *IdentifierName*
  - **식별자(identifiers)**
    - 예약어로 사용되지 않는 *IdentifierName*
    - 변수나 함수의 이름으로 사용된다.
    - [[4.1 식별자] 참고](./04. Variable and Constant.md)
  - **리터럴(literals)**
  - **punctuators**: 구분자(separator)라고도 한다.

