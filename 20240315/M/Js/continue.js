for (let i = 0; i <= 9; i++) {
	if (i === 5) continue
	// if (i === 5){ continue;}
	// if(i!==5){}
	document.write(i + '<br>')
}
// 猜猜神秘數字，讓使用者猜測神秘數字是多少，猜對才打斷迴圈
let count = 1
let num = 123
while (true) {
	let answer = prompt(`第 ${count} 次猜測，猜猜看秘密數字是多少`)
	if (answer == num) {
		break
	}
	count++
}
