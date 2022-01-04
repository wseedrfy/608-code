"use strict";

// import parseTag from '../ast.js'


function runCode(that, e) {

  wx.setNavigationBarTitle({ title: 'We校园-倒数日' });

  //that.data
  function formatDay(day) {
    switch (day) {
      case 1:
        day = "一";break;
      case 2:
        day = "二";break;
      case 3:
        day = "三";break;
      case 4:
        day = "四";break;
      case 5:
        day = "五";break;
      case 6:
        day = "六";break;
      case 7:
        day = "日";break;
      case 0:
        day = "日";break;

      case "一":
        day = 1;break;
      case "二":
        day = 2;break;
      case "三":
        day = 3;break;
      case "四":
        day = 4;break;
      case "五":
        day = 5;break;
      case "六":
        day = 6;break;
      case "七":
        day = 7;break;
      case "日":
        day = 7;break;
    }

    return day;
  }

  that.data = {
    data: "hello world",
    html: "",
    jsonContent: {
      day: new Date().getDate(),
      month: new Date().getMonth(),
      dayOfWeek: "星期" + formatDay(new Date().getDay())
    }

  };

  that.term = function () {
    //学年显示
    var year = '';
    if (new Date().getMonth() > 4) {
      year = new Date().getFullYear() + '-' + (new Date().getFullYear() + 1) + '学年' + ' ' + '第' + 1 + '学期';
    } else {
      year = new Date().getFullYear() - 1 + '-' + new Date().getFullYear() + '学年' + ' ' + '第' + 2 + '学期';
    }
    that.data.term = year;
    that.reSetPage();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  that.onShow = function () {};

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  that.onReady = function () {};

  /**
   * 生命周期函数--监听页面加载
   */
  that.onload = function () {
    that.term();
  };

  that.test = function () {
    that.data.data = "sssss" + Math.ceil(Math.random() * 10);
    that.reSetPage();
    that.setData({
      data: that.data.data
    });
  };

  //每一次刷新建议重新调用
  that.reSetPage = function () {
    that.data.html = "    <view style='  margin-top: 30rpx;  padding-bottom: 1rpx;  display: flex;  flex-direction: column;  justify-content: center;  padding: 20rpx 35rpx 0 35rpx;'>    <view style='  color: rgb(0, 0, 0);  margin-left: 30rpx;  margin-bottom: 5px;  text-align: left;  font-size: 20px;  font-weight: 400;'>\u5012\u6570\u65E5</view>    <view style='  color: rgb(97, 97, 97);  text-align: left;  font-size: 30rpx;  margin-left: 30rpx;'>      <view>" + that.data.term + "</view>      <text>" + (that.data.jsonContent.month + 1) + " \u6708" + that.data.jsonContent.day + " \u65E5 " + that.data.jsonContent.dayOfWeek + " \uFF08\u6ED1\u52A8\u53EF\u5220\u9664)</text>    </view>      </view>    ";
    that.setData({
      html: that.parse(that.data.html)
    });
  };

  that.reSetPage();

  that.onload();
}

module.exports = runCode;
