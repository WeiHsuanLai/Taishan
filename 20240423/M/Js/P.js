$('#btn').click(function () {
	var textContent = $('#input-text').val()
	if (textContent != '') {
		$('#list ul').append(`<li>${textContent}<input type="button" value="X" class="bt2"></li>`)
		$('#input-text').val('') // 清除輸入框內容
	}
})

$(document).on('click', '.bt2', function () {
	$(this).parent().remove()
})
