# ECMAScript Module

## ES 모듈은 어떻게 동작하는가?

자바스크립트 엔진은 모듈인 스크립트를 실행하면, 빌드 타임에 스크립트를 정적 분석하여 해당 스크립트를 진입점으로 한 모듈 그래프를 만든다. 이 모든 과정을 **모듈 로딩(module loading)**이라고 한다.

모듈 로딩은 세 단계로 이루어진다.

1. **구성(Construction)**: 파일을 찾아 다운로드하고, 파일을 파싱하여 모듈 레코드로 만든다.
2. **인스턴스화(Instantiation)**: export된 값을 넣을 메모리 공간을 확보하고 export와 import에 연결(링킹; linking)한다.
3. **평가(Evalutation)**: 코드를 실행하여 메모리 공간에 값을 할당한다.

### 모듈 로더

**모듈 로더(module loader)**가 모듈의 로딩을 수행한다. 모듈의 로딩은 크게 두 가지 사양을 다르고 있다.

1. 모듈의 fetching은 [HTML 사양](https://html.spec.whatwg.org/#fetch-a-module-script-tree)을 따른다.
2. 파일을 모듈 레코드로 파싱하고 어떻게 인스턴스화하고 평가하는지는 [ES 모듈 사양](https://tc39.es/ecma262/#sec-modules)을 따르고 있다. 로더는 자바스크립트 엔진의 `ParseModule`, `Module.Instantiate`, `Module.Evaluate`을 호출한다.

### 구성(Construction)

#### Fetching

1. 모듈 로더는 **진입점**이 되는 파일을 찾는다. 런타임마다 진입점을 지정하는 방법이 다르다. 브라우저의 경우 `<script type="module">` 태그를 사용한다.

   ```html
   <script type="module" src="main.js" />
   ```

2. 모듈 로더는 지정된 URL로 네트워크 요청하여 파일을 다운로드한다.
3. 모듈 로더는 모듈맵에 URL을 키로, `fetching`을 값으로 넣는다. **모듈맵(module map)**은 모듈의 fetching 상태를 추적하고 fetching이 완료된 모듈을 캐싱한다.

#### Parsing

1. 자바스크립트 엔진은 다운로드한 파일을 파싱하여 모듈 레코드를 생성한다. **모듈 레코드(module record)**는 하나의 모듈에 대하여 import와 export 정보를 가진다.
2. 모듈맵에 `fetching` 대신 생성한 모듈 레코드를 값으로 저장한다.

#### Fetching next

1. 모듈 로더는 파일을 파싱할 때 해당 모듈의 의존성을 찾는다. ES 모듈에서는 `import`문의 **모듈 지정자(module specifier)**로 의존성을 명시한다.

   ```javascript
   import { foo } from './foo.js'
   //                  ^^^^^^^^^^
   ```

2. 모듈 로더는 **모듈 경로 해석 알고리즘(module resolution algorithm)**을 사용하여 모듈 지정자 문자열을 해석한다. 런타임마다 모듈 경로 해석 알고리즘이 다른데, 브라우저는 모듈 지정자로 URL만 허용한다.

3. 해당 모듈에 대하여 [Fetching](#Fetching) 과정을 수행한다.

이처럼 모듈 로더는 더이상 찾을 모듈이 없을 때까지 모듈의 fetching과 parsing을 반복한다. 한편 동적 `import()`의 경우, 해당 모듈을 진입점으로 모듈 인스턴스를 공유하지만 별개의 의존성 그래프를 빌드한다.

### 인스턴스화(Instantitation)

1. 자바스크립트 엔진이 모듈 레코드에 대하여 모듈 환경 레코드를 생성한다. **모듈 환경 레코드(module environment record)**는 모듈의 식별자 바인딩을 기록한다.
2. 자바스크립트 엔진은 export된 변수의 값을 저장할 메모리 공간을 확보한다. 실제 값은 할당되지 않으나, 함수는 초기화된다.
3. 자바스크립트 엔진이 모듈 그래프를 DFS한다. 최하단 노드에 도착하면 export를 설정하고 위 레벨로 돌아가 export가 가리키는 메모리 공간에 import도 연결한다**(링킹; linking)**.

```javascript
function link(moduleRecord) {
	// 의존하는 모듈 레코드에 대해서 dfs 실행
    moduleRecord.RequestedModules.forEach(modifier => {
        const nextModule = new ModuleRecord(modifier);
        link(nextModule);
    });
    
    // 최하위 모듈이라면 모듈 레코드 변환해서 모듈 환경 레코드 생성
    const envRecord = new ModuleEnvironmentRecord(module);
    const exeCtx = new ModuleExecutionContext(envRecord);
    EXEUCTION_CONTEXT_STACK.push(exeCtx);
    EXEUCTION_CONTEXT_STACK.resolveBindings();
    EXEUCTION_CONTEXT_STACK.pop();
}

const entry = new ModuleRecord('index.js');
link(entry);
```

### 평가(Evaluation)

1. 자바스크립트 엔진이 최상위 코드(진입점)을 실행한다. 

2. DFS 순회하여 모든 모듈이 한 번씩 실행된다.

   가령 Foo가 Bar에, Bar가 Baz에 의존하고 있다면 Baz, Bar, Foo 순으로 실행된다.

   ```python
   def dfs(currentModule):
       # 의존하는 모듈에 대하여 dfs 실행
       for nextModule in requestedModules:
           dfs(nextModule)
       # 최하위 모듈이면 실행
       console.log(f'Execute ${currentModule}!')
   ```

```javascript
// Foo.mjs
import { Bar } from './Bar.mjs';
export const Foo = 'Foo';
console.log('Foo->');

// Bar.mjs
import { Baz } from './Baz.mjs';
export const Bar = 'Bar';
console.log('Bar->');

// Baz.mjs
export const Baz = 'Baz';
console.log('Baz->');
```

```bash
node Foo.mjs	# Baz->Bar->Foo
```

## 클래식과 ES Module의 차이

클래식 스크립트(ES Module 도입 이전의 스크립트)에 비교하여 ES Module은 다음 특징을 가진다.

1. 모듈은 언제나 strict mode에서 실행된다. `this`는 `undefined`이다.

2. 모듈은 HTML 스타일의 주석을 허용하지 않는다.

3. 모듈은 렉시컬 최상위 스코프를 가진다. 즉, 글로벌 스코프에서 실행되지 않으므로 `var`로 선언한 식별자와 함수 선언문은 전역 객체의 프로퍼티가 되지 않는다. 마치 IIFE에서 실행되는 내부 코드와 비슷하다.

   ```javascript
   (function () {/* module code */}).call();
   ```

4. 모듈은 기본적으로 지연된다(모듈의 다운로드가 비동기적으로 실행되어 페이지 구성을 블로킹하지 않고, 모듈의 실행은 페이지 구성이 완료된 후 실행된다). 모든 의존성을 불러와 전체 그래프를 빌드하는데 오랜 시간이 걸릴 수 있기 때문이다. 

5. 모듈은 여러 번 `import`되어도 단 한 번 평가되고 단 한 번 실행된다.

6. 모듈은 최상위 `await`가 가능하다.

## ES Module과 CommonJS와의 차이

1. CommonJS는 동기적으로 모듈을 로딩하고 ES Module은 비동기적으로 모듈을 로딩한다.

   CommonJS는 모듈이 이미 디스크에 저장되어있는 서버사이드 환경을 전제한다. 파일 시스템으로부터 모듈을 불러오는 것은 시간이 적게 드므로, 메인 스레드를 블로킹해도 큰 문제가 없다. 그래서 모듈 로딩을 별개의 단계로 나누지 않고 한 흐름으로 처리한다. 이에 반하여 ES Module은 기본적으로 비동기를 지원한다. 네트워크를 통해 모듈을 가져오는데 많은 시간이 걸리기 때문이다. 따라서 메인 스레드를 블로킹하지 않기 위해 모듈 로딩을 비동기적으로 실행될 수 있는 세 개의 단계로 나눈다.

2. CommonJS는 top-level `await`를 지원하지 않지만 ES Module은 top-level `await`를 지원한다.

   이러한 차이로 CommonJS 모듈 로더로 ES Module을 로딩할 수 없지만(top-level `await`하는 ES Module을 CommonJS로 변환할 수 없다), ES Module 모듈 로더는 CommonJS 모듈을 로딩할 수 있다.

3. CommonJS는 ES Module보다 더 동적이다. ES Module은 CommonJS보다 더 정적이다.

   CommonJS는 런타임 이전에 종속성을 모두 파악할 수 없다. `require`나 `module.exports`가 런타임에 재정의가 가능하므로, 모듈을 동적으로 내보내고 불러올 수 있기 때문이다. 이에 반하여 ES Module는 최상위에서만 정적 `import`문과 `export`문을 사용할 수 있어 런타임 이전에 정적 분석하여 의존성 그래프를 빌드할 수 있다. 이러한 차이로 ES Module은 CommonJS보다 트리쉐이킹이 용이하다.

4. CommonJS는 import하는 모듈이 export하는 모듈의 런타임 변화를 추적하지 않는다. ES Module은 import하는 모듈이 expoprt하는 모듈의 런타임 변화를 추적한다.

   CommonJS는 export 객체를 복사한다. ES Module은 라이브 바인딩(live binding)하여, 동일한 모듈은 항상 메모리 공간에서 동일한 위치를 가리킨다. 이러한 차이로 ES Module은 순환 의존성을 처리하는데 적합하다.

   ```javascript
   // main.js
   let count = require('./counter.js').count;
   console.log(count);
   exports.message = 'Eval complete';
   
   // counter.js
   let message = require('./main.js').message;
   exports.count = 5;
   
   setTimeout(() => console.log(message), 0);
   ```

   `main.js`를 실행하면 `require('./counter.js')`에서 counter.js와 그 의존성을 동기적으로 로딩하고 평가한다. counter.js에 들어가자마자 `require(./main.js).message`로 export 객체의 `message`에 접근하려 하지만, main.js는 아직 평가되지 않았으므로 undefined를 반환한다. 이후 `setTimeout`의 콜백을 설정한 후 main.js의 평가를 재개해도 export 객체는 export 시점에 단순히 복사되므로 `message`의 변경을 추적하지 않는다. undefined가 출력될 것이다.

## 어떻게 할 것인가?

- on-demand 모듈은 동적 `import()`를 사용한다. 정적 `import`를 사용하면 모듈 그래프 전체를 빌드하는데, 그러기 위해 모든 의존성을 다운로드하고 실행해야하기 때문이다. 이는 초기 로드-타임(load-time) 성능을 향상시킨다.
- 로컬 개발이거나 모듈이 100개 이하고 의존성 깊이가 5 이하라면 번들링하지 않아도 될 것이다. 그 외의 경우는 번들링하는 것이 적절하다. request chain을 피할 수 있기 때문이다. 또한 ES Module가 정적 분석이 가능하여 코드를 최적화하는데 도움이 된다. 초기 로딩 시간을 줄이려면 나중에 쓰는 코드를 지연하기 위해 코드 스플리팅을 도입할 수도 있다.
- 번들하지 않는 모듈을 사용하면 초기 로딩 성능은 좋지 않지만(콜드 캐시;cold cache) 자주 사용하면 로딩 성능에는 좋다(웜  캐시; warn cache). 적절히 비교하여, 전체 번들을 re-fetch할 것인지, 번들링 하지 않았으므로 영세한 모듈만 re-fetch할 것인지 결정할 수 있다.
- HTTP/2 멀티플렉싱을 사용하여 모듈 트리를 빠르게 로딩할 수도 있다.
- `<link rel="modulepreload">`를 사용하여 큰 의존성을 브라우저가 미리 파악하게 할 수 있다.
- 브라우저가 ES 모듈을 지원하지 않는다면 `nomodule` 속성으로 트랜스파일된 코드를 fallback으로 제공한다

```html
<!-- for ES module brwosers -->
<script type="module" src="index.js"></script>
<script defer nomodule src="old.js"></script>
```



## 참고

- [V8 JavaScript modules](https://v8.dev/features/modules)
- [ES modules: A cartoon deep-dive](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
- [ES modules: 만화로 보는 심층 탐구](https://ui.toast.com/weekly-pick/ko_20180402)
- [ES6 Modules in the Real World (Polymer Summit 2017)](https://youtu.be/fIP4pjAqCtQ)
- https://262.ecma-international.org/13.0/#sec-modules