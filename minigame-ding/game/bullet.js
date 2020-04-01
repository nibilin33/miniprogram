const bullet = 'static/imgs/bullet.png';
import {getImage} from './utils';
class Bullet {
    constructor(context,canvas) {
        this.context = context;
        this.speed = 20;
        this.canvas = canvas;
        this.x = this.canvas.width-10;
        this.y = Math.floor(Math.random()*this.canvas.height+1);
        this.stop = null;
        this.img = null;
        this.bulletHeight = 20;
        this.bulletWidth = 60;
        this.acspeed = 1;
    }
    async draw() {
        if(!this.img) {
            this.img = await getImage(bullet);
        }
        this.context.drawImage(this.img,this.x,this.y);
    }
    move() {
        this.x = this.x - this.speed*this.acspeed;
        this.stop = setTimeout(()=>{
            this.move();
        },100);
    }
    destroy() {
        clearTimeout(this.stop);
        this.context = null;
    }
}
export default class Gun {
    constructor(context,canvas) {
        this.context = context;
        this.canvas = canvas;
        this.rate = 1;
        this.init();
    }
    init() {
        this.list && this.list.forEach((bullet)=>{
            bullet.destroy();
        });
        this.list = [];
        this.stop = null;
    }
    fire(){
        let bullet = new Bullet(this.context, this.canvas);
        this.list.push(bullet);
        bullet.move();
        this.stop = setTimeout(()=>{
            this.fire();
        },800);
    }
    stopFire() {
        clearTimeout(this.stop);
        this.init();
    }
    refresh(position,rate) {
        this.rate = rate;
        if(this.detection(position)) {
            this.stopFire();
            return;
        }
        let update = [];
        this.list.forEach(async (bullet)=>{
            if(bullet.x<0) {
                bullet.destroy();
            }else{
                bullet.acspeed = Math.round(rate/400)+1;
                await bullet.draw();
                update.push(bullet);
            }
        });
        this.list = update;
    }
    detection(position) {
        for(let i = 0; i< this.list.length;i++) {
            let bullet = this.list[i];
            if(position.y> bullet.y+bullet.bulletHeight) {
                continue;
            }
            if(bullet.y>position.y+position.birdHeight) {
                continue;
            }
            if(position.x>bullet.x+bullet.bulletWidth) {
                continue;
            }
            if(position.x+position.birdWidth<bullet.x) {
                continue;
            }
            return true;
        }
        return false;
    }
}