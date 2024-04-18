let input = ''
// while (input < 1 || input > 12) {
//     input = prompt('123')
// }0
let count = 0
while (input !== '123') {
	input = prompt('123')
	count++
}
document.write(`輸入了${count}次`)
// document.write('輸入了' + count + '次')
