// index.js
const util = require('../../../utils/util.js')

// 获取应用实例
const app = getApp()
//动画出现严重问题bug !!!!!!!!!!!!!!!!!!
Page({
    data: {
        logsa:{},//放云端的logs
        clockshow: false,
        clockHeight: 0,
        time: '5',
        mTime: 300000,
        timeStr: '05:00',
        timer: null,
        rate: '',
        cateArr: [{
                icon: 'work',
                text: '工作'
            },
            {
                icon: 'study',
                text: '学习'
            },
            {
                icon: 'think',
                text: '思考'
            },
            {
                icon: 'write',
                text: '写作'
            },
            {
                icon: 'sport',
                text: '运动'
            },
            {
                icon: 'read',
                text: '阅读'
            }
        ],
        cateActive: '0',
        okShow: false,
        pauseShow: true,
        continueCancelShow: false,
        userInfo: {},
        hasUserInfo: false,

    },
    //监听加载页
    onLoad: function() {
        var res = wx.getSystemInfoSync(); //获取设备的信息
        var rate = 750 / res.windowWidth;
        //console.log(rate);
        this.setData({
            rate: rate,
            clockHeight: rate * res.windowHeight
        })
        let that = this
        wx.getStorage({
            key: 'args',
            success(res) {
              //console.log(res.data)
              that.setData({
                // storageInfo: JSON.parse(res.data),
                storageInfo: res.data,
              });
              //console.log(that.data.storageInfo.username)
            },
            fail(err) {
              console.log("失败失败失败");
            }
          })
    },
    getUserInfo(e) {
        // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
        console.log(e)
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
        app.globalData.userInfo = e.detail.userInfo
        app.globalData.hasUserInfo = true
    },
    onShow:function(){
    },
    //更新滑动条时间
    slideChange: function(e) {
        this.setData({
            time: e.detail.value
        })
    },
    //更新点击选择做的事件获取index
    clickCate: function(e) {
        this.setData({
            cateActive: e.currentTarget.dataset.index
        })
        console.log(e)
    },
    //更新开始键点击事件
    start: function() {
        this.setData({
            clockshow: true,
            mTime: this.data.time * 60 * 1000,
            timeStr: parseInt(this.data.time) >= 10 ? this.data.time + ':00' : '0' + this.data.time + ':00',
        })
        this.drawBg();
        this.drawActive();
    },
    //画黑圆
    drawBg: function() {
        //宽度转化为px
        var lineWidth = 6 / this.data.rate;
        var ctx = wx.createCanvasContext('progress_bg');
        ctx.setLineWidth(lineWidth);
        ctx.setStrokeStyle('#000000');
        ctx.setLineCap('round'); //形状
        ctx.beginPath(); //开新路径
        ctx.arc(400 / this.data.rate / 2, 400 / this.data.rate / 2, 400 / this.data.rate / 2 - 2 * lineWidth, 0, 2 * Math.PI, false);
        //(圆心x，y，度数0，到2*math.PI,逆时针false)
        ctx.stroke();
        ctx.draw();
    },
    //动态画圆
    drawActive: function() {
        var _this = this; //此this指向该页的page
        var timer = setInterval(function() {
            var angle = 1.5 + 2 * (_this.data.time * 60 * 1000 - _this.data.mTime) / (_this.data.time * 60 * 1000);
            var currentTime = _this.data.mTime - 100;
            _this.setData({
                mTime: currentTime
            });
            if (angle < 3.5) {
                if (currentTime % 1000 == 0) {
                    var timeStr1 = currentTime / 1000; //s
                    var timeStr2 = parseInt(timeStr1 / 60); //得到一个整的分钟数
                    var timeStr3 = (timeStr1 - timeStr2 * 60) >= 10 ? (timeStr1 - timeStr2 * 60) : '0' + (timeStr1 - timeStr2 * 60);
                    var timeStr2 = timeStr2 >= 10 ? timeStr2 : '0' + timeStr2;
                    _this.setData({
                        timeStr: timeStr2 + ':' + timeStr3
                    })
                }
                var lineWidth = 6 / _this.data.rate;
                var ctx = wx.createCanvasContext('progress_active');
                ctx.setLineWidth(lineWidth);
                ctx.setStrokeStyle('#ffffff');
                ctx.setLineCap('round'); //形状
                ctx.beginPath(); //开新路径
                ctx.arc(400 / _this.data.rate / 2, 400 / _this.data.rate / 2, 400 / _this.data.rate / 2 - 2 * lineWidth, 1.5 * Math.PI, angle * Math.PI, false);
                //(圆心x，y，度数0，到2*math.PI,逆时针false)  一点一点得画
                ctx.stroke();
                ctx.draw();
            } else {
                let logs = [
                    {date:util.formatTime(new Date),
                    cate: _this.data.cateActive,  
                    time: _this.data.time,}
                    ]
                let date=util.formatTime(new Date)
                let cate=_this.data.cateActive
                let time=_this.data.time
                let storageInfo=_this.data.storageInfo
                let username = storageInfo.username
                wx.cloud.database().collection("totaltime").where({username:username}).get().then(res=>{
                    let name = storageInfo.nickName
                    let touxiangurl = storageInfo.iconUrl
                    let len = res.data.length
                    let totaltime = wx.cloud.database().collection("totaltime")
                    let totalTime = 0
                    // let logs=_this.data.logsa
                    const _=wx.cloud.database().command
                    if (len == 0) { //用学号username判断用户在数据库有没有数据
                        console.log('123')
                        totaltime.add({
                            data: {
                                totalTime,
                                logs:logs,
                                name,
                                touxiangurl,
                                username:username
                            }
                        }).then(res => {
                            console.log(res);
                            wx.hideLoading();
                        })
                    }else {
                        console.log('ddd')
                        totaltime.where({username:username}).update({
                            data: {
                                logs: _.push({
                                    date:date,
                                    cate:cate,
                                    time:_this.data.time
                                })

                            }
                        }).then(res=>{
                            // console.log(logs);
                            console.log('添加成功')
                        })
                    }
                })
                _this.setData({
                    timeStr: '00:00',
                    okShow: true,
                    pauseShow: false,
                    continueCancelShow: false,
                })
                clearInterval(timer);
                console.log(logs);
            }
        }, 100);
        _this.setData({
            timer: timer
        })
    },
    //暂停
    pause: function() {
        clearInterval(this.data.timer);
        this.setData({
            pauseShow: false, //暂停框
            continueCancelShow: true, //继续放弃框
            okShow: false, //返回框
        })

    },
    continue: function() {
        this.drawActive();
        this.setData({
            pauseShow: true,
            continueCancelShow: false,
            okShow: false,
        })
    },
    cancel: function() {
        clearInterval(this.data.timer);
        this.setData({
            pauseShow: true,
            continueCancelShow: false,
            okShow: false,
            clockshow: false,
        })
    },
    
    ok: function() {
        clearInterval(this.data.timer);
        this.setData({
            pauseShow: true,
            continueCancelShow: false,
            okShow: false,
            clockshow: false,
        })
    },
    // 事件处理函数
    bindViewTap() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    statistics: function(){ 
        wx.navigateTo({
          url: '../logs/logs',
        })
    },
    rank: function() {
        wx.navigateTo({
          url: '../rank/rank',
        })
    },
    text(){
        wx.navigateTo({
          url: '../text/text',
        })
    },
    changeType: function(e) {
            let username = wx.getStorageSync('args').username
            wx.cloud.database().collection("totaltime").where({username:username}).get().then(res=>{
                let logs = res.data[0].logs
                //console.log(this.data.list)
            })
    },
    res(res){
        console.log(res)
    },
        
})