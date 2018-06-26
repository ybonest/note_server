### 继承
  所谓继承，就是把一些有共性的东西分类，然后提取公共属性，当定义子类时直接从父类中继承这些具有共性的方法或属性，ES6以前JS并没有提供原生继承方式，但是可以通过函数以及原型链的一些特性模拟出继承

### 直接使用原型链

```
function SuperType(){
  this.colors = ["red","blue","green"];
}
function SubType(){}
SubType.prototype = new SuperType();

var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"

var instance2 = new SubType();
alert(instance2.colors); //"red,blue,green,black"
```

> 由上例可见，直接使用原型链，每个SuperType的实例都共享同样一份colors，一个对象实例改变其内容，其他对象实例中的colors内容同样改变，还有就是原型链无法向构造函数传递参数。


### 借用构造函数继承
+ 通过函数的apply()或call()方法实现

```
function SuperType(){
  this.colors = ["red","blue","green"];
}
function SubType(){
  SuperType.call(this);
}
var intance1 = new SubType();
intance1.colors.push("black");
alert(instance1.colors);  //"red,blue,green,black"

var intance2 = new Subtype();
alert(instance2.colors);  //"red,blue,green"
```

> 借用构造函数的缺点很大，由于使用call或者apply，子类只能访问父类函数内的属性或方法，而父类原型中所携带的方法和属性对子类是不可见的

### 组合继承
  组合继承结合了原型链和借用构造函数的两种继承方式，它使用原型链实现了对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承，这样即保证了父类原型上定义的方法和属性对子类可见，同时又保证了每个实例都有它自己的属性，互相之间不存在影响

  ```
  function SuperType(name){
    this.name = name;
    this.colors = ["red","blue","green"];
  }
  SuperType.prototype.sayName = function(){
    alert(this.name);
  }

  function SubType(name,age){
    SuperType.call(this,name);
    this.age = age;
  }
  SubType.prototype = new SuperType();
  SubType.prototype.sayAge = function(){
    alert(this.age);
  }
  var instance1 = new SubType("Nicholas",29);
  instance1.colors.push("black");
  alert(instance1.colors);  //"red,blue,green,black"
  instance1.sayName();  //"Nicholas"
  instance1.sayAge(); //27

  var instance2 = new SubType("Greg",27);
  alert(instance2.colors);  //"red,blue,green"
  instance1.sayName();  //"Greg"
  instance2.sayAge(); //27
  ```


> 本内容主要参考JavaScript高级教程继承部分，除此以上三种继承之外，还有寄生式继承、寄生组合式继承等，此处不再一一列举，详细请去阅读JavaScript高级教程