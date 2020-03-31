const dingding = "../../static/imgs/dingding.png";
import { getImage } from "./utils";
export default class Bird {
  constructor(context,canvas) {
    this.a = 8.95;
    this.context = context;
    this.img = dingding;
    this.direction = 1;
    this.canvas = canvas;
    this.init();
  }
  async init() {
    this.x = this.canvas.width / 4;
    this.y = 0;
    this.speed = 10;
    this.stop = null;
    this.birdHeight = 60;
    this.birdWidth = 40;
  }
  //向上加速speed = speed + at,t=1s
  up() {
    this.direction = -1;
    if (this.speed > 0) {
      this.speed = 0;
    }
    this.changeSpeed();
  }
  down() {
    this.direction = 1;
    if (this.speed < 0) {
      this.speed = 0;
    }
    this.changeSpeed();
  }
  changeSpeed() {
    this.speed = this.speed + this.direction * this.a;
    this.speed = this.direction * Math.abs(this.speed);
  }
  move() {
    this.y = this.speed * 1 + this.y;
    if (this.detection()) {
      this.stopMove();
      return;
    }
    this.stop = setTimeout(() => {
      this.move();
    }, 100);
  }
  stopMove() {
    clearTimeout(this.stop);
    this.stop = null;
  }
  async draw() {
    this.context.drawImage(
      this.img,
      this.x,
      this.y,
      this.birdHeight,
      this.birdWidth
    );
    this.context.draw(true);
  }
  //碰撞检测
  detection() {
    return (
      this.y > this.canvas.height - this.birdHeight / 2 || this.y < 0
    );
  }
}
