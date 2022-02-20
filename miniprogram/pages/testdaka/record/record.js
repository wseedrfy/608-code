// pages/testdaka/record/record.js
const _=wx.cloud.database().command
const db = wx.cloud.database()

//数据还没做接口
//热度榜标签有bug，待修复
//sumit按钮还没绑定函数 form标签上我没写sumit的函数
//选择标签用picker组件弹窗选择，只能选一个
Page({

    /**
     * 页面的初始数据
     */
    data: {
        starttime:'输入开始时间',//这个用户输入的开始时间，下面那个是结束时间
        endtime:'输入结束时间',
        cycleitems:[
            { name: '每天', value: 'Everyday' },
            { name: '周一', value: 'Monday' },
            { name: '周二', value: 'Tuesday' },
            { name: '周三', value: 'Wednesday' },
            { name: '周四', value: 'Thursday' },
            { name: '周五', value: 'Friday' },
            { name: '周六', value: 'Saturday' },
            { name: '周日', value: 'Sunday' },
        ],
        bqshuru:0,
        array: ['请点击选择标签','学习', '工作', '阅读', '思考','运动'],
        objectArray: [
            {
              id: 0,
              name: '请点击选择标签'
            },
            {
              id: 1,
              name: '学习'
            },
            {
              id: 2,
              name: '工作'
            },
            {
              id: 3,
              name: '阅读'
            },
            {
              id: 4,
              name: '思考'
            },
            {
              id: 5,
              name: '运动'
            }
        ],
        index: 0,
        items:[
            {'value': '四级'},
            {'value': '六级'},
            {'value': '跑步'},
            {'value': '篮球'},
          ],
        lable2:""
    },
    bindPickerChange(e){
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
        let index = this.data.index
        if( index == 0){
            console.log('未选择标签')
        }else{
            this.setData({
                bqshuru:1
            })
            console.log('bqshuru:',this.data.bqshuru)
        }
    },
    userCheck:function(e){//热榜标签复选框
        let index = e.currentTarget.dataset.id;//获取用户当前选中的索引值
        let checkBox = this.data.items;
        if (checkBox[index].checked){
          this.data.items[index].checked = false;
        }else{
          this.data.items[index].checked = true;
        }
        this.setData({ items: this.data.items})
        var reduArr = new Array();
        //返回用户选中的值
        let value = checkBox.filter((item,index)=>{
          if(item.checked == true){
            reduArr.push(item.value);
          }
        })
        this.data.lable2=reduArr
        console.log(reduArr);
    },
    bindstattimeChange: function (e) {//用户输入开始时间传参
        console.log('用户输入开始时间，携带值为', e.detail.value)
        this.setData({
          starttime: e.detail.value
        })
      },
    bindendtimeChange: function (e) {//用户结束开始时间传参
        console.log('用户输入结束时间，携带值为', e.detail.value)
        this.setData({
          endtime: e.detail.value
        })
    },

    // existDaka(res){
    //     // 获取学号
    //     let username = wx.getStorageSync('args').username 

    //     var data = res.detail.value
    //     // console.log(data);
    //     var task = data.task
    //     // 避免设置相同的任务
    //     db.collection('daka_record').where({
    //         task:task,
    //         username:username
    //     }).get()
    //     .then(res=>{
    //         if(res.data.length != 0){
    //             console.log(res);
    //             //杰哥看这里：语法问题2：如何自动调用重置按钮（要清空之前填的，因为打卡任务重复了叫用户重新填）
    //             //杰哥看这里：问题：如何将下面该语句返回
    //             console.log('该任务已经存在，请重新设置');
    //         }else{
    //             this.saveRecord(username, data)
    //         }
    //     })
    // },
    guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0,
              v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
      });
  },

  hash(input){
    var I64BIT_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split('');

     var hash = 5389;
     var i = input.length - 1;
      
     if(typeof input == 'string'){
      for (; i > -1; i--)
       hash += (hash << 5) + input.charCodeAt(i);
     }
     else{
      for (; i > -1; i--)
       hash += (hash << 5) + input[i];
     }
     var value = hash & 0x7FFFFFFF;
      
     var retValue = '';
     do{
      retValue += I64BIT_TABLE[value & 0x3F];
     }
     while(value >>= 1);
      
     return retValue;
    },

    saveRecord(res){
      // 获取学号
      console.log(res);
      let username = wx.getStorageSync('args').username 
      var value = res.detail.value
      
      //获取lable1的真实值
      var realLable1;
      switch(value.lable1){
        case '0':
          realLable1 = '未选择任何标签'
        case '1':
          realLable1 = '学习'
        case '2':
          realLable1 = '工作'
        case '3':
          realLable1 = '阅读'
        case '4':
          realLable1 = '思考'
        case '5':
          realLable1 = '运动'
      }
      var uid = this.guid();
        //1.存入打卡任务记录表
        db.collection('daka_record').add({
            data: {
                task:value.task,
                // 标签可以为空 
                lable1:realLable1,
                lable2:this.data.lable2,
                cycle: value.cycle,
                startTime: value.startTime,
                endTime: value.endTime,
                username:username,
                uuid:uid,
                hashId:this.hash(username+value.task+uid),
            }
        }).then(res=>{
            console.log(res);
        })

        //2.存入打卡状态表
        db.collection('daka_status').add({
            data: {
                task:value.task,
                //设置任务后初始化为false未打卡
                isDaka:false,
                username:username,
                count:0,
                hashId:this.hash(username+value.task+uid)
            }
        }).then(res=>{
            console.log(res);
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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