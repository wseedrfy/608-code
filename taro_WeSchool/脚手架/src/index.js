// import parseTag from '../ast.js'



function runCode(that, e) {

  wx.setNavigationBarTitle({ title: 'We校园-校内导航' });

  //that.data
  that.data = {}

  /**
   * 生命周期函数--监听页面加载
   */
  that.onShow = function () {

  };

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  that.onReady = function () {

  };

  /**
   * 生命周期函数--监听页面加载
   */
  that.onLoad = function () {

  };


  const html = 
  `
    <view class="gggg   hhh">
      hello world
    </view>
  `

  //每一次刷新建议重新调用
  that.reSetPage = function () {
    that.setData({
      html: that.parse(html)
    });
  };

  that.reSetPage()

  that.onLoad()

}

module.exports = runCode;
