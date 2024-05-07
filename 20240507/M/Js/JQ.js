// $.get(url, 成功的function, 回來的資料型態)
$.get(
	'https://kktix.com/events.json',
	function (data) {
		console.log(data.title)
	},
	'json'
)

$.ajax({
	url: 'https://kktix.com/events.json',
	method: 'get',
	dataType: 'json',
	success: function (data) {
		console.log(data.title)
	},
	error(xhr, textStatus, error) {
		// jQ 包裝的 xhr，不是 XMLHttpRequest
		console.log(xhr)
		// 錯誤狀態，error、timeout、abort
		console.log(textStatus)
		// 錯誤
		console.log(error)
	},
	complete() {
		console.log('完成')
	}
})
$.post(
	'https://jsonplaceholder.typicode.com/posts',
	{
		title: 'aaa',
		body: 'bbb'
	},
	function (data) {
		console.log(data.title)
	},
	'json'
)
$.ajax({
	url: 'https://jsonplaceholder.typicode.com/posts',
	method: 'get',
	dataType: 'json',
	success: function (data) {
		console.log(data.title)
	},
	error(xhr, textStatus, error) {
		// jQ 包裝的 xhr，不是 XMLHttpRequest
		console.log(xhr)
		// 錯誤狀態，error、timeout、abort
		console.log(textStatus)
		// 錯誤
		console.log(error)
	},
	complete() {
		console.log('完成')
	}
})
