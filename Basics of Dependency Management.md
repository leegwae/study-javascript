# Basics of Dependency Management in JavaScript

JavaScript로 프로젝트를 할 때마다 레포지토리 한 켠을 차지하고 있는 파일이 있다. 바로 `pakcage.json`이다. (어떤 경우 `package-lock.json`이나 `yarn.lock`이라는 파일도 함께 있다) 이들은 도대체 무슨 역할을 하고 있는걸까? 그동안 헷갈렸던 의존성, 모듈, 패키지, 패키지 매니저, npm 등등에 대해 아주 간단하게 알아보자.



## 패키지와 의존성

일반적으로 **패키지(pacakge)**는 관련이 있는 모듈의 집합이다. 현재 JavaScript에서 패키지 개념은 표준이 아니다. 한편 외부에서 가져온 모듈을 코드가 필요로 하는 **의존성(dependency)**라고 하는데, 이것을 가리켜 패키지라고 하기도 한다. 우리는 종종 프로젝트가 필요하는 외부 모듈을 가리킬 때 패키지나 의존성이라는 말을 사용하므로, 이 텍스트에서도 모듈과 패키지, 의존성을 혼용해서 사용하도록 한다.

## 패키지 매니저

JavaScript 생태계에서 **패키지 매니저(package manager)**는 프로젝트의 의존성을 관리하는 시스템을 일컫는다. 우리는 패키지 매니저를 통해 JavaScript 외부 모듈을 사용할 수 있다. 패키지 매니저는 패키지를 설치하고 삭제하는 것부터, 패키지의 버전과 다운로드되는 위치를 관리하는 등의 역할을 수행한다. 널리 사용되는 패키지 매니저로는 npm과 Yarn, Yarn Berry(yarn2), PNPM 등이 있다.

## 패키지 매니저 npm

**npm(node package module)**은 Node.js에서 사용 가능한 모듈을 저장한 공개 레지스트리이다. [npm 공식 문서](https://docs.npmjs.com/about-npm)에 따르면 npm은 세 가지 요소로 구성되는데, 웹사이트와 CLI(Command Line Interface), 그리고 데이터베이스인 레지스트리가 그것이다. 우리는 웹사이트에서 검색을 통해 레지스트리에 원하는 기능을 지원하는 모듈이 있는지 살필 수 있고, CLI로 레지스트리에 있는 모듈을 로컬로 다운로드받을 수 있다.

### `package.json`과 `package-lock.json` 그리고 `node_modules`

```
|--node_modules
|--src
	|--index.js
|--package.json
|--package-lock.json
```

한편 npm은 `package.json`이라는 이름의 파일로 패키지 의존성을 관리한다. 따라서 npm을 통해 외부 모듈을 사용하고 싶다면 반드시 해당 프로젝트 루트에 `package.json`이 생성되어있어야한다. `package.json`은 일종의 설정 파일로서 패키지의 이름과 버전 등 패키지에 관련한 정보를 저장한다.

npm v5부터 npm을 통해 의존성을 설치하면 `package-lock.json`이라는 이름의 파일을 생성하는데, 이 파일은 패키지 잠금 기능을 지원한다. **패키지 잠금 기능**이란, 의존성이 업데이트되어도 설치 시점에 상관없이 항상 동일한 의존성을 설치하는 기능이다. 달리 말하여 프로젝트를 개발할 때 사용했던 의존성이 버전업되어 로컬에 설치된 의존성과 npm 레지스트리에 저장된 의존성의 버전이 달라져도 `package-lock.json`에 기입된 정보를 통해 항상 개발 당시 사용했던 버전으로 설치되는 것을 보장한다. 

한편 npm으로 설치한 모듈들은 모두 `node_modules`라는 이름의 폴더에 저장된다. 가령 다음과 같이 npm CLI를 사용하여 `typescript`라는 외부 의존성을 설치하면

```bash
npm install typescript
```

`package.json`의 `dependecies`에 해당 의존성이 기입된다. `package-lock.json`도 변화가 생긴다.

```
{
  "name": "test",
  "type": "module",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "typescript": "^5.0.3"
  }
}
```

또한 `node_moduels` 하위에 `typescript`가 설치된다.

```
|--node_modules
	|--.bin
	|--typescript
|--src
	|--index.js
|--package.json
|--package-lock.json
```

### npm CLI Basics

npm이 제공하는 CLI 중 기본적인 것들은 다음과 같다.

- `npm init`: `package.json`을 생성한다. 각 필드를 직접 작성할 수 있는데, 이 과정을 생략하려면 `-y` 옵션을 함께 명시한다.
- `npm install`: `package.json`에 명시된 의존성을 모두 설치한다.
- `npm install 패키지이름`: 명시한 패키지를 다운로드한다. `package.json`에 의존성이 기록되며 `node_modules`에 저장된다.
- `npm uninstall 패키지이름`: `node_modules`에 설치된 패키지 중 명시한 패키지를 삭제한다.

## 버전 관리 시스템과 npm을 사용한 프로젝트

깃허브와 같은 버전 관리 시스템에 npm을 사용해 의존성을 관리하는 프로젝트를 업로드한다면 반드시 `package.json`과 `package-lock.json`을 포함하도록 한다. 두 파일을 통하여 설치해야 할 의존성을 알 수 있기 때문이다. 단, `node_modules`는 업로드하지 않도록 한다. 레포지토리를 로컬로 클론한 후 `npm install`로 `package.json`에 명시된 모든 파일을 다운로드할 수 있기 때문이다.

```
# .gitignore
/node_modules
```



## 참고

- [MDN - Package management basics](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Package_management)
- [MDN - JavaScript modules](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules)
- [TOAST UI - 의존성 관리](https://ui.toast.com/fe-guide/ko_DEPENDENCY-MANAGE#의존성-관리)
- [씨엔텍 시스템즈 - Node.js 패키지 설치 모듈 npm과 yarn](https://cntechsystems.tistory.com/34?category=767999)

