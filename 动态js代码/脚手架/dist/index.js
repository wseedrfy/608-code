/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!***********************!*\\
  !*** ./dist/index.js ***!
  \\***********************/


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function runCode() {

  var db = wx.cloud.database({ env: 'mall-7gi19fir46652cb4' });

  var Page = function Page(page) {
    return page;
  };
  return Page({

    onLoad: function onLoad(options) {
      options = this.options;
      this.setdata({});
    },

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
      var html = "<view class='bg-red flex justify-center'>\\t<view class='action'>\\t\\t" + (_typeof(this.data.userinfo.userlocation.school) === "object" ? JSON.stringify(this.data.userinfo.userlocation.school) : this.data.userinfo.userlocation.school == _typeof(this.data.sf) === "object" ? JSON.stringify(this.data.sf) : this.data.sf ? "<text >\\u6709\\u95EE\\u9898\\u8054\\u7CFB\\u7535\\u8BDD:xxxxx\\uFF01</text>" : "") + "\\t</view></view><view class='cu-card article'>\\t<view class='cu-item shadow' style='margin:30rpx 30rpx 0 30rpx' bindtap='location'>\\t\\t" + (_typeof(this.data.userinfo.havelocation) === "object" ? JSON.stringify(this.data.userinfo.havelocation) : this.data.userinfo.havelocation ? "<view >\\t\\t\\t<view class='title'>\\t\\t\\t\\t<view class='text-cut text-xl text-black text-bold'>\\t\\t\\t\\t\\t" + (_typeof(this.data.userinfo.userlocation.school) === "object" ? JSON.stringify(this.data.userinfo.userlocation.school) : this.data.userinfo.userlocation.school) + "-" + (_typeof(this.data.userinfo.userlocation.location) === "object" ? JSON.stringify(this.data.userinfo.userlocation.location) : this.data.userinfo.userlocation.location) + "-" + (_typeof(this.data.userinfo.userlocation.sushehao) === "object" ? JSON.stringify(this.data.userinfo.userlocation.sushehao) : this.data.userinfo.userlocation.sushehao) + "</view>\\t\\t\\t</view>\\t\\t\\t<view class='title' style='font-weight:10;line-height:30rpx'>\\t\\t\\t\\t<view class='text-cut'>" + (_typeof(this.data.userinfo.userlocation.name) === "object" ? JSON.stringify(this.data.userinfo.userlocation.name) : this.data.userinfo.userlocation.name) + "-" + (_typeof(this.data.userinfo.userlocation.tell) === "object" ? JSON.stringify(this.data.userinfo.userlocation.tell) : this.data.userinfo.userlocation.tell) + "</view>\\t\\t\\t</view>\\t\\t</view>" : "\\t\\t<view wx:else>\\t\\t\\t<view class='title'>\\t\\t\\t\\t<view class='text-cut text-xl text-black text-bold text-blue'>\\u70B9\\u51FB\\u6DFB\\u52A0\\u5730\\u5740</view>\\t\\t\\t</view>\\t\\t</view>") + "\\t</view></view><view class='cu-card article'>\\t<view class='cu-item shadow' style='margin:10rpx 30rpx;padding-bottom:0'>\\t\\t<view class='title'>\\t\\t\\t<view class='text-cut text text-black'>" + (_typeof(this.data.shop.name) === "object" ? JSON.stringify(this.data.shop.name) : this.data.shop.name) + "</view>\\t\\t</view>\\t\\t" + this.data.buy.buy.map(function (item, index) {
        return " <view >\\t\\t\\t<view class='padding-xs flex align-center'>\\t\\t\\t\\t<image style='cu-avatar radius lg' src='" + (_typeof(item.img) === "object" ? JSON.stringify(item.img) : item.img) + "' style='font-size: 2em; height: 130rpx; left: 20rpx; width: 130rpx;'></image>\\t\\t\\t\\t<view class='flex-sub' style='padding-left: 30rpx;'>\\t\\t\\t\\t\\t<view class=' text-xl'>\\t\\t\\t\\t\\t\\t<text class='text-black text-bold'>" + (_typeof(item.name) === "object" ? JSON.stringify(item.name) : item.name) + "</text>\\t\\t\\t\\t\\t</view>\\t\\t\\t\\t\\t<view style='font-size: 30rpx;'>\\uFFE5" + (_typeof(item.nowprice) === "object" ? JSON.stringify(item.nowprice) : item.nowprice) + "X" + (_typeof(item.number) === "object" ? JSON.stringify(item.number) : item.number) + "</view>\\t\\t\\t\\t</view>\\t\\t\\t\\t<view class='cu-avatar radius lg' style='background-color: white; font-size: 2em; height: 130rpx; width: 130rpx;'>\\t\\t\\t\\t\\t<text style='color:black;font-size:40rpx'></text>\\t\\t\\t\\t</view>\\t\\t\\t</view>\\t\\t</view>";
      }) + "\\t\\t<view class='flex title justify-end solids-top' style='font-weight:10'>\\t\\t\\t<view class='text-cut text-xxl'>\\t\\t\\t\\t<text class='text-red text-bold'>\\uFFE5" + (_typeof(this.data.buy.totalprice) === "object" ? JSON.stringify(this.data.buy.totalprice) : this.data.buy.totalprice) + "</text>\\t\\t\\t</view>\\t\\t</view>\\t</view></view><view class='cu-card article'>\\t<view class='cu-item shadow' style='margin:10rpx 30rpx;padding-bottom:0'>\\t\\t<view class='cu-form-group'>\\t\\t\\t<view>\\u9884\\u7EA6\\u60C5\\u51B5</view>\\t\\t\\t<picker bindchange='PickerChange' value='" + (_typeof(this.data.index) === "object" ? JSON.stringify(this.data.index) : this.data.index) + "' range='" + (_typeof(this.data.picker) === "object" ? JSON.stringify(this.data.picker) : this.data.picker) + "'>\\t\\t\\t\\t<view class='picker'>\\t\\t\\t\\t\\t" + (_typeof(this.data.picker[_typeof(this.data.index) === "object" ? JSON.stringify(this.data.index) : this.data.index]) === "object" ? JSON.stringify(this.data.picker[_typeof(this.data.index) === "object" ? JSON.stringify(this.data.index) : this.data.index]) : this.data.picker[_typeof(this.data.index) === "object" ? JSON.stringify(this.data.index) : this.data.index]) + "\\t\\t\\t\\t</view>\\t\\t\\t</picker>\\t\\t</view>\\t</view></view><view class='cu-card article'>\\t<view class='shadow' style='margin:10rpx 60rpx;padding-bottom:0'>\\t\\t<text decode='true'>\\u6CE8\\uFF1A\\u4E0A\\u534811\\u70B9\\u4E4B\\u540E\\u4E0D\\u53EF\\u9884\\u7EA6\\u4ECA\\u5929\\u4E2D\\u5348\\uFF0C&emsp;&emsp;\\u4E0B\\u534817\\u70B9\\u4E4B\\u540E\\u4E0D\\u53EF\\u9884\\u7EA6\\u4ECA\\u5929\\u665A\\u4E0A</text>" + (_typeof(this.data.userinfo.userlocation.school) === "object" ? JSON.stringify(this.data.userinfo.userlocation.school) : this.data.userinfo.userlocation.school == _typeof(this.data.sf) === "object" ? JSON.stringify(this.data.sf) : this.data.sf ? "<text decode='true' >\\u5E08\\u8303:&emsp;&emsp;\\u5468\\u4E00\\u5230\\u5468\\u4E94\\u4E2D\\u5348\\u4E1C\\u95E8\\u81EA\\u53D6&emsp;&emsp;\\u5468\\u4E94\\u4E0B\\u5348\\u5230\\u5468\\u65E5\\u9001\\u5230\\u5BBF\\u820D\\uFF01</text>" : "") + "\\t</view></view><view class='cu-card article'>\\t<view class='cu-item shadow' style='margin:0rpx 30rpx 0 30rpx'>\\t\\t<view class='title'>\\t\\t\\t<view class='text-cut text-xl text-black text-bold'>\\u5907\\u6CE8</view>\\t\\t</view>\\t\\t<view class='cu-form-group'>\\t\\t\\t<textarea bindinput='beizu' style='margin: 0rpx' maxlength='-1' placeholder='\\u8BF7\\u5907\\u6CE8\\u5FCC\\u53E3\\u3001\\u9700\\u6C42'></textarea>\\t\\t</view>\\t</view></view>" + (_typeof(this.data.allok) === "object" ? JSON.stringify(this.data.allok) : this.data.allok ? "<view  class='padding flex flex-direction'>\\t<button bindtap='newpay' class='cu-btn bg-green margin-tb-sm lg'>\\u652F\\u4ED8</button>\\t</view>" : "3");
      this.setData({ html: this.parse(html) });
    },

    data: {
      shop: { name: '' },
      buy: { buy: [] },
      allok: false,
      sf: "师范(目前东门自取)",
      freepay: false,
      index: '0',
      beizu: '',
      picker: ['预约今天中午', '预约今天晚上', '预约明天中午', '预约明天晚上'],
      userinfo: { userlocation: {} }
    },

    onShow: function onShow(options) {
      wx.showLoading({
        mask: true,
        title: '获取订单信息...'
      });
      var self = this;
      db.collection('zzzTEXT').doc('test').get().then(function (res) {
        console.log(res.data.freepay);
        self.setdata({
          freepay: res.data.freepay
        });
      });
      wx.cloud.callFunction({
        // 要调用的云函数名称
        name: 'time',
        config: {
          env: 'mall-7gi19fir46652cb4'
        },

        // 传递给云函数的参数
        data: {},
        success: function success(res) {

          var nowtime = dayjs(res.result.time).format('HH:mm');
          console.log(11);
          if (nowtime < "11") {
            self.setdata({
              oldindex: '0',
              index: '0'
            });
          }
          console.log(12);
          if (nowtime >= "11" && nowtime < "17") {
            self.setdata({
              oldindex: '1',
              index: '1'
            });
          }
          console.log(13);
          if (nowtime >= "17") {
            self.setdata({
              oldindex: '2',
              index: '2'
            });
          }
          console.log(11);
          wx.getStorage({
            key: 'userinfo',
            success: function success(res) {
              wx.getStorage({
                key: 'pay',
                success: function success(pay) {
                  wx.getStorage({
                    key: 'shop',
                    success: function success(shop) {
                      console.log(shop.data, 233);
                      console.log(pay.data);
                      self.setdata({
                        shop: shop.data,
                        userinfo: res.data,
                        buy: pay.data
                      });

                      wx.hideLoading();
                      self.setdata({
                        allok: true
                      });
                    }
                  });
                }
              });
            }
          });
        },
        fail: function fail(err) {
          // this.onShow();
        },
        complete: function complete() {

          // ...
        }
      });
    },
    /* onShow(e) {
      var self = this
      wx.showLoading({
        mask:true,
        title: '加载中...',
      })
      
    }, */
    /* 备注 */
    beizu: function beizu(e) {
      this.setdata({
        beizu: e.detail.value
      });
    },
    PickerChange: function PickerChange(e) {
      console.log(e);

      console.log(e.detail.value);
      var oldindex = this.data.oldindex;
      console.log("old:" + oldindex);
      if (oldindex <= e.detail.value) {
        console.log("更新");
        this.setdata({
          index: e.detail.value
        });
      } else {
        wx.showToast({
          icon: "none",
          title: '不在规定时间内'
        });
      }
    },

    /* 地址设置 */
    location: function location(e) {
      wx.navigateTo({
        url: '../HotTop/HotTop?content=地址&pay=' + true
      });
    },
    testpay: function testpay(e) {
      wx.showLoading({
        mask: true,
        title: '正在调起支付...'
      });
      var self = this;
      var shopdayin = self.data.dayin;
      var shop_id = self.data.shop._id; //商铺编号
      var shopid = self.data.shop.shopid; //商铺编号
      var shopname = self.data.shop.name; //商铺名称
      var totalprice = parseFloat(self.data.buy.totalprice).toFixed(2);
      var aaaa = totalprice.split(".");
      var price = aaaa[0] + aaaa[1];
      var outTradeNo = shopid + 'A' + price + "F" + new Date().getTime(); //商户订单号
      var userinfo = self.data.userinfo;
      var buy = self.data.buy.buy; //商品内容
      var totalnumber = self.data.buy.totalnumber; //商品数量
      //商品价格
      var day = dayjs().format('YYYY-MM-DD');
      if (self.data.index > 1) {
        var day = dayjs().add(1, 'day').format('YYYY-MM-DD');
      } else {}
      var yuyue = self.data.picker[self.data.index]; //预约情况
      var beizu = self.data.beizu; //备注
      var xxlocation = userinfo.userlocation.location + '-' + userinfo.userlocation.sushehao + '-' + userinfo.userlocation.name + '-' + userinfo.userlocation.tell;
      if (userinfo.userlocation.tell) {
        var dingdan = {
          go: 0, //出单情况  0待出  1已出单
          day: day, //下单所属日期，预约明天天数加一
          upday: dayjs().format('YYYY-MM-DD'), //下单日期
          uptime: dayjs().format('HH:mm:ss'), //下单时间
          outTradeNo: outTradeNo, //商户订单号
          school: userinfo.userlocation.school, //地址
          location: userinfo.userlocation.location, //地址
          sushehao: userinfo.userlocation.sushehao,
          name: userinfo.userlocation.name,
          tell: userinfo.userlocation.tell,
          shopid: shopid, //商家id
          shopname: shopname, //商家名字
          buy: buy, //商品
          yuyue: yuyue, //预约情况
          beizu: beizu, //备注
          totalnumber: totalnumber, //总件数
          totalprice: parseFloat(parseFloat(totalprice).toFixed(2)) //总价
        };

        db.collection('dindan').add({
          data: dingdan,
          success: function success(res) {
            wx.cloud.callFunction({
              // 要调用的云函数名称
              name: 'goodsyuenumber',
              config: {
                env: 'mall-7gi19fir46652cb4'
              },
              // 传递给云函数的event参数
              data: {
                shopid: shop_id,
                buy: buy
              }
            }).then(function (res) {
              /* util.test(shopdayin,dingdan,shopname) */
              console.log(res);
            }).catch(function (err) {
              console.log(err);
            });

            /* wx.cloud.callFunction({
              // 要调用的云函数名称
              name: 'goodsdaynumber',
              // 传递给云函数的event参数
              data: {
                shopid: shop_id,
                buy: buy
              }
            }).then(res => {
              
            }).catch(err => {
              console.log(err)
            }) */
            wx.hideLoading();
            wx.reLaunch({
              url: '../HotTop/HotTop?content=商场&shop_id=' + shop_id
            });
          },
          fail: console.error,
          complete: console.log
        });
      } else {
        wx.showToast({
          icon: "none",
          title: '请添加送餐地址'
        });
      }
      console.log(dingdan);
    },
    pay: function pay(e) {
      wx.showLoading({
        mask: true,
        title: '正在调起支付...'
      });
      var self = this;
      var num = self.createNonceStr();
      var shopdayin = self.data.dayin;
      var shop_id = self.data.shop._id; //商铺编号
      var shopid = self.data.shop.shopid; //商铺编号
      var shopname = self.data.shop.name; //商铺名称
      var totalprice = parseFloat(self.data.buy.totalprice).toFixed(2); //商品价格
      var aaaa = totalprice.split(".");
      var price = aaaa[0] + aaaa[1];
      var timeStamp = new Date().getTime();
      var outTradeNo = shopid + 'A' + price + "F" + num; //商户订单号
      console.log();
      var userinfo = self.data.userinfo;
      var buy = self.data.buy.buy; //商品内容
      var totalnumber = self.data.buy.totalnumber; //商品数量
      if (self.data.index > 1) {
        var day = dayjs().add(1, 'day').format('YYYY-MM-DD');
      } else {
        var day = dayjs().format('YYYY-MM-DD');
      }
      var yuyue = self.data.picker[self.data.index]; //预约情况
      var beizu = self.data.beizu; //备注
      var xxlocation = userinfo.userlocation.location + '-' + userinfo.userlocation.sushehao + '-' + userinfo.userlocation.name + '-' + userinfo.userlocation.tell;
      console.log(userinfo.userlocation.tell);
      console.log(xxlocation.length);
      if (userinfo.userlocation.tell) {
        var dingdan = {
          go: 0, //出单情况  0待出  1已出单
          day: day, //下单所属日期，预约明天天数加一
          upday: dayjs().format('YYYY-MM-DD'), //下单日期
          uptime: dayjs().format('HH:mm:ss'), //下单时间
          outTradeNo: outTradeNo, //商户订单号
          school: userinfo.userlocation.school, //地址
          location: userinfo.userlocation.location, //地址
          sushehao: userinfo.userlocation.sushehao,
          name: userinfo.userlocation.name,
          tell: userinfo.userlocation.tell,
          shopid: shopid, //商家id
          shopname: shopname, //商家名字
          buy: buy, //商品
          yuyue: yuyue, //预约情况
          beizu: beizu, //备注
          totalnumber: totalnumber, //总件数
          totalprice: parseFloat(parseFloat(totalprice).toFixed(2)) //总价
        };

        wx.cloud.callFunction({
          name: 'pay',
          config: {
            env: 'mall-7gi19fir46652cb4'
          },
          data: {
            beizu: beizu,
            yuyue: yuyue,
            buy: buy,
            shangpuname: shopname,
            outTradeNo: outTradeNo,
            price: price
          },
          success: function success(res) {
            wx.hideLoading();
            console.log('获取支付参数成功：', res);
            var payment = res.result.payment;
            console.log('获取支付参数成功：', payment);

            wx.requestPayment(Object.assign(payment, {
              success: function success(res) {
                console.log('支付成功：', res);
                db.collection('dindan').add({
                  data: dingdan,
                  success: function success(res) {
                    wx.cloud.callFunction({
                      // 要调用的云函数名称
                      name: 'goodsyuenumber',
                      config: {
                        env: 'mall-7gi19fir46652cb4'
                      },
                      // 传递给云函数的event参数
                      data: {
                        shopid: shop_id,
                        buy: buy
                      }
                    }).then(function (res) {
                      wx.showToast({
                        title: '成功',
                        icon: 'success',
                        duration: 2000
                      });
                      setTimeout(function () {
                        wx.reLaunch({
                          url: '../HotTop/HotTop?content=商场&shop_id=' + shop_id
                        });
                      }, 1500);
                      wx.hideLoading();
                    }).catch(function (err) {
                      console.log(err);
                    });
                    /* util.test(shopdayin,dingdan,shopname) */
                  },
                  fail: console.error,
                  complete: console.log
                });
              },
              fail: function fail(err) {
                console.error('支付失败：', err);
              }
            }));
          },
          fail: function fail(res) {
            console.log('获取支付参数失败：' + res);
          }
        });
      } else {
        wx.hideLoading();
        wx.showToast({
          icon: "none",
          title: '请添加送餐地址'
        });
      }
    },
    newpay: function newpay(e) {
      wx.showLoading({
        mask: true,
        title: '正在调起支付...'
      });
      var self = this;
      var num = self.createNonceStr();
      var shopdayin = self.data.dayin;
      var shop_id = self.data.shop._id; //商铺编号
      var shopid = self.data.shop.shopid; //商铺编号
      var shopname = self.data.shop.name; //商铺名称
      var totalprice = parseFloat(self.data.buy.totalprice).toFixed(2); //商品价格
      var aaaa = totalprice.split(".");
      var price = aaaa[0] + aaaa[1];
      var timeStamp = new Date().getTime();
      var outTradeNo = "A" + timeStamp + "F" + num; //商户订单号
      console.log(outTradeNo);
      var userinfo = self.data.userinfo;
      var buy = self.data.buy.buy; //商品内容
      var totalnumber = self.data.buy.totalnumber; //商品数量
      var day = dayjs().format('YYYY-MM-DD');
      if (self.data.index > 1) {
        var day = dayjs().add(1, 'day').format('YYYY-MM-DD');
      } else {}
      var yuyue = self.data.picker[self.data.index]; //预约情况
      var beizu = self.data.beizu; //备注
      var xxlocation = userinfo.userlocation.location + '-' + userinfo.userlocation.sushehao + '-' + userinfo.userlocation.name + '-' + userinfo.userlocation.tell;
      console.log(userinfo.userlocation.tell);
      console.log(xxlocation.length);
      if (userinfo.userlocation.tell) {
        var dingdan = {
          _id: outTradeNo,
          go: 0, //出单情况  0待出  1已出单
          day: day, //下单所属日期，预约明天天数加一
          upday: dayjs().format('YYYY-MM-DD'), //下单日期
          uptime: dayjs().format('HH:mm:ss'), //下单时间
          outTradeNo: outTradeNo, //商户订单号
          location: userinfo.userlocation.location, //地址
          school: userinfo.userlocation.school,
          sushehao: userinfo.userlocation.sushehao,
          name: userinfo.userlocation.name,
          tell: userinfo.userlocation.tell,
          shopid: shopid, //商家id
          shopname: shopname, //商家名字
          buy: buy, //商品
          yuyue: yuyue, //预约情况
          beizu: beizu, //备注
          totalnumber: totalnumber, //总件数
          totalprice: parseFloat(parseFloat(totalprice).toFixed(2)) //总价
        };
        db.collection('zdindan').add({
          data: dingdan,
          success: function success(res) {
            wx.cloud.callFunction({
              name: 'newpay',
              config: {
                env: 'mall-7gi19fir46652cb4'
              },
              data: {
                buy: buy,
                dingdan: dingdan,
                shangpuname: shopname,
                outTradeNo: outTradeNo,
                price: price
              },
              success: function success(res) {
                wx.hideLoading();
                console.log('获取支付参数成功：', res);
                var payment = res.result.payment;
                console.log('获取支付参数成功：', payment);
                wx.requestPayment(Object.assign(payment, {
                  success: function success(res) {
                    console.log('支付成功：', res);
                    db.collection('dindan').where({
                      _id: outTradeNo
                    }).count().then(function (res) {
                      console.log(res.total);
                      if (res.total == 0) {
                        db.collection('dindan').add({
                          data: dingdan,
                          success: function success(res) {
                            wx.cloud.callFunction({
                              // 要调用的云函数名称
                              name: 'goodsyuenumber',
                              config: {
                                env: 'mall-7gi19fir46652cb4'
                              },
                              // 传递给云函数的event参数
                              data: {
                                shopid: shop_id,
                                buy: buy
                              }
                            }).then(function (res) {
                              wx.showToast({
                                title: '成功',
                                icon: 'success',
                                duration: 2000
                              });
                              setTimeout(function () {
                                wx.reLaunch({
                                  url: '../HotTop/HotTop?content=商场&shop_id=' + shop_id
                                });
                              }, 1500);
                              wx.hideLoading();
                            }).catch(function (err) {
                              console.log(err);
                            });
                            /* util.test(shopdayin,dingdan,shopname) */
                          },
                          fail: console.error,
                          complete: console.log
                        });
                      }
                    });
                  },
                  fail: function fail(err) {
                    db.collection('zdindan').doc(outTradeNo).remove().then(console.log).catch(console.error);
                    wx.hideLoading();
                    console.error('支付失败：', err);
                  }
                }));
              },
              fail: function fail(res) {
                db.collection('zdindan').doc(outTradeNo).remove().then(console.log).catch(console.error);
                wx.hideLoading();
                console.log('获取支付参数失败：' + res);
              }
            });
          },
          fail: function fail(res) {
            wx.hideLoading();
            console.log('获取支付参数失败：' + res);
          },
          complete: console.log
        });
      } else {
        wx.hideLoading();
        wx.showToast({
          icon: "none",
          title: '请添加送餐地址'
        });
      }
    },


    createNonceStr: function createNonceStr() {
      var str = "",
          range = 7,
          //min
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

      // 随机产生
      /* if (true) {
        range = Math.round(Math.random() * (36 - 20)) + 20;
      } */
      for (var i = 0; i < range; i++) {
        var pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
      }
      return str;
    }

  });
}
module.exports = runCode;
/******/ })()
;
//# sourceMappingURL=index.js.map