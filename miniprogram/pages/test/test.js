// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parent: [{
        class: "first",
        type: "view",
        text: "tes233t",
        bindtap: '',
        child: [{
            type: "text",
            bindtap: "h2",
            text: "请输入"
          },
          {
            type: "input",
            bindtap: "input",
            text: "标签广告",
            id: "ad"
          }
        ]
      },
      {
        type: "view",
        bindtap: "h4",
        text: "test2",
        child: [{
          type: "view",
          bindtap: "h5",
          text: "hhhhhh",
          child: [{
            type: "view",
            bindtap: "h6",
            text: "gggg",
            child: [{
                type: "text",
                bindtap: "h2",
                text: "请输入"
              },
              {
                type: "input",
                bindtap: "input",
                text: "标签广告",
                id: "ad"
              }
            ]
          }]
        }]
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  input(e) {
    console.log(e.detail.value)
    console.log(e.target.id)
  },
  h1() { console.log("h1") },
  h2() { console.log("h2") },
  h3() { console.log("h3") },
  h4() { console.log("h4") },
  h5() { console.log("h5") },
  h6() { console.log("h6") },

  onShow() {
    var personalInformation = wx.getStorageSync('personalInformation')
    var curriculum = personalInformation.curriculum;
  },
  // canvas(){

  // },
  draw() {

    const query = wx.createSelectorQuery()
    query.select('#myCanvas').fields({ node: true, size: true })

    console.log(query)
      // .exec((res) => {
      //   const canvas = res[0].node
      //   const ctx = canvas.getContext('2d')

      //   const dpr = wx.getSystemInfoSync().pixelRatio
      //   canvas.width = res[0].width * dpr
      //   canvas.height = res[0].height * dpr
      //   ctx.scale(dpr, dpr)

      //   ctx.fillRect(0, 0, 100, 100)
      // })
  }

})