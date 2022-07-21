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
  constructor({ x, y, w, h }) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  show(context) {
    const { x, y, w, h } = this;
    context.fillRect(x, y, w, h);
  }
}
