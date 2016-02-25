/**
 * Created by chen on 2016/2/25.
 */
var leftDiv = document.getElementById("left");
var oLis = leftDiv.getElementsByTagName("li");
var titles = leftDiv.getElementsByTagName("a");
var oDivs = leftDiv.getElementsByTagName("div");
function changeBg() {
    for (var i = 0; i < oLis.length; i++) {
        oLis[i].onmouseover = function () {
            this.className = "bg";
        };
        oLis[i].onmouseout = function () {
            this.className = "";
        }
    }
}
changeBg();

document.onmouseover = function (e) {
    e = e || window.event;
    e.target = e.target || e.srcElement;
    for (var i = 0; i < titles.length; i++) {
        var cur = titles[i];
        if ((e.target === cur) || (e.target === oLis[i]) || (e.target === oDivs[i])) {
            oDivs[i].style.display = "block";
            return;
        }
    }
};
document.onmouseout = function (e) {
    e = e || window.event;
    e.target = e.target || e.srcElement;
    for (var i = 0; i < titles.length; i++) {
        var cur = titles[i];
        if ((e.target === cur) || (e.target === oLis[i]) || (e.target === oDivs[i])) {
            oDivs[i].style.display = "none";
            return;
        }
    }
};
