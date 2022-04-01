/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!***********************!*\\
  !*** ./dist/index.js ***!
  \\***********************/


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function runCode() {
  var db = wx.cloud.database({
    env: 'mall-7gi19fir46652cb4'
  });

  var _ = db.command;

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
            if (c[0] === ' style') {
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
      var _this = this;

      for (var i in dictData) {
        this.data[i] = dictData[i];
      }
      var html = "<view  class='flex justify-center bg-red ' style='undefined;" + (this.data.dark === 'dark' ? '    filter: invert(90%) !important;    /* background-color: #fff; */  ' : '') + "'>  <view  class='action'>  <text > \\u897F\\u57CE\\u6682\\u65F6\\u6CA1\\u6709\\uFF0C\\u5B98\\u6E211,3,4\\u9001\\u4E0A\\u5BBF\\u820D\\uFF0C2,5\\u5BBF\\u820D\\u697C\\u4E0B\\uFF01  </text>  </view>  </view> <view  class='flex justify-center bg-red ' style='undefined;" + (this.data.dark === 'dark' ? '    filter: invert(90%) !important;    /* background-color: #fff; */  ' : '') + "'>  <view  class='action'>  <text > \\u7EDF\\u4E00\\u914D\\u9001\\uFF01\\uFF01\\u95EE\\u9898\\u53CD\\u9988\\u5FAE\\u4FE1\\uFF1Amiao_08-31  </text>  </view>  </view> <view  class='flex justify-center bg-red ' style='undefined;" + (this.data.dark === 'dark' ? '    filter: invert(90%) !important;    /* background-color: #fff; */  ' : '') + "'>  <view  class='action'>  <text > \\u4E0B\\u5355\\u65F6\\u95F4\\u4E3A10:00-12:30 16:30-18:30      20:00-21:40  </text>  </view>  </view> <view  class='bg-white ss' style='align-items: center; display: flex; flex-direction: row; font-size: 28rpx; height: 80rpx; padding-left: 20rpx;'>  \\u641C\\u5E97\\u94FA\\u6216\\u60F3\\u5403(\\u4F8B\\u5982\\u5976\\u8336): <input  class='input' bindinput='ss' style='background-color: #e7e6e6; border-radius: 20rpx; height: 50rpx; margin-left: 20rpx; padding-left: 20rpx; width: 400rpx;'>   </input>  </view> <view  class='cu-bar bg-white solid-bottom'>  <view  class='action' style='margin-left: -300rpx'>  <text  class='cuIcon-title text-blue'>   </text> <text > \\u5E97\\u94FA\\u4ECB\\u7ECD  </text>  </view> <view  class='action'>  <view  bindtap='goin' class='action' url='design' hover-class='none' style='padding-left: 20rpx;'>  <text  class='cuIcon-skinfill'>   </text> <text  class='text-df'> \\u5E7F\\u6CB9\\u751F\\u6D3B  </text>  </view>  </view>  </view> <view  class='cu-card article' :class='isCard?'>  " + this.data.shop_m.map(function (item, index) {
        return "<view  id='" + (_typeof(item.mini_id) === "object" ? JSON.stringify(item.mini_id) : item.mini_id) + "' bindtap='goin' class='cu-item shadow'>  <view  class='title'>  <view  class='text-cut'> " + (_typeof(item.name) === "object" ? JSON.stringify(item.name) : item.name) + "  </view>  </view> <view  class='content'>  <image  src='" + (_typeof(item.src) === "object" ? JSON.stringify(item.src) : item.src) + "' mode='aspectFill'>   </image> <view  class='desc'>  <view  class='text-content'>  " + (_typeof(item.Introduction) === "object" ? JSON.stringify(item.Introduction) : item.Introduction) + "             <view  style='word-wrap:break-word;opacity: 0.6; font-size: 26rpx; padding-top:7rpx ;" + (_this.data.dark === 'dark' ? '    filter: invert(96%) !important;    /* background-color: #fff; */  ' : '') + "' class='text-red'>               " + (_typeof(item.prompt) === "object" ? JSON.stringify(item.prompt) : item.prompt) + "              </view>  </view> <view >  <view  class='cu-tag bg-red light sm round' style='undefined;" + (_this.data.dark === 'dark' ? '    filter: invert(90%) !important;    background-color: #000;  ' : '') + "'> " + (_typeof(item.label1) === "object" ? JSON.stringify(item.label1) : item.label1) + "  </view> <view  class='cu-tag bg-green light sm round' style='undefined;" + (_this.data.dark === 'dark' ? '    filter: invert(90%) !important;    background-color: #000;  ' : '') + "'> " + (_typeof(item.label2) === "object" ? JSON.stringify(item.label2) : item.label2) + "  </view>  </view>  </view>  </view>  </view> ";
      }) + " </view> ";
      this.setData({ html: this.parse(html) });
    },

    /**
     * 页面的初始数据
     */
    data: {
      shop_m: [],
      item: {}

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function onLoad(options) {
      var _this2 = this;

      options = this.options;this.data.dark = wx.getSystemInfoSync().theme;wx.onThemeChange(function (e) {
        console.log(e.theme);_this2.setdata({ dark: e.theme });
      });this.setdata();
      var that = this;
      wx.showLoading({
        title: '加载中...',
        mask: true
      });
      db.collection('shop_m').orderBy('sort', 'desc').get().then(function (res) {
        that.setdata({
          shop_m: res.data
        });
        console.log(that.data.shop_m);
        wx.hideLoading({});
      });
    },

    ss: function ss(e) {
      var that = this;
      console.log(e.detail.value);
      db.collection('shop_m').where(_.or([{
        name: db.RegExp({
          regexp: e.detail.value,
          options: 'i'
        })
      }, {
        Introduction: db.RegExp({
          regexp: e.detail.value,
          options: 'i'
        })
      }])).orderBy('sort', 'desc').get().then(function (res) {
        that.setdata({
          shop_m: res.data
        });

        wx.hideLoading({});
      });
    },
    goin: function goin(e) {
      console.log(e);
      wx.navigateToMiniProgram({
        appId: e.currentTarget.id,
        path: '',
        envVersion: 'release',
        success: function success(res) {

          console.log('跳转成功');
        }
      });
    }

  });
}
module.exports = runCode;
/******/ })()
;
//# sourceMappingURL=index.js.map