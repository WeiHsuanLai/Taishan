import axios from 'axios'
import 'dotenv/config'
import template from '../templates/culture.js'

export default async (event) => {
	try {
		console.log('Fetching data from API...')
		const { data } = await axios.get('https://cultureexpress.taipei/OpenData/Event/C000003')
		const replies = data.slice(0, 5).map((d) => {
			const t = template()

			// 檢查並設置回覆內容
			if (d.Caption) t.body.contents[0].text = d.Caption
			else t.body.contents[0].text = 'N/A' // 如果 Caption 為空，設置為 'N/A'

			if (d.Company) t.body.contents[1].contents[0].contents[1].text = d.Company
			else t.body.contents[1].contents[0].contents[1].text = 'N/A' // 如果 Company 為空，設置為 'N/A'

			if (d.StartDate) t.body.contents[1].contents[1].contents[1].text = d.StartDate
			else t.body.contents[1].contents[1].contents[1].text = 'N/A' // 如果 StartDate 為空，設置為 'N/A'

			if (d.EndDate) t.body.contents[1].contents[2].contents[1].text = d.EndDate
			else t.body.contents[1].contents[2].contents[1].text = 'N/A' // 如果 EndDate 為空，設置為 'N/A'

			if (d.TicketPrice) t.body.contents[1].contents[3].contents[1].text = d.TicketPrice
			else t.body.contents[1].contents[3].contents[1].text = 'N/A' // 如果 TicketPrice 為空，設置為 'N/A'

			return t
		})
		const replyMessage = {
			type: 'flex',
			altText: '查詢',
			contents: replies[0]
		}
		await event.reply(replyMessage)
		console.log('Replies sent successfully!')
	} catch (error) {
		console.error('Error occurred:', error)
		await event.reply('發生錯誤')
	}
}
