function runCode(that) {
    var i;
    if (args.SchoolIndex.iconList) {
        for (i in args.SchoolIndex.iconList) {
            args.SchoolIndex.iconList[i].icon = util.getStorageImage(args.SchoolIndex.iconList[i].icon)
        }
    }
    wx.setStorageSync('configData', Object.assign(args.SchoolIndex, {
        "timeYear": args.StartTime
    }))
    // if(args.otherData){
    // 	wx.setStorageSync('personalInformation', args.otherData)
    // }
    that.onShow = function () {
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
        for (var y = 0; y < curriculum.length; y++) {
            zc = curriculum[y].zc
            if (curriculum[y].xq == "7") {
                zc = String(Number(curriculum[y].zc) - 1)
            }
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
        personalInformation.curriculum = curriculum;
        wx.setStorageSync('personalInformation', personalInformation)
        if (course.length == 0) {
            msg = "今天没有课哟～"
        }
        that.setData(Object.assign({
            course: course,
            show: '',
            msg: msg,
        }, configData))


    }
    wx.request({
        url: 'https://www.biubbmk.cn/api_flask_zf/getAllData', //仅为示例，并非真实的接口地址
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
            that.onShow()
            if(res.data.msg){
                that.setData({
                    msg: msg
                })
            }
  

        },
        fail: function (res) {
            var curriculum = personalInformation.curriculum;
            if (!curriculum) {
                that.setData({
                    msg: '请求失败，下拉刷新'
                })
            }
        }
    })





}
module.exports = runCode;