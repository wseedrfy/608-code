/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!***********************!*\\
  !*** ./dist/index.js ***!
  \\***********************/


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
      var html = "<view  " + (this.data.dark === 'dark' ? 'style="  filter: invert(90%) !important;  /* background-color: #fff; */ "' : '') + " class='flex justify-center bg-red '>  <view class='action'>    <text>\\u897F\\u57CE\\u6682\\u65F6\\u6CA1\\u6709\\uFF0C\\u5B98\\u6E211,3,4\\u9001\\u4E0A\\u5BBF\\u820D\\uFF0C2,5\\u5BBF\\u820D\\u697C\\u4E0B</text>  </view></view><view class='cu-bar bg-white solid-bottom'>  <view class='action' style='margin-left: -300rpx'>    <text class='cuIcon-title text-blue'></text><text>\\u5E97\\u94FA\\u4ECB\\u7ECD</text>  </view>  <view class='action'>    <view id bindtap='goin' class='action' url='design' hover-class='none' style='padding-left: 20rpx;'>      <text class='cuIcon-skinfill'></text>      <text class='text-df'>\\u5E7F\\u6CB9\\u5916\\u5356</text>    </view>  </view></view><view class='cu-card article' :class='isCard?' no-card':'''>  <view id='wxf1f3fa6588601737' bindtap='goin' class='cu-item shadow'>    <view class='title'>      <view class='text-cut'>\\u65B0\\u7586\\u7092\\u7C73\\u7C89</view>    </view>    <view class='content'>      <image src='https://s1.ax1x.com/2022/03/16/qpBE3n.jpg' mode='aspectFill'></image>      <view class='desc'>        <view class='text-content'> \\u672C\\u5E97\\u4E3B\\u6253: \\u65B0\\u7586\\u7092\\u7C73\\u7C89\\uFF0C\\u5E7F\\u5F0F\\u624B\\u6495\\u9E21\\uFF0C\\u8F66\\u4ED4\\u9762...          <view  " + (this.data.dark === 'dark' ? 'style="  filter: invert(96%) !important;  /* background-color: #fff; */ "' : '') + " style='word-wrap:break-word;opacity: 0.6; font-size: 26rpx; padding-top:7rpx ' class='text-red'>            \\u70B9\\u51FB--\\u300B\\u53EF\\u5916\\u5356\\u54DF          </view>        </view>        <view>          <view  " + (this.data.dark === 'dark' ? 'style="  filter: invert(90%) !important;     background-color: #000; "' : '') + " class='cu-tag bg-red light sm round'>\\u514D\\u914D\\u9001</view>          <view  " + (this.data.dark === 'dark' ? 'style="  filter: invert(90%) !important;     background-color: #000; "' : '') + " class='cu-tag bg-green light sm round'>\\u5730\\u5740\\uFF1A\\u5B98\\u6E21</view>        </view>      </view>    </view>  </view>  <view id='wx0bea4f67fea460a8' bindtap='goin' class='cu-item shadow'>    <view class='title'>      <view class='text-cut'>\\u8FC7\\u6865\\u7C73\\u7EBF</view>    </view>    <view class='content'>      <image src='https://s1.ax1x.com/2022/03/16/qpwfL8.jpg' mode='aspectFill'></image>      <view class='desc'>        <view class='text-content'> \\u672C\\u5E97\\u4E3B\\u6253: \\u79D8\\u5236\\u4E4C\\u51AC\\u9762\\u5E72\\u635E          <view style='word-wrap:break-word;'>            \\u7F51\\u7EA2\\u6B66\\u5927\\u90CE\\u714E\\u997C\\uFF0C\\u714E\\u997C\\u679C\\u5B50          </view>          <view  " + (this.data.dark === 'dark' ? 'style="  filter: invert(96%) !important;  /* background-color: #fff; */ "' : '') + " style='word-wrap:break-word;opacity: 0.6; font-size: 26rpx; padding-top:7rpx ' class='text-red'>            \\u70B9\\u51FB--\\u300B\\u53EF\\u5916\\u5356\\u54DF          </view>        </view>        <view>          <view  " + (this.data.dark === 'dark' ? 'style="  filter: invert(90%) !important;     background-color: #000; "' : '') + " class='cu-tag bg-red light sm round'>\\u514D\\u914D\\u9001</view>          <view  " + (this.data.dark === 'dark' ? 'style="  filter: invert(90%) !important;     background-color: #000; "' : '') + " class='cu-tag bg-green light sm round'>\\u5730\\u5740\\uFF1A\\u5B98\\u6E21</view>        </view>      </view>    </view>  </view>  <view id='wxf5832f54e00a492b' bindtap='goin' class='cu-item shadow'>    <view class='title'>      <view class='text-cut'>\\u53F6\\u8BB0\\u4E91\\u541E</view>    </view>    <view class='content'>      <image src='https://s1.ax1x.com/2022/03/16/qpBI8s.jpg' mode='aspectFill'></image>      <view class='desc'>        <view class='text-content'> \\u672C\\u5E97\\u4E3B\\u6253:\\u9EC4\\u7116\\u9E21\\u7C73\\u996D\\uFF0C\\u798F\\u5EFA\\u4E91\\u541E\\uFF0C\\u997A\\u5B50\\uFF0C\\u9984\\u9968...          <view  " + (this.data.dark === 'dark' ? 'style="  filter: invert(96%) !important;  /* background-color: #fff; */ "' : '') + " style='word-wrap:break-word;opacity: 0.6; font-size: 26rpx; padding-top:7rpx ' class='text-red'>            \\u70B9\\u51FB--\\u300B\\u53EF\\u5916\\u5356\\u54DF          </view>        </view>        <view>          <view  " + (this.data.dark === 'dark' ? 'style="  filter: invert(90%) !important;     background-color: #000; "' : '') + " class='cu-tag bg-red light sm round'>\\u514D\\u914D\\u9001</view>          <view  " + (this.data.dark === 'dark' ? 'style="  filter: invert(90%) !important;     background-color: #000; "' : '') + " class='cu-tag bg-green light sm round'>\\u5730\\u5740\\uFF1A\\u5B98\\u6E21</view>        </view>      </view>    </view>  </view>  <view id='wxbb412a3b85b695c8' bindtap='goin' class='cu-item shadow'>    <view class='title'>      <view class='text-cut'>\\u7CA4\\u9999\\u5FEB\\u9910</view>    </view>    <view class='content'>      <image src='https://s1.ax1x.com/2022/03/16/qprZwT.jpg' mode='aspectFill'></image>      <view class='desc'>        <view class='text-content'> \\u672C\\u5E97\\u4E3B\\u6253:\\u5404\\u7C7B\\u5FEB\\u9910\\uFF0C\\u7172\\u4ED4\\u996D\\uFF0C\\u70E4\\u9C7C\\u996D\\uFF0C\\u9178\\u83DC\\u9C7C\\u996D...          <view  " + (this.data.dark === 'dark' ? 'style="  filter: invert(96%) !important;  /* background-color: #fff; */ "' : '') + " style='word-wrap:break-word;opacity: 0.6; font-size: 26rpx; padding-top:7rpx ' class='text-red'>            \\u70B9\\u51FB--\\u300B\\u53EF\\u5916\\u5356\\u54DF          </view>        </view>        <view>          <view  " + (this.data.dark === 'dark' ? 'style="  filter: invert(90%) !important;     background-color: #000; "' : '') + " class='cu-tag bg-red light sm round'>\\u514D\\u914D\\u9001</view>          <view  " + (this.data.dark === 'dark' ? 'style="  filter: invert(90%) !important;     background-color: #000; "' : '') + " class='cu-tag bg-green light sm round'>\\u5730\\u5740\\uFF1A\\u5B98\\u6E21</view>        </view>      </view>    </view>  </view></view>";
      this.setData({ html: this.parse(html) });
    },

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function onLoad(options) {
      var _this = this;

      options = this.options;this.data.dark = wx.getSystemInfoSync().theme;wx.onThemeChange(function (e) {
        console.log(e.theme);_this.setdata({ dark: e.theme });
      });this.setdata();
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