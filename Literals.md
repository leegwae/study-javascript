# Literals

JavaScript에서 값을 나타내기 위해 리터럴을 사용한다.



## Numeric literals

### Integer literals

정수는 10진, 16진, 8진, 2진수로 표현될 수 있다.

| 진수   | 표현                       |
| ------ | -------------------------- |
| 10진수 | 접두사 없음                |
| 16진수 | 접두사 `0x` 혹은 `0X`      |
| 8진수  | 접두사 `0` 혹은 `0o`, `0O` |
| 2진수  | 접두사 `0b` 혹은 `0B`      |

```js
const integer = 15;		// 10진수
const hexa = 0x1123;	// 16진수
const oct = 015;		// 8진수
const bin = 0b11;		// 2진수
```



### floating point literals

[부동소수점](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Grammar_and_types#%EB%B6%80%EB%8F%99_%EC%86%8C%EC%88%98%EC%A0%90_%EB%A6%AC%ED%84%B0%EB%9F%B4)



## String literals

```js
'BLUE';
"BLUE";
```

- `''` 혹은 `""`로 문자들을 감싸 만든다.



## Boolean literals

```js
true
false
```

- `boolean` 타입은 리터럴 값으로 `true`와 `false`만을 가진다.



## Null literals

```js
null
```



## undefined literals

```js
undefined
```



## Object literals

```js
{ name: 'lana', age: 10 }
```

- 객체는 프로퍼티들을 가지며, 프로퍼티는 키와 값이 매핑된 것이다.
- 프로퍼티들을 `{}`로 묶어 표현한다.



## Array literals

```js
const COLORS = [ 'Blue', 'Yellow', 'Purple' ];
```

- 배열은 요소들을 가지며, 요소는 식이다.
- 배열 요소를 `[]`로 묶어 표현한다.
- 배열 리터럴은 배열 객체이다.

```js
const COLORS = [ 'Blue', , 'Purple' ];
```

- ` , `은 그 위치의 요소의 값을 `undefined`로 지정한다.



### Escape Sequence

```js
'Hello\n world!'
```

- 문자열에 특수 문자를 포함할 수 있다.

| 문자 | 뜻                          |
| ---- | --------------------------- |
| `\0` | Null Byte                   |
| `\b` | Backspace                   |
| `\f` | Form feed                   |
| `\n` | New line                    |
| `\r` | Carriage return             |
| `\t` | Tab                         |
| `\v` | Vertical tab                |
| `\'` | Apostrophe 혹은 작은 따옴표 |
| `\"` | 큰 따옴표                   |
| `\\` | 백슬래시                    |



## Function literals

```js
function() {}
```



## Regular Expression literals

[정규표현식](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)



## Template literals

```js
const COLOR = 'BLUE';
console.log(`Color: ${COLOR}`);
```

- ECMAScript 2015

