Page({
  data: {
    isLogin: false,
    haveInfo: false,
    // test:["a","b","c"],
    dangerHealthStatus: false,
    temperature: ['正常', '37.3°c以上'],
    NomalStatus: [
      '咳嗽',
      '乏力',
      '腹泻',
      '嗅觉减退',
      '无上述症状',
    ],


    //==================== 账户信息 ============
    user: '',
    pwd: '',

    //==================== 填写信息 ============
    tem: '请选择',
    tem1: '请选择',
    tem2: '请选择',
    liveRegion: '请选择',
    status: "请选择",


    text: '',

    lon: '', // 经度
    lat: '', // 纬度

    data: []
  },

  //==================== 加载 ==============================================
  onLoad: function (e) {
    var that = this
    wx.getStorage({
      key: 'info',
      success(res) {

        that.setData({
          haveInfo: true,
          data: res.data,
          Ever_InDanger: res.data.Ever_InDanger,
          inmaoming: res.data.inmaoming
        });
      },
      fail(err) {
        that.setData({
          haveInfo: false
        })
      }
    })

    wx.getStorage({
      key: 'easyClassLogin',
      success(res) {
        that.setData({
          user: res.data.username,
          pwd: res.data.password
        });
        wx.request({
          url: 'https://www.biubbmk.cn/api_flask_zf/YiBan_login',
          method: "POST",
          data: {
            username: that.data.user,
            password: that.data.pwd,
          },
          success: function (res) {
            if (res.data.msg === '登录成功') {
              that.setData({
                isLogin: true
              })
            } else {
              wx.showToast({
                title: '账号或密码有误',
                icon: "none"
              })
              this.setData({
                isLogin: false,
                haveInfo: false
              })
            }
          },
        })
      },
      fail(err) {
        that.setData({
          isLogin: false,
          haveInfo: false
        })
      }
    })

    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.setData({
          lon: res.longitude,
          lat: res.latitude //这里是获取经纬度
        })
      },
      fail: function (err) {
        that.setData({
          lon: 110.922353,
          lat: 21.679375 //这里是获取经纬度
        })
      }
    })
  },

  //==================== 一键打卡界面 ==============================================


  clock() {
    var that = this
    wx.showLoading({
      title: '数据提交中~',
      mask:true
    })


      var submit = {"xmqkb": {
        "id": '52a67a007e304439017ee6442066494d',
      },
      "c1": that.data.data.c1,
      "c2": that.data.data.c2,
      "c3": that.data.data.c3,
      "c4": that.data.data.c4,
      "type": that.data.data.type,
      "location_longitude": that.data.data.location_longitude,
      "location_latitude": that.data.data.location_latitude,
      "location_address": that.data.data.location_address}
      wx.request({
        url: 'https://www.biubbmk.cn/api_flask_zf/YiBan_CWJ',
        method: "POST",
        data: {
          username: that.data.user,
          password: that.data.pwd,
          submit
        },
        success: function (res) {
          if(res.data.error =='Applied today'){
            wx.showToast({
              title: '今日已打卡',
              icon: "none"
            })
            return -1
          }
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        },fail(){
          wx.showToast({
            title: '服务器出错',
            icon: "none"
          })
        }
      })

  },

  alter() {
    this.setData({
      haveInfo: false
    })
  },

  btnCancel() {
    var that = this
    try{
      wx.removeStorageSync('easyClassLogin')
      wx.removeStorageSync('info')
      that.onLoad()
    }catch(e){
      console.log(e)
    }
  },
  //==================== 信息填写界面 ==============================================


  chooseTemperature(e) { //体温
    const items = this.data.temperature
    const values = items[e.detail.value]
    if (e.detail.value == 0) {
      this.setData({
        dangerHealthStatus: false,
        tem: values,
      })
    }
    if (e.detail.value == 1) {
      this.setData({
        dangerHealthStatus: true,
        tem: values,
      })
    }
  },
  chooseTemperature1(e) { //体温
    const items = this.data.temperature
    const values = items[e.detail.value]
    if (e.detail.value == 0) {
      this.setData({
        dangerHealthStatus: false,
        tem1: values,
      })
    }
    if (e.detail.value == 1) {
      this.setData({
        dangerHealthStatus: true,
        tem1: values,
      })
    }
  },
  chooseTemperature2(e) { //体温
    const items = this.data.temperature
    const values = items[e.detail.value]
    if (e.detail.value == 0) {
      this.setData({
        dangerHealthStatus: false,
        tem2: values,
      })
    }
    if (e.detail.value == 1) {
      this.setData({
        dangerHealthStatus: true,
        tem2: values,
      })
    }
  },

  choose_abStatus(e) { //身体状况
    const items = this.data.NomalStatus
    const values = items[e.detail.value]
    this.setData({
      status: values,
    })
  },

  choose_Status(e) { //身体状况
    const items = this.data.NomalStatus
    const values = items[e.detail.value]
    this.setData({
      status: values,
    })
  },


  liveRegionChange(e) { //所在地址
    this.setData({
      liveRegion: e.detail.value,
    })
  },

  inp_region: function (e) { //所在详细地址
    console.log(e)
    const value = e.detail.value
    console.log(value)
    this.setData({
      text: value,
    })
  },

  submit() { //提交按钮
    console.log(this.data.text)
    console.log(this.data.liveRegion)
    var that = this
    if (this.data.tem == '请选择' || this.data.status == '请选择' ||this.data.tem1 == '请选择'||this.data.tem2 == '请选择'|| this.data.liveRegion=='请选择' ||!this.data.text) {
      wx.showToast({
        title: '信息有空白',
        icon: "none"
      })
      return -1;
    }

    if (this.data.everDangerRegion == '是') {
      if (this.data.everIndangerPlaceText.length == 0 || this.data.everLiveregion[0].length == 0) {
        wx.showToast({
          title: '信息有空白',
          icon: "none"
        })
        return -1;
      }

      if (this.data.everLiveregion[1] == '' || this.data.everLiveregion[2] == '') {
        wx.showToast({
          title: '具体地址不能为空',
          icon: "none"
        })
        return -1;
      }
    }

    if (this.data.inMaoMing == '否') {
      if (this.data.inDangerRegion.length == 0) {
        wx.showToast({
          title: '信息有空白',
          icon: "none"
        })
        return -1;
      }
    }

    this.setData({
      data: {
        c1: that.data.tem,
        c2: that.data.tem1,
        c3: that.data.tem2,
        c4: that.data.status,
        type: "CWJ",
        text:that.data.text,
        location_longitude: that.data.lon,
        location_latitude: that.data.lat,
        location_address: that.data.liveRegion[0] + ' ' + that.data.liveRegion[1] + ' ' + that.data.liveRegion[2] + ' ' + that.data.text 
      }
    })


    wx.setStorage({
      key: 'info',
      data: this.data.data
    })

    console.log(this.data.data)

    this.setData({
      haveInfo: true
    })
  },

  cancel() {
    this.setData({
      isLogin: false
    })
  },

  //==================== 登录界面 ==============================================
  inp_user: function (e) { //账号输入
    const value = e.detail.value
    this.setData({
      user: value
    })
  },
  inp_pwd: function (e) { //密码输入
    const value = e.detail.value
    this.setData({
      pwd: value
    })
  },


  btnLogin: function (e) { //登录按钮
    var that = this
    if (this.data.user.length == 0 || this.data.pwd.length == 0) {
      wx.showToast({
        title: '帐号及密码不能为空',
        icon: "none"
      })
      return -1;
    }

    var data = [
      this.data.user,
      this.data.pwd
    ]
    wx.showLoading({
      title: '正在登陆中~',
    })
    wx.request({
      url: 'https://www.biubbmk.cn/api_flask_zf/YiBan_login',
      method: "POST",
      data: {
        username: this.data.user,
        password: this.data.pwd,
      },
      success: function (res) {
        if (res.data.msg === '登录成功') {
          wx.hideLoading()
          wx.setStorage({
            key: 'easyClassLogin',
            data: {
              username: that.data.user,
              password: that.data.pwd,
            },
          })

          that.setData({
            isLogin: true
          })
        } else {
          wx.showToast({
            title: '账号或密码有误',
            icon: "none"
          })
        }
      },
    })
  },
})