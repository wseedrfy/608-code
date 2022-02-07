// logs.js
const util = require('../../../utils/util.js')
const app = getApp(); //全局变量

Page({
    data: {
        logsa:[{a:1},{b:2}],
        total:0,
        totalTime:0,
        downloaddata:{},
        storageInfo:{},
        logs: [],
        activeIndex: 0,
        dayList: [],
        list: [],
        totaltime123: 0,
        total123: 0,
        userInfo: {},
        hasUserInfo: false,
        sum: [{
                title: '今日番茄次数',
                val: '0'
            },
            {
                title: '累计番茄次数',
                val: '0'
            },
            {
                title: '今日专注时长',
                val: '0分钟'
            },
            {
                title: '累计专注时长',
                val: '0分钟'
            }
        ],
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
    },
    onShow: function() {
        let username = wx.getStorageSync('args').username 
        wx.cloud.database().collection("totaltime").where({username:username}).get().then(res=>{
             var logs=res.data[0].logs
             var day = 0;
             var total = logs.length;
             var dayTime = 0;
             var totalTime = 0;
             var dayList = [];
             if (logs.length > 0) {
                 for (var i = 0; i < logs.length; i++) {
                //if (!isNaN(logs[i].time)) {
                     if (logs[i].date.substr(0, 10) == util.formatTime(new Date).substr(0, 10)) {
                         day = day + 1;
                         dayTime = dayTime + parseInt(logs[i].time);
                         dayList.push(logs[i]);
                         this.setData({
                             dayList: dayList,
                             list: dayList
                         })
                     }
                // }
                     totalTime = totalTime + parseInt(logs[i].time);
                }
                  this.setData({
                    'sum[0].val': day,
                    'sum[1].val': total,
                    'sum[2].val': dayTime + '分钟',
                    'sum[3].val': totalTime + '分钟',
                    totaltime123: totalTime,
                    total123: total
                  })
                  this.updata()
             }
            
        })
         
    },
    onLoad(){
        let that = this
        wx.getStorage({
            key: 'args',
            success(res) {
            //   console.log(res.data)
              that.setData({
                // storageInfo: JSON.parse(res.data),
                storageInfo: res.data,
              });
            //   console.log(that.data.storageInfo.username)
            },
            fail(err) {
              console.log("失败失败失败");
            }
          });
        //   let username = wx.getStorageSync('args').username 
        //   wx.cloud.database().collection("totaltime").where({username:username}).get().then(res=>{
        //     that.setData({
        //          logsa:res.data[0].logs
        //      })
        //   });
    },
    updata(){
        wx.showLoading({
          title: '加载数据中',
        })
        let username = wx.getStorageSync('args').username
        wx.cloud.database().collection("totaltime").where({username:username}).get().then(res=>{
            let totaltime = wx.cloud.database().collection("totaltime")
            // let totalTime = this.data.totaltime123
            let len = res.data.length
            if(len == 0){
                console.log("数据库无数据");
                wx.hideLoading();
            }else{
                let totalTime=this.data.totaltime123
                totaltime.where({username:username}).update({
                    data:{
                        totalTime
                    }
                }).then(res=>{
                    //console.log(res)
                }).catch(err=>{
                    console.log(err)
                })
                wx.hideLoading();
            }

        })
    },
    changeType: function(e) {
        var index = e.currentTarget.dataset.index;
        if (index == 0) {
            this.setData({
                list: this.data.dayList
            })
        } else if (index == 1) {
            let username = wx.getStorageSync('args').username
            wx.cloud.database().collection("totaltime").where({username:username}).get().then(res=>{
                let logs = res.data[0].logs
                this.setData({
                    list : logs
                })
                //console.log(this.data.list)
            })
        }
        this.setData({
            activeIndex: index
        })
    },
})