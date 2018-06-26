#### Jquery中$(document).ready()和window.onload的区别---[原文档链接](http://www.php100.com/html/program/jquery/2013/0905/5954.html)

1. 执行时间
window.onload必须等到页面内包括图片的所有元素加载完毕后才能执行。 
$(document).ready()是DOM结构绘制完毕后就执行，不必等到加载完毕。

2. 编写个数不同
window.onload不能同时编写多个，如果有多个window.onload方法，只会执行一个 
$(document).ready()可以同时编写多个，并且都可以得到执行

3.简化写法

window.onload没有简化写法 
$(document).ready(function(){})可以简写成$(function(){});

以浏览器装载文档为例，在页面加载完毕后，浏览器会通过`JavaScript`为DOM元素添加事件。在常规的`JavaScript`代码中，通常使用`window.onload`方法，而在jQuery中，使用的是`$(document).ready()`方法。

`$(document).ready()`方法和`window.onload`方法有相似的功能，但是在执行时机方面是有区别的。`window.onload`方法是在网页中所有的元素（包括元素的关联文件）完全加载到浏览器后才执行，即JavaScript此时才可以访问网页中的任何元素。而通过`jQuery`中的`$(document).ready()`方法注册的事件处理程序，可以在DOM完全就绪时就可以被调用。此时，网页的所有元素对jQuery而言都是可以访问的，但是，这并不意味着这些元素关联的文件都已经下载完毕。

举一个例子，有一个大型的图库网站，为网页中所有图片添加某些行为，例如单击图片后让它隐藏或显示。如果使用`window.onload`方法来处理，那么用户必须等到每一幅图片都加载完毕后，才可以进行操作。如果使用jQuery中的`$(document).ready()`方法来进行设置，只要DOM就绪时就可以操作了，不需要等待所有图片下载完毕。很显然，把网页解析为DOM树的速度比把网页中的所有关联文件加载完毕的速度快很多。

另外需要注意一点，由于在`$(document).ready()`方法内注册的事件，只要DOM就绪就会被执行，因此可能此时元素的关联文件未下载完。例如与图片有关的HTML下载完毕，并且已经解析为DOM树了，但很有可能图片还未加载完毕，所以例如图片的高度和宽度这样的属性此时不一定有效。要解决这个问题，可以使用JQuery中另一个关于页面加载的方法——load()方法。load()方法会在元素的onload事件中绑定一个处理函数。如果处理函数绑定给window对象，则会在所有内容（包括窗口、框架、对象和图像等）加载完毕后触发，如果处理函数绑定在元素上，则会在元素的内容加载完毕后触发。