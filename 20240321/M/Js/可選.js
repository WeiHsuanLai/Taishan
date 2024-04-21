const user = {
          name: 'AAA',
          info: {
                    email: 'aaa@gmail.com'
          }
}
console.log(user.name) //AAA
console.log(user.info.email) //aaa@gmail.com
// console.log(user.info.address)
// console.log(user.info.address.city)
console.log(user.info.address?.city) //underfined
console.log(user.info.address?.city?.postcode) //underfined
const products = [
          {
                    name: 'nike休閒鞋白',
                    price: 2099,
                    producer: {
                              name: 'Nothing',
                              url: 'https://24h.pchome.com.tw/'
                    }

          },
          {
                    name: 'nike休閒鞋白',
                    producer: {
                              price: 2099,
                              url: 'https://24h.pchome.com.tw/'
                    }
          },
          {
                    name: '不明鞋',
                    price: 2099,
                    producer: {
                              name: 'Nothing',
                              url: 'https://24h.pchome.com.tw/'
                    }
          }
]
for (let i = 0; i < products.length; i++) {
          document.write(`
          <P>
              ${products[i].name}，價格為${products[i].price}
              製造商為
              <a href = "${products[i].producer?.url || '#'}">${products[i].producer?.name || '不明'}</a>
          </P>    
          `)
}