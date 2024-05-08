axios
	.get('https://kktix.com/events.json')
	.then((response) => {
		console.log(response)
		console.log(response.data.title)
	})
	.catch((error) => {
		console.log(error)
	})

const main = async () => {
	try {
		// const response = await axios.get('https://kktix.com/events.json')
		// console.log(response.data.title)
		const { data } = await axios.get('https://kktix.com/events.json')
		console.log(data.title)
	} catch (error) {
		console.log(error)
	}
}
main()
