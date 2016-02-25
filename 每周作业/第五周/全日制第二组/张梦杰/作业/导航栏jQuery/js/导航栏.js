/**
 * Created by Administrator on 2016/2/25.
 */
(function(){
    var $inner=$("#inner");
    var $imgList=$inner.children("img");
    var $tip=$("#tip"),$tipList=$tip.find("li");
    var step= 0,count= 5,autoTimer=null;

    function autoMove(){
        step++;
        if(step>=count){
            step=0;
        }
        $($imgList[step]).show(500).siblings().hide(500);
        selectTip();
    }
    autoTimer=window.setInterval(autoMove,2000);

    function selectTip(){
        var temp = step;
        temp >= count ? temp = 0 : null;
        $tipList.each(function (index, item) {
            index === temp ? $(this).addClass("bg") : $(this).removeClass("bg");
        });
    }
    $tipList.bind("click", function () {
        window.clearInterval(autoTimer);

        step = $(this).index();
        $($imgList[step]).stop().show().siblings().hide();
       selectTip();
        autoTimer = window.setInterval(autoMove, 2000);
    });


        $(".rightBtn").click(function(){
                window.clearInterval(autoTimer);
                autoMove();
                autoTimer=window.setInterval(autoMove,2000);
            }
        );
    $(".leftBtn").click(function(){
        window.clearInterval(autoTimer);
        step--;
        if(step<0){
            step=count;
        }
        $($imgList[step]).stop().show().siblings().hide();
        selectTip();
        autoTimer=window.setInterval(autoMove,2000);
    });

    var $list=$("#ul1"),$lists=$list.children("li");

    $lists.bind("mouseover",function(){
        $(this).css("background","orange");
        $(this).find("div").show();
    }).bind("mouseout",function(){
        $(this).css("background","");
        $(this).find("div").hide();
    });

})();
