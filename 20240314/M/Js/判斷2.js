const rain = false,
	wind = true
if (!rain && !wind) console.log('看電影')
else console.log('在家發呆')

const dinner = '炸雞'
if (dinner === '炸雞' || dinner === '可樂') console.log('好诶')
else console.log('不好诶')

const coding = confirm('你會寫code嗎?')
const game = confirm('你有玩原神嗎?')
const player = confirm('你是可莉玩家嗎?')
if ((game && player) || coding) {
	console.log('酷诶')
} else {
	console.log('加油好嗎')
}
