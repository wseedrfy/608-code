'use strict';

// import parseTag from '../ast.js'


function runCode(that) {

    that.data = {
        html: ''
    };

    that.onShow = function () {};

    var a = "123";

    if (args.username === 18024030112) {
        a = '2323';
    }
    that.setData({
        html: that.parse('        <view>            <text style="color: red;">' + a + '</text>        </view>    ') });
}

module.exports = runCode;
