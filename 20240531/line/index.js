import 'dotenv/config' // 引用 dotenv 套件
import linebot from 'linebot' // 引用 linebot 套件
import axios from 'axios' // 引用 axios 套件
import exhibition from './commands/exhibition.js'
import lecture from './commands/lecture.js'
import citylife from './commands/citylife.js'
import music from './commands/music.js'
import performingarts from './commands/performingarts.js'
import Topics from './commands/Topics.js'
import familyactive from './commands/familyactive.js'

// 設定環境變數
const bot = linebot({
	channelId: process.env.CHANNEL_ID,
	channelSecret: process.env.CHANNEL_SECRET,
	channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', async (event) => {
	console.log(event)
	if (event.message.type === 'text') {
		if (event.message.text === '展覽') {
			// 處理展覽請求
			await exhibition(event)
		} else if (event.message.text === '講座') {
			await lecture(event)
		} else if (event.message.text === '城市生活圈') {
			await citylife(event)
		} else if (event.message.text === '音樂現場') {
			await music(event)
		} else if (event.message.text === '表演藝術') {
			await performingarts(event)
		} else if (event.message.text === '專題特區') {
			await Topics(event)
		} else if (event.message.text === '親子活動') {
			await familyactive(event)
		} else {
			// 回覆未知命令
			await event.reply({ type: 'text', text: '哩喜勒考喔' })
		}
	}
})

// 建立網頁伺服器，去監聽指定路徑進來的請求， process.env.PORT 如果環境變數有 PORT 就使用這個，沒有就使用 3000
bot.listen('/', process.env.PORT || 3000, () => {
	console.log('機器人啟動')
})
