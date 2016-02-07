#mateCarousel
*mateCarousel* is a lightweight carousel with a simple API. There is no default theme, which means the css part is up to you. And that's a good thing!

##Concept
The general idea is to make an easy to config carousel. All the logic part is done, so you just have to make it beautiful.

##How does it work?
*mateCarousel* iterates over elements of a DOM class. Once you call the library passing the class as an argument, we organize your carousel and leave it ready to shine! To make it, we use the translateX property. First element will have its value as 0%, second one as 100%, third one as 200% and so on.

For example, this code:
``` html
<div>
  <div class="inner red"></div>
  <div class="inner black"></div>
  <div class="inner yellow"></div>
  <div class="inner blue"></div>
</div>
```
When you pass "inner" as an argument to mateCarousel...
``` javascript
var config = {
  autoplay: true,
  autoplaySpeed: 3500,
}

var carousel = mateCarousel ('inner');
```
... it will become that:
``` html
<div>
<div class="inner red" style="transform: translateX(0%);"></div>
  <div class="inner black" style="transform: translateX(100%);"></div>
  <div class="inner yellow" style="transform: translateX(200%);"></div>
  <div class="inner blue" style="transform: translateX(300%);"></div>
</div>
```

##The config object
The second argument you can pass (but don't feel obligated) is a config object. Some values are required to enable functionality, such as bullet-menu and after&before buttons:

``` javascript
var config = {
  bulletContainerId:   ,// default is "menuContainer".
  bulletMenuClass:     ,// must have to enable bullet-menu.
  bulletContent:       ,// default is "•".
  autoplay:            ,// default is false.
  autoplaySpeed:       ,// must have if autoplay is true.
  buttonBeforeContent: ,// default is "←".
  buttonAfterContent:  ,// default is "→".
  buttonBeforeId:      ,// must have to enable buttons;
  buttonAfterId:       ,// must have to enable buttons;
  initialPosition:     ,// default is 0.
};
```

##Attention please! CSS must have:
- The container block must have set overflow as "hidden" to achieve the carousel effect. And also, I advice you to set position to relative of fixed, but it depends on each case.
- The class used to expose the elements to the Carousel must have position absolute, left: 0, top: 0, and should be nice to add some transition effect, such as "transform 300ms ease".
- At this moment, that class must as well have width and height set to 100%. I am working on it, so we could show more than one element per view, each time. Contributions are welcome.
- when working with the bullet-menu, it's wise to set the display as "inline".
- don't forget to work with the "active" menu to get beautiful results on the bullets. It was set to highlight the active bullet.


##Ok. Now, how to use the API?
That's the beautiful part. Suposing that you captured a class elements which are inside the same container, now you start playing with your JavaScript:

``` javascript
var carousel = mateCarousel('myClass'); // This will put your divs up and running. 
```
But this way, it will have no buttons and no autoplay, and that's bad. So, here you have some ways. First, is setting your carousel before running it, which I recommend.

``` javascript
var obj={
  autoplay: true,
  autoplaySpeed: 3000 // 3 seconds
}
var carousel = mateCarousel('myClass', obj); // This will make it autoplay.
```
or
``` javascript
var obj={
  bulletMenuClass: "dot",
  buttonBeforeId: "after-button",
  buttonAfterId:  "before-button"
}
var carousel = mateCarousel('myClass', obj); // This will give you bullets to access each index AND the after and before button.
```
But what if you want to set up it on the go? There are a bunch of options:
``` javascript
var carousel = mateCarousel('myClass');

//now, let's create a bullet-menu:
carousel.lateCreateMenu("dot","dot-container"); //"dot" is class of children, "dot-container" is the parent Id.

//now, let's remove the bullet-menu:
carousel.removeMenu();

//now, let's start the autoplay:
carousel.play(3000);

//now, let's pause it.
carousel.pause();
```

And there are more things in the API that you can use to implement your features:
- carousel.goToPosition(n): go to the desired index. Be careful, do not use a number bigger than your class length.
- carousel.next() and carousel.before(): go to the next slide. Useful to build your own buttons.
- carousel.getIndex(): returns the current index displayed. You can do useful stuff with this output.
- carousel.config(): returns the current config object. Set things on the go.


