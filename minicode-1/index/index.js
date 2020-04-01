const w = 300
let h = 200

Page({
  data: {
    h,
  },
  onLoad: function () {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
  onReady() {
    wx.showLoading({
      title: '加载中',
    })
    wx.downloadFile({
      url: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
      success: (e) => {
        this.setData({src: e.tempFilePath})
      },
      fail(e) {
        console.log('download fail', e)
      },
      complete() {
        wx.hideLoading()
      }
    })
  },
  loadedmetadata(e) {
    h = w / e.detail.width * e.detail.height
    this.setData({
      h,
    }, () => {
      this.draw()
    })
  },
  draw() {
    const dpr = wx.getSystemInfoSync().pixelRatio
    wx.createSelectorQuery().select('#video').context(res => {
      console.log('select video', res)
      const video = this.video = res.context

      wx.createSelectorQuery().selectAll('#cvs1').node(res => {
        console.log('select canvas', res)
        const ctx1 = res[0].node.getContext('2d')
        res[0].node.width = w * dpr
        res[0].node.height = h * dpr

        setInterval(() => {
          ctx1.drawImage(video, 0, 0, w * dpr, h * dpr);
        }, 1000 / 24)
      }).exec()
    }).exec()
  },
})
