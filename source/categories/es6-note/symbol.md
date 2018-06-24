### Symbol
`Symbol`是es6引入的一个新的原始数据类型，表示唯一值

#### Symbol()
用法
```js
let s1 = Symbol();
typeof s1; // 'symbol'

let s2 = Symbol();
let a1 = Symbol('abc);
let a2 = Symbol('abc);
console.log(a1 === a2);
console.log(s1 === s2); // false,每次调用Symbol，都会返回一个新的symbo值，所以s1不等于s2

a1.toString(); // 使用toString方法返回'Symbol(abc)'
String(a1); // 转字符串：'Symbol(abc)'
Boolean(a1); // true 可以转boolean
Number(a1); // 不能转数值，TypeError

/*作为对象属性名*/
let mySymbol = Symbol();
let a = {}:
a[mySymbol] = 'Hello';
let mySymbol2 = Symbol();
Object.defineProperty(a, mySymbol2, {value: 'Hello'});
s[mySymbol2] // Hello 注意不能用点运算符
```

#### symbol属性名遍历
**方法：Object.getOwnPropertySymbols()**
`Symbol`作为属性名，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`，但可以使用`Object.getOwnPropertySymbols()`返回，但使用新的API中的`Reflect.ownKeys`方法也可以返回所有类型的键名
```js
const obj = {};
let a = Symbol('a');
let b = Symbol('b');
obj[a] = 'Hello';
obj[b] = 'World';

const objectSymbol = Object.getOwnPropertySymbols(obj); // [Symbol(a), Symbol(b)]
```

#### 属性方法for与keyFor

- `Symbol.for()` 接受字符串作为参数，字符串相同，则定义`Symbol`,返回相同的`Symbol`。需要注意的是`Symbol.for`为`Symbol`值登记的名字，是全局环境的。

用法
```js
let s1 = Symbol('aaa');
let s2 = Symbol.for('aaa')
let s3 = Symbol.for('aaa')
console.log(s1 === s2);  // false
console.log(s2 === s3);  // true
```

- `Symbol.keyFor()` 返回登记的`Symbol`类型的key值，只针对用`Symbol.for()`定义的`Symbol`类型

```js
let s1 = Symbol('aaa');
let s2 = Symbol.for('aaa')

console.log(Symbol.keyFor(s1))  // undefined
console.log(Symbol.keyFor(s2))  // aaa
```

