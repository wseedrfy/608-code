var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        statusBarHeight: getApp().globalData.statusBarHeight,
        lineHeight: getApp().globalData.lineHeight,
        rectHeight: getApp().globalData.rectHeight,

        menu: [],                   // 标签
        showTab: false,             // 控制标签显隐
        theme: false,               // 是否开启主题

        choosenLabel: '',           // 选中的标签
        formTitle: '',              // 标题
        formText: '',               // 正文 
        photo: [],                  // 图片

        imageHeight: 0,
        imageWidth: 0,
                //存储寻物发布信息
      lose_detail:""
    },
    navigationBack(){
      wx.navigateBack({
        delta:1
      })
    },
    // 点击事件 - 点击出现TabScroll
    showTab() {                    
        this.setData({ showTab: !this.data.showTab })
    },
    // 点击事件 - 选择标签
    chooseTab(e) {                  
        // 获取索引值
        let index = e.detail.currentTarget.dataset.index;
        this.setData({
          choosenLabel: this.data.menu[index],
          showTab: false            // 点击后，隐藏标签选择栏
        })
    },
    // 点击事件 - 选择图片
    chooseImage(){
        let that = this;
        wx.chooseMedia({                                // 上传图片
            count: 6,
            mediaType:'image',
            sourceType:['album','camera'],
            sizeType: ['original', 'compressed'],       // 可选择原图、压缩图
            success: (res) => {
                let photo = that.data.photo.concat(res.tempFiles);
                
                wx.getImageInfo({                       // 获得图片信息
                    src: photo[0].tempFilePath,
                    success: (res) => {
                        photo[0].imageHeight = res.height;
                        photo[0].imageWidth = res.width;
                        that.setData({ photo })
                    }
                })
            }
        })
        
    },
    // 点击事件 - 取消按钮
    cancel() {
      wx.navigateBack({
        delta:1
      })
    },
    // 点击事件 - 发布
    formSubmit(e) {
        let { formTitle,formText } = e.detail.value;
        let args = wx.getStorageSync('args');
        // 判空逻辑：1.标题 2.正文 3.选择标签 4.图片  => 缺一不可 //另加了寻物发布逻辑稍微有改变
        if (!formTitle.replace(/\s/g,'')) {
            wx.showToast({
              title: '标题不能为空',
              icon: 'none'
            })
          } else if (!formText.replace(/\s/g,'')) {
            wx.showToast({
              title: '文字不能为空',
              icon: 'none'
            })
          } else if (this.data.photo.length == 0) {
            wx.showToast({
              title: '图片不能为空',
              icon: 'none'
            })
          } else if (!this.data.choosenLabel) {
            wx.showToast({
              title: '标签不能为空',
              icon: 'none'
            })
          } else if (!args.nickName && !args.iconUrl) {
            wx.showToast({
              title: '小主还没登录哟QwQ',
              icon: 'none'
            })
            
          }
          //失物判断
          else if(this.data.choosenLabel=="寻物发布"&&!this.data.lose_detail){
            wx.showToast({
              title: '寻物相关信息还未全部填写',
              icon:"none"
            })
          }
          else {
            let add = {
                "Cover": this.data.photo[0],
                "AllPhoto": JSON.parse(JSON.stringify(this.data.photo)),
                "Title": formTitle,
                "Text": formText,
                "CoverHeight": this.data.photo[0].imageHeight,
                "CoverWidth": this.data.photo[0].imageWidth,
                "Label": this.data.choosenLabel,
                "Time": new Date().getTime(),
                "nickName": args.nickName,
                "School": args.school,
                "iconUrl": args.iconUrl,
                "lose_detail":this.data.lose_detail
            }
            console.log(add)
            console.log("1111111111111111111111")
            app.globalData.allList.push(add);       // 将数据渲染进allList  - 成功
            let NewData = app.globalData.allList.length - 1;
            console.log(app.globalData.allList[NewData].lose_detail?app.globalData.allList[NewData].lose_detail.Other:"",)

            // 计算图片高度
            const CalculateImage = () => {  
              let allList = app.globalData.allList;

              for (let i = 0; i < allList.length; i++) {
                  let height = parseInt(Math.round(allList[i].CoverHeight * 370 / allList[i].CoverWidth));      // 计算得到高度

                  if (height) {      
                      let currentItemHeight = parseInt(Math.round(allList[i].CoverHeight * 370 / allList[i].CoverWidth));

                      // 边界处理
                      currentItemHeight > 500 ? currentItemHeight = 500 : '';

                      allList[i].ShowHeight = currentItemHeight;
                      allList[i].CoverHeight = currentItemHeight + "rpx"; // 因为xml文件中直接引用的该值作为高度，所以添加对应单位
                  }
              }
              return ;
            }
            // 将数据上传到数据库  (仅uploadPhoto内调用) 
            const uploadData = (NewData, fileIDs) => {
              let that = this;
              let args = wx.getStorageSync('args');

              if (fileIDs.length == app.globalData.allList[NewData].AllPhoto.length) {
                //寻物发布上传数据库我就丢这里了
                wx.cloud.callFunction({
                  name: 'CampusCircle',
                  data: {
                    Cover: fileIDs[0],
                    AllPhoto: fileIDs,
                    Title: app.globalData.allList[NewData].Title,
                    Text: app.globalData.allList[NewData].Text,
                    CoverHeight: app.globalData.allList[NewData].CoverHeight,
                    CoverWidth: app.globalData.allList[NewData].CoverWidth,
                    Label: app.globalData.allList[NewData].Label,
                    Time: app.globalData.allList[NewData].Time,
                    ShowHeight: app.globalData.allList[NewData].ShowHeight,
                    School: app.globalData.allList[NewData].School,
                    nickName: app.globalData.allList[NewData].nickName,
                    username: args.username,
                    iconUrl: app.globalData.allList[NewData].iconUrl,
                    Other:app.globalData.allList[NewData].lose_detail?app.globalData.allList[NewData].lose_detail.Other:"",
                    LoseTime:app.globalData.allList[NewData].lose_detail?app.globalData.allList[NewData].lose_detail.Time:"",
                    LoseType:app.globalData.allList[NewData].lose_detail?app.globalData.allList[NewData].lose_detail.type:"",
                    campus:app.globalData.allList[NewData].lose_detail?app.globalData.allList[NewData].lose_detail.campus:"",
                    Star: 0,
                    type: 'write'
                  },
                  success: res => {
                    console.log("add", res)
                    wx.showToast({
                      duration: 4000,
                      title: '添加成功'
                    })
                    // 删除 addAft = 1   
                  },
                  fail: err => {
                    wx.showToast({
                      icon: 'none',
                      title: '出错啦！请稍后重试'
                    })
                    console.error
                  },
                  complete() {
                    that.setData({
                      photo: [],
                      Input_Title: "",
                      Input_Text: "",
                      choosenLabel: " ",
                      showModel: !that.data.showModel,
                    })
                  }
                })
              }
            }
            // 将本地图片上传到云存储，后续通过fileid进行图片展示
            const uploadPhoto = (NewData) => {
              /**
               * 图片上传逻辑
               * 1. 判断条件，是否符合上传条件
               * 2. 自定义函数上传图片到云存储
               * 3. 将所有信息保存到数据库
              */
              wx.showLoading({
                title: '加载中',
                mask: true
              })
              let AllPhoto = app.globalData.allList[NewData].AllPhoto;    
              let fileIDs = [];

              for (var i = 0; i < AllPhoto.length; i++) {
                  wx.compressImage({
                      src: AllPhoto[i].tempFilePath,    // 图片路径
                      quality: 50,                      // 压缩质量,
                      success:(res) => {
                          console.log(res)
                          wx.cloud.uploadFile({
                              cloudPath: 'CampusCircle_images/' + new Date().getTime() + Math.floor(Math.random() * 150) + '.png',
                              filePath: res.tempFilePath,
                          }).then(res => {
                              fileIDs.push(res.fileID);
                              uploadData(NewData, fileIDs);

                              // 返回校园圈页面
                              setTimeout(()=>{
                                let pages = getCurrentPages();            //获取小程序页面栈
                                let beforePage = pages[pages.length - 2]; //上个页面的实例对象

                                beforePage.onLoad();
                                wx.navigateBack({
                                  delta: 1,
                                })
                              },1000)
                              
                          })
                      }
                  })
              }
              return ;
            }
            
            CalculateImage();
            uploadPhoto(NewData);
          }
    },
    // 点击事件 - 删除照片
    del_beChoosen_Image(e) {
      let index = e.target.dataset.index;   // 照片索引值
      let photo = this.data.photo.slice();  

      photo.splice(index,1);                // 注意：splice返回值是删除的元素, 并改变原数组
      this.setData({ photo });
    },
    // 点击已选图片 - 进行预览
    preViewImage(e) {
      let urls = this.data.photo.map(item => {
        return item.tempFilePath
      });
      let index = e.target.dataset.index;

      wx.previewImage({
        urls: urls,
        current: urls[index]
      })
    },
    onLoad: function (options) {
        let args = wx.getStorageSync('args');
        let theme = wx.getStorageSync('theme');
        let menu =args.tabitem.slice(1,)
        menu.push("寻物发布")
        this.setData({
            menu,
            theme
        })
    },
    detail(e){
      this.setData({
        lose_detail:e.detail
      })
    }
})