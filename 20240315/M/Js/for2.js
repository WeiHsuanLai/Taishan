const starContainer = document.getElementById('starContainer')
const totalStars = 80
const startColor = [255, 0, 0] // rgb(255,0,0)
const endColor = [0, 0, 255] // rgb(0,0,255)

for (let i = 0; i < totalStars; i++) {
	const starColor = startColor.map((start, index) => {
		const end = endColor[index]
		const step = (end - start) / totalStars
		return start + step * i
	})

	const starElement = document.createElement('span')
	starElement.textContent = '★'
	starElement.style.color = `rgb(${starColor[0]}, ${starColor[1]}, ${starColor[2]})`
	starContainer.appendChild(starElement)
}
