import axios from 'axios'
import 'dotenv/config'
import template2 from '../templates/culture2.js'

export default async (event) => {
	try {
		console.log('Fetching data from API...')
		const { data } = await axios.get('https://cultureexpress.taipei/OpenData/Event/C000003')
		const replies2 = data.slice(0, 5).map((d) => {
			const t = template2()

			// 檢查並設置回覆內容
			// 照片
			if (d.ImageFile) t.hero.url = d.ImageFile
			else t.hero.url = 'N/A'
			// 第一段標題
			if (d.Caption) t.body.contents[0].text = d.Caption
			else t.body.contents[0].text = 'N/A'
			// 第二段標題
			if (d.Caption) t.body.contents[1].text = d.Caption
			else t.body.contents[1].text = 'N/A'
			// 地點
			if (d.Company) t.body.contents[2].contents[0].contents[1].text = d.Company
			else t.body.contents[2].contents[0].contents[1].text = 'N/A'
			//開始日期
			if (d.StartDate) t.body.contents[2].contents[1].contents[1].text = d.StartDate
			else t.body.contents[2].contents[1].contents[1].text = 'N/A'
			// 結束日期
			if (d.EndDate) t.body.contents[2].contents[3].contents[1].text = d.EndDate
			else t.body.contents[2].contents[3].contents[1].text = 'N/A'
			// 票價
			if (d.TicketPrice) t.body.contents[2].contents[3].contents[1].text = d.TicketPrice
			else t.body.contents[2].contents[3].contents[1].text = 'N/A'
			// 連結
			if (d.WebsiteLink) t.footer.contents[0].action.uri = d.WebsiteLink
			else t.footer.contents[0].action.uri = 'N/A'
			return t
		})

		const result2 = await event.reply({
			type: 'flex',
			altText: '查詢結果',
			contents: {
				type: 'carousel',
				contents: replies2
			}
		})

		console.log(result2)
		await event.reply(result2)
		console.log('Replies sent successfully!')
	} catch (error) {
		console.error('Error occurred:', error)
		await event.reply('發生錯誤')
	}
}
