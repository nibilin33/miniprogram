// pages/index/index.js
import Bird from './fly';
import Background from './background';
import Gun from './bullet';
import Music from './mp3';
import {getCanvasById} from './utils';

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		bird:null,
		bg:null,
		gun:null,
		timeout:null,
		isGameOver:true,
		canvasWidth:400,
		canvasHeight:500
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		this.init();
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},
	muteAudio: function() {
		Music[Music.status]();
    },
    changeMusic:function() {
        Music.loop();
    },
	init:function() {
		const query = wx.createSelectorQuery();
		query.select('#games')
		.fields({ node: true, size: true })
		.exec(async (res) => {
		  const canvas = res[0].node;
		  const context = canvas.getContext('2d');
		  const {windowHeight,windowWidth} = await wx.getSystemInfo();
		  this.setData({
			canvasWidth: windowWidth,
			canvasHeight: windowHeight - 20
		  });
		  this.setData({
			bird: new Bird(context),
			bg: new Background(context,canvas.width,canvas.height)
		  });
		  await this.data.bg.draw();
		  await this.data.bird.draw();
		  Music.init();
		  this.fillText('按住屏幕角色上移，松开角色下移','15px');
		  this.setData({
			gun: new Gun(context)
		  });
	  })


	},
	touchstart:function() {
		this.data.bird.up();
	},
	touchend:function() {
		this.data.bird.down();
	},
	fillText:async function(txt,fontSize='30px') {
		const canvas = await getCanvasById('#games');
		const ctx = canvas.getContext('2d');
		ctx.font = `${fontSize} Comic Sans MS`;
		ctx.fillStyle = "red";
		ctx.textAlign = "center";
		ctx.fillText(txt, canvas.width/2, canvas.height/2);
	},
	gameOver:function(){
		this.fillText('Game Over!');
		this.setData({
			isGameOver:true
		});
		Music.pause();  
	},
	clear:async function() {
		const canvas = await getCanvasById('#games');
		const context = canvas.getContext('2d');
		context.clearRect(0,0,canvas.width,canvas.height);
	},
	stop:function() {
		this.gameOver();
		clearTimeout(this.timeout);
		this.data.bird.stopMove();
		this.data.gun.stopFire();
		this.data.bg.stopMove();
	},
	refresh:async function() {
		await this.data.bg.draw();
		await this.data.bird.draw();
		this.data.gun.refresh(this.data.bird);
		if(!this.data.bird.stop||!this.data.gun.stop) {
			this.gameOver();
			this.stop();
			return;
		}
		this.data.timeout = setTimeout(()=>{
			this.refresh();
		},20);
	},
	drawImage:async function() {
		if(this.data.isGameOver) {
			const canvas = await getCanvasById('#games');
			const ctx = canvas.getContext('2d');
			ctx.clearRect(0,0,canvas.width,canvas.height);
		}
		Music.play();
		this.setData({
			isGameOver:false
		});
		this.data.bird.init();
		this.data.bg.move();
		this.data.bird.move();
		this.data.gun.fire();
		this.refresh();
	}
})