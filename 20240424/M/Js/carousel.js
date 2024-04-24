// 目前圖片的索引
let now = 0

$('#btn-next').click(function () {
	if (now + 1 <= 4) {
		now++
		$('#imgs')
			.stop(true, true)
			.animate({ left: now * 500 * -1 - 25 })
			.animate({ left: now * 500 * -1 })
	}
})
$('#btn-prev').click(function () {
	if (now - 1 >= 0) {
		now--
		$('#imgs')
			.stop(true, true)
			.animate({ left: now * 500 * -1 + 25 })
			.animate({ left: now * 500 * -1 })
	}
})
