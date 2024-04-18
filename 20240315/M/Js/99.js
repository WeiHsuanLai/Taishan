for (let i = 1; i <= 9; i++) {
            document.write(`<tr>`)
            for (j = 1; j <= 9; j++) {
                // document.write(`${i}x${j}=${i * j}<br>`)
                document.write(`<td>${i}x${j}=${i * j}</td>`)
            }
            document.write(`</tr>`)
        }
        document.write('</table>')
