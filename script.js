const display = document.getElementById('maze');

function generateArray(h = 4, l = 4) {
	let cell = new Array(h);
	for (let y = 0; y < h; y++) {
		cell[y] = new Array(l);
		for (let x = 0; x < l; x++) {
			cell[y][x] = 1;
		}
	}
	return cell;
}

function drawArray(arr) {
	for (let r = 0; r < arr.length; r++) {
		const row = document.createElement('tr');
		for (let c = 0; c < arr[r].length; c++) {
			const td = document.createElement('td');
			if (arr[c][r]) td.classList.add('full');
			row.appendChild(td);
		}
		display.appendChild(row);
	}
}

const arr = generateArray(20, 20);

drawArray(arr);
