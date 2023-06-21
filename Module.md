# Module

일반적으로 모듈(module)은 독립적인 스코프를 가지는 코드 조각으로, 대개 파일 단위로 분리한다. 모듈 시스템이 있는 언어에서 모듈은 자신의 스코프에 있는 함수나 변수 일부를 외부에서 사용할 수 있도록 제공할 수 있다. 다른 모듈에서 제공하는 함수와 변수를 가져와 사용할 수도 있다.

## 모듈 시스템 도입 이전의 자바스크립트

자바스크립트는 브라우저에 출력할 웹 페이지를 보조하기 위해 탄생하였다. 따라서 단순한 기능을 구현하기 위해 사용되어 스크립트의 크기도 작고 스크립트를 분리할 필요도 없었다. 하지만 시간이 지날수록 사용자에게 제공하는 것은 단순한 문서가 아니라 규모가 크고 구조가 복잡한 자바스크립트 애플리케이션에 가까워졌다.

이런 상황에서 효과적인 개발을 위해 `파일의 분리`를 통한 관심사의 분리는 필수이다. 그러나 이때의 자바스크립트에는 독자적인 스코프를 가지는 모듈 시스템이 없었기 때문에 로드된 자바스크립트 파일은 전역 스코프를 공유했다. 

```html
<html>
    <script src="foo.js"></script>
    <script src="bar.js"></script>
</html>
```

모듈이 독자적인 스코프를 가지지 않고 전역 스코프를 공유하면 다음과 같은 문제가 발생할 수 있다.

1. 전역 스코프를 공유하므로 이름 충돌이 발생할 수 있다. 예를 들어 `foo.js`와 `bar.js`에 선언한 식별자의 이름이 같은 경우 후자가 전자를 덮어쓴다.
2. 의존성이 있다면 모듈 로드 순서를 고려해야한다. 예를 들어 `foo.js`가 `bar.js`의 식별자를 참조하고 있다면 `bar.js`를 `foo.js`보다 먼저 로드해야한다.



## 모듈 시스템의 등장

> **모듈 로더(module loader)**란 무슨 일을 하는가? 런타임에 모듈 로더는 모듈을 실행하기 전 모듈이 필요로 하는 모든 의존성을 불러오고 실행한다.
>
> https://www.typescriptlang.org/docs/handbook/modules.html

### CommonJS와 AMD

모듈 시스템을 명세화하려는 두 집단 CommonJS와 AMD가 등장한다.

**CommonJS**는 브라우저가 아닌 환경, 곧 서버사이드 환경에서의 자바스크립트 개발을 전제로 시작했다. 모든 모듈은 로컬 디스크에 저장되어있으므로 모듈 로더는 모듈을 동기적으로 로드한다. 서버사이드 런타임 Node.js의 모듈 시스템이 CommonJS 명세에 기반하고 있다. 한편 브라우저는 네트워크 요청을 통해 모듈을 비동기적으로 가져오므로, 동기적으로 동작하는 CommonJS 스타일을 사용할 수 없었다. 이를 해결하기 위해 CommonJS로 작성된 모듈을 브라우저에서 사용할 수 있도록 번들하는 모듈 번들러 Browserify도 탄생했다.

**AMD(Asynchronous Module Definition)**는 CommonJS와 합의하지 못하고 독립한 집단으로, 비동기적으로 모듈을 불러오는 방식을 채택했다. 브라우저와 서버사이드 환경 모두에서 운용가능하다. 자바스크립트 모듈 로더 RequireJS가 AMD 명세에 기반한다. 널리 사용되지 않았으나 ESM의 `import` 구문에 영향을 미친다.

### UMD

**UMD(Universal Module Definition)**은 여러 모듈 시스템(전역 모듈, CommonJS, AMD)의 호환을 제공하는 패턴이다. 내부적으로 모듈 시스템을 조건문으로 분기하여 처리한다.

### ESM

**ESM(ECMAScript Module)**은 ES6에 발표된 모듈 시스템으로 자바스크립트의 표준 모듈 시스템이다. 모듈의 동기와 비동기적 로드를 모두 지원한다.

이와 같은 과정을 거쳐, 현재는 서버사이드에서 주로 사용되는 Node.js 런타임의 모듈 시스템이 기반한 CommonJS와 대부분의 모던 브라우저가 지원하는 네이티브 자바스크립트 모듈 시스템인 ESM이 널리 사용되고 있다.

## CommonJS

Node.js 런타임을 기준으로 CommonJS를 알아보자.

Node.js의 모듈 시스템에서 각각의 자바스크립트 파일은 독립적인 모듈이다. Node.js는 프로그래머가 작성한 모듈의 코드를 실행하기 전, 아래와 같은 래퍼로 모듈을 감싼다. 때문에 최상위에 선언한 식별자들은 전역 객체에 바인딩되지 않고 모듈 스코프에 속하게 된다.

```javascript
(function(exports, require, module, __filename, __dirname) {
	// 실제 모듈 코드는 여기서 실행된다.
});
```

 한편 Node.js는 `module` 객체를 통해 모듈 시스템을 구현하고 있다.

### `module` 객체

각각의 모듈에서 `module` 자유 변수는 해당 모듈을 나타내는 객체를 참조한다. 각각의 모듈에 지역적이다.

### 내보내기

`module.exports`에 값을 할당하여 값을 내보낸다.

#### default export

`module.exports`에 객체를 할당하면 해당 객체를 내보낼 수 있다.

```javascript
module.exports = {
    foo: 'foo',
    bar: 'bar',
};
```

`exports`는 `module.exports`를 참조하는 변수이다. `exports.프로퍼티`에 내보내고자 하는 값을 할당하는 방식을 사용하여 객체를 내보낼 수 있다.

```javascript
exports.foo = 'foo';
exports.bar = 'bar'
```

하지만 `exports`에 값을 할당하면 더이상 `module.exports`를 참조하지 않게 된다. 즉, 내보내지 않는다.

```javascript
// 💥 module.exports에 값이 할당되지 않고 다만 식별자 exports에 새로운 객체를 할당한 것과 같다.
exports = {
    foo: 'foo',
    bar: 'bar',
};
```

#### named export

`module.exports.프로퍼티`에 내보내고자 하는 값을 할당하는 방식을 사용하여 객체를 내보낼 수도 있다. 아래 예시는 첫번째 예시와 같다.

```javascript
module.exports.foo = 'foo';
module.exports.bar = 'bar'
```

`module.exports`에 원시값을 할당하면 해당 원시값을 내보낼 수 있다.

```javascript
module.exports = 'hello';
```

### 불러오기

`require` 함수에 불러올 CommonJS 모듈의 경로를 명시하여 해당 모듈이 내보낸 값을 불러온다. Node.js가 모듈 경로를 해석하는 방식에 따라 어떤 경우는 확장자를 생략할 수 있다. `require`를 호출하면 내부적으로 CommonJS 모듈 로더가 동기적으로 CommonJS 모듈을 불러온다.

#### default import

```javascript
// hello.js
module.exports.hello = 'hello';

// index.js
const m = require('./hello');
console.log(m.hello);
```

#### named import

```javascript
// hello.js
module.exports.hello = 'hello';

// index.js
const { hello } = require('./hello');
console.log(hello);
```



## ECMAScript Module

브라우저 환경을 기준으로 ESM에 대해 알아보자.

ESM 모듈은 파일 단위이며 각각의 파일이 독립적인 모듈 스코프를 가진다. 대부분의 모던 브라우저는 ESM을 지원하고 있으나 기본값은 아니다. `<script>` 태그에 `type="module"`로 지정해야 ESM으로 취급한다.

```html
<script type="module" src="./index.js">
	/* 독자적인 모듈 스코프를 가진다. */
</script>
<script type="module">
    /* 독자적인 모듈 스코프를 가진다. */
    var foo = 'foo';
</script>
```

### 내보내기

`export`문을 사용하여 원하는 값을 내보낼 수 있다. 

#### named export

named export는 모듈 내에서 정의한 식별자들을 지정한 이름으로 내보내는 것이다. 하나의 ESM 모듈은 여러 개의 named export를 할 수 있다.

`export 선언문` 형태로 식별자를 선언과 동시에 내보낼 수 있다. 

```javascript
export const hello = 'hello';
export function world() {}
```

`export { 식별자1, ... }` 형태로 선언 후 내보낼 수도 있다. 이때 `as`를 사용하여 alias를 지정할 수 있다.

```javascript
const hello = 'hello';
const world = 'world';

export { hello, world as foo };
```

주의할 점은, `export {}`가 `export 선언문`처럼 작동하진 않는다는 것이다.

```javascript
export { hello, world }
export function foo {}
```

위 모듈을 가져올 때는 `hello`, `world`, `foo`로 가져오지 `hello`와 `world`를 프로퍼티로 가진 어떤 객체와 `foo`로 가져오지 않는다.

#### default export

default export는 모듈 내에서 정의한 식별자를 기본값으로 내보내는 것이다. 단, 하나의 ESM 모듈은 한 개의 default export를 할 수 있다.

`var`, `let`, `const`로 선언한 식별자는 선언 후에 내보낼 수 있다.

```javascript
const hello = 'hello';
export default hello;
```

그 외의 식별자는 선언과 동시에 내보낼 수 있다.

```javascript
export default function foo() {}
```

`export default 식별자`는 사실 `export { 식별자 as default }`의 syntax sugar이다. 즉, `default`라는 이름으로 지정해서 보내는 것이다.

```javascript
const hello = 'hello';
export { hello as default };
```

### 불러오기

`import`문에 불러올 ESM 모듈의 경로를 명시하여 해당 모듈이 내보낸 값을 불러온다. 이때 모듈의 경로는 반드시 확장자를 포함해야한다. `import`문을 실행하면 내부적으로 ESM 모듈 로더가 비동기적으로 ESM 모듈을 불러온다. 

#### named import

named import는 named export된 식별자를 해당 모듈에서 지정한 이름으로 불러온다. 이때 `as`를 사용하여 alias를 지정할 수 있다.

```javascript
// module.js
const foo = 1;
const bar = 2;

export { foo, bar as baz };

// index.js
import { foo, baz as qux } from './module.js';
```

`export default 식별자`는 `export { 식별자 as default }`의 syntax sugar이므로 default export를 다음과 같이 불러올 수 있다.

```javascript
// module.js
const foo = 1;
export default foo;

// index.js
import { default } from './module.js';
```

#### namespace import

namespace import는 모든 export를 프로퍼티로 가진 `Module` 타입의 객체를 가져온다.

```javascript
// module.js
const foo = 1;
export const bar = 2;

export default foo;

// index.js
import * as m from './module.js';

console.log(m.default);	// 1
console.log(m.bar);	// 2
console.log(m.foo);	// undefined
```

#### default import

default import는 default export한 값을 가져온다. 원하는 이름으로 지정할 수 있다.

```javascript
// module.js
const foo = 1;
export default foo;

// index.js
import bar from './module.js';
```

default export하지 않았는데 default import를 사용하면 오류가 발생한다.

```javascript
// module.js
export const foo = 1;

// index.js
import foo from './module.js';
```

```
Uncaught SyntaxError: The requested module './module.js' does not provide an export named 'default'
```

오류를 읽어보면, `module.js`가 `default`라는 이름으로 export name하지 않았다는 것을 알 수 있다. 이것은 `import 식별자 from '모듈이름'`이 `import { default as 식별자 } from '모듈이름'`의 syntax sugar이기 때문이다.

```javascript
// module.js
const foo = 1;
export default foo;

// index.js
import { default as foo } from './module.js';
```

#### 사이드 이펙트만 가져오기

```javascript
import './module.js';
```

모듈은 여러 곳에서 참조해도 단 한 번만 실행된다. 따라서 모듈에서 무언가를 가져오지 않고 스크립트를 실행하기만 할 목적이라면 위와 같이 `import '모듈경로'`로 적는다.

### 불러오고 내보내기

`export ... from`문은 불러온 식별자를 바인딩 없이 바로 내보낸다.

#### default export를 불러오고 내보내기

default export를 named export한다.

```javascript
// foo.js
export default function foo() {}

// module.js
export foo from './foo.js';

// index.js
import { foo } from './module.js';
```

`export foo from './foo.js'`는 다음과 같기 때문에 가능하다.

```javascript
import foo from './foo.js';
export foo;
```

default export를 default export한다.

```javascript
// foo.js
export default function foo() {}

// module.js
export { default } from './foo.js';
// export { default as default } from './foo.js'; 도 가능하다.

// index.js
import foo from './module.js';
```

#### named export를 불러오고 내보내기

named export를 named export한다.

```javascript
// foo.js
export { f1, f2 };

// module.js
export * from './foo.js';

// index.js
import { f1, f2 } from './module.js'
```

원하는 named export만 지정하여 named export할 수도 있다.

```javascript
// foo.js
export { f1, f2 };

// module.js
export { f1 } from './foo.js';

// index.js
import { f1 } from './module.js'
```

named export를 default export할 수는 없다. 

```javascript
// foo.js
export { f1, f2 };

// module.js
export { f1 as default } from './foo.js';	// SyntaxError: Identifier expected
```

원래의 모듈에서 default export는 명시적으로 내보내지 않는다면 export되지 않는다.

```javascript
// foo.js
export { f1, f2 };
export default function foo() {}

// module.js
export * from './foo.js';

// index.js
import * as M from './module.js';

console.log(M.default);	// undefined
```

#### namespace를 불러오고 내보내기

`Module` 타입의 객체로 불러오고 named export할 수 있다. 이때는 원래의 모듈의 default export는 해당 네임스페이스의 `default` 프로퍼티로 들어간다.

```javascript
// foo.js
export { f1, f2 };
export default foo() { console.log('hello'); }

// module.js
export * as M from './foo.js';

// index.js
import { M } from './module.js'

M.default();	// hello
```



## CommonJS와 ECMAScript Module의 차이점

- CommonJS는 서버사이드 환경을 전제로 하여 본질적으로 동기적으로 작동한다. ESM은 브라우저 환경을 고려하여 동기와 비동기 모두를 지원한다.

- CommonJS는 동적으로 모듈을 내보내고 불러올 수 있다. ESM은 동적으로 모듈을 내보내고 불러올 수 있다.

```javascript
/* CommonJS */
// 동적으로 모듈 불러오기
const module = require('./${moduleName}');

// 동적으로 모듈 내보내기
if (true) module.exports.hello = 'hello';
```

```javascript
/* ECMAScript Module */
const moduleName = 'module';
import { hello } from `./${moduleName}.js`; // Uncaught SyntaxError: Unexpected template string

if (true) {
    export const hello = 'hello';	// Uncaught SyntaxError: Unexpected token 'export'
}
```



## CommonJS와 ECMAScript Module은 호환 불가능한가?

브라우저 환경은 CommonJS를 지원하지 않으므로 브라우저에서는 CommonJS를 사용할 수 없다. 하지만 Node.js는 v14부터 안정적으로 ESM의 사용을 지원하고 있다. 달리 말하여 Node.js는 CommonJS와 ESM을 모두 실행할 수 있을 뿐만 아니라 상호 운용성도 지원한다.

Node.js의 ESM 지원 역사를 아주 간략히 하자면 다음과 같다.

1. v8.9.0에 `--experimental-modules` 플래그와 함께 지원 시작
2. v12에 기존에 지원하던 기능 고도화하고 새로운 기능 추가 
3. v13.2.0 이후부터는 플래그 없이 지원 시작. 단 `experimentalWarning: The ESM module loader is experimental.` 경고를 콘솔에 출력.
4. v14 이후부터는 경고 없이 안정적으로 ECMAScript 모듈의 사용을 지원 중

관심이 있다면 [Node.js의 공식 Medium 블로그](https://nodejs.medium.com/)의 텍스트들을 읽어보는 게 좋겠다.

## Node.js는 어떻게 모듈 시스템을 결정하는가?

Node.js는 다음을 기준으로 자바스크립트 파일을 CommonJS 혹은 ESM으로 해석한다.

### CommonJS로 해석되는 자바스크립트 파일

`node` 커맨드의 첫번째 인자나, `import`문과 `import()`식, `require()`식에 참조된 JavaScript 파일이 다음 조건을 만족한다면 CommonJS 모듈로 해석한다.

1. `.cjs` 확장자를 가진 파일
2. `.js` 확장자를 가졌으며 가장 가까운 부모 `package.json`의 `"type"` 필드가 `"commonjs"`인 파일

### ESM으로 해석되는 자바스크립트 파일

`node` 커맨드의 첫번째 인자나, `import`문과 `import()`식에 의해 참조된 JavaScript 파일이 다음 조건을 만족한다면 ECMAScript 모듈로 해석한다.

1. `.mjs` 확장자를 가진 파일
2. `.js` 확장자를 가졌으며 가장 가까운 부모 `package.json`의 `"type"` 필드가 `"module"`인 파일

> `pakcage.json`이란? Node.js 런타임에서 사용 가능한 모듈을 저장한 공개 레지스트리 npm(node package module)이 패키지 의존성을 관리할 때 사용하는 파일이다. 일종의 설정 파일로서 패키지의 이름과 버전 등 패키지에 관련한 정보를 저장한다. [Basics of Dependency Management](https://github.com/leegwae/study-javascript/blob/main/Basics%20of%20Dependency%20Management.md)를 참고한다.

## Node.js에서 CommonJS와 ESM 상호 운용하기

Node.js에서는 CommonJS가 ESM을 불러올 수 있고, ESM도 CommonJS를 불러올 수 있다. 단, CommonJS의 동기적 본질과 ESM의 비동기적 본질 때문에 몇 가지 제한이 있다. 

- `import`문은 ESM이 CJS나 ESM을 불러올 때 사용할 수 있다.
- `import()`식은 CommonJS나 ESM이 ESM을 불러올 때 사용할 수 있다.
- `require()`식은 CommonJS이 CommonJS를 불러올 때 사용할 수 있다. CJS는 top-level `await`를 지원하지 않으므로 CommonJS 로더를 사용하는 `require()`은 top-level `await`를 사용하는 ESM을 CJS로 변환할 수 없다.

### `import()`로 ESM 불러오기

```javascript
// hello.mjs
export const hello = 'hello';
```

CommonJS는 동적 `import`를 사용하여 ESM을 불러올 수 있다. 단, CJS는 top-level `await`를 지원하지 않으므로 `async` 즉시 실행 함수로 감싸주어야한다.

```javascript
// index.cjs
(async () => {
	const { hello } = await import("./hello.mjs");
	console.log(hello);
})();
```

ESM도 동적 `import`를 사용하여 ESM을 불러올 수 있다. ESM은 ES2022부터 top-level `await`를 지원하고 있다.

```javascript
// index.mjs
const { hello } = await import("./hello.mjs");
console.log(hello);
```

`require()`식으로 ESM을 불러오려고 시도하면 오류가 발생한다.

```
// index.cjs
const { hello } = require("./hello.mjs");


// Error [ERR_REQUIRE_ESM]: require() of ES Module 경로\hello.mjs not supported.
// Instead change the require of 경로\hello.mjs to a dynamic import() which is available in all CommonJS modules.
```

CJS에서는 동적 `import()`로 ESM을 가져오라고 말하고 있다.

### `import`문으로 CJS 불러오기

ESM는 `import`문을 사용하여 CJS를 불러올 수 있다. 단, default export된 CJS를 named import할 수 없다.

```javascript
// hello.cjs: default export
module.exports = {
	hello: "hello",
};

// index.mjs: named import
import { hello } from "./hello.cjs";
```

```
SyntaxError: Named export 'hello' not found. The requested module 
'./hello.cjs' is a CommonJS module, which may not support all module.exports as named exports.
CommonJS modules can always be imported via the default export, for example using:

import pkg from './hello.cjs';
const { hello } = pkg;
```

default export는 default import를 사용하라고 말하고 있다.

```javascript
import m from "./hello.cjs";
const { hello } = m;
```

named export는 named import/default import할 수 있다.

```javascript
// hello.cjs: named export
module.exports.hello = 'hello';

// index.mjs: named import
import { hello } from "./hello.cjs";
```

> For better compatibility with existing usage in the JS ecosystem, Node.js in addition attempts to determine the CommonJS named exports of every imported CommonJS module to provide them as separate ES module exports using a static analysis process.
> https://nodejs.org/api/esm.html#commonjs-namespaces

이것이 가능한 이유는, Node.js가 호환성을 위해 default export와 달리 모든 import export를 정적 분석하여 named export할 수 있도록 지원하고 있기 때문이다.

한편 `module.exports`는 기본적으로 ESM 네임스페이스의 `default`에 복사된다.

```javascript
// hello.cjs
exports.value = 'hello';

import { value } from "./hello.cjs";
console.log(value); // Prints: 'hello'

import cjs from "./hello.cjs";
console.log(cjs); // Prints: { value: 'hello' }

import * as m from "./hello.cjs";
console.log(m); // Prints: [Module] { default: { value: 'hello' }, value: 'hello' }
```

## CommonJS와 ECMAScript Module 중 무엇을 사용할 것인가?

CommonJS에서 `module.exports`와 `require`는 동적으로 사용할 수 있으므로 런타임에 의존성을 파악할 수 있다. ESM의 `import`와 `export`는 정적이므로 빌드 타임에 정적 분석할 수 있다(ES2020부터 ESM은 동적 `import()`를 지원하고 있다). 고로 동적인 CommonJS에 비하여 정적인 ESM은 트리 쉐이킹이 더 쉽다.

또한 CommonJS의 `module.exports`와 `require`는 식별자로서 재정의가 가능하지만 ESM의 `import`와 `export`는 키워드로서 재정의가 불가능하므로 더 안전하다.

위와 같은 이유로 ESM을 사용하는 것을 권장한다.

## 그런데 나는 이때까지 별 생각 없이 잘 사용했던 것 같아요

CommonJS와 ESM의 본질적인 차이 때문에 서로를 상호 운용하는데 제약이 많은데 이때까지 별 생각 없이 잘 사용해왔을 수도 있다. 브라우저에서는 분명 CJS를 못쓴다고 했는데 CJS 패키지를 잘 사용해왔을 수도 있다. 또한 ESM은 `import`에서 모듈 확장자를 생략할 수 없다고 했으나 여태 잘 생략해왔을 수도 있다.

그것은 트랜스파일러나 번들러를 사용해왔기 때문일 것이다. 트랜스파일러와 번들러에 대해서는 [번들러]를 참고한다.



## 참고

- 모던 자바스크립트 Deep Dive 48장: 모듈
- https://d2.naver.com/helloworld/12864
- https://nodejs.org/api/modules.html
- https://nodejs.org/api/esm.html#
- https://nodejs.org/api/packages.html
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/export
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/import
- https://youtu.be/mee1QbvaO10
- https://toss.tech/article/commonjs-esm-exports-field
- https://web.dev/commonjs-larger-bundles/
- https://ui.toast.com/weekly-pick/ko_20190418
- https://medium.com/naver-place-dev/javascript-%EB%B2%88%EB%93%A4%EB%9F%AC%EC%9D%98-%EC%9D%B4%ED%95%B4-1-javascript-%EB%AA%A8%EB%93%88-d68c7e438fcd
- https://redfin.engineering/node-modules-at-war-why-commonjs-and-es-modules-cant-get-along-9617135eeca1
- https://yozm.wishket.com/magazine/detail/1261/
- https://yozm.wishket.com/magazine/detail/1620/



# ES Module Deep Dive



**How ES modules work**

모듈로 개발하면 의존성 그래프를 빌드한다. 의존성 연결은 `import`에서 시작한다. import문들로 런타임은 어떤 코드를 불러와야하는지 알 수 있다. 그래프에 대한 진입점으로 파일을 제공할 수 있다. 진입점부터 import문을 따라가며 다른 코드를 찾는다.

파일 자체는 브라우저가 못쓴다. 파일은 모듈 레코드라는 자료구조로 파싱되야한다. 파싱을 통해 파일에서 무슨 일이 일어나는지 브라우저가 알 수 있다.

파일(브라우저가 이해불가능) -파싱-> 모듈 레코드(브라우저가 이해가능)

그 다음 모듈 레코드를 모듈 인스턴스로 변환한다. 모듈 인스턴스는 코드(일련의 명령어)와 상태(변수 값)의 조합이다. 

파일 -파싱-> 모듈 레코드 -변환-> 모듈 인스턴스

모듈 마다 모듈 인스턴스를 만들어야한다. 모듈 로딩은 진입점부터 모듈 인스턴스로 이루어진 전체 그래프를 만드는 과정이다.

ES 모듈에서 모듈 로딩은 세 단계로 이루어진다.

1. 구성(construction). 모든 파일을 찾고, 다운로드하고, 파싱해서 모듈 레코드로 만든다.
2. 인스턴스화(instantiation): export된 값을 채우기 위한 메모리 공간을 찾는다. export와 import 지점을 메모리 공간에 연결한다. 링킹이라고 한다.
3. 평가(evaluation): 코드를 실행하여 실제 변수값으로 메모리 공간을 채운다.

ES 모듈은 비동기적이라고 말한다. 모듈 로딩이 세 단계로 나뉘고 각 단계가 독립적으로 실행될 수 있기 때문이다. 

CommonJS에서는 없는 비동기적인 사양이다. CommonJS는 모듈과 의존성을 로딩하고 인스턴스화하고 평가하는 것이 한 번에 이루어진다. (단계로 나누어져있지 않고 한 과정이라는 뜻)

그러나 각각의 단계는 비동기적으로 이루어질 수도 있다. 무엇을 로딩하느냐에 달려있다. 왜냐면 모든 것이 ES 모듈을 따르고 있진 않기 때문이다. 모듈 로딩은 실제로 두 개의 작업인데 서로 다른 스펙에 의해 처리된다.

- [ES 모듈 스펙](https://tc39.es/ecma262/#sec-modules)은 어떻게 파일을 모듈 레코드로 파싱하는지, 어떻게 모듈을 인스턴스화하고 평가하는지 명시한다. 파일을 가져오는 방법은 다루지 않는다.
- 파일을 fetch하는 것은 로더이다. 로더에 대한 명세는 다양한데, 브라우저의 경우 [HTML 스펙](https://html.spec.whatwg.org/#fetch-a-module-script-tree)을 따른다. 파일을 어떻게 로딩할 것인지도 제어한다. ES 모듈 메서드(`ParseModule`, `Module.Instantiate`, `Module.Evaluate`)를 호출한다(?? ES 모듈 메서드라고 부른다). 이들은 JS 엔진의 문자열을 제어하는 일종의 인형사이다.

각각의 단계에 대해 알아보자

**Construction**

세 단계있다.

1. 모듈 경로 해석(module resolution): 어디서 모듈이 든 파일을 다운로드받아야하는지 파악한다
2. 파일을 fetch한다: URL로부터 파일을 다운로드하고 파일 시스템으로부터 불러온다
3. 파일을 파싱한다: 파일을 모듈 레코드로 파싱한다.

**Finding the file and fetching it**

로더느 파일을 찾고 다운로드하는 것을 관장한다. 가장 먼저 필요한 것은 진입점이 되는 파일을 찾는 것이다. HTML에서 script 태그를 사용하여 로더에게 어디서 진입점을 찾을 수 있는지 알려줄 수 있다.

```html
<script type="module" src="main.js" />
```

로더가 `main.js`가 의존하고 있는 모듈들은 import문을 사용하여 찾는다. import문의 모듈 지정자(module specifier)은 로더에게 다음 모듈을 어디서 찾을 수있는지 알려준다.

```javascript
import { counter } from './counter.js';
//					^^^module specifier^^^
```

모듈 지정자는 브라우저와 노드에서 서로 다르게 처리되기도 한다. 호스트는 모듈 지정자 문자열을 해석하는 서로 다른 방법을 가진다. 이를 위해 플랫폼마다 다른 모듈 경로 해석 알고리즘(module resolution algorithm)을 호출한다. 현재 Node에서는 사용 가능하지만 브라우저에서 사용할 수 없는 모듈 지정자는 [해결 중이라고 한다](https://github.com/WICG/import-maps).

그게 달성되기 전까지는 브라우저는 모듈 지정자로 URL만 허용하고 있다. 브라우저는 URL로부터 모듈 파일을 로딩한다. 하지만 모든 모듈 그래프에서 동시에 일어날 순 없다. 파일을 파싱하기 전까지는 fetch 해와야할 의존성이 무엇인지 알 수 없고 fetch하기 전까지는 파일을 파싱할 수 없다.

이것은 파일을 파싱한 후에 그 파일의 의존성을 파악하고, 그 후에 그 의존성들을 찾고 로딩해야한다는 것을 의미한다.

![construction](https://hacks.mozilla.org/files/2018/03/10_construction-768x464.png)

메인 스레드가 각각의 파일이 다운로드되는 것을 기다린다면, 많은 작업에 큐에 쌓이게 될 것이다. 브라우저는 다운로드에 많은 시간을 사용하기 때문이다. (메모리 계층 구조에서 찾아오는 것보다 인터넷을 통해 찾아오는게어 어마어마하게 걸린다)

이처럼 메인 스레드를 블로킹하면 모듈을 사용하는 앱을 너무 느리게 만든다. 이것이 ES 모듈 사양이 알고리즘을 여러 개의 단계로 나누는 이유이다. 구성 단계를 여러 개의 단계로 쪼갬으로써 브라우저는 동기적인 인스턴화가 시작되기 전에 파일들을 fetch하고 모듈 그래프를 빌드한다.

이처럼 알고리즘을 여러 개의 단계로 나누는 접근이 ES 모듈과 CJS 모듈의 주요한 차이점이다.

CJS는 파일 시스템으로부터 로딩을 불러오는 것이 인터넷에서 불러오는 것보다 훨씬 시간이 적게들기 때문에 다르게 처리한다. Node는 파일을 로딩하는 동안 메인 스레드를 블록할 수 있다는 뜻이다. 파일이 이미 로딩되어있으므로 단순히 인스턴스화하고 평가하는게 당연하다(CJS에서는 별개의 단계로 나누지 않는다). 또한 이것은 모듈 인스턴스를 반환하기 전에 전체 트리를 순회하고, 모든 의존성을 로딩하고, 인스턴스화하고 평가할 수 있다는 것을 의미한다.

CJS식 접근은 여러 암시를 가지고 있지만 나중에 설명하겠다. 어쨌든 CJS 모듈을 Node.js에서 사용하는 것은 모듈 지정자에 변수를 사용할 수 있다는 것을 의미한다. 다음 모듈을 탐색하기 전에 `require`식까지 코드가 실행되어 모듈 경로를 해석하러갈 때 변수에 값이 있다.

하지만 ES 모듈은 어떤 평가가 이뤄지기 전 전체 모듈 그래프를 빌드해야한다. 이것은 모듈 지정자에 변수를 사용할 수 없다는 것을 의미한다. 변수들에 아직 값이 없기 때문이다.

```javascript
let path = "module-" + lang;
let formatter = require(path);
formatter.format(content);
```

하지만 이따금 모듈 경로에 변수를 사용하는 것은 매우 유용하다. 예를 들어 코드가 무엇을 하는지 혹은 코드가 실행되는 환경에 따라 로딩할 모듈을 바꾸고 싶을 수 있기 때문이다.

ES 모듈에서는 dynamic import를 통해 이것이 가능하다. import문을 `import(${path}/foo.js)` 처럼 쓰면 된다.

이것이 작동하는 방법은 `import`를 사용하여 로딩되는 모든 파일을 별개의 그래프의 진입점으로 처리하는 것이다. 동적으로 불러온 모듈은 새로운 그래프에서 시작하여 독립적으로 처리된다.

![Two module graphs with a dependency between them, labeled with a dynamic import statement](https://hacks.mozilla.org/files/2018/03/14dynamic_import_graph-500x389.png)

알아야할 것은, 두 그래프에 속한 모듈은 모듈 인스턴스를 공유한다는 점이다. 로더가 모듈 인스턴스를 캐시하기 때문이다. 특정 전역 스코프에 있는 각각의 모듈은 단 하나의 모듈 인스턴스가 된다.

이를 통해 엔진은 일을 덜 할 수 있다. 예를 들어, 여러 개의 모듈이 의존하는 모듈을 단 한 번만 fetch한다는 뜻이다. (모듈을 캐싱하는 이유 중 하나이다. 다른 이유는 평가 섹션에서 다룬다)

로더는 모듈맵이라는 것을 이용하여 캐시를 관리한다. 각각의 전역은 별개의 [모듈맵](https://html.spec.whatwg.org/multipage/webappapis.html#module-map)으로 모듈을 추적한다.

로더가 URL을 fetch해올 때 모듈 맵에 그 URL을 넣고 그 파일을 현재 fetching하는 중이라고 표시한다. 그다음 요청을 보내고 다음 파일을 fetching하기 시작한다.

(모듈맵이 URL을 키로한 캐시라는듯 fetching 상태 추적하는)

다른 모듈이 같은 파일에 의존하면 어떻게 될까? 로더는 모듈맵에서 각각의 URL을 탐색한다. `fetching` 표시를 보면, 그냥 다음 URL로 넘어간다.

하지만 모듈 맵은 fetching이 완료된 파일은 더이상 추적하지 않는다. 모듈맵은 또한 모듈에 대한 캐시 역할을 하는데, 다음에 보겠다.

**parsing**

이제 파일을 fetching해왔으니, 모듈 레코드로 파싱해야한다. 이것은 브라우저가 모듈의 다른 부분을 이해하는데 도움을 준다. (뭔소리지)

모듈 레코드가 생성되면, 모듈 맵에 저장된다.이것은 앞으로 모듈이 요청될 때마다 맵에서 가져올 수 있다는 것을 말한다.

![The “fetching” placeholders in the module map chart being filled in with module records](https://hacks.mozilla.org/files/2018/03/25_module_map-500x239.png)



파싱 과정에서 사소해보일 수 있는 디테일이 있는데, 사실 매우 큰 암시를 가지고 있다. 모든 모듈은 최상위에 `"use strict"`를 가진 것처럼 파싱된다. 그 외의 다른 차이점도 가진다. 예를 들어, 키워드 `await`는 모듈의 최상단 코드에 예약되어있고 `this`의 값은 `undefined`이다.

이렇게 파싱을 다르게 하는 것을 "parse goal"이라고 한다. 동일한 파일을 파싱해도 다른 goal을 사용하면, 다른 결과를 얻게 될 것이다. 따라서 파싱을 하기 전에 파일이 어떤 종류인지, 즉 모듈인지 아닌지 알아야한다.

브라우저에서는 꽤 쉽다. script 태그에 `type="module"`이라고 적기만 해도 된다. 이것은 브라우저에게 파일이 모듈로 파싱되어야한다는 것을 알린다. 모듈만 import될 수 있기 때문에, 브라우저는 모든 import가 모듈이라는 것을 알 수 있다.

하지만 Node는 HTML 태그를 사용할 수 없으므로 `type` 속성과 같은 선택지가 없다. 커뮤니티가 이 문제를 해결하기 위해 사용하는 방법 중 하나는 `.mjs` 확장자를 사용하는 것이다. 이 확장자를 사용하는 것은 Node에게 "이 파일은 모듈이야"라고 말하는 것이다. 사람들이 이것이 parse goal에 대한 신호라고 말하는 것을 볼 수 있다. 관련 토론은 계속되고 있어 Node 커뮤니티가 무엇을 최종적으로 goal에 대한 신호로 결정할지는 분명하지 않다.

어느 쪽이든, 로더는 로더는 모듈이로 파싱할지 아닐지를 결정한다. 모듈이고 import가 있으면 모든 파일을 fetch하고 파싱할 때까지 과정을 반복한다.

그리고 끝이다! 로딩 프로세스가 끝나면 진입점 파일만 가졌던 것에서 모듈 레코드들의 무더기를 가지게 될 것이다.

다음 단계는 이 모듈을 인스턴스화하고 모든 인스턴스를 링크하는 것이다.

**인스턴스화**

일전에 언급했듯, 인스턴스는 코드와 상태를 결합한 것이다. 이 상태는 메모리에 존재하므로 인스턴스화 단계는 모두 메모리에 상태를 쓰는 것에 관련한 것이다.

먼저 자바스크립트 엔진이 모듈 환경 레코드를 생성한다. 이것은 모듈 레코드에 대한 변수를 관리한다. 그리고 엔진은 모든 export에 대한 메모리 공간을 찾는다. 모듈 환경 레코드는 어떤 메모리 공간이 각각의 export와 연관되어있는지 추적할 것이다.

메모리 공간들은 아직 값을 가지고 있진 않다. 실제 값이 채워지는 평가 후에야 그럴 것이다. 한가지 경고할 것이 있다. 모든 export된 함수 선언문은 파싱 단계에서 초기화된다. 이것은 평가를 더욱 쉽게 만든다.

모듈 그래프를 인스턴스화하면 엔진은 DFS를 시작한다. 그래프의 가장 밑-아무것도 의존하지 않는 의존성-까지 순회하고 export를 설정한다. (각각의 모듈 레코드에 대한 모듈 환경 레코드를 메모리 공간에 연결)

엔진은 모듈 내부의 모든 export-모듈이 의존하는 모든 export- 작성을 끝낸다. 그리고 나서 이전 레벨로 돌아가 그 모듈로부터 import된 것을 연결한다.

export와 import가 모두 메모리에서 동일한 위치를 가리키고 있다는 것을 기억하라. export를 먼저 연결하는 것은 모든 import가 대응하는 export에 연결된다는 것을 보장한다.

이것이 CJS 모듈과의 차이점이다. CJS는 모든 export 객체를 export에 복사한다. export되는 어떤 종류의 값(숫자들도)이 복사된다.

이것은 export되는 모듈이 나중에 값을 바꾸면, import하는 모듈은 그 변화를 보지 못한다는 것과 같다.

그에 반하여 ES 모듈은 라이브 바인딩(live binding)한다. 동일한 모듈은 항상 메모리 공간에서 동일한 위치를 가리킨다. export되는 모듈이 값을 바꾸면, 그 변화는 import되는 모듈에서도 가시적이다.

값을 export하는 모듈은 언제나 그 값들을 바꿀 수 있으나 import하는 모듈은 import한 값을 바꿀 수 없다. 모듈이 객체를 import하는 경우라면 그 객체의 프로퍼티의 값을 바꿀 수는 있다. (?)

라이브 바인딩하는 이유는 모든 모듈을 코드의 실행 없이 연결할 수 있기 때문이다. 이것은 순환 의존성(cyclic dependencies)을 가질 때 평가하는 것에 도움이 된다.

이 단계가 끝나면 export,import한 변수에 대한 모든 인스턴스와 메모리 공간을 가지게 된다. 

이제 코드 평가를 시작하고 메모리 공간에 값을 채워보자.

**Evaluation**

마지막 단계는 메모리 공간을 채우는 것이다 JS 엔진은 이것을 최상위 코드-함수 바깥의 코드를 실행하여 수행한다.

메모리 공간의 값을 채우는 데 더해 코드를 평가하는 것은 사이드 이펙트를 발생시킬 수 있다. 예를 들어 모듈이 서버에 대한 호출을 만들 수도 있다.

잠재적인 사이드 이펙트 때문에, 모듈은 단 한 번만 평가된다. 인스턴스화에서 진행되는 링킹(여러 번 실행되어도 정확히 같은 결과를 내는)과는 대조적으로 평가는 실행 횟수에 따라 여러 결과를 가질 수 있다.

이것이 모듈맵을 사용하는 이유 중 하나이다. 모듈맵은 표준 URL로 모듈을 캐시하여 각각의 모듈에 대해 단 하나의 모듈 레코드를 가진다. 각각의 모듈은 단 한 번 실행되는 것이 보장되고 이것은 DFS 순회에서 성취된다.

순환 의존성은 어떤가?

순환 의존성에서 그래프에 루프가 생길 수 있다. 대개 이것은 긴 루프이다. 하지만 문제를 설명하기 위해 짧은 루프를 가진 간단한 예시를 사용하겠다.

![A complex module graph with a 4 module cycle on the left. A simple 2 module cycle on the right.](https://hacks.mozilla.org/files/2018/03/41_cjs_cycle-500x224.png)

먼저 main 모듈이 require 문까지 실행된다. 그리고 counter 모듈을 로드하기 시작한다. counter 모듈은 export 객체의 `message`에 접근하려 시도한다. 하지만 main 모듈에서 아직 평가되진 않았으므로 undefined를 반환한다. JS 엔진은 로컬 변수에 대한 메모리 공간을 할당하고 undefined로 설정한다.

counter 모듈의 최상위 코드의 끝까지 평가가 이루어진다. main.js가 평가된 후에 message에 알맞은 값이 들어가길 원하므로, timeout을 설정했다. 그리고 main.js에서 평가가 재개된다.

message 변수는 초기화된 후 메모리에 추가된다. 그러나 둘 사이엔 어떤 연결도 없으므로 import한 모듈에선 여전히 undefined이다.

만약 export가 라이브 바인딩으로 처리되었다면 counter는 결국 알맞은 값을 보게 될 것이다. timeout이 실행되기 전, main.js의 평가는 완료되고 값이 채워질 것이다.

ES 모듈의 디자인이 이렇게 된 건 순환을 제공하기 위해서라고 할 수 있다. 세 단계로 나눈 디자인이 순환을 가능하게 한다.

**ESM의 현재는 어떤가?**

모든 주요 브라우저가 ESM을 기본적으로 제공할 것이다. Node도 지원을 추가하고 있다.





https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/



