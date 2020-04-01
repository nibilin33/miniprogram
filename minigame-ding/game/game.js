// pages/index/index.js
import Bird from "./fly";
import Background from "./background";
import Gun from "./bullet";
import Music from "./mp3";

let context = canvas.getContext("2d");

export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0;
    this.isGameOver = false;
    this.timeout = null;
    this.init();
  }
  async init() {
    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )
    this.bird = new Bird(context,canvas);
    this.bg = new Background(context, canvas.width, canvas.height);
    await this.bg.draw();
    await this.bird.draw();
    Music.init();
    this.fillText("点击屏幕开始", "20px");
    context.fillText("按住屏幕角色上移，松开角色下移", canvas.width / 2, canvas.height / 2 + 30);
    this.gun = new Gun(context,canvas);
    this.addEvent();
    this.drawImage();
  }
  touchEventHandler() {
    console.log('touchEventHandler');
  }
  addEvent() {
      this.touchHandler = this.touchEventHandler.bind(this);
      console.log('adddd');
      canvas.addEventListener('touchstart', this.touchHandler)
      // document.body.addEventListener('click',()=>{
      //   console.log('fuckkk');
      // })
      // canvas.addEventListener('touchstart', ()=>{
      //   console.log('fuckktouchessss');
      // });
      // canvas.addEventListener('touchend', ((e) => {
      //     e.preventDefault();
      //     this.bird.down();
      // }).bind(this));
      // canvas.addEventListener('touchstart', ((e) => {
      //   console.log('touchstart');
      //   e.preventDefault();
      //   if(!this.isGameOver) {
      //     this.drawImage();
      //   }else{
      //     this.bird.up();
      //   }
      // }).bind(this))
    // canvas.addEventListener(downEvent, () => {
    //   console.log('touchhh');
    //   if(!this.isGameOver) {
    //     this.drawImage();
    //   }else{
    //     this.bird.up();
    //   }
    // });
    // canvas.addEventListener(upEvent, () => {
    //   this.bird.down();
    // });
  }
  fillText(txt, fontSize = "30px") {
    const ctx = context;
    ctx.font = `${fontSize} Comic Sans MS`;
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(txt, canvas.width / 2, canvas.height / 2);
  }
  gameOver() {
    this.fillText("Game Over!");
    this.isGameOver = true;
    Music.pause();
  }
  clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
  stop() {
    this.gameOver();
    clearTimeout(this.timeout);
    this.bird.stopMove();
    this.gun.stopFire();
    this.bg.stopMove();
  }
  async refresh() {
    this.clear();
    await this.bg.draw();
    await this.bird.draw();
    this.gun.refresh(this.bird, this.bg.xtotal);
    if (!this.bird.stop || !this.gun.stop) {
      this.gameOver();
      this.stop();
      return;
    }
    this.timeout = setTimeout(() => {
      this.refresh();
    }, 1000 / 60);
  }
  drawImage() {
    if (this.isGameOver) {
      const ctx = context;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    Music.play();
    this.isGameOver = false;
    this.bird.init();
    this.bg.move();
    this.bird.move();
    this.gun.fire();
    this.refresh();
  }
}
