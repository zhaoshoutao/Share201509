/**
 * Created by Administrator on 2016/2/25.
 */
(function(){
    function getCss(curEle,attr){
        var val =null,reg=null;
        if("getComputedStyle" in window){
            val=window.getComputedStyle(curEle,null)[attr];
        }else{
            if(attr==="opacity"){
                val=curEle.currentStyle["filter"];
                reg=/^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                val=reg.test(val)?reg.exec(val)[1]/100:1;
            }
            val=curEle.currentStyle[attr];
        }
        reg=/^-?\d+(\.\d+)?(px|pt|em|rem)$/;
        return reg.test(val)?parseFloat(val):val;
    }
    function setCss(curEle,attr,value){
        if(attr==="float"){
            curEle["style"]["cssFloat"]=value;
            curEle["style"]["styleFloat"]=value;
            return;
        }
        if(attr==="opacity"){
            value>1?value=1:null;
            value<0?value=0:null;
            curEle["style"]["opacity"]=value;
            curEle["style"]["filter"]="alpha(opacity='"+value*100+"')";
            return;
        }
        var reg=/^(width|height(padding|margin(Top|Bottom|Left|Right))|left|right|top|bottom)$/;
        if(reg.test(attr)){
            reg=/^-?\d+(\.\d+)?$/;
            if(reg.test(value)){
                curEle["style"][attr]=value+"px";
            }
        }
        curEle["style"][attr]=value;
    }

    var zhufengEffect={
        Linear:function(t,b,c,d){
            return t/d*c+b;
        }
    };

    function animate(curEle,tarObj,duration,effect,callBack){
        effect=zhufengEffect.Linear;
        var times= 0,beginObj={},changeObj={};
        for(var key in tarObj){
            if(tarObj.hasOwnProperty(key)){
                beginObj[key]=getCss(curEle,key);
                changeObj[key]=tarObj[key]-beginObj[key];
            }
            window.clearInterval(curEle.timer);
            curEle.timer=window.setInterval(function(){
                times+=10;
                if(times>duration){
                    for(var key in tarObj){
                        if(tarObj.hasOwnProperty(key)){
                            setCss(curEle,key,tarObj[key]);
                        }
                    }
                    typeof callBack==="function"?callBack.call(curEle):null;
                    window.clearInterval(curEle.timer);
                    return;
                }
                for(key in tarObj){
                    if(tarObj.hasOwnProperty(key)){
                        var cur=effect(times,beginObj[key],changeObj[key],duration);
                        setCss(curEle,key,cur);
                    }
                }
            },10);
        }
    }
    window.animate=animate;



})();
(function(){
    var inner=document.getElementById("inner"),
        imgList=inner.getElementsByTagName("img");
    var tip=document.getElementById("tip"),
        tipList=tip.getElementsByTagName("li");
    var rightBtn=document.getElementById("rightBtn"),
        leftBtn=document.getElementById("leftBtn");
    var ul1=document.getElementById("ul1");
    var step= 0,count= 5,autoTimer=null;

    function autoMove(){
        step++;
        if(step>count){
            step=1;
            inner.style.left=0;
        }
        animate(inner,{left:-step*1230},500);
        selectTip();
    }
    autoTimer=window.setInterval(autoMove,2000);

    function selectTip(){
        var temp=step;
        temp>=tipList.length?temp=0:null;
        for(var i=0;i<tipList.length;i++){
            tipList[i].className=i===temp?"bg":null;
        }
    }
    tipMove();
    function tipMove() {
        for (var i = 0; i < tipList.length; i++) {
            var curTip = tipList[i];
            curTip.index = i;
            curTip.onclick = function () {
                window.clearInterval(autoTimer);
                step = this.index;
                animate(inner, {left: -step * 1230}, 500);
                selectTip();
                autoTimer = window.setInterval(autoMove, 2000);
            }
        }
    }
    rightBtn.onclick = function () {
        window.clearInterval(autoTimer);
        autoMove();
        autoTimer = window.setInterval(autoMove, 2000);
    };

    leftBtn.onclick = function () {
        window.clearInterval(autoTimer);
        step--;
        if (step < 0) {
            step = count - 1;
            inner.style.left = -count * 1230 + "px";
        }
        animate(inner,{left: -step * 1230}, 500);
        selectTip();
        autoTimer = window.setInterval(autoMove, 2000);
    };

    function next(curEle) {
        if ("nextElementSibling" in curEle) {
            return curEle.nextElementSibling;
        }
        var nex = curEle.nextSibling;
        while (nex && nex.nodeType !== 1) {
            nex = nex.nextSibling;
        }
        return nex;
    }
    document.body.onmouseover=function(e){
        e=e||window.event;
        e.target= e.target|| e.srcElement;
        if(e.target.tagName.toLowerCase()==="a"&&e.target.parentNode.tagName.toLowerCase()==="li"){
            e.target.className="bg";
            next(e.target).style.display="block";
        }
    };
    //e.target.parentNode.tagName.toLowerCase()==="li"
    document.body.onmouseout=function(e){
        e=e||window.event;
        e.target= e.target|| e.srcElement;
        if(e.target.tagName.toLowerCase()==="a"&& e.target.parentNode.tagName.toLowerCase()==="li"){
            e.target.className="";
            next(e.target).style.display="none";
        }

    }

})();