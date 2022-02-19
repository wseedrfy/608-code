const fs = require('fs')

fs.readFile('dist/index.js', (err, buffer) => {
  let str1= buffer.toString()
  let str = `
  const db = wx.cloud.database()
const schoolLoading = db.collection('schoolLoading')
const jump = db.collection('jumpPage')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school : ["通用"],
    tj: ["是", "否"],
    experimentData:"",
    //
    text: \`${str1}\`,
  },

  onLoad: async function (options) {
    var that = this
    wx.showLoading({
      title: '加载基础信息中',
      mask: true
    })
    // 注意！这个只能拉100个学校，我也希望未来我们能超过100个
    var res = (await schoolLoading.where({}).get()).data

    res.forEach(e => {
      that.data.school.push(e.schoolName)
    })
    wx.hideLoading({
      success: (res) => {},
    })
    that.setData({school: that.data.school})
  },
  //输入
 
  chooseTemperature: async function (e) {
    var schoolName = this.data.school[e.detail.value]
    var jumpData = (await jump.where({schoolName : schoolName}).get()).data
    this.setData({tem: this.data.school[e.detail.value], jumpData})
  }, 

   
  choose_ever: function (e) {
    this.setData({everInDangerRegion: this.data.tj[e.detail.value]})
  }, 

  choose_kg: function (e) {
    this.setData({kg: this.data.tj[e.detail.value]})
  }, 

  everIndangerPlaceText: function (e) {
    this.data.jumpData.forEach(e1 => {
      if(e1.name === e.detail.value){
        this.setData({
          everInDangerRegion: '已配置'
        })
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },
  
  onReachBottom: function () {
  },
   
  onShareAppMessage: function () {
    
  }
})
`
  fs.writeFile('../../miniprogram/pages/HOT/HotTest/HotTest.js', str, {
    encoding: 'utf8'
  }, err => {})
  fs.writeFile('../../miniprogram/pages/HOT/HotTest/HotTest.wxml', 
  `
  <view class="page">
  <view class="container">


    <view class="write_Info_Container">
      <view class="title" style="margin-bottom:30rpx"><text>动态js发布模式</text></view>

      <view class="temperature">
        <view>选择学校</view>
        <view class="section_temperature">
          <picker bindchange="chooseTemperature" range="{{school}}">
            <view class="tem">
              {{tem}}
            </view>
          </picker>
        </view>
      </view>

      <view class="temperature" >
        <text style="line-height:64rpx">输入名称</text>
        <view style="width:80%">
          <input style="width:60%" type="text" placeholder="输入名称" bindinput="everIndangerPlaceText" value="{{everIndangerRegionText}}" />
        </view>
      </view>

      <view class="temperature">
        <text>是否添加到首页配置</text>
        <view class="section_Yse_no">
          <picker bindchange="choose_ever" value="{{tj}}" range="{{tj}}">
            <view class="tem">
              {{everInDangerRegion}}
            </view>
          </picker>
        </view>
      </view>

      <view class="temperature" wx:if="{{everInDangerRegion === '是'}}">
        <text style="line-height:64rpx">icon地址</text>
        <view style="width:80%">
          <input style="width:60%" type="text" placeholder="详细地址" bindinput="everIndangerPlaceText" value="{{everIndangerRegionText}}" />
        </view>
      </view>

      <view class="temperature" wx:if="{{everInDangerRegion === '是'}}">
        <text>是否开关</text>
        <view class="section_Yse_no">
          <picker bindchange="choose_kg" value="{{tj}}" range="{{tj}}">
            <view class="tem">
              {{kg}}
            </view>
          </picker>
        </view>
      </view>

      <view wx:else></view>



      <view class="inp">
        <text style="font-size:26rpx;font-weight:800;color:rgba(16,16,16,0.7)">当前代码</text>
        <textarea style="height: 500rpx;"  maxlength="-1" type="text" placeholder="请输入详细地址" value="{{text}}" bindinput="inp_region">
        </textarea>
      </view>


      <view class="end">
        <view class="btn_color1"><button class="btnSubmit" bindtap="submit">发布</button></view>
        <!-- <button class="btnCancel" bindtap="cancel">发布到开发模式</button> -->
      </view>

    </view>

  </view>
</view>
 `, {
    encoding: 'utf8'
  }, err => {})

  fs.writeFile('../../miniprogram/pages/HOT/HotTest/HotTest.wxss', 
  `
  
.page{

  width: 100%;
  margin: 0;
  height: 1720rpx;
  /* height: 100%; */
  /* background-color: #f5f5f54d; */

background-color: rgba(246,246,246);
}
.login_Container{
/* background-color: rgba(246,246,246); */
height: 100%;

}
.container {
/* position: relative; */
/* background-color: rgba(246,246,246); */
/* padding: ; */
height: 100%;

}
.login{
margin:20rpx
}
.login_user{
font-size: 27rpx;
display: flex;
background-color: white;
align-self: center;
margin-top: 20rpx;
padding: 25rpx;
}
.clockContainer {
position: relative;
padding-top:40rpx;
/* margin-top: 200rpx; */
}
.login_input{
margin:0 10%;
}
/* .inp{} */
.describe{
margin-left: 20rpx;
/* text-align: justify; */
font-size:22rpx ;
}
input{
border-left :1rpx solid rgba(127,127,127,0.3);
border-radius: 10rpx;
padding:10rpx 20rpx ;
margin-left: 20rpx;
vertical-align: middle;
width: 80%;
}
textarea{
background-color: #fff;
width: 100%;
margin-top: 20rpx;
border-radius: 20rpx;
padding: 10rpx 10rpx;
box-sizing: border-box;
font-size: 24rpx;
height: 200rpx;
}
.clock {
background-color: #74d5d3;
height: 660rpx;
width: 660rpx;
border-radius: 50%;
line-height: 660rpx;
display: flex;
align-items: center;
text-align: center;
color:white;
font-size: 80rpx;
justify-content: center;
}



.clockContainer text {
text-align: center;
position: absolute;
top: 250rpx;
right: 80rpx;
z-index: 1;
font-size: 100rpx;
font-weight: 500;
color: #ffff;
}

.write_Info_Container {
position: absolute;
top: 20rpx;
left: 15rpx;
right:15rpx
}

.title {
padding-top: 40rpx;
font-size: 36rpx;
text-align: center;
padding-bottom: 15rpx;
font-weight: 800;
color:rgba(16,16,16,0.5)
}

.temperature {
font-size: 28rpx;
padding-bottom: 15rpx;
font-weight: 500;
display: flex;
padding:20rpx 0rpx ;
background-color: white;
margin-bottom: 30rpx;
padding-left: 10rpx;
padding-right: 10rpx;
border-radius: 10rpx;
/* justify-content: space-between; */
}
.tem{
border-bottom: 1rpx solid rgba(231,231,231,086);
position: absolute;
right:15rpx;
height: 40rpx;
width: 40%;
text-align: center;
font-size: 24rpx;
}
.abnomal {
font-size: 40rpx;
padding-bottom: 15rpx;
font-weight: 500;
}
.sle_region{
/* margin-top:20rpx; */
background-color: #fff;
}
.region{
display: flex;
padding:10rpx 0rpx;
align-self: center;
background-color: #fff;
}
.nomal {
font-size: 40rpx;
padding-bottom: 15rpx;
font-weight: 500;
}

.ever_in_dangerRegion {
font-size: 40rpx;
padding-bottom: 15rpx;
font-weight: 500;
}

.ever_danger_region {
font-size: 40rpx;
padding-bottom: 15rpx;
font-weight: 500;
}

.qrColor {
font-size: 40rpx;
padding-bottom: 15rpx;
font-weight: 500;
}

.inMaoMing {
font-size: 24rpx;
padding-bottom: 15rpx;
font-weight: 500;
}

.inDanger {
font-size: 40rpx;
padding-bottom: 15rpx;
font-weight: 500;
}
.region {
font-size: 40rpx;
padding-bottom: 40rpx;
font-weight: 500;
}

/* .btn_color1 {
background-color: #74d5d3;
border-radius: 40rpx;
height: 80rpx;
/* margin: 20rpx 55rpx 5rpx 55rpx; */
/* } */
.btnSubmit {
font-size: 40rpx;
font-weight: 800;
background: #74d5d3;
color: white;
text-align: center;
width: 400rpx;
height: 80rpx;
margin-bottom: 20rpx;
line-height: 55rpx;
border-radius: 20rpx;
}

.btnCancel {
font-size: 40rpx;
font-weight: 500;
color: red;
text-align: center;
width: 600rpx;
height: 80rpx;
line-height: 55rpx;
border-radius: 20rpx;
border: 2rpx solid red;
margin:0 auto;
/* margin: 20rpx 55rpx 5rpx 55rpx; */
}
.alter {
margin-top: 100rpx;
background-color: 	#AFEEEE;
border-radius: 20rpx;
height: 80rpx;
width: 400rpx;
font-weight: 800;
color:white;
/* border-bottom: 2rpx solid black; */
font-weight: 800;
}
.btnLogin {
background: #74d5d3;
color: white;
height: 80rpx;
width: 400rpx;
font-weight: 800;
border-radius: 20rpx;
text-align: center;
margin:0 auto;
margin-top: 50rpx;

}
.end{
margin-top:40rpx
}`, {
    encoding: 'utf8'
  }, err => {})
})