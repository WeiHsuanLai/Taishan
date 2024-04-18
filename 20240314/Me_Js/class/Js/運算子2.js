let a = 10
a++ //等於 a += 1
console.log(a) //11
++a
console.log(a) //12
let x = 0
let y = 10
// x = y
// y++
x = y++
console.log(x, y) //(10,11)
let xx = 0,
	yy = 10
// ++yy    (0,11)
// xx = yy (11,11)
xx = ++yy
console.log(xx, yy) //(11,11)
