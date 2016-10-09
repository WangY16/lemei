(function(){
	$(".tab-list li").off("click").on("click",function(){
		$(this).addClass("li-selected").siblings().removeClass("li-selected")
	})
})();
