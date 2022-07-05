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

	console.log(possibleDirections);
	console.log('Go ', possibleDirections[i]);

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
let i = 0;
do {
	res = chooseNextBlock();
	i++;
} while (res != 0);

drawArray(arr);
console.log(i);
