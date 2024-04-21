const fruits = [
          { name: 'apple', price: 50 },
          { name: 'banana', price: 20 },
          { name: 'orange', price: 40 },
]
console.log(fruits)
console.table(fruits)

document.write('<ul>')
for (let i = 0; i < fruits.length; i++) {
          document.write('<li>')
          document.write(`第${i + 1}個水果是${fruits[i].name}，價格是${fruits[i].price}`)
          document.write('</li>')
}
document.write('</ul>')

const store = {
          name: 'PCHome',
          url: 'https://24h.pchome.com.tw/',
          products: [
                    { name: 'nike休閒鞋白', price: 2099 },
                    { name: 'nike休閒鞋黑藍', price: 2553 }
          ]
}

document.write('<table border="1">')
document.write('<caption>')
document.write(`<a href="${store.url}">${store.name}</a>`)
document.write('</caption>')

for (let i = 0; i < store.products.length; i++) {
          document.write('<tr>')
          document.write(`<td>${store.products[i].name}</td>`)
          document.write(`<td>${store.products[i].price}</td>`)
          document.write('</tr>')
}
document.write('</table>')
