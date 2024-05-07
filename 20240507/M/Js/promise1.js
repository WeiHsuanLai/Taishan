const pass = true
const getMoney = new Promise((resolve, reject) => {
	if (pass) {
		resolve('恭喜')
	} else {
		reject(new Error('QQ'))
	}
})

getMoney
	// Promise resolve 時候執行 .then()
	// result 會是 resolve() 內的東西
	.then((result) => {
		console.log(result)
	})
	// Promise reject 時候執行 .catch()
	// result 會是 reject() 內的東西
	.catch((error) => {
		console.log(error)
	})
	// 不管成功或失敗都執行
	.finally(() => {
		console.log('結束')
	})
