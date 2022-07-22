export const map = (value, minDomain, maxDomain, minRange, maxRange) =>
  minRange +
  ((value - minDomain) / (maxDomain - minDomain)) * (maxRange - minRange);

export class Puck {
  constructor({ x, y, r, speed = 2.5 }) {
    this.x = x;
    this.x0 = x;
    this.y = y;
    this.y0 = y;
    this.r = r;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2;
    this.dx = 0;
    this.dy = 0;
    this.initialSpeed = speed;
    this.speed = speed;
  }

  show(context) {
    const { x, y, r, startAngle, endAngle } = this;
    context.beginPath();
    context.arc(x, y, r, startAngle, endAngle);
    context.closePath();
    context.fill();
  }

  start() {
    const maxAngle = 90;
    const angles = 5;
    const angle = Math.floor(Math.random() * (angles + 1));

    const theta = ((angle * (maxAngle / angles) - 45) / 180) * Math.PI;

    const dx = Math.cos(theta) * this.speed;
    const dy = Math.sin(theta) * this.speed;

    this.dx = Math.random() > 0.5 ? dx : dx * -1;
    this.dy = dy;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
  }

  reset() {
    this.x = this.x0;
    this.y = this.y0;
    this.dx = 0;
    this.dy = 0;
    this.speed = this.initialSpeed;
  }

  collides(paddle) {
    const { x, y, r } = this;
    if (
      x + r < paddle.x ||
      x - r > paddle.x + paddle.w ||
      y + r < paddle.y ||
      y - r > paddle.y + paddle.h
    ) {
      return false;
    }
    return true;
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
