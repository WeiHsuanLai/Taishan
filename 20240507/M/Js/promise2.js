const getMoney = (pass) => {
	return new Promise((resolve, reject) => {
		if (pass) {
			resolve('恭喜')
		} else {
			reject(new Error('QQ'))
		}
	})
}
const data = [true, true, false, true]
for (let i = 0; i < data.length; i++) {
	getMoney(data[i])
		.then((result) => {
			console.log(i, result)
		})
		.catch((error) => {
			console.log(i, error)
		})
}
