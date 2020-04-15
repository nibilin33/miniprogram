const bullet = '../../static/imgs/bullet.png';
class Bullet {
    constructor(context,canvas) {
        this.context = context;
        this.speed = 20;
        this.canvas = canvas;
        this.x = this.canvas.width-10;
        this.y = Math.floor(Math.random()*this.canvas.height+1);
        this.stop = null;
        this.img = bullet;
        this.bulletHeight = 20;
        this.bulletWidth = 60;
    }
    async draw() {
        this.context.drawImage(this.img,this.x,this.y,this.bulletWidth,this.bulletHeight);
        this.context.draw(true);
    }
    move() {
        this.x = this.x - this.speed;
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