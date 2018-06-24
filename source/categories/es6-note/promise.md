### Promise对象
----------本篇主要参考阮一峰ESMAScript6入门，详请参考[ECMAScript6入门](http://es6.ruanyifeng.com/#docs/promise)


#### 介绍
+ Promise是一种异步解决方案，可以使异步操作以同步的方式展现，以避免回调函数导致的层层嵌套问题。


#### 特点
Promise三种状态：pending(进行中)、fulfilled(已成功)、rejected(已失败)
Promise状态改变只有两种结果
1. pending ---->  fufilled  
2. pending ---->  rejected  


#### 缺点
+ Promise一旦新建就立即执行，无法中途取消
+ 其次，如果不设置回调函数，Promise内部抛出错误不会反应到外部
+ 当处于pending状态时，无法得知目前进展到哪一个阶段


#### 用法  

```js
const promise = new Promise(function(resolve,reject){
    // ... your code
    if(/*success*/){
        resolve(value);
    }else{
        reject(error);
    }
})
```

+ resolve(): 将Promise对象的状态从“未完成”变为“成功”，并将异步操作结果传出去
+ reject(): 将Promise对象的状态从“未完成”变为“失败”，并将失败结果传出去

Promise实例生成以后，可以用then方法指定resolve状态和reject状态的回调函数

```js
promise.then(function(value){
    //success
},function(error){
    //failure
})
```

+ 实例一[链接](https://ybonest.github.io/es6-note/html/promise.html)  

```js
//es6 Promise对象
const promise = new Promise(function(resolve,reject){
    setTimeout(() => {
        resolve("success")
    },2000)
});
promise.then((result) => {
    console.log(result);
})
```

+ 实例二(ajax请求)

```js
<script>
    const getJson = function(url) {
        const promise = new Promise(function(resolve,reject){
            const handFn = function() {
                if(this.readyState !==4 ){
                    return;
                }    
                if(this.status === 200 ){
                    resolve(this.response); //成功后将数据返回resolve对应的回调函数
                }else {
                    //失败-将错误信息传入reject对应的回调函数
                    reject(new Error(this.statusText))
                }
            }

            const xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET",url);
            xmlHttp.onreadystatechange = handFn;
            xmlHttp.responseType = "json";
            xmlHttp.setRequestHeader("Accept","application/json");
            xmlHttp.send();
        })
        return promise;
    }
    getJson("./myjson.json").then(function(json){
        console.log(json);
    },function(error){
        console.error(error);
    });
</script>
```

Promise的reject函数通常传递错误参数，而resolve函数除了正常值外，还可以传递其他Promise实例

```js
<script>
    const p1 = new Promise(function(resolve,reject){
        setTimeout(()=>{
            console.log("p1");
            reject(new Error('fail'));
        },3000)
    });
    const p2 = new Promise(function(resolve,reject){
        setTimeout(()=>{
            console.log("p2");
            resolve(p1)
        },1000)
    })

    p2.then( result => console.log(result))
    .catch(error => console.log(error))
</script>
```

> 以上代码1s后打印p2，然后执行resolve(p1),由于resolve函数获取的参数是Promise的一个实例，所以导致p2的状态由p1接管了，最终到3s后输出p1，然后p1执行reject()部分，返回错误，导致catch部分被执行

Promise.prototype.then()  
1. 作用：为Promise实例添加状态改变时的回调函数
  - 参数一:resolved状态的回调函数
  - 参数二:rejected状态的回调函数
2. 链式调用：可以指定一组依次调用的回调函数

```js
<script>
    var timeOutFn = (arg) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(arg);
                resolve(arg+" resolve");
            }, 2000)
        })
    }
    timeOutFn("p1").then((reusult) => {
        <!-- return timeOutFn('p2'); -->
        console.log(reusult)
    }).then((reusult)=>{
        console.log(reusult)
    },(err)=>{
        console.log(err);
    })
</script>
```

> 注意：链式调用时前一个then里面须得返回一个Promise实例，否则之后的then无法调用，并且后续的then需要等待前面then的Promise实例执行完毕才会执行

+ Promise.prototype.catch() --- 推荐使用catch()而不是使用then的中的第二个回调函数处理错误
    - Promise.prototype.catch方法是.then(null,rejection)的别名，用于指定发生错误时的回调函数，即异步操作状态变为rejected时的执行
    - Promise对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获

```js
XX1.then(post=>{
    return XX2;
}).then(post=>{

}).catch((err)=>{
    //处理前面所以Promise产生的错误
})
```


<script src='./data-bar.js'></script>
<script>
  var name = 'promise';
  eleObj.child.forEach(function(item){
    if(item.name && item.name === name){
      item.child[0].style = Object.assign({}, item.child[0].style, {color: '#fc6423'});
    }
  })
</script>
<script src='../../static-source/createElment.js'></script>