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
			if (arr[c][r]) td.style.backgroundColor = 'black';
			row.appendChild(td);
		}
		display.appendChild(row);
	}
}

function drawTable(size) {
	const table = new Array(size);
	for (let i = 0; i < size; i++) table[i] = new Array(size);
	for (let r = 0; r < size; r++) {
		const row = document.createElement('tr');
		for (let c = 0; c < size; c++) {
			const td = document.createElement('td');
			row.appendChild(td);
			table[c][r] = 0;
		}
		display.appendChild(row);
	}
	return table;
}

const table = drawTable(20);

let cell0 = { x: 0, y: 0, v: '', d: [] };
let cells = [cell0];
drawCell(cell0);

function checkDirections(currentCell) {
	let x = currentCell.x;
	let y = currentCell.y;
	let directions = [];
	//CAN GO UP
	if (y > 0 && !table[x][y - 1]) directions.push('u');

	//CAN GO DOWN
	if (y < 19 && !table[x][y + 1]) directions.push('d');

	//CAN GO LEFT
	if (x > 0 && !table[x - 1][y]) directions.push('l');

	//CAN GO RIGHT
	if (x < 19 && !table[x + 1][y + 1]) directions.push('r');
	currentCell.d = directions;
	return directions;
}

function chooseNextCell(currentCell) {
	let newCell = { x: 0, y: 0, v: '', d: [] };
	let dir = 0;
	if (currentCell.d.length > 1) {
		dir = Math.round(Math.random() * (currentCell.d.length - 1));
	}
	switch (currentCell.d[dir]) {
		case 'u':
			newCell.x = currentCell.x;
			newCell.y = currentCell.y - 1;
			currentCell.d.splice(dir, 1);
			currentCell.v = 'u';
			break;
		case 'd':
			newCell.x = currentCell.x;
			newCell.y = currentCell.y + 1;
			currentCell.d.splice(dir, 1);
			currentCell.v = 'd';
			break;
		case 'l':
			newCell.x = currentCell.x - 1;
			newCell.y = currentCell.y;
			currentCell.d.splice(dir, 1);
			currentCell.v = 'l';
			break;
		case 'r':
			newCell.x = currentCell.x + 1;
			newCell.y = currentCell.y;
			currentCell.d.splice(dir, 1);
			currentCell.v = 'r';
			break;
	}
	return newCell;
}

function drawCell(cell) {
	const rows = document.querySelectorAll('tr');
	const td = rows[cell.y].querySelectorAll('td');
	table[cell.x][cell.y] = 1;
	td[cell.x].style.backgroundColor = 'white';
	td[cell.x].innerText = ;
}

function generateMaze() {
	let cell = null;
	let i = 0;
	let l = 0;
	let down = true;
	do {
		l++;
		console.log('LOOP ', l);

		if (down) checkDirections(cells[i]);

		if (cells[i].d.length > 0) {
			console.log('FOWARD');
			cell = chooseNextCell(cells[i]);
			cells.push(cell);
			down = true;
			i++;
		} else {
			console.log('BACKTARCK');
			down = false;
			i--;
		}
		drawCell(cell);
	} while (i > 0);
}

generateMaze();
