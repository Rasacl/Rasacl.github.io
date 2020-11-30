var showPage = (function(){

    var pageIndex = 0;//当前显示页面索引
    var pages = $$(".page_container .page");//拿到页面所有元素
    var nextIndex  = null;//下一个页面索引

//设置静态页面的样式

function setStatic(){
    nextIndex = null;
    for(var i = 0; i < pages.length; i++){
        var page = pages[i];
        if(i == pageIndex){
            //这个页面就是当前显示页面
            page.style.zIndex = 1;
        } else{
            page.style.zIndex  = 10;
        }
        //位置
        page.style.top = (i - pageIndex) * height() + "px";
    }
}


setStatic();


//移动中

function moving(dis){
    for(var i = 0; i < pages.length; i++){
        var page = pages[i];//一个一个页面去设置
        if(i !== pageIndex){
            //位置
            page.style.top = (i - pageIndex) * height() + dis + "px";
        }
    }

    //设置下一个页面
    if(dis > 0 && pageIndex > 0){
        //往下移动 同时 不是第一页
        nextIndex = pageIndex - 1;
    }else if(dis < 0 && pageIndex < pages.length - 1){
        nextIndex = pageIndex + 1;
    }else{
        nextIndex = null;
    }
}


//移动完成时

function finishMove(){
    if(nextIndex === null){
        //没有下一个
        setStatic();
        return;
    }
    var nextPage = pages[nextIndex];//下一个页面
    nextPage.style.transition = ".5s";//500ms过度
    nextPage.style.top = 0;


    setTimeout(function(){
          //页面变了
          pageIndex = nextIndex;
          //动画完了
          nextPage.style.transition = "";
          setStatic();
    },500);
}

// 事件
var pageContainer = $(".page_container");
pageContainer.ontouchstart = function (e) {
  // 类似于mousedown   表示手指按下
  var y = e.touches[0].clientY;

  function handler(e) {
    var dis = e.touches[0].clientY - y;
    if (Math.abs(dis) < 20) {
      // 防止误触
      dis = 0; // 相当于手指没动
    }
    moving(dis);
    // 阻止事件的默认行为
    if (e.cancelable) {
      // 如果事件可以取消
      e.preventDefault(); // 取消事件 - 阻止默认行为
    }
  }
  // 手指按下，监听移动
  pageContainer.addEventListener("touchmove", handler, {
    passive: false,
  });

  // 手指松开，完成移动
  pageContainer.ontouchend = function () {
    finishMove();
    pageContainer.removeEventListener("touchmove", handler);
  };
};




//自动切换板块
//index 页面索引

function showPage(index){
    var nextPage = pages[index];//下一个页面元素
    if(index > pageIndex){
      //下一个页面在当前页面下面
      nextPage.style.top = height() + "px";
    }else if(index < pageIndex){
      //下一个页面在当前页面上面
      nextPage.style.top = -height() + "px";
    }else{
      //下一个页面就是当前页面
      if(pageIndex === 0){
        //目前是第一页
        pageIndex++;
      }else{
        pageIndex--;
      }
      setStatic();//重新设置位置
    }
    //强行让浏览器渲染
    nextPage.clientHeight;//读取dom元素的尺寸和位置，会导致浏览器强行渲染
    nextIndex = index;//设置下一页面索引
    finishMove();
  
     
  }

return showPage;

})();