// pages/index/index.js
import Bird from "./fly";
import Background from "./background";
import Gun from "./bullet";
import Music from "./mp3";
import { getCanvasById } from "./utils";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bird: null,
    bg: null,
    gun: null,
    timeout: null,
    isGameOver: true,
    canvasWidth: 400,
    canvasHeight: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.init();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
  muteAudio: function() {
    Music[Music.status]();
  },
  changeMusic: function() {
    Music.loop();
  },
  async init() {
    const context = wx.createCanvasContext('games');
    const { windowHeight, windowWidth } = await wx.getSystemInfo();
    this.setData({
      canvasWidth: windowWidth,
      canvasHeight: windowHeight - 50
    });
    const canvas = { width: this.data.canvasWidth, height: this.data.canvasHeight };
    this.setData({
      bird: new Bird(context, canvas),
      bg: new Background(context, this.data.canvasWidth, this.data.canvasHeight)
    });
    await this.data.bg.draw();
    await this.data.bird.draw();
    Music.init();
    this.fillText("按住屏幕角色上移，松开角色下移", "15px");
    this.setData({
      gun: new Gun(context, canvas)
    });
  },
  touchstart: function() {
    this.data.bird.up();
  },
  touchend: function() {
    this.data.bird.down();
  },
  fillText: async function(txt, fontSize = "30px") {
    const ctx =  wx.createCanvasContext('games');
    ctx.font = `${fontSize} Comic Sans MS`;
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(txt, this.data.canvasWidth / 2, this.data.canvasHeight / 2);
    ctx.draw(true);
  },
  gameOver: function() {
    this.fillText("Game Over!");
    this.setData({
      isGameOver: true
    });
    Music.pause();
  },
  clear: async function() {
    const context = wx.createCanvasContext('games');
    context.clearRect(0, 0, this.data.canvasWidth, this.data.canvasHeight);
  },
  stop: function() {
    this.gameOver();
    clearTimeout(this.timeout);
    this.data.bird.stopMove();
    this.data.gun.stopFire();
    this.data.bg.stopMove();
  },
  refresh: async function() {
    await this.data.bg.draw();
    await this.data.bird.draw();
    this.data.gun.refresh(this.data.bird);
    if (!this.data.bird.stop || !this.data.gun.stop) {
      this.gameOver();
      this.stop();
      return;
    }
    this.data.timeout = setTimeout(() => {
      this.refresh();
    }, 20);
  },
  drawImage: async function() {
    if (this.data.isGameOver) {
      const ctx = wx.createCanvasContext('games');
      ctx.clearRect(0, 0, this.data.canvasWidth, this.data.canvasHeight);
    }
    Music.play();
    this.setData({
      isGameOver: false
    });
    this.data.bird.init();
    this.data.bg.move();
    this.data.bird.move();
    this.data.gun.fire();
    this.refresh();
  }
});
