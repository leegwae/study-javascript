# Property Attributes

## 내부 슬롯과 내부 메서드

- ECMAScript는 자바스크립트 엔진의 내부 로직을 설명하기 위해 의사 프로퍼티(pseudo property)로 **내부 슬롯**과 의사 메서드(pseudo method)로 **내부 메서드**를 사용한다. 내부 슬롯과 내부 메서드는 이중 대괄호 `[[]]`로 감싸 표현한다.
- 내부 슬롯과 내부 메서드는 자바스크립트 엔진 내부 로직이므로 그 중 일부에만 간접적으로 접근할 수 있는 방법이 제공된다.



## 프로퍼티의 상태와 프로퍼티 어트리뷰트

자바스크립트 엔진이 관리하는 내부 상태 값(meta-property)는 내부 슬롯으로 표현된다. 이때 프로퍼티의 상태를 나타내는 내부 슬롯을 **프로퍼티 어트리뷰트**(property attribute)라고 한다. 자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티 어트리뷰트를 기본값으로 정의한다.

일반적인 프로퍼티의 상태와 그에 대응하는 프로퍼티 어트리뷰트은 다음과 같다.

| 프로퍼티의 상태                           | 프로퍼티 어트리뷰트 |
| ----------------------------------------- | ------------------- |
| 프로퍼티의 값(value)                      | `[[Value]]`         |
| 값의 갱신 가능 여부(writable)             | `[[Writable]]`      |
| 프로퍼티의 열거 가능 여부(enumerable)     | `[[Enumerable]]`    |
| 프로퍼티의 재정의 가능 여부(configurable) | `[[Configurable]]`  |



## 프로퍼티 디스크립터 객체

자바스크립트는 프로퍼티 어트리뷰트에 간접적으로 접근할 수 있는 메서드를 제공한다. 이 메서드들은 프로퍼티 어트리뷰트에 대한 **프로퍼티 디스크립터(`PropertyDescriptor`) 객체**를 반환한다.

- `Object.getOwnPropertyDescriptor(obj, prop)`: 하나의 프로퍼티에 대한 프로퍼티 디스크립터 객체 반환
- `Object.getOwnPropertyDescriptors(obj)`: 객체의 모든 프로퍼티에 대한 프로퍼티 디스크립트 객체를 반환

```js
const champion = {
    name: 'lux'
};
const descriptor = Object.getOwnPropertyDescriptors(champion, 'name');
console.log(JSON.stringfy(descriptor));
// {"name":{"value":"lux","writable":true,"enumerable":true,"configurable":true}}
```

[Object - `Object.getOwnPropertyDescriptor()`](https://github.com/leegwae/study-javascript/blob/main/Object.md#objectgetownpropertydescriptor)와 [`Object.getOwnPropertyDescriptors()`](https://github.com/leegwae/study-javascript/blob/main/Object.md#objectgetownpropertydescriptors)를 참고한다.



## 데이터 프로퍼티와 접근자 프로퍼티

프로퍼티는 데이터 프로퍼티와 접근자 프로퍼티로 나눌 수 있다.

- **데이터 프로퍼티**(data property): 키와 값으로 구성된 일반적인 프로퍼티
- **접근자 프로퍼티**(accessor property): 값을 가지지 않으며, 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수(accessor function)으로 구성된 프로퍼티



### 데이터 프로퍼티

**데이터 프로퍼티**(data property)는 다음과 같은 프로퍼티 어트리뷰트를 가진다.

| 프로퍼티 어트리뷰트 | 기본값      | 설명                                                         |
| ------------------- | ----------- | ------------------------------------------------------------ |
| `[[Value]]`         | `undefined` | - 프로퍼티 키를 통해 프로퍼티 값에 접근하면 반환되는 값이다.<br />- 프로퍼티 키를 통해 프로퍼티 값을 바꾸면 `[[Value]]`에 값을 재할당한다. 프로퍼티 키가 없다면 프로퍼티를 동적 생성하고 생성된 프로퍼티의 `[[Value]]`에 값을 저장한다. |
| `[[Writable]]`      | `false`     | - 프로퍼티의 값을 변경할 수 있는지 나타내는 `boolean` 값을 가진다.<br />- `false`이면 그 프로퍼티는 읽기 전용 프로퍼티가 된다. |
| `[[Enumerable]]`    | `false`     | - 프로퍼티를 열거할 수 있는지 나타내는 `boolean` 값을 가진다.<br />- `false`이면 그 프로퍼티는 `for... in`과 `Object.keys` 메서드 등으로 열거할 수 없다. |
| `[[Configurable]]`  | `false`     | - 프로퍼티를 재정의할 수 있는지 나타내는 `boolean` 값을 가진다.<br />- `false`이면 그 프로퍼티를 삭제하거나 값을 변경할 수 없다. 단, `[[Writable]]`이 `true`라면 `[[Value]]`를 변경하거나 `[[Writable]]`을 `false`로 바꿀 수 있다. |

프로퍼티가 생성될 때 `[[Value]]`의 값은 프로퍼티의 값으로 초기화되며 나머지 프로퍼티 어트리뷰트는 `true`로 초기화된다.



### 접근자 프로퍼티

**접근자 프로퍼티**(accessor property)는 다음과 같은 프로퍼티 어트리뷰트를 갖는다.

| 프로퍼티 어트리뷰트 | 기본값      | 설명                                                         |
| ------------------- | ----------- | ------------------------------------------------------------ |
| `[[Get]]`           | `undefined` | 데이터 프로퍼티의 값을 읽을 때 호출되는 접근자 함수를 값으로 가진다. |
| `[[Set]]`           | `undefined` | 데이터 프로퍼티의 값을 저장할 때 호출되는 접근자 함수를 값으로 가진다. |
| `[[Enumerable]]`    | `false`     | 데이터 프로퍼티와 동일                                       |
| `[[Configurable]]`  | `false`     | 데이터프로퍼티와 동일                                        |

값을 읽는 접근자 함수를 getter, 값을 저장하는 접근자 함수를 setter라고 한다.



### 접근자 프로퍼티의 동작

```js
const champion = {
    firstName: 'Luxanna',
    lastName: 'Crownguard',
    
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    set fullName(name) {
        [this.firstName, this.lastName] = name.split(' ');
    }
};

console.log(champion.fullName);	// Luxanna Crownguard
champion.fullName = 'Caitlyn Kiramman';
console.log(champion.fullName);	// Caitlyn Kiramman
```

접근자 프로퍼티 `getName`으로 프로퍼티의 값에 접근하면 내부적으로 `[[Get]]` 내부 메서드가 호출된다.

1. 프로퍼티 키가 유효한지 확인한다. 프로퍼티 키 `'fullName'`는 문자열이므로 유효하다.
2. 프로토타입 체인에서 프로퍼티를 검색한다. `champion` 객체에 `fullName `프로퍼티가 존재한다.
3. 검색한 프로퍼티가 데이터 프로퍼티인지 접근자 프로퍼티인지 확인한다. `fullName` 프로퍼티는 접근자 프로퍼티이다.
4. 접근자 프로퍼티라면 프로퍼티 어트리뷰트 `[[Get]]`의 값인 getter 함수를 호출한다. 여기서는 `fullName`의 프로퍼티 어트리뷰트 `[[Get]]`의 값인 getter 함수를 호출한다.



## 프로퍼티 정의하기

프로퍼티 정의는 새로운 프로퍼티를 추가할 때 프로퍼티 어트리뷰트를 명시하거나 기존 프로퍼티의 프로퍼티 어트리뷰트를 재정의하는 것이다. 자바스크립트는 프로퍼티 정의를 할 수 있는 메서드를 제공한다.

- `Object.defineProperty()`: 하나의 프로퍼티 어트리뷰트를 정의하고 해당 객체를 반환
- `Object.defienProperties()`: 여러 개의 프로퍼티 어트리뷰트를 정의하고 해당 객체를 반환

```js
const champion = {};

Object.defineProperty(champion, 'name', {
    value: 'luxanna',
    writable: true,
    enumerable: true,
    configurable: true
});
console.log(champion.name);	// laxanna
const descriptor = Object.getOwnPropertyDescriptors(champion, 'name');
console.log(JSON.stringfy(descriptor));
// // {"name":{"value":"lux","writable":true,"enumerable":true,"configurable":true}}
```

[Object - `Object.defineProperty()`](https://github.com/leegwae/study-javascript/blob/main/Object.md#objectdefineProperty)와 [`Object.defineProperties()`](https://github.com/leegwae/study-javascript/blob/main/Object.md#objectdefineproperties)를 참고한다.



## 객체의 변경 방지하기

TODO