let input = prompt('印星星數')
for (let i = 1; i <= input; i++) {
	for (let k = input - 1; k >= i; k--) {
		document.write('☆')
	}
	// document.write('★')
	for (let j = 1; j <= 2 * i - 1; j++) {
		document.write('★')
	}
	for (let k = input - 1; k >= i; k--) {
		document.write('☆')
	}
	document.write('<br>')
}
