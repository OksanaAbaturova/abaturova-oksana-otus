(function tree() {
	let books = {
		name: 'сказки', 
		items: [
			{
				name: 'сказки Пушкина',
				items: [
					{ name: 'сказка о Золотом петушке' },
					{ name: 'сказка о рыбаке и рыбке' },
					{ name: 'сказка о попе и его работнике Балде' }
				]
			},
			{
				name: 'сказки Братьев Гримм',
				items: [
					{ name: 'Золушка' },
					{ name: 'Золотой гусь' },
					{ name: 'Мальчик-с-пальчик' }
				]
			}]
	};
	let hierarchicalResult = '';
	var booksArray = Object.entries(books);
	if (booksArray.length > 0) {
		booksArray.forEach((oneData) => {
			if (oneData[0] == 'name') {
				let name = oneData[1] ? String(oneData[1]).trim().toLocaleLowerCase() : '';
				hierarchicalResult += name ? `${name.charAt(0).toUpperCase()}${name.slice(1)}` : 'Жанр не определен';
			}
			else if (oneData[0] == 'items') {
				if (Array.isArray(oneData[1]) && oneData[1].length > 0) {
					oneData[1].forEach((item) => {
						hierarchicalResult += '\r\n|---';
						if (item.hasOwnProperty('name') && item['name']) {
							let itemName = item['name'];
							hierarchicalResult += itemName ? `${itemName.charAt(0).toUpperCase()}${itemName.slice(1)}` : 'Автор не определен';
						}
						if (item.hasOwnProperty('items') && Array.isArray(item['items']) && item['items'].length > 0) {
							item['items'].forEach((oneBook) => {
								hierarchicalResult += `\r\n   |___`;
								hierarchicalResult += oneBook.name ? `${oneBook.name.charAt(0).toUpperCase()}${oneBook.name.slice(1)}` : '';
							});
						}
					});
				}
			}
		});
	}
	console.log(hierarchicalResult);
})()