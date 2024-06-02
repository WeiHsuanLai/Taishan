import 'dotenv/config' // 引用 dotenv 套件
import linebot from 'linebot' // 引用 linebot 套件
import axios from 'axios' // 引用 axios 套件
import { handleExhibitionRequest } from './commands/handleExhibitionRequest.js'
import { handleLectureRequest } from './commands/handleLectureEvents.js'

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
			await handleExhibitionRequest(event)
		} else if (event.message.text === '講座') {
			await handleLectureRequest(event)
		} else {
			const result = await event.reply({ type: 'text', text: '哩喜勒工沙小' })
		}
	}
})

// 建立網頁伺服器，去監聽指定路徑進來的請求， process.env.PROT 如果環境變數有 PROT 就使用這個，沒有就使用 3000
bot.listen('/', process.env.PROT || 3000, () => {
	console.log('機器人啟動')
})
// bot.on('message', async (event) => {
// 	if (event.message.type === 'text') {
// 		commandFE(event)
// 	}
// })
