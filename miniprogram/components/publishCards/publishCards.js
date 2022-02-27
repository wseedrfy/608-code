var app = getApp()
class cardFunction {

}
Component({

  properties: {
    showModel:{
      type:String,
      value:""
    },
  },

  methods: {
    add() {
      var showModel = this.properties.showModel
      var that = this
      if (showModel) {
        this.setData({
          add_style: "add_hide"
        })
        setTimeout(() => {
          that.setData({
            showModel: !showModel
          })
        }, 200);
      } else {
        this.setData({
          add_style: "add_show",
          showModel: !showModel
        })
      }
    },
    formSubmit(e) { // 2.2 添加与存储 (发布点击事件)
      let {
        formTitle,
        formText
      } = e.detail.value;
  
      if (!formTitle) {
        wx.showToast({
          title: '标题不能为空',
          icon: 'none'
        })
      } else if (!formText) {
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
      } else if (!this.data.nickname && !this.data.iconUrl) {
        wx.showToast({
          title: '小主还没登录哟QwQ',
          icon: 'none'
        })
      } else {
        let add = {
          "Cover": this.data.photo[0],
          "AllPhoto": JSON.parse(JSON.stringify(this.data.photo)),
          "Title": formTitle,
          "Text": formText,
          "CoverHeight": this.data.imageHeight,
          "CoverWidth": this.data.imageWidth,
          "Label": this.data.choosenLabel,
          "Time": new Date().getTime(),
          "nickName": this.data.nickname,
          "School": this.data.school,
          "iconUrl": this.data.iconUrl
        }
        console.log("this.data.nickname-Input", this.data.nickname);
        this.data.allList.push(add);
        let NewData = this.data.allList.length - 1;
        this.CalculateImage();
  
        // 将本地图片上传到云存储，后续通过fileid进行图片展示
        let that = this;
        (function (NewData) {
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
          var path = that.data.allList[NewData].AllPhoto
          console.log(path)
          var fileIDs = []
          for (var i = 0; i < path.length; i++) {
            wx.compressImage({
              src: path[i], // 图片路径
              quality: 20, // 压缩质量,
              success(res) {
                console.log(res)
                wx.cloud.uploadFile({
                  cloudPath: 'CampusCircle_images/' + new Date().getTime() + Math.floor(Math.random() * 150) + '.png',
                  filePath: res.tempFilePath,
                }).then(res => {
                  fileIDs.push(res.fileID)
                  console.log(fileIDs)
                  that.uploadData(NewData, fileIDs)
                })
              }
            })
          }
        })(NewData)
  
      }
    },
    chooseimage: function () {
      var that = this;
      if (that.data.photo.length == 0) {
        wx.chooseImage({
          count: 2,
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
          success: (res) => {
            that.data.photo = res.tempFilePaths
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
            that.setData({
              photo: that.data.photo
            })
            wx.getImageInfo({
              src: that.data.photo[0],
              success: function (res) {
                that.data.imageHeight = res.height
                that.data.imageWidth = res.width
              }
            })
          }
        })
      }
    },
    deleteImage: function (e) {
      var that = this;
      var index = e.currentTarget.dataset.index; //获取当前长按图片下标
      if (that.data.photo.length != 0) {
        wx.showModal({
          title: '提示',
          content: '确定要删除此图片吗？',
          success: function (res) {
            if (res.confirm) {
              that.data.photo.splice(index, 1)
            }
            that.setData({
              photo: that.data.photo,
              current: 0
            });
            wx.getImageInfo({
              src: that.data.photo[0],
              success: function (res) {
                that.data.imageHeight = res.height
                that.data.imageWidth = res.width
              }
            })
          }
        })
      }
    },
    PreviewImage: function (e) {
      let index = e.currentTarget.dataset.index;
      var imgs = this.data.photo;
      if (imgs.length != 0) {
        wx.previewImage({
          current: imgs[index],
          urls: imgs,
        })
      }
    },
    // ShowContent: function (e) {
    //   //对数据进行更新
    //   var content = JSON.stringify(this.data.item)
    //   wx.navigateTo({
    //     url: "../../pages/more/pages/DetailContent/DetailContent?content=" + content,
    //   })
    // },
    // //点击事件
    // getStar_card(e) { //--------------------Starif：false:未点赞；true：已点赞
    //   var content = this.data.item
    //   var args = wx.getStorageSync('args')
    //   var Star_User = content.Star_User //初始点赞用户
    //   var openusername = this.properties.openusername
    //   if (!Star_User) { //判断点赞人有没有在数组里面
    //     Star_User = []
    //   }
    //   var Starif = false
    //   //判断是不是为点赞过的usernameid
    //   ///--------------------------------------取消点赞（48-54）
    //   for (var i = 0; i < Star_User.length; i++) {
    //     if (Star_User[i].username == openusername.username) {
    //       Starif = true
    //       Star_User.splice(Star_User.indexOf(Star_User[i]), 1) //改变了 Star_User  --> content.Star_User
    //       break
    //     }
    //   }
    //   if (!Starif) {
    //     openusername.Star_time = new Date().getTime()
    //     Star_User.push(openusername) // 改变了 Star_User  
    //     wx.showToast({
    //       title: '点赞成功',
    //       icon: "none"
    //     })
    //   }
    //   var Star_count = Star_User.length
    //   //点赞后对本地数据进行更新
    //   //点赞用户更新
    //   content.Star_User = Star_User

    //   //点赞用户数更新
    //   content.Star = Star_count

    //   let character = { // 处理得到点赞者信息
    //     userName: args.username,
    //     iconUrl: args.iconUrl,
    //     nickName: args.nickName
    //   }
    //   let be_character = { // 被点赞者信息
    //     userName: content.username,
    //     iconUrl: content.iconUrl,
    //     nickName: content.nickName
    //   }
    //   let starTime = new Date().getTime(); // 点赞时间

    //   app.globalData.allList.forEach(e => {
    //     if (e._id === content._id) {
    //       e.Star_count = Star_count
    //       e.Star_User = Star_User
    //     }
    //   })
    //   var that = this
    //   //点赞后对数据库数据进行更新
    //   wx.cloud.callFunction({ // 云函数更改点赞状态
    //     name: "CampusCircle",
    //     data: {
    //       type: "StarControlLogs",
    //       Time: content.Time,
    //       Star: Star_count,
    //       Star_User: Star_User,
    //       character: character,
    //       username: args.username,
    //       be_character: be_character,
    //       be_username: content.username,
    //       createTime: starTime,
    //       arcticle: content,
    //       arcticle_id: content._id,
    //       _id: content._id,
    //       username: args.username
    //     }
    //   }).then( )
    //   that.setData({
    //     item : {
    //       ...that.data.item,
    //       Star: Star_count,
    //     },
    //     Star_User: Star_User,
    //   })

    //   // app.globalData.List = this.data.List
    // },
    // onLazyLoad(info) {},
    
  }
})