/*jslint browser:true */
/* jshint loopfunc:true */

var mateCarousel = function (innerClass, objConfig) {
    
    if (objConfig === undefined) { objConfig = {}; }
    
    var config = {
        bulletContainerId: objConfig.bulletContainerId || "menuContainer",
        bulletMenuClass: objConfig.bulletMenuClass,
        bulletContent: objConfig.bulletContent || "•",
        autoplay: objConfig.autoplay || false,
        autoplaySpeed: objConfig.autoplaySpeed,
        buttonBeforeContent: objConfig.buttonBeforeContent || "←",
        buttonAfterContent: objConfig.buttonAfterContent || "→",
        buttonBeforeId: objConfig.buttonBeforeId,
        buttonAfterId: objConfig.buttonAfterId,
        initialPosition: objConfig.initialPosition || 0,
    };
    
    var bulletMenuChildren = document.getElementsByClassName(config.bulletMenuClass);
    var innerDiv = document.getElementsByClassName(innerClass);
    var repeater;
    var actualPosition;
    
    var createButtons = function(before, after, beforeId, afterId){
        var beforeContent = document.createTextNode(before);
        var beforeNode = document.createElement("button");
        beforeNode.appendChild(beforeContent);
        beforeNode.setAttribute("id", beforeId);
        beforeNode.onclick = function(){
            setPos(actualPosition -1);
        };
        
        var afterContent = document.createTextNode(after);
        var afterNode = document.createElement("button");
        afterNode.appendChild(afterContent);
        afterNode.setAttribute("id", afterId);
        afterNode.onclick = function(){
            setPos(actualPosition +1);
        };
        
        innerDiv[0].parentNode.appendChild(beforeNode);
        innerDiv[0].parentNode.appendChild(afterNode);
    };
    
    var setActiveBullet = function () {
        for (var i = 0; i < bulletMenuChildren.length; i++) {
            if (i === actualPosition) {
                bulletMenuChildren[i].classList.add("active");
            } else {
                bulletMenuChildren[i].classList.remove("active");
            }
        }
    };
    
    var createMenuElements = function(){
        if (document.getElementById(config.bulletContainerId)){
            var menu = document.getElementById(config.bulletContainerId);
            innerDiv[0].parentNode.removeChild(menu);
        }
        var menuContainer = document.createElement("ul");
        menuContainer.setAttribute("id", config.bulletContainerId);
        innerDiv[0].parentNode.appendChild(menuContainer);
        
        for (var i=0; i<innerDiv.length; i++){
            var node = document.createElement("li"); 
            var textnode = document.createTextNode(config.bulletContent || "");
            node.appendChild(textnode);
            node.classList.add(config.bulletMenuClass);
            node.dataset.index = i;
            node.onclick = function(){
                setPos(parseInt(this.dataset.index));
            };
            menuContainer.appendChild(node);
        }
    };
    
    var setPos = function (mov) {
        if (mov == innerDiv.length) {
            mov = 0;
        } else if (mov == -1) {
            mov = innerDiv.length - 1;
        }
        for (var i = 0; i < innerDiv.length; i++) {
            innerDiv[i].style.transform = "translateX(" + 100 * (i - mov) + "%)";
            if (innerDiv[i].style.transform == "translateX(0%)"){
                actualPosition = i;
            }
        }
        actualPosition = mov;
        setActiveBullet();
    };
    
    var startRepeat = function(ms){
        repeater = setInterval(function(){
            setPos(actualPosition + 1);
        }, ms);
    };
    
    var removeMenu = function(){
        var bulletMenuParent = document.getElementById(config.bulletContainerId);
        innerDiv[0].parentNode.removeChild(bulletMenuParent);
    };
    
    var lateCreateMenu = function(bulletMenuClass, bulletContainerId, bulletCont){
        config.bulletContainerId = bulletContainerId || "menuContainer";
        config.bulletMenuClass = bulletMenuClass;
        config.bulletContent = bulletCont || "•";
        createMenuElements();
    };
    
    if (config.bulletMenuClass){
        createMenuElements();
    }
    
    setPos(config.initialPosition);
    
    if (config.autoplay){
        startRepeat(config.autoplaySpeed);
    }
    
    if (config.buttonBeforeId && config.buttonAfterId){
        createButtons (config.buttonBeforeContent, config.buttonAfterContent, config.buttonBeforeId, config.buttonAfterId);
    }

    return {
        goToPosition: function (n) {
            setPos(n);
        },
        next: function () {
            setPos(actualPosition + 1);
        },
        before: function () {
            setPos(actualPosition - 1);
        },
        play: function(ms){
            startRepeat(ms);
        },
        pause: function(){
            clearInterval(repeater);
        },
        getIndex: function(){return actualPosition;},
        config: function(){
            return config;
        },
        removeMenu: function(){
            removeMenu();
        },
        lateCreateMenu: function(bulletMenuClass, bulletContainerId, bulletCont){
            lateCreateMenu(bulletMenuClass, bulletContainerId, bulletCont);
        }
    };
};