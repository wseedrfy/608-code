    //茂职

    function runCode(that) {

        var changeCurriculum = function (addCurriculum, deCurriculum, allCurriculum) {
            // console.log("进入函数");
        
            if (deCurriculum) {
              for (var i = 0; i < deCurriculum.length; i++) {
                for (var g = 0; g < allCurriculum.length; g++) {
                  if (!deCurriculum[i]) {
                    continue
                  }
                  if (deCurriculum[i].zc == "全部") {
                    if (allCurriculum[g].kcmc == deCurriculum[i].kcmc) {
                      allCurriculum.splice(g, 1);
                      g--;
                    }
                  } else {
                    if (allCurriculum[g].kcmc == deCurriculum[i].kcmc && allCurriculum[g].jcdm == deCurriculum[i].jcdm && allCurriculum[g].zc == deCurriculum[i].zc && allCurriculum[g].xq == deCurriculum[i].xq) {
                      allCurriculum.splice(g, 1);
                      g--;
                    }
                  }
                }
              }
            }
            if (addCurriculum) {
              // console.log(addCurriculum,allCurriculum);
              for (var i = 0; i < addCurriculum.length; i++) {
                if (addCurriculum[i] != null) {
                  allCurriculum.push(addCurriculum[i]);
                }
              }
            }
            return allCurriculum;
          }
        var i;
        if (args.SchoolIndex.iconList) {
            for (i in args.SchoolIndex.iconList) {
                args.SchoolIndex.iconList[i].icon = util.getStorageImage(args.SchoolIndex.iconList[i].icon)
            }
        }
        wx.setStorageSync('configData', Object.assign(args.SchoolIndex, {
            "timeYear": args.StartTime
        }))
        that.onPullDownRefresh=function (){//下拉实时刷新
            wx.showNavigationBarLoading()
            setTimeout(function (){
                getData()
                wx.hideNavigationBarLoading()
                wx.stopPullDownRefresh()
            },1000)
        }
        var time = wx.getStorageSync('time')
        var personalInformation = wx.getStorageSync('personalInformation')
    
        if(personalInformation === '' || personalInformation.length < 2 ||typeof personalInformation!== 'object'){
            //判断是否有成绩那些
            getData()
        }
        else if(time!=null){
            //获取时间进行判断
            var istime = (new Date().getTime())-time
            if(istime>10*3600*100){
                getData()
            }
        }else {
            getData()
        }
        that.setClass = function() {
            wx.switchTab({url: '/pages/curriculum/curriculum'})
        }
        // if(args.otherData){
        // 	wx.setStorageSync('personalInformation', args.otherData)
        // }
        that.onShow = function () {
            wx.reportEvent("school", {
                school:"茂名市职业技术学院"
            })
            var course = [];
            var msg = "";
            var zc = 0;
            var personalInformation = wx.getStorageSync('personalInformation')
            var configData = wx.getStorageSync('configData')
            var curriculum = personalInformation.curriculum;
            if (!curriculum) {
                msg = '加载中'
                if (args.msg) {
                    msg = '加载中'
                }
                that.setData(Object.assign({
                    msg: msg,
                }, configData))
                return
            }
            var xq = new Date().getDay();
            if (xq == 0) {
                xq = 7;
            }
            curriculum = changeCurriculum(args.addCurriculumLogs, args.ConcealCurriculumLogs, curriculum);
            for (var y = 0; y < curriculum.length; y++) {
                zc = curriculum[y].zc
                // if (curriculum[y].xq == "7") {
                //     zc = String(Number(curriculum[y].zc) - 1)
                // }
                if (zc == util.getweekString() && curriculum[y].xq == xq) {
                    course.push({
                        day: '今天',
                        time: '第' + curriculum[y].jcdm[1] + '节',
                        name: curriculum[y].kcmc,
                        site: curriculum[y].jxcdmc,
                    })
                }
                course.sort(function (b, a) {
                    return b.time.localeCompare(a.time, 'zh')
                })
            }
            if (course.length == 0) {
                msg = "今天没有课哟～"
            }
            that.setData(Object.assign({
                course: course,
                show: '',
                msg: msg,
            }, configData))
    
    
        }
    
        function getData(){
            wx.request({
                url:'https://www.biubbmk.cn/api_flask_zf/getData_MZ', //仅为示例，并非真实的接口地址
                data: {
                    username: args.username,
                    password: args.password
                },
                method: 'POST',
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                    wx.setStorageSync('personalInformation', res.data)
                    wx.setStorageSync('time',new Date().getTime())
                    that.onShow()
                    if(res.data.msg){
                        that.setData({
                            msg: msg
                        })
                    }
                },
                fail: function (res) {
                    console.log(res)
                    var personalInformation = wx.getStorageSync('personalInformation')
                    var curriculum = personalInformation.curriculum;
                    if (!curriculum) {
                        that.setData({
                            msg: '请求失败，下拉刷新'
                        })
                    }
                }
            })
    
        }
    
    
    
    
    
    }
    module.exports = runCode;