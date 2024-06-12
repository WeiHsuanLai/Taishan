import axios from 'axios'
export const handleExhibitionRequest = async (event) => {
	try {
		const response = await axios.get('https://cultureexpress.taipei/OpenData/Event/C000003')
		const data = response.data
		const exhibitions = data.filter((item) => item.Category === '展覽')
		const topFiveExhibitions = exhibitions.slice(0, 1)
		const richContents = topFiveExhibitions.map((exhibition) => {
			const caption = exhibition.Caption
			const frontHalf = caption.slice(0, 13)
			const backHalf = caption.slice(13, caption.length)

			return [
				{ type: 'text', text: `活動名稱：` },
				{ type: 'text', text: `${frontHalf}` },
				{ type: 'text', text: `${backHalf}` }
			]
		})

		return await event.reply(richContents.flat())
	} catch (error) {
		console.error(error)
		return await event.reply({ type: 'text', text: '哩喜勒工沙小' })
	}
}

// { type: 'text', text: `組織者：${lecture.Company}` },
// { type: 'text', text: `開始時間：${lecture.StartDate}` },
// { type: 'text', text: `結束時間：${lecture.EndDate}` },
// { type: 'text', text: `類別：展覽` }
