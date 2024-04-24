// find(選擇器) 往下層找符合的東西，可以找好幾層
$('#list').find('li').eq(1).css('color', 'red')
// document.querySelectorAll('#list')[0].querySelectorAll('li')[1].style.color = 'red'
// .children(選擇器)
// 往下一層找符合的東西，沒寫選擇器就是全部
$('#list2').children('li').text('123')
$('#list2').children('p').css('color', 'red')
$('#list2').children().css('background', 'gray')

// .prev(a) 同一層的前一個，可以用選擇器過濾
// .prevAll() 同一層的前面所有，可以用選擇器過濾
// .prevUntil(選擇器) 同一層的前面到選擇器間所有，不含頭尾
// .next() 同一層後面一個，可以用選擇器過濾
// .nextALL() 同一層的後面所有，可以用選擇器過濾
// .nextUntil(選擇器) 同一層的後面到選擇器間所有，不含頭尾
// .siblings() 同一層所有其他，可以用選擇器過濾
const list3D = $('#list3D')
list3D.prev().css('color', 'red')
list3D.next().css('color', 'red')
list3D.prevAll().css('background', 'gray')
list3D.nextAll().css('background', 'red')
list3D.prevUntil('#list3B').css('text-align', 'center')
list3D.nextUntil('#list3F').css('text-align', 'center')
list3D.siblings().css('font-style', 'italic')

// .parent() 上一層，可以用選擇器過濾
// .parents() 上一層直到 <html>，可以用選擇器過濾
// .parentsUntil(選擇器) 上一層到選擇器間所有，不含頭尾
// .closest(選擇器) 上層找符合選擇器的第一個
const list4B = $('#list4B')
list4B.parents().css('background', 'skyblue')
list4B.parents('div').css('background', 'pink')
list4B.parent().css('background', 'gray')
list4B.parentsUntil('body').css('font-weight', 'bold')
list4B.closest('div').css('border', '1px solid black')
