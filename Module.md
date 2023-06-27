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
- CommonJS는 동적으로 모듈을 내보내고 불러올 수 있다. ESM은 동적으로 모듈을 내보낼 수 없다. 정적 `import`문은 코드의 최상위에 위치해야만 하고 동적으로 불러오려면 동적 `import()`를 사용해야한다.
- 이러한 특성으로 CommonJS는 런타임 이전에 의존성을 모두 파악할 수 없으나 ESM은 런타임 이전에 정적 분석을 통해 의존성을 모두 파악할 수 있다.

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

- 정적 `import`문은 ESM이 ESM 혹은 CJS를 정적으로 불러올 때 사용할 수 있다.
- 동적 `import()`식은 ESM이나 CJS가 ESM 혹은 CJS를 동적으로 불러올 때 사용할 수 있다.
- `require()`식은 CJS가 CJS를 불러올 때 사용할 수 있다.



### `import`로 모듈 로딩하기

`import`는 비동기적으로 모듈을 불러오는 ECMAScript 모듈 로더를 사용한다. ECMAScript 모듈 로더는 ESM와 CJS을 모두 불러올 수 있으며 `Module` 타입의 객체(ESM 네임스페이스 객체)로 변환하여 가져온다.

- 어떻게 CJS를 ESM으로 변환하는가? 우선 모듈 지정자를 절대 경로로 변환하고 CommonJS 모듈 로더를 호출한다. 그 후 `module.exports` 객체를 `Module` 객체의 `default` 프로퍼티에 복사하여 ESM으로 변환한다.
- CJS를 불러올 때 제한은 없는가? default export된 CJS를 named import할 수 없다. 이것은 CJS가 CJS를 불러올 때도 마찬가지이다. Node.js는 호환성을 위해 named export에 한해서만 정적 분석을 지원한다. [출처](https://nodejs.org/api/esm.html#commonjs-namespaces)
- 정적 `import`문도 CJS에서 사용할 수 있는가? 없다. 정적 `import`문은 ESM에서만 사용할 수 있다. 그러나 동적 `import()`식은 CJS와 ESM 모두에서 사용 가능하다.

### 동적 `import()`로 ESM 불러오기

```javascript
// hello.mjs
export const hello = 'hello';
```

위와 같은 ESM을 동적 `import()`을 사용하여 불러오자.

#### CJS에서 ESM 불러오기

```javascript
// index.cjs
(async () => {
	const { hello } = await import("./hello.mjs");
	console.log(hello);
})();
```

CommonJS는 동적 `import`를 사용하여 ESM을 불러올 수 있다. 단, CJS는 top-level `await`를 지원하지 않으므로 `async` 즉시 실행 함수로 감싸주어야한다.

#### ESM에서 ESM 불러오기

```javascript
// index.mjs
const { hello } = await import("./hello.mjs");
console.log(hello);
```

ESM도 동적 `import`를 사용하여 ESM을 불러올 수 있다. ESM은 ES2022부터 top-level `await`를 지원하고 있다.

### 정적 `import`문으로 ESM에서 CJS 불러오기

```javascript
// hello.cjs: default export
module.exports = {
	hello: "hello",
};

// index.mjs: default import
import m from "./hello.cjs";
const { hello } = m;
```

ESM는 `import`문을 사용하여 CJS를 불러올 수 있다.

- 단, default export된 CJS를 named import하면 다음과 같은 오류가 발생한다.

```javascript
// index.mjs: named import
import { hello } from "./hello.cjs";
//     ^^^^💥💥💥
```

```
SyntaxError: Named export 'hello' not found. The requested module 
'./hello.cjs' is a CommonJS module, which may not support all module.exports as named exports.
CommonJS modules can always be imported via the default export, for example using:

import pkg from './hello.cjs';
const { hello } = pkg;
```

- named export된 CJS는 named import하거나 default import할 수 있다. Node.js가 호환성을 위해 default export와 달리 모든 named export를 정적 분석하여 named export할 수 있도록 지원하고 있기 때문이다.

```javascript
// hello.cjs: named export
module.exports.hello = 'hello';

// index.mjs: named import
import { hello } from "./hello.cjs";
```

- `module.exports`는 기본적으로 ESM 네임스페이스의 `default`에 복사하여 CJS를 ESM으로 변환한다.

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

### `require`로 모듈 로딩하기

`require()`는 완전히 동기적으로 모듈을 불러오는 CommonJS 모듈 로더를 사용한다. CommonJS 모듈 로더는 ESM을 불러올 수 없으며, CJS만 불러올 수 있다. CJS 모듈은 top-level `await`를 지원하지 않으므로 top-level `await`를 지원하는 ESM 모듈을 CJS로 변환할 수 없기 때문이다.

- `require()`을 ESM에서 사용할 수 있는가? 없다. `require`는 CJS에서만 사용할 수 있다.
- `require()`로 ESM을 불러올 수 있는가? 없다. `require()`식으로 ESM을 불러오려고 시도하면 오류가 발생한다. CJS에서 ESM을 불러오려면 동적 `import()`를 사용하라고 명시하고 있다.

```
// index.cjs
const { hello } = require("./hello.mjs");


// Error [ERR_REQUIRE_ESM]: require() of ES Module 경로\hello.mjs not supported.
// Instead change the require of 경로\hello.mjs to a dynamic import() which is available in all CommonJS modules.
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
