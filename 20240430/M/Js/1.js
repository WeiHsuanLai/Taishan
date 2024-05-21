// 分數
let score = 0
// 剩餘秒數
let time = 0
// 計時器
let timer = 0
// 最高分
const highscore = {
	name: '-',
	score: 0
}
if (localStorage.fishHighScore) {
	const data = JSON.parse(localStorage.fishHighScore)
	highscore.name = data.name
	highscore.score = data.score
	$('#text-highscore-player').text(highscore.name)
	$('#text-highscore-score').text(highscore.score)
}

$('#btn-start').click(function () {
	// 停用按鈕
	$(this).attr('disabled', true)
	// 重設
	score = 0
	$('#text-score').text(score)
	time = 30
	$('#text-time').text(time)
	// 下面 setInterval 的 function 的 this 會指向到 window
	// 所以把點擊事件的 this 放在變數裡面
	const _this = this
	// 開始遊戲
	timer = setInterval(function () {
		// 倒數
		time--
		$('#text-time').text(time)
		// 隨機數字 > 5，且魚的數量 < 5 才出現
		const random = Math.ceil(Math.random() * 10)
		if (random > 5 && $('.fish').length < 30) {
			// 隨機位置
			const top = Math.round(Math.random() * 100) + '%'
			const left = Math.round(Math.random() * 100) + '%'
			// 產生魚
			const fish = $(`<img src="./kodai_sacabambaspis.png" class="fish" style="top: ${top}; left: ${left}">`)
			$('#game').append(fish)
			moveFish(fish)
		}
		// 時間到
		if (time === 0) {
			clearInterval(timer)
			// 重新啟用開始按鈕
			console.log(_this)
			$(_this).attr('disabled', false)
			// 清空遊戲區域
			$('#game').empty()
			// 最高分
			if (score > highscore.score) {
				const name = prompt('最高分，請輸入名字') || '-'
				highscore.name = name
				highscore.score = score

				$('#text-highscore-player').text(highscore.name)
				$('#text-highscore-score').text(highscore.score)

				// localStorage.資料名稱 = 文字
				// localStorage.setItem(資料名稱, 文字)
				localStorage.fishHighScore = JSON.stringify(highscore)
			}
		}
	}, 1000)
})

$('#game').on('click', '.fish', function () {
	$(this).stop()
	$(this).attr('src', './blood.png')
	$(this).removeClass('fish').addClass('blood')
	score++
	$('#text-score').text(score)
})

function moveFish(fish) {
	const top = Math.round(Math.random() * 100) + '%'
	const left = Math.round(Math.random() * 100) + '%'
	fish.animate({ top, left }, 2000, function () {
		moveFish(fish)
	})
}