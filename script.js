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
	for (let r = 0; r < size; r++) {
		const row = document.createElement('tr');
		for (let c = 0; c < size; c++) {
			const td = document.createElement('td');
			row.appendChild(td);
		}
		display.appendChild(row);
	}
}

const arr = generateArray(20, 20);

let x = 0;
let y = 0;
arr[0][0] = 0;

function chooseNextBlock() {
	//POSSIBLE DIRECTIOS ARRAY U D L R
	const possibleDirections = [];
	//CAN GO UP
	if (y > 0 && arr[x][y - 1]) possibleDirections.push('u');

	//CAN GO DOWN
	if (y < 19 && arr[x][y + 1]) possibleDirections.push('d');

	//CAN GO LEFT
	if (x > 0 && arr[x - 1][y]) possibleDirections.push('l');

	//CAN GO RIGHT
	if (x < 19 && arr[x + 1][y]) possibleDirections.push('r');

	if (possibleDirections.length == 0) return 0;

	let i = Math.round(Math.random() * (possibleDirections.length - 1));

	if (possibleDirections[i] == 'u') {
		y--;
		arr[x][y] = 0;
		return 1;
	}
	if (possibleDirections[i] == 'd') {
		y++;
		arr[x][y] = 0;
		return 2;
	}
	if (possibleDirections[i] == 'l') {
		x--;
		arr[x][y] = 0;
		return 3;
	}
	if (possibleDirections[i] == 'r') {
		x++;
		arr[x][y] = 0;
		return 4;
	}
}
let res = 0;

drawTable(20);

let cell = { x: 0, y: 0, d: [] };
let cells = [cell];
drawCell(cell);

function generateMaze() {
	let i = 0;
	let newCell = null;
	do {
		currentCell = cells[cells.length - 1];

		checkDirections(currentCell);
		if (currentCell.d.length > 0) {
			newCell = chooseNextCell(currentCell);
		} else {
			i = cells.length - 1;
			for (i; i <= 0; i--) {
				console.log('FOR');
				if (cell[l].d.length > 0) {
					newCell = chooseNextCell(cell[l]);
				}
			}
		}
		if (newCell) {
			cells.push(newCell);
			drawCell(newCell);
		}
	} while (i > 0);
}

function checkDirections(currentCell) {
	//CAN GO UP
	if (currentCell.y > 0 && arr[x][y - 1]) currentCell.d.push('u');

	//CAN GO DOWN
	if (currentCell.y < 19 && arr[x][y + 1]) currentCell.d.push('d');

	//CAN GO LEFT
	if (currentCell.x > 0 && arr[x - 1][y]) currentCell.d.push('l');

	//CAN GO RIGHT
	if (currentCell.x < 19 && arr[x + 1][y]) currentCell.d.push('r');
	return currentCell;
}

function chooseNextCell(currentCell) {
	let newCell = { x: 0, y: 0, d: null };
	let dir = 0;
	if (currentCell.d.length > 1) {
		dir = Math.round(Math.random() * (currentCell.d.length - 1));
	}
	switch (currentCell.d[dir]) {
		case 'u':
			newCell.x = currentCell.x;
			newCell.y = currentCell.y - 1;
			currentCell.d.splice(dir, 1);
			break;
		case 'd':
			newCell.x = currentCell.x;
			newCell.y = currentCell.y + 1;
			currentCell.d.splice(dir, 1);
			break;
		case 'l':
			newCell.x = currentCell.x - 1;
			newCell.y = currentCell.y;
			currentCell.d.splice(dir, 1);
			break;
		case 'r':
			newCell.x = currentCell.x + 1;
			newCell.y = currentCell.y;
			currentCell.d.splice(dir, 1);
			break;
	}
	return newCell;
}

function drawCell(cell) {
	const rows = document.querySelectorAll('tr');
	const td = rows[cell.y].querySelectorAll('td');
	td[cell.x].style.backgroundColor = 'white';
}

generateMaze(cell);

function travel(arr) {
	let i = 0;
	do {
		i++;
		arr[i] *= 2;
	} while (i > 0);
}
