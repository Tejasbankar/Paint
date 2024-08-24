const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - canvas.offsetTop;

const mouse = {
	x: undefined,
	y: undefined,
	prevX: undefined,
	prevY: undefined,
}

let shouldDraw = false;
let size = 1;
let color = '';

const colors = ["#000000", "#808080", "#800000", "#808000", "#008000", "#008080", "#000080", "#800080", "#808040", "#004040", "#0080FF", "#004080", "#4000FF", "#804000", "#FFFFFF", "#C0C0C0", "#FF0000", "#FFFF00", "#00FF00", "#00FFFF"];


const selectedColorElement = document.getElementById('selection');
const elements = Array.from(document.getElementById('color-list').children);
const sizeSlider = document.getElementById('size-selector');

changeColor(0);
elements.forEach((element, index) => {
	element.style.backgroundColor = colors[index];
});

sizeSlider.oninput = function() {
	size = this.value;
}

function changeColor(i) {
	color = colors[i];
	selectedColorElement.style.backgroundColor = color;
}

canvas.addEventListener('mousedown', event => {
	mouse.x = event.offsetX;
	mouse.y = event.offsetY;
	shouldDraw = true;
	ctx.beginPath();
	ctx.fillStyle = color; 
	ctx.fillRect(mouse.x, mouse.y, size, size);
	ctx.closePath();
});

canvas.addEventListener('mouseup', event => {
	mouse.prevX = undefined;
	mouse.prevY = undefined;
	mouse.x = undefined;
	mouse.y = undefined;
	shouldDraw = false;
});

canvas.addEventListener('mousemove', event => {
	mouse.prevX = mouse.x;
	mouse.prevY = mouse.y;
	mouse.x = event.offsetX;
	mouse.y = event.offsetY;
	drawLine();
});

canvas.addEventListener('mouseout', event => {
	mouse.prevX = undefined;
	mouse.prevY = undefined;
	mouse.x = undefined;
	mouse.x = undefined;
	shouldDraw = false;
});

function drawLine() {
	if(shouldDraw) {
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.lineWidth = size;
		ctx.moveTo(mouse.prevX, mouse.prevY);
		ctx.lineTo(mouse.x, mouse.y);
		ctx.stroke();
		ctx.closePath();
	}
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}
