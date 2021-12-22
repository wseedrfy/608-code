// import parseTag from '../ast.js'



function runCode(that) {

  that.data = {
    html: '',
    test: "no",
    whichWeek: ["23", "2"]
  }

  if (args.username === true) {
    that.data.test = 'hello world'
  }

  that.data.wlistPoint = new Array();
  for (var i = 0; i < 20; i++) {
    that.data.wlistPoint[i] = i;
  }


  that.onShow = () => {
    that.setData({
      html: that.parse(`
      <view style='color: red'>${that.data.test} ${that.data.wlistPoint.map(element => {
        "<view>" + element + "</view>"
      })}</view>
        `)
    })
  }


}

module.exports = runCode;
