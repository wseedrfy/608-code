function runCode(that) {
    that.data.array = []
    var classTask = wx.getStorageSync('personalInformation').classTask;
    that.xiu = function (classTask, date) {
        var data = [],
            color = [],
            n = 0;

        for (var i = 0; i < classTask.length; i++) {
            if (classTask[i]['date'] == date) {
                if (classTask[i].xf >= 3) {
                    color.push("#11c1f3");
                } else if (classTask[i].xf >= 2) {
                    color.push("#886aea");
                } else if (classTask[i].xf >= 1) {
                    color.push("#33cd5f");
                } else {
                    color.push("#ffc900");
                }
                n = Number(classTask[i].xf) + n;
                classTask[i].xf = Number(classTask[i].xf).toFixed(1),
                classTask[i]["score"] = classTask[i].xf+' 学分';
                classTask[i]["title"] = classTask[i].kcmc;
                classTask[i]["text"] = [classTask[i].xdfsmc, '安排:'+classTask[i].khfsmc, '学时:'+classTask[i].zxs];
                    data.push(classTask[i]);
                    wx.setNavigationBarTitle({
                      title: 'We校园-上课任务',    //页面标题
                    })
       
            }

        }
        that.setData({
          headerType: 'picker',
            classTask: classTask,
            list: data,
            array: that.data.array,
            color: color,
            Totalnumber: data.length,
            index: 0,
            fontSize: '30rpx',
            text:['学分:'+n.toFixed(1), '课程节数:'+data.length]
        })
    }

    that.bindPickerChange = function (e) {
        that.xiu(that.data.classTask, that.data.array[e.detail.value]);
        that.setData({
            index: e.detail.value
        })
    }
    var date = ''
    console.log(classTask)
    for (var i = 0; i < classTask.length; i++) {
        var p = String(classTask[i].cjsj).split('-');
        var year = p[0]
        var month = p[1]
        date = ''
        if ( (Number(month) >= 6 && Number(month) < 11)) {
            date = String(Number(year)) + '-' + String(Number(year) + 1) + '-' + 1
          } else if(Number(month) >= 11){
            date = String(Number(year)) + '-' + String(Number(year)+1) + '-' + 2
          } else{
            date = String(Number(year) - 1) + '-' + String(Number(year)) + '-' + 2
          }
        var a = true;
        for (var b = 0; b < that.data.array.length; b++) {
            if (date == that.data.array[b]) {
                a = false;
            }
        }
        classTask[i]['date'] = date;
        if (a) {
            that.data.array.push(date);
        }
    }
    that.data.array.sort().reverse();
    console.log(that.data.array)
    that.xiu(classTask, that.data.array[0]);
}
module.exports = runCode;