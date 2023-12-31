const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.5;

class Player{
	constructor(position){
		this.position = position;
		this.velocity = {
			x: 0,
			y: 1,
		}
		this.height = 100;
	}

	draw(){
		c.fillStyle = 'red';
		c.fillRect(this.position.x, this.position.y, 100, this.height);	
	}

	update(){
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		if (this.position.y + this.height + this.velocity.y < canvas.height) {
			this.velocity.y += gravity;
		}else this.velocity.y = 0;
		this.draw();
	}

}

const player = new Player({
	x: 200,
	y: 100,
});

const keys = {
	d:{
		pressed: false,
	},
	a:{
		pressed: false,
	}
}

function animate(){
	window.requestAnimationFrame(animate);
	c.fillStyle = 'white';
	c.fillRect(0, 0, canvas.width, canvas.height);
	player.update();

	player.velocity.x = 0;
	if(keys.d.pressed) player.velocity.x = 5;
	else if(keys.a.pressed) player.velocity.x = -5;	
}

animate();

window.addEventListener('keydown', (event) => {
	switch (event.key) {
		case 'w':
		player.velocity.y = -15;
		break;

		case 'a':
		keys.a.pressed = true;
		break;

		case 'd':
		keys.d.pressed = true;
		break;
	}
})

window.addEventListener('keyup', (event) => {
	switch (event.key) {
		case 'a':
		keys.a.pressed = false;
		break;

		case 'd':
		keys.d.pressed = false;
		break;
	}
})