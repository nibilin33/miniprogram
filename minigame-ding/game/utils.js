export const getImage = source => {
    let img = new Image();
    img.src = source;
    return new Promise((resolve,reject)=>{
        img.onload = ()=>{
            resolve(img);
        }
        img.onerror = () => {
            reject();
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
