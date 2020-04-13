class Flappy {
  constructor(c, height, width, fgHeight) {
    this.c = c;
    this.height = height;
    this.width = width;
    this.birdX = Number(50);
    this.birdY = Number(150);
    this.birdW = Number(35);
    this.birdH = Number(24);
    this.gravity = 2;
    this.pipes = [
      //   {
      //   pipePos: {
      //     x: Number(this.width),
      //     y: Number(0)
      //   },
      //   pipeSize: {
      //     w: Number(50),
      //     h: Number(160)
      //   }
      // }
    ];
    this.gap = 70;
    this.gameOver = false;
    this.score = 0;
    this.fgHeight = fgHeight;
  }

  drawBird(bird) {
    this.c.drawImage(bird, this.birdX, this.birdY, this.birdW, this.birdH);
  }

  flyBird() {
    this.birdY -= 25;
  }

  drawPipes(pipeNorth, pipeSouth) {
    this.pipes.forEach(pipe => {
      const y = pipe.pipeSize.h + this.gap;
      const height = this.height - pipe.pipeSize.h;

      this.c.drawImage(pipeNorth, pipe.pipePos.x, pipe.pipePos.y, pipe.pipeSize.w, pipe.pipeSize.h);
      this.c.drawImage(pipeSouth, pipe.pipePos.x, y, pipe.pipeSize.w, height);
    });
  }

  createPipes() {
    const height = Math.floor(Math.random() * (160 - 20) + 20);;

    const pipe = {
      pipePos: {
        x: Number(this.width),
        y: Number(0)
      },
      pipeSize: {
        w: 50,
        h: height
      }
    }
    this.pipes.unshift(pipe);
  }

  checkGameOver() {
    this.pipes.forEach(pipe => {
      if (this.birdY + this.birdH > this.height - this.fgHeight) {
        this.gameOver = true;
      }

      if (pipe.pipePos.x <= this.birdX + this.birdW &&
        pipe.pipePos.x + pipe.pipeSize.w >= this.birdX &&
        (pipe.pipeSize.h > this.birdY ||
          pipe.pipeSize.h + this.gap < this.birdY + this.birdH)) {
        this.gameOver = true;
      }
    });
  }

  addScore() {
    this.pipes.forEach(pipe => {
      if (this.birdX + this.birdW === pipe.pipePos.x + pipe.pipeSize.w) {
        this.score++;
      }
    });
  }

  update() {
    this.c.clearRect(0, 0, innerWidth, innerHeight);
    this.birdY += this.gravity;
    this.checkGameOver();
    this.addScore();
    this.pipes.forEach(pipe => {
      if (pipe.pipePos.x === this.width - 220) {
        this.createPipes();
      }
      if (pipe.pipePos.x < -50) {
        this.pipes.pop();
      }
      pipe.pipePos.x--;
    });
  }
}
