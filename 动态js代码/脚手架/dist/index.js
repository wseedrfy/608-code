/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!***********************!*\\
  !*** ./dist/index.js ***!
  \\***********************/


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function runCode() {
  var _Page;

  var db = wx.cloud.database({ env: 'mall-7gi19fir46652cb4' });

  var Page = function Page(page) {
    return page;
  };
  return Page((_Page = {
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
      var html = "" + ((_typeof(this.data.tabbar) === "object" ? JSON.stringify(this.data.tabbar) : this.data.tabbar) ? "<view >  " + (!(_typeof(this.data.shopyesno) === "object" ? JSON.stringify(this.data.shopyesno) : this.data.shopyesno) ? "<view  class='bg-red flex justify-center'>  <view  class='action'>  " + (!(_typeof(this.data.weihu) === "object" ? JSON.stringify(this.data.weihu) : this.data.weihu) ? "<text > \\u3010" + (_typeof(this.data.shopname) === "object" ? JSON.stringify(this.data.shopname) : this.data.shopname) + "\\u3011\\u76EE\\u524D\\u5DF2\\u6253\\u6837  </text> " : "") + ((_typeof(this.data.weihu) === "object" ? JSON.stringify(this.data.weihu) : this.data.weihu) ? "<text > \\u805A\\u98DF\\u96C6\\u5E73\\u53F023:50-00:00\\u5B9A\\u671F\\u7EF4\\u62A4  </text> " : "") + " </view>  </view> " : "") + "<scroll-view  scroll-y='true' style='height:100vh;display: flex;' scroll-into-view='main-" + (_typeof(this.data.MainCur) === "object" ? JSON.stringify(this.data.MainCur) : this.data.MainCur) + "' bindscroll='VerticalMain'>  " + this.data.goods.map(function (item, index) {
        return "<view  wx:key='id'>  <view  class='goods' style='align-items: center; display: flex; height: 235rpx; margin: 0 40rpx 65rpx 40rpx; width: 100%;'>  <view  class='goodsImg' style='align-items: center; background-color: #cdb5d3; border-radius: 15rpx; display: flex; height: 100%; justify-content: center; width: 240rpx;'>  <image  src='" + (_typeof(item.img) === "object" ? JSON.stringify(item.img) : item.img) + "' mode='aspectFill' style='height: 94%; width: 94%;'>   </image>  </view> <view  class='goodsContent' style='height: 100%; line-height: 52rpx; padding: 0 0 0 19rpx; width: 58%;'>  <view  class='goodsName' style='-webkit-box-orient: vertical; -webkit-line-clamp: 2; display: -webkit-box; font-size: 30rpx; font-weight: 550; overflow: hidden; text-overflow: ellipsis; width: 100%; word-break: break-all;'> " + (_typeof(item.name) === "object" ? JSON.stringify(item.name) : item.name) + "  </view> <view  class='goodsBrief' style='color: rgba(58, 58, 58, 0.904); font-size: 26rpx; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 100%;'> \\u5F00\\u80C3\\u97E9\\u5F0F\\u6CE1\\u83DC + \\u4E94\\u5E38\\u5927\\u7C73 + \\u80A5\\u725B  </view> <view  class='goodsSold' style='color: rgba(78, 78, 78, 0.692); font-size: 24rpx; width: 100%;'> \\u6708\\u552E " + (_typeof(item.yuenumber) === "object" ? JSON.stringify(item.yuenumber) : item.yuenumber) + "  </view> <view  class='goodsPrice' style='color: #8984A8; font-family: inherit; font-size: 33rpx; position: relative; top: 27rpx;'>             \\uFFE5 <text  class='price' style='font-size: 43rpx; font-weight: 455; position: relative; right: 10rpx;'> " + (_typeof(item.price) === "object" ? JSON.stringify(item.price) : item.price) + "  </text>  </view> <view  class='goodsAdd' id='" + ((typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index) + "' bindtap='oneaddgoods' style='align-items: center; background-color: #8584A3; border-radius: 50rpx; bottom: 28rpx; display: flex; float: right; height: 45rpx; justify-content: center; position: relative; width: 45rpx;'>  <image  src='data:image/png;base64,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' style='height: 58%; width: 58%;'>   </image>  </view>  </view>  </view>  </view> ";
      }) + " </scroll-view>  </view> " : "") + (!(_typeof(this.data.tabbar) === "object" ? JSON.stringify(this.data.tabbar) : this.data.tabbar) ? "<view >  <view  class='hhh bg-gradual-green flex justify-center' style='undefined;" + (this.data.dark === 'dark' ? '    filter: invert(100%) !important;  ' : '') + "'>  <view  class='action'>  <text  class='cuIcon-title text-red'>   </text> <text > \\u5E73\\u53F0\\u8054\\u7CFB\\u65B9\\u5F0F\\uFF1A18403441128  </text>  </view>  </view> <view  class='  solid-bottom'>  <view  class='action' style='display: inline;'>  <view  class='flex'>  <text  class='cuIcon-location text-green'>   </text>  </view> " + (!(_typeof(this.data.havelocation) === "object" ? JSON.stringify(this.data.havelocation) : this.data.havelocation) ? "<view  style='padding-left:30rpx' bindtap='userlocation'>  <text  style='color:blue'> \\u70B9\\u51FB\\u8BBE\\u7F6E\\u5730\\u5740  </text>  </view> " : "") + "<view  style='padding-left:30rpx;font-size: 26rpx;' bindtap='userlocation'wx:else=''>  <text  class='text-bold'> " + (_typeof(this.data.userlocation.school) === "object" ? JSON.stringify(this.data.userlocation.school) : this.data.userlocation.school) + "-" + (_typeof(this.data.userlocation.location) === "object" ? JSON.stringify(this.data.userlocation.location) : this.data.userlocation.location) + "-" + (_typeof(this.data.userlocation.sushehao) === "object" ? JSON.stringify(this.data.userlocation.sushehao) : this.data.userlocation.sushehao) + "-" + (_typeof(this.data.userlocation.name) === "object" ? JSON.stringify(this.data.userlocation.name) : this.data.userlocation.name) + "-" + (_typeof(this.data.userlocation.tell) === "object" ? JSON.stringify(this.data.userlocation.tell) : this.data.userlocation.tell) + "  </text>  </view>  </view>  </view> <view  class='cu-bar solid-bottom'>  <view  class='action flex justify-between'>  <view >  <text  style='margin-left: -180%;;" + (this.data.dark === 'dark' ? '    filter: invert(100%) !important;  ' : '') + "' class='cuIcon-form text-green hhh'> \\u5168\\u90E8\\u8BA2\\u5355  </text>  </view>  </view> <view  style='padding-right:30rpx'>  <text  class='cuIcon-unfold lg' style='font-size: 2em; height: 175rpx; width: 175rpx;'>   </text>  </view>  </view> <view  class='cu-card case'>  " + this.data.mydingdan.map(function (item, index) {
        return "<view  wx:key='_id'>  <view  class='cu-item shadow' style='background-color: #fff; margin: 10rpx;'>  <view  class='cu-list menu-avatar'>  <view  class='flex radius text-bold solids-bottommy justify-between' style='border-bottom: 1rpx solid #eee; padding: 20rpx 0 20rpx 30rpx;'>  <view > " + (_typeof(item.shopname) === "object" ? JSON.stringify(item.shopname) : item.shopname) + " <text  style='font-size:20rpx'> (\\u4E0B\\u5355\\u65F6\\u95F4" + (_typeof(item.upday) === "object" ? JSON.stringify(item.upday) : item.upday) + "-" + (_typeof(item.uptime) === "object" ? JSON.stringify(item.uptime) : item.uptime) + ")  </text>  </view> <view  class='hhh' style='undefined;" + (_this.data.dark === 'dark' ? '    filter: invert(100%) !important;  ' : '') + "'>  " + ((_typeof(item.go) === "object" ? JSON.stringify(item.go) : item.go) == 0 ? "<view  class='text-yellow ' style='padding-right:20rpx'> \\u5F85\\u51FA\\u5355  </view> " : "") + ((_typeof(item.go) === "object" ? JSON.stringify(item.go) : item.go) > 0 ? "<view  class='text-green ' style='padding-right:20rpx'> \\u5DF2\\u51FA\\u5355  </view> " : "") + " </view>  </view> <view  style='padding: 10rpx 0;'>  <scroll-view  class='bg-white nav' style='margin: 0 20rpx;" + (_this.data.dark === 'dark' ? '    background-color: #000;  ' : '') + "'>  " + _this.data.item.buy.map(function (dingdanbuy, index) {
          return "<view  class='hhh' wx:key='id' wx:for-item='dingdanbuy' style='undefined;" + (_this.data.dark === 'dark' ? '    filter: invert(100%) !important;  ' : '') + "'>  <view  class='dingdanimg cu-list grid' style='display: inline-block; height: 90rpx; margin: 0 10rpx;'>  <image  class='cu-avatar xl' src='" + (_typeof(_this.data.dingdanbuy.img) === "object" ? JSON.stringify(_this.data.dingdanbuy.img) : _this.data.dingdanbuy.img) + "' style='display: flex; font-size: 2em; height: 175rpx; width: 175rpx;;" + (_this.data.dark === 'dark' ? '    filter: invert(100%) !important;  ' : '') + "'>  " + ((_typeof(_this.data.dingdanbuy.number) === "object" ? JSON.stringify(_this.data.dingdanbuy.number) : _this.data.dingdanbuy.number) > 1 ? "<view  class='cu-tag badge' style='top: 0rpx;right: 0rpx;'>                       " + (_typeof(_this.data.dingdanbuy.number) === "object" ? JSON.stringify(_this.data.dingdanbuy.number) : _this.data.dingdanbuy.number) + "                      </view> " : "") + " </image> <view  class='flex' style='width:128rpx'>  <text  class='text-cut'> " + (_typeof(_this.data.dingdanbuy.name) === "object" ? JSON.stringify(_this.data.dingdanbuy.name) : _this.data.dingdanbuy.name) + "  </text>  </view>  </view>  </view> ";
        }) + " </scroll-view> <view  class='flex solids-topmy justify-start' style='border-bottom: 1rpx solid #eee;'>  <view  style='padding:10rpx 20rpx 10rpx 20rpx'>  <text  style='color:grey;font-size:25rpx'> \\u5907\\u6CE8: " + ((_typeof(item.beizu) === "object" ? JSON.stringify(item.beizu) : item.beizu) ? "<block > " + (_typeof(item.beizu) === "object" ? JSON.stringify(item.beizu) : item.beizu) + "  </block> " : "") + "<block wx:else=''> \\u65E0  </block>  </text>  </view>  </view> <view  class='flex solids-topmy justify-start' style='border-bottom: 1rpx solid #eee;'>  <view  style='padding:0rpx 20rpx'>  <text  style='color:grey;font-size:25rpx'> " + (_typeof(item.school) === "object" ? JSON.stringify(item.school) : item.school) + "-" + (_typeof(item.location) === "object" ? JSON.stringify(item.location) : item.location) + "-" + (_typeof(item.sushehao) === "object" ? JSON.stringify(item.sushehao) : item.sushehao) + "-" + (_typeof(item.name) === "object" ? JSON.stringify(item.name) : item.name) + "-" + (_typeof(item.tell) === "object" ? JSON.stringify(item.tell) : item.tell) + "  </text>  </view>  </view> <view  class='flex solids-topmy justify-start' style='border-bottom: 1rpx solid #eee;'>  <view  style='padding:0rpx 20rpx'>  " + ((_typeof(item.school) === "object" ? JSON.stringify(item.school) : item.school) == '师范 ( 目前东门自取 ) ' ? "<text  style='color:grey;font-size:25rpx'> \\u5E08\\u8303:\\u5468\\u4E00\\u5230\\u5468\\u4E94\\u4E2D\\u5348\\u4E1C\\u95E8\\u81EA\\u53D6,\\u5468\\u4E94\\u4E0B\\u5348\\u5230\\u5468\\u65E5\\u9001\\u5230\\u5BBF\\u820D\\uFF01  </text> " : "") + " </view>  </view> <view  class='flex solids-topmy justify-start' style='border-bottom: 1rpx solid #eee;'>  <view  style='padding:0rpx 20rpx'>  <text  style='color:grey;font-size:25rpx'> \\u8BA2\\u5355\\u53F7\\uFF1A" + (_typeof(item.outTradeNo) === "object" ? JSON.stringify(item.outTradeNo) : item.outTradeNo) + "  </text>  </view>  </view> <view  class='flex solids-topmy justify-between' style='border-bottom: 1rpx solid #eee;'>  <view  style='padding:10rpx 20rpx 10rpx 20rpx'>  <text  style='font-size:35rpx'> " + (_typeof(item.yuyue) === "object" ? JSON.stringify(item.yuyue) : item.yuyue) + "  </text>  </view> <view  style='padding:10rpx 20rpx 10rpx 0'>  <text  style='color:grey;font-size:25rpx'> \\u5171" + (_typeof(item.totalnumber) === "object" ? JSON.stringify(item.totalnumber) : item.totalnumber) + "\\u4EF6  </text> <text  style='color:red;font-size:35rpx'> \\uFFE5" + (_typeof(item.totalprice) === "object" ? JSON.stringify(item.totalprice) : item.totalprice) + "  </text>  </view>  </view>  </view>  </view>  </view>  </view> ";
      }) + " </view>  </view> " : "") + "<view  class='flex' style='padding:50rpx'>   </view> <view  class='hhh' style='undefined;" + (this.data.dark === 'dark' ? '    filter: invert(100%) !important;  ' : '') + "'>  <view  class='box' style='width:100%;position:fixed;bottom:0;z-index:9999'>  <view  class='settle' style='background-color: rgb(255, 255, 255); height: 90rpx; width: 100%;'>  <view  class='settleAll' style='display: flex; flex-direction: row; float: right; font-size: 30rpx; height: 100%; width: 50%;'>  <view  class='calcAll' style='color: rgb(0, 0, 0); font-size: 28rpx; height: 100%; line-height: 43rpx; width: 60%;'>           \\u5408\\u8BA1\\uFF1A <text  style='color: #7C73A9; font-size: 30rpx; position: relative; right: 10rpx;'> \\uFFE5" + ((_typeof(this.data.totalprice) === "object" ? JSON.stringify(this.data.totalprice) : this.data.totalprice) == 0 ? '0.00' : _typeof(this.data.totalprice) === "object" ? JSON.stringify(this.data.totalprice) : this.data.totalprice) + "  </text> <view  class='freight' style='color: rgba(78, 78, 78, 0.692); float: right; font-size: 25rpx; margin-right: 35rpx;'> \\u4E0D\\u542B\\u8FD0\\u8D39  </view>  </view> <view  class='goSettle' style='align-items: center; background-color: #696BA4; color: rgb(255, 255, 255); display: flex; font-size: 26rpx; height: 100%; justify-content: center; width: 50%;'> \\u7ED3\\u7B97  </view>  </view>  </view> <view  class='cu-bar bg-white tabbar border shop' style='font-size:35rpx; height: 130rpx;;" + (this.data.dark === 'dark' ? '    background-color: #000;  ' : '') + "'>  <view  bindtap='tabbarshop' class1='bg-green submit " + ((_typeof(this.data.tabbar) === "object" ? JSON.stringify(this.data.tabbar) : this.data.tabbar) ? 'bg-green' : 'bg-white') + "'>  <text  class='cuIcon-shopfill'>  \\u5546\\u94FA  </text>  </view> <view  bindtap='tabbaruser' class1='bg-green submit " + ((_typeof(this.data.tabbar) === "object" ? JSON.stringify(this.data.tabbar) : this.data.tabbar) ? 'bg-white' : 'bg-green') + "'>  <text  class='cuIcon-my'> \\u6211\\u7684  </text>  </view>  </view> <view  class='body'>  " + this.data.data_show.map(function (item, index) {
        return "<view  class='body-describe'>  <text  class='body-describe-text'> " + (_typeof(item.name) === "object" ? JSON.stringify(item.name) : item.name) + ":  </text> <view  class='body-describe-data'> " + (_typeof(item.res) === "object" ? JSON.stringify(item.res) : item.res) + "  </view>  </view> ";
      }) + " </view> <view  class='end'>  <view  class='end-text' bindtap='Check'> \\u67E5\\u770B\\u516C\\u5F0F  </view>  </view>  </view>  </view> ";
      this.setData({ html: this.parse(html) });
    },

    data: {
      weihu: false,
      guige: false,
      goodsguigekouwei: [],
      goodsguigekouwei2: [],
      goods: [],
      guigeindex: '0',
      guigeindex2: '0',
      shopyesno: true,
      mydingdan: [], //订单
      mydindantotal: 0,
      skip: 0, //订单跳过前几条
      newuser: true,
      /* --------------------- */
      buy: [], //购物车
      totalprice: 0,
      totalnumber: 0,
      /* ---------------------- */
      tabbar: true,
      havelocation: false,
      /* --------------------- */
      modalName: false, //购物车弹出
      TabCur: '0',
      MainCur: 0,
      VerticalNavTop: 0,
      list: [],
      load: true,
      data_show: []
    },
    onLoad: function onLoad(option) {
      var _this2 = this;

      options = this.options;this.data.dark = wx.getSystemInfoSync().theme;wx.onThemeChange(function (e) {
        console.log(e.theme);_this2.setdata({ dark: e.theme });
      });this.setdata();
      console.log(option);
      var shop_id = 'uncanny';
      wx.showLoading({
        title: '加载中...',
        mask: true
      });
      var self = this;

      db.collection('shop').doc(shop_id).get().then(function (res) {

        wx.setStorage({
          key: "shop",
          data: res.data
        });
        console.log("goods", res.data.goods);
        self.setdata({
          shop_id: shop_id,
          caidan: res.data.caidan,
          goods: res.data.goods,
          goprice: res.data.goprice * 1,
          shopyesno: res.data.shopyesno,
          shopyesnoing: res.data.shopyesno,
          shopname: res.data.name,
          shopid: res.data.shopid
        });
        {
          console.log(123);
          /* if (nowtime >= "23:50" && nowtime <= "23:59") {
            self.setdata({
              weihu: true,
              shopyesno: false,
            })
          } */
          // 调用云函数获取用户openid
          wx.cloud.callFunction({
            name: 'login',
            env: 'mall-7gi19fir46652cb4',
            data: {},
            success: function success(loginres) {
              console.log('[云函数] [login] user openid: ', loginres.result.openid);
              app.globalData.openid = loginres.result.openid;
              db.collection('userinfo').where({
                _openid: loginres.result.openid
              }).get().then(function (userinfores) {
                if (userinfores.data.length > 0) {
                  wx.setStorage({
                    key: "userinfo",
                    data: userinfores.data[0]
                  });
                  self.setdata({
                    newuser: false,
                    username: userinfores.data[0].username,
                    usertximg: userinfores.data[0].usertximg,
                    userlocation: userinfores.data[0].userlocation,
                    havelocation: userinfores.data[0].havelocation
                  });

                  self.onShow();
                  console.log(res.data.caidan, 1233);
                  self.caidanxuanran(res.data.caidan);
                } else {
                  var args = wx.getStorageSync('args');
                  db.collection('userinfo').add({
                    data: {
                      _openid: loginres.result.openid,
                      username: args.username,
                      havelocation: false,
                      userlocation: {},
                      usertximg: args.iconUrl

                    } }).then(self.onShow());
                }
              });
            },
            fail: function fail(err) {
              console.error('[云函数] [login] 调用失败', err);
            }
          });
        }
        console.log(res.data);
      });
    },
    onShow: function onShow(e) {
      var self = this;
      var skip = self.data.skip;
      var userinfo = wx.getStorageSync('userinfo');
      this.setdata({ userlocation: userinfo.userlocation });

      if (!self.data.newuser) {
        db.collection('dindan').where({
          _openid: app.globalData.openid
        }).count().then(function (totalres) {

          if (totalres.total > 20) {
            skip = totalres.total - 20;
          }
          db.collection('dindan').where({
            _openid: app.globalData.openid
          }).skip(skip).limit(20).get().then(function (res) {

            self.setdata({
              mydindantotal: totalres.total,
              mydingdan: res.data.reverse()
            });
            wx.hideNavigationBarLoading();
            wx.stopPullDownRefresh();
            console.log(res.data);
          }).catch(function (err) {
            wx.hideNavigationBarLoading();
            wx.stopPullDownRefresh();
            console.error(err);
          });
        });
      }

      console.log(this.data.mydingdan, '55');
      wx.hideHomeButton();
    },

    /* 菜单渲染 */
    caidanxuanran: function caidanxuanran(e) {
      var caidan = e;
      var list = [{}];
      for (var i = 0; i < caidan.length; i++) {
        list[i] = {};
        list[i].name = caidan[i].name;
        list[i].id = i;
        list[i].myid = caidan[i].myid;
      }
      console.log(list, 233);
      this.setdata({
        list: list,
        listCur: list[0]
      });
      wx.hideLoading();
    },
    onReady: function onReady() {},
    tabSelect: function tabSelect(e) {
      this.setdata({
        TabCur: String(e.currentTarget.dataset.id),
        MainCur: e.currentTarget.dataset.id,
        VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
      });
    },
    VerticalMain: function VerticalMain(e) {
      var that = this;
      var list = this.data.list;
      console.log("list", list);
      var tabHeight = 0;
      if (this.data.load) {
        var _loop = function _loop(i) {
          var view = wx.createSelectorQuery().select("#main-" + list[i].id);
          view.fields({
            size: true
          }, function (data) {
            list[i].top = tabHeight;
            tabHeight = tabHeight + data.height;
            list[i].bottom = tabHeight;
          }).exec();
        };

        for (var i = 0; i < list.length; i++) {
          _loop(i);
        }
        that.setdata({
          load: false,
          list: list
        });
      }
      var scrollTop = e.detail.scrollTop + 20;
      for (var i = 0; i < list.length; i++) {
        if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
          that.setdata({
            VerticalNavTop: (list[i].id - 1) * 50,
            TabCur: String(list[i].id)
          });
          return false;
        }
      }
    },

    /* 第一次添加购物车 */
    oneaddgoods: function oneaddgoods(e) {
      var self = this;
      var newuser = self.data.newuser;
      console.log("newuser", newuser);
      console.log("e", e);
      if (newuser) {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1000
        });
      } else {
        var _self$setdata;

        var index = e.currentTarget.id;
        console.log("self.data.goods", self.data.goods);
        var goodsnumber = self.data.goods[index].number;
        var goodsdata = "goodt[" + index + "].number";
        var buy = this.data.buy;
        var goods = {
          guige: false,
          id: self.data.goods[index].id,
          img: self.data.goods[index].img,
          name: self.data.goods[index].name,
          price: self.data.goods[index].price,
          zhekou: self.data.goods[index].zhekou,
          zhekouprice: self.data.goods[index].zhekouprice,
          nowprice: self.data.goods[index].nowprice,
          shangpu: self.data.goods[index].shangpu, //所属商铺
          shopid: self.data.goods[index].shopid,
          number: 1, //用户购物车数量
          index: index //在goods列表里的index
        };
        buy.push(goods);
        self.data.goods[index].number += 1;
        self.setdata((_self$setdata = {
          buy: buy
        }, _defineProperty(_self$setdata, goodsdata, goodsnumber + 1), _defineProperty(_self$setdata, "goods", self.data.goods), _self$setdata));
        console.log(goodsnumber + 1);
        self.buy(buy);
      }
    },

    /* 购物车+1 */
    addgoods: function addgoods(e) {
      var self = this;
      var index = e.currentTarget.dataset.index;
      var goodsnumber = self.data.goods[index].number;
      var buy = self.data.buy;

      if (!self.data.goods[index].guige) {
        for (var i = 0; i < buy.length; i++) {
          if (buy[i].id == self.data.goods[index].id) {
            buy[i].number++;
          }
        }
        self.data.goods[index].number += 1;
        var goodsdata = "goods[" + index + "].number";
        self.setdata(_defineProperty({
          buy: buy,
          goods: self.data.goods
        }, goodsdata, goodsnumber + 1));

        self.buy(buy);
      }
    },

    /* 购物车-1 */
    reducenumber: function reducenumber(e) {
      var self = this;
      var index = e.currentTarget.dataset.index;
      var goodsnumber = self.data.goods[index].number;
      var goodsdata = 'goods[' + index + '].number';
      var buy = self.data.buy;
      for (var i = 0; i < buy.length; i++) {
        if (buy[i].id == self.data.goods[index].id) {
          if (buy[i].number == 1) {
            buy.splice(i, 1);
          } else {
            buy[i].number--;
            break;
          }
        }
      }
      if (goodsnumber > 0) {
        var _self$setdata3;

        console.log(buy);
        self.data.goods[index].number -= 1;
        self.setdata((_self$setdata3 = {
          buy: buy
        }, _defineProperty(_self$setdata3, goodsdata, goodsnumber - 1), _defineProperty(_self$setdata3, "goods", self.data.goods), _self$setdata3));

        self.buy(buy);
      }
      return res;
    },

    /* 购物车规格+1 */
    guigeaddgoods: function guigeaddgoods(e) {
      var self = this;
      var index = e.currentTarget.dataset.index;
      var goods = self.data.goods;
      var buy = self.data.buy;
      for (var i = 0; i < goods.length; i++) {
        if (buy[index].id == goods[i].id) {
          var goodsnumber = goods[i].number;
          var goodsdata = "goods[" + i + "].number";
          break;
        }
      }
      buy[index].number++;
      self.setdata(_defineProperty({
        buy: buy
      }, goodsdata, goodsnumber + 1));

      self.buy(buy);
    },

    /* 购物车规格-1 */
    guigereducenumber: function guigereducenumber(e) {
      var self = this;
      var index = e.currentTarget.dataset.index;
      var goods = self.data.goods;
      var buy = self.data.buy;
      for (var i = 0; i < goods.length; i++) {
        if (buy[index].id == goods[i].id) {
          var goodsnumber = self.data.goods[i].number;
          var goodsdata = 'goods[' + i + '].number';
          if (buy[index].number == 1) {
            buy.splice(index, 1);
            break;
          } else {
            buy[index].number--;
            break;
          }
        }
      }
      if (goodsnumber > 0) {
        console.log(buy);
        self.setdata(_defineProperty({
          buy: buy
        }, goodsdata, goodsnumber - 1));

        self.buy(buy);
      }
    },
    buy: function buy(_buy) {
      // var totalprice = 0
      // var totalnumber = 0
      // for (var i = 0; i < buy.length; i++) {
      //   if(buy[i].zhekou){
      //     totalprice = totalprice + buy[i].number * buy[i].zhekouprice
      //   }else{
      //     totalprice = totalprice + buy[i].number * buy[i].nowprice
      //   }
      //   totalnumber = totalnumber + buy[i].number
      // }

      var numberSum = _buy.reduce(function (numberSum, item) {
        return numberSum + item.number;
      }, 0);
      var priceSum = _buy.reduce(function (priceSum, item) {
        return priceSum + item.number * item.nowprice;
      }, 0);

      if (numberSum == 0) {
        this.setdata({
          modalName: false
        });
      }
      this.setdata({
        totalprice: priceSum.toFixed(2),
        totalTrue: priceSum.toFixed(2) < this.data.goprice,
        totalyuNumber: this.data.goprice - priceSum.toFixed(2),
        totalnumber: numberSum
      });
    },

    /* 购物车弹出 */
    showModal: function showModal(e) {
      if (this.data.buy.length != 0) {
        this.setdata({
          modalName: !this.data.modalName
        });
      }
    },
    hideModal: function hideModal(e) {
      this.setdata({
        modalName: false
      });
    },

    /* 商铺 */
    tabbarshop: function tabbarshop(e) {
      this.setdata({
        tabbar: true
      });
    },

    /* 个人 */
    tabbaruser: function tabbaruser(e) {
      this.setdata({
        tabbar: false
      });
    },

    /* 地址设置 */
    userlocation: function userlocation(e) {
      var shop_id = this.data.shop_id;
      console.log(shop_id);
      wx.navigateTo({
        url: '../HotTop/HotTop?content=地址&shop_id=' + shop_id
      });
    },

    /* 跳转支付 */
    pay: function pay(e) {
      var self = this;
      var buy = self.data.buy;
      wx.setStorage({
        key: "pay",
        data: {
          buy: buy,
          totalnumber: self.data.totalnumber,
          totalprice: self.data.totalprice
        }
      });
      wx.navigateTo({

        url: '../HotTop/HotTop?content=支付'
      });
    },

    /* 用户授权 */
    onGetUserInfo: function onGetUserInfo(e) {
      console.log(e);
      var self = this;
      var openid = app.globalData.openid;
      if (self.data.newuser && e.detail.userInfo) {
        wx.showLoading({
          mask: 'none',
          title: '用户信息建立中...'
        });
        db.collection('userinfo').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            username: e.detail.userInfo.nickName,
            usertximg: e.detail.userInfo.avatarUrl,
            userlocation: {},
            havelocation: false
          },
          success: function success(res) {
            wx.setStorage({
              key: "userinfo",
              data: {
                _id: res._id,
                _openid: openid,
                username: e.detail.userInfo.nickName,
                usertximg: e.detail.userInfo.avatarUrl,
                userlocation: {},
                havelocation: false
              }
            });
            self.setdata({
              newuser: false,
              username: e.detail.userInfo.nickName,
              usertximg: e.detail.userInfo.avatarUrl,
              userlocation: {},
              havelocation: false
            });
            console.log(res);
          },
          fail: console.error,
          complete: function complete(res) {
            wx.hideLoading();
          }
        });
      }
    },
    /* 下拉刷新 */
    onPullDownRefresh: function onPullDownRefresh() {
      if (!this.data.tabbar) {
        wx.showNavigationBarLoading();
        this.onShow();
      } else {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    },
    /* 选规格弹窗开启 */
    xuanguige: function xuanguige(e) {
      var self = this;
      var index = e.currentTarget.dataset.index;
      var goodsname = self.data.goods[index].name;
      var goodsguigekouwei = self.data.goods[index].guigekouwei;
      var goodsguigekouwei2 = self.data.goods[index].guigekouwei2;
      self.setdata({
        xuanguigegoodsindex: index,
        goodsname: goodsname,
        goodsguigekouwei: goodsguigekouwei,
        goodsguige2: self.data.goods[index].guige2,
        goodsguigekouwei2: goodsguigekouwei2,
        guige: true
      });
    },

    /* 选规格弹窗隐藏 */
    hidexuanguige: function hidexuanguige(e) {
      var self = this;
      self.setdata({
        guige: false
      });
    },

    /* 选规格-口味 */
    guigekouwei: function guigekouwei(e) {
      this.setdata({
        guigeindex: e.currentTarget.dataset.index
      });
    },
    guigekouwei2: function guigekouwei2(e) {
      this.setdata({
        guigeindex2: e.currentTarget.dataset.index
      });
    },

    /* 选规格加购物车 */
    guigeoneaddgoods: function guigeoneaddgoods(e) {
      console.log(13);
      var self = this;
      var index = self.data.xuanguigegoodsindex;
      var goodsnumber = self.data.goods[index].number;
      var goodsdata = "good[" + index + "].number";
      var buy = this.data.buy;
      if (self.data.goodsguige2) {
        var name = self.data.goods[index].name + "(" + self.data.goodsguigekouwei[self.data.guigeindex] + ")" + "(" + self.data.goodsguigekouwei2[self.data.guigeindex2] + ")";
      } else {
        var name = self.data.goods[index].name + "(" + self.data.goodsguigekouwei[self.data.guigeindex] + ")";
      }

      var goods = {
        guige: true,
        id: self.data.goods[index].id,
        img: self.data.goods[index].img,
        name: name,
        price: self.data.goods[index].price,
        zhekou: self.data.goods[index].zhekou,
        zhekouprice: self.data.goods[index].zhekouprice,
        nowprice: self.data.goods[index].nowprice,
        shangpu: self.data.goods[index].shangpu, //所属商铺
        shopid: self.data.goods[index].shopid,
        number: 1, //用户购物车数量
        index: index //在goods列表里的index
      };
      buy.push(goods);
      self.setdata(_defineProperty({
        guige: false,
        buy: buy
      }, goodsdata, goodsnumber + 1), function () {
        self.buy(buy);
      });
    },


    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function onHide() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function onUnload() {}

  }, _defineProperty(_Page, "onPullDownRefresh", function onPullDownRefresh() {}), _defineProperty(_Page, "onReachBottom", function onReachBottom() {}), _defineProperty(_Page, "onShareAppMessage", function onShareAppMessage() {}), _Page));
}
module.exports = runCode;
/******/ })()
;
//# sourceMappingURL=index.js.map