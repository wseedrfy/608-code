// logs.js
const util = require('../../../utils/util.js')
const app = getApp(); //全局变量
import * as echarts from '../ec-canvas/echarts';
Page({
    data: {
        ec:{
        lazyLoad: true
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
    //echarts数据可视化
  setOption(chart,echarr) {
    var option = {
      title: {
        text: '统计图',
        subtext: '任务时间占比',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '分钟',
          type: 'pie',
          radius: '50%',
          data:
          echarr,
          //  [
          //   { value: 1048, name: '学习' },
          //   { value: 735, name: '阅读' },
          //   { value: 580, name: '娱乐' },
          //   { value: 484, name: '思考' },
          //   { value: 300, name: '运动' }
          // ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    chart.setOption(option);
  },
  echarts_opt(echarr){//echart库有代码
    let ecComponent = this.selectComponent('#mychart-dom');
    ecComponent.init((canvas, width, height, dpr) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      //调用设定EChart报表状态的函数，并且把从后端拿到的数据传过去
      this.setOption(chart,echarr);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    })
  },
  get_data(){
    let that = this
    let username = wx.getStorageSync('args').username 
    wx.cloud.database().collection("totaltime").where({username:username}).get().then(res=>{
      console.log(res);
      let logs=res.data[0].logs
      console.log(logs);
      var i=0
      let time = logs[i].time
      var itemtotaltime = 0
      let tempArr=[]
      for(let i=0;i<logs.length;i++){
        if(tempArr.includes(logs[i].cate)==false){
          tempArr.push(logs[i].cate)
        }
      }
      let addObj=[]
      for(let j=0;j<tempArr.length;j++){
        let sum=0
        for(let k=0;k<logs.length;k++){
          if(logs[k].cate==tempArr[j]){
            sum+=logs[k].time
          }
        }
        addObj.push(tempArr[j]=sum)
      }
      console.log(addObj);
      console.log(itemtotaltime);
      //for循环构造arr
      let echarr=[]
      let cateArr=this.data.cateArr
      for(let a=0 ; a<addObj.length ; a++){
        let arr=[]
        arr={value:addObj[a],name: cateArr[a].text }
        echarr.push(arr)
      }
      console.log(echarr)
      that.echarts_opt(echarr)
    })
  },
  abc(){
     var sum = []
     let a =[]
     let c= []
     let res={}
    a=[{"id":1,"time":2},
       {"id":2,"time":2},
       {"id":2,"time":2},
       {"id":3,"time":2},
       {"id":1,"time":2},
       {"id":1,"time":2}]
   for (var i = 0 ;i<a.length;i++){
        if(res[a[i]["id"]]==undefined){
            let re = []
            re.push(a[i])
             console.log(i+1)
            console.log(a[i]["id"])
            res[a[i]["id"]]=re
            console.log(res)
        }
        else{
            console.log(i+1)
            console.log(a[i]["id"])
            c= res[a[i]["id"]]
            var sum = 0
            c.push(a[i])
            console.log(c);
            // for(var a=o;a<c.length;a++){
            //   sum = sum + c[a].time
            // }
            // c.splice(0,1,{id: a[i].id, time:sum})
            res[a[i]["id"]]=c
        }
   }
      console.log(res);//哈希表
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
              console.log("学号获取失败失败失败");
            }
          });

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
                wx.showToast({
                  title: '您还没有数据',
                  icon:"none"
                })
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
        wx.showLoading({
          title: '加载中',
          mask:true
        }).then(res=>{
          this.get_data()
          wx.hideLoading()
        })
        //console.log(e.currentTarget.dataset)
        let index = e.currentTarget.dataset.index;
        this.setData({
          navState:index
        })
    },
})