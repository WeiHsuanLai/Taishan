fetch('http://kktix.com/events.json', { method: 'GET' })
	.then((response) => {
		// Response 物件，沒有辦法直接取得內容
		console.log(response)
		return response.json()
	})
	.then((json) => {
		console.log(json.title)
	})
	.catch((error) => {
		console.log(error)
	})

const main = async () => {
	try {
		const response = await fetch('http://kktix.com/events.json', { method: 'GET' })
		const json = await response.json()
		console.log(json.title)
	} catch (error) {
		console.log(error)
	}
}
main()
fetch('https://jsonplaceholder.typicode.com/posts', {
	method: 'POST',
	body: JSON.stringify({
		title: 'aaa',
		body: 'bbb'
	}),
	headers: {
		'content-type': 'application/json'
	}
})
