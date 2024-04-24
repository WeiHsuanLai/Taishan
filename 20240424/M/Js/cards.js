// .mouseenter() .on('mouseenter')   滑鼠進入
// .mouseout()   .on('mouseout')     滑鼠離開
// .hover(滑鼠進入, 滑鼠離開)
$('#imgs > img').hover(
	function () {
		$(this).stop().animate({ marginTop: 0 })
		$(this).prev().stop().animate({ marginTop: 50 })
		$(this).next().stop().animate({ marginTop: 50 })
	},
	function () {
		$(this).stop().animate({ marginTop: 100 })
		$(this).prev().stop().animate({ marginTop: 100 })
		$(this).next().stop().animate({ marginTop: 100 })
	}
)
