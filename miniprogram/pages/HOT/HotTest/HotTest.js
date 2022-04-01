
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
            var html = "<view  class='container'>  <view  class='home' style='background-color: white; border-radius: 12rpx; margin-left: 2.6%; margin-top: 15rpx; width: 95%;'>  <view  class='home_title' style='display: flex; height: 40px; margin-left: 15rpx; margin-top: 15rpx;'>  <view  class='title' style='display: flex; height: 40px; margin-left: 15rpx; margin-top: 15rpx;'> \\u9996\\u9875\\u6309\\u952E  </view> <view  class='blank' style='width: 50%;'>   </view> <view  class='manager' bindtap='Manage' style='" + (_typeof(this.data.ismanage) === "object" ? JSON.stringify(this.data.ismanage) : this.data.ismanage) + ": ?; background-color: white; flex: auto; height: 20px; margin-right: 25rpx; margin-top: 15rpx; text-align: right;'> " + (_typeof(this.data.manage_text) === "object" ? JSON.stringify(this.data.manage_text) : this.data.manage_text) + "  </view> " + ((_typeof(this.data.ismanage) === "object" ? JSON.stringify(this.data.ismanage) : this.data.ismanage) ? "<view  class='save' bindtap='save' style='display: flex; margin-right: 25rpx; margin-top: 15rpx;'> \\u4FDD\\u5B58  </view> " : "") + " </view> <view  class='home_btn'>  <view  class='iconnBar_remove' style='background-color: rgba(255, 255, 255, 0.7); border-radius: 20rpx; display: flex; flex-direction: row; flex-wrap: wrap; width: 710rpx;'>  <movable-area  class='moveArea' style='background-color: rgba(255, 255, 255, 0.7); border-radius: 20rpx; display: flex; flex-direction: row; flex-wrap: wrap; height: " + (_typeof(this.data.itemWrapHeight) === "object" ? JSON.stringify(this.data.itemWrapHeight) : this.data.itemWrapHeight) + "px; margin-bottom: 15rpx; width: 710rpx;'>  " + this.data.list.map(function (item, index) {
                return "<movable-view  class='iconn' wx:key='key' id='" + (_typeof(item.key) === "object" ? JSON.stringify(item.key) : item.key) + "' x='" + (((typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index) == (_typeof(_this.data.cur) === "object" ? JSON.stringify(_this.data.cur) : _this.data.cur) ? _typeof(_this.data.tranX) === "object" ? JSON.stringify(_this.data.tranX) : _this.data.tranX : _typeof(item.tranX) === "object" ? JSON.stringify(item.tranX) : item.tranX) + "' y='" + (((typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index) == (_typeof(_this.data.cur) === "object" ? JSON.stringify(_this.data.cur) : _this.data.cur) ? _typeof(_this.data.tranY) === "object" ? JSON.stringify(_this.data.tranY) : _this.data.tranY : _typeof(item.tranY) === "object" ? JSON.stringify(item.tranY) : item.tranY) + "' direction='all' disabled='" + (((typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index) == (_typeof(_this.data.cur) === "object" ? JSON.stringify(_this.data.cur) : _this.data.cur) ? _typeof(_this.data.disable) === "object" ? JSON.stringify(_this.data.disable) : _this.data.disable : 'true') + "' bind:longpress='longPress' capture-catch:touchmove='touchMove' catch:touchend='touchEnd' friction='10000' damping='1000' style='height: calc(150rpx - 30rpx); padding-bottom: 10px; width: 20%;'>  <view  class='iconn_item' id='" + (_typeof(item.data.url) === "object" ? JSON.stringify(item.data.url) : item.data.url) + "'>  " + ((_typeof(item.data.name) === "object" ? JSON.stringify(item.data.name) : item.data.name) !== '更多' ? "<view >  <navigator  class='icon_item_url' url='" + ((_typeof(_this.data.ismanage) === "object" ? JSON.stringify(_this.data.ismanage) : _this.data.ismanage) ? '' : _typeof(item.data.url) === "object" ? JSON.stringify(item.data.url) : item.data.url) + "' open-type='" + ((_typeof(item.data.type) === "object" ? JSON.stringify(item.data.type) : item.data.type) === 'tab跳转' ? 'switchTab' : 'navigate') + "' style='align-items: center; display: flex; flex-direction: column; justify-content: center; min-width: 120rpx;'>  <image  class='iconn_item_image' src='" + (_typeof(item.data.icon) === "object" ? JSON.stringify(item.data.icon) : item.data.icon) + "' style='display: block; height: 80rpx; width: 80rpx;'>   </image> <text  style='color: #888; display: block; font-size: 26rpx; line-height: 30rpx; margin-top: 10rpx; text-align: center;'> " + (_typeof(item.data.name) === "object" ? JSON.stringify(item.data.name) : item.data.name) + "  </text>  </navigator> <view  bindtap='remove_click' id='" + ((typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index) + "'>  " + ((_typeof(_this.data.ismanage) === "object" ? JSON.stringify(_this.data.ismanage) : _this.data.ismanage) ? "<image  class='jianjian' src='../../../images/zan.png' style='height: 35rpx; position: absolute; right: 5rpx; top: 0rpx; width: 35rpx;'>   </image> " : "") + " </view>  </view> " : "") + "<view  class='icon_item_url' style='align-items: center; display: flex; flex-direction: column; justify-content: center; min-width: 120rpx;'wx:else=''>  <image  class='iconn_item_image' src='" + (_typeof(item.icon) === "object" ? JSON.stringify(item.icon) : item.icon) + "' style='display: block; height: 80rpx; width: 80rpx;'>   </image> <text  style='color: #888; display: block; font-size: 26rpx; line-height: 30rpx; margin-top: 10rpx; text-align: center;'> " + (_typeof(item.name) === "object" ? JSON.stringify(item.name) : item.name) + "  </text>  </view>  </view>  </movable-view> ";
            }) + " </movable-area>  </view>  </view>  </view> <view  class='other_btn' style='background-color: white; border-radius: 12rpx; margin-left: 2.6%; margin-top: 25rpx; width: 95%;'>  <view  class='other_title' style='margin-bottom: 15rpx; margin-left: 20rpx; padding-top: 15rpx;'> \\u5176\\u4F59  </view> " + (!(_typeof(this.data.other_iconList) === "object" ? JSON.stringify(this.data.other_iconList) : this.data.other_iconList) ? "<view  class='other_message' style='color: rgba(128, 128, 128, 0.507); margin-top: 100px; text-align: center;'> \\u8FD8\\u6CA1\\u6709\\u591A\\u4F59\\u7684\\u5E94\\u7528\\u54E6~~  </view> " : "") + "<view wx:else=''>  <view  class='iconn_add' style='background-color: rgba(255, 255, 255, 0.7); border-radius: 20rpx; display: flex; flex-direction: row; flex-wrap: wrap; margin-bottom: 15px; width: 710rpx;'>  " + this.data.other_iconList.map(function (item, index) {
                return "<view  class='icon' wx:key='key' direction='all' bindtap='" + ((_typeof(_this.data.ismanage) === "object" ? JSON.stringify(_this.data.ismanage) : _this.data.ismanage) ? _typeof(_this.data.add_click) === "object" ? JSON.stringify(_this.data.add_click) : _this.data.add_click : '') + "' style='align-items: center; display: flex; flex-direction: column; height: calc(150rpx - 30rpx); justify-content: center; padding: 17rpx 0 10rpx 0; position: relative; width: 20%;'>  <view  class='icon_item' id='" + (_typeof(item.url) === "object" ? JSON.stringify(item.url) : item.url) + "'>  <navigator  class='icon_item_url' url='" + ((_typeof(_this.data.ismanage) === "object" ? JSON.stringify(_this.data.ismanage) : _this.data.ismanage) ? '' : _typeof(item.url) === "object" ? JSON.stringify(item.url) : item.url) + "' open-type='" + ((_typeof(item.type) === "object" ? JSON.stringify(item.type) : item.type) === 'tab跳转' ? 'switchTab' : 'navigate') + "' style='align-items: center; display: flex; flex-direction: column; justify-content: center; min-width: 120rpx;'>  <image  class='icon_item_image' src='" + (_typeof(item.icon) === "object" ? JSON.stringify(item.icon) : item.icon) + "' style='display: block; height: 80rpx; width: 80rpx;'>   </image> <text  style='color: #888; display: block; font-size: 26rpx; line-height: 30rpx; margin-top: 10rpx; text-align: center;'> " + (_typeof(item.name) === "object" ? JSON.stringify(item.name) : item.name) + "  </text>  </navigator> " + ((_typeof(_this.data.ismanage) === "object" ? JSON.stringify(_this.data.ismanage) : _this.data.ismanage) ? "<view  bindtap='add_click' id='" + ((typeof index === "undefined" ? "undefined" : _typeof(index)) === "object" ? JSON.stringify(index) : index) + "'>  " + ((_typeof(_this.data.ismanage) === "object" ? JSON.stringify(_this.data.ismanage) : _this.data.ismanage) ? "<image  class='jiajia' src='../../../images/zan1.png' style='height: 35rpx; position: absolute; right: 8rpx; top: 5rpx; width: 35rpx;'>   </image> " : "") + " </view> " : "") + " </view>  </view> ";
            }) + " </view>  </view>  </view> <view  class='trail' style='color: rgba(128, 128, 128, 0.603); margin-top: 40rpx; text-align: center;'> \\u957F\\u6309\\u53EF\\u6392\\u5E8F  </view> <view  class='trail' style='color: rgba(128, 128, 128, 0.603); margin-top: 40rpx; text-align: center;'> We\\u6821\\u56ED~~  </view>  </view> ";
            this.setData({ html: this.parse(html) });
        },

        data: {
            ismanage: false, //判别状态
            manage_text: "管理",

            before_IconList: [], //点击取消，还原之前的首页按钮数组
            before_other_iconList: [], //点击取消，还原之前的其余按钮数组
            iconList: [], //首页按钮
            other_iconList: [], //其余按钮
            inform: [],

            //移动排序数据
            disable: true, //判断是否移动
            list: [],
            //移动
            itemTransition: false,
            //列数、行数
            columns: 5,
            rows: 0,
            //按钮框高度、宽度
            itemWrapHeight: 0
            //itemWrapWidth: 0,
        },

        //界面初始，读取首页按钮缓存、其余按钮缓存
        onShow: function onShow(options) {
            //从缓存中或取iconList
            var that = this;
            var other_btn = wx.getStorageSync('other_btn');
            that.setdata({
                other_iconList: other_btn.other_iconList,
                iconList: other_btn.iconList
            });
            this.init(); //按钮排序坐标初始化
        },

        //管理按钮，turn时触发移除、增加按钮；false时禁用
        Manage: function Manage() {
            var init_other_iconList = JSON.parse(JSON.stringify(this.data.other_iconList));
            var init_iconList = JSON.parse(JSON.stringify(this.data.list));

            if (this.data.ismanage) {
                this.setdata({
                    ismanage: false,
                    manage_text: "管理",
                    list: this.data._iconList,
                    // iconList: this.data.before_IconList,
                    other_iconList: this.data._other_iconList
                    // iconList:init_iconList,
                    // other_iconList:init_other_iconList
                });
                this.getWidth_Height();
                //刷新按钮排序也可以用这个函数
                this.getAfterRemove_Btn_Position(this.data.list);
            } else {
                this.setdata({
                    ismanage: true,
                    manage_text: "取消",
                    _iconList: init_iconList,
                    _other_iconList: init_other_iconList
                });
            }
        },

        //需求将obj这个对象拷贝出一个新对象修改新对象的值不会影响原对象的值
        //定义一个函数

        //移除按钮，把首页按键移除到其余按键
        remove_click: function remove_click(e) {
            var id = e.currentTarget.id;
            var arr = JSON.parse(JSON.stringify(this.data.list)); //上图标
            var other_arr = JSON.parse(JSON.stringify(this.data.other_iconList)); //下图标
            // console.log(arr,other_arr);

            other_arr.push(arr[id].data);
            arr.splice(id, 1);
            // console.log(arr);

            var list = this.getAfterRemove_Btn_Position(arr);

            //console.log(list)

            this.setdata({
                other_iconList: other_arr,
                list: list
            });

            this.getWidth_Height();
        },

        //增加按钮,把其余按键添加到首页按键
        add_click: function add_click(e) {
            var id = e.currentTarget.id;
            var arr = JSON.parse(JSON.stringify(this.data.list));
            var other_arr = JSON.parse(JSON.stringify(this.data.other_iconList));

            var data = this.getAdd_Btn_Position(other_arr[id]);

            arr.push(data);
            other_arr.splice(id, 1);

            arr.forEach(function (e, index) {
                if (e.data.name === '更多') {
                    arr[index] = arr.splice(arr.length - 1, 1, arr[index])[0];
                }
            });

            this.setdata({
                other_iconList: other_arr,
                list: arr
            });

            this.getWidth_Height(); //根据按键数，更改按钮框体大小
        },

        //保存排序，回到初始状态
        save: function save() {
            var that = this;

            //将list里面的data提取出来，赋值到iconList保存到手机内存上
            var iconList = [];
            var list = that.data.list.forEach(function (item) {
                //iconList.push(item.data)
                //因为移动会打乱数据排序，为了保存打乱的数据排序，要用item.key
                iconList[item.key] = item.data;
            });
            //避免深存储无法更改数据
            this.setdata({
                iconList: iconList
            });

            var arr = JSON.parse(JSON.stringify(this.data.iconList)); //上图标
            var other_arr = JSON.parse(JSON.stringify(this.data.other_iconList)); //下图标

            //console.log(that.data.iconList)
            var bb = {
                other_iconList: that.data.other_iconList,
                iconList: iconList
            };
            wx.setStorageSync('other_btn', bb);
            //回到初始状态
            that.setdata({
                ismanage: false,
                manage_text: "管理",
                _iconList: arr,
                _other_iconList: other_arr
            });
        },

        /**
         *移动排序代码
         *实现思路：
         *一、初始化init()， 
         **/
        init: function init() {
            var _this2 = this;

            var list = this.data.iconList.map(function (item, index) {
                var data = {
                    key: index,
                    tranX: 0,
                    tranY: 0,
                    data: item
                };
                return data;
            });
            this.setdata({
                list: list
            });

            // 获取每一项的宽高等属性
            this.createSelectorQuery().select(".iconn").boundingClientRect(function (res) {

                var rows = Math.ceil(_this2.data.list.length / _this2.data.columns); //获取行数

                _this2.item = res;

                _this2.getPosition(_this2.data.list, false);

                var itemWrapHeight = rows * res.height;

                //console.log("行数、按钮高度、按钮框体高度", rows, res.height, itemWrapHeight);


                //let itemWrapWidth = this.data.columns * res.width;
                //console.log("按钮框体高度、宽度", itemWrapHeight, itemWrapWidth);

                _this2.setdata({
                    itemWrapHeight: itemWrapHeight
                    //itemWrapWidth: itemWrapWidth
                });
            }).exec();
        },

        /**
         * 长按触发移动排序
         */
        longPress: function longPress(e) {
            //console.log(1111)
            //长按直接触发管理事件manage
            if (!this.data.ismanage) this.Manage();

            var list = [];

            this.data.list.forEach(function (item) {
                list[item.key] = item;
            });

            this.setdata({
                list: list,
                disable: false
            });

            //console.log(e)

            this.startX = e.changedTouches[0].pageX;
            this.startY = e.changedTouches[0].pageY;

            var index = e.currentTarget.id;
            //console.log(index)
            //console.log("key",this.data.list[index].key)

            //console.log("long",index)
            if (this.data.columns === 1) {
                // 单列时候X轴初始不做位移
                this.tranX = 0;
            } else {
                // 多列的时候计算X轴初始位移, 使 item 水平中心移动到点击处
                this.tranX = this.startX - this.item.width / 2 - 8;
            }

            // 计算Y轴初始位移, 使 item 垂直中心移动到点击处
            this.tranY = this.startY - this.item.height / 2 - 40;

            //console.log("计算后X/Y坐标",this.tranX, this.tranY);

            this.setdata({
                cur: index,
                //curZ: index,
                tranX: this.tranX,
                tranY: this.tranY
            });

            wx.vibrateShort();
        },
        touchMove: function touchMove(e) {
            if (this.data.disable) return; //如果不可动，直接返回

            //console.log(e)

            var tranX = e.touches[0].pageX - this.startX + this.tranX,
                tranY = e.touches[0].pageY - this.startY + this.tranY;

            // let tranX = e.detail.x,
            //     tranY = e.detail.y;


            this.setdata({
                tranX: tranX,
                tranY: tranY
            });

            //console.log(e);
            //触发拖到事件时，setdata无法更改e.currentTarget.id，只能读取数组中的key
            //否则会触发if (originKey == endKey || this.originKey == originKey) return;，结果无反应
            var originKey = this.data.list[e.currentTarget.id].key;

            //console.log("点击的index", originKey)
            var endKey = this.calculateMoving(tranX, tranY);
            //console.log(e)
            //console.log("id",this.originKey,originKey,endKey)
            //console.log("移动到的位置", endKey)
            // 防止拖拽过程中发生乱序问题
            if (originKey == endKey || this.originKey == originKey) return;

            this.originKey = originKey;

            this.insert(originKey, endKey);
        },


        /**
         * 根据当前的手指偏移量计算目标key
         */
        calculateMoving: function calculateMoving(tranX, tranY) {
            var rows = Math.ceil(this.data.list.length / this.data.columns) - 1,
                i = Math.round(tranX / this.item.width),
                j = Math.round(tranY / this.item.height);

            i = i > this.data.columns - 1 ? this.data.columns - 1 : i;
            i = i < 0 ? 0 : i;

            j = j < 0 ? 0 : j;
            j = j > rows ? rows : j;

            var endKey = i + this.data.columns * j;

            endKey = endKey >= this.data.list.length ? this.data.list.length - 1 : endKey;

            return endKey;
        },
        touchEnd: function touchEnd() {
            if (this.data.disable) return;

            this.clearData();
        },


        // /**
        //  * 根据排序后 list 数据进行位移计算
        //  */
        getPosition: function getPosition(data) {
            var _this3 = this;

            var vibrate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            var list = data.map(function (item, index) {
                item.tranX = _this3.item.width * (item.key % _this3.data.columns);
                item.tranY = Math.floor(item.key / _this3.data.columns) * _this3.item.height;
                // console.log(item.key)
                //console.log("每个按钮的坐标", item.tranX, item.tranY);
                return item;
            });

            this.setdata({
                list: list
            });

            //console.log("list",this.data.list)

            if (!vibrate) return;

            wx.vibrateShort();

            //let listData = []
            var iconListData = [];

            list.forEach(function (item) {
                //console.log("item",item)
                //listData[item.key] = item
                iconListData[item.key] = item.data;
            });

            this.setdata({
                //list: listData,
                iconList: iconListData
            });

            //this.triggerEvent('change', {list: listData});
            //console.log("list",this.data.list)
        },


        //去除一个按键，重新计算其余按键排序
        //刷新按钮坐标排序也可以用这个函数
        getAfterRemove_Btn_Position: function getAfterRemove_Btn_Position(data) {
            var _this4 = this;

            var list = data.map(function (item, index) {
                item.key = index;
                item.tranX = _this4.item.width * (item.key % _this4.data.columns);
                item.tranY = Math.floor(item.key / _this4.data.columns) * _this4.item.height;
                return item;
            });

            return list;
        },


        //增加一个按键，需计算其的位置x、y，直接调用init造成渲染重复
        getAdd_Btn_Position: function getAdd_Btn_Position(data) {
            console.log(this.data.list.length);
            var list = {
                data: data,
                key: this.data.list.length,
                tranX: this.item.width * (this.data.list.length % this.data.columns),
                tranY: Math.floor(this.data.list.length / this.data.columns) * this.item.height
            };

            return list;
        },


        //根据按键数，更改按钮框体大小
        getWidth_Height: function getWidth_Height() {
            var rows = Math.ceil(this.data.list.length / this.data.columns); //获取行数

            var itemWrapHeight = rows * this.item.height;

            var itemWrapWidth = this.data.columns * this.item.width;

            this.setdata({
                itemWrapHeight: itemWrapHeight,
                itemWrapWidth: itemWrapWidth
            });
        },

        insert: function insert(origin, end) {
            var list = void 0;
            if (origin < end) {
                list = this.data.list.map(function (item) {
                    //console.log("item",item)
                    if (item.key > origin && item.key <= end) {
                        item.key = item.key - 1;
                    } else if (item.key == origin) {
                        item.key = end;
                    }
                    return item;
                });
                this.getPosition(list);
            } else if (origin > end) {
                list = this.data.list.map(function (item) {
                    if (item.key >= end && item.key < origin) {
                        item.key = item.key + 1;
                    } else if (item.key == origin) {
                        item.key = end;
                    }
                    return item;
                });
                this.getPosition(list);
            }
        },
        /**
         * 清除参数
         */
        clearData: function clearData() {
            this.originKey = -1;

            this.setdata({
                disable: true,
                cur: -1,
                tranX: 0,
                tranY: 0
            });
        }
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
