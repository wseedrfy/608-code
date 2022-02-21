// pages/testdaka/index/index.js
const db = wx.cloud.database();
const _ = db.command;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        taskdaka:[]
    },
    add_task(){
        wx.navigateTo({
          url: '../record/record',
        })
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

    //杰哥看这里：还未解决的问题：打卡后记得把滑动键锁死，不让其动。避免再次触发打卡函数
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

    //滑动删除
    delDaka(res){
        var data = res.detail.value;
        //根据信息删除打卡记录表
        //不能删除打卡状态表，因为统计用
        let username = wx.getStorageSync('args').username;
        db.collection("daka_record").where({
            username:username,
            task:data.task
        }).remove().then(res=>{
            console.log(res);
        })
        //问题：刷新页面
        this.onLoad();
    },

    //获取数据交与页面渲染
    // getDaka_record(){
    //     let username = wx.getStorageSync('args').username;
    //     // db.collection("daka_record").aggregate() //选择我的审批表
    //     //   .lookup({
    //     //     from:"daka_status", //把tb_user用户表关联上
    //     //     localField: 'username', //审批表的关联字段
    //     //     foreignField: 'username', //用户表的关联字段
    //     //     as: 'matchResult' //匹配的结果作为uapproval相当于起个别名
    //     //   }).match({
    //     //       username: username
    //     //   }).end({
    //     //     success:function(res){
    //     //       console.log(res);
    //     //     },
    //     //     fail(error) {
    //     //       console.log(error);
    //     //     }
    //     //   })

    //     //用username查找uuid
    //     var dakaArr = [];
    //     db.collection("daka_record").where({
    //         username:username
    //     }).get().then(res=>{
    //         console.log(res);
    //         var data = res.data;
    //         for(var i = 0; i < data.length; i++){
    //             var hashid = res.data[i].hashId
    //             var obj = {
    //                 task_name:data[i].task,
    //                 task_cycle:data[i].cycle,
    //                 task_start_time:data[i].startTime,
    //                 task_end_time:data[i].endTime,
    //                 task_hashId:hashid,
    //             }
    //             this.getIsDaka(obj,hashid)
    //             dakaArr.push(obj);
    //         }
    //         console.log(dakaArr);
    //         //杰哥看这里：语法问题1：如此返回wxml通过wx:for是否能获取的到
    //         //杰哥看这里：还未处理的问题2：如何获取到打卡的状态然后一起返回
    //         // this.getIsDaka(user, username)
    //     })
    // },

    //子腾兄总结：这个就是async await的一个比较好的应用 在写的函数前面写async进行异步声明 在异步函数前面写await进行同步声明，代码整洁度比较高，但是这样性能可能差点。
     //获取数据交与页面渲染
     async getDaka_record(){
        let username = wx.getStorageSync('args').username;
        //用username查找uuid
        var dakaArr = [];
        //根据username获取到该用户的所有打卡记录
        const res = await db.collection("daka_record").where({username:username}).get()
        console.log(res)
        let data = res.data
        for(var i =0;i<res.data.length;i++){
            var hashid = data[i].hashId
            var obj = {
                task_name:data[i].task,
                task_cycle:data[i].cycle,
                task_start_time:data[i].startTime,
                task_end_time:data[i].endTime,
                task_hashId:hashid,
            }
            //粤神秒法：根据hashId来查找
            const result = await db.collection("daka_status").where({
                hashId:hashid
            }).get()
            obj.task_isDaka = result.data[0].isDaka;
            console.log(obj.task_isDaka);
            dakaArr.push(obj);
        }
        console.log(dakaArr);
        this.data.taskdaka = dakaArr;
        // console.log(this.data.taskdaka);
    },


    // getIsDaka(obj,hashid){
    //     db.collection("daka_status").where({
    //         hashId:hashid
    //     }).get().then(res=>{
    //         // console.log(res);
    //         obj.task_isDaka = res.data[0].isDaka;
    //         console.log(obj.task_isDaka);
    //     })
    // },

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