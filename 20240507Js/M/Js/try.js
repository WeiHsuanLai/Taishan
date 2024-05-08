try {
	// 發生錯誤直接跳到 catch
	alertt('123')
	// 因為上面發生錯誤跳到 catch，所以這個不會執行
	console.log(456)
} catch (error) {
	// 錯誤的物件
	console.log(error)
	// 錯誤的名稱
	console.log(error.name)
	// 錯誤的訊息
	console.log(error.message)
}
console.log('abc')
