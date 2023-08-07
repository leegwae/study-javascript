# Ajax

**Ajax(Asynchronous JavaScript and XML)**은 특정 기술을 가리키는 것이 아니라 서버와 브라우저 간의 데이터를 주고받는 새로운 접근법을 설명하는 용어이다. Ajax는 Web API인 `XMLHttpRequest`에 기반한다.

## Ajax의 등장 이전

1. 브라우저와 서버는 동기적으로 통신한다. 따라서 클라이언트는 서버의 응답을 받을때까지 블로킹된다.
2. 브라우저는 서버로부터 완전한 HTML을 전송받아 렌더링한다. 즉, 사용자가 화면 전환 시, 새로운 완전한 HTML 전송받아 다시 처음부터 렌더링해야한다. 따라서 변경할 필요가 없는 부분을 다시 전송받아야하며, 다시 렌더링해야한다. 이에 따라 순간적으로 깜빡이는 현상이 발생한다.

## Ajax의 등장 이후

1999년 마이크로소프트가 `XMLHttpRequest`를 개발하고, 2005년 구글이 `XMLHttpRequest`를 사용한 구글 맵스를 발표하여 본격적으로 주목받는다.

1. 브라우저와 서버는 비동기적으로 통신한다. 따라서 클라이언트는 서버의 응답을 받을 때까지 블로킹되지 않는다.
2. 브라우저는 서버로부터 필요한 부분만 전송받아 렌더링한다. 불필요한 통신이 필요하지 않으며 화면이 순간적으로 깜빡이는 현상도 발생하지 않는다.

## JSON

Ajax는 서버와 클라이언트 간의 데이터 교환 포맷으로 JSON이나 XML을 사용한다. JSON(JavaScript Object Notation)는 데이터를 JavaScript의 객체 문법으로 표현한 데이터 포맷인데, 텍스트 기반이므로 언어에서 독립적이다.

- `JSON.stringify`는 직렬화를 수행한다: JavaScript 객체 또는 배열을 JSON 포맷의 문자열로 변환한다.
- `JSON.parse`는 역직렬화를 수행한다: JSON 포맷의 문자열을 JavaScript 객체 또는 배열로 변환한다.

## XMLHttpRequest

`XMLHttpRequest`는 HTTP 통신을 위한 메서드를 제공하는 Web API이다.

- HTTP 요청

```javascript
// 1. XMLHttpRequest 객체를 생성한다
const xhr = new XMLHttpRequest();
// 2. HTTP 요청을 초기화한다
xhr.open('GET', '/users');
// 3. HTTP 헤더를 설정한다
xhr.setRequestHeader('content-type', 'application/json');
// 4. HTTP 요청을 전송한다
xhr.send();
```

- HTTP 응답

```javascript
// HTTP 요청 상태를 나타내는 readState 프로퍼티가 변경될 때마다 발생한다.
xhr.onreadstatechagne = () => {
  if (xhr.readState !== XMLHttpRequest.DONE) return;
  
  if (xhr.status === 200) console.log(JSON.parse(xhr.response));
  else console.log(`Error: ${xhr.status} ${xhr.statusText}`)
}

// HTTP 응답을 수신하면 발생한다.
xhr.onload = () => {
  if (xhr.status === 200) console.log(JSON.parse(xhr.response));
  else console.log(`Error: ${xhr.status} ${xhr.statusText}`)
}
```



## 참고

- 모던 자바스크립트 Deep Dive 43장 Ajax
- https://developer.mozilla.org/ko/docs/Web/Guide/AJAX