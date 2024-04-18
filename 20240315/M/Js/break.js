// for (let i = 0; i <= 9; i++) {
// 	if (i === 5) break
// 	document.write(i + '<br>')
// }
const number = 58900
let count = 0
while (true) {
	count++
	const input = prompt(`猜第${count}次`)
	if (input > number) {
		alert('太大')
	} else if (input < number) {
		alert('太小')
	} else {
		document.write(`總共猜了${count}次`)
		break
	}
}
// document.write('<table border="1">')
// loop1: for (let i = 1; i <= 5; i++) {
//     document.write(`<tr>`)
//     loop2: for (j = 1; j <= 5; j++) {
//         if (i === 5) break loop1
//         document.write(`<td>${i}x${j}=${i * j}</td>`)
//     }
//     document.write(`</tr>`)
// }
// document.write('</table>')
