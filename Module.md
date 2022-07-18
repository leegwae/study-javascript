# Module

자바스크립트의 모듈에 대하여 아주 간단하게 알아본다.



## 모듈이란

- **모듈(module)**은 재사용 가능한 코드의 조각이다. 일반적으로 기능을 기준으로 파일 단위로 분리한다.
- 기본적으로 모듈은 애플리케이션에서 독립된 요소로, 자신만의 **파일 스코프(모듈 스코프)**를 가진다. 파일 스코프 안의 변수, 함수 등은 다른 모듈에서 접근할 수 없다.
- 모듈을 자신의 파일 스코프에 있는 변수, 함수 중 일부를 모듈 기능 export를 통해 공개한다.
- 모듈 사용자(module consumer)는 모듈이 export한 변수, 함수 중 일부를 자신의 파일 스코프로 import한다.



## 자바스크립트의 모듈

- 자바스크립트는 ES6부터 모듈 시스템을 표준으로 등재했다. 이를 **ESM(ES6 모듈)**이라고 한다.
- 모듈 시스템은 크게 CommonJS와 AMD 진영으로 나뉜다.



### Node.js에서 ESM 사용하기

Node.js는 CommonJS를 기반으로 독자적인 모듈 시스템을 사용한다. 따라서 ESM을 사용하기 위해 설정이 필요하며, 두 가지 방법이 있다.

- 파일 확장자를 `.mjs`로 바꾸기
- `package.json`의 `type` 필드 수정하기



#### 파일 확장자 바꾸기

모듈 시스템을 사용하려는 파일들의 확장자를 `.js`에서 `.mjs`로 바꾼다.

- 디렉토리 구조

```
// 바꾸기 전
|--루트
|----foo.js
|----index.js
```

```
// 바꾼 후
|--루트
|----foo.mjs
|----index.mjs
```

- 소스코드

```js
// foo.mjs
export default function foo() {
    console.log('hello world');
}
```

```js
// index.mjs
import foo from './foo.mjs';

foo();
```



#### `package.json` 수정하기

이 경우 모든 파일에 ESM을 적용할 수 있어 확장자를 바꾸지 않아도 된다.

- 디렉토리 구조

```
|--루트
|----foo.js
|----index.js
```

- `package.json` 수정

```json
{
	"type": "module"
}
```

- 소스코드

```js
// foo.js
export default function foo() {
    console.log('hello world');
}
```

```js
// index.js
import foo from './foo.js';

foo();
```



### ESM의 모듈 스코프

ESM은 파일 자체의 독자적은 모듈 스코프를 제공한다. 따라서 `var` 키워드로 선언한 변수는 전역 변수가 아니다.



## 내보내기

`export` 키워드를 사용한다.



### default exports

모듈은 `default export`문을 단 한 개 가질 수 있다.

- 기본적으로 식별자 없이 하나의 값을 내보낸다.

```js
export default () {};
```

```js
export default function foo () {}
```

- `var`, `let`, `const` 키워드로 선언할 때 `default`를 함께 사용할 수 없다. 다음과 같이 선언 후 따로 `export default`문을 작성한다.

```js
// index.js
const foo = () => {};

export default foo;
```



### named exports

모듈은 여러 개의 `export`문을 가질 수 있다.

```js
// index.js
export const VALUE = {};
export const foo = () => {};
```



## 불러오기

### default import 가져오기

```js
import foo from './index.js';
```



### 모듈 가져오기

```js
import { VALUE, foo } from './index.js';
```







## 참고

- [모듈 사용하기 import / export 완벽 정리](https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EB%AA%A8%EB%93%88-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-import-export-%EC%A0%95%EB%A6%AC)
- [Node.js에서 ES 모듈(import/export) 사용하기](https://www.daleseo.com/js-node-es-modules/)
- 모던 자바스크립트 Deep Dive 48장: 모듈