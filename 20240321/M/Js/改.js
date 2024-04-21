const arr = [1, 2, 3]
const obj = { a: 1, b: 2, c: 3 }

arr[0] = 111
obj.a = 111

console.log(arr[0] === obj.a)

console.log(arr)
console.log(obj)

const a = [1, 2, 3]
const b = a
b[0] = 100
console.log(a)
console.log(b)

const obj1 = { a: 1, b: 2, c: 3 }
const obj2 = obj1
obj1.a = 100
// document.write(obj1)
console.log(obj2)
// console.log(a[0])

// Pass by value 傳值
let test1 = 1
let lest2 = test1
test2 = 100
console.log(test1);//1
console.log(test2);//100

const c = [4, 5, 6]
// document.write(c)
let d = c[0]
d = 100
console.log(c);//[4,5,6]
console.log(d);//100

const obj3 = { a: 1, b: 2, c: 3 }
const obj4 = { a: obj3.a, b: obj3.b, c: obj3.c }
obj4.a = 100
console.log(obj3);//{a:1,b:2,c:3}
console.log(obj4);//{a:100,b:2,c:3}

// document.write(obj3)