const wait = (ms, ok) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (ok) {
				resolve('ok')
			} else {
				reject(new Error('no ok'))
			}
		}, ms)
	})
}

// async function main () {}
const main = async () => {
	try {
		console.log('a')
		// await 等待 promise 有結果後才繼續
		// await 後面只能是 promise
		// await 只能在 async function 裡面
		// async function 也是一種 promise

		// 變數 = await promise
		// 變數 = promise resolve 結果
		// promise reject 會跳到 catch
		const result1 = await wait(1000, true)
		console.log('result1: ' + result1)
		console.log('b')
		const result2 = await wait(5000, false)
		console.log('c')
		const result3 = await wait(3000, true)
		console.log('d')
	} catch (error) {
		console.log('catch')
		console.log(error)
	}
}
main()