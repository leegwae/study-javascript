# async and await

async와 await는 ECMAScript 2017에 도입되었다.



## async/await 기본

async/await는 두 부분으로 나눌 수 있다.



### async 키워드

async function은 프로미스를 반환한다.

- 함수 선언

```js
async function hello() { return 'HELLO'; };
hello();
```

- async function expression

```js
let hello = async function() { return 'HELLO'; };
hello();
```

- 화살표 함수

```js
let hello = async () => 'HELLO';
```



#### 반환된 프로미스 사용하기

프로미스가 fullfilled 상태일 때 반환된 값을 사용하려면 `.then()` 블록을 사용한다.

```js
hello().then((value) => console.log(value)); // 혹은
hello().then(console.log);
```



### await 키워드

- `await`는 async function 내부에서만 기능한다.
- `await`는 모든 async promise-based function 앞에 올 수 있으며, 이 함수는 프로미스가 fulilled 상태가 되어 결과값을 반활할 때까지 코드의 실행을 멈춘다.
- `await`는 프로미스를 반환하는 모든 함수를 호출할 때 사용할 수 있다.

```js
async function hello() {
    return await Promise.resolve('HELLO');
};

hello().then(alert);
```



## async/await로 다시 써보기

```js
fetch('coffee.jpg')
.then(response => response.blob())
.then(myBlob => {
  let objectURL = URL.createObjectURL(myBlob);
  let image = document.createElement('img');
  image.src = objectURL;
  document.body.appendChild(image);
})
.catch(e => {
  console.log('There has been a problem with your fetch operation: ' + e.message);
});
```



```js
async function myFetch() {
    let response = await fech('coffee.jpg');
    
    if (!response.ok) {
        throw new Error('HTTP error! status: ${response.status}');
    }
    
    return await reponse.blob();
}

myFetch().then((blob) => {
    let objectURL = URL.createObjectURL(myBlob);
    let image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
})
.catch(e => console.log(e.message))
```

- fullfilled `fetc()` 프로미스가 반환한 reponse는 reponse가 사용가능해지면 `reponse` 변수에 할당된다.
- 파서는 이 일이 일어날 때까지 정지한다.
- reponse가 사용가능해지면, 파서는 다음 라인으로 이동하여 reponse의 `Blob`을 만든다. 여기서 async promise-based method를 호출하므로 `await`를 사용할 수 있다.
- 연산의 값이 반환되면, `myFetch()` 함수가 이 결과를 반환한다.
- `myFetch()` 함수를 호출할 때 프로미스를 반환하므로, `.then()`을 체이닝할 수 있다.





https://developer.mozilla.org/ko/docs/Learn/JavaScript/Asynchronous/Async_await#awaiting_a_promise.all



## 참고

[MDN asynchronous programming with async and await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)

