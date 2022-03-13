// pages/testdaka/index/index.js
const db = wx.cloud.database();
const _ = db.command;
let movedistance = 0;
var app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        sysW: wx.getSystemInfoSync().windowWidth,
        xAxial: 0,
        x: 0,
        w: (wx.getSystemInfoSync().windowWidth * 0.8) - 30,//滑块可移动的X轴范围
        cssAnimation: 'translate3d(0, 0, 0)',
        succeedMsg: '',
        pullStatus: true,//是否允许验证成功后继续滑动

        task_name:'示例',
        showModel3:false,
        dakacount:'19',
        dakatime:'12:00',
        showModel2:true,
        showModel5:true,

        currentid:0,
        currentIndex: 0, // 列表操作项的index
        taskdata:[
            {
                task_name:'示例：看电视',
                task_cycle:['周一','周二','周三','周四','周五'],
                task_start_time:'6:00',
                task_end_time:'8:00',
                task_isDaka:false,
                count:0
            },
            {
                task_name:'示例：看电视',
                task_cycle:['周一','周二','周三','周四','周五'],
                task_start_time:'6:00',
                task_end_time:'8:00',
                task_isDaka:false,
                count:0
            },
            {
                task_name:'示例：看电视',
                task_cycle:['周一','周二','周三','周四','周五'],
                task_start_time:'6:00',
                task_end_time:'8:00',
                task_isDaka:false,
                count:0
            },
        ],
    },
    savecanvas:function(){
        let that = this;
        let args = wx.getStorageSync('args');
        // console.log('123');
        wx.canvasToTempFilePath({
          canvasId: 'shareCanvas',
            success:function(res){
                wx.getImageInfo({
                  src:res.tempFilePath,
                }).then(res=>{
                    // console.log(res);
                    let photo={
                        tempFiles:res.path,
                        imageHeight:res.height,
                        imageWidth:res.width
                    }
                if(app.globalData.allList){
                   wx.navigateTo({
                  
                    url: '/pages/more/pages/PublishContent/PublishContent?tempFiles='+photo.tempFiles+'&imageHeight='+photo.imageHeight+'&imageWidth='+photo.imageWidth,
  
                  })
                }else{
                  // 标签兜底
                  args.tabitem ? args.tabitem : args["tabitem"] = ["全部","日常","开学季"];
                  // 初始化allList
                  let allList = args.tabitem.map( (item,index) => {
                    let allList = [];
                    return allList[index] = []
                  } )
                  app.globalData.allList = allList;
                  wx.navigateTo({
                
                      url: '/pages/more/pages/PublishContent/PublishContent?tempFiles='+photo.tempFiles+'&imageHeight='+photo.imageHeight+'&imageWidth='+photo.imageWidth,
    
                    })
                }
                })
                // wx.saveImageToPhotosAlbum({
                //     filePath: res.tempFilePath,
                //     success(result){
                //       wx.showToast({
                //         title: '图片保存成功',
                //         icon: 'success',
                //         duration: 2000
                //       })
                //     }
                //   })
            }
        })
    },
    sharecanvas:function(){
        let arr =["http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mccErIrW3xz*gbdII0f2XxWb532vMFM40Z1GLB1qy0PJerOEUFI*g*oZuZ35D1lhyDT.clH6YZMOs3.8EPCzGmVA!/r","http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mccErIrW3xz*gbdII0f2XxWYzgI97WA4qJSXOKv*.4QFn3Eg2qYyEPp*FEqQ324LfbLGZlnl2rr4FS5hFO8u0ZTs!/r","http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mcWo.8232YNIC*jkUYG2CaL02oENRjq4FgVYfJRGAQkUFIHqSHOgKJN7PwN8eneBAJ3Xuao69KnlIiWFTLek*xbA!/r","http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mcWo.8232YNIC*jkUYG2CaL0U9WK413d9yuItDSS6iVc8eijth7NxjoSIIegtYx1e5ge50x9TYGSoI1tspf4Eo4Y!/r","http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mcWo.8232YNIC*jkUYG2CaL3iIKgpjMwyrYqipU5hEly9ayItSyv33FzZ4ib5F9ve2AlY40CT8VGvo4aYHsf4PaI!/r","http://m.qpic.cn/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mcWo.8232YNIC*jkUYG2CaL1gQqPp*29X8poNeV1JgSwuGeLqduMlr1RfAksUAUYIEPN37EwlqtdvxQ8SPnTaRYw!/b&bo=OAQFBTgEBQUBKQ4!&rf=viewer_4","http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mcddykwK5pChyfjlr.MGCQ8Mn1xgktufw23sOXfGiwfYDceE0Sm9dtSOJoxNd6a7mGPCV7NonZqctFYy6dWw2wn8!/r","http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mcddykwK5pChyfjlr.MGCQ8OEqMkdr*5dA3.jQ3lK3l3d1xwMgnjGXM*Y9JKOWn5MTRAO1dRfUGwgWxQMZXcIruI!/r","http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mcddykwK5pChyfjlr.MGCQ8OSyjf8imUzh5VQeto*9CH6YmXSw9chNfjsZZaZbpwP1*tcOKZUfgBNpQu6qOdbkn8!/r","http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mcddykwK5pChyfjlr.MGCQ8MmLdH4z*DD*NoKPNIx.71uvCzHA4Lbvag7wPzA.B9B1LLHvxmZlw5RV9ozcVBUx1w!/r"]
        let num=Math.floor(Math.random() * 9);
        console.log(num);
        let w = wx.getSystemInfoSync().windowWidth/375
        let h =wx.getSystemInfoSync().windowHeight/wx.getSystemInfoSync().windowWidth
        let that=this
        let iconurl = wx.getStorageSync('args').iconUrl;
        let nickName= wx.getStorageSync('args').nickName;
        console.log(iconurl);
        Promise.all([
        wx.getImageInfo({//背景图片
          src:arr[num],
        }),wx.getImageInfo({//头像
          src: iconurl,
        })
        ])
        .then(res=>{
        const ctx = wx.createCanvasContext('shareCanvas')
        console.log(res);
        //背景圆角
        ctx.save()
        this.roundRect(ctx, 0, 0, 260*w, 300*w, 10)
        ctx.drawImage(res[0].path,0,0,260*w,300*w)
        ctx.restore()

        //头像
        // ctx.save()
        // ctx.arc(26*w,26*w,18*w,0,2 * Math.PI)
        // ctx.clip()
        // ctx.drawImage(res[1].path,9*w,8*w,35*w,35*w)
        // ctx.restore()
        
        //文字
        // ctx.setFillStyle('#fff')
        // ctx.setFontSize(13*w)
        // ctx.fillText(nickName,54*w,24*w)
        // ctx.setFontSize(9*w)
        // ctx.fillText('今天：'+this.data.dakatime,54*w,39*w)
        
        ctx.setFillStyle('#fff')
        ctx.setFontSize(11*w)
        ctx.fillText(nickName,54*w,22*w)
        ctx.setFontSize(11*w)
        ctx.fillText('今天：'+this.data.dakatime,53*w,39*w)
        //透明色块
        ctx.save()
        ctx.setGlobalAlpha(0)
        ctx.setFillStyle('gray')
        ctx.fillRect(18, 180, 222, 50)
        ctx.restore()
        //色块上面的字体
        ctx.setFontSize(17*w)
        ctx.fillText(that.data.task_name+'打卡'+that.data.dakacount+'天！加油！',45*w,214*w)

        

        ctx.draw()
        //头像
        // ctx.beginPath()
        // // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
        // ctx.setFillStyle('transparent')
        ctx.save()
        ctx.arc(26*w,26*w,18*w,0,2 * Math.PI)
        ctx.clip()
        ctx.drawImage(res[1].path,9*w,8*w,35*w,35*w)
        ctx.restore()
        ctx.draw(true)
      })
    },
    roundRect(ctx, x, y, w, h, r) {
        console.log('2');
        // 开始绘制
        ctx.beginPath()
        // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
        ctx.setFillStyle('transparent')
        // ctx.setStrokeStyle('transparent')
        // 绘制左上角圆弧
        ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
    
        // 绘制border-top
        ctx.moveTo(x + r, y)
        ctx.lineTo(x + w - r, y)
        ctx.lineTo(x + w, y + r)
        // 绘制右上角圆弧
        ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
    
        // 绘制border-right
        ctx.lineTo(x + w, y + h - r)
        ctx.lineTo(x + w - r, y + h)
        // 绘制右下角圆弧
        ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
    
        // 绘制border-bottom
        ctx.lineTo(x + r, y + h)
        ctx.lineTo(x, y + h - r)
        // 绘制左下角圆弧
        ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)
    
        // 绘制border-left
        ctx.lineTo(x, y + r)
        ctx.lineTo(x + r, y)
        
        ctx.fill()
        // ctx.stroke()
        ctx.closePath()
        // 剪切
        ctx.clip()
      },
    startFun:function(e){
        console.log(e.currentTarget.id);
        this.setData({
            currentIndex: e.currentTarget.id
          });
          console.log(this.data.currentid);
    },
    
     //滑块移动中执行的事件
    moveFun: function (e) {
        //如果验证成功后仍允许滑动，则执行下面代码块（初始值默认为允许）
        if (this.data.pullStatus) {
          this.data.x = e.changedTouches[0].clientX - ((this.data.sysW * 0.1) + 25);
          this.data.x >= this.data.w ? this.data.xAxial = this.data.w : this.data.xAxial = this.data.x;
          if (this.data.x < 25) this.data.xAxial = 0;
          this.data.cssAnimation = 'translate3d(' + this.data.xAxial + 'px, 0, 0)';
          this.setData({
            cssAnimation: this.data.cssAnimation
          })
        }
      },
      endFun: function (res) {
        let id =res.currentTarget.id
        var detail = {};
        let isDaka=this.data.taskdata
        isDaka=isDaka[id].task_isDaka
        //如果触摸的X轴坐标大于等于限定的可移动范围，则验证成功
        if (this.data.x >= this.data.w&isDaka==false) {
          this.data.xAxial = this.data.w;
          this.data.succeedMsg = '';
          detail.msg = true;
          this.daka_prompt(res)
          console.log(res);
          this.data.xAxial = 0;
        } else {
          this.data.xAxial = 0;
          this.data.succeedMsg = '';
          detail.msg = false;
        }
        this.triggerEvent('myevent', detail);
        //根据获取到的X轴坐标进行动画演示
        this.data.cssAnimation = 'translate3d(' + this.data.xAxial + 'px, 0, 0)';
  
        this.setData({
          succeedMsg: this.data.succeedMsg,
          cssAnimation: this.data.cssAnimation
        }) 
      },

    complete_share_close(){
        this.setData({showModel2:false});
    },

    attention(){
        let showModal3=this.data.showModel3
        if(!showModal3){
            this.setData({
                showModel3:true,
                })
        }else{
            this.setData({
                showModel3:false,
                })
        }
        
    },
       // 手指触摸动作开始
    touchstartX(e) {
        this.setData({
            currentIndex: e.currentTarget.dataset.index
          });
          console.log( e.currentTarget.dataset.index)
          // 获取触摸X坐标
          this.recordX = e.touches[0].clientX;
    },
        // 点击操作
    resetX() {
        this.slideAnimation(0, 500);//（点击后距左边距离，到达点击后距左边距离的速度越小越快）
    },
    // 手指触摸后移动
    touchmoveX(e) {
        let currentX = e.touches[0].clientX;
        movedistance =  currentX-this.recordX; // 获取移动距离
        this.slideAnimation(movedistance, 500);//右边的数字是移动速度
    },
    // 手指触摸动作结束
    touchendX() {
        let recordX;
        if (movedistance <=-50) { // 移动达到距离就动画显示全部操作项
          recordX = -130;           //滑动后右边显示的范围
        } else if (-50<movedistance){// 移动未达到距离即还原
          recordX=0
        }
        this.slideAnimation(recordX, 500);
    },
    // 滑动动画
    slideAnimation(recordX, time) {
        let animation = wx.createAnimation({
          duration: time,
          timingFunction: 'liner'
        });
        animation.translate(recordX + 'rpx', 0).step()
        this.setData({
          animation: animation.export()
        })
    },
    add_task(){
        wx.navigateTo({
          url: '../record/record',
        })
    },

    // 获取当天时间，看是否可以打卡
    // 注意：当滑动时执行：故不用进行判断是否重复打卡
    async allowDaka(res){
        console.log(res);
        //子腾兄秒法：获取index来获取到页面的数据
        var id = Number(res.currentTarget.id);
        console.log(id);
        var taskdata = this.data.taskdata;
        var data = taskdata[id];
        console.log(data);
        // console.log(taskdata[id]);

        var nowDate = new Date();
        var day = nowDate.getDay();
        console.log("今天星期"+day);
        //1.获取res的里面的关于打卡学号、周期、任务的信息
        let hashid = data.task_hashId;
        var cycle = data.task_cycle;
        
        //2.看今日day是否在cycle里面
        //由于页面渲染的数据来源于username，故不用判断
        if(cycle.length == 1 && cycle[0] == '每天'){
            this.daka(hashid);
            console.log("真打卡好了");
            let tasktemp = this.data.taskdata
            tasktemp[id].task_isDaka=true
            this.setData({
                taskdata:tasktemp
            })
            return;
        }

        //细节：先判断周期能不能打再进行是否二次打卡判断
        for(var i = 0; i < cycle.length; i++){
            if(cycle[i] == '周一' && day == 1){    
                    this.daka(hashid);
                    console.log("真打卡好了");
                    let tasktemp = this.data.taskdata
                    tasktemp[id].task_isDaka=true
                    this.setData({
                        taskdata:tasktemp
                    })
                    return;   
            }else if(cycle[i] == '周二' && day == 2){   
                    this.daka(hashid);
                    console.log("真打卡好了");
                    let tasktemp = this.data.taskdata
                    tasktemp[id].task_isDaka=true
                    this.setData({
                        taskdata:tasktemp
                    })
                    return;    
            }else if(cycle[i] == '周三' && day == 3){   
                    this.daka(hashid);
                    console.log("真打卡好了");
                    let tasktemp = this.data.taskdata
                    tasktemp[id].task_isDaka=true
                    this.setData({
                        taskdata:tasktemp
                    })
                    return;    
            }else if(cycle[i] == '周四' && day == 4){   
                    this.daka(hashid);
                    console.log("真打卡好了");
                    let tasktemp = this.data.taskdata
                    tasktemp[id].task_isDaka=true
                    this.setData({
                        taskdata:tasktemp
                    })
                    return;  
            }else if(cycle[i] == '周五' && day == 5){ 
                    this.daka(hashid);
                    console.log("真打卡好了");
                    let tasktemp = this.data.taskdata
                    tasktemp[id].task_isDaka=true
                    this.setData({
                    taskdata:tasktemp
                    })
                    return; 
            }else if(cycle[i] == '周六' && day == 6){   
                    this.daka(hashid);
                    console.log("真打卡好了");
                    let tasktemp = this.data.taskdata
                    tasktemp[id].task_isDaka=true
                    this.setData({
                        taskdata:tasktemp
                    })
                    return;
            }else if(cycle[i] == '周日' && day == 0){
                    this.daka(hashid);
                    console.log("真打卡好了");
                    let tasktemp = this.data.taskdata
                    tasktemp[id].task_isDaka=true
                    this.setData({
                        taskdata:tasktemp
                    })
                    return;
            }
        }
        
        await wx.showToast({
            title: '根据任务开放时间，今日不能打卡~',
            icon: 'none',
            duration: 2000
        })
        
        // console.log("根据任务周期，今日不可以打卡！");
    },


    async daka(hashid){
        let result = await wx.cloud.callFunction({
            name: "daka",
            data: {
                type:"getDakaRecord_ByHashId",
                hashId:hashid,
            }
        })
        console.log(result);

        //细节坑：预防第一次打卡没有daka_lastTime的情况
        var daka_lastTime = new Date(result.result.data[0].daka_lastTime);
        // console.log(daka_lastTime);
        if(daka_lastTime != null){
            console.log(daka_lastTime);
            //获取最后一次打卡的日期
            var lastTime_year = daka_lastTime.getFullYear();
            var lastTime_month = daka_lastTime.getMonth()+1;
            var lastTime_day = daka_lastTime.getDate();
            // console.log("最后一次打卡时间是几号："+lastTime_day);
            //获取当天日期
            var nowDate = new Date();
            var nowYear = nowDate.getFullYear();
            var nowMonth = nowDate.getMonth()+1;
            var nowDay = nowDate.getDate();
            // console.log("今天是" + nowDay + "号");

            if(lastTime_year == nowYear && lastTime_month == nowMonth && lastTime_day == nowDay){
                 wx.showToast({
                    title: '您今儿个打过卡了',
                    icon: 'none',
                    duration: 2000
                })
                return;
            }
        }
        
        wx.cloud.callFunction({
            name: "daka",
            data: {
                type:"updateDakaRedord_ByHashId",
                hashId:hashid,
            }
        })

        //要是能成功打卡就打开弹窗可以选择分享
        this.setData({showModel2:true});
        // console.log('今日真打卡成功了！');
    },

    //打卡提示
    daka_prompt(res){

        this.data.xAxial = 0;
        //打卡次数本地增加1 渲染到弹窗
        let id =res.currentTarget.id
        let task_name=this.data.taskdata
        task_name=task_name[id].task_name
        console.log(task_name);
        let dakacount=this.data.taskdata
        dakacount=dakacount[id].count+1
        this.setData({ dakacount:dakacount,task_name:task_name})
        let that = this;
        console.log(res);
        // this.data.sharecanvas();
        wx.showModal({
            title: '提示',
            content: '是否确定打卡？',
            success(abc) {
              if (abc.confirm) {
                // that.data.pullStatus = false;
                that.allowDaka(res);
                that.slideAnimation(0, 500);
                that.sharecanvas();
              } else if (abc.cancel) {
                console.log('用户点击取消');
                that.data.pullStatus = true;
              }
            }
        });
    },

    //打卡删除提示
    daka_delpromp(res){
        console.log(res.currentTarget.id);
        let that = this;
        wx.showModal({
            title: '提示',
            content: '是否删除该打卡任务？',
            success(abc) {
              if (abc.confirm) {
                that.delDaka(res);
                that.data.taskdata.splice(res.currentTarget.id, 1)
                console.log(that.data.taskdata);
                that.setData({
                    taskdata:that.data.taskdata
                })
                that.slideAnimation(0, 500);
              } else if (abc.cancel) {
                console.log('用户点击取消')
              }
            }
        });
    },

    //滑动删除
    delDaka(res){
        //子腾兄秒法：获取index来获取到页面的数据
        var id = Number(res.currentTarget.id);
        var taskdata = this.data.taskdata;
        var data = taskdata[id];
        var hashid = data.task_hashId;
        // console.log(data);
        
        //根据信息删除打卡记录表
        //不能删除打卡状态表，因为统计用
        wx.cloud.callFunction({
            name:"daka",
            data: {
                type:"delDakaRecord_ByHashId",
                hashId:hashid,
            }
        })

        console.log('删除：',id)
    },

    //获取数据交与页面渲染
    async getDaka_record(){
        let username = wx.getStorageSync('args').username;
        //用username查找uuid
        var dakaArr = [];
        //根据username获取到该用户的所有打卡记录
        // const res = await wx.cloud.callFunction({
        const res= await wx.cloud.callFunction({
            name: "daka",
            data: {
                type:"getAllDakaRecord",
                username:username,
                is_delete:false,
            }
        })
        console.log(res);
        let data = res.result.data
        for(var i = 0; i < data.length; i++){
            var hashid = data[i].hashId
            var obj = {
                task_name:data[i].task,
                task_cycle:data[i].cycle,
                task_start_time:data[i].startTime,
                task_end_time:data[i].endTime,
                task_hashId:hashid,
                task_lable1:data[i].lable1,
                task_lable2:data[i].lable2,
                count:data[i].count,
            }

            //判断该数据是否打卡的状态
            let task_isDakaTemp = data[i].isDaka;
            let daka_lastTime = new Date(data[i].daka_lastTime);

            //为了防止第一次打卡没有daka_lastTime
            if(daka_lastTime != null){
                //获取最后一次打卡的日期
                var lastTime_year = daka_lastTime.getFullYear();
                var lastTIme_month = daka_lastTime.getMonth()+1;
                var lastTime_day = daka_lastTime.getDate();
                // console.log("最后一次打卡时间是几号："+lastTime_day);
                //获取当天日期
                var nowDate = new Date();
                var nowYear = nowDate.getFullYear();
                var nowMonth = nowDate.getMonth()+1;
                var nowDay = nowDate.getDate();
                // console.log("今天是" + nowDay + "号");

                if(lastTime_year != nowYear || lastTIme_month != nowMonth || lastTime_day != nowDay){
                    //将该数据的是否打卡渲染值改变为task_isDakaTemp = false,则可以避免再次请求数据库拿该属性
                    task_isDakaTemp = false;
                    wx.cloud.callFunction({
                        name:"daka",
                        data:{
                            type:"updateIsDaka",
                            hashId:hashid,
                            isDaka:false,
                        }
                    })
                    // console.log("今天还没打卡咧~");
                }
            }
            
            obj.task_isDaka = task_isDakaTemp;
            console.log(obj.task_isDaka);
            dakaArr.push(obj);
        }
        console.log(dakaArr);
        this.setData({
            taskdata:dakaArr
        })
        console.log(this.data.taskdata);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        wx.showLoading({
          title: '加载中',
          mask:true
        })
        this.getDaka_record().then(res=>{wx.hideLoading()})
        wx.setNavigationBarTitle({
            title: 'We打卡',
        });
        movedistance = 0; // 解决切换到其它页面再返回该页面动画失效的问题
    },

    
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
    //    this.getDaka_record();

       var pages = getCurrentPages();
       var currPage = pages[pages.length - 1]; //当前页面
       let json = currPage.data.mydata;
       console.log(json);
       if(json){
        this.data.taskdata.push(json);
        console.log(this.data.taskdata);
        this.setData({
            taskdata:this.data.taskdata
           })
        currPage.data.mydata=null;
        console.log(currPage.data.mydata);
        }
        
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