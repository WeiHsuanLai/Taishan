let numbers = [33, 75, 69, 41, 50, 19]
// 第一題
// let x = prompt();
// for (let i = 0; i < x; i++) {
//     document.write(`第${i + 1}個值為${numbers[i]}<br>`)
// }

for (const i in numbers) {
          document.write(`第${parseInt(i) + 1}個值為${numbers[i]}<br>`)
}

// 第二題P1

for (const i in numbers) {
          if (numbers[i] === 41) {
                    document.write(`41是第${parseInt(i) + 1}個字<br>`)
                    break
          }
}

let odd = 0
let even = 0
for (const i in numbers) {
          if (numbers[i] % 2 === 1) {
                    odd++
          } else {
                    even++
          }
}
document.write(`奇數:${odd}偶數${even}<br>`)

let min = numbers[0]
let max = numbers[0]
for (const number of numbers) {
          if (number > max) {
                    max = number
          } if (number < min) {
                    min = number
          }
}
document.write(`最大值:${max}最小值${min}`)




// let bendons = [1, 2, 3];
// for (let i = 0; i < bendons.length; i++) {
//     document.write(bendons[i])
// }
// let i = parseInt(prompt())
// if (i === numbers[0]) {
//     document.write(1)
// } else if ()