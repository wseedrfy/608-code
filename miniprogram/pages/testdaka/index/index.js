// pages/testdaka/index/index.js
const db = wx.cloud.database();
const _ = db.command;

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    

    // 获取当天时间，看是否可以打卡
    // 注意：当滑动时执行：故不用进行判断是否重复打卡
    allowDaka(res){
        console.log(res);
        var nowDate = new Date();
        var day = nowDate.getDay();
        //1.获取res的里面的关于打卡学号、周期、任务的信息
        let username = wx.getStorageSync('args').username 
        var cycle = res.data.cycle;
        var task = res.data.task;
        //2.看今日day是否在cycle里面
        //由于页面渲染的数据来源于username，故不用判断
        db.collection('daka_record').where()
        if(cycle.length == 1 && cycle[0] == '每天'){
            this.daka();
            return;
        }

        for(var i = 0; i < cycle.length; i++){
            if(cycle[i] == '星期一'){
                if(day == 1){
                    this.daka(username, task);
                    return;
                }
            }else if(cycle[i] == '星期二'){
                if(day == 2){
                    this.daka(username, task);
                    return;
                }
            }else if(cycle[i] == '星期三'){
                if(day == 3){
                    this.daka(username, task);
                    return;
                }
            }else if(cycle[i] == '星期四'){
                if(day == 4){
                    this.daka(username, task);
                    return;
                }
            }else if(cycle[i] == '星期五'){
                if(day == 5){
                    this.daka(username, task);
                    return;
                }
            }else if(cycle[i] == '星期六'){
                if(day == 6){
                    this.daka(username, task);
                    return;
                }
            }else if(cycle[i] == '星期日'){
                if(day == 0){
                    this.daka(username, task);
                    return;
                }
            }
        }
        
        return "根据任务日历，今日不可打卡"
    },

    //打卡：打卡后记得把滑动键锁死，不让其动。避免再次触发打卡函数
    daka(username, task){
        db.collection("daka_status").where({
            username:username,
            task:task
        }).update({
            isDaka:true,
            //次数自增1
            count:_.inc(1)
        })

        console.log('今日打卡成功！');
    },

    //获取数据交与页面渲染
    getDaka_record(){
        let username = wx.getStorageSync('args').username;
        db.collection("daka_record").where({
            username:username
        }).get().then(res=>{
            var data = res.data;
            //语法问题1：如此返回wxml通过wx:for是否能获取的到
            //还未处理的问题2：如何获取到打卡的状态然后一起返回
            return data;
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getDaka_record();
    },

    
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})