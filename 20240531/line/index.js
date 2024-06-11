import 'dotenv/config' // 引用 dotenv 套件
import linebot from 'linebot' // 引用 linebot 套件
import axios from 'axios' // 引用 axios 套件
import { handleExhibitionRequest } from './commands/handleExhibitionRequest.js'
import flexMessageJson from './commands/flexMessageJson.js'
import flexMessageJson2 from './commands/flexMessageJson2.js'

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
			await handleExhibitionRequest(event)
		} else if (event.message.text === '展覽2') {
			try {
				// 處理展覽2請求
				await flexMessageJson(event)
			} catch (error) {
				// 捕獲錯誤並回覆預設文本消息
				console.error('處理展覽2請求時出錯:', error)
				event.reply({ type: 'text', text: '哩喜勒工沙小2' })
			}
		} else if (event.message.text === '展覽3') {
			await flexMessageJson2(event)
		} else {
			// 回覆未知命令
			await event.reply({ type: 'text', text: '哩喜勒工沙小' })
		}
	}
})

// 建立網頁伺服器，去監聽指定路徑進來的請求， process.env.PORT 如果環境變數有 PORT 就使用這個，沒有就使用 3000
bot.listen('/', process.env.PORT || 3000, () => {
	console.log('機器人啟動')
})
