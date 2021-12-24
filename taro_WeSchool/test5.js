function runCode(that) {
    var color = [], n = 0;
    var quality = wx.getStorageSync('personalInformation').quality;




    for (var i = 0; i < quality.length; i++) {
      quality[i].title = quality[i].ktmc.replace("&ldquo;", "").split("&rdquo;")[0].replace("&mdash;", "")
      quality[i].score =  quality[i].hdxf
      quality[i].text = [quality[i].xmjbmc, '状态:'+quality[i].shztmc]
      if (quality[i].hdxf >= 0.4) {
        color.push("#11c1f3");
      } else if (quality[i].hdxf >= 0.3) {
        color.push("#886aea");
      } else if (quality[i].hdxf >= 0.2) {
        color.push("#33cd5f");
      } else {
        color.push("#ffc900");
      }
      if (quality[i].shztmc == '审核通过') {
        n = Number(quality[i].hdxf) + n;
      }
  
    }
    wx.setNavigationBarTitle({
      title: 'We校园-素拓',    //页面标题
    })
    that.setData({
      headerType: 'text',
      title: '你的素拓分哟！',
      text: ['素拓分:' + n.toFixed(1)],
      list: quality,
      color: color
    })
  }
module.exports = runCode;