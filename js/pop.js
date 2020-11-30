var showPop = (function(){
    /* 
*弹出框
*
*/


function showPop(id){
   var container =  $("#" + id);
    container.style.display = "";
    if(id === "popVideo"){
        var vdo = container.querySelector("video");
        vdo.play();
    }
}

//获取所有关闭按钮

var closes = $$(".pop_close");
for(var i = 0; i < closes.length; i++){
    closes[i].onclick = function(){
        var container = this.parentElement.parentElement;
        container.style.display = "none";
    };
}

//处理一些特殊东西
var popWx = $(".pop_wx");
var popQq = $(".pop_qq");

popWx.onclick = function(){
    //    classList.add    添加类样式

    popWx.classList.add("select");
    popQq.classList.remove("select");
};
popQq.onclick = function(){
    popWx.classList.remove("select");
    popQq.classList.add("select");
};

//处理视频弹窗关闭，视频暂停

var closeBtn = $("#popVideo .pop_close");
closeBtn.addEventListener("click",function(){
    $("#popVideo video").pause(); 
});

return showPop;

})();

