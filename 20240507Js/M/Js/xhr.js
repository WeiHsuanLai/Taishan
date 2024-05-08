const xhr = new XMLHttpRequest()
xhr.open('get', 'http://kktix.com/events.json')
// xhr.open('get', 'http://192.168.211.1:3000/posts')
// 收到回覆時
// xhr.addEventListener('load', () => {})
xhr.onload = () => {
	console.log(xhr.responseText)
}
// 錯誤時
xhr.onerror = (error) => {
	console.log(error)
}
// 送出
xhr.send()

const xhrPost = new XMLHttpRequest()
xhrPost.open('post', 'https://jsonplaceholder.typicode.com/posts')
xhrPost.setRequestHeader('content-type', 'application/json')
xhrPost.onload = () => {
	console.log(xhrPost.responseText)
	const json = JSON.parse(xhrPost.responseText)
	console.log(json.title)
}
xhrPost.onerror = (error) => {
	console.log(error)
}
xhrPost.send(
	JSON.stringify({
		title: 'aaa',
		body: 'bbb'
	})
)
