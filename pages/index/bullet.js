import {getImage} from './utils';
const bullet = 'imgs/bullet.png';
class Bullet {
    constructor(context) {
        this.context = context;
        this.speed = 20;
        this.x = this.context.canvas.width-10;
        this.y = Math.floor(Math.random()*this.context.canvas.height+1);
        this.stop = null;
        this.img = null;
        this.init();
    }
    async init() {
        const {pixelRatio} = await wx.getSystemInfo();
        this.bulletHeight = 20/pixelRatio;
        this.bulletWidth = 60/pixelRatio;
    }
    async draw() {
        if(!this.img) {
            this.img = await getImage(bullet);
        }
        this.context.drawImage(this.img,this.x,this.y,this.bulletWidth,this.bulletHeight);
    }
    move() {
        this.x = this.x - this.speed;
        this.stop = setTimeout(()=>{
            this.move();
        },200);
    }
    destroy() {
        clearTimeout(this.stop);
        this.context = null;
    }
}
export default class Gun {
    constructor(context) {
        this.context = context;
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
        let bullet = new Bullet(this.context);
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
    refresh(position) {
        if(this.detection(position)) {
            this.stopFire();
            return;
        }
        let update = [];
        this.list.forEach(async (bullet)=>{
            if(bullet.x<0) {
                bullet.destroy();
            }else{
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