export class Puck {
  constructor({ x, y, r }) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2;
  }

  show(context) {
    const { x, y, r, startAngle, endAngle } = this;
    context.beginPath();
    context.arc(x, y, r, startAngle, endAngle);
    context.closePath();
    context.fill();
  }
}

export class Paddle {
  constructor({ x, y, w, h, keys, speed = 3 }) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.y0 = y;
    this.dy = 0;
    this.speed = speed;
    this.keys = keys;
  }

  show(context) {
    const { x, y, w, h } = this;
    context.fillRect(x, y, w, h);
  }

  update() {
    this.y += this.dy * this.speed;
  }

  reset() {
    this.y = this.y0;
  }
}
