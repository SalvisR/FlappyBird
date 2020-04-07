class Flappy {
  constructor(c, height, width) {
    this.c = c;
    this.height = height;
    this.width = width;
    this.birdX = Number(150);
    this.gravity = 2;
    this.pipes = [{
      pipePos: {
        x: Number(this.width),
        y: Number(0)
      },
      pipeSize: {
        w: 50,
        h: 300
      }
    }];
  }

  drawBird(bird) {
    this.c.drawImage(bird, 50, this.birdX, 35, 24);
  }

  flyBird() {
    this.birdX -= 35;
  }

  drawPipes(pipeNorth, pipeSouth) {
    this.pipes.forEach(pipe => {
      const y = pipe.pipeSize.h + 70;
      const height = this.height - pipe.pipeSize.h - 70

      this.c.drawImage(pipeNorth, pipe.pipePos.x, pipe.pipePos.y, pipe.pipeSize.w, pipe.pipeSize.h);
      this.c.drawImage(pipeSouth, pipe.pipePos.x, y, pipe.pipeSize.w, height);
    });
  }

  createPipes() {
    const height = Math.floor(Math.random() * 240) + 50;
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

  update() {
    this.c.clearRect(0, 0, innerWidth, innerHeight);
    this.birdX += this.gravity;
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
