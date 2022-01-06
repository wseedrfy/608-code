"use strict";

// import parseTag from '../ast.js'


function runCode(that, e) {

  wx.setNavigationBarTitle({ title: 'We校园-校内导航' });

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

  that.touchstart = function (e) {
    //开始触摸时 重置所有删除
    that.data.list.forEach(function (v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    });
    that.data.startX = e.changedTouches[0].clientX;
    that.data.startY = e.changedTouches[0].clientY;
    that.data.list = that.data.list;
    that.reSetPage();
  };

  that.angle = function (start, end) {
    var _X = end.X - start.X,
        _Y = end.Y - start.Y;
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  };

  that.touchmove = function (e) {
    index = e.currentTarget.id, //当前索引
    startX = that.data.startX, //开始X坐标
    startY = that.data.startY, //开始Y坐标
    touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
    touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
    //获取滑动角度
    angle = that.angle({
      X: startX,
      Y: startY
    }, {
      X: touchMoveX,
      Y: touchMoveY
    });
    that.data.list.forEach(function (v, i) {
      v.isTouchMove = false;
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false;else //左滑
          v.isTouchMove = true;
      }
    });
    //更新数据
    that.data.list = that.data.list;
    that.reSetPage();
  };

  that.data = {
    html: "",
    jsonContent: {
      day: new Date().getDate(),
      month: new Date().getMonth(),
      dayOfWeek: "星期" + formatDay(new Date().getDay())
    },
    startX: 0, //开始坐标
    startY: 0,
    showModel: false,
    dates: "",
    list: []
  };

  that.num_data = function (start_date1, end_date1) {
    //计算倒数日
    var start_date = new Date(start_date1.replace(/-/g, "/"));
    var end_date = new Date(end_date1.replace(/-/g, "/"));
    var days = end_date.getTime() - start_date.getTime();
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    return day * -1;
  }, that.terms = function () {
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

  that.compare = function (property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
    };
  }, that.del = function (e) {
    //删除倒数日  
    wx.showLoading({
      title: '处理中',
      mask: true
    });
    that.data.list.splice(e.currentTarget.dataset.index, 1);
    app.globalData._adday = that.data.list;
    wx.cloud.callFunction({
      name: 'readday',
      data: {
        _adday: JSON.stringify(that.data.list),
        username: wx.getStorageSync('args').username,
        type: 'write'
      },
      success: function success(res) {
        wx.showToast({
          title: '删除成功',
          icon: 'none'
        });
        that.onShow();
      },
      fail: function fail(err) {
        wx.showToast({
          title: '删除失败',
          icon: 'none'
        });
      }
    });
  }, that.addSubmit = function (e) {
    //判断是否修改状态

    wx.showLoading({
      title: '处理中',
      mask: true
    });

    if (that.data.dayName == null || that.data.dayName == "" || that.data.dayName == undefined) {
      //判断填写是否为空
      wx.showToast({
        title: '名称不能为空',
        icon: 'none',
        duration: 1000
      });
    } else if (that.data.dates == null || that.data.dates == "" || that.data.dates == undefined) {
      wx.showToast({
        title: '日期不能为空',
        icon: 'none',
        duration: 1000
      });
    } else {
      var add = {
        'holidayName': that.data.dayName,
        'holidayDate': that.data.dates
      };
      if (that.data.changeDay !== "") {
        app.globalData._adday[that.data.changeDay].holidayName = that.data.dayName;
        app.globalData._adday[that.data.changeDay].holidayDate = that.data.dates;
      } else {

        app.globalData._adday.push(add);
      }

      wx.cloud.callFunction({ //访问云函数
        name: 'readday',
        data: {
          _adday: JSON.stringify(app.globalData._adday),
          username: wx.getStorageSync('args').username,
          type: 'write'
        },
        success: function success(res) {
          wx.showToast({
            title: '添加成功',
            icon: 'none'
          });
          that.onShow();
        },
        fail: function fail(err) {
          wx.showToast({
            title: '添加失败',
            icon: 'none'
          });
        },
        complete: function complete() {
          that.data.changeDay = "";
          that.data.dayName = "";
          that.data.dates = "";
          that.data.showModel = !that.data.showModel;
          that.reSetPage();
        }
      });
    }
  };

  that.edit = function (e) {
    //保存到changeDay来调用状态
    that.data.changeDay = e.currentTarget.dataset.index;
    that.data.dayName = app.globalData._adday[that.data.changeDay].holidayName;
    that.data.dates = app.globalData._adday[that.data.changeDay].holidayDate;
    that.reSetPage();
    that.feedbackHandler();
  };

  /**
   * 生命周期函数--监听页面加载
   */
  that.onload = function () {
    app.loginState();
    that.terms();
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wx.cloud.callFunction({
      name: 'readday',
      data: {
        username: wx.getStorageSync('args').username,
        type: 'read'
      },
      success: function success(res) {
        app.globalData._adday = JSON.parse(res.result);
        that.setDataCalendar();
        wx.hideLoading({
          success: function success(res) {}
        });
      },
      fail: function fail(err) {
        console.log(err);
      }
    });
  };

  that.setDataCalendar = function () {
    //页面渲染全部倒数日
    var addday = app.globalData._adday;
    var xlist = [];
    var xlist1 = [];
    var nowdate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
    for (var i = 0; i < addday.length; i++) {
      var gapDays2 = that.num_data(addday[i].holidayDate, nowdate);
      if (gapDays2 > 0) {
        xlist.push({
          holidayName: addday[i].holidayName,
          holidayDate: addday[i].holidayDate,
          gapDays: gapDays2,
          holidayRestInfo: addday[i].holidayDate,
          isTouchMove: false
        });
      } else {
        xlist1.push({
          holidayName: addday[i].holidayName,
          holidayDate: addday[i].holidayDate,
          gapDays: gapDays2,
          holidayRestInfo: addday[i].holidayDate,
          isTouchMove: false
        });
      }
    }

    var list = xlist.sort(that.compare("gapDays")).concat(xlist1.sort(that.compare("gapDays")).reverse());
    app.globalData._adday = list;
    that.data.show = "";
    that.data.list = list;
    that.reSetPage();
  }, that.bindDateChange = function (e) {
    //获取倒数日日期
    that.data.dates = e.detail.value;
    that.reSetPage();
  }, that.bindInputChange = function (e) {
    //获取倒数日日期
    that.data.dayName = e.detail.value;
    that.reSetPage();
  },

  // that.data.list = [{
  //   isTouchMove: false,
  //   gapDays: 2,
  //   holidayName: "2323"
  // },
  // {
  //   isTouchMove: false,
  //   gapDays: 2,
  //   holidayName: "ddd"
  // }
  // ]

  that.feedbackHandler = function () {
    //跳转到子页
    var showModel = that.data.showModel;

    that.data.changeDay = "";
    that.data.dayName = "";
    that.data.dates = "";
    that.data.add_style = "add_hide";
    that.data.animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease'
    });
    if (showModel) {
      that.data.animation.opacity(0).translateY('100%').step();
      that.reSetPage();
      setTimeout(function () {
        that.data.showModel = !showModel;
        that.reSetPage();
      }, 700);
    } else {
      that.data.showModel = !showModel;
      that.data.animation.opacity(0).translateY('100%').step();
      that.reSetPage();
      that.data.animation = wx.createAnimation({
        duration: 800,
        timingFunction: 'ease'
      });
      that.data.animation.opacity(1).translateY(0).step();
      that.reSetPage();
    }

    /*wx.navigateTo({
      url: 'addition/addition'
    })*/
  };
  that.data.animation = wx.createAnimation({
    duration: 800,
    timingFunction: 'ease'
  });
  that.data.animation.opacity(0).translateY('100%').step();

  //每一次刷新建议重新调用
  that.reSetPage = function () {
    that.data.html = "      <view style='background-color: #eeeeee; height: 100%; width:100%; position: absolute;'>    <view style='  margin-top: 30rpx;  padding-bottom: 1rpx;  display: flex;  flex-direction: column;  justify-content: center;  padding: 20rpx 35rpx 0 35rpx;'>      <view style='  color: rgb(0, 0, 0);  margin-left: 30rpx;  margin-bottom: 5px;  text-align: left;  font-size: 20px;  font-weight: 400;'>\u5012\u6570\u65E5</view>      <view style='  color: rgb(97, 97, 97);  text-align: left;  font-size: 30rpx;  margin-left: 30rpx;'>        <view>" + that.data.term + "</view>        <text>" + (that.data.jsonContent.month + 1) + " \u6708" + that.data.jsonContent.day + " \u65E5 " + that.data.jsonContent.dayOfWeek + " \uFF08\u6ED1\u52A8\u53EF\u5220\u9664)</text>      </view>            <view style='  padding-left: 20rpx;'>      " + that.data.list.map(function (item, index) {
      return "            <view style='  display: flex;  padding: 20rpx 0;  font-size: 16px;  overflow: hidden;'  bindtap='showdates'      bindtouchstart='touchstart' bindtouchmove='touchmove' id='" + index + "'>      <view style='  display: flex;  justify-content: space-around;  height: 110rpx;  width: 100%;  color: #fff;  background-color: rgba(248, 248, 248, 0.9);  box-shadow: 0 7rpx 7rpx #d1cece;  border-radius: 22rpx;  overflow: hidden;  transition: all 0.4s;  transform: translateX(130px);  margin-left: -130px;"+(item.isTouchMove?"    -webkit-transform: translateX(0);    transform: translateX(0);  ":"")+"' >              <view style='    -webkit-box-flex: 1;    -webkit-flex: 1;            flex: 1;  ' >          <view style='  width: 300rpx;  margin-left: 30rpx;  padding-top: 28rpx;  font-size: 34rpx;  color: #444444;  font-weight:550;  overflow: hidden;  display: -webkit-box;   -webkit-line-clamp: 1;   overflow: hidden;   text-overflow: ellipsis;   -webkit-box-orient: vertical' >            " + (item.gapDays > 0 ? "  " + item.holidayName + " \u8FD8\u6709" : item.holidayName + " \u5DF2\u7ECF") + "                </view>        </view>          <view style='    -webkit-box-flex: 1;    -webkit-flex: 1;            flex: 1;  '>            <view style='  display: flex;  flex-direction: row;  align-items: center;  justify-content: center;  height: 110rpx;  font-size: 62rpx;  color: #ffff;  text-align: center;"+(item.gapDays>0?"  text-shadow: 0px -1px 1px #865204f3 !important;    background-color: #fd9801e1 !important;":"  text-shadow: 0px -1px 1px #294161 !important;  background-color: #5685c2c2 !important;")+"'>            " + (item.gapDays > 0 ? " <text style='  flex: 1;' >" + item.gapDays + "</text>" : "<text style='  flex: 1;'>" + (0 - item.gapDays) + "</text>") + "              <view style='  display: flex;  justify-content: center;  align-items: center;  height: 110rpx;  width: 115rpx;"+(item.gapDays>0?"  background-color: #e27c07e8 !important;":"  background-color: #3170a7e3 !important;")+"'>                <text style='  flex: 1;  font-size: 38rpx;  color: #ffff;'>\u5929</text>              </view>            </view>          </view>      </view>            <view style='  background-color: rgb(255, 255, 255);  width: 95rpx;  height: 95rpx;  display: flex;  flex-direction: column;  align-items: center;  justify-content: center;  color: #fff;  border-radius: 115rpx;  margin-top: 8rpx;  margin-left: 25rpx;  -webkit-transform: translateX(130px);  transform: translateX(130px);  -webkit-transition: all 0.4s;  transition: all 0.4s;"+(item.isTouchMove?"    -webkit-transform: translateX(0);    transform: translateX(0);  ":"")+"' catchtap='edit' id='" + index + "'>        <image  style='  width: 40rpx;  height: 40rpx;' src='../../images/edit.png'></image>      </view>      <view style='  background-color: rgb(255, 255, 255);  width: 95rpx;  height: 95rpx;  margin-top: 8rpx;  display: flex;  flex-direction: column;  align-items: center;  justify-content: center;  color: #fff;  border-radius: 115rpx;  margin-left: 25rpx;  -webkit-transform: translateX(130px);  transform: translateX(130px);  -webkit-transition: all 0.4s;  transition: all 0.4s;"+(item.isTouchMove?"    -webkit-transform: translateX(0);    transform: translateX(0);  ":"")+"' catchtap='del' id='" + index + "'>        <image  style='  width: 40rpx;  height: 40rpx;' src='../../images/del.png'></image>      </view>    </view>";
    }) + "    </view>    <view style='  display: flex;  flex-direction: row;  align-items: center;  justify-content: space-between;  box-shadow: 0px 0px 4px 0px #c7c7c7;  height: 100rpx;  width: 110rpx;  right: 5rpx;  background-color: #FAFAFA;  position: fixed;  top: 50rpx;  border-bottom-left-radius: 100%;  border-top-left-radius: 100%;  z-index: 9;'>        <view style='' bindtap='feedbackHandler'>          <image  style='  display: inline-block;  margin-left: 30rpx;  margin-top: 10rpx;  width: 70rpx;  height: 60rpx;  margin-right: 20rpx;' src='/images/btn_feed@2x.png'></image>        </view>      </view>      <view style='  height: 120rpx;  width: 120rpx;  background-color: #bc3e49;  border-radius: 100%;  position: fixed;  bottom: 50rpx;  right: 25rpx;  display: flex;  align-items: center;  justify-content: center;  z-index: 9;' bindtap='showPic'>        <text style='  font-size: 32rpx;  max-width: 80rpx;  color: #fff;  text-align: center;'>\u67E5\u770B\u6821\u5386</text>      </view>    </view>  " + (that.data.showModel ? "    <view style='  position: absolute;  top: 0;  bottom: 0;  left: 0;  right: 0;  z-index: 9999;  font-family: unset;' >    <view style='  position: absolute;  top: 0;  bottom: 0;  left: 0;  right: 0;  z-index: 9999;  font-family: unset;  background-color: rgba(0, 0, 0, 0.349);  opacity: 0.6;  height: 100%;' bindtap='feedbackHandler'></view>    <view style='  position: fixed;  display: flex;  flex-direction: column;  align-items: center;  bottom: 0;  width: 100%;  background-color: #fff;  padding: 50rpx 0;  z-index: 99999;"+that.data.add_style+"'  animation='" + JSON.stringify(that.data.animation) + "'>      <view style='  padding-bottom: 50rpx;  size: 18px;  font-weight: 600;'>        <text>\u6DFB\u52A0\u5012\u6570\u65E5</text>      </view>      <view style='  display: flex;  flex-direction: row;  align-content: center;  width:85%;  padding:20rpx;  margin:20rpx;  border-radius: 20rpx;  box-sizing: unset;  background-color: rgb(245, 245, 245);'>          \u540D\u79F0:        <input style='padding-top:2rpx;padding-left: 10rpx;' placeholder='\u540D\u79F0'  bindinput='bindInputChange'></input>      </view>      <view style='  margin:20rpx;  padding:20rpx;  width:85%;  border-radius: 20rpx;  background-color: rgb(245, 245, 245);' dates='1'>          <picker mode='date' start='1978-01-01' end='2050-1-23' bindchange='bindDateChange'>            <view style='picker'>              \u65E5\u671F:   " + that.data.dates + "            </view>          </picker>        </view>      <view style='  display: flex;  flex-direction: row;  justify-content: center;  align-items: center;  margin: 70rpx 0 50rpx;  width: 85%;'>        <button style='  width: 45% !important;  border-radius: 50rpx;  color: rgb(54, 54, 54);  background-color:rgba(245, 245, 245);  size: 16px;  ' bindtap='feedbackHandler'>\u53D6 \u6D88</button>        <button style='  width: 45% !important;  border-radius: 50rpx;  color: rgb(54, 54, 54);  background-color:rgba(245, 245, 245);  size: 16px;  ' bindtap='addSubmit' >\u4FDD \u5B58</button>      </view>    </view></view>  " : null) + "    </view>    ";
    that.setData({
      html: that.parse(that.data.html)
    });
  };

  that.reSetPage();

  that.onload();
}

module.exports = runCode;
