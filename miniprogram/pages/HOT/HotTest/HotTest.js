
  const db = wx.cloud.database()
const schoolLoading = db.collection('schoolLoading')
const jump = db.collection('jumpPage')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school : ["通用"],
    tj: ["是", "否"],
    experimentData:"",
    //
    text: `/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!***********************!*\\
  !*** ./dist/index.js ***!
  \\***********************/


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function runCode() {

  var Page = function Page(page) {
    return page;
  };
  return Page({
    parseTag: function parseTag(tag) {
      var res = {
        type1: "tag",
        name: "",
        voidElement: false,
        // attrs: {},
        children: []
      };
      var tagMatch = tag.match(/<\\/?([^\\s]+?)[/\\s>]/);
      if (tagMatch) {
        // 标签名称为正则匹配的第2项
        res.type1 = tagMatch[1];
        if (tag.charAt(tag.length - 2) === "/") {
          // 判断tag字符串倒数第二项是不是 / 设置为空标签。 例子：<img/>
          res.voidElement = true;
        }
      }
      // 匹配所有的标签正则
      var classList = tag.match(/\\s([^'"/\\s><]+?)\\s*?=\\s*?(".*?"|'.*?')/g);

      if (classList) {
        var style = '';
        for (var i = 0; i < classList.length; i++) {
          // 去空格再以= 分隔字符串  得到['属性名称','属性值']

          var c = classList[i].split("=");
          // c[1] = c[1].replace(/\\s*/g, "")
          c[0] = c[0].replace(/\\s*/g, "");
          // 循环设置属性
          var lengthc = 2;
          for (lengthc; lengthc < c.length; lengthc++) {
            c[1] += "=" + c[lengthc];
          }
          var p = c[1].substring(1, c[1].length - 1);
          try {
            p = JSON.parse(c[1].substring(1, c[1].length - 1));
          } catch (e) {}

          if (c[1]) {
            if (c[0] === 'style') {
              style = p + style;
              res[c[0]] = style;
            } else {
              res[c[0]] = p;
            }
          };
        }
      }
      return res;
    },
    parse: function parse(html) {
      var that = this;
      var result = [];
      var current = void 0;
      var level = -1;
      var arr = [];
      var tagRE = /<[a-zA-Z\\-\\!\\/](?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])*>/g;
      html.replace(tagRE, function (tag, index) {
        // 判断第二个字符是不是'/'来判断是否open
        var isOpen = tag.charAt(1) !== "/";
        // 获取标签末尾的索引
        var start = index + tag.length;
        // 标签之前的文本信息
        var text = html.slice(start, html.indexOf("<", start));

        var parent = void 0;
        if (isOpen) {
          level++;
          // 设置标签属性
          current = that.parseTag(tag);
          // 判断是否为文本信息，是就push一个text children  不等于'  '
          if (!current.voidElement && text.trim()) {
            current["text"] = text;
          }
          // 如果我们是根用户，则推送新的基本节点
          if (level === 0) {
            result.push(current);
          }
          // 判断有没有上层，有就push当前标签
          parent = arr[level - 1];
          if (parent) {
            parent.children.push(current);
          }
          // console.log(current)
          arr[level] = current;
        }
        // 如果不是开标签，或者是空元素：</div><img>
        if (!isOpen || current.voidElement) {
          // level--
          level--;
        }
      });
      // console.log(result)
      return result;
    },

    setdata: function setdata(dictData) {

      for (var i in dictData) {
        this.data[i] = dictData[i];
      }
      var html = "<view class='container'>  <view class='title' style='display: table; margin: 0 auto; margin-top: 70rpx;'>    <view class='title-text' style='color: rgba(0, 0, 0, 0.7); font-size: 30rpx; font-weight: 800; margin-bottom: 26rpx;'>\\u539F\\u59CB\\u6570\\u636E</view>    <view class='title-data' style='display: flex; margin-bottom: 15rpx;'>      <input style='title-data-input' value='" + (_typeof(this.data.experimentData) === "object" ? JSON.stringify(this.data.experimentData) : this.data.experimentData) + "' bindinput='input' placeholder='\\u6570\\u636E\\u4E4B\\u95F4\\u4EE5\\u7A7A\\u683C\\u5206\\u9694\\u5982(3.02 2.99 2.8) ' type='text' style='border: 1rpx solid #DCE0E7; border-radius: 20rpx; color: #C1C2C5; font-size: 26rpx; height: 80rpx; padding-left: 18rpx; width: 500rpx;'></input>      <view class='title-data-submit' bindtap='submit' style='align-items: center; background-color: #A1DFCD; border-radius: 20rpx; color: white; display: flex; font-size: 24rpx; line-height: 42rpx; margin-left: 26rpx; margin-right: 10rpx; padding: 0rpx 30rpx;'><image class='title-data-submit-submit' src='./images/computer.png' style='display: inline-block; height: 48rpx; vertical-align: middle; width: 48rpx;'></image></view>    </view>      <view class='title-choose' style='display: flex; font-size: 23rpx; margin-bottom: 45rpx; margin-top: 20rpx;'>        <picker mode='selector' range='" + (_typeof(this.data.multiArray) === "object" ? JSON.stringify(this.data.multiArray) : this.data.multiArray) + "' value='" + (_typeof(this.data.multiIndex) === "object" ? JSON.stringify(this.data.multiIndex) : this.data.multiIndex) + "' bindchange='bindMultiPickerChange' style='display: flex;'>          <view class='title-choose-text' style='background-color: #B2E2F7; border-radius: 10rpx; color: white; display: flex; padding: 10rpx;'><text>" + (_typeof(this.data.instrument_name) === "object" ? JSON.stringify(this.data.instrument_name) : this.data.instrument_name) + "</text><image class='title-choose-image' src='./images/down.png' style='height: 28rpx; margin-left: 10rpx; vertical-align: middle; width: 28rpx;'></image></view>      </picker>        " + (_typeof(this.data.show) === "object" ? JSON.stringify(this.data.show) : this.data.show == "choose" ? "<view  class='title-choose-inch' style='position: absolute; right: 53rpx;'>          <picker mode='selector' range='" + (_typeof(this.data.calibration) === "object" ? JSON.stringify(this.data.calibration) : this.data.calibration) + "' value='" + (_typeof(this.data.calibrationIndex) === "object" ? JSON.stringify(this.data.calibrationIndex) : this.data.calibrationIndex) + "' bindchange='bindpickerchange' style='display: flex;'>          <view class='title-choose-text' style='background-color: #B2E2F7; border-radius: 10rpx; color: white; display: flex; padding: 10rpx;'><text>" + (_typeof(this.data.calibrationItem) === "object" ? JSON.stringify(this.data.calibrationItem) : this.data.calibrationItem) + "</text><image class='title-choose-image' src='./images/down.png' style='height: 28rpx; margin-left: 10rpx; vertical-align: middle; width: 28rpx;'></image></view>          </picker>        </view>" : "") + "        " + (_typeof(this.data.show) === "object" ? JSON.stringify(this.data.show) : this.data.show == "input" ? "<view  class='title-choose-input' style='border: 1rpx solid #B2E2F7; border-radius: 10rpx; position: absolute; right: 53rpx;'>          <input type='number' style='padding-left:10rpx' placeholder='\\u8BF7\\u8F93\\u5165\\u4EEA\\u5668\\u8BEF\\u5DEE' value='" + (_typeof(this.data.other_err) === "object" ? JSON.stringify(this.data.other_err) : this.data.other_err) + "' bindinput='err_input'></input>        </view>" : "2") + "    </view>  </view>  <view class='body' style='border-top: 1rpx solid rgba(187,187,187,0.3); margin: 0 25rpx; margin-bottom: 30rpx;'>    " + this.data.data_show.map(function (item, index) {
        return " <view style='body-describe'  style='border-bottom: 1rpx solid rgba(187,187,187,0.3); display: flex; font-size: 26rpx; padding: 30rpx 0rpx;'>            <text class='body-describe-text' style='margin-left: 24rpx;'>" + (_typeof(item.name) === "object" ? JSON.stringify(item.name) : item.name) + ":</text>      <view class='body-describe-data' style='border-bottom: 1rpx solid rgba(187,187,187,0.5); position: absolute; right: 60rpx;'>" + (_typeof(item.res) === "object" ? JSON.stringify(item.res) : item.res) + "</view>    </view>";
      }) + "  </view>   <view class='end' style='height: 100rpx; width: 100%;'>  <view class='end-text' bindtap='Check' style='background-color: #A1DFCD; border-radius: 20rpx; color: #FCFCFC; font-size: 26rpx; font-weight: 800; height: 80rpx; left: 50%; line-height: 80rpx; margin-bottom: 30rpx; margin-left: -100rpx; position: relative; text-align: center; top: 0%; width: 200rpx;'>\\u67E5\\u770B\\u516C\\u5F0F</view></view></view>";
      this.setData({ html: this.parse(html) });
    },

    /**
     * 页面的初始数据
     */
    data: {
      //输入的数据
      experimentData: "",
      //
      ContentDescripe: ["算术平均值", "标准偏差", "算术平均偏差", "a类不确定度", "b类不确定度", "总不确定度", "总相对不确定度"],
      //b类不确定度的picker数据,用到的东西有点多后续优化
      multiArray: ["钢直尺", "钢卷尺", "游标卡尺", "螺旋测微器", "物理天平", "TG928A矿山天平", "水银温度计", "读数显微镜", "其他"],
      multiIndex: 0,
      calibrationIndex: 0,
      show: false,
      calibration: [],
      calibrationItem: "请选择实验过程使用仪器的刻度",
      instrument_name: "请选择实验过程使用的仪器",
      other_err: "",
      data_show: [{ name: "算术平均数", res: "NaN" }, { name: "标准偏差", res: "NaN" }, { name: "算术平均的标准偏差", res: "NaN" }, { name: "b类不确定度", res: "NaN" }, { name: "a类不确定度", res: "NaN" }, { name: "总不确定度", res: "NaN" }, { name: "总相对不确定度", res: "NaN" }]
    },
    err_input: function err_input(e) {
      this.setdata({ other_err: e.detail.value });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function onLoad(options) {
      var _this = this;

      options = this.options;this.data.dark = wx.getSystemInfoSync().theme;wx.onThemeChange(function (e) {
        console.log(e.theme);_this.setdata({ dark: e.theme });
      });this.setdata();
    },
    //输入
    input: function input(e) {
      this.setdata({
        experimentData: e.detail.value
      });
    },

    //b类不确定处理封装成一个函数
    process: function process(instrument_name) {
      var res = [];

      if (instrument_name == "游标卡尺") {
        res.push("0.02mm", "0.05mm", "0.1mm");
        console.log(res);
        this.setdata({
          //存储是否展示
          show: "choose",
          //存储刻度
          calibration: res
        });
      }
      if (instrument_name == "水银温度计") {
        res.push("0.2℃", "0.1℃");
        console.log(res);
        this.setdata({
          //存储是否展示
          show: "choose",
          //存储刻度
          calibration: res
        });
      }
      if (instrument_name == "其他") {
        this.setdata({
          //存储是否展示
          show: "input",
          //存储刻度
          calibration: res
        });
      }
    },

    //提交表单前的数据处理
    computer: function computer() {
      var input_data = this.data.experimentData;
      input_data = input_data.split(" ");
      var res = [];
      var flag = 0;
      input_data.forEach(function (element) {
        if (isNaN(Number(element))) {
          flag = 1;
        }
        res.push(Number(element));
      });
      if (flag == 1) {
        return "数据输入框格式错误";
      } else {
        if (res[0] == 0) {
          return "您还未输入数据";
        }
        return res;
      }
    },

    //提交表单
    submit: function submit() {
      var that = this;
      var res = this.computer();
      var result = {
        "experimentData": [],
        "b_": ""
      };
      if (typeof res == "string") {
        wx.showToast({
          title: res,
          icon: "none"
        });
      } else {
        var that = this;
        console.log(res);
        if (this.data.instrument_name == "游标卡尺" || this.data.instrument_name == "水银温度计") {
          console.log(that.data.calibrationItem);
          if (that.data.calibrationItem == "请选择实验过程使用仪器的刻度") {
            wx.showToast({
              title: '您还没选择刻度',
              icon: "none"
            });
          }
          var b_ = Number(that.data.calibrationItem.replace("mm", "").replace("℃", ""));
          result = {
            "experimentData": res,
            "b_": b_ / Math.pow(3, 1 / 2)
          };
          console.log(result);
        }
        if (this.data.instrument_name == "其他") {
          console.log(this.data.other_err);
          if (this.data.other_err / Math.pow(3, 1 / 2) == 0) {
            wx.showToast({
              title: '请输入仪器误差',
              icon: "none"
            });
          }
          if (isNaN(this.data.other_err / Math.pow(3, 1 / 2))) {
            wx.showToast({
              title: '仪器误差输入框格式错误,应为数字类型',
              icon: "none"
            });
          }
          result = {
            "experimentData": res,
            "b_": this.data.other_err / Math.pow(3, 1 / 2)
          };
          console.log(result);
        }
        if (this.data.instrument_name == "钢直尺" || this.data.instrument_name == "钢卷尺" || this.data.instrument_name == "螺旋测微器" || this.data.instrument_name == "物理天平" || this.data.instrument_name == "TG928A矿山天平" || this.data.instrument_name == "读数显微镜") {

          //定义哈希表把所有情况列举时间复杂度最低
          var hash = { "钢直尺": 0.1, "钢卷尺": 0.5, "螺旋测微器": 0.004, "物理天平": 50, "TG928A矿山天平": 5, "读数显微镜": 0.004 };
          var _b_ = hash[this.data.instrument_name];
          result = {
            "experimentData": res,
            "b_": _b_ / Math.pow(3, 1 / 2)
          };
          console.log(result);
        }
        if (this.data.instrument_name == "请选择实验过程使用的仪器") {
          wx.showToast({
            title: '您还未选择实验仪器',
            icon: "none"
          });
        }
      }

      console.log(result);
      //在这里进行异步请求加判断
      wx.request({
        url: 'https://www.biubbmk.cn/api_flask_zf/physical_Default',
        method: "POST",
        data: {
          arr: result.experimentData,
          ub: result.b_
        },
        success: function success(res) {
          that.setdata({ data_show: res.data });
        }
      });
    },

    //滚动事件
    bindMultiPickerChange: function bindMultiPickerChange(e) {
      var instrument_name = this.data.multiArray[e.detail.value];
      console.log(instrument_name);
      this.setdata({
        multiIndex: e.detail.value,
        show: false,
        instrument_name: instrument_name,
        calibrationItem: "请选择实验过程使用仪器的刻度", //初始化防止后续干扰
        other_err: ""
      });
      this.process(instrument_name);
    },
    bindpickerchange: function bindpickerchange(e) {
      this.setdata({
        calibrationIndex: e.detail.value,
        calibrationItem: this.data.calibration[e.detail.value]
      });
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function onReady() {},
    Check: function Check() {
      wx.navigateTo({
        url: '/pages/test1/test1'
      });
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function onShow() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function onHide() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function onUnload() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function onPullDownRefresh() {},

    onReachBottom: function onReachBottom() {},

    onShareAppMessage: function onShareAppMessage() {}
  });
}
module.exports = runCode;
/******/ })()
;
//# sourceMappingURL=index.js.map`,
  },

  onLoad: async function (options) {
    var that = this
    wx.showLoading({
      title: '加载基础信息中',
      mask: true
    })
    // 注意！这个只能拉100个学校，我也希望未来我们能超过100个
    var res = (await schoolLoading.where({}).get()).data

    res.forEach(e => {
      that.data.school.push(e.schoolName)
    })
    wx.hideLoading({
      success: (res) => {},
    })
    that.setData({school: that.data.school})
  },
  //输入
 
  chooseTemperature: async function (e) {
    var schoolName = this.data.school[e.detail.value]
    var jumpData = (await jump.where({schoolName : schoolName}).get()).data
    this.setData({tem: this.data.school[e.detail.value], jumpData})
  }, 

   
  choose_ever: function (e) {
    this.setData({everInDangerRegion: this.data.tj[e.detail.value]})
  }, 

  choose_kg: function (e) {
    this.setData({kg: this.data.tj[e.detail.value]})
  }, 

  everIndangerPlaceText: function (e) {
    this.data.everIndangerRegionText = e.detail.value
    this.data.jumpData.forEach(e1 => {
      if(e1.name === e.detail.value){
        this.setData({
          everInDangerRegion: '已配置'
        })
      }
    })
  },

  everIndangerPlaceText1: function (e) {
    this.data.iconUrl = e.detail.value

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */

  submit: function (params) {
    var that = this;
    console.log(233)
    wx.cloud.callFunction({
      name: 'JsRelease',
      data: {
        'school': that.data.tem,
        'name': that.data.everIndangerRegionText,
        'isTj': that.data.everInDangerRegion,
        'icnoUrl': that.data.iconUrl,
        'isSwitch': that.data.kg
      },
      success: res => {
        if (res.result.msg == "welcome") {
          console.log(res.result)
          wx.reLaunch({
            url: '/pages/index/index'
          })
        } else {
          console.log(res.result)
          wx.showToast({
            icon: 'none',
            title: res.result.msg,
          })
        }
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '校园网关闭或者服务器异常',
        })
      }
    })

  },

  onPullDownRefresh: function () {
  },
  
  onReachBottom: function () {
  },
   

  onShareAppMessage: function () {
    
  }
})
