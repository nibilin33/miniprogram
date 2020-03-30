export const getImage = source => {
  return new Promise(async (resolve, reject) => {
    //创建图片对象
    const canvas = await getCanvasById('#games');
    let img = canvas.createImage();
    img.src = source;
    img.onload = () =>{
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
