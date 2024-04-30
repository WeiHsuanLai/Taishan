// 產生卡片
for (let i = 0; i < 16; i++) {
	$('#game').append(`
      <div class="card card-close">
        <div class="card-front"></div>
        <div class="card-back"></div>
      </div>
    `)
}

$('.card').each(function (index) {
	const number = (index % 8) + 1
	console.log(index, number)
	$(this).find('.card-front').css('background-image', `url(./cards/${number}H.jpg)`)
	$(this).attr('data-number', number)
})

for (let i = 0; i < 20; i++) {
	const randA = Math.round(Math.random() * 15)
	const randB = Math.round(Math.random() * 15)
	$('.card').eq(randA).insertAfter($('.card').eq(randB))
}

$('.card').click(function () {
	// 翻牌
	if (
		// .card 沒有 .card-close 代表被翻開
		// 如果已翻開數量小於 2
		$('.card:not(.card-close)').length < 2 &&
		// 這張牌還沒被翻開
		$(this).hasClass('card-close') &&
		// 這張牌還沒配對
		!$(this).hasClass('card-ok')
	) {
		$(this).removeClass('card-close')
	}

	// 翻開兩張了
	if ($('.card:not(.card-close)').length === 2) {
		// 如果兩張都一樣
		if ($('.card:not(.card-close)').eq(0).attr('data-number') === $('.card:not(.card-close)').eq(1).attr('data-number')) {
			$('.card:not(.card-close)').addClass('card-ok')
			$('.card:not(.card-close)').fadeTo(1000, 0)
		}

		setTimeout(function () {
			$('.card:not(.card-close)').addClass('card-close')
			if ($('.card-ok').length === $('.card').length) {
				alert('過關')
			}
		}, 1000)
	}
})
