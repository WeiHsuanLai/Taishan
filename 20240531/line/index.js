import 'dotenv/config' // 引用 dotenv 套件
import linebot from 'linebot' // 引用 linebot 套件
import axios from 'axios' // 引用 axios 套件
// import commandFE from './commands/fe.js'

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
			try {
				const response = await axios.get('https://cultureexpress.taipei/OpenData/Event/C000003')
				const data = response.data // 從回應對象提取數據
				// 過濾出類別為"展覽"的事件
				const exhibitions = data.filter((item) => item.Category === '展覽')
				// 使用 slice() 方法來取得前五筆資料
				const topFiveExhibitions = exhibitions.slice(0, 5)
				// 假設您希望回覆第一個符合條件的事件

				// 建構回覆訊息
				const richContents = topFiveExhibitions.map((exhibition) => [
					{ type: 'text', text: `活動名稱：${exhibition.Caption}` }
					// { type: 'text', text: `組織者：${exhibition.Company}` },
					// { type: 'text', text: `開始時間：${exhibition.StartDate}` },
					// { type: 'text', text: `結束時間：${exhibition.EndDate}` },
					// { type: 'text', text: `類別：展覽` }
				])

				const result = await event.reply(richContents.flat()) // 使用 RichContent 類型傳送訊息
				console.log(result)
			} catch (error) {
				const result = await event.reply({ type: 'text', text: '哩喜勒工沙小' })
				console.log(error)
			}
		} else if (event.message.text === '講座') {
			try {
				const response = await axios.get('https://cultureexpress.taipei/OpenData/Event/C000003')
				const data = response.data // 从响应对象中提取数据
				// 过滤出类别为"展覽"的事件
				const exhibitions = data.filter((item) => item.Category === '講座')
				// 假设您希望回复第一个符合条件的事件
				if (exhibitions.length > 0) {
					const exhibition = exhibitions[0]

					// 构建回复消息
					const richContent = [
						{ type: 'text', text: `活動名稱：${exhibition.Caption}` },
						{ type: 'text', text: `組織者：${exhibition.Company}` },
						{ type: 'text', text: `開始時間：${exhibition.StartDate}` },
						{ type: 'text', text: `結束時間：${exhibition.EndDate}` },
						{ type: 'text', text: `類別：講座` }
					]

					const result = await event.reply(richContent) // 使用 RichContent 类型发送消息
					console.log(result)
				}
			} catch (error) {
				const result = await event.reply({ type: 'text', text: '哩喜勒工沙小' })
				console.log(error)
			}
		} else {
			const result = await event.reply({ type: 'text', text: '哩喜勒工沙小' })
		}
	}
})

// bot.on('message', async (event) => {
// 	if (event.message.type === 'text') {
// 		commandFE(event)
// 	}
// })

// 建立網頁伺服器，去監聽指定路徑進來的請求， process.env.PROT 如果環境變數有 PROT 就使用這個，沒有就使用 3000
bot.listen('/', process.env.PROT || 3000, () => {
	console.log('機器人啟動')
})
