$('#btn1').click(function () {
	// .animate({ 樣式: 值 }), 動畫時間, linear, 動畫播完的function
	// 動畫時間預設是400ms，可填 ms 或是 fast(200) slow(600)
	// linear 不填預設是 ease
	$('#img').animate(
		{
			width: '100px',
			height: '100px'
		},
		function () {
			console.log('變小了')
		}
	)
})

$('#btn2').click(function () {
	$('#img').animate(
		{
			left: '+=50px'
		},
		'fast',
		function () {
			console.log('變右了')
		}
	)
})

$('#btn3').click(function () {
	$('#img')
		.animate(
			{
				left: '+=50px'
			},
			2000,
			'linear',
			function () {
				console.log('往右了')
			}
		)

		.animate(
			{
				top: '+=50px'
			},
			2000,
			'linear',
			function () {
				console.log('往下了')
			}
		)
})

$('#btn4').click(function () {
	// .stop(是否停止之後的動畫，是否跳到目前動畫結束)
	// 如果第二個參數是 true，第一個就必須視 true
	// 預設都是false
	$('#img').stop(true, false) // 原地停下
	// $('#img').stop(true, true)  // 跳到目前結尾
	// $('#img').stop(false, false) // 直接開始播下一個動畫
})

// .fadeOut(slow/fast/毫秒, 'linear', 完成時的 function) 淡出
// 動畫結束後會加入display:none
$('#btn5').click(function () {
	$('#img').fadeOut()
})

// .fadeIn(slow/fast/毫秒, 'linear', 完成時的 function) 淡入
$('#btn6').click(function () {
	$('#img').fadeIn()
})

// .fadeTo(slow/fast/毫秒(長度), 透明度, 'linear', 完成時的 function) 淡出或淡入至指定透明度
// 長度, 不透明度必填
$('#btn7').click(function () {
	// 如果用fadeTo調成 0 可以不會加上display:none
	$('#img').fadeTo(1000, 0)
})

// .fadeToggle(slow/fast/毫秒, 'linear', 完成時的 function) 切換淡入或淡出
$('#btn8').click(function () {
	$('#img').fadeToggle(console.log('變化'))
})

// .slideDown(slow/fast/毫秒, 'linear', 完成時的 function) 滑入，遞增 height 至原本高度
$('#btn9').click(function () {
	$('#img').slideDown(2000)
})

// .slideUp(slow/fast/毫秒, 'linear', 完成時的 function) 滑出，遞減 height 至 0
$('#btn10').click(function () {
	$('#img').slideUp(2000)
})

// .slideToggle(slow/fast/毫秒, 'linear', 完成時的 function) 切換滑入或滑出
$('#btn11').click(function () {
	$('#img').slideToggle(2000)
})
