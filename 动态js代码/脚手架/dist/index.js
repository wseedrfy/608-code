/******/ (function() { // webpackBootstrap
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
<<<<<<< HEAD
      var html = "<view class='page' style='background-color: rgba(244,244,244,0.6); height: 100%; position: fixed; width: 100%; z-index: -1;'>  <view class='containers' style='margin: 10rpx;'>    <view class='title' style='color: rgba(16,16,16,0.5); font-weight: 800; margin: 20rpx 0rpx; text-align: center;'>\\u95F4\\u63A5\\u4E0D\\u786E\\u5B9A\\u5EA6\\u7684\\u8BA1\\u7B97</view>    <picker mode='selector' range='" + (_typeof(this.data.multiArray) === "object" ? JSON.stringify(this.data.multiArray) : this.data.multiArray) + "' value='" + (_typeof(this.data.multiIndex) === "object" ? JSON.stringify(this.data.multiIndex) : this.data.multiIndex) + "' bindchange='bindMultiPickerChange'>      <view  " + (this.data.dark === 'dark' ? 'style="    filter: invert(80%)!important;    /* color:white */  "' : '') + " class='title-choose-text' style='background-color: #B2E2F7; border-radius: 10rpx; color: white; display: flex; font-size: 26rpx; justify-content: center; margin-top: 50rpx; padding: 10rpx;'><text>" + (_typeof(this.data.instrument_name) === "object" ? JSON.stringify(this.data.instrument_name) : this.data.instrument_name) + "</text>        <image class='title-choose-image' src='data:image/png;base64,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' style='height: 28rpx; margin-left: 10rpx; vertical-align: middle; width: 28rpx;'></image>      </view>    </picker>    " + (_typeof(this.data.show) === "object" ? JSON.stringify(this.data.show) : this.data.show ? "<view style='sec'  style='margin-top: 50rpx;'>      <view class='sec_title' style='color: rgba(16,16,16,0.5); font-size: 28rpx; font-weight: 800;'>\\u5B9E\\u9A8C\\u6570\\u636E\\u8F93\\u5165</view>      <view>        <input type='text' id='x_value' value='" + (_typeof(this.data.x_value) === "object" ? JSON.stringify(this.data.x_value) : this.data.x_value) + "' bindinput='computer_input' placeholder='\\u8BF7\\u8F93\\u5165\\u516C\\u5F0F\\u4E2Dx\\u7684\\u5B9E\\u9A8C\\u6570\\u636E\\uFF0C\\u4EE5\\u7A7A\\u683C\\u5206\\u5F00' style='border: 1rpx solid rgba(187,187,187,0.3); border-radius: 10rpx; font-size: 24rpx; height: 70rpx; margin: 20rpx; padding: 0rpx 15rpx;'></input>      </view>      <view>        <input type='text' id='y_value' value='" + (_typeof(this.data.y_value) === "object" ? JSON.stringify(this.data.y_value) : this.data.y_value) + "' bindinput='computer_input' placeholder='\\u8BF7\\u8F93\\u5165\\u516C\\u5F0F\\u4E2Dy\\u7684\\u5B9E\\u9A8C\\u6570\\u636E\\uFF0C\\u4EE5\\u7A7A\\u683C\\u5206\\u5F00' style='border: 1rpx solid rgba(187,187,187,0.3); border-radius: 10rpx; font-size: 24rpx; height: 70rpx; margin: 20rpx; padding: 0rpx 15rpx;'></input>      </view>    </view>" : "1") + "q    <view class='third' style='margin-top: 50rpx;'>      <view class='third_title' style='color: rgba(16,16,16,0.5); font-size: 28rpx; font-weight: 800;'>\\u53C2\\u6570\\u8F93\\u5165</view>      <view class='third-input' style='align-items: center; display: flex; font-size: 24rpx; margin: 20rpx;'>        <text class='describe' style='white-space: nowrap;'>x\\u7684\\u4E0D\\u786E\\u5B9A\\u5EA6\\uFF1A</text>        <input type='text' style='third_input_1' id='uncertain_x' value='" + (_typeof(this.data.uncertain_x) === "object" ? JSON.stringify(this.data.uncertain_x) : this.data.uncertain_x) + "' placeholder='\\u8BF7\\u8F93\\u5165\\u516C\\u5F0F\\u4E2Dx\\u7684\\u4E0D\\u786E\\u5B9A\\u5EA6' bindinput='computer_input' style='border: 1rpx solid rgba(187,187,187,0.3); border-radius: 10rpx; font-size: 24rpx; height: 70rpx; margin: 20rpx; margin-bottom: 0rpx; margin-right: 0rpx; margin-top: 0rpx; padding: 0rpx 15rpx; width: 100%;'></input>      </view>      <view class='third-input' style='align-items: center; display: flex; font-size: 24rpx; margin: 20rpx;'>        <text class='describe' style='white-space: nowrap;'>y\\u7684\\u4E0D\\u786E\\u5B9A\\u5EA6\\uFF1A</text>        <input placeholder='\\u8BF7\\u8F93\\u5165\\u516C\\u5F0F\\u4E2Dy\\u7684\\u4E0D\\u786E\\u5B9A\\u5EA6' id='uncertain_y' value='" + (_typeof(this.data.uncertain_y) === "object" ? JSON.stringify(this.data.uncertain_y) : this.data.uncertain_y) + "' class='third_input_2' bindinput='computer_input' type='text' style='border: 1rpx solid rgba(187,187,187,0.3); border-radius: 10rpx; font-size: 24rpx; height: 70rpx; margin: 20rpx; margin-bottom: 0rpx; margin-right: 0rpx; margin-top: 0rpx; padding: 0rpx 15rpx; width: 100%;'></input>      </view>    </view>    <view class='end' style='color: rgba(16,16,16,0.5); display: flex; font-size: 28rpx; font-weight: 800; margin-right: 20rpx; margin-top: 50rpx;'>      <text class='end_text' style='margin-right: 20rpx;'>\\u95F4\\u63A5\\u4E0D\\u786E\\u5B9A\\u5EA6</text>      <view class='line' style='border-bottom: 1rpx solid rgba(144,144,144,0.3); color: black; display: flex; font-size: 24rpx; font-weight: 100; justify-content: center; margin-top: 10rpx; position: absolute; right: 30rpx; vertical-align: baseline; width: 65%;'>" + (_typeof(this.data.computer_value) === "object" ? JSON.stringify(this.data.computer_value) : this.data.computer_value) + "</view>    </view>    <view  " + (this.data.dark === 'dark' ? 'style="    filter: invert(80%)!important;    /* color:"" */  "' : '') + " class='submit' bindtap='sumbit' style='background-color: #A1DFCD; border-radius: 10rpx; color: white; font-weight: 800; margin: 0 auto; margin-top: 50rpx; padding: 10rpx; text-align: center; width: 30%;'>      \\u8BA1\\u7B97          </view>  </view></view>";
=======
      var html = "" + (_typeof(this.data.isLoading) === "object" ? JSON.stringify(this.data.isLoading) : this.data.isLoading ? "<view style='remind-box'  style='align-items: center; display: flex; flex: 1; flex-direction: column; justify-content: center;'>  <image class='remind-img' src='/images/loading.gif'></image></view>" : "<view wx:else>  <view  " + (this.data.dark === 'dark' ? 'style="    filter: invert(90%) !important;  "' : '') + " class='map_box' style='bottom: 130px; left: 0px; position: absolute; right: 0px; top: 0px;'>    <map style='height: 100%; width: 100%;' id='navi_map' longitude='" + (_typeof(this.data.userLongitude) === "object" ? JSON.stringify(this.data.userLongitude) : this.data.userLongitude) + "' latitude='" + (_typeof(this.data.userLatitude) === "object" ? JSON.stringify(this.data.userLatitude) : this.data.userLatitude) + "' scale='18' markers='" + (_typeof(this.data.markers) === "object" ? JSON.stringify(this.data.markers) : this.data.markers) + "' polyline='" + (_typeof(this.data.polyline) === "object" ? JSON.stringify(this.data.polyline) : this.data.polyline) + "' bindmarkertap='makertap' show-location subkey='JLHBZ-JQELU-I7HVD-B2XSN-5VU3Z-BZFDK' enable-3D='true' show-compass>      <cover-view style='controls " + (_typeof(this.data.fullscreen) === "object" ? JSON.stringify(this.data.fullscreen) : this.data.fullscreen ? "wx&class   ;    top  :   82 %   ;  " : "") + "' style='left: 85%; position: relative; top: 80%;'>        <cover-view>                  </cover-view>        <cover-view bindtap='popUp'>          <cover-image class='img' src='image/moveSchool.png' style='height: 80rpx; margin-top: 5px; width: 80rpx;'></cover-image>        </cover-view>        <cover-view bindtap='location'>          <cover-image class='img' src='image/location.png' style='height: 80rpx; margin-top: 5px; width: 80rpx;'></cover-image>        </cover-view>      </cover-view>    </map>  </view>    <view class='text_box' style='bottom: 0px; height: 130px; left: 0px; position: absolute; right: 0px;'>    <view class='text_box_text' style='margin: 15px;'>\\u5609\\u5E94\\u5B66\\u9662 (\\u90AE\\u7F16\\uFF1A525000)</view>    <view class='text_box_text' style='margin: 15px;'>\\u6C5F\\u5317\\u6821\\u533A\\uFF1A\\u5E7F\\u4E1C\\u7701\\u6885\\u5DDE\\u5E02\\u6885\\u6C5F\\u533A\\u6885\\u677E\\u8DEF100\\u53F7</view>    <view class='text_box_text' style='margin: 15px;'>\\u6C5F\\u5357\\u6821\\u533A\\uFF1A\\u5E7F\\u4E1C\\u7701\\u6885\\u5DDE\\u5E02\\u6885\\u6C5F\\u533A\\u4E09\\u89D2\\u9547\\u534E\\u5357\\u5927\\u905319\\u53F7</view>    <view class='text_box_text' style='margin: 15px;'>\\u5E08\\u8303\\u6821\\u533A\\uFF1A\\u5E7F\\u4E1C\\u7701\\u6885\\u5DDE\\u5E02\\u6885\\u53BF\\u533A\\u7A0B\\u6C5F\\u9547\\u5927\\u65B0\\u897F\\u8DEF241\\u53F7</view>    <view class='text_box_text' style='margin: 15px;'>\\u533B\\u5B66\\u9662\\uFF1A\\u5E7F\\u4E1C\\u7701\\u6885\\u5DDE\\u5E02\\u6885\\u6C5F\\u533A\\u9EC4\\u5858\\u8DEF146\\u53F7</view>  </view>  " + (_typeof(this.data.comEdit) === "object" ? JSON.stringify(this.data.comEdit) : this.data.comEdit ? "<view style='EditCom'  style='align-items: center; bottom: 0; display: flex; font-family: unset; justify-content: center; left: 0; position: fixed; right: 0; top: 0; z-index: 9999;'>    <view class='EditCom_background' bindtap='popUp' style='align-items: center; background-color: rgba(0, 0, 0, 0.171); bottom: 0; display: flex; font-family: unset; height: 100%; justify-content: center; left: 0; opacity: 0.6; position: fixed; right: 0; top: 0; z-index: 9999;'></view>    <view style='EditCom_contain " + (_typeof(this.data.edit_style) === "object" ? JSON.stringify(this.data.edit_style) : this.data.edit_style) + "' style='align-items: center; background-color: rgb(244, 244, 244); border-radius: 20rpx; bottom: 30rpx; display: flex; flex-direction: column; justify-content: center; padding: 0rpx; position: fixed; width: 95%; z-index: 99999;'>    <view class='EditCom_Title' style='align-items: center; color: rgba(70, 70, 70, 0.952); display: flex; font-size: 27rpx; justify-content: center; padding: 15rpx;'>\\u6821\\u533A\\u9009\\u62E9</view>    <picker bindchange='bindPickerChange' value='" + (_typeof(this.data.index) === "object" ? JSON.stringify(this.data.index) : this.data.index) + "' range='" + (_typeof(this.data.array) === "object" ? JSON.stringify(this.data.array) : this.data.array) + "'>      <view class='picker'>        \\u5F53\\u524D\\u9009\\u62E9\\uFF1A" + (_typeof(this.data.array[_typeof(this.data.index) === "object" ? JSON.stringify(this.data.index) : this.data.index]) === "object" ? JSON.stringify(this.data.array[_typeof(this.data.index) === "object" ? JSON.stringify(this.data.index) : this.data.index]) : this.data.array[_typeof(this.data.index) === "object" ? JSON.stringify(this.data.index) : this.data.index]) + "      </view>    </picker>    </view>  </view>" : "1") + "</view>");
>>>>>>> dd9ba3446a7b01a614b9adb0a885d60ab6bc3787
      this.setData({ html: this.parse(html) });
    },

    /**
     * 页面的初始数据
     */
    data: {
<<<<<<< HEAD
      multiArray: ["N = x + y", "N = x * y", "N = x / y", "N = kX"],
      index: -1,
      instrument_name: "请选择使用的公式",
      show: false, //数据输入的状态
      uncertain_x: "",
      uncertain_y: "",
      x_value: "",
      y_value: "",
      computer_value: "NAN"
=======
      mapHeight: "800",
      placeName: "",
      hideOrNot: 0,
      activePlaceID: -1,
      markers: [{
        id: 1,
        latitude: 24.276696602909194,
        longitude: 116.11826238028718,
        iconPath: "../image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '理科楼',
          display: 'ALWAYS'
        }
      }, {
        id: 2,
        latitude: 24.276202707342065,
        longitude: 116.11729678504182,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '17栋',
          display: 'ALWAYS'
        }
      }, {
        id: 3,
        latitude: 24.287994546817508,
        longitude: 116.09116305325315,
        iconPath: "image/shitang.png",
        width: 23,
        height: 24,
        callout: {
          content: '梅师超顺饭堂',
          display: 'ALWAYS'
        }
      }, {
        id: 4,
        latitude: 24.287358895845834,
        longitude: 116.08919431183622,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '艺术楼（师范）',
          display: 'ALWAYS'
        }
      }, {
        id: 5,
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
        id: 6,
        latitude: 24.314904110637062,
        longitude: 116.09845866177366,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '教学楼（医学院）',
          display: 'ALWAYS'
        }
      }, {
        id: 7,
        latitude: 24.31473301043974,
        longitude: 116.09653283570097,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '医学基础实验楼',
          display: 'ALWAYS'
        }
      }, {
        id: 8,
        latitude: 24.288537292435954,
        longitude: 116.08927477810667,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '北门',
          display: 'ALWAYS'
        }
      }, {
        id: 9,
        latitude: 24.288361267084177,
        longitude: 116.09139908764647,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '东门',
          display: 'ALWAYS'
        }
      }, {
        id: 10,
        latitude: 24.324453607827753,
        longitude: 116.12867631415558,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '嘉应学院-梅州市客家研究院',
          display: 'ALWAYS'
        }
      }, {
        id: 11,
        latitude: 24.325289488222086,
        longitude: 116.12851001719666,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '正南门',
          display: 'ALWAYS'
        }
      }, {
        id: 12,
        latitude: 24.325739199369874,
        longitude: 116.12793602446747,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '嘉应学院-县域经济研究院',
          display: 'ALWAYS'
        }
      }, {
        id: 13,
        latitude: 24.325563225632838,
        longitude: 116.12681486109925,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '大鑫豪文化传媒有限公司（嘉应学院分点）',
          display: 'ALWAYS'
        }
      }, {
        id: 14,
        latitude: 24.325431245169813,
        longitude: 116.12662174205018,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '5栋',
          display: 'ALWAYS'
        }
      }, {
        id: 15,
        latitude: 24.325265047353835,
        longitude: 116.12620331744385,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '4栋',
          display: 'ALWAYS'
        }
      }, {
        id: 16,
        latitude: 24.325719646745203,
        longitude: 116.12659491996003,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '6栋',
          display: 'ALWAYS'
        }
      }, {
        id: 17,
        latitude: 24.325660988850878,
        longitude: 116.12573124865723,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '2栋',
          display: 'ALWAYS'
        }
      }, {
        id: 18,
        latitude: 24.325929837310557,
        longitude: 116.125688333313,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '1栋',
          display: 'ALWAYS'
        }
      }, {
        id: 19,
        latitude: 24.326291559792615,
        longitude: 116.12575807074738,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '7栋',
          display: 'ALWAYS'
        }
      }, {
        id: 20,
        latitude: 24.325880955814995,
        longitude: 116.12886943320466,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '德龙会堂',
          display: 'ALWAYS'
        }
      }, {
        id: 21,
        latitude: 24.32647730877433,
        longitude: 116.127850193779,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '田家炳科学馆',
          display: 'ALWAYS'
        }
      }, {
        id: 22,
        latitude: 24.32659951190328,
        longitude: 116.12887479762269,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '丽群图书馆',
          display: 'ALWAYS'
        }
      }, {
        id: 23,
        latitude: 24.32688791082026,
        longitude: 116.13116003970337,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '百年纪念大楼',
          display: 'ALWAYS'
        }
      }, {
        id: 24,
        latitude: 24.326716826796314,
        longitude: 116.12887479762269,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '宪梓艺术馆',
          display: 'ALWAYS'
        }
      }, {
        id: 25,
        latitude: 24.327450042416316,
        longitude: 116.12784482936097,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '中国农业银行（嘉大自助点）',
          display: 'ALWAYS'
        }
      }, {
        id: 26,
        latitude: 24.327557580350568,
        longitude: 116.12730838755799,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '水电中心',
          display: 'ALWAYS'
        }
      }, {
        id: 27,
        latitude: 24.327528251832142,
        longitude: 116.12820960978699,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '外国语学院',
          display: 'ALWAYS'
        }
      }, {
        id: 28,
        latitude: 24.327586908862276,
        longitude: 116.12881042460633,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '嘉应学院-企业管理研究中心',
          display: 'ALWAYS'
        }
      }, {
        id: 29,
        latitude: 24.328334783616885,
        longitude: 116.12969555358124,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '梅州市计算机学会',
          display: 'ALWAYS'
        }
      }, {
        id: 30,
        latitude: 24.328105044783037,
        longitude: 116.12860121230317,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '中国建设银行（嘉应学院校园e银行）',
          display: 'ALWAYS'
        }
      }, {
        id: 31,
        latitude: 24.328285903049025,
        longitude: 116.12773217658234,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '国际会议中心',
          display: 'ALWAYS'
        }
      }, {
        id: 32,
        latitude: 24.3285254176527,
        longitude: 116.12740494708252,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '1A栋',
          display: 'ALWAYS'
        }
      }, {
        id: 33,
        latitude: 24.3288871327267,
        longitude: 116.12665392855835,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '中1号楼',
          display: 'ALWAYS'
        }
      }, {
        id: 34,
        latitude: 24.32871116336029,
        longitude: 116.12751223544312,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '田家炳图书馆',
          display: 'ALWAYS'
        }
      }, {
        id: 34,
        latitude: 24.328540081797737,
        longitude: 116.12904645899964,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '世纪广场',
          display: 'ALWAYS'
        }
      }, {
        id: 34,
        latitude: 24.328848028444476,
        longitude: 116.12967946032715,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '宪梓体育馆',
          display: 'ALWAYS'
        }
      }, {
        id: 34,
        latitude: 24.329063101849158,
        longitude: 116.12812914351655,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '黄桂清大楼',
          display: 'ALWAYS'
        }
      }, {
        id: 34,
        latitude: 24.32954701567515,
        longitude: 116.13159992198182,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '李小平教学楼',
          display: 'ALWAYS'
        }
      }, {
        id: 34,
        latitude: 24.32924884676876,
        longitude: 116.13028563956452,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '田家炳师范学院',
          display: 'ALWAYS'
        }
      }, {
        id: 35,
        latitude: 24.329229294684872,
        longitude: 116.1292020271225,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '钦贞纪念楼',
          display: 'ALWAYS'
        }
      }, {
        id: 36,
        latitude: 24.329551903684454,
        longitude: 116.12959362963868,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '化学与环境学院',
          display: 'ALWAYS'
        }
      }, {
        id: 37,
        latitude: 24.329478583529443,
        longitude: 116.12899281481934,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '5栋（2）',
          display: 'ALWAYS'
        }
      }, {
        id: 38,
        latitude: 24.329478583529443,
        longitude: 116.12899281481934,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '5栋（2）',
          display: 'ALWAYS'
        }
      }, {
        id: 39,
        latitude: 24.32933683110943,
        longitude: 116.12884261111451,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '中4A宿舍',
          display: 'ALWAYS'
        }
      }, {
        id: 40,
        latitude: 24.329766975894533,
        longitude: 116.12855829695893,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '3栋（2）',
          display: 'ALWAYS'
        }
      }, {
        id: 41,
        latitude: 24.32980119189433,
        longitude: 116.1272922943039,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '嘉大家教在线',
          display: 'ALWAYS'
        }
      }, {
        id: 42,
        latitude: 24.329918503823556,
        longitude: 116.126230139534,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '西门',
          display: 'ALWAYS'
        }
      }, {
        id: 43,
        latitude: 24.330128687424832,
        longitude: 116.12655200461579,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '电子信息工程学院',
          display: 'ALWAYS'
        }
      }, {
        id: 45,
        latitude: 24.330236223086477,
        longitude: 116.12668611506653,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '菜鸟驿站',
          display: 'ALWAYS'
        }
      }, {
        id: 46,
        latitude: 24.330182455267405,
        longitude: 116.13023199538422,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '嘉应学院-理想拉链表面技术研究所',
          display: 'ALWAYS'
        }
      }, {
        id: 47,
        latitude: 24.330514837784207,
        longitude: 116.13166429499817,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '易班发展中心',
          display: 'ALWAYS'
        }
      }, {
        id: 48,
        latitude: 24.330549053582025,
        longitude: 116.1311654041214,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '化学实验楼',
          display: 'ALWAYS'
        }
      }, {
        id: 49,
        latitude: 24.33075434817502,
        longitude: 116.13033928374482,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '15栋',
          display: 'ALWAYS'
        }
      }, {
        id: 50,
        latitude: 24.33119426403993,
        longitude: 116.12868704299164,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '桂英大楼',
          display: 'ALWAYS'
        }
      }, {
        id: 51,
        latitude: 24.330861883305424,
        longitude: 116.12710990409089,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '地理科学与旅游学院',
          display: 'ALWAYS'
        }
      }, {
        id: 52,
        latitude: 24.331487540435095,
        longitude: 116.13147654036713,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '嘉应学院东区食堂',
          display: 'ALWAYS'
        }
      }, {
        id: 53,
        latitude: 24.331712385211468,
        longitude: 116.13170721034241,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '学生宿舍',
          display: 'ALWAYS'
        }
      }, {
        id: 54,
        latitude: 24.332235392169498,
        longitude: 116.13144435385895,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '嘉应学院东区学生宿舍9',
          display: 'ALWAYS'
        }
      }, {
        id: 55,
        latitude: 24.332254943789636,
        longitude: 116.1312190483017,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '嘉应学院东区学生宿舍10',
          display: 'ALWAYS'
        }
      }, {
        id: 56,
        latitude: 24.332401580844436,
        longitude: 116.13033928374482,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '北门',
          display: 'ALWAYS'
        }
      }, {
        id: 57,
        latitude: 24.332108306565424,
        longitude: 116.12781264285279,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '音乐与舞蹈学院',
          display: 'ALWAYS'
        }
      }],
      distance: '',
      cost: '',
      polyline: [],
      // userLongitude: 110.922599,
      // userLatitude: 21.679529,
      userLongitude: 116.12839211437986,
      userLatitude: 24.32836897202351,
      inSchool: false,
      isLoading: false,
      comEdit: false,
      array: ['江北校区', '江南校区', '师范校区', '医学院'],
      index: 0
    },
    popUp: function popUp() {
      //控制弹窗
      var edit_style = 'edit_hide';
      // picker动画样式
      if (edit_style == undefined || edit_style == 'edit_hide') {
        edit_style = 'edit_show';
      } else {
        edit_style = 'edit_hide';
      }
      this.setdata({
        edit_style: edit_style,
        comEdit: !this.data.comEdit
      });
>>>>>>> dd9ba3446a7b01a614b9adb0a885d60ab6bc3787
    },

    /**
     * 生命周期函数--监听页面加载
     */
<<<<<<< HEAD
    onLoad: function onLoad(options) {
      var _this = this;
=======
    onLoad: function onLoad(e) {
      var _this2 = this;
>>>>>>> dd9ba3446a7b01a614b9adb0a885d60ab6bc3787

      options = this.options;this.data.dark = wx.getSystemInfoSync().theme;wx.onThemeChange(function (e) {
        console.log(e.theme);_this.setdata({ dark: e.theme });
      });this.setdata();
<<<<<<< HEAD
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
=======
      var _this = this;
      // wx.showModal({
      //   title: '选择校区',
      //   showCancel: true, //是否显示取消按钮
      //   content: "请选择校区",
      //   cancelText: "西城校区", //默认是“取消”
      //   confirmText: "官渡校区", //默认是“确定”
      //   success: function (res) {
      //     if (res.cancel) {
      //       console.log(233)
      //       _this.setdata({
      //         userLongitude: 110.818019,
      //         userLatitude: 21.654388
      //       })
      //     } else {

      //       _this.setdata({
      //         userLongitude: 110.922599,
      //         userLatitude: 21.679529,
      //       })
      //     }
      //   },
      //   fail: function (res) {}, //接口调用失败的回调函数
      //   complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
      // })


      // if (e.markerId !== '' && Object.keys(e).length !== 0) {
      //   _this.makertap(e);
      // }
      _this.popUp();
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
        success: function success(res) {
          _this.setdata({
            userLongitude: res.longitude,
            userLatitude: res.latitude
          });
        }
      });
    },
    onReady: function onReady() {
      var that = this;
      setTimeout(function () {
        that.setdata({
          isLoading: false
        });
      }, 800);
    },
    makertap: function makertap(e) {
      console.log(e);
      var id = e.markerId;
      var that = this;
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
        success: function success(res) {
          that.setdata({
            userLongitude: res.longitude,
            userLatitude: res.latitude
          });
          that.setdata({
            activePlaceID: id,
            placeName: that.data.markers[id].callout.content
          });
          var userLocation = that.data.userLongitude + ',' + that.data.userLatitude;
          var destination = that.data.markers[id].longitude + ',' + that.data.markers[id].latitude;
          that.planPolyline(userLocation, destination);
>>>>>>> dd9ba3446a7b01a614b9adb0a885d60ab6bc3787
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
    planPolyline: function planPolyline(origin, destination) {
      var that = this;
      var id = that.data.activePlaceID;
      //规划步行路线
      myAmapFun.getWalkingRoute({
        origin: origin,
        destination: destination,
        success: function success(data) {
          var points = [];
          if (data.paths && data.paths[0] && data.paths[0].steps) {
            var steps = data.paths[0].steps;
            for (var i = 0; i < steps.length; i++) {
              var poLen = steps[i].polyline.split(';');
              for (var j = 0; j < poLen.length; j++) {
                points.push({
                  longitude: parseFloat(poLen[j].split(',')[0]),
                  latitude: parseFloat(poLen[j].split(',')[1])
                });
              }
            }
          }
          that.setdata({
            json: data.paths[0],
            polyline: [{
              points: points,
              color: "#7acfa6",
              width: 6
            }]
          });
          if (data.paths[0] && data.paths[0].distance) {
            that.setdata({
              distance: data.paths[0].distance + '米'
            });
          }
          if (data.paths[0] && data.paths[0].duration) {
            that.setdata({
              cost: parseInt(data.paths[0].duration / 60) + '分钟'
            });
          }
          var markers = that.data.markers;
          var points = that.data.polyline[0].points;
          //暂时一共70个坐标点
          markers[22] = {
            id: 22,
            latitude: points[0].latitude,
            longitude: points[0].longitude,
            iconPath: '../..image/mapicon_navi_s.png',
            width: 23,
            height: 33
          };
          markers[23] = {
            id: 23,
            latitude: points[points.length - 1].latitude,
            longitude: points[points.length - 1].longitude,
            iconPath: '../..image/mapicon_navi_e.png',
            width: 24,
            height: 34
          };

          that.setdata({
            markers: markers
          });
        }
      });
    },
    location: function location() {
      var _this = this;
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
        success: function success(res) {
          _this.setdata({
            userLongitude: res.longitude,
            userLatitude: res.latitude
          });
        }
      });
    },
    moveSchool: function moveSchool() {
      //视图返回学校
      var _this = this;
      wx.showModal({
        title: '选择校区',
        showCancel: true, //是否显示取消按钮
        content: "请选择校区",
        cancelText: "西城校区", //默认是“取消”
        confirmText: "官渡校区", //默认是“确定”
        success: function success(res) {
          if (res.cancel) {
            _this.setdata({
              userLongitude: 110.818019,
              userLatitude: 21.654388
            });
          } else {
            _this.setdata({
              userLongitude: 110.922599,
              userLatitude: 21.679529
            });
          }
        },
        fail: function fail(res) {}, //接口调用失败的回调函数
        complete: function complete(res) {} //接口调用结束的回调函数（调用成功、失败都会执行）
      });
    },
    jtt: function jtt() {
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
    },
    goDetail: function goDetail() {
      var that = this;
      var latitude = that.data.markers[that.data.activePlaceID].latitude;
      var longitude = that.data.markers[that.data.activePlaceID].longitude;
      var name = that.data.markers[that.data.activePlaceID].callout.content;
      wx.openLocation({
        latitude: latitude,
        longitude: longitude,
        name: name,
        address: '嘉应学院',
        scale: 8
      });
    },
    bindPickerChange: function bindPickerChange(e) {
      this.setdata({
        index: e.detail.value
      });
      if (e.detail.value == 0) {
        this.setdata({
          userLongitude: 116.12839211437986,
          userLatitude: 24.32836897202351
        });
      } else if (e.detail.value == 1) {
        this.setdata({
          userLongitude: 116.11877202987671,
          userLatitude: 24.276034461207942
        });
      } else if (e.detail.value == 2) {
        this.setdata({
          userLongitude: 116.09064102172852,
          userLatitude: 24.28710509971846
        });
      } else if (e.detail.value == 3) {
        this.setdata({
          userLongitude: 116.09776496887207,
          userLatitude: 24.315090341354686
        });
      }
    }
  });
}
module.exports = runCode;
}();
/******/ })()
;
//# sourceMappingURL=index.js.map