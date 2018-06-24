#### 基本用法
es6以前变量赋值只能这样：  

```js
let a = 1;
let b = 2;
let c = 3;
```
而es6中允许:  

```js
let [a,b,c] = [1,2,3];
```

**本质上只要等号两边模式相同，左边的变量就会被赋予对应的值，这就是解构，如果解构不成功变量的值就为undefined**

注意一下用法：
```js  

let [x, ...y] = [1,2,3,4]  //x=1; y=[2,3,4]
let [x,y, ...z] = ['a']  //x='a';y=undefined;z=[];
```

如果等号右边不是数组，将会报错，例：  

```js
let [foo] = 1;
let [foo] = {}; //以上两种都会报错
```

#### 默认值
+ 解构赋值允许指定默认值，例：`let [foo = true] = []`,foo默认为true 
+ 注意：只要当等号对面严格等于undefined时，默认值才会生效
+ 默认值可以引用解构赋值的其他变量，但该变量必须已经生命,例  

```js
let [x=1,y=x] = [] //x=1;y=1
let [x=y,y=1] = []; //y is not defined
```

#### 对象的解构赋值
+ `let{foo,bar} = { foo:"aaa",bar:"bbb"}`，结果foo="aaa",bar="bbb"
+ 与数组解构相比，对象的解构赋值对对象属性的顺序没有要求，只要属性名对应即可  

```js
let {bar,foo} = { foo:"aaa",bar:"bbb"}
//foo="aaa"
//bar="bbb"
```

下面是含有键值对的解构赋值  

```js
let {foo:baz} = {foo:"aaa",bar:"bbb"}
// baz="aaa"
// 而foo报错，foo is not defined
```

与数组一样，对象解构也可以使用嵌套  

```js
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
}
let { p: [x, { y }] } = obj;
x // "Hello"
y // "World"
```

使用默认值(右方对应值必须严格等于undefined)  

```js
var {x=3} = {} //x=3
```

对象的解构赋值，可以很方便的将现有对象的方法赋值到某个变量  

```js
let {log,sin,cos} = Math;
```

#### 字符串的解构赋值  

```js
const [a,b,c,d,e] = 'hello';
a // 'h'
b // 'e'
c // 'l'
d // 'l'
e // 'o'
```

#### 函数参数的解构赋值
例一  

```js
function add([x,y]){
  return x + y;
}
add([1,2]);
```

例二  

```js
[[1,2],[3,4]].map(([a,b]) => a+b);
```

例三  

```js
function move({x=0,y=0} = {}){
  return [x,y];
}
move({x:3,y:8});  //[3,8]
move({x:3});  //[3,0]
move({}); //[0,0] 
```

例四  

```js
function move({x,y} = {x:0,y:0}){
  return [x,y];
}
move({x:3,y:8});  //[3,8]
move({x:3});  //[3,undefined]
move({}); //[undefined,undefined]
move(); [0,0]
```

例五  

```js
[1,undefined,3].map((x = 'yes) => x);
//[1,'yes',3]
```

<script src='./data-bar.js'></script>
<script>
  var name = 'destructuring';
  eleObj.child.forEach(function(item){
    if(item.name && item.name === name){
      item.child[0].style = Object.assign({}, item.child[0].style, {color: '#fc6423'});
    }
  })
</script>
<script src='../../static-source/createElment.js'></script>