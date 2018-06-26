<p style="text-indent:2em">js中基本事件绑定（onclick之类的事件）存在覆盖问题，即当为元素注册一个事件后，若后面再注册了相同的事件，那么之前的事件将被新的事件所覆盖</p>
<p style="text-indent:2em">但是使用attachEvent或addEventListener绑定事件，则不存在覆盖问题</p>

**attachEvent和addEventListener的区别**
+ attachEvent是IE（IE10之前支持，IE11不再支持attachEvent）有的方法，它不遵循W3C标准，而其他的主流浏览器如FF等遵循W3C标准的浏览器都使用addEventListener，所以实际开发中需分开处理

实例[(链接)](http://ybo.codenest.top/js-note/html/eventlistener.html)
+ 多次绑定事件后，两种方式绑定的事件执行顺序是不一样的
  - attachEvent在IE8以前是是后绑定先执行的，IE9-10是先绑定先执行，IE11不再支持该绑定事件，开始支持addEventListener（IE从9之后就开始支持addEventListener）
  - addEventListener是先绑定先执行。
+ addEventListener绑定事件时事件方式不带前缀on，而attachEvent带
+ attachEvent使用`detachEvent("eventType","handler")`解绑，addEventListener使用`removeEventListener("eventType","handler","true/false")`解绑
+ addEventListener的第三个参数代表是事件以何种方式触发
  - 如果参数是true，事件处理程序以捕捉模式触发；从顶层的父节点开始触发事件，从外到内传播。
  - 如果参数是false，事件处理程序以冒泡模式触发；从最内层的节点开始触发事件，逐级冒泡直到顶层节点，从内向外传播。
+ 回调函数内部this指向不同，attachEvent内部的this指向`window`，而addEventListener绑定的事件回调函数内部指向被绑定事件的元素


**事件绑定兼容性写法**
```javascript
function addEvent(elm, evType, fn, useCapture) 
{
  if (elm.addEventListener) 
  {
    // W3C标准
    elm.addEventListener(evType, fn, useCapture);
    return true;
  }
  else if (elm.attachEvent) 
  {
    //IE
    var r = elm.attachEvent(‘on‘ + evType, fn);//IE5+
    return r;
  }
  else 
  {
    elm['on' + evType] = fn;//DOM事件
  }
}
```