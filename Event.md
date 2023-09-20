# Event

브라우저는 특정 사건이 발생하면 **이벤트(event)**를 발생시킨다. 이벤트가 발생했을 때 호출될 함수를 **이벤트 핸들러(event handler)**라고 하며, 이벤트 핸들러를 등록하여 브라우저에게 이벤트 핸들러의 호출을 위임한다.

## 이벤트 핸들러 등록

세 가지 방법이 있다.

1. 이벤트 핸들러 어트리뷰트
2. 이벤트 핸들러 프로퍼티
3. `addEventListener`

### 이벤트 핸들러 어트리뷰트

```html
<button onClick="sayHello('lux'); sayHello('umi');">
   클릭
</button>
<script>
	function sayHello(name) {
    console.log(`hello, ${name}!`)
  }
</script>
```

이제 HTML에서는 잘 안 쓰고 CBD(Component Based Development)에서는 쓴다.

### 이벤트 핸들러 프로퍼티

```html
<button id="myBtn">
   클릭
</button>
<script>
  const button = document.getElementById('myBtn');
  button.onClick = () {
    console.log('hello world!')
  }
</script>
```

이벤트 핸들러 프로퍼티에는 단 하나의 핸들러만 바인딩할 수 있다는 단점이 있다.

### `addEventListener`

```javascript
EventTarget.prototype.addEventListener('eventType', handler, [, useCapture]);
```

- `useCapture`가 `false`이면 타깃 단계와 버블링 단계에서만 이벤트를 캐치한다. 기본값이다.
- `useCapture`가 `true`이면 캡처링 단계에서만 이벤트를 캐치한다.
- 이벤트 핸들러가 등록된 순서대로 호출된다. 단, 참조가 동일한 이벤트 핸들러는 이벤트마다 하나만 등록된다.

## 이벤트 객체

이벤트가 발생하면 이벤트 객체가 생성된다. 브라우저는 이벤트 객체를 암묵적으로 이벤트 핸들러의 첫번째 인수로 전달한다. 단, 이벤트 핸들러 어트리뷰트 방식은 파라미터 이름이 `event`여야만 전달된다. 이벤트 핸들러 어트리뷰트 값은 파싱되어 이벤트 핸들러의 함수 몸체가 되기 때문이다.

```html
<button onclick={handleClick(event);}>클릭</button>
```

```javascript
function onclick(event) { 
	handleClick(event);
}
```

### 이벤트 객체의 상속 구조

```
Object <- Event
						<- AnimationEvent
						<- UIEvent
										<- FocusEvent
										<- MouseEvent
															<- DragEvent
															<- WheelEvent
										<- KeyboardEvent
										<- InputEvent
										<- TouchEvent
						<- ClipboardEvent
						<- CustomEvent
```

### 이벤트 객체의 공통 프로퍼티

`Event.prototype`이 가진 이벤트 관련 프로퍼티는 다음과 같다.

| 프로퍼티           | 타입          | 설명                                                         |
| ------------------ | ------------- | ------------------------------------------------------------ |
| `type`             | `string`      | 이벤트 타입                                                  |
| `target`           | `EventTarget` | 이벤트를 발생시킨 대상                                       |
| `currentTarget`    |               | 이벤트 핸들러가 등록된 대상 객체                             |
| `eventPhase`       | `number`      | 이벤트 전파 단계를 나타낸다.<br />`0`: 이벤트 없음<br />`1`: 캡처링 단계<br />`2`: 타켓 단계<br />`3`: 버블링 단계 |
| `bubbles`          | `boolean`     | 이벤트를 버블링으로 전파하는지 그 여부를 나타낸다. 다음 이벤트는 `bubbles: false`로 버블링하지 않는다.<br />- 포커스 이벤트 `focus`/`blur`<br />- 리소스 이벤트 `load`/`unload`/`abort`/`error`<br />- 마우스 이벤트 `mouseenter`/`mouseleave` |
| `cancelable`       | `boolean`     | `preventDefault`를 호출하여 이벤트의 기본 동작을 취소할 수 있는지 그 여부를 나타낸다. 다음 이벤트는 `cancelable: false`로 취소할 수 없다.<br />- 포커스 이벤트 `focus`/`blur`<br />- 리소스 이벤트 `load`/`unload`/`abort`/`error`<br />- 마우스 이벤트 `dblclick`/`mouseenter`/`mouseleave` |
| `defaultPrevented` | `boolean`     | `preventDefault`를 호출했는지 그 여부를 나타낸다.            |
| `isTrusted`        | `boolean`     | 사용자의 행위로 발생한 이벤트인지 그 여부를 나타낸다.        |
| `timestamp`        | `number`      | 이벤트가 발생한 시각이다. 1970/01/01/00:00:0부터 경과한 밀리초이다. |

## 이벤트 전파

**이벤트 전파(event propagation)**은 DOM 트리에 존재하는 DOM 요소 노드에서 발생한 이벤트가 DOM 트리를 통해 전파되는 것이다. 이벤트가 발생하여 생성된 이벤트 객체는 이벤트를 발생시킨 이벤트 타겟(event target)을 중심으로 DOM 트리를 통해 전파된다. 이벤트 전파는 전파 방향에 따라 3단계로 나눈다.

1. 캡처링 단계(capturing phase): 이벤트가 상위에서 하위 방향으로 전파된다.
2. 타겟 단계(target phase): 이벤트가 이벤트 타겟에 도달한다.
3. 버블링 단계(bubbling phase): 이벤트가 하위에서 상위 방향으로 전파된다.

```html
<body>
  <ul id="colors">
  <li id="blue">파랑</li>
	</ul>
</body>
<script>
	const colors = document.getElementById('colors');
  const blue = document.getElementById('blue');
  
  colors.addEventListener('click', (e) => {
    console.log(`이벤트 단계: ${e.eventPhase}`);	// 1: 캡처링 단계
  }, true);
  colors.addEventListener('click', (e) => {
    console.log(`이벤트 단계: ${e.eventPhase}`);	// 3: 버블링 단계
  });
  
  blue.addEventListener('click', (e) => {
    console.log(`이벤트 단계: ${e.eventPhase}`);	// 2: 타겟 단계
  })
</script>
```

`li`를 누르면 이벤트 객체가 생성된다.

1. 캡처링 단계: 이벤트가 `window`부터 하위 방향으로 전파된다.
2. 타겟 단계: 이벤트가 `li`(이벤트 타겟)에 도달한다.
3. 버블링 단계: 이벤트가 `li`에서 `window` 방향으로 전파된다

### 이벤트 전파 방지

```html
<body>
  <ul id="colors">
    <li id="blue"></li>
  </ul>
</body>
<script>
  blue.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('li에 도착');
  })

  colors.addEventListener('click', (e) => {
    console.log('ul까지 버블링');
  });
	
  window.addEventListener('click', (e) => {
    console.log('window까지 버블링');
  });
</script>
```

`addEventListener`의 `useCapture`가 `false`이므로, 타겟 단계와 버블링 단계만 캐치한다. `li`를 누르면 캡처링 단계 후 타겟 단계에 도달하여 이벤트 핸들러가 실행되는데, 이때 `Event.prototype.stopPropagation`을 호출하였으므로 더이상 이벤트가 전파되지 않는다. 만일 `li`에서 호출하지 않고 `ul`에서 해당 메서드를 호출했다면 `ul`까지는 이벤트가 전파되고 더이상 전파되지 않을 것이다.

## 커스텀 이벤트

### 커스텀 이벤트 객체 생성

```javascript
const event = new CustomEvent('이벤트 타입', [,options]);
```

기본적으로 생성된 커스텀 이벤트 객체의 `bubbles`와 `cancelable` 프로퍼티는 `false`이다. 즉, 버블링되지 않으며 `preventDefault` 메서드로 취소할 수 없다. `options` 인자에서 프로퍼티 값을 지정할 수 있다.

```javascript
const customEvent = new CustomEvent('foo', {
  bubbles: true,
  cancelable: true
});
```

### 커스텀 이벤트 디스패치

```javascript
EventTarget.prototype.dispatch(event);
```

`EventTarget`을 상속받은 객체에 이벤트를 디스패치한다. 이때 등록한 이벤트 핸들러는 동기적으로 작동한다. 직접 이벤트 핸들러를 일반 함수처럼 호출한 것과 같다.

```javascript
const button = getElementById('hello');
button.addEventListener('foo', () => console.log('custom event 발생!'));
button.dispatch(new CustomEvent('foo'));
```



## 참고

- 모던 자바스크립트 Deep Dive 40장 이벤트