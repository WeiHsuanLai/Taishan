import 'dotenv/config'
import linebot from 'linebot'
import axios from 'axios'

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
				const data = response.data // 从响应对象中提取数据
				// 过滤出类别为"展覽"的事件
				const exhibitions = data.filter((item) => item.Category === '展覽')
				// 假设您希望回复第一个符合条件的事件
				if (exhibitions.length > 0) {
					const exhibition = exhibitions[0]

					// 构建回复消息
					const richContent = [
						{ type: 'text', text: `活動名稱：${exhibition.Caption}` },
						{ type: 'text', text: `組織者：${exhibition.Company}` },
						{ type: 'text', text: `開始時間：${exhibition.StartDate}` },
						{ type: 'text', text: `結束時間：${exhibition.EndDate}` },
						{ type: 'text', text: `類別：展覽` }
					]

					const result = await event.reply(richContent) // 使用 RichContent 类型发送消息
					console.log(result)
				}
				if (exhibitions2.length > 0) {
					const exhibition = exhibitions[0]

					// 构建回复消息
					const richContent = [
						{ type: 'text', text: `活動名稱：${exhibition.Caption}` },
						{ type: 'text', text: `組織者：${exhibition.Company}` },
						{ type: 'text', text: `開始時間：${exhibition.StartDate}` },
						{ type: 'text', text: `結束時間：${exhibition.EndDate}` },
						{ type: 'text', text: `類別：展覽` }
					]

					const result = await event.reply(richContent) // 使用 RichContent 类型发送消息
					console.log(result)
				}
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
				if (exhibitions2.length > 0) {
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
		}
	}
})

bot.listen('/', 3000, () => {
	console.log('機器人啟動')
})
