const a = 10,
	b = 20
if (a > b) {
	console.log(' a > b ')
} else {
	console.log(' a < b ')
}

const c = 100,
	d = '100'
if (c == d) {
	console.log(' c == d ')
} else {
	console.log(' c !== d ')
}

if (c === d) {
	console.log(' c === d ')
} else {
	console.log(' c !== d ')
}

const ok = true
// if(ok) ==> if(ok === true)
if (ok) {
	console.log('ok')
}
// if(!ok) ==> if(ok === false)
if (!ok) {
	console.log('not ok')
}

const sleep = confirm('中午有沒有睡覺')
if (sleep) console.log('有睡')
else console.log('沒睡')
// let message = ''
// if(like)   message = '喜歡'
// else       message = '不喜歡'
const like = confirm('你喜換js嗎?')
const message = like ? '喜歡' : '不喜歡'
console.log(message)
