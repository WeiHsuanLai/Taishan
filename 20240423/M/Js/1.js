// .text() = .innerText
// () 有東西就是修改，沒有就是取值
console.log($('#title').text())
$('#title').text('aaaa')

// 如果有取到多個
// 取文字會全部連在一起回傳
// 改文字會全部一起改
console.log($('.text').text())
$('.text').text('123456')

// html() = .innerHtml
// () 有東西就是修改，沒東西就是取值
console.log($('#div').html())
$('#div').html('<a href="http://x.com">x</a>')

// 如果用 [] 指定的話，後面不能用 JQ 語法
$('.link')[0].target = '_blank'
// .eq() 指定第幾個
// .length 取總共幾個
console.log($('.link').length)
// .attr(屬性, 值) 修改一個屬性
// .attr(屬性) 取屬性
$('.link').eq(0).attr('target', '_blank')
$('.link').eq(1).attr({ target: '_blank', href: 'http://github.com' })
$('.link').eq(1).text('Github')

// .first() = .eq(0)
// .last() = 最後一個
// .css(樣式, 值) 修改一個樣式
// .css(樣式) 取一個樣式值
// .css({樣式: 值, 樣式: 值}) 修改多個樣式
$('#list1 li').first().css('color', 'red')
console.log($('#list1 li').first().css('color'))
$('#list1 li').last().css({ textAlign: 'center', color: 'red', 'background-color': 'gray' })

// .filter(選擇器) 在目前的結果中過濾
// .not(選擇器) 在目前結果中過濾不符合的
// .addClass() 新增class，用空白分隔
// .removeClass() 移除 class，用空白分隔
// .hasClass() 判斷有沒有 class，用空白分隔
// .toggleClass() 開關 class，用空白分隔
$('#list2 li').filter('#list2li1').addClass('text-red text-center bg-gray')
$('#list2 li').filter('#list2li1').removeClass('text-red')
console.log($('#list2 li').filter('#list2li1').hasClass('text-red bg-gray'))
$('#list2 li').not('#list2li1').toggleClass('bg-gray')
