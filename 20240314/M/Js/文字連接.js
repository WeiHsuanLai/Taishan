// prompt(輸入文字)
// 跳出一個文字輸入框，輸入框出現時網頁是暫停的
// 會收到輸入的文字，如果按取消的話則是null
let firstname = prompt('請輸入姓氏')
let lastname = prompt('請輸入名字')
let fullname = lastname + firstname
document.write('<h1>' + fullname + '</h1>')
document.write(`<h1>${fullname}</h1>`)
