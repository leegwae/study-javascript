# Call by Sharing

자바스크립트는 [**값에 의한 호출(call by value)**](https://github.com/leegwae/study-javascript/blob/main/03.%20Variable%20and%20Constant.md/#34-pass-by-value)을 사용한다. 호출자(caller; 함수를 호출한 전역 문맥 또는 함수)는 함수를 호출할 때 인자를 전달하고, 인자는 값에 의한 호출에 따라 값이 복사되어 매개변수로 전달된다. 따라서 호출된 함수(calle)가 함수 내부에서 인수의 값을 바꾸어도 이는 함수 외부 곧 호출자에게 반영되지 않는다.



## 값에 의한 호출

```js
function changeValue(a, b) {
    a = a + 1;
    b = { item: 'changed' };
}

let num = 1;
let obj = { item: 'unchanged' };

changeValue(num, obj);
console.log(num);	// 1
console.log(obj.item);	// unchanged
```

우선 `num`을 선언할 때 확보한 메모리 공간에는 원시 값 `1`이 들어있다. `obj`를 선언할 때 확보한 메모리 공간에는 객체 리터럴 `{ item: 'unchanged '}`가 평가된 객체 값이 저장된 메모리 공간에 대한 참조 값이 들어있다. 값에 의한 호출에 따라 원시 값은 매개변수 `a`에, 참조 값은 `b`에 복사된다.

변수의 값을 다른 변수에 할당하면, 변수는 새로 메모리 공간을 확보하고 원본 변수의 값을 복사하여 저장한다. 따라서 `a`는 `num`과 서로 다른 메모리 공간을 가지며 같은 값 곧 `1`을 저장할 뿐이다. 동일하게 `b`는 `obj`와 서로 다른 메모리 공간을 가지며 같은 값 곧 객체에 대한 참조값을 저장할 뿐이다.

`changeValue` 함수는 함수 몸체 안에서 `a`와 `b`에 새로운 값을 할당하였는데, 인자가 매개변수로 복사될 때처럼 새로운 메모리 공간을 확보하여 거기에 값을 저장하게 되므로 `a`와 `b`는 또다시 새로운 메모리 공간에서 값을 가져오게 된다. 따라서 `a`와 `b`를 변경해도 `num`과 `obj`에는 변화가 없다. 달리 말하여 호출된 함수가 내부에서 인자를 변경해도 그 변화가 호출자에게 가시적이지 않다.

이런 자바스크립트의 평가 전략을 **값에 의한 전달(pass by value)** 혹은 **값에 의한 호출(pass by call)**이라고 한다.



## 공유에 의한 호출

그러나 호출된 함수가 내부에서 인자로 전달받은 객체의 프로퍼티를 수정하면 그 변화가 호출자에게 가시적이다.

```js
function changeValue(a, b, c) {
    a = a + 1;
    b = { item: 'changed' };
    c.item = 'changed'
}

let num = 1;
let obj1 = { item: 'unchanged' };
let obj2 = { item: 'unchanged' };

changeValue(num, obj1, obj2);

console.log(num);	// 1
console.log(obj1.item);	// unchanged
console.log(obj2.item);	// changed
```

그것은 전역의 `obj2`와 `changeValue`의 지역 변수 `c`가 같은 객체를 참조하기 때문이다. `obj2`가 가리키는 메모리 공간에 저장된 객체에 대한 참조값이 `c`가 확보한 메모리 공간에 복사되었다. 둘은 같은 값을 가지는데, 이 값은 참조 값이라 결국 같은 객체에 대한 참조이다. `b`처럼 객체 리터럴을 평가하여 새로운 메모리 공간을 가리키는 것이 아니라 `c.item`으로 객체를 참조하여 프로퍼티를 변경하였으므로, 같은 객체를 참조하고 있는 `obj2`에도 이 변경이 가시적이다.

이러한 자바스크립트의 평가 전략은 값에 의한 호출(call by value)나 참조에 의한 호출(call by reference)로 온전히 설명하기는 어려워, 동일한 참조 값을 가지면 동일한 객체를 공유하는 것이라고 말할 수 있으므로 **공유에 의한 전달(pass by sharing)** 혹은 **공유에 의한 호출(call by sharing)**이라고 한다.



## 참고

[Is JavaScript a pass-by-reference or pass-by-value language?](https://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language)

[wikipedia - call by sharing](https://en.wikipedia.org/wiki/Evaluation_strategy#Call_by_sharing)

