const age = prompt('請輸入年齡', 0)
if (age < 6) {
	document.write('普遍級')
} else if (age <= 12) {
	document.write('保護級')
} else if (age < 18) {
	document.write('普遍級')
} else if (age >= 18) {
	document.write('限制級')
} else {
	document.write('請輸入正確年齡')
}

let lang = '1234'
if (lang === 'tw') {
	document.write('台灣')
} else if (lang === 'japan') {
	document.write('日本')
} else if (lang === 'USA') {
	document.write('美國')
} else if (lang === 'Korea') {
	document.write('韓國')
} else {
	document.write('窩不知道')
}
// 從符合的case開始往下執行，直到遇到break
// default 代表以上皆非，不一定要有
switch (lang) {
	case 'tw':
		document.write('台灣')
		break
	case 'japan':
		document.write('日本')
		break
	case 'USA':
		document.write('美國')
		break
	case 'Korea':
		document.write('韓國')
		break
	case '':
		document.write('窩不知道')
		break
}
