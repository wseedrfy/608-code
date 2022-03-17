<<<<<<< HEAD
=======

  const app = getApp()
  Page({

    /**
     * 页面的初始数据
     */
    data: {
      html : [{type: 'view', text: '模版错误啦'}],
      
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var args = {
        xxx: 'xxx',
        code: `/******/ (function() { // webpackBootstrap
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
              style = ';' + p + style;
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
      var html = "<view class='contain' style='padding: 40rpx;'>  " + this.data.detail.map(function (item, index) {
        return " <view style='banner'  style='background-color: #fff; border-radius: 20rpx; padding: 0rpx 30rpx; padding-bottom: 20rpx;'>    <view class='banner-top' style='align-items: center; display: flex; justify-content: space-between; padding: 20rpx 0rpx;'>      <view class='banner-top-start' style='align-items: center; display: flex; left: 70rpx; position: absolute;'>        <view class='banner-top-left' style='font-size: 32rpx; font-weight: 800; line-height: 66rpx; text-align: left;'>        <image style='banner-top-left-image' src='" + (_typeof(item.icon) === "object" ? JSON.stringify(item.icon) : item.icon) + "' style='border-radius: 100%; height: 70rpx; vertical-align: middle; width: 70rpx;'></image>         <text class='banner-top-left-text' style='margin-left: 15rpx; margin-right: 5rpx;'>" + (_typeof(item.title) === "object" ? JSON.stringify(item.title) : item.title) + "</text>       </view>      <view class='banner-top-label' style='background-color: rgba(250,218,131); border-radius: 8rpx; color: rgba(85,41,2); font-size: 24rpx; margin-left: 20rpx; padding: 10rpx 8rpx;'>" + (_typeof(item.label) === "object" ? JSON.stringify(item.label) : item.label) + "</view>            </view>         <view style='banner-top-button' id='" + ((typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index) + "' bindtap='btn' style='background-color: rgba(229,77,66); border-radius: 30rpx; color: white; font-size: 26rpx; padding: 14rpx 18rpx;'>" + (_typeof(item.btn) === "object" ? JSON.stringify(item.btn) : item.btn) + "</view>    </view>    <view class='banner-end'>      <image src='" + (_typeof(item.banner_img) === "object" ? JSON.stringify(item.banner_img) : item.banner_img) + "' class='banner-end-image' mode='widthFix'></image>    </view>      </view>";
      }) + "</view>";
      this.setData({ html: this.parse(html) });
    },

    /**
     * 页面的初始数据
     */
    data: {
      detail: [{
        title: "美团外卖红包",
        label: "低价外卖",
        btn: "折扣购买",
        icon: "https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/logo.png?sign=71e2303e03df7c011e81f9dfd97197b9&t=1647496070",
        banner_img: "https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/coupon-img/meituan.png?sign=daa94d028da89f3ccf97c339e8bae823&t=1647496039",
        appid: "wxde8ac0a21135c07d",
        path: "/index/pages/h5/h5?lch=cps:waimai:5:401c6e8a33376657a4d076948b9d76ec:001:33:164009&f_userId=1&weburl=https%3A%2F%2Fclick.meituan.com%2Ft%3Ft%3D1%26c%3D2%26p%3DwTe5Vb5z7TbP&f_token=1"
      }]
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
    btn: function btn(e) {
      console.log(e);
      var index = Number(e.target.id);
      var res = this.data.detail[index];
      console.log(res);
      wx.navigateToMiniProgram({
        appId: res.appid,
        path: res.path,
        success: function success(res) {
          console.log(res);
          console.log(111);
        }
      });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function onReady() {},

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

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function onReachBottom() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function onShareAppMessage() {}
  });
}
module.exports = runCode;
/******/ })()
;
//# sourceMappingURL=index.js.map`
      }
      if (args) {
        try {
          var onload1 = app.jsRun(args, args.code)
          const onloadDict = onload1()
          for(let i in onloadDict){
            this[i] = onloadDict[i]
          }
          this.onLoad(this.options)
        } catch (e) {
          console.log(e)
        }
      }
  
    },
  
  })
>>>>>>> ba87e9e65953e5f79a0eaa12c8cd1a8c0a7ce83e
