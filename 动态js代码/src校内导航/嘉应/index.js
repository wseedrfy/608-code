
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mapHeight: "800",
    placeName: "",
    hideOrNot: 0,
    activePlaceID: -1,
    markers: [{
      id: 1,
      latitude: 24.276696602909194,
      longitude: 116.11826238028718,
      iconPath: "../image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '理科楼',
        display: 'ALWAYS'
      }
    }, {
      id: 2,
      latitude: 24.276202707342065,
      longitude: 116.11729678504182,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '17栋',
        display: 'ALWAYS'
      }
    }, {
      id: 3,
      latitude: 24.287994546817508,
      longitude: 116.09116305325315,
      iconPath: "image/shitang.png",
      width: 23,
      height: 24,
      callout: {
        content: '梅师超顺饭堂',
        display: 'ALWAYS'
      }
    }, {
      id: 4,
      latitude: 24.287358895845834,
      longitude: 116.08919431183622,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '艺术楼（师范）',
        display: 'ALWAYS'
      }
    }, {
      id: 5,
      latitude: 21.653321,
      longitude: 110.815943,
      iconPath: "image/sushe.png",
      width: 23,
      height: 24,
      callout: {
        content: '西南区饭堂',
        display: 'ALWAYS'
      }
    }, {
      id: 6,
      latitude: 24.314904110637062,
      longitude: 116.09845866177366,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '教学楼（医学院）',
        display: 'ALWAYS'
      }
    }, {
      id: 7,
      latitude: 24.31473301043974,
      longitude: 116.09653283570097,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '医学基础实验楼',
        display: 'ALWAYS'
      }
    }, {
      id: 8,
      latitude: 24.288537292435954,
      longitude: 116.08927477810667,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '北门',
        display: 'ALWAYS'
      }
    }, {
      id: 9,
      latitude: 24.288361267084177,
      longitude: 116.09139908764647,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '东门',
        display: 'ALWAYS'
      }
    }, {
      id: 10,
      latitude: 24.324453607827753,
      longitude: 116.12867631415558,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '嘉应学院-梅州市客家研究院',
        display: 'ALWAYS'
      }
    }, {
      id: 11,
      latitude: 24.325289488222086,
      longitude: 116.12851001719666,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '正南门',
        display: 'ALWAYS'
      }
    }, {
      id: 12,
      latitude: 24.325739199369874,
      longitude: 116.12793602446747,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '嘉应学院-县域经济研究院',
        display: 'ALWAYS'
      }
    }, {
      id: 13,
      latitude: 24.325563225632838,
      longitude: 116.12681486109925,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '大鑫豪文化传媒有限公司（嘉应学院分点）',
        display: 'ALWAYS'
      }
    }, {
      id: 14,
      latitude: 24.325431245169813,
      longitude: 116.12662174205018,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '5栋',
        display: 'ALWAYS'
      }
    }, {
      id: 15,
      latitude: 24.325265047353835,
      longitude: 116.12620331744385,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '4栋',
        display: 'ALWAYS'
      }
    }, {
      id: 16,
      latitude: 24.325719646745203,
      longitude: 116.12659491996003,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '6栋',
        display: 'ALWAYS'
      }
    }, {
      id: 17,
      latitude:24.325660988850878,
      longitude: 116.12573124865723,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '2栋',
        display: 'ALWAYS'
      }
    }, {
      id: 18,
      latitude: 24.325929837310557,
      longitude: 116.125688333313,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '1栋',
        display: 'ALWAYS'
      }
    }, {
      id: 19,
      latitude: 24.326291559792615,
      longitude: 116.12575807074738,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '7栋',
        display: 'ALWAYS'
      }
    }, {
      id: 20,
      latitude: 24.325880955814995,
      longitude: 116.12886943320466,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '德龙会堂',
        display: 'ALWAYS'
      }
    }, {
      id: 21,
      latitude: 24.32647730877433,
      longitude: 116.127850193779,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '田家炳科学馆',
        display: 'ALWAYS'
      }
    }, {
      id: 22,
      latitude: 24.32659951190328,
      longitude: 116.12887479762269,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '丽群图书馆',
        display: 'ALWAYS'
      }
    }, {
      id: 23,
      latitude: 24.32688791082026,
      longitude:  116.13116003970337,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '百年纪念大楼',
        display: 'ALWAYS'
      }
    }, {
      id: 24,
      latitude: 24.326716826796314,
      longitude:  116.12887479762269,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '宪梓艺术馆',
        display: 'ALWAYS'
      }
    }, {
      id: 25,
      latitude: 24.327450042416316,
      longitude:  116.12784482936097,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '中国农业银行（嘉大自助点）',
        display: 'ALWAYS'
      }
    }, {
      id: 26,
      latitude: 24.327557580350568,
      longitude:  116.12730838755799,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '水电中心',
        display: 'ALWAYS'
      }
    }, {
      id: 27,
      latitude: 24.327528251832142,
      longitude:  116.12820960978699,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '外国语学院',
        display: 'ALWAYS'
      }
    }, {
      id: 28,
      latitude: 24.327586908862276,
      longitude:  116.12881042460633,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '嘉应学院-企业管理研究中心',
        display: 'ALWAYS'
      }
    }, {
      id: 29,
      latitude: 24.328334783616885,
      longitude:  116.12969555358124,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '梅州市计算机学会',
        display: 'ALWAYS'
      }
    }, {
      id: 30,
      latitude: 24.328105044783037,
      longitude:  116.12860121230317,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '中国建设银行（嘉应学院校园e银行）',
        display: 'ALWAYS'
      }
    }, {
      id: 31,
      latitude: 24.328285903049025,
      longitude:  116.12773217658234,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '国际会议中心',
        display: 'ALWAYS'
      }
    }, {
      id: 32,
      latitude: 24.3285254176527,
      longitude:  116.12740494708252,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '1A栋',
        display: 'ALWAYS'
      }
    }, {
      id: 33,
      latitude: 24.3288871327267,
      longitude:  116.12665392855835,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '中1号楼',
        display: 'ALWAYS'
      }
    }, {
      id: 34,
      latitude: 24.32871116336029,
      longitude:  116.12751223544312,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '田家炳图书馆',
        display: 'ALWAYS'
      }
    }, {
      id: 34,
      latitude: 24.328540081797737,
      longitude:  116.12904645899964,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '世纪广场',
        display: 'ALWAYS'
      }
    }, {
      id: 34,
      latitude: 24.328848028444476,
      longitude:  116.12967946032715,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '宪梓体育馆',
        display: 'ALWAYS'
      }
    }, {
      id: 34,
      latitude: 24.329063101849158,
      longitude:  116.12812914351655,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '黄桂清大楼',
        display: 'ALWAYS'
      }
    }, {
      id: 34,
      latitude: 24.32954701567515,
      longitude:  116.13159992198182,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '李小平教学楼',
        display: 'ALWAYS'
      }
    }, {
      id: 34,
      latitude: 24.32924884676876,
      longitude:  116.13028563956452,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '田家炳师范学院',
        display: 'ALWAYS'
      }
    }, {
      id: 35,
      latitude: 24.329229294684872,
      longitude:  116.1292020271225,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '钦贞纪念楼',
        display: 'ALWAYS'
      }
    }, {
      id: 36,
      latitude: 24.329551903684454,
      longitude: 116.12959362963868,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '化学与环境学院',
        display: 'ALWAYS'
      }
    }, {
      id: 37,
      latitude: 24.329478583529443,
      longitude:  116.12899281481934,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '5栋（2）',
        display: 'ALWAYS'
      }
    }, {
      id: 38,
      latitude: 24.329478583529443,
      longitude:  116.12899281481934,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '5栋（2）',
        display: 'ALWAYS'
      }
    }, {
      id: 39,
      latitude: 24.32933683110943,
      longitude:   116.12884261111451,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '中4A宿舍',
        display: 'ALWAYS'
      }
    }, {
      id: 40,
      latitude: 24.329766975894533,
      longitude:  116.12855829695893,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '3栋（2）',
        display: 'ALWAYS'
      }
    }, {
      id: 41,
      latitude: 24.32980119189433,
      longitude: 116.1272922943039,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '嘉大家教在线',
        display: 'ALWAYS'
      }
    }, {
      id: 42,
      latitude: 24.329918503823556,
      longitude:  116.126230139534,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '西门',
        display: 'ALWAYS'
      }
    }, {
      id: 43,
      latitude: 24.330128687424832,
      longitude:  116.12655200461579,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '电子信息工程学院',
        display: 'ALWAYS'
      }
    }, {
      id: 45,
      latitude: 24.330236223086477,
      longitude:  116.12668611506653,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '菜鸟驿站',
        display: 'ALWAYS'
      }
    }, {
      id: 46,
      latitude: 24.330182455267405,
      longitude:  116.13023199538422,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '嘉应学院-理想拉链表面技术研究所',
        display: 'ALWAYS'
      }
    }, {
      id: 47,
      latitude: 24.330514837784207,
      longitude:  116.13166429499817,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '易班发展中心',
        display: 'ALWAYS'
      }
    }, {
      id: 48,
      latitude: 24.330549053582025,
      longitude:  116.1311654041214,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '化学实验楼',
        display: 'ALWAYS'
      }
    }, {
      id: 49,
      latitude: 24.33075434817502,
      longitude:  116.13033928374482,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '15栋',
        display: 'ALWAYS'
      }
    }, {
      id: 50,
      latitude: 24.33119426403993,
      longitude:  116.12868704299164,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '桂英大楼',
        display: 'ALWAYS'
      }
    }, {
      id: 51,
      latitude: 24.330861883305424,
      longitude:  116.12710990409089,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '地理科学与旅游学院',
        display: 'ALWAYS'
      }
    }, {
      id: 52,
      latitude: 24.331487540435095,
      longitude:  116.13147654036713,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '嘉应学院东区食堂',
        display: 'ALWAYS'
      }
    }, {
      id: 53,
      latitude: 24.331712385211468,
      longitude:  116.13170721034241,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '学生宿舍',
        display: 'ALWAYS'
      }
    }, {
      id: 54,
      latitude: 24.332235392169498,
      longitude:  116.13144435385895,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '嘉应学院东区学生宿舍9',
        display: 'ALWAYS'
      }
    }, {
      id: 55,
      latitude: 24.332254943789636,
      longitude:  116.1312190483017,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '嘉应学院东区学生宿舍10',
        display: 'ALWAYS'
      }
    }, {
      id: 56,
      latitude: 24.332401580844436,
      longitude:  116.13033928374482,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '北门',
        display: 'ALWAYS'
      }
    }, {
      id: 57,
      latitude: 24.332108306565424,
      longitude:  116.12781264285279,
      iconPath: "image/jiaoxuelou.png",
      width: 23,
      height: 24,
      callout: {
        content: '音乐与舞蹈学院',
        display: 'ALWAYS'
      }
    }],
    distance: '',
    cost: '',
    polyline: [],
    // userLongitude: 110.922599,
    // userLatitude: 21.679529,
    userLongitude : 116.12839211437986,
    userLatitude : 24.32836897202351,
    inSchool: false,
    isLoading: false,
    comEdit:false,
    array: ['江北校区', '江南校区', '师范校区', '医学院'],
    index: 0,
  },
  popUp: function () {          //控制弹窗
    var edit_style = 'edit_hide';
    // picker动画样式
    if (edit_style == undefined || edit_style == 'edit_hide') {
      edit_style = 'edit_show'
    } else {
      edit_style = 'edit_hide'
    }
    this.setData({ 
      edit_style,
      comEdit: !this.data.comEdit
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var _this = this;
    // wx.showModal({
    //   title: '选择校区',
    //   showCancel: true, //是否显示取消按钮
    //   content: "请选择校区",
    //   cancelText: "西城校区", //默认是“取消”
    //   confirmText: "官渡校区", //默认是“确定”
    //   success: function (res) {
    //     if (res.cancel) {
    //       console.log(233)
    //       _this.setData({
    //         userLongitude: 110.818019,
    //         userLatitude: 21.654388
    //       })
    //     } else {
          
    //       _this.setData({
    //         userLongitude: 110.922599,
    //         userLatitude: 21.679529,
    //       })
    //     }
    //   },
    //   fail: function (res) {}, //接口调用失败的回调函数
    //   complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    // })
    

    // if (e.markerId !== '' && Object.keys(e).length !== 0) {
    //   _this.makertap(e);
    // }
    _this.popUp()
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
      success: function (res) {
        _this.setData({
          userLongitude: res.longitude,
          userLatitude: res.latitude
        })
      }
    })
    
  },
  onReady: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        isLoading: false
      });
    }, 800);

  },
  makertap: function (e) {
    console.log(e)
    var id = e.markerId;
    var that = this;
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
      success: function (res) {
        that.setData({
          userLongitude: res.longitude,
          userLatitude: res.latitude
        });
        that.setData({
          activePlaceID: id,
          placeName: that.data.markers[id].callout.content
        })
        var userLocation = that.data.userLongitude + ',' + that.data.userLatitude;
        var destination = that.data.markers[id].longitude + ',' + that.data.markers[id].latitude;
        that.planPolyline(userLocation, destination);
      }
    })

  },
  planPolyline: function (origin, destination) {
    var that = this;
    var id = that.data.activePlaceID;
    //规划步行路线
    myAmapFun.getWalkingRoute({
      origin: origin,
      destination: destination,
      success: function (data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        that.setData({
          json: data.paths[0],
          polyline: [{
            points: points,
            color: "#7acfa6",
            width: 6
          }]
        });
        if (data.paths[0] && data.paths[0].distance) {
          that.setData({
            distance: data.paths[0].distance + '米'
          });
        }
        if (data.paths[0] && data.paths[0].duration) {
          that.setData({
            cost: parseInt(data.paths[0].duration / 60) + '分钟'
          });
        }
        var markers = that.data.markers;
        var points = that.data.polyline[0].points;
        //暂时一共70个坐标点
        markers[22] = {
          id: 22,
          latitude: points[0].latitude,
          longitude: points[0].longitude,
          iconPath: '../..image/mapicon_navi_s.png',
          width: 23,
          height: 33
        };
        markers[23] = {
          id: 23,
          latitude: points[points.length - 1].latitude,
          longitude: points[points.length - 1].longitude,
          iconPath: '../..image/mapicon_navi_e.png',
          width: 24,
          height: 34
        }

        that.setData({
          markers: markers,
        })
      },
    })
  },
  location: function () {
    var _this = this
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
      success: function (res) {
        _this.setData({
          userLongitude: res.longitude,
          userLatitude: res.latitude
        })
      }
    })
  },
  moveSchool: function () {
    //视图返回学校
    var _this = this;
    wx.showModal({
      title: '选择校区',
      showCancel: true, //是否显示取消按钮
      content: "请选择校区",
      cancelText: "西城校区", //默认是“取消”
      confirmText: "官渡校区", //默认是“确定”
      success: function (res) {
        if (res.cancel) {
          _this.setData({
            userLongitude: 110.818019,
            userLatitude: 21.654388
          })
        } else {
          _this.setData({
            userLongitude: 110.922599,
            userLatitude: 21.679529,
          })
        }
      },
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })


  },
  jtt: function () {
    wx.showModal({
      title: '选择校区',
      showCancel: true, //是否显示取消按钮
      content: "请选择校区",
      cancelText: "西城校区", //默认是“取消”
      confirmText: "官渡校区", //默认是“确定”
      success: function (res) {
        if (res.cancel) {
          wx.previewImage({
            current: "cloud://un1-d62c68.756e-un1-d62c68-1258307938/a.png", // 当前显示图片的http链接
            urls: ["cloud://un1-d62c68.756e-un1-d62c68-1258307938/a.png"]// 需要预览的图片http链接列表
          })
        } else {
          wx.previewImage({
            current: "cloud://un1-d62c68.756e-un1-d62c68-1258307938/b.png", // 当前显示图片的http链接
            urls: "cloud://un1-d62c68.756e-un1-d62c68-1258307938/b.png" // 需要预览的图片http链接列表
          })
        }
      },
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })

  },
  goDetail: function () {
    var that = this;
    const latitude = that.data.markers[that.data.activePlaceID].latitude;
    const longitude = that.data.markers[that.data.activePlaceID].longitude;
    const name = that.data.markers[that.data.activePlaceID].callout.content;
    wx.openLocation({
      latitude,
      longitude,
      name,
      address: '嘉应学院',
      scale: 8
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    if (e.detail.value==0){
      this.setData({
        userLongitude : 116.12839211437986,
        userLatitude : 24.32836897202351
      })
    }else if(e.detail.value==1){
      this.setData({
        userLongitude : 116.11877202987671,
        userLatitude : 24.276034461207942
      })
    }else if(e.detail.value==2){
      this.setData({
        userLongitude : 116.09064102172852,
        userLatitude : 24.28710509971846
      })
    }else if(e.detail.value==3){
      this.setData({
        userLongitude : 116.09776496887207,
        userLatitude : 24.315090341354686
      })
    }
  },
})