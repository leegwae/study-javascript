# Call by Sharing

```js
function changeValue(a, b, c) {
    v = a + 1;
    b.item = 'changed'
    c = { item: 'changed' };
}

let num = 1;
let obj1 = { item: 'unchanged' };
let obj2 = { item: 'unchanged' };

changeValue(num, obj1, obj2);

console.log(num);
console.log(obj1.item);
console.log(obj2.item);
```

결과는 다음과 같다.

```
2
changed
unchanged
```



- **call by sharing**은 언어의 값이 원시 타입보다는 객체라는 것을 암시한다. 즉, 모든 값들을 박싱된다. 값들은 박싱되었으므로, pass by copy of reference(원시 값들이 전달되기 전 박싱되고 호출된 함수에서 언박싱되는 것)라고 말할 수 있는 것이다.
- call by sharing의 semantic은 다른 호출 방식과 다르다.
  - 호출된 함수에 의해 수행된 인수의 mutation이 호출자(caller; 함수를 호출한 함수)에게 가시적이므로 call by value가 아니다.
    - (immutable, primitive 값) 변수가 전달되면, 이 변수의 값이 복사되므로 피호출자(callee; 호출된 함수)의 스코프에서 변수에 새로운 값을 **할당**하는 것은 불가능하다(함수 내부에서 변수에 값을 할당해도 변수에 새로운 값이 할당되지 않는다). 이러한 점에서는 call by value와 비슷하다. 그러나
    - mutable 객체가 전달되면, 이 객체는 복사되거나 복제되지 않고 **공유되므로**, 함수 내부에서의 **mutation**은 호출자에게 가시적이다(함수 내부에서 객체를 수정하면 원본 객체에 반영된다).
  - 호출자의 변수들은 접근할 수 없지만 특정 객체는 가능하다는 점에서 call by reference가 아니다.



## 참고

[Is JavaScript a pass-by-reference or pass-by-value language?](https://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language)

[wikipedia - call by sharing](https://en.wikipedia.org/wiki/Evaluation_strategy#Call_by_sharing)

