const numbers = [1, 2, 3, 4]
for (const number of numbers) {
          console.log(number)
          document.write(number + '<br>')
}

document.write('<hr>')

// for (索引 in 陣列或物件)
//索引的資料型態或文字
for (const i in numbers) {
          document.write(`第 ${i + 1} 個-索引 ${i}-${numbers[i]}  <br>`)
}

const obj = { a: 1, b: 2, c: 3 }
for (const key in obj) {
          document.write(`${key}:${obj[key]}<br>`)
}

document.write('<hr>')

const number2 = [1, 2, 3, 4]
for (let number of numbers) {
          number *= 100
}

