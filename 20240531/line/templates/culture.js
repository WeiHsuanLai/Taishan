export default () => {
	return {
		type: 'bubble',
		body: {
			type: 'box',
			layout: 'vertical',
			contents: [
				{
					type: 'text',
					text: '古蹟探祕—勸業銀行舊廈古蹟修復常設展',
					weight: 'bold',
					size: 'xl'
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
		}
	}
}
