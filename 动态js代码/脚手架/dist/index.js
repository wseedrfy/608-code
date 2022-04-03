/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!***********************!*\\
  !*** ./dist/index.js ***!
  \\***********************/


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function runCode() {

  var db = wx.cloud.database();

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

      for (var i in dictData) {
        this.data[i] = dictData[i];
      }
      var html = "<view  class='containers' style='background-size: 100% 100%; height: 100%; position: fixed; width: 100%; z-index: -1;'>  <image  class='bgc' src='../images/bgc.png' style='height: 100%; width: 100%;'>   </image>  </view> <view  class='title'>  " + ((_typeof(this.data.id_) === "object" ? JSON.stringify(this.data.id_) : this.data.id_) <= 7 ? "<view  class='model' animation='" + (_typeof(this.data.animationData) === "object" ? JSON.stringify(this.data.animationData) : this.data.animationData) + "' style='background-color: white; border-radius: 50rpx; height: 700rpx; margin: 0rpx auto; position: relative; top: 30vh; width: 72%; z-index: 99;'>  <view  class='model-top' style='align-items: center; background-color: rgba(234,129,113); border-radius: 50rpx 50rpx 0rpx 0rpx; color: white; display: flex; font-size: 32rpx; justify-content: center; padding: 30rpx 0rpx;'> " + (_typeof([_typeof(this.data.id_) === "object" ? JSON.stringify(this.data.id_) : this.data.id_]) === "object" ? JSON.stringify([_typeof(this.data.id_) === "object" ? JSON.stringify(this.data.id_) : this.data.id_]) : [_typeof(this.data.id_) === "object" ? JSON.stringify(this.data.id_) : this.data.id_]) + "  </view> <view  class='model-body ' style='display: flex; height: 47%; justify-content: center; margin-left: 20rpx; margin-right: 20rpx; margin-top: 22%;;model-body " + ((_typeof(this.data.click) === "object" ? JSON.stringify(this.data.click) : this.data.click) != 0 ? '  width: 40%;  height:95%;  transition: all .5s;' : '') + "'>  <view  bindtouchstart='touchstartX' class='model-body-choose-1 ' bindtap='choose_ans' data-index='1' style='align-items: center; background-color: #b9cfeb; border-radius: 40rpx; box-sizing: border-box; color: white; display: flex; font-size: 40rpx; height: 100%; justify-content: center; margin: 0rpx 20rpx; padding: 10rpx; transition: all .5s; white-space: normal; width: 45%; word-wrap: break-word;;model-body-choose-1 " + ((_typeof(this.data.click) === "object" ? JSON.stringify(this.data.click) : this.data.click) == 1 ? 'model-body-choose-1-true' : '') + "'>  <text  class='model-body-choose-text ' style='text-align: center; transition: all .5s; width: 100%;;model-body-choose-text " + ((_typeof(this.data.click) === "object" ? JSON.stringify(this.data.click) : this.data.click) == 1 ? 'model-body-choose-text-1-true' : '') + "'> " + (_typeof([_typeof(this.data.id_) === "object" ? JSON.stringify(this.data.id_) : this.data.id_]) === "object" ? JSON.stringify([_typeof(this.data.id_) === "object" ? JSON.stringify(this.data.id_) : this.data.id_]) : [_typeof(this.data.id_) === "object" ? JSON.stringify(this.data.id_) : this.data.id_]) + "  </text>  </view> <view  bindtap='test' bindtouchstart='touchstartX' class='model-body-choose-2 ' data-index='2' style='align-items: center; background-color: #b9cfeb; border-radius: 40rpx; box-sizing: border-box; color: white; display: flex; font-size: 40rpx; height: 100%; justify-content: center; margin: 0rpx 20rpx; padding: 10rpx; transition: all .5s; white-space: normal; width: 45%; word-wrap: break-word;;model-body-choose-2 " + ((_typeof(this.data.click) === "object" ? JSON.stringify(this.data.click) : this.data.click) == 2 ? 'model-body-choose-2-true' : '') + "'>  <text  class='model-body-choose-text ' style='text-align: center; transition: all .5s; width: 100%;;model-body-choose-text " + ((_typeof(this.data.click) === "object" ? JSON.stringify(this.data.click) : this.data.click) == 2 ? 'model-body-choose-text-2-true' : '') + "'> " + (_typeof([_typeof(this.data.id_) === "object" ? JSON.stringify(this.data.id_) : this.data.id_]) === "object" ? JSON.stringify([_typeof(this.data.id_) === "object" ? JSON.stringify(this.data.id_) : this.data.id_]) : [_typeof(this.data.id_) === "object" ? JSON.stringify(this.data.id_) : this.data.id_]) + "  </text>  </view>  </view> <view  class='model-bottom'>  <view  class='model-bottom2' style='align-items: center; color: rgba(234,129,113); display: flex; justify-content: center; margin-top: 4%;'> " + ((_typeof(this.data.id_) === "object" ? JSON.stringify(this.data.id_) : this.data.id_) + 1) + "/8  </view>  </view>  </view> " : "") + "<view  class='model-end' style='background-color: rgba(234,129,113); border-radius: 20rpx; box-shadow: 2rpx 2rpx 2rpx rgba(234,129,113); color: white; display: " + ((_typeof(this.data.id_) === "object" ? JSON.stringify(this.data.id_) : this.data.id_) == 0 || id_ >= 8 ? 'none' : 'block') + "; left: 210rpx; padding: 20rpx 0rpx; position: absolute; text-align: center; top: 90%; width: 45%; z-index: 999;' bindtap='choose_return'> \\u4E0A\\u4E00\\u9898  </view> " + ((_typeof(this.data.id_) === "object" ? JSON.stringify(this.data.id_) : this.data.id_) <= 6 ? "<view  class='model3' animation='" + (_typeof(this.data.animationData2) === "object" ? JSON.stringify(this.data.animationData2) : this.data.animationData2) + "' style='background-color: white; border-radius: 50rpx; height: 700rpx; left: 20%; margin: 0rpx auto; position: absolute; top: 32vh; width: 70%; z-index: 55;'>  <view  class='model-top' style='align-items: center; background-color: rgba(234,129,113); border-radius: 50rpx 50rpx 0rpx 0rpx; color: white; display: flex; font-size: 32rpx; justify-content: center; padding: 30rpx 0rpx;'> " + (_typeof([(_typeof(this.data.id_) === "object" ? JSON.stringify(this.data.id_) : this.data.id_) + 1]) === "object" ? JSON.stringify([(_typeof(this.data.id_) === "object" ? JSON.stringify(this.data.id_) : this.data.id_) + 1]) : [(_typeof(this.data.id_) === "object" ? JSON.stringify(this.data.id_) : this.data.id_) + 1]) + "  </view> <view  class='model-body' style='display: flex; height: 47%; justify-content: center; margin-left: 20rpx; margin-right: 20rpx; margin-top: 22%;'>  <view  bindtouchstart='touchstartX' class='model-body-choose-1 ' bindtap='choose_ans' data-index='1' style='align-items: center; background-color: #b9cfeb; border-radius: 40rpx; box-sizing: border-box; color: white; display: flex; font-size: 40rpx; height: 100%; justify-content: center; margin: 0rpx 20rpx; padding: 10rpx; transition: all .5s; white-space: normal; width: 45%; word-wrap: break-word;;model-body-choose-1 " + ((_typeof(this.data.click) === "object" ? JSON.stringify(this.data.click) : this.data.click) == 1 ? 'model-body-choose-1-true' : '') + "'>  <text  class='model-body-choose-text' style='text-align: center; transition: all .5s; width: 100%;'> " + (_typeof([(_typeof(this.data.id_) === "object" ? JSON.stringify(this.data.id_) : this.data.id_) + 1]) === "object" ? JSON.stringify([(_typeof(this.data.id_) === "object" ? JSON.stringify(this.data.id_) : this.data.id_) + 1]) : [(_typeof(this.data.id_) === "object" ? JSON.stringify(this.data.id_) : this.data.id_) + 1]) + "  </text>  </view> <view  bindtap='test' bindtouchstart='touchstartX' class='model-body-choose-2' data-index='2' style='align-items: center; background-color: #b9cfeb; border-radius: 40rpx; box-sizing: border-box; color: white; display: flex; font-size: 40rpx; height: 100%; justify-content: center; margin: 0rpx 20rpx; padding: 10rpx; transition: all .5s; white-space: normal; width: 45%; word-wrap: break-word;'>  <text  class='model-body-choose-text' style='text-align: center; transition: all .5s; width: 100%;'> " + (_typeof([(_typeof(this.data.id_) === "object" ? JSON.stringify(this.data.id_) : this.data.id_) + 1]) === "object" ? JSON.stringify([(_typeof(this.data.id_) === "object" ? JSON.stringify(this.data.id_) : this.data.id_) + 1]) : [(_typeof(this.data.id_) === "object" ? JSON.stringify(this.data.id_) : this.data.id_) + 1]) + "  </text>  </view>  </view> <view  class='model-bottom'>  <view  class='model-bottom2' style='align-items: center; color: rgba(234,129,113); display: flex; justify-content: center; margin-top: 4%;'> " + ((_typeof(this.data.id_) === "object" ? JSON.stringify(this.data.id_) : this.data.id_) + 1) + "/8  </view>  </view>  </view> " : "") + "<view  class='model2' wx:elif='" + ((_typeof(this.data.id_) === "object" ? JSON.stringify(this.data.id_) : this.data.id_) >= 8) + "' style='background-color: #74b9ff; border-radius: 50rpx; margin: 0rpx auto; padding-bottom: 30rpx; position: relative; top: 20vh; width: 72%;'>  <canvas  type='2d' class='model2_canvas' id='shareCanvas' style='background-color: #74b9ff; border-radius: 50rpx; height: 800rpx; width: 100%;'>   </canvas> <!--  class='show'>  <view  class='imgs'>  <image  class='img' src='../images/touxiang.png' mode='widthFix'>   </image>  </view> <view  class='show_title'>         \\u60A8\\u7684mbti\\u7C7B\\u578B\\u4E3A         <text  class='show_title_text'> " + (_typeof(this.data.MbtiType) === "object" ? JSON.stringify(this.data.MbtiType) : this.data.MbtiType) + "  </text>  </view> <view  class='show_body'>  <text  space='ensp'> " + (_typeof(this.data.describe) === "object" ? JSON.stringify(this.data.describe) : this.data.describe) + "  </text>  </view>  </!--> <view  class='share' bindtap='share' style='background-color: #fff; border-radius: 30rpx; color: rgba(234,129,113); display: flex; justify-content: center; margin: 0 auto; margin-top: 30rpx; padding: 20rpx 0rpx; width: 70%;'> \\u4FDD\\u5B58\\u56FE\\u7247  </view> <view  class='share' bindtap='return' style='background-color: #fff; border-radius: 30rpx; color: rgba(234,129,113); display: flex; justify-content: center; margin: 0 auto; margin-top: 30rpx; padding: 20rpx 0rpx; width: 70%;'> \\u8FD4\\u56DE\\u9996\\u9875  </view>  </view>  </view> ";
      this.setData({ html: this.parse(html) });
    },

    /**
     * 页面的初始数据
     */
    data: {
      li: [{ question: "你通常", answer: ["与人容易混熟", "比较沉静或矜持"] }, { question: "按程序做事", answer: ["合你心意", "令你感到束缚"] }, { question: "哪些人更吸引你", answer: ["一个思维敏捷及非常聪颖的人", "实事求是，具有丰富常识的人"] }, { question: "你倾向于", answer: ["重视感情多于逻辑", "重视逻辑多于感情"] }, { question: "要作决定时，你认为最重要的是", answer: ["据事实衡量", "考虑他人的感受的意见"] }, { question: "在一大群人当中，通常是", answer: ["你介绍大家认识", "别人介绍你"] }, { question: "你通常做事多数是", answer: ["你按当天的心情去做", "照拟好的程序去做"] }, { question: "一般来说，你和哪些人比较合得来", answer: ["富有想象力", "现实的人"] }],
      res: [], // 存放答案
      //选择的id
      id_: 0,
      MbtiType: "",
      describe: "",
      click: 0,
      animationData: {}
    },
    touchstartX: function touchstartX(e) {
      console.log(e);
      this.setdata({
        currentIndex: e.currentTarget.dataset.index
      });
      console.log(e.currentTarget.dataset.index);
      // 获取触摸Y坐标
      this.recordY = e.touches[0].clientY;
    },
    test: function test() {
      console.log("test");
      var self = this;
      var animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'liner'
      });
      this.animation = animation;
      var recordY = void 0;
      this.animation.translateY(-280).rotate(-5).translateX(0).step(); //第一次动画 离开
      this.animation.translateY(0).translateX(0).rotate(0).step(); //第二次动画 复位
      this.setdata({
        animationData: this.animation.export() //.export清除动画
      });
      this.animation.translateY(40).rotate(0).translateX(0).step(); //第一次动画 离开
      this.animation.translateY(-25).translateX(0).rotate(0).step(); //第二次动画 复位
      this.animation.translateY(0).translateX(0).rotate(0).step(); //第二次动画 复位
      this.setdata({
        animationData2: this.animation.export() //.export清除动画
      });
    },
    choose_ans: function choose_ans(e) {
      var _this = this;

      this.setdata({
        click: e.currentTarget.dataset.index
      });
      setTimeout(function () {
        _this.setdata({
          click: false
        });
        var index = Number(e.currentTarget.dataset.index);
        var count = _this.data.id_;
        if (count == 0) {
          _this.setdata({ start: new Date().getTime() });
        }
        var res = _this.data.res;
        res[count] = index;
        count = count + 1;
        _this.setdata({ id_: count, idx: index });
        _this.test();
        if (count == res.length) {
          var end = new Date().getTime();
          console.log(_this.data.start);
          var use_Time = end - _this.data.start;
          console.log(use_Time);
          _this.setdata({ use_Time: use_Time });
          _this.process(res);
        }
      }, 1000);
    },
    choose_return: function choose_return() {
      console.log('choose_return');
      if (this.data.id_ > 0) {
        this.setdata({ id_: this.data.id_ - 1 });
      }
    },
    initcanvas: function initcanvas(MbtiType, describe) {
      var _this2 = this;

      // wx.showLoading({
      //   title: '生成中',
      //   mask:true,
      // })

      console.log(MbtiType);
      console.log(describe);
      var that = this;
      var wpx = wx.getSystemInfoSync().windowWidth / 375;
      var iconurl = wx.getStorageSync('args').iconUrl;
      var query = wx.createSelectorQuery();
      query.select('#shareCanvas').fields({ node: true, size: true }).exec(function (res) {
        var canvas = res[0].node;
        var ctx = canvas.getContext('2d');
        var dpr = wx.getSystemInfoSync().pixelRatio;
        console.log(canvas);
        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;
        ctx.scale(dpr, dpr);
        _this2.setdata({
          ctx: ctx, canvas: canvas, wpx: wpx
        });
        console.log(canvas.width);
        console.log(canvas.height);
        console.log('初始化完成');
        // this.draw(ctx,canvas,wpx)//开始画图
        //背景色块
        _this2.draw(ctx, canvas, wpx, dpr, MbtiType, describe);
      });
    },
    draw: function draw(ctx, canvas, wpx, dpr, MbtiType, describe) {
      var wxname = "微信名字iagfsgfligfifg";
      //背景色块 #b9cfeb
      ctx.save();
      ctx.beginPath(); //开始创建一个路径
      this.roundRect(ctx, 0 * wpx, 0 * wpx, this.data.canvas.width / dpr, this.data.canvas.height / dpr, 10, wpx); //圆角
      ctx.fillStyle = '#74b9ff';
      ctx.fillRect(0 * wpx, 0 * wpx, this.data.canvas.width * wpx, this.data.canvas.height * wpx);
      ctx.clip(); //裁剪
      ctx.closePath();
      ctx.restore();
      // 上色块 
      // ctx.save();
      // ctx.beginPath()//开始创建一个路径
      // this.roundRect(ctx, 8*wpx, 7*wpx,this.data.canvas.width/dpr*0.94,this.data.canvas.height/dpr*0.05, 5,wpx)//圆角
      // ctx.fillStyle='#74b9ff'
      // ctx.fillRect(0*wpx, 0*wpx,this.data.canvas.width*wpx,this.data.canvas.height*wpx)
      // ctx.clip()//裁剪
      // ctx.closePath();
      // ctx.restore();
      ctx.fillStyle = 'white';
      ctx.font = String(12 * wpx) + 'px Arial';
      ctx.fillText("16种人格社交指南", 14 * wpx, 28 * wpx);
      ctx.font = String(10 * wpx) + 'px Arial';
      ctx.fillText("—— 你是哪一种人格？", 116 * wpx, 28 * wpx);
      //微信名字
      // ctx.save();
      // ctx.fillStyle='white';
      // ctx.textAlign='center'
      // ctx.font=String(12*wpx)+'px Arial';
      // ctx.fillText(wxname,this.data.canvas.width/dpr*0.5,44*wpx);
      // ctx.restore();
      //中色块 背景
      ctx.save();
      ctx.beginPath(); //开始创建一个路径
      this.roundRect(ctx, 8 * wpx, 45 * wpx, this.data.canvas.width / dpr * 0.94, this.data.canvas.height / dpr * 0.29, 5, wpx); //圆角
      ctx.fillStyle = '#b9cfeb';
      ctx.fillRect(0 * wpx, 0 * wpx, this.data.canvas.width * wpx, this.data.canvas.height * wpx);
      ctx.clip(); //裁剪
      ctx.closePath();
      ctx.restore();
      //中色块中 小色块
      // ctx.save();
      // ctx.beginPath()//开始创建一个路径
      // this.roundRect(ctx, 8*wpx, 55*wpx,this.data.canvas.width/dpr*0.94,this.data.canvas.height/dpr*0.03, 2,wpx)//圆角
      // ctx.fillStyle='#74b9ff'
      // ctx.fillRect(0*wpx, 0*wpx,this.data.canvas.width*wpx,this.data.canvas.height*wpx)
      // ctx.clip()//裁剪
      // ctx.closePath();
      // ctx.restore();
      //小圆点 和字
      // ctx.save();
      // ctx.beginPath()//开始创建一个路径
      // ctx.arc(20*wpx, 61*wpx, 2*wpx, 0, Math.PI * 2,false)
      // ctx.clip()//裁剪
      // ctx.fillStyle='white'
      // ctx.fillRect(0*wpx, 0*wpx, this.data.canvas.width*wpx, this.data.canvas.height*wpx)
      // ctx.closePath();
      // ctx.restore();
      // ctx.fillStyle='white';
      // ctx.font=String(7*wpx)+'px Arial';
      // ctx.fillText("MY PERSONALTY TYPE IS",26*wpx,63.5*wpx);
      //头像
      this.drawiconurl(ctx, canvas, wpx);
      //MBTI类型
      ctx.fillStyle = 'white';
      ctx.font = String(20 * wpx) + 'px Arial';
      ctx.fillText("您的MBTI类型为", 40 * wpx, 145 * wpx);
      ctx.fillStyle = '#FCEE98';
      ctx.font = String(20 * wpx) + 'px Arial';
      ctx.fillText(MbtiType, 190 * wpx, 145 * wpx);
      //下色块 背景
      ctx.save();
      ctx.beginPath(); //开始创建一个路径
      this.roundRect(ctx, 8 * wpx, 169 * wpx, this.data.canvas.width / dpr * 0.94, this.data.canvas.height / dpr * 0.435, 5, wpx); //圆角
      ctx.fillStyle = '#b9cfeb';
      ctx.fillRect(0 * wpx, 0 * wpx, this.data.canvas.width * wpx, this.data.canvas.height * wpx);
      ctx.clip(); //裁剪
      ctx.closePath();
      ctx.restore();
      //下色块中 小色块
      // ctx.save();
      // ctx.beginPath()//开始创建一个路径
      // this.roundRect(ctx, 8*wpx, 179*wpx,this.data.canvas.width/dpr*0.94,this.data.canvas.height/dpr*0.03, 2,wpx)//圆角
      // ctx.fillStyle='#74b9ff'
      // ctx.fillRect(0*wpx, 0*wpx,this.data.canvas.width*wpx,this.data.canvas.height*wpx)
      // ctx.clip()//裁剪
      // ctx.closePath();
      // ctx.restore();
      //小圆点 和字
      // ctx.save();
      // ctx.beginPath()//开始创建一个路径
      // ctx.arc(20*wpx, 185*wpx, 2*wpx, 0, Math.PI * 2,false)
      // ctx.clip()//裁剪
      // ctx.fillStyle='white'
      // ctx.fillRect(0*wpx, 0*wpx, this.data.canvas.width*wpx, this.data.canvas.height*wpx)
      // ctx.closePath();
      // ctx.restore();
      // ctx.fillStyle='white';
      // ctx.font=String(7*wpx)+'px Arial';
      // ctx.fillText("ABOUT ME",26*wpx,187.5*wpx);
      //文本 内容
      ctx.fillStyle = 'white';
      ctx.font = String(12 * wpx) + 'px Arial';
      //文本换行 参数：1、canvas对象，2、文本 3、距离左侧的距离 4、距离顶部的距离 5、（）6、文本的宽度
      this.drawText(ctx, describe, 19 * wpx, 190 * wpx, 10, 227 * wpx);
      //底部二维码
      this.draw_we_codeurl(ctx, canvas, wpx, 10, 352);
      ctx.font = String(10 * wpx) + 'px Arial';
      ctx.fillText("长按识别二维码", 55 * wpx, 365 * wpx);
      ctx.fillText("获取你的MBIT人格分析报告", 55 * wpx, 385 * wpx);
    },

    //we校园图标
    draw_we_codeurl: function draw_we_codeurl(ctx, canvas, wpx, x, y) {
      console.log("drawiconurl");
      var we_iconurl = "https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/gh_2927abcc72c9_258.jpg?sign=b685101cc1b9e449b4ae4ef0700028f2&t=1647171838";
      var headerImg = canvas.createImage();
      headerImg.src = we_iconurl;
      headerImg.onload = function () {
        ctx.drawImage(headerImg, x * wpx, y * wpx, 40 * wpx, 40 * wpx);
      };
    },

    //文本换行 参数：1、canvas对象，2、文本 3、距离左侧的距离 4、距离顶部的距离 5、6、文本的宽度
    drawText: function drawText(ctx, str, leftWidth, initHeight, titleHeight, canvasWidth) {
      var lineWidth = 0;
      var lastSubStrIndex = 0; //每次开始截取的字符串的索引
      for (var i = 0; i < str.length; i++) {
        lineWidth += ctx.measureText(str[i]).width;
        if (lineWidth > canvasWidth) {
          ctx.fillText(str.substring(lastSubStrIndex, i), leftWidth, initHeight); //绘制截取部分
          initHeight += 20; //字体行高
          lineWidth = 0;
          lastSubStrIndex = i;
          titleHeight += 30;
        }
        if (i == str.length - 1) {
          //绘制剩余部分
          ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight);
        }
      }
      // 标题border-bottom 线距顶部距离
      titleHeight = titleHeight + 10;
      return titleHeight;
    },
    drawiconurl: function drawiconurl(ctx, canvas, wpx) {
      var _this3 = this;

      console.log("drawiconurl");
      var iconurl = "../images/touxiang.png";
      var headerImg = canvas.createImage();
      headerImg.src = iconurl;
      headerImg.onload = function () {
        ctx.save();
        ctx.beginPath(); //开始创建一个路径
        ctx.arc(134 * wpx, 90 * wpx, 26 * wpx, 0, 2 * Math.PI, false); //画一个圆形裁剪区域
        ctx.clip(); //裁剪
        ctx.fillStyle = '#389e89';
        ctx.fillRect(0 * wpx, 0 * wpx, _this3.data.canvas.width * wpx, _this3.data.canvas.height * wpx);
        ctx.drawImage(headerImg, 108 * wpx, 63 * wpx, 53 * wpx, 53 * wpx);
        ctx.closePath();
        ctx.restore();
      };
    },
    roundRect: function roundRect(ctx, x, y, w, h, r, wpx) {
      console.log(w);
      console.log(h);
      console.log(r);
      // 开始绘制
      ctx.beginPath();
      // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
      ctx.setFillStyle = 'transparent';
      ctx.setStrokeStyle = 'transparent';
      // 绘制左上角圆弧
      ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
      // 绘制border-top
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.lineTo(x + w, y + r);
      // 绘制右上角圆弧
      ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);
      // 绘制border-right
      ctx.lineTo(x + w, y + h - r);
      ctx.lineTo(x + w - r, y + h);
      // 绘制右下角圆弧
      ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);
      // 绘制border-bottom
      ctx.lineTo(x + r, y + h);
      ctx.lineTo(x, y + h - r);
      // 绘制左下角圆弧
      ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);
      // 绘制border-left
      ctx.lineTo(x, y + r);
      ctx.lineTo(x + r, y);

      // ctx.fill()
      // ctx.stroke()
      ctx.closePath();
      // 剪切
      ctx.clip();
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function onLoad(options) {
      var _this4 = this;

      options = this.options;this.data.dark = wx.getSystemInfoSync().theme;wx.onThemeChange(function (e) {
        console.log(e.theme);_this4.setdata({ dark: e.theme });
      });this.setdata();
      var res = Array.from({ length: this.data.li.length }, function () {
        return 0;
      });
      this.setdata({ res: res });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function onReady() {},
    //mbti处理的函数
    process: function process(res) {
      var _this5 = this;

      console.log('process');
      var relu = [[{ "1": "E" }, { "2": "I" }], //在这里
      [{ "1": "J" }, { "2": "P" }], [{ "1": "N" }, { "2": "S" }], [{ "1": "F" }, { "2": "T" }], [{ "1": "T" }, { "2": "F" }], [{ "1": "E" }, { "2": "I" }], [{ "1": "P" }, { "2": "J" }], [{ "1": "N" }, { "2": "S" }]];
      //计算数量
      var ret = [];
      for (var i = 0; i < relu.length; i++) {
        ret.push(relu[i][Number(res[i]) - 1]);
      }
      var dict = {};
      ret.forEach(function (e) {
        if (!dict.hasOwnProperty(e[Object.keys(e)])) {
          dict[e[Object.keys(e)]] = 1;
        } else {
          dict[e[Object.keys(e)]] = dict[e[Object.keys(e)]] + 1;
        }
      });
      var list_type = [];
      //如果都只有一个
      var key = Object.keys(dict);
      key.forEach(function (e) {
        if (dict[e] == 2) {
          list_type.push(e);
        } else if (dict[e] == 1) {
          if (e == "I" || e == "N" || e == "F" || e == "P") {
            list_type.push(e);
          }
        }
      });
      var all_type = [{
        type: "ISTJ",
        des: "1.\\u4F20\\u7EDF\\u6027\\u7684\\u601D\\u8003\\u80052.\\u884C\\u4E8B\\u52A1\\u5B9E\\u3001\\u6709\\u5E8F\\u3001\\u5B9E\\u9645 \\u3001 \\u903B\\u8F91\\u3001\\u771F\\u5B9E\\u53CA\\u53EF\\u4FE1\\u8D563.\\u5341\\u5206\\u7559\\u610F\\u4E14\\u4E50\\u4E8E\\u4EFB\\u4F55\\u4E8B\\uFF08\\u5DE5\\u4F5C\\u3001\\u5C45\\u5BB6\\u3001\\u751F\\u6D3B\\u5747\\u6709\\u826F\\u597D\\u7EC4\\u7EC7\\u53CA\\u6709\\u5E8F\\u30024.\\u7167\\u8BBE\\u5B9A\\u6210\\u6548\\u6765\\u4F5C\\u51FA\\u51B3\\u7B56\\u4E14\\u4E0D\\u754F\\u963B\\u6320\\u4E0E\\u95F2\\u8A00\\u4F1A\\u575A\\u5B9A\\u4E3A\\u4E4B\\u30025.\\u91CD\\u89C6\\u4F20\\u7EDF\\u4E0E\\u5FE0\\u8BDA\\u30026.\\u4E25\\u8083\\u3001\\u5B89\\u9759\\u3001 \\u5FD7\\u4E0E\\u5168\\u529B\\u6295\\u5165\\u3001\\u53CA\\u53EF\\u88AB\\u4FE1\\u8D56\\u83B7\\u81F4\\u6210\\u529F\\u3002"
      }, {
        type: "ISFJ",
        des: "1.\\u5B89\\u9759\\u3001\\u548C\\u5584\\u3001\\u8D1F\\u8D23\\u4EFB\\u4E14\\u6709\\u826F\\u5FC3\\u30022.\\u884C\\u4E8B\\u5C3D\\u8D23\\u6295\\u5165\\u30023.\\u5B89\\u5B9A\\u6027\\u9AD8\\u30024.\\u613F\\u6295\\u5165\\u3001\\u5403\\u82E6\\u53CA\\u529B\\u6C42\\u7CBE\\u786E\\u30025.\\u5174\\u8DA3\\u901A\\u5E38\\u4E0D\\u5728\\u4E8E\\u79D1\\u6280\\u65B9\\u9762\\u3002\\u5BF9\\u7EC6\\u8282\\u4E8B\\u52A1\\u6709\\u8010\\u5FC36.\\u5FE0\\u8BDA\\u3001\\u8003\\u8651\\u5468\\u5230\\u3001\\u4E14\\u4F1A\\u5173\\u5207\\u4ED6\\u4EBA\\u611F\\u53D77.\\u81F4\\u529B\\u4E8E\\u521B\\u9020\\u6709\\u5E8F\\u53CA\\u548C\\u8C10\\u7684\\u5DE5\\u4F5C\\u4E0E\\u5BB6\\u5EAD\\u73AF\\u5883\\u3002"
      }, {
        type: 'INFJ',
        des: "1.\\u56E0\\u4E3A\\u575A\\u5FCD\\u3001\\u521B\\u610F\\u53CA\\u5FC5\\u987B\\u8FBE\\u6210\\u7684\\u610F\\u56FE\\u800C\\u80FD\\u6210\\u529F2.\\u4F1A\\u5728\\u5DE5\\u4F5C\\u4E2D\\u6295\\u6CE8\\u6700\\u5927\\u7684\\u52AA\\u529B\\u30023.\\u9ED8\\u9ED8\\u7684\\u3001\\u8BDA\\u631A\\u7684\\u53CA\\u7528\\u5FC3\\u7684\\u5173\\u5207\\u4ED6\\u4EBA4.\\u56E0\\u575A\\u5B88\\u539F\\u5219\\u800C\\u53D7\\u656C\\u91CD5.\\u63D0\\u51FA\\u9020\\u798F\\u5927\\u4F17\\u5229\\u76CA\\u7684\\u660E\\u786E\\u8FDC\\u666F\\u800C\\u4E3A\\u4EBA\\u6240\\u5C0A\\u656C\\u4E0E\\u8FFD\\u968F6.\\u60F3\\u4E86\\u89E3\\u4EC0\\u4E48\\u80FD\\u6FC0\\u52B1\\u522B\\u4EBA\\u53CA\\u5BF9\\u4ED6\\u4EBA\\u5177\\u6D1E\\u5BDF\\u529B7.\\u5149\\u660E\\u6B63\\u5927\\u4E14\\u575A\\u4FE1\\u5176\\u4EF7\\u503C\\u89C2\\u3002"
      }, {
        type: 'INTJ',
        des: "1.\\u56FA\\u6267\\u987D\\u56FA\\u8005-\\u5177\\u6709\\u5F3A\\u5927\\u52A8\\u529B\\u6765\\u8FBE\\u6210\\u76EE\\u7684\\u4E0E\\u521B\\u610F2.\\u6709\\u5B8F\\u5927\\u7684\\u613F\\u666F\\u4E14\\u80FD\\u5FEB\\u901F\\u5728\\u4F17\\u591A\\u5916\\u754C\\u4E8B\\u4EF6\\u4E2D\\u627E\\u51FA\\u6709\\u610F\\u4E49\\u7684\\u6A21\\u83033.\\u5BF9\\u6240\\u627F\\u8D1F\\u804C\\u52A1\\uFF0C\\u5177\\u826F\\u597D\\u80FD\\u529B\\u4E8E\\u7B56\\u5212\\u5DE5\\u4F5C\\u5E76\\u5B8C\\u62104.\\u5177\\u6000\\u7591\\u5FC3\\u3001\\u6311\\u5254\\u6027\\u3001\\u72EC\\u7ACB\\u6027\\u3001\\u679C\\u51B3\\uFF0C\\u5BF9\\u4E13\\u4E1A\\u6C34\\u51C6\\u53CA\\u7EE9\\u6548\\u8981\\u6C42\\u9AD8"
      }, {
        type: 'ISTP',
        des: "1.\\u51B7\\u9759\\u65C1\\u89C2\\u8005\\u2014\\u5B89\\u9759\\u3001\\u9884\\u7559\\u4F59\\u5730\\u3001\\u5F39\\u6027\\u53CA\\u4F1A\\u4EE5\\u65E0\\u504F\\u89C1\\u7684\\u597D\\u5947\\u5FC3\\u4E0E\\u672A\\u9884\\u671F\\u539F\\u59CB\\u7684\\u5E7D\\u9ED8\\u89C2\\u5BDF\\u4E0E\\u5206\\u67902.\\u6709\\u5174\\u8DA3\\u4E8E\\u63A2\\u7D22\\u539F\\u56E0\\u53CA\\u6548\\u679C\\uFF0C\\u91CD\\u89C6\\u6548\\u80FD3.\\u64C5\\u957F\\u4E8E\\u638C\\u63E1\\u95EE\\u9898\\u6838\\u5FC3\\u53CA\\u627E\\u51FA\\u89E3\\u51B3\\u65B9\\u5F0F4.\\u5206\\u6790\\u6210\\u4E8B\\u7684\\u7F18\\u7531\\u4E14\\u80FD\\u5B9E\\u65F6\\u7531\\u5927\\u91CF\\u8D44\\u6599\\u4E2D\\u627E\\u51FA\\u5B9E\\u9645\\u95EE\\u9898\\u7684\\u6838\\u5FC3"
      }, {
        type: 'ISFP',
        des: "1.\\u7F9E\\u602F\\u7684\\u3001\\u5B89\\u5B81\\u548C\\u5584\\u5730\\u3001\\u654F\\u611F\\u7684\\u3001\\u4EB2\\u5207\\u7684\\u3001\\u4E14\\u884C\\u4E8B\\u8C26\\u865A\\u30022.\\u559C\\u4E8E\\u907F\\u5F00\\u4E89\\u8BBA\\uFF0C\\u4E0D\\u5BF9\\u4ED6\\u4EBA\\u5F3A\\u52A0\\u5DF2\\u89C1\\u6216\\u4EF7\\u503C\\u89C23.\\u65E0\\u610F\\u4E8E\\u9886\\u5BFC\\u5374\\u5E38\\u662F\\u5FE0\\u8BDA\\u7684\\u8FFD\\u968F\\u80054.\\u529E\\u4E8B\\u4E0D\\u6025\\u8E81\\uFF0C\\u5B89\\u4E8E\\u73B0\\u72B6\\u65E0\\u610F\\u4E8E\\u4EE5\\u8FC7\\u5EA6\\u7684\\u6025\\u5207\\u6216\\u52AA\\u529B\\u7834\\u574F\\u73B0\\u51B55.\\u559C\\u6B22\\u6709\\u81EA\\u81EA\\u5DF1\\u7684\\u7A7A\\u95F4\\u53CA\\u7167\\u81EA\\u8BA2\\u7684\\u65F6\\u7A0B\\u529E\\u4E8B"
      }, {
        type: "INFP",
        des: "1.\\u5B89\\u9759\\u89C2\\u5BDF\\u8005\\uFF0C\\u5177\\u7406\\u60F3\\u6027\\u4E0E\\u5BF9\\u5176\\u4EF7\\u503C\\u89C2\\u53CA\\u91CD\\u8981\\u4E4B\\u4EBA\\u5177\\u5FE0\\u8BDA\\u5FC32.\\u5E0C\\u671B\\u5728\\u751F\\u6D3B\\u5F62\\u6001\\u4E0E\\u5185\\u5728\\u4EF7\\u503C\\u89C2\\u76F8\\u543B\\u54083.\\u5177\\u597D\\u5947\\u5FC3\\u4E14\\u5F88\\u5FEB\\u80FD\\u770B\\u51FA\\u673A\\u4F1A\\u6240\\u5728\\u3002\\u5E38\\u62C5\\u8D1F\\u5F00\\u53D1\\u521B\\u610F\\u7684\\u89E6\\u5A92\\u8005 4.\\u9664\\u975E\\u4EF7\\u503C\\u89C2\\u53D7\\u4FB5\\u72AF\\uFF0C\\u884C\\u4E8B\\u4F1A\\u5177\\u5F39\\u6027\\u3001\\u9002\\u5E94\\u529B\\u9AD8\\u4E14\\u627F\\u53D7\\u529B\\u5F3A5.\\u5177\\u60F3\\u4E86\\u89E3\\u53CA\\u53D1\\u5C55\\u4ED6\\u4EBA\\u6F5C\\u80FD\\u7684\\u4F01\\u56FE\\u3002\\u60F3\\u4F5C\\u592A\\u591A\\u4E14\\u4F5C\\u4E8B\\u5168\\u795E\\u8D2F\\u6CE8 7.\\u5177\\u6709\\u9002\\u5E94\\u529B\\u3001\\u6709\\u5F39\\u6027\\u9664\\u975E\\u4EF7\\u503C\\u89C2\\u53D7\\u5230\\u5A01\\u80C1\\u3002"
      }, {
        type: 'INTP',
        des: "1.\\u5B89\\u9759\\u3001\\u81EA\\u6301\\u3001\\u5F39\\u6027\\u53CA\\u5177\\u9002\\u5E94\\u529B2.\\u7279\\u522B\\u559C\\u7231\\u8FFD\\u6C42\\u7406\\u8BBA\\u4E0E\\u79D1\\u5B66\\u4E8B\\u74063.\\u4E60\\u4E8E\\u4EE5\\u903B\\u8F91\\u53CA\\u5206\\u6790\\u6765\\u89E3\\u51B3\\u95EE\\u9898\\u2014\\u95EE\\u9898\\u89E3\\u51B3\\u80054.\\u6700\\u6709\\u5174\\u8DA3\\u4E8E\\u521B\\u610F\\u4E8B\\u52A1\\u53CA\\u7279\\u5B9A\\u5DE5\\u4F5C\\uFF0C\\u5BF9\\u805A\\u4F1A\\u4E0E\\u95F2\\u804A\\u65E0\\u592A\\u5927\\u5174\\u8DA35.\\u8FFD\\u6C42\\u53EF\\u53D1\\u6325\\u4E2A\\u4EBA\\u5F3A\\u70C8\\u5174\\u8DA3\\u7684\\u751F\\u6DAF6.\\u8FFD\\u6C42\\u53D1\\u5C55\\u5BF9\\u6709\\u5174\\u8DA3\\u4E8B\\u52A1\\u4E4B\\u903B\\u8F91\\u89E3\\u91CA"
      }, {
        type: "ESTP",
        des: "1.\\u64C5\\u957F\\u73B0\\u573A\\u5B9E\\u65F6\\u89E3\\u51B3\\u95EE\\u9898\\u2014\\u89E3\\u51B3\\u95EE\\u9898\\u80052.\\u559C\\u6B22\\u529E\\u4E8B\\u5E76\\u4E50\\u4E8E\\u5176\\u4E2D\\u53CA\\u8FC7\\u7A0B3.\\u503E\\u5411\\u4E8E\\u559C\\u597D\\u6280\\u672F\\u4E8B\\u52A1\\u53CA\\u8FD0\\u52A8\\uFF0C\\u4EA4\\u7ED3\\u540C\\u597D\\u53CB\\u4EBA4.\\u5177\\u9002\\u5E94\\u6027\\u3001\\u5BB9\\u5FCD\\u5EA6\\u3001\\u52A1\\u5B9E\\u6027\\uFF1B\\u6295\\u6CE8\\u5FC3\\u529B\\u4E8E\\u4F1A\\u5F88\\u5FEB\\u5177 \\u6210\\u6548\\u5DE5\\u4F5C5.\\u4E0D\\u559C\\u6B22\\u5197\\u957F\\u6982\\u5FF5\\u7684\\u89E3\\u91CA\\u53CA\\u7406\\u8BBA6.\\u6700\\u4E13\\u7CBE\\u4E8E\\u53EF\\u64CD\\u4F5C\\u3001\\u5904\\u7406\\u3001\\u5206\\u89E3\\u6216\\u7EC4\\u5408\\u7684\\u771F\\u5B9E\\u4E8B\\u52A1"
      }, {
        type: 'ESFP',
        des: "1.\\u5916\\u5411\\u3001\\u548C\\u5584\\u3001\\u63A5\\u53D7\\u6027\\u3001\\u4E50\\u4E8E\\u5206\\u4EAB\\u559C\\u4E50\\u30022.\\u559C\\u6B22\\u4E0E\\u4ED6\\u4EBA\\u4E00\\u8D77\\u884C\\u52A8\\u4E14\\u4FC3\\u6210\\u4E8B\\u4EF6\\u53D1\\u751F\\u30023.\\u77E5\\u6653\\u4E8B\\u4EF6\\u672A\\u6765\\u7684\\u53D1\\u5C55\\u5E76\\u4F1A\\u79EF\\u6781\\u53C2\\u4E0E\\u30024.\\u6700\\u64C5\\u957F\\u4E8E\\u4EBA\\u9645\\u76F8\\u5904\\u80FD\\u529B\\u53CA\\u5177\\u5907\\u5B8C\\u5907\\u5E38\\u8BC6\\uFF0C\\u5F88\\u6709\\u5F39\\u6027\\u80FD\\u7ACB\\u5373 \\u9002\\u5E94\\u4ED6\\u4EBA\\u4E0E\\u73AF\\u5883\\u30025.\\u5BF9\\u751F\\u547D\\u3001\\u4EBA\\u3001\\u7269\\u8D28\\u4EAB\\u53D7\\u7684\\u70ED\\u7231\\u8005\\u3002"
      }, {
        type: "ENFP",
        des: "1.\\u5373\\u5174\\u6267\\u884C\\u8005\\u30022.\\u51E0\\u4E4E\\u80FD\\u8FBE\\u6210\\u6240\\u6709\\u6709\\u5174\\u8DA3\\u7684\\u4E8B\\u30023.\\u5BF9\\u96BE\\u9898\\u5F88\\u5FEB\\u5C31\\u6709\\u5BF9\\u7B56\\u5E76\\u80FD\\u5BF9\\u6709\\u56F0\\u96BE\\u7684\\u4EBA\\u65BD\\u4E88\\u63F4\\u624B\\u30024.\\u4F9D\\u8D56\\u80FD\\u6539\\u5584\\u7684\\u80FD\\u529B\\u800C\\u65E0\\u987B\\u9884\\u4F5C\\u89C4\\u5212\\u51C6\\u5907\\u30025.\\u4E3A\\u8FBE\\u76EE\\u7684\\u5E38\\u80FD\\u627E\\u51FA\\u5F3A\\u5236\\u81EA\\u5DF1\\u4E3A\\u4E4B\\u7684\\u7406\\u7531\\u30026.\\u5145\\u6EE1\\u70ED\\u5FF1\\u3001\\u6D3B\\u529B\\u5145\\u6C9B\\u3001\\u806A\\u660E\\u7684\\u3001\\u5BCC\\u60F3\\u8C61\\u529B\\u7684\\uFF0C\\u89C6\\u751F\\u547D\\u5145\\u6EE1\\u673A\\u4F1A\\u4F46\\u671F\\u80FD\\u5F97\\u81EA\\u4ED6\\u4EBA\\u80AF\\u5B9A\\u4E0E\\u652F\\u6301"
      }, {
        type: "ENTP",
        des: "1.\\u53CD\\u5E94\\u5FEB\\u3001\\u806A\\u660E\\u30022.\\u5177\\u6FC0\\u52B1\\u4F19\\u4F34\\u3001\\u654F\\u6377\\u53CA\\u76F4\\u8A00\\u8BB3\\u4E13\\u957F\\u30023.\\u4F1A\\u4E3A\\u4E86\\u6709\\u8DA3\\u5BF9\\u95EE\\u9898\\u7684\\u4E24\\u9762\\u52A0\\u4E88\\u4E89\\u8FA9\\u30024.\\u5BF9\\u89E3\\u51B3\\u65B0\\u53CA\\u6311\\u6218\\u6027\\u7684\\u95EE\\u9898\\u5BCC\\u6709\\u7B56\\u7565\\uFF0C\\u4F46\\u4F1A\\u8F7B\\u5FFD\\u6216\\u538C\\u70E6\\u7ECF\\u5E38\\u7684\\u4EFB\\u52A1\\u4E0E\\u7EC6\\u8282\\u30025.\\u5174\\u8DA3\\u591A\\u5143\\uFF0C\\u6613\\u503E\\u5411\\u4E8E\\u8F6C\\u79FB\\u81F3\\u65B0\\u751F\\u7684\\u5174\\u8DA3\\u30026.\\u5BF9\\u6240\\u60F3\\u8981\\u7684\\u4F1A\\u6709\\u6280\\u5DE7\\u5730\\u627E\\u51FA\\u903B\\u8F91\\u7684\\u7406\\u7531\\u3002"
      }, {
        type: "ESTJ",
        des: "1 \\u5177\\u51B3\\u65AD\\u529B\\u3001\\u5173\\u6CE8\\u7EC6\\u8282\\u4E14\\u5F88\\u5FEB\\u4F5C\\u51FA\\u51B3\\u7B56\\u2014\\u4F18\\u79C0\\u884C\\u653F\\u80052.\\u4E0D\\u559C\\u6B22\\u62BD\\u8C61\\u7406\\u8BBA\\uFF1B\\u6700\\u559C\\u6B22\\u5B66\\u4E60\\u53EF\\u7ACB\\u5373\\u8FD0\\u7528\\u4E8B\\u7406\\u30023.\\u559C\\u597D\\u7EC4\\u7EC7\\u4E0E\\u7BA1\\u7406\\u6D3B\\u52A8\\u4E14\\u4E13\\u6CE8\\u4EE5\\u6700\\u6709\\u6548\\u7387\\u65B9\\u5F0F\\u884C\\u4E8B\\u4EE5\\u8FBE\\u81F4\\u6210\\u6548\\u30024.\\u52A1\\u5B9E\\u3001\\u771F\\u5B9E\\u3001\\u4E8B\\u5B9E\\u503E\\u5411\\uFF0C\\u5177\\u4F01\\u4E1A\\u6216\\u6280\\u672F\\u5929\\u4EFD\\u30025.\\u4F1A\\u5FFD\\u7565\\u4ED6\\u4EBA\\u611F\\u53D7\\u30026.\\u559C\\u4F5C\\u9886\\u5BFC\\u8005\\u6216\\u4F01\\u4E1A\\u4E3B\\u7BA1"
      }, {
        type: "ESFJ",
        des: "1.\\u8BDA\\u631A\\u3001\\u7231\\u8BF4\\u8BDD\\u3001\\u5408\\u4F5C\\u6027\\u9AD8\\u3001\\u53D7\\u6B22\\u8FCE\\u3001\\u5149\\u660E\\u6B63\\u5927\\u7684\\u2014\\u5929\\u751F\\u7684\\u5408\\u4F5C\\u8005\\u53CA\\u6D3B\\u8DC3\\u7684\\u7EC4\\u7EC7\\u6210\\u5458\\u30022.\\u91CD\\u548C\\u8C10\\u4E14\\u957F\\u4E8E\\u521B\\u9020\\u548C\\u8C10\\u30023.\\u5E38\\u4F5C\\u5BF9\\u4ED6\\u4EBA\\u6709\\u76CA\\u7684\\u4E8B\\u30024.\\u7ED9\\u4E88\\u9F13\\u52B1\\u53CA\\u79F0\\u8BB8\\u4F1A\\u6709\\u66F4\\u4F73\\u5DE5\\u4F5C\\u6210\\u6548\\u30025.\\u5BF9\\u76F4\\u63A5\\u53CA\\u6709\\u5F62\\u5F71\\u54CD\\u4EBA\\u4EEC\\u751F\\u6D3B\\u7684\\u4E8B\\u60C5\\u611F\\u5174\\u8DA3\\u30026.\\u559C\\u6B22\\u4E0E\\u4ED6\\u4EBA\\u5171\\u4E8B\\u53BB\\u7CBE\\u786E\\u4E14\\u51C6\\u65F6\\u5730\\u5B8C\\u6210\\u5DE5\\u4F5C"
      }, {
        type: "ENFJ",
        des: "1.\\u70ED\\u5FF1\\u3001\\u8D1F\\u8D23\\u4EFB\\u7684\\u5177\\u80FD\\u9F13\\u52B1\\u4ED6\\u4EBA\\u7684\\u9886\\u5BFC\\u98CE\\u683C\\u30022.\\u5BF9\\u522B\\u4EBA\\u6240\\u60F3\\u4F1A\\u8868\\u8FBE\\u771F\\u6B63\\u5173\\u5207\\u5E76\\u5207\\u5B9E\\u7528\\u5FC3\\u53BB\\u5904\\u7406\\u30023.\\u80FD\\u6280\\u5DE7\\u6027\\u5730\\u5E26\\u9886\\u56E2\\u4F53\\u8BA8\\u8BBA\\u6216\\u6F14\\u793A\\u6587\\u7A3F\\u63D0\\u6848\\u30024.\\u7231\\u4EA4\\u9645\\u3001\\u53D7\\u6B22\\u8FCE\\u53CA\\u5BCC\\u540C\\u60C5\\u5FC3\\u30025.\\u5BF9\\u5938\\u5956\\u53CA\\u6279\\u8BC4\\u5F88\\u5728\\u610F\\u30026.\\u559C\\u6B22\\u5E26\\u9886\\u522B\\u4EBA\\u4E14\\u80FD\\u4F7F\\u522B\\u4EBA\\u6216\\u56E2\\u4F53\\u53D1\\u6325\\u6F5C\\u80FD"
      }, {
        type: "ENTJ",
        des: "1.\\u5766\\u8BDA\\u3001\\u5177\\u6709\\u51B3\\u7B56\\u529B\\u7684\\u6D3B\\u52A8\\u9886\\u5BFC\\u8005\\u30022.\\u957F\\u4E8E\\u53D1\\u5C55\\u4E0E\\u5B9E\\u65BD\\u5E7F\\u6CDB\\u7684\\u7CFB\\u7EDF\\u4EE5\\u89E3\\u51B3\\u7EC4\\u7EC7\\u7684\\u95EE\\u9898\\u30023.\\u4E13\\u7CBE\\u4E8E\\u5177\\u5185\\u6DB5\\u4E0E\\u667A\\u80FD\\u7684\\u8C08\\u8BDD\\u5982\\u5BF9\\u516C\\u4F17\\u6F14\\u8BB2\\u30024.\\u4E50\\u4E8E\\u7ECF\\u5E38\\u5438\\u6536\\u65B0\\u77E5\\u8BC6\\u4E14\\u80FD\\u5E7F\\u5F00\\u4FE1\\u606F\\u7BA1\\u9053\\u30025.\\u5BB9\\u6613\\u751F\\u8FC7\\u5EA6\\u81EA\\u4FE1\\uFF0C\\u4F1A\\u5F3A\\u4E8E\\u8868\\u8FBE\\u81EA\\u5DF2\\u521B\\u89C1\\u30026.\\u559C\\u4E8E\\u76EE\\u6807\\u7B56\\u5212\\u53CA\\u76EE\\u6807\\u8BBE\\u5B9A"
      }];
      all_type.forEach(function (e) {
        //list_type:["p","n","t","i"]
        list_type = list_type.sort();
        var t = e.type.split("").sort();
        if (list_type.join("") === t.join("")) {
          _this5.setdata({ MbtiType: e.type, describe: e.des });
          _this5.initcanvas(e.type, e.des);
          return -1;
        }
      });
      //存数据库
      var username = 20014260415;
      var School = "广东石油化工学院";
      db.collection('MBTI-Test').add({
        data: {
          username: username,
          School: School,
          Time: new Date(),
          Type: this.data.MbtiType,
          use_Time: this.data.use_Time //用时毫秒
        },
        success: function success(res) {
          console.log(res);
        }
      });
    },
    share: function share(e) {
      var that = this;
      var w = wx.getSystemInfoSync().windowWidth / 375;
      var args = wx.getStorageSync('args');
      wx.showLoading({
        title: '加载中'
      });
      wx.canvasToTempFilePath({
        canvas: that.data.canvas,
        width: that.data.canvasWidth,
        height: that.data.canvasHeight,
        destHeight: that.data.canvasHeight * 4,
        destWidth: that.data.canvasWidth * 4,
        quality: 1,
        success: function success(res) {
          var url = res.tempFilePath;
          console.log(url);
          wx.saveImageToPhotosAlbum({
            // 下载图片
            filePath: url,
            success: function success(e) {
              console.log(e);
              wx.showToast({
                title: '二维码已保存成功',
                icon: 'success'
              });
            }
          });

          // wx.downloadFile({
          //   url: url,
          //   success: (res) => {
          //     console.log( res.tempFilePath)
          //     wx.showShareImageMenu({
          //       path: res.tempFilePath
          //     })
          //     wx.hideLoading()
          //   }
          // })
        }
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
//# sourceMappingURL=index.js.map