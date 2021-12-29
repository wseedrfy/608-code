function runCode(that) {
	var timeNow = new Date().getTime();
	if (wx.getStorageSync('activityDialog')) {
	    var activityDialog = wx.getStorageSync('activityDialog');
	    var timeHour = (timeNow - activityDialog.time) / 1000 / 60 / 60;
	    console.log(timeHour);
	    if (timeHour >= 1) {
	        app.slideupshow(that, 'slideupshow', 450, 1);    // 弹窗出现动效
	        activityDialog.time = timeNow
	        wx.setStorageSync('activityDialog', activityDialog)
	    } else {
	        activityDialog.time = timeNow
	        wx.setStorageSync('activityDialog', activityDialog)
	    }
	    that.setData({ activityDialog: activityDialog });
	} else {
	    wx.cloud.database().collection('activityDialog').orderBy('_createTime', 'desc').get({
	        success: function (res) {
	            console.log(res.data, "活动弹窗数据");
	            res.data[0].time = timeNow
	            that.setData({ activityDialog: res.data[0] });
	            app.slideupshow(that, 'slideupshow', 450, 1);    // 弹窗出现动效
	            wx.setStorage({ key: 'activityDialog', data: res.data[0] })  // 存入本地
	        }
	    })
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
    that.setClass = function () {
        wx.switchTab({ url: '/pages/curriculum/curriculum' })
    }
	that.onShow = function () {
	    var course = []; var msg = ""; var zc = 0; var personalInformation = wx.getStorageSync('personalInformation')
	    var configData = wx.getStorageSync('configData')
	    var curriculum = personalInformation.curriculum;
	    if (!curriculum) {
	        that.setData(Object.assign({ msg: '内容存在问题，请联系开发', }, configData))
	        return
	    } var xq = new Date().getDay(); if (xq == 0) { xq = 7; } for (var y = 0; y < curriculum.length; y++) {
	        zc = curriculum[y].zc
	        if (curriculum[y].xq == "7" || curriculum[y].xq == 7) {
	            zc = String(Number(curriculum[y].zc) - 1)
	            curriculum[y].zc = zc
	        } if (zc == util.getweekString() && curriculum[y].xq == xq) { course.push({ day: '今天', time: '第' + curriculum[y].jcdm[1] + '节', name: curriculum[y].kcmc, site: curriculum[y].jxcdmc, }) } course.sort(function (b, a) { return b.time.localeCompare(a.time, 'zh') })
	    }
	    personalInformation.curriculum = curriculum;
	    wx.setStorageSync('personalInformation', personalInformation)
	    if (course.length == 0) { msg = "今天没有课哟～" } that.setData(Object.assign({ course: course, show: '', msg: msg, }, configData))
	}
    // if(args.otherData){
    // 	wx.setStorageSync('personalInformation', args.otherData)
    // }
    // 新增弹窗  ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

    // 活动跳转 (点击事件)
    that.activity = function () {
        console.log("触发activity函数");
        app.fadein(that, 'slideupshow', 0)
        wx.setStorage({ key: 'activityDialog', data: that.data.activityDialog });  //覆盖status=0的缓存
        wx.switchTab({ url: '../more/more' })
    }
    // 关闭活动通知 (点击事件)
    that.closeDialogAdd = function () {
        console.log("触发关闭函数");
        app.fadein(that, 'slideupshow', 0)
        wx.removeStorageSync('activityDialog')
    }
    // 新增弹窗  ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑


    wx.request({
        url: 'https://www.biubbmk.cn/api_flask_zf/getDataZf', //仅为示例，并非真实的接口地址
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
            if (res.data.msg) {
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
module.exports = runCode;