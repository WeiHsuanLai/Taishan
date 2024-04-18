let a = 1
if (true) {
	let a = 2
	console.log('裡a=' + a) //2
}
console.log('外a=' + a) //1

let b = 1
if (true) {
	b = 2
	console.log(b) //2
}
console.log(b) //2
