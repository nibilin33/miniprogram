export const getImage = source => {
  return new Promise(async (resolve, reject) => {
    //创建图片对象
    //const canvas = await getCanvasById('#games');
    const context = wx.createCanvasContext('games');
    const canvas = context.canvas;
    let img = canvas.createImage();
    var log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null;
    log.info({str:source});
    img.src = source;
    img.onload = () =>{
        console.log(img);
        log.info({str:source});
        resolve(img);
    }
  });
};
export const getCanvasById = id => {
  return new Promise((resolve, reject) => {
    const query = wx.createSelectorQuery();
    query
      .select(id)
      .fields({ node: true, size: true })
      .exec(res => {
        resolve(res[0].node);
      });
  });
};
