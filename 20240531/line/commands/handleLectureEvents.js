import axios from 'axios'
export const handleLectureRequest = async (event) => {
	try {
		const response = await axios.get('https://cultureexpress.taipei/OpenData/Event/C000003')
		const data = response.data
		const lectures = data.filter((item) => item.Category === '講座')
		const topFiveLectures = lectures.slice(0, 5)
		// if (lectures.length > 0) {
		// const lecture = lectures[0]
		const richContents = topFiveLectures.map((lecture) => [
			{ type: 'text', text: `活動名稱：${lecture.Caption}` }
			// { type: 'text', text: `組織者：${lecture.Company}` },
			// { type: 'text', text: `開始時間：${lecture.StartDate}` },
			// { type: 'text', text: `結束時間：${lecture.EndDate}` },
			// { type: 'text', text: `類別：講座` }
		])
		return await event.reply(richContents.flat())
		// }
	} catch (error) {
		console.error(error)
		return await event.reply({ type: 'text', text: '哩喜勒工沙小' })
	}
}
