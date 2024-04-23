// .each(function (index, element) {
// })
// index = 索引，0, 1, 2, 3...
// element = 元素 = $(this)
$('#list li').each(function (index, element) {
	$(this).css('color', 'red')
	if (index === 0) {
		$(element).remove()
	} else if (index === 1) {
		// .each 可以 return false 停止迴圈
		return false
	}
})
