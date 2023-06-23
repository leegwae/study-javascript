# Class

클래스는 ES6에 도입된 새로운 객체 생성 메커니즘이다.

## 클래스는 함수이다

```javascript
typeof class {} === 'function';
```

클래스는 생성자 함수처럼 프로토타입을 기반으로 인스턴스를 만들 수 있는 객체 생성 메커니즘으로, constructor이다. 생성자 함수와 마찬가지로 클래스 정의가 평가되어 함수 객체가 생성될 때 프로토타입도 생성된다.

### 생성자 함수와 클래스의 차이

생성자 함수와 클래스는 몇 가지 차이를 가진다.

1. 클래스는 `new` 연산자 없이 호출할 수 없다.
2. 클래스는 `extends`와 `super`를 지원한다.
3. 클래스는 `let`과 `const`처럼 호이스팅이 발생하지 않는 것처럼 동작한다.
4. 클래스는 암묵적으로 strict mode로 지정되었고 해제할 수 없다.
5. 클래스의 `constructor`, 프로토타입 메서드, 정적 메서드는 열거 불가능하다.

## 클래스의 생성과 실행

> 1. **클래스를 정의**하여 생성자 함수를 생성한다.
> 2. **클래스를 호출**하여 생성자 함수를 실행한다.

### 클래스 정의

클래스 정의는 `class` 키워드, 클래스 이름, 클래스 본문으로 구성된다.

```javascript
class 클래스이름 {
    // 클래스 본문
}
```

- 클래스 본문에 0개 이상의 멤버와 0개 이상의 메서드를 선언한다.
- 메서드에는 `constructor`, 프로토타입 메서드, 정적 메서드가 있다.

### 클래스 호출

클래스 호출은 생성자 함수를 실행하여 인스턴스를 생성하고 반환한다.

```javascript
class Champion {}
const c = new Champion();
```

반드시 `new` 연산자와 함께 호출해야한다.

```javascript
class Champion {}
const c = Champion()
// Uncaught TypeError: Class constructor Champion cannot be invoked without 'new'
```



## 클래스 정의하기

JavaScript에서 클래스를 정의하는 방법은 아래와 같다.

- 클래스 선언문: `class` 문
- 클래스 표현식: `class` 표현식

### 클래스 선언문

클래스 선언문은 기명 클래스 리터럴과 동일한 형태를 가진다. 클래스 선언문을 사용하는 것이 일반적이다.

```javascript
class 클래스이름 {
    // 클래스 몸체
}
```

```javascript
class Champion {
    constructor(name) {
        this.name = name;
    }
}
```

단, 클래스 리터럴과 달리 클래스 이름을 생략할 수 없으며 값으로 평가될 수 없으므로 표현식이 아닌 문이다.

### 클래스 표현식

클래스 표현식은 클래스 리터럴을 변수에 할당하는 방식이다. 클래스 표현식에서 클래스 이름을 생략하는지에 따라 다음과 같이 나눌 수 있다.

1. 기명 클래스 표현식
2. 익명 클래스 표현식

#### 기명 클래스 표현식

기명 클래스 표현식은 이름이 있는 클래스 표현식이다. 단독으로 사용하면 클래스 선언문으로 해석하므로 주의한다.

```javascript
class 클래스이름 {
    // 클래스 몸체
}
```

```javascript
let Champion = class Foo {
    constructor(name) {
        this.name = name;
    }
}

new Champion('lux');
```

이때 클래스 이름은 클래스 내부에서만 참조할 수 있다.

#### 익명 클래스 표현식

익명 클래스 표현식은 이름이 없는 클래스 표현식이다.

```javascript
class {
    // 클래스 몸체
}
```

```javascript
let Champion = class {
    constructor(name) {
        this.name = name;
    }
}

new Champion('lux');
```

## 클래스 필드

**클래스 필드(class field)**는 생성될 인스턴스의 프로퍼티나 메서드를 말한다.

클래스 필드는 기본적으로 public하다. private한 클래스 필드에 대해서는 [private 클래스 필드](#private-클래스-필드)를 참고한다.

## 메서드

**메서드(method)**는 메서드 축약 표현으로 정의된 클래스 필드이다. 클래스 몸체에 0개 이상의 메서드를 선언할 수 있다.

```javascript
class 클래스이름 {
    메서드이름1() {}
    메서드이름2() {}
}
```

메서드의 종류는 다음과 같다.

1. `constructor`
2. 프로토타입 메서드
3. 정적 메서드

### `constructor`

- **`constructor`**는 인스턴스를 생성하고 초기화할 때 사용되는 메서드이다.

- `constructor` 내부의 `this`는 생성될 인스턴스를 가리키므로 `this.프로퍼티`를 통해 프로퍼티를 정의한다.

  ```javascript
  class Champion {
      constructor(name) {
          this.name = name;
      }
  }
  ```

- `constructor`는 생략할 수 있으며 `constructor`를 생략하면 빈 `constructor`가 암묵적으로 정의된다.
- 2개 이상의 `constructor`를 정의하면 `SyntaxError`가 발생한다.
- `constructor`는 특수한 메서드로서, 메서드로 해석되지 않는다. 클래스 정의가 평가되면 `constructor`의 내부 코드를 가진 함수 객체가 생성된다.
- `constructor`는 기본적으로 `this`(생성될 인스턴스)를 반환한다. 객체인 값을 반환하면 해당 객체를 반환하며, 객체가 아닌 값을 반환하면 무시하고 `this`를 반환한다.

### 프로토타입 메서드

**프로토타입 메서드**는 프로토타입 객체의 메서드이므로 인스턴스가 프로토타입 체인을 통해 사용할 수 있다. 함수 본체에 메서드 축약 표현을 사용한다.

```javascript
class 클래스 {
    메서드이름() {}
}
```

```javascript
class Champion {
    constructor(name) {
        this.name = name;
    }
    
    hello() {
        console.log(this.name);
    }
}
```

### 정적 메서드

**정적 메서드**는 생성자 함수 객체의 메서드이다. 프로토타입 객체와 인스턴스가 속한 프로토타입 체인에 속해있지 않으므로 인스턴스가 상속받지 않는다. 프로토타입 메서드 앞에 `static` 키워드를 붙인다.

```javascript
class 클래스 {
    static 메서드이름() {}
}
```

생성자 함수 객체는 프로토타입 객체가 속한 프로토타입 체인에 속하지 않으므로 인스턴스는 정적 메서드에 접근할 수 없다.

### 프로토타입 메서드와 정적 메서드의 차이점

1. 정적 메서드를 프로퍼티로 가지는 생성자 함수 객체와 프로토타입 메서드를 프로퍼티로 가지는 프로토타입 객체가 속한 프로토타입 체인은 다르다.
2. 정적 메서드는 클래스(생성자 함수 객체)를 통해, 프로토타입 메서드는 인스턴스를 통해 호출한다.
3. 정적 메서드는 인스턴스의 프로퍼티를 참조할 수 없다.

### 클래스 메서드의 특징

1. 메서드 축약 표현을 사용하여 정의한다.
2. 암묵적으로 strict mode로 실행된다.
3. 열거할 수 없다.
4. non-constructor이다.

## 프로퍼티

**프로퍼티(property)**는 자바스크립트 값을 가지는 클래스 필드이다.

### 인스턴스 프로퍼티

**인스턴스 프로퍼티**는 인스턴스 객체의 프로퍼티이다. 즉, 프로토타입 객체의 프로퍼티가 아니며 인스턴스 객체마다 생성된다. 인스턴스 프로퍼티를 정의하는 방법은 두 가지이다.

1. `constructor` 내부에서 정의하기
2. `constructor` 외부에서 정의하기

`constructor`의 파라미터로 전달받은 값을 할당하려면 1번을, 그렇지 않다면 2번을 사용하여 인스턴스 프로퍼티를 정의한다.

#### `constructor` 내부에서 정의하기

`constructor` 내부에서 `this.프로퍼티`에 값을 할당하여 정의한다.

```javascript
class 클래스이름 {
    constructor(파라미터1) {
        this.프로퍼티이름 = 파라미터1;
    }
}
```

```javascript
class Champion {
    constructor(name) {
        this.name = name;
    }
}
```

#### `constructor` 외부에서 정의하기

`constructor` 외부에서 키워드 없이 식별자를 선언하여 정의한다. 값을 할당하여 선언과 동시에 초기화할 수도 있다.

```javascript
class 클래스이름 {
    프로퍼티이름;
    프로퍼티이름 = 값;
}
```

```javascript
class Champion {
    name = 'initial name';
}
```

### 접근자 프로퍼티

함수 몸체에 메서드 축약 표현을 사용한다.

```javascript
class Champion {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    
    get fullName(){
        return `${this.firstName} ${this.lastName}`
    }
    
    set fullName(name) {
        [this.firstName, this.lastName] = name.split(' ')
    }
}
```

### 정적 프로퍼티

정적 프로퍼티는 생성자 함수 객체의 프로퍼티이다. `static` 키워드와 함께 `constructor` 외부에서 정의한다. 값을 할당하여 선언과 동시에 초기화할 수 있다.

```javascript
class 클래스이름 {
    static 필드이름;
    static 필드이름 = 값;
}
```

## `private` 클래스 필드

`private` 클래스 필드는 프로토타입 체인을 통해 상속되지 않으며 인스턴스를 통해 외부에 노출되지 않는다. 메서드나 프로퍼티의 이름 앞에 `#`를 붙여 선언한다. 이때, `constructor` 내부에서 사용하려는 `private` 인스턴스 프로퍼티는 반드시 `constructor` 외부에 정의해야한다.

```javascript
class 클래스이름 {
    // 인스턴스 프로퍼티
    #인스턴스프로퍼티;
    constructor(파라미터) {
        this.#인스턴스프로퍼티 = 파라미터;
    }
    
    // 정적 프로퍼티
    static #정적프로퍼티;
    
    // 프로토타입 메서드
    #프로토타입메서드1() {}
    
    // 정적 메서드
    static #정적메서드2() {}
}
```

값이 담길 프로퍼티는 `private`으로 숨기고, 접근할 수 있는 메서드만 제공할 수도 있다.

```javascript
class Champion {
    #name;
    
    constructor(name) {
        this.#name = name;
    }
    
    getName() {
        return this.#name;
    }
    
    setName(newName) {
        this.#name = newName;
    }
}
```
