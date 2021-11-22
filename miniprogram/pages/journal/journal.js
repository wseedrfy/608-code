const db = wx.cloud.database();
const journal = db.collection('journal');

Page({
   data: {
      list:[]
   },
   // 请求数据库函数
   async getJournalData(){
      var that = this;
      await journal.get().then(res => {
         that.setData({
            list:res.data.reverse()
         })
      });
   },
   onLoad: function (options) {
      this.getJournalData()
   },
})