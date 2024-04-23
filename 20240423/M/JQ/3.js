// .click(function) 綁定事件
// .click() 觸發事件 = addEventLister('click')
// .on('事件名稱',function) 綁定事件 = addEventLister
// .one('事件名稱',function) 綁定事件，只執行一次
// .off('事件名稱',function) 解除綁定 = removeEventLister
$('#btn').click(function (event) {
	console.log(event.offsetX)
	// this 代表觸發事件的東西
	// .val() 輸入欄位的 value
	// () 有東西就修改，沒東西就取值
	$(this).val('點過了')
})

function test() {
	console.log(123)
}
$('#input-text').on('input', function () {
	$('#text').text($(this).val())
})
$('#input-text').on('input', test)

$('#btn-off').on('click', function () {
	// $('#input-text').off('input')
	$('#input-text').off('input', test)
})
// ctrl F5 清除快取重新整理

// $('#btn-off').on('click', function () {})
$('#btn-add').click(function () {
	// .append() 裡面的後面
	// .prepend()裡面的前面
	// .insertAfert()同一層的後面
	// .insertBefore()同一層的前面
	// HTML 文字是新增，憲有東西是移動
	$('#target').append('<p>append</p>')
	$('#target').prepend('<p>prepend</p>')
	$('#target').prepend($('#move'))
	$('<p>insertAfter</p>').insertAfter('#target')
	$('<p>insertBefore</p>').insertBefore('#target')
})

// 只會綁到頁面載入時的三個，新增的介面不會有反應
// $('.btn').click(function () {
// 	$('#btns').append(`<input type="button" value="按鈕" class="btn">`)
// })

// 點到 #btns 後檢查是不是點到 .btn，點到才執行
// $('#btns').on('click', '.btn', function () {
//   $('#btns').append(`<input type="button" value="按鈕" class="btn">`)
// })

$('#btns').on('click', '.btn', function () {
	$('btns').append(`<input type="button" value="按鈕" class="btn">`)
})

function add() {
	const newBtn = $(`<input type="button" value="按鈕" class="btn">`)
	$(newBtn).click(add)
	$('#btns').append(newBtn)
}
$('.btn').click(add)

// return false = preventDefault 不執行事件
// $(document).on('contextmenu', function (e) {
// 	e.preventDefault()
// 	return false
// })
