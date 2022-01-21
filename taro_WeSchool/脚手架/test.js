"use strict";

function runCode(that, options) {
    var i;
    if (args.SchoolIndex.iconList) {
        for (i in args.SchoolIndex.iconList) {
            args.SchoolIndex.iconList[i].icon = util.getStorageImage(args.SchoolIndex.iconList[i].icon);
        }
    }
    wx.setStorageSync('configData', Object.assign({ "timeYear": args.StartTime, "msg": "暂未登录哟" }, args.SchoolIndex));
    that.onShow = function () {
        console.log(wx.getStorageSync("configData"));
        that.setData(wx.getStorageSync('configData'));
    };
    that.onShow();
    if(!options){
      options = {}
    }
    if (options.school === '广东石油化工学院') {
        var input = options.passoword;
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        while (i < input.length) {

            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));

            chr1 = enc1 << 2 | enc2 >> 4;
            chr2 = (enc2 & 15) << 4 | enc3 >> 2;
            chr3 = (enc3 & 3) << 6 | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }

        var string = "";
        i = 0;
        var c = c1 = c2 = 0;

        while (i < output.length) {

            c = output.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if (c > 191 && c < 224) {
                c2 = output.charCodeAt(i + 1);
                string += String.fromCharCode((c & 31) << 6 | c2 & 63);
                i += 2;
            } else {
                c2 = output.charCodeAt(i + 1);
                c3 = output.charCodeAt(i + 2);
                string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                i += 3;
            }
        }

        // An highlighted block
        wx.showModal({
            title: '温馨提示',
            content: '迁移需要中，需要请求您昵称、头像、地区及性别, 用于校园圈',
            success: function success(res) {
                
                if (res.confirm) {
                    wx.getUserProfile({
                        desc: "获取你的昵称、头像、地区及性别",
                        success: function success(res) {
                            wx.showLoading({
                                title: '迁移中',
                                mask: true
                              })
                            wx.cloud.callFunction({
                                name: 'api',
                                data: {
                                    url: 'login',
                                    username: options.username,
                                    password: string,
                                    nickName: res.userInfo.nickName,
                                    iconUrl: res.userInfo.avatarUrl,
                                    school: options.school
                                },
                                success: function success(res) {
                                  wx.hideLoading()
                                    if (res.result.msg == "welcome") {
                                        wx.showLoading({
                                            title: '迁移成功，等待加载页面',
                                            mask: true
                                          })
                                        wx.reLaunch({
                                            url: '/pages/index/index'
                                        });
                                    } else {
                                        console.log(res.result);
                                        wx.showToast({
                                            icon: 'none',
                                            title: "登录失败" + res.result.msg
                                        });
                                        wx.redirectTo({
                                            url: '/pages/login/login'
                                        });
                                    }
                                },
                                fail: function fail(err) {
                                  wx.hideLoading()
                                    wx.showModal({
                                        title: '迁移失败',
                                        showCancel: true, //是否显示取消按钮
                                        content: "是否要登录",
                                        cancelText: "否", //默认是“取消”
                                        // cancelColor: 'skyblue', //取消文字的颜色
                                        confirmText: "是", //默认是“确定”
                                        // confirmColor: 'red', //确定文字的颜色
                                        success: function success(res) {
                                            if (!res.cancel) {
                                                wx.redirectTo({
                                                    url: '/pages/login/login'
                                                });
                                            } else {}
                                        },
                                        fail: function fail(res) {}, //接口调用失败的回调函数
                                        complete: function complete(res) {} //接口调用结束的回调函数（调用成功、失败都会执行）
                                    });
                                }
                            });
                        },
                        fail: function fail(res) {
                            //拒绝授权
                            wx.showToast({
                              icon: 'none',
                              title: '授权失败，需要你自己重新登录或者去We广油迁移',
                            })
                            return;
                        }
                    });
                } else if (res.cancel) {
                    //拒绝授权 showErrorModal是自定义的提示
                    wx.showToast({
                      icon: 'none',
                      title: '授权失败，需要你自己重新登录或者去We广油迁移',
                    })
                    return;
                }
            }
        });

        // console.log(string)

    }
}
module.exports = runCode;
