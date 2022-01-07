function runCode(that) {

    that.data.array = ['公选课', '2019-2020-1']

    that.showList = function (id) {
 
        // kcdlmc: "公共选修课" xdfsmc: "任选"
        var a = 0,
            b = 0,
            c = 0,
            d = 0,
            k = 0,
            f = 0;
        var isCourse = 'none';
        var i = 0
        var data = [],
            color = [],
            achievement = that.data.achievement;
        console.log(achievement)

        for (i = 0; i < achievement.length; i++) {

            if (achievement[i].xnxqmc == that.data.array[id] || (achievement[i].kcdlmc == "公共选修课" && id == 0)) {
                a = Number(achievement[i].xf) + a;
                b = Number(achievement[i].cjjd) + b;
                c = Number(achievement[i].xf) * Number(achievement[i].cjjd) + c;
                if (achievement[i].kcdlmc != "公共选修课") {
                    d = Number(achievement[i].xf) + d;
                    k = Number(achievement[i].cjjd) + k;
                    f = Number(achievement[i].xf) * Number(achievement[i].cjjd) + f;
                }

                data.push(achievement[i]);
            }


        }
        var pj_credit = c / a;
        var pj_credit2;
        if (data[0] === undefined) {
            isCourse = '';
            msg = "此类无成绩"
            that.setData({
                isCourse: isCourse,
                msg: msg,
                list: data,
                index: id,
                headerType: 'picker',
                text: ["此类无成绩"],
            })
        } else {

            d ? (pj_credit2 = f / d) : (pj_credit2 = 0)

            // 颜色
            for (i = 0; i < data.length; i++) {
                if (parseInt(data[i].zcj) >= 90) {
                    color.push("#11c1f3");
                } else if (parseInt(data[i].zcj) >= 80) {
                    color.push("#33cd5f");
                } else if (parseInt(data[i].zcj) >= 70) {
                    color.push("#886aea");
                } else if (parseInt(data[i].zcj) >= 60) {
                    color.push("#ffc900");
                } else {
                    color.push("#CC0000");
                }
                data[i].title = data[i].kcmc.replace(/&ldquo;/g, "").replace(/&rdquo;/g, "")
                data[i].score = data[i].zcj
                data[i].text = [data[i].xdfsmc, '学分:' + data[i].xf, '绩点:' + data[i].cjjd, '状态:' + data[i].ksxzmc]
            }
            that.setData({
                headerType: 'picker',
                text: ['学分:' + a, '平均绩点:' + pj_credit.toFixed(2), '无公选:' + pj_credit2.toFixed(2)],
                isCourse: isCourse,
                index: id,
                list: data,
                color: color,
                msg: ''
            })
        }
        wx.setNavigationBarTitle({
            title: 'We校园-成绩',    //页面标题
        })


    }

    that.totalJD = function () {
        var zxf = 0;
        var cjjd = 0
        var i = 0
        var achievement = that.data.achievement
        for (i = 0; i < achievement.length; i++) {
            if (achievement[i].kcdlmc != "公共选修课") {
                zxf += Number(achievement[i].xf);
                cjjd += Number(achievement[i].xf) * Number(achievement[i].cjjd);
            }
        }
        console.log("总学分:" + zxf, "总绩点:" + (cjjd / zxf).toFixed(2))
    }

    var achievement = wx.getStorageSync('personalInformation').achievement;

    achievement.sort(function (a, b) { return String(b.cjjd).localeCompare(String(a.cjjd), 'zh') })
    if(achievement.length === 0){
        that.setData({msg: "你暂无成绩哟"})
    }


    // 选出所有年份
    for (i = 0; i < achievement.length; i++) {

        if (!that.data.array.includes(achievement[i].xnxqmc)) {
            that.data.array.push(achievement[i].xnxqmc);
        }
    }
    // 年份从大到小
    that.data.array.sort()
    that.data.array.reverse()

    that.bindPickerChange = function (e) {
        console.log(e)
        this.showList(e.detail.value)
    }

    that.setData({
        array: that.data.array,
        achievement: achievement
    })

    that.showList(1)
    that.totalJD()
}
module.exports = runCode;