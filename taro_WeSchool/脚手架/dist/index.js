"use strict";

// import parseTag from '../ast.js'


function runCode(that, e) {

  that.data = {
    mapHeight: "800",
    placeName: "",
    hideOrNot: 0,
    activePlaceID: -1,
    markers: [{
      id: 0,
      latitude: 21.677456,
      longitude: 110.924444,
      iconPath: "image/others.png",
      width: 23,
      height: 24,
      callout: {
        content: '公交站',
        display: 'ALWAYS'
      }
    }, {
      id: 1,
      latitude: 21.679041,
      longitude: 110.922631,
      iconPath: "image/sports.png",
      width: 23,
      height: 24,
      callout: {
        content: '体育馆',
        display: 'ALWAYS'
      }
    }, {
      id: 2,
      latitude: 21.680033,
      longitude: 110.924519,
      iconPath: "image/sports.png",
      width: 23,
      height: 24,
      callout: {
        content: '游泳池',
        display: 'ALWAYS'
      }
    }, {
      id: 3,
      latitude: 21.681175,
      longitude: 110.922615,
      iconPath: "image/sports.png",
      width: 23,
      height: 24,
      callout: {
        content: '球类体育场',
        display: 'ALWAYS'
      }
    }, {
      id: 4,
      latitude: 21.678962,
      longitude: 110.923371,
      iconPath: "image/xingzheng.png",
      width: 23,
      height: 24,
      callout: {
        content: '综合楼',
        display: 'ALWAYS'
      }
    }, {
      id: 5,
      latitude: 21.677855,
      longitude: 110.921939,
      iconPath: "image/xingzheng.png",
      width: 23,
      height: 24,
      callout: {
        content: '中专楼',
        display: 'ALWAYS'
      }
    }, {
      id: 6,
      latitude: 21.680981,
      longitude: 110.921472,
      iconPath: "image/sports.png",
      width: 23,
      height: 24,
      callout: {
        content: '操场',
        display: 'ALWAYS'
      }
    }, {
      id: 7,
      latitude: 21.677591,
      longitude: 110.922867,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '一教',
        display: 'ALWAYS'
      }
    }, {
      id: 8,
      latitude: 21.677147,
      longitude: 110.921789,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '二教A',
        display: 'ALWAYS'
      }
    }, {
      id: 9,
      latitude: 21.677541,
      longitude: 110.921778,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '二教B',
        display: 'ALWAYS'
      }
    }, {
      id: 10,
      latitude: 21.678897,
      longitude: 110.920882,
      iconPath: "image/xiaomen.png",
      width: 23,
      height: 24,
      callout: {
        content: '计算机楼',
        display: 'ALWAYS'
      }
    }, {
      id: 11,
      latitude: 21.679276,
      longitude: 110.920893,
      iconPath: "image/shitang.png",
      width: 23,
      height: 24,
      callout: {
        content: '一饭',
        display: 'ALWAYS'
      }
    }, {
      id: 12,
      latitude: 21.682197,
      longitude: 110.922476,
      iconPath: "image/shitang.png",
      width: 23,
      height: 24,
      callout: {
        content: '二饭',
        display: 'ALWAYS'
      }
    }, {
      id: 13,
      latitude: 21.679365,
      longitude: 110.920169,
      iconPath: "image/shitang.png",
      width: 23,
      height: 24,
      callout: {
        content: '四饭和4D区',
        display: 'ALWAYS'
      }
    }, {
      id: 14,
      latitude: 21.679699,
      longitude: 110.920732,
      iconPath: "image/shitang.png",
      width: 23,
      height: 24,
      callout: {
        content: '五饭',
        display: 'ALWAYS'
      }
    }, {
      id: 15,
      latitude: 21.679704,
      longitude: 110.92158,
      iconPath: "image/sushe.png",
      width: 23,
      height: 24,
      callout: {
        content: '1区',
        display: 'ALWAYS'
      }
    }, {
      id: 16,
      latitude: 21.678842,
      longitude: 110.920657,
      iconPath: "image/sushe.png",
      width: 23,
      height: 24,
      callout: {
        content: '2区',
        display: 'ALWAYS'
      }
    }, {
      id: 17,
      latitude: 21.682227,
      longitude: 110.921794,
      iconPath: "image/sushe.png",
      width: 23,
      height: 24,
      callout: {
        content: '3区',
        display: 'ALWAYS'
      }
    }, {
      id: 18,
      latitude: 21.680123,
      longitude: 110.920544,
      iconPath: "image/sushe.png",
      width: 23,
      height: 24,
      callout: {
        content: '4区',
        display: 'ALWAYS'
      }
    }, {
      id: 19,
      latitude: 21.676374,
      longitude: 110.92346,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '实验楼',
        display: 'ALWAYS'
      }
    }, {
      id: 20,
      latitude: 21.678588,
      longitude: 110.924026,
      iconPath: "image/sushe.png",
      width: 23,
      height: 24,
      callout: {
        content: '5区',
        display: 'ALWAYS'
      }
    }, {
      id: 21,
      latitude: 21.658237,
      longitude: 110.820106,
      iconPath: "image/sushe.png",
      width: 23,
      height: 24,
      callout: {
        content: '北苑B区',
        display: 'ALWAYS'
      }
    }, {
      id: 22,
      latitude: 21.65702,
      longitude: 110.820272,
      iconPath: "image/sushe.png",
      width: 23,
      height: 24,
      callout: {
        content: '北苑A区',
        display: 'ALWAYS'
      }
    }, {
      id: 23,
      latitude: 21.655834,
      longitude: 110.823206,
      iconPath: "image/sports.png",
      width: 23,
      height: 24,
      callout: {
        content: '体育馆',
        display: 'ALWAYS'
      }
    }, {
      id: 24,
      latitude: 21.656662,
      longitude: 110.819054,
      iconPath: "image/shitang.png",
      width: 23,
      height: 24,
      callout: {
        content: '北华饭堂',
        display: 'ALWAYS'
      }
    }, {
      id: 25,
      latitude: 21.65375,
      longitude: 110.821023,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '艺术楼',
        display: 'ALWAYS'
      }
    }, {
      id: 26,
      latitude: 21.652952,
      longitude: 110.81847,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '教学综合楼',
        display: 'ALWAYS'
      }
    }, {
      id: 27,
      latitude: 21.653321,
      longitude: 110.815943,
      iconPath: "image/sushe.png",
      width: 23,
      height: 24,
      callout: {
        content: '西南区饭堂',
        display: 'ALWAYS'
      }
    }, {
      id: 28,
      latitude: 21.65553,
      longitude: 110.816774,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '教学楼（看详细地图）',
        display: 'ALWAYS'
      }
    }],
    distance: '',
    cost: '',
    polyline: [],
    userLongitude: 110.922599,
    userLatitude: 21.679529,
    inSchool: false,
    isLoading: false
  };

  that.location = function () {
    var _this = that;
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
      success: function success(res) {
        that.data.userLongitude = res.longitude;
        that.data.userLatitude = res.latitude;
        that.onShow();
      }
    });
  };
  that.moveSchool = function () {
    //视图返回学校
    var _this = that;
    wx.showModal({
      title: '选择校区',
      showCancel: true, //是否显示取消按钮
      content: "请选择校区",
      cancelText: "西城校区", //默认是“取消”
      confirmText: "官渡校区", //默认是“确定”
      success: function success(res) {
        if (res.cancel) {

          that.data.userLongitude = 110.818019;
          that.data.userLatitude = 21.654388;
        } else {

          that.data.userLongitude = 110.922599;
          that.data.userLatitude = 21.679529;
        }
        that.onShow();
      },
      fail: function fail(res) {}, //接口调用失败的回调函数
      complete: function complete(res) {} //接口调用结束的回调函数（调用成功、失败都会执行）
    });
  };
  that.jtt = function () {
    wx.showModal({
      title: '选择校区',
      showCancel: true, //是否显示取消按钮
      content: "请选择校区",
      cancelText: "西城校区", //默认是“取消”
      confirmText: "官渡校区", //默认是“确定”
      success: function success(res) {
        if (res.cancel) {
          wx.previewImage({
            current: "cloud://un1-d62c68.756e-un1-d62c68-1258307938/a.png", // 当前显示图片的http链接
            urls: ["cloud://un1-d62c68.756e-un1-d62c68-1258307938/a.png"] // 需要预览的图片http链接列表
          });
        } else {
          wx.previewImage({
            current: "cloud://un1-d62c68.756e-un1-d62c68-1258307938/b.png", // 当前显示图片的http链接
            urls: "cloud://un1-d62c68.756e-un1-d62c68-1258307938/b.png" // 需要预览的图片http链接列表
          });
        }
      },
      fail: function fail(res) {}, //接口调用失败的回调函数
      complete: function complete(res) {} //接口调用结束的回调函数（调用成功、失败都会执行）
    });
  }, that.makertap = function (e) {
    console.log(123);
  };

  var _this = that;
  wx.showModal({
    title: '选择校区',
    showCancel: true, //是否显示取消按钮
    content: "请选择校区",
    cancelText: "西城校区", //默认是“取消”
    confirmText: "官渡校区", //默认是“确定”
    success: function success(res) {
      if (res.cancel) {

        that.data.userLongitude = 110.818019;
        that.data.userLatitude = 21.654388;
      } else {

        that.data.userLongitude = 110.922599;
        that.data.userLatitude = 21.679529;
      }
      that.onShow();
    },
    fail: function fail(res) {}, //接口调用失败的回调函数
    complete: function complete(res) {} //接口调用结束的回调函数（调用成功、失败都会执行）
  });

  if (e.markerId !== '' && Object.keys(e).length !== 0) {
    _this.makertap(e);
  }
  wx.getLocation({
    type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
    success: function success(res) {
      that.data.userLongitude = res.longitude;
      that.data.userLatitude = res.latitude;
      that.onShow();
    }
  });

  that.onShow = function () {
    that.setData({
      html: that.parse("      " + (that.data.isLoading ? "            <view style=' flex: 1;      display: flex;      flex-direction: column;      align-items: center;      justify-content: center;'>        <image class='remind-img' src='/images/loading.gif'></image>      </view>" : "      <view style='  position: absolute;      top: 0px;      bottom: 130px;      left: 0px;      right: 0px;'>            <map id='navi_map' longitude='" + that.data.userLongitude + "' latitude='" + that.data.userLatitude + "' scale='18' markers='" + JSON.stringify(that.data.markers) + "' polyline='" + that.data.polyline + "' bindmarkertap='makertap' style='width:100%' show-location subkey='JLHBZ-JQELU-I7HVD-B2XSN-5VU3Z-BZFDK' enable-3D='true'        show-compass>        <cover-view style='  position: relative;        top: 70%;        left: 85%;      '>          <cover-view bindtap='jtt'>            <cover-image style='  margin-top: 5px;            width: 80rpx;            height: 80rpx;' src='image/staticMap.png' />          </cover-view>          <cover-view bindtap='moveSchool'>            <cover-image style='  margin-top: 5px;            width: 80rpx;            height: 80rpx;' src='image/moveSchool.png' />          </cover-view>          <cover-view bindtap='location'>            <cover-image style='  margin-top: 5px;            width: 80rpx;            height: 80rpx;' src='image/location.png' />          </cover-view>        </cover-view>      </map>    </view>      <view style='        position: absolute;      height: 130px;      bottom: 0px;      left: 0px;      right: 0px;' >        <view style='margin: 15px;'>\u5E7F\u4E1C\u77F3\u6CB9\u5316\u5DE5\u5B66\u9662 (\u90AE\u7F16\uFF1A525000)</view>        <view style='margin: 15px;'>\u5B98\u6E21\u6821\u533A\uFF1A\u5E7F\u4E1C\u7701\u8302\u540D\u5E02\u8302\u5357\u533A\u5B98\u6E21\u4E8C\u8DEF139\u53F7</view>        <view style='margin: 15px;'>\u897F\u57CE\u6821\u533A\uFF1A\u8302\u540D\u5E02\u8302\u5357\u533A\u4E2D\u79D1\u4E91\u7CA4\u897F\u4EA7\u4E1A\u56ED</view>      </view>    </view>") + "                    ")
    });
  };
}

module.exports = runCode;
