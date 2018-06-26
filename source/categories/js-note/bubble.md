### 事件冒泡
+ 定义：由里向外，子元素事件的触发会影响父元素的事件
![img](/media/bubble.png)

实例[(链接)](http://ybo.codenest.top/js-note/html/bubble.html)
<iframe style="overflow:hidden;height:400px;width:100%;border:1px solid #ccc" class="yboflag" src="html/bubble.html"></iframe>


+ 取消事件冒泡
```
function stopBubble(e){
  if(e&&e.stopPropagation){
    e.stopPropagation();  //非IE
  }else{
    window.event.cancelBubble = true;
  }
}
```

此例中，为所有元素绑定了点击事件，可见当子元素被点击时父元素的点击事件也被触发了，这就是事件冒泡

### 事件捕获
+ 定义：由外向内，父元素的事件会影响子元素的事件
![img](/media/buhuo.png)

### 事件流
事件流包括三个阶段：事件捕获、处于目标阶段和事件冒泡阶段，首先发生的是事件捕获，为截获事件提供了机会，然后实际的目标接收到事件，最后一个阶段是冒泡阶段，可以在这个阶段对事件做出响应
![img](/media/eventpipe.png)

### 浏览器默认行为
浏览器拥有它自己的默认行为，如在form中按回车键就会提交表单，a标签的跳转链接
+ 取消浏览器默认行为
```
function stopDefault(e){
  if(e&&e.preventDefault){
    e.preventDefault();
  }else{ //兼容IE
    window.event.returnValue = false;
    return false;
  }
}
```