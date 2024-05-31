const a1 = 1
const a2 = 2
let a3 = 3
const add = () => {
	return a1 + a2 + a3
}
// 一個檔案只能有一個 export default，然後後面只能接一個東西，如果要接多個要使用 {} 把東西包在裡面
export default {
	a1,
	a2,
	a3,
	add
}
