const canvas = document.getElementById('canvas');
canvas.width = 500;
canvas.height = 300;

const fgHeight = 50;

const c = canvas.getContext('2d');

const bg = new Image();
const fg = new Image();
const bird = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

bg.src = '../images/bg2.png';
fg.src = '../images/fg2.png';
bird.src = '../images/bird.png';
pipeNorth.src = '../images/pipeNorth.png';
pipeSouth.src = '../images/pipeSouth.png';
const h = canvas.height;
const w = canvas.width;

const flappy = new Flappy(c, h, w, fgHeight);
flappy.createPipes();

function draw() {
  c.drawImage(bg, 0, 0, canvas.width, canvas.height);

  flappy.drawPipes(pipeNorth, pipeSouth);
  c.drawImage(fg, 0, canvas.height - fgHeight, canvas.width, fgHeight);
  flappy.drawBird(bird);
  c.fillText(`Score: ${flappy.score}`, 5, 15);
}

window.onload = function () {
  c.drawImage(bg, 0, 0, canvas.width, canvas.height);
  c.drawImage(fg, 0, canvas.height - 50, canvas.width, 50);

  draw();

  function animate() {
    flappy.update();
    draw();
    const request = requestAnimationFrame(animate);

    if (flappy.gameOver) {
      cancelAnimationFrame(request);
    }
  }
  animate();
}

window.addEventListener('keydown', function (e) {
  if (e.keyCode === 32) {
    flappy.flyBird();
  }
});
