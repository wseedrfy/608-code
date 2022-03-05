var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
      text:'很多覅的宏观环境欧派的',
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
             console.log(
               res
             );
              let photo = that.data.photo.concat(res.tempFiles);
              
              wx.getImageInfo({                       // 获得图片信息
                src: photo[0].tempFilePath,
                success: (res) => {
                  photo[0].imageHeight = res.height;
                  photo[0].imageWidth = res.width;
                  console.log(photo);
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
        // 判空逻辑：1.标题 2.正文 3.选择标签 4.图片  => 缺一不可
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
          }else {
            let add = {
              "Cover": this.data.photo[0],//
              "AllPhoto": JSON.parse(JSON.stringify(this.data.photo)),//
              "Title": formTitle,//标题
              "Text": formText,//文本
              "CoverHeight": this.data.photo[0].imageHeight,//
              "CoverWidth": this.data.photo[0].imageWidth,//
              "Label": this.data.choosenLabel,//标签
              "Time": new Date().getTime(),//  返回指定的 Date 对象自 1970 年 1 月 1 日午夜（通用时间）以来的毫秒数。当比较两个或更多个 Date 对象时，使用此方法表示某一特定时刻。
              "nickName": args.nickName,//wx名字
              "School": args.school,
              "iconUrl": args.iconUrl
            }
            let list = app.globalData.allList[0]//??????????
            list.push(add);      
            let NewData = list.length - 1;

            // 计算图片高度
            const CalculateImage = () => {  
              for (let i = 0; i < list.length; i++) {
                // 计算得到高度
                let height = parseInt(Math.round(list[i].CoverHeight * 370 / list[i].CoverWidth));      

                if (height) {      
                  let currentItemHeight = parseInt(Math.round(list[i].CoverHeight * 370 / list[i].CoverWidth));
                  // 边界处理
                  currentItemHeight > 500 ? currentItemHeight = 500 : '';

                  list[i].ShowHeight = currentItemHeight;
                  list[i].CoverHeight = currentItemHeight + "rpx"; // 因为xml文件中直接引用的该值作为高度，所以添加对应单位
                }
              }
              return ;
            }
            // 将数据上传到数据库  (仅uploadPhoto内调用) 
            const uploadData = (NewData, fileIDs) => {//fileIds????
              let that = this;
              let args = wx.getStorageSync('args');

              if (fileIDs.length == list[NewData].AllPhoto.length) {

                wx.cloud.callFunction({
                  name: 'CampusCircle',
                  data: {
                    Cover: fileIDs[0],//图片
                    AllPhoto: fileIDs,//所有图片
                    Title: list[NewData].Title,
                    Text: list[NewData].Text,
                    CoverHeight: list[NewData].CoverHeight,//图片
                    CoverWidth: list[NewData].CoverWidth,//图片
                    Label: list[NewData].Label,
                    Time: list[NewData].Time,
                    ShowHeight: list[NewData].ShowHeight,
                    School: list[NewData].School,
                    nickName: list[NewData].nickName,
                    username: args.username,
                    iconUrl: list[NewData].iconUrl,
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
              let AllPhoto = app.globalData.allList[0][NewData].AllPhoto;//用户选的图片    
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

        this.setData({
          menu: args.tabitem.slice(1,),
          theme
        })
    },

})