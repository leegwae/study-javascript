# DOM

**DOM(Document Object Model)**은 HTML이나 XML 문서(document)의 계층적 구조를 트리로 표현하고, 이를 제어할 수 있는 프로퍼티와 메서드를 제공하는 API이다.

HTML 문서는 HTML 요소로 구성되어있다. HTML 요소는 시작 태그와 종료 태그, 컨텐츠, 그리고 0개 이상의 어트리뷰트(어트리뷰트 이름, 어트리뷰트 값의 쌍)을 가진다. 렌더링 엔진은 이 HTML 요소를 파싱하여 DOM 노드로 변환한다. 이때 HTML 요소는 요소 노드(Element Node)로, 어트리뷰트는 어트리뷰트 노드(Attribute Node)로, 컨텐츠는 텍스트 노드(Text Node)로 변환된다.

```html
<div class="foo">
  Hello world
</div>
```

## Node

DOM 노드의 상속 구조는 아래와 같다. 여기서 문서는 HTML 문서로, 요소는 HTML 요소를 가리키도록 한정한다.

```
Object <- EventTarget <- Node
												<- Document <- HTMLDocument
												<- Element
																<- HTMLElement
																<- SVGElement
												<- Attr
												<- CharacterData
																		<- Text
																		<- Comment
```

- 문서 노드(document node): DOM 트리에서 루트 노드이다. 브라우저가 렌더링한 HTML 문서 전체를 가리키는 객체인 `window.document `객체를 가리킨다. 
- 요소 노드(element node): HTML 요소를 가리킨다.
- 어트리뷰트 노드(attribute node): HTML 요소의 어트리뷰트를 가리킨다. 요소 노드에 연결되어 있어 어트리뷰트 노드에 접근하려면 요소 노드에 접근해야한다.
- 텍스트 노드(text node): DOM 트리에서 리프 노드이다. HTML 요소의 텍스트를 가리킨다. 최종단이므로 텍스트 노드에 접근하려면 요소 노드에 접근해야한다.

### 어트리뷰트 노드와 DOM 프로퍼티

요소 노드는 HTML 어트리뷰트에 대응하는 DOM 프로퍼티를 가진다. 한편으로 HTML 어트리뷰트가 파싱된 어트리뷰트 노드들이 `NamedNodeMap` 객체로 저장된 `attributes` 프로퍼티도 가진다. 어트리뷰트와 DOM 프로퍼티는 사용자와의 상호작용으로 상태가 변하지 않는 어트리뷰트라면 둘 다 같은 값을 유지한다. 단, 사용자의 상호작용으로 상태가 변하는 어트리뷰트(예: input의 `value`)는 다른 값을 유지할 수도 있다.

- DOM 프로퍼티는 어트리뷰트의 최신 상태를 관리한다. 가령, input 요소 노드의 `value`는 사용자의 입력에 따라 값이 최신으로 바뀐다.
- 어트리뷰트 노드는 어트리뷰트의 초기 상태를 관리한다. 가령, input 요소 노드의 `value` 어트리뷰트는 초기값을 유지한다.

```html
<body>
  <input id="user" value="초기값">
  <script>
    const input = document.getElementById('user');
    input.value = '바뀐값1';
    console.log(input.getAttribute('value'));	// 초기값
    console.log(input.value);	// 바뀐값1
    
    input.setAttribute('value', '바뀐값2');
		console.log(input.getAttribute('value'));	// 바뀐값2
    console.log(input.value);	// 바뀐값1
  </script>
</body>
```

#### 반드시 일대일대응하는가?

모든 HTML 어트리뷰트와 DOM 프로퍼티가 일대일 대응하는 것은 아니다. 예를 들어, `textContent` DOM 프로퍼티는 대응하는 HTML 어트리뷰트가 없다. 대응하는 경우에도 키가 반드시 일치하는 것도 아니다. 예를 들어, `for` HTML 어트리뷰트는 `htmlFor` DOM 프로퍼티에 대응한다. `data` HTML 어트리뷰트는 `dataset` DOM 프로퍼티를 통해 접근할 수 있다.

```html
<div id="hello" data-test="world">
<script>
  // data-접두사로 명시하고 dataset.접두사로 접근한다
  const test = document.getByElementById('hello');
  console.log(test.dataset.test);	// world
</script>
```

또한 모든 HTML 어트리뷰트의 값은 문자열이지만 DOM 프로퍼티의 값은 그렇지 않을 수 있다. 예를 들어, `checkbox` 요소의 `checked` 어트리뷰트의 값은 문자열이나 `checked` 프로퍼티의 값은 불리언이다.

## 참고

- 모던 자바스크립트 Deep Dive 39장 DOM