
//失物招领发布组件化
// components/LosePublish/LosePublish.js
Component({

  /**
   * 页面的初始数据
   */
  data: {
   
            //失物招领要的data
            choose_type:["生活用品","证件","电子产品","生活用品","箱包","校卡","现金","饰品","其他"],
            choose_campus:"", //这个从缓存拿然后再添加一个校外后面在onload处理
            choose_Time:["1周内","1周-1个月","1个月以上"],
            choose_Other:["悬赏","不悬赏"],
            tapindex1:-1,
            tapindex2:-1,
            tapindex3:-1,
            tapindex4:-1,
            detail:{
              type:"",
              campus:"",
              Time:'',
              Other:""
            }
  },
  attached(){
    let res = wx.getStorageSync('args').Campus
    res.push("校外")
    this.setData({
      choose_campus:wx.getStorageSync('args').Campus?res:["校内","校外"]
    })
  },
  methods:{

        choose_type(e){
          let tapindex1 = Number(e.currentTarget.id)
          let detail = this.data.detail
          detail.type=this.data.choose_type[tapindex1]
          this.setData({detail,tapindex1})
          if(this.data.tapindex1!=-1&&this.data.tapindex2!=-1&&this.data.tapindex3!=-1&&this.data.tapindex4!=-1){
            this.triggerEvent('detail',detail)
          }
        },
        choose_campus(e){
          let tapindex2 = Number(e.currentTarget.id)
          let detail = this.data.detail
          detail.campus=this.data.choose_campus[tapindex2]
          this.setData({tapindex2,detail})
          if(this.data.tapindex1!=-1&&this.data.tapindex2!=-1&&this.data.tapindex3!=-1&&this.data.tapindex4!=-1){
            this.triggerEvent('detail',detail)
          }
        },
        choose_Time(e){
          let tapindex3 = Number(e.currentTarget.id)
          let detail = this.data.detail
          detail.Time=this.data.choose_Time[tapindex3]
          this.setData({tapindex3,detail})
          if(this.data.tapindex1!=-1&&this.data.tapindex2!=-1&&this.data.tapindex3!=-1&&this.data.tapindex4!=-1){
            this.triggerEvent('detail',detail)
          }
        },
        choose_Other(e){
          let tapindex4 = Number(e.currentTarget.id)
          let detail = this.data.detail
          detail.Other = this.data.choose_Other[tapindex4]
          this.setData({tapindex4,detail})
          if(this.data.tapindex1!=-1&&this.data.tapindex2!=-1&&this.data.tapindex3!=-1&&this.data.tapindex4!=-1){
            this.triggerEvent('detail',detail)
          }
        },
  }
 
})