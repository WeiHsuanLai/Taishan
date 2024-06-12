export default () => {
	return {
		type: 'bubble',
		hero: {
			type: 'image',
			url: 'https://cultureexpress.taipei/UploadPlugin?file=%2fw6lriPeTD4Ry1335WB01yw8AbGlLnjTM%2bFt4uXYmGNF8eqIlmQbSAeypp8oN8Zc8PZmb6S7P63XD0nEBETM0A%3d%3d',
			size: '800px',
			aspectRatio: '20:13',
			aspectMode: 'cover',
			action: {
				type: 'uri',
				uri: 'https://line.me/'
			},
			align: 'center'
		},
		body: {
			type: 'box',
			layout: 'vertical',
			contents: [
				{
					type: 'text',
					text: '古蹟探祕—勸業銀行舊廈古蹟',
					weight: 'bold',
					size: 'lg',
					wrap: true
				},
				{
					type: 'box',
					layout: 'vertical',
					margin: 'lg',
					spacing: 'sm',
					contents: [
						{
							type: 'box',
							layout: 'baseline',
							spacing: 'sm',
							contents: [
								{
									type: 'text',
									text: '地點',
									color: '#aaaaaa',
									size: 'sm',
									flex: 1
								},
								{
									type: 'text',
									text: '國立臺灣博物館',
									wrap: true,
									color: '#666666',
									size: 'sm',
									flex: 5
								}
							]
						},
						{
							type: 'box',
							layout: 'baseline',
							spacing: 'sm',
							contents: [
								{
									type: 'text',
									text: '開始',
									color: '#aaaaaa',
									size: 'sm',
									flex: 1
								},
								{
									type: 'text',
									text: '2021-11-15 09:30:00',
									wrap: true,
									color: '#666666',
									size: 'sm',
									flex: 5
								}
							]
						},
						{
							type: 'box',
							layout: 'baseline',
							spacing: 'sm',
							contents: [
								{
									type: 'text',
									text: '結束',
									color: '#aaaaaa',
									size: 'sm',
									flex: 1
								},
								{
									type: 'text',
									text: '2026-12-31 17:00:00',
									wrap: true,
									color: '#666666',
									size: 'sm',
									flex: 5
								}
							]
						},
						{
							type: 'box',
							layout: 'baseline',
							spacing: 'sm',
							contents: [
								{
									type: 'text',
									text: '票價',
									color: '#aaaaaa',
									size: 'sm',
									flex: 1
								},
								{
									type: 'text',
									text: 'NT$30元(現場販售)',
									wrap: true,
									color: '#666666',
									size: 'sm',
									flex: 5
								}
							]
						}
					]
				}
			]
		},
		footer: {
			type: 'box',
			layout: 'vertical',
			spacing: 'sm',
			contents: [
				{
					type: 'button',
					style: 'link',
					height: 'sm',
					action: {
						type: 'uri',
						label: '網站',
						uri: 'https://event.culture.tw/mocweb/reg/NTM/Detail.init.ctr?actId=12242&utm_medium=query'
					}
				},
				{
					type: 'box',
					layout: 'vertical',
					contents: [],
					margin: 'sm'
				}
			],
			flex: 0
		}
	}
}
