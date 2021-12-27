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
    node: []
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
  h1() {
    console.log("h1")
  },
  h2() {
    console.log("h2")
  },
  h3() {
    console.log("h3")
  },
  h4() {
    console.log("h4")
  },
  h5() {
    console.log("h5")
  },
  h6() {
    console.log("h6")
  },

  onShow() {
    var personalInformation = wx.getStorageSync('personalInformation')
    var curriculum = personalInformation.curriculum;
    console.log(curriculum)
    this.draw(curriculum)
  },

  async draw(curriculum) {

    const query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        console.log(res[0].node)
        const canvas = res[0].node
        const context = canvas.getContext('2d')
        console.log(context)

        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        context.scale(dpr, dpr)

        context.strokeStyle = "#D4D4D4"
        context.fillStyle = "#D4D4D4"; // 填充颜色
        for (let i = 1; i < 8; i++) {
          for (let j = 1; j < 6; j++) {
            this.point(context, i * 8, j * 8)
          }
        }

        context.strokeStyle = "#38C999" // 边框颜色
        context.fillStyle = "#38C999"; // 填充颜色

        for (let i = 0; i < curriculum.length; i++) {
          let list = curriculum;
          let jc = 0;
          switch (list[i].jcdm) {
            case "0102": jc = 1; break;
            case "0304": jc = 2; break;
            case "0506": jc = 3; break;
            case "0708": jc = 4; break;
            case "0910": jc = 5; break;
          }
          if (list[i].zc == 1) {
            this.point(context, list[i].xq * 8,  jc * 8)
          }
        }
        this.point(context, 60, 65)
      })


  },

  point(context, x, y) {
    context.beginPath();
    context.arc(x, y, 3, 0, 2 * Math.PI);
    context.fill();
    context.stroke()
  }

})