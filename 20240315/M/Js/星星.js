//  for (let i = 1; i <= 9; i++) {
//   console.log(i)
// }for (let i = 1; i <= 10; i += 3) {
//   document.write(i + '<br>')
// document.write(`${i}<br>`)
// }
// var j = 255
for (let i = 0; i <= 255; i += 5) {
	// console.log(i) // document.write(`<span style="color: rgb(255,0,0)">★</span>`)
	document.write(`<span style="color: rgb(${255 - i},0,${i})">★</span>`)
}
