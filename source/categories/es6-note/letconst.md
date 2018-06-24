ES6以前声明使用var声明变量，var声明的变量存在声明提升，并且无块级作用域，因此ES6引入了let和const

### let命令
+ let命令声明的变量类似于var，但是它声明的变量存在块级作用域，也就是说它只在自己所声明的代码块有效  

```js
{
  let a = 10;
  var b = 1;
}
console.log(a);  //报错，因为let声明的a只在代码块中有效
console.log(b);  //输出1
```

看如下代码对比var和let的不同  

```js
var funcs = [];
for(var i=0;i<10;i++){
  funcs.push(function(){
    console.log(i);
  })
}
funcs.forEach(function(func){
  func();
})
```  

上例中因为var声明i并没有块级作用域，因此自始至终只有一份i，所有最终输出的是10个10

ES6以前解决以上问题需要使用闭包  

```js
var funcs2 = [];
for(var j=0;j<10;j++){
  funcs2.push((function(value){
    return function(){
      console.log(value);
    }
  }(j)))
}
funcs2.forEach(function(func){
  func();
})
```  

此例最终输出0,1,2,3,4,5,6,7,8,9

而出现ES6以后解决这种问题变的极为简单，只需要使用let定义for循环中的变量  

```js
var funcs3 = [];
for(let g=0;g<10;g++){
  funcs3.push(function(){
    console.log(g);
  })
}
funcs3.forEach(function(func){
  func();
})
```

+ let总结
  - let声明的变量不存在变量提升
  - let声明的变量具有块级作用域
  - 不允许重复声明
  - let声明的变量具有暂时性死区，也就是说如果在外部作用域有相同名称的变量，let所在作用域的变量不受外部变量影响，且let作用域访问不到与外部与let声明的变量名相同的变量  

```js
var a = 1;
if(true){
  a = 2;  //Uncaught ReferenceError: a is not defined
  let a;
}
```

### const命令
+ const声明一个只读的常量，一旦声明，常量的值就不能改变  

```js
const a = 1;
console.log(a);   //1
a = 2; //报错
```

+ const声明的常量必须立即赋值，否则报错  

```js
const foo;//报错Uncaught SyntaxError: Missing initializer in const declaration
```

+ const的作用域和let命令相同，只在声明所在的块级作用域有效  

```js
if(true){
  const a = 5;
}
console.log(a) //报错
```

+ const声明的常量同样存在暂时性死区，只能在声明之后的位置使用
+ const声明的常量不可重复

<script src='./data-bar.js'></script>
<script>
  var name = 'letconst';
  eleObj.child.forEach(function(item){
    if(item.name && item.name === name){
      item.child[0].style = Object.assign({}, item.child[0].style, {color: '#fc6423'});
    }
  })
</script>
<script src='../../static-source/createElment.js'></script>