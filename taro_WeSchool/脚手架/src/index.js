// import parseTag from '../ast.js'



function runCode(that, e) {

  wx.setNavigationBarTitle({ title: 'We校园-校内导航' });

  //that.data
  that.data = {
    data: "hello world",
    html: ""
  }

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



  that.test = function() {
    that.data.data = "sssss" + Math.ceil(Math.random()*10)
    that.reSetPage()
    that.setData({
      data: that.data.data
    });
  }

  //每一次刷新建议重新调用
  that.reSetPage = function () {
    that.data.html = 
    `
      <view class="gggg   hhh">
        ${that.data.data}
        <button bindtap="test">   </button>
      </view>
    `
    that.setData({
      html: that.parse(that.data.html)
    });
  };

  that.reSetPage()

  that.onLoad()

}

module.exports = runCode;
