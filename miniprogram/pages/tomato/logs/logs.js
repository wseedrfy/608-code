// logs.js
const util = require('../../../utils/util.js')
const app = getApp(); //全局变量

import * as echarts from '../ec-canvas/echarts';
function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "",
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['20%', '40%'],
      data: [{
        value: 55,
        name: '北京'
      }, {
        value: 20,
        name: '武汉'
      }, {
        value: 10,
        name: '杭州'
      }, {
        value: 20,
        name: '广州'
      }, {
        value: 38,
        name: '上海'
      }]
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
    data: {
        ecPie: {
            onInit: initChart
          },
        navState: 0,//导航状态
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
    navSwitch: function(e) {
        //console.log(e.currentTarget.dataset)
        let index = e.currentTarget.dataset.index;
        this.setData({
          navState:index
        })
    },
})