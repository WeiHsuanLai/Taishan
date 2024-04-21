let person = {
    name: '老王',
    age: 25,
    number: 24
}
// document.write(`他的名字是${person.name}<br>`)
// document.write(`他的年齡是${person.age}歲<br>`)
// document.write(`他的座號是${person.number}`)

const wdaf2e = {
    classroom: '1114',
    name: '前端技術',
    student: '18',
    year: 113,
    semester: 1
}

// document.write(wdaf2e.name + '<br>')
// document.write(wdaf2e['classroom'] + '<br>')
const key = 'year'
// document.write(wdaf2e[key] + '<br>')
// 物件不能用.lengh 因為.lengh會變成在物件內找名為lengh的資料
// document.write(wdaf2e.lengh + '<br>')

// Object.keys 把物件內的key取出成陣列
console.log(Object.keys(wdaf2e))
// Object.keys 把物件內的值取出成陣列
console.log(Object.values(wdaf2e))

const keys = Object.keys(wdaf2e)
for (let i = 0; i < keys.length; i++) {
    document.write(`${keys[i]}-${wdaf2e[keys[i]]}<br>`)
}