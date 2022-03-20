
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
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/util/公式/Formula.js":
/*!*********************************!*\\
  !*** ./dist/util/公式/Formula.js ***!
  \\*********************************/
/***/ (function(module) {



//在js前端进行运算实在太复杂了这里实在封装数组运算的函数。
//求和
sum = function sum(x) {
  var val = 0;
  for (var i = 0; i < x.length; i++) {
    val = val + x[i];
  }
  return val;
};
//数组相乘
Multi_array = function Multi_array(x, y) {
  res = [];
  for (var i = 0; i < x.length; i++) {
    res[i] = x[i] * y[i];
  }
  return res;
};
//数组相除
except_array = function except_array(x, y) {
  res = [];
  for (var i = 0; i < x.length; i++) {
    res[i] = x[i] / y[i];
  }
  return res;
};
//数组相求幂
pow_array = function pow_array(x, n) {
  var res = [];
  for (var i = 0; i < x.length; i++) {
    res[i] = Math.pow(x[i], n);
  }
  return res;
};
//数组求根号
sqrt_array = function sqrt_array(x, n) {
  var res = [];
  for (var i = 0; i < x.length; i++) {
    res[i] = Math.pow(x[i], 1 / n);
  }
  return res;
};
//开始间接不确定度的计算


//x+y
add_u = function add_u(ux, uy) {
  return Math.sqrt(Math.pow(ux, 2) + Math.pow(uy, 2));
};

//N=x*y
multiply_u = function multiply_u(ux, uy, x, y) {
  var N = sum(Multi_array(x, y)) / x.length;
  x_ = sum(x) / x.length;
  y_ = sum(y) / y.length;
  return Math.sqrt(Math.pow(ux / x_, 2) + Math.pow(uy / y_, 2)) * N;
};

//N=x/y
expect_u = function expect_u(ux, uy, x, y) {
  var N = sum(except_array(x, y)) / x.length;
  x_ = sum(x) / x.length;
  y_ = sum(y) / y.length;
  return Math.sqrt(Math.pow(ux / x_, 2) + Math.pow(uy / y_, 2)) * N;
};
//N = kx
linear_u = function linear_u(ux, k) {
  return Math.abs(k) * ux;
};
//N = X的n次方
pow_u = function pow_u(ux, x, n) {
  var u_N = n * ux / (sum(x) / x.length);
  var N_ = pow_array(x, n);
  return u_N * N_;
};
//N=X的n次根
sqrt_u = function sqrt_u(ux, x, n) {
  var u_N = 1 / n * ux / (sum(x) / x.length);
  var N_ = pow_array(x, n);
  return u_N * N_;
};
//N=(X的p次方y的q次方)/z的r次方
//好复杂先放弃了，正常实验也不会这种计算量吧

// complicate_u=(x,y,z,p,q,r)=>{

// }
//N=sinx
sin_u = function sin_u(ux, x) {
  var x_ = sum(x) / x.length;
  return Math.abs(Math.cos(x_) * ux);
};
//N=lnx
lnx_u = function lnx_u(ux, x) {
  return ux / (sum(x) / x.length);
};
module.exports = {
  add_u: add_u,
  multiply_u: multiply_u,
  expect_u: expect_u,
  linear_u: linear_u,
  pow_u: pow_u,
  sqrt_u: sqrt_u,
  sin_u: sin_u,
  lnx_u: lnx_u

  // setStarAndComment
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!***********************!*\\
  !*** ./dist/index.js ***!
  \\***********************/


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function runCode() {
  var util = __webpack_require__(/*! ../dist/util/公式/Formula */ "./dist/util/公式/Formula.js");

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
      var html = "<view class='page' style='background-color: rgba(244,244,244,0.6); height: 100%; position: fixed; width: 100%; z-index: -1;'>  <view class='containers' style='margin: 10rpx;'>    <view class='title' style='color: rgba(16,16,16,0.5); font-weight: 800; margin: 20rpx 0rpx; text-align: center;'>\\u95F4\\u63A5\\u4E0D\\u786E\\u5B9A\\u5EA6\\u7684\\u8BA1\\u7B97</view>    <picker mode='selector' range='" + (_typeof(this.data.multiArray) === "object" ? JSON.stringify(this.data.multiArray) : this.data.multiArray) + "' value='" + (_typeof(this.data.multiIndex) === "object" ? JSON.stringify(this.data.multiIndex) : this.data.multiIndex) + "' bindchange='bindMultiPickerChange'>      <view  " + (this.data.dark === 'dark' ? 'style="    filter: invert(80%)!important;    /* color:white */  "' : '') + " class='title-choose-text' style='background-color: #B2E2F7; border-radius: 10rpx; color: white; display: flex; font-size: 26rpx; justify-content: center; margin-top: 50rpx; padding: 10rpx;'><text>" + (_typeof(this.data.instrument_name) === "object" ? JSON.stringify(this.data.instrument_name) : this.data.instrument_name) + "</text>        <image class='title-choose-image' src='data:image/png;base64,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' style='height: 28rpx; margin-left: 10rpx; vertical-align: middle; width: 28rpx;'></image>      </view>    </picker>    " + (_typeof(this.data.show) === "object" ? JSON.stringify(this.data.show) : this.data.show ? "<view style='sec'  style='margin-top: 50rpx;'>      <view class='sec_title' style='color: rgba(16,16,16,0.5); font-size: 28rpx; font-weight: 800;'>\\u5B9E\\u9A8C\\u6570\\u636E\\u8F93\\u5165</view>      <view>        <input type='text' id='x_value' value='" + (_typeof(this.data.x_value) === "object" ? JSON.stringify(this.data.x_value) : this.data.x_value) + "' bindinput='computer_input' placeholder='\\u8BF7\\u8F93\\u5165\\u516C\\u5F0F\\u4E2Dx\\u7684\\u5B9E\\u9A8C\\u6570\\u636E\\uFF0C\\u4EE5\\u7A7A\\u683C\\u5206\\u5F00' style='border: 1rpx solid rgba(187,187,187,0.3); border-radius: 10rpx; font-size: 24rpx; height: 70rpx; margin: 20rpx; padding: 0rpx 15rpx;'></input>      </view>      <view>        <input type='text' id='y_value' value='" + (_typeof(this.data.y_value) === "object" ? JSON.stringify(this.data.y_value) : this.data.y_value) + "' bindinput='computer_input' placeholder='\\u8BF7\\u8F93\\u5165\\u516C\\u5F0F\\u4E2Dy\\u7684\\u5B9E\\u9A8C\\u6570\\u636E\\uFF0C\\u4EE5\\u7A7A\\u683C\\u5206\\u5F00' style='border: 1rpx solid rgba(187,187,187,0.3); border-radius: 10rpx; font-size: 24rpx; height: 70rpx; margin: 20rpx; padding: 0rpx 15rpx;'></input>      </view>    </view>" : "1") + "q    <view class='third' style='margin-top: 50rpx;'>      <view class='third_title' style='color: rgba(16,16,16,0.5); font-size: 28rpx; font-weight: 800;'>\\u53C2\\u6570\\u8F93\\u5165</view>      <view class='third-input' style='align-items: center; display: flex; font-size: 24rpx; margin: 20rpx;'>        <text class='describe' style='white-space: nowrap;'>x\\u7684\\u4E0D\\u786E\\u5B9A\\u5EA6\\uFF1A</text>        <input type='text' style='third_input_1' id='uncertain_x' value='" + (_typeof(this.data.uncertain_x) === "object" ? JSON.stringify(this.data.uncertain_x) : this.data.uncertain_x) + "' placeholder='\\u8BF7\\u8F93\\u5165\\u516C\\u5F0F\\u4E2Dx\\u7684\\u4E0D\\u786E\\u5B9A\\u5EA6' bindinput='computer_input' style='border: 1rpx solid rgba(187,187,187,0.3); border-radius: 10rpx; font-size: 24rpx; height: 70rpx; margin: 20rpx; margin-bottom: 0rpx; margin-right: 0rpx; margin-top: 0rpx; padding: 0rpx 15rpx; width: 100%;'></input>      </view>      <view class='third-input' style='align-items: center; display: flex; font-size: 24rpx; margin: 20rpx;'>        <text class='describe' style='white-space: nowrap;'>y\\u7684\\u4E0D\\u786E\\u5B9A\\u5EA6\\uFF1A</text>        <input placeholder='\\u8BF7\\u8F93\\u5165\\u516C\\u5F0F\\u4E2Dy\\u7684\\u4E0D\\u786E\\u5B9A\\u5EA6' id='uncertain_y' value='" + (_typeof(this.data.uncertain_y) === "object" ? JSON.stringify(this.data.uncertain_y) : this.data.uncertain_y) + "' class='third_input_2' bindinput='computer_input' type='text' style='border: 1rpx solid rgba(187,187,187,0.3); border-radius: 10rpx; font-size: 24rpx; height: 70rpx; margin: 20rpx; margin-bottom: 0rpx; margin-right: 0rpx; margin-top: 0rpx; padding: 0rpx 15rpx; width: 100%;'></input>      </view>    </view>    <view class='end' style='color: rgba(16,16,16,0.5); display: flex; font-size: 28rpx; font-weight: 800; margin-right: 20rpx; margin-top: 50rpx;'>      <text class='end_text' style='margin-right: 20rpx;'>\\u95F4\\u63A5\\u4E0D\\u786E\\u5B9A\\u5EA6</text>      <view class='line' style='border-bottom: 1rpx solid rgba(144,144,144,0.3); color: black; display: flex; font-size: 24rpx; font-weight: 100; justify-content: center; margin-top: 10rpx; position: absolute; right: 30rpx; vertical-align: baseline; width: 65%;'>" + (_typeof(this.data.computer_value) === "object" ? JSON.stringify(this.data.computer_value) : this.data.computer_value) + "</view>    </view>    <view  " + (this.data.dark === 'dark' ? 'style="    filter: invert(80%)!important;    /* color:"" */  "' : '') + " class='submit' bindtap='sumbit' style='background-color: #A1DFCD; border-radius: 10rpx; color: white; font-weight: 800; margin: 0 auto; margin-top: 50rpx; padding: 10rpx; text-align: center; width: 30%;'>      \\u8BA1\\u7B97          </view>  </view></view>";
      this.setData({ html: this.parse(html) });
    },

    /**
     * 页面的初始数据
     */
    data: {
      multiArray: ["N = x + y", "N = x * y", "N = x / y", "N = kX"],
      index: -1,
      instrument_name: "请选择使用的公式",
      show: false, //数据输入的状态
      uncertain_x: "",
      uncertain_y: "",
      x_value: "",
      y_value: "",
      computer_value: "NAN"
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
    //校验数据类型
    //提交表单前的数据处理

    checkoutData: function checkoutData(check_value, type) {
      if (type == "number") {
        if (isNaN(Number(check_value))) {
          return "输入格式错误";
        } else {
          return Number(check_value);
        }
      }
      if (type == "array") {
        var value = check_value.split(" ");
        console.log(value);
        var res = [];
        var flag = 0;
        value.forEach(function (element) {
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
      }
    },
    computer_input: function computer_input(e) {
      console.log(e);
      this.setdata(_defineProperty({}, e.target.id, e.detail.value));
    },
    sumbit: function sumbit() {
      var uncertain_x = this.checkoutData(this.data.uncertain_x, "number");
      var uncertain_y = this.checkoutData(this.data.uncertain_y, "number");
      var x_value = this.checkoutData(this.data.x_value, "array");
      var y_value = this.checkoutData(this.data.y_value, "array");
      if (this.data.index == 0) {
        var res = util.add_u(uncertain_x, uncertain_y);
        console.log(res);
      } else if (this.data.index == 1) {
        var _res = util.multiply_u(uncertain_x, uncertain_y, x_value.y_value);
        console.log(_res);
      } else if (this.data.index == 2) {
        var _res2 = util.expect_u(uncertain_x, uncertain_y, x_value, y_value);
        console.log(_res2);
      }
      // else if(this.data.index==3){

      // }
      // switch (this.data.index){
      //   case 1:
      //     let res = util.add_u(Number(this.data.uncertain_x),Number(this.data.uncertain_y))
      //   case 2:

      // }
    },

    bindMultiPickerChange: function bindMultiPickerChange(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value);
      this.setdata({
        index: e.detail.value,
        instrument_name: this.data.multiArray[e.detail.value]
      });
      console.log(e.detail.value);
      if (this.data.index == 0) {
        this.setdata({ show: false });
      } else if (this.data.index == 1 || 2) {
        this.setdata({ show: true });
      }
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
}();
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
