/**
 * 数量选择器
 */
;$.fn.extend({
	/**
	 * @description 初始化计数器按钮事件
	 */
	numberSelect :function(param){
		var $thiz = $(this);
		var $prev = $thiz.prev();
		var $next = $thiz.next();
		var min = parseInt($thiz.attr("min"));
		var max = parseInt($thiz.attr("max"));
		var readOnly = param.readOnly == false ? param.readOnly : true;
		
		if (readOnly) {
			$thiz.attr("readonly",readOnly);
		}

		/**
		 * 减号事件
		 */
		var mulitFlag = false;
		$prev.off("click").on("click", function() {
			if ($(this).hasClass("number-select-disabled")) {
				return;
			} else {
				mulit();
			}
			
		});

		//添加减号事件
		var mulit = function() {
			var oldVal = parseInt($thiz.val());
			$next.removeClass("number-select-disabled");
			if (oldVal-min <= min) {
				$prev.addClass("number-select-disabled");
				$thiz.val(min);
			} else {
				$thiz.val(oldVal-min);
			}
		};
		/**
		 * 加号事件
		 */
		var addFlag = false;
		$next.off("click").on("click", function() {
			if ($(this).hasClass("number-select-disabled")) {
				return;
			} else {
				add();
			}
		});
		//添加加号事件
		var add = function() {
			var oldVal = parseInt($thiz.val());
			$prev.removeClass("number-select-disabled");
			if ( oldVal + min >= max) {
				$next.addClass("number-select-disabled");
				$thiz.val(max);
			} else {
				$thiz.val(oldVal + min);
			}
		};
		
		
		/*
		 * 输入框输入内容校验
		 */
		$thiz.off("blur").on("blur",function(){
			check();
			/*if (oldVal == '') {
				oldVal = min.toString();
			}*/
		}).off("keyup").on("keyup",function(){
			$(this).val($(this).val().replace(/\D|^0/g, ''));
		});
		var check = function(){
			var oldVal = $thiz.val();
			/*if (oldVal == '') {
				oldVal = min.toString();
			}*/
			var newVal = oldVal.replace(/\D|^0/g, '');
			var intoldVal = parseInt(newVal);
			if (min < intoldVal && intoldVal < max) {
				if (intoldVal%min == 0) {
					$thiz.val(intoldVal);
				} else {
					$thiz.val(Math.round(intoldVal/min)*min);
				}
			} else if (min >= intoldVal ) {
				$prev.addClass("number-select-disabled");
				$thiz.val(min);
			} else if (max <= intoldVal) {
				$next.addClass("number-select-disabled");
				$thiz.val(max);
			} 
		}
	},
	/**
	 *  设置获得当前数字的方法
	 */
	curNum: function() {
		return $(this).val();
	}
});