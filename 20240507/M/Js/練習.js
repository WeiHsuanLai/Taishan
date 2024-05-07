// - https://kktix.com/events.json 用表格印出所有活動
// - 限制使用 axios、async、await
// - 不能使用 jQ
// - title、summary、content、author (用 a 標籤)、published
axios
	.get('https://kktix.com/events.json')
	.then((response) => {
		console.log(response)
		const data = []
		for (let i = 0; i < response.data.entry.length; i++) {
			const entry = response.data.entry[i]
			data.push(
				`<tr><td>${entry.title}</td><td>${entry.summary}</td><td>${entry.content}</td><td><a href="#">${entry.author}</a></td><td>${entry.published}</td></tr>`
			)
		}
		document.write(
			`<table><thead><tr><th>標題</th><th>摘要</th><th>內容</th><th>作者</th><th>發布日期</th></tr></thead><tbody>${data.join('')}</tbody></table>`
		)
	})
	.catch((error) => {
		console.log(error)
	})

const main = async () => {
	try {
		const { data } = await axios.get('https://kktix.com/events.json')
		// console.log(data.title);
	} catch (error) {
		console.log(error)
	}
}
main()
