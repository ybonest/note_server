### 原型
  JavaScript中，创建一个构造函数（当然javascript中无所谓构造函数，普通函数与构造函数基本一致，只是为了表明函数为构造函数，函数首字母通常大写而已）就会拥有一个prototype属性，该属性指向函数的原型对象，而该原型对象又拥有一个constructor属性，该属性又指向了构造函数本身
  
  当构造函数实例化一个对象后，该对象指向了构造函数的原型对象，通过原型对象，实例对象可以访问构造函数的属性，以及原型属性
  
  在JavaScript高级教程中有一幅图很形象的展示了此种关系
  ![img](/media/prototype1.png)

+ JavaScript中，原型也是一种对象，通过原型可以实现对象的继承
+ JavaScript对象中都包含一个[[Prototype]]内部属性，该属性不能直接被访问，对此Firefox和Chrome为对象实例提供了一个`__proto__`属性查看对象实例所指向的对象原型，注意该属性并不是所有浏览器都支持
+ 可以用isPrototypeOf()说明实例对象和构造函数原型之间的关系
  ```
  console.log(Person.prototype.isPrototypeOf(person1))
  ```

### 构造函数与原型实例
+ 基本写法
```
function Person(age){
  this.age = age
}
Person.prototype.name = "bo";
Person.prototype.sayName = function(){
  console.log(this.name);
}
```
+ 原型对象简写
```
function Person(age){
  this.age = age
}
Person.prototype = {
  name:"bo",
  sayName:function(){
    console.log(this.name);
  }
}
```
> 注意该写法其实上是让对象的原型指向了一个新的对象，因此原型对象丢失了constructor属性，也就是说该原型对象不在指向构造函数本身，因此当需要原型继续指向构造函数时，需要在原型对象中添加constructor指向，即
```
Person.prototype = {
  constructor:Person,
  name:"bo",
  sayName:function(){
    console.log(this.name);
  }
}
```
这种情况下constructor虽然重新指向了构造函数本身，但毕竟不是原生的，它已经丢失了原本的一些特点，比如默认情况下constructor是不可枚举的，但以上操作后constructor就变成了可枚举了.(一般情况下JS中预定义的原型属性一般是不可枚举的，而自己定义的属性一般可枚举，属性的枚举性会影响for...in...,JSON.stringify(),Object.keys())

### 原型链
+ JavaScript中原型链是一个绕不过的坎，各种原型对象，各种指向。
  - 以构造函数为基准，可以延伸出各种指向。
      - 构造函数指向它自己的原型对象，构造函数的实例对象又通过__proto__指向了构造函数的原型
      - 构造函数又是Function的实例对象，因此(已Person构造函数为例)Person.__proto__ === Function.prototype-->返回true
      - 构造函数的原型又最终指向了Object的原型对象 Person.prototype.__proto__ === Object.prototype-->返回true
      - Funtion的原型同样最终也指向了Object的原型
      - 而Object的对象原型最终指向了null
    
    代码实例[链接](https://ybonest.github.io/js-note/html/prototype.html)
    ```
    function Person(name){
      this.name = name;
    }
    var p1 = new Person();
    console.log(Person.prototype)  //指向Person原型
    console.log(p1.__proto__); //指向Person的原型
    console.log(p1.__proto__ === Person.prototype); //true 说明Person.prototype和p1.__proto__指向的是同一片内存空间，同一个东西
    console.log(Person.__proto__);   //使用log打印 f() { [native code] }
    console.dir(Person.__proto__);   //使用dir打印 可以看到输出的对象中constructor指向了Function()
    console.dir(Function.prototype);  //输出和Person.__proto__一样的东西
    console.log(Person.__proto__ === Function.prototype);  //输出true 可见构造函数也是Function的实例
    console.dir(Function.prototype.__proto__)  //Object
    console.dir(Person.prototype.__proto__)  //Object 
    console.dir(Object.prototype)  //Object
    console.log(Person.prototype.__proto__ === Object.prototype)  //true 可见Person的原型对象最终指向了Object
    console.dir(Object.__proto__)  //Function
    console.dir(Object.prototype.__proto__)  //最终指向null
    ```

    网络上搜刮的一副原型图，可见其中之乱
    ![img](/media/prototype.jpg)
