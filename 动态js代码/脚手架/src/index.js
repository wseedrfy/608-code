
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    li:[
      {question:"你通常",answer:[
        "与人容易混熟" , "比较沉静或矜持"
      ]},
      {question:"按程序做事",answer:[
        "合你心意" , "令你感到束缚"
      ]},
      {question:"哪些人更吸引你",answer:[
        "一个思维敏捷及非常聪颖的人" , "实事求是，具有丰富常识的人"
      ]},
      {question:"你倾向于",answer:[
        "重视感情多于逻辑" , "重视逻辑多于感情"
      ]},
      {question:"要作决定时，你认为最重要的是",answer:[
        "据事实衡量" , "考虑他人的感受的意见"
      ]},   
        {question:"在一大群人当中，通常是",answer:[
        "你介绍大家认识" , "别人介绍你"
      ]},    
       {question:"你通常做事多数是",answer:[
        "你按当天的心情去做" , "照拟好的程序去做"
      ]},
      {question:"一般来说，你和哪些人比较合得来",answer:[
        "富有想象力" , "现实的人"
      ]},
    ],
    res:[], // 存放答案
    //选择的id
    id_:0,
    MbtiType:"",
    describe:"",
    click:0,
    animationData: {},
  },
  touchstartX(e) {
    console.log(e);
    this.setData({
        currentIndex: e.currentTarget.id
      });
      console.log( e.currentTarget.id)
      // 获取触摸Y坐标
      this.recordY = e.touches[0].clientY;
      
  },
  test() {
  console.log("test");
  var self = this;
  var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'liner',
    });
  this.animation= animation;
  let recordY;
    this.animation.translateY(-280).rotate(-5).translateX(0).step(); //第一次动画 离开
    this.animation.translateY(0).translateX(0).rotate(0).step();//第二次动画 复位
    this.setData({
      animationData: this.animation.export()//.export清除动画
    });
    this.animation.translateY(40).rotate(0).translateX(0).step(); //第一次动画 离开
    this.animation.translateY(-25).translateX(0).rotate(0).step();//第二次动画 复位
    this.animation.translateY(0).translateX(0).rotate(0).step();//第二次动画 复位
    this.setData({
      animationData2: this.animation.export()//.export清除动画
    });
  },
  choose_ans(e){
    console.log(e)
    this.setData({
      click:e.currentTarget.id
    })
    setTimeout(() => {
      this.setData({
        click:0
      })
      console.log(e.currentTarget.id,"2222222")
     let index = Number(e.currentTarget.id)
    let count = this.data.id_
     if(count==0){
      this.setData({start:new Date().getTime()})
     }
    let res = this.data.res
    res[count] = index
    count = count +1
    this.setData({id_:count,idx:index})
    // this.test();
    if(count==res.length){
      let end =  new Date().getTime()
      console.log(this.data.start)
      let use_Time = end-this.data.start
      console.log(use_Time)
      this.setData({use_Time})
      this.process(res)
    } 
    }, 1000);
    
  },
  choose_return(){
    console.log('choose_return');
    if(this.data.id_>0){
      this.setData({id_:this.data.id_-1})
    }
  },
  initcanvas(MbtiType,describe){
    // wx.showLoading({
    //   title: '生成中',
    //   mask:true,
    // })
    
    console.log(MbtiType);
    console.log(describe);
    let that =this;
    let wpx = wx.getSystemInfoSync().windowWidth/375
    // let iconurl = wx.getStorageSync('args').iconUrl;
    const query = wx.createSelectorQuery()
    // headerImg.src = iconurl;
    query.select('#shareCanvas')
    .fields({ node: true, size: true })
    .exec((res) => {
      const canvas = res[0].node
      console.log(canvas)
      const ctx = canvas.getContext('2d')
      const dpr = wx.getSystemInfoSync().pixelRatio
      console.log(canvas);
      canvas.width = res[0].width * dpr
      canvas.height = res[0].height * dpr
      ctx.scale( dpr,dpr)
      this.setData({
        ctx,canvas,wpx
      })
      console.log(canvas.width);
      console.log(canvas.height);
      console.log('初始化完成');
      // this.draw(ctx,canvas,wpx)//开始画图
      //背景色块
      this.draw(ctx,canvas,wpx,dpr,MbtiType,describe)
    })
},
draw(ctx,canvas,wpx,dpr,MbtiType,describe){
  let wxname = "微信名字iagfsgfligfifg"
  //背景色块 #b9cfeb
  ctx.save();
  ctx.beginPath()//开始创建一个路径
  this.roundRect(ctx, 0*wpx, 0*wpx,this.data.canvas.width/dpr,this.data.canvas.height/dpr, 10,wpx)//圆角
  ctx.fillStyle='#74b9ff'
  ctx.fillRect(0*wpx, 0*wpx,this.data.canvas.width*wpx,this.data.canvas.height*wpx)
  ctx.clip()//裁剪
  ctx.closePath();
  ctx.restore();
  // 上色块 
  // ctx.save();
  // ctx.beginPath()//开始创建一个路径
  // this.roundRect(ctx, 8*wpx, 7*wpx,this.data.canvas.width/dpr*0.94,this.data.canvas.height/dpr*0.05, 5,wpx)//圆角
  // ctx.fillStyle='#74b9ff'
  // ctx.fillRect(0*wpx, 0*wpx,this.data.canvas.width*wpx,this.data.canvas.height*wpx)
  // ctx.clip()//裁剪
  // ctx.closePath();
  // ctx.restore();
  ctx.fillStyle='white';
  ctx.font=String(12*wpx)+'px Arial';
  ctx.fillText("16种人格社交指南",14*wpx,28*wpx);
  ctx.font=String(10*wpx)+'px Arial';
  ctx.fillText("—— 你是哪一种人格？",116*wpx,28*wpx);
  //微信名字
  // ctx.save();
  // ctx.fillStyle='white';
  // ctx.textAlign='center'
  // ctx.font=String(12*wpx)+'px Arial';
  // ctx.fillText(wxname,this.data.canvas.width/dpr*0.5,44*wpx);
  // ctx.restore();
  //中色块 背景
  ctx.save();
  ctx.beginPath()//开始创建一个路径
  this.roundRect(ctx, 8*wpx, 45*wpx,this.data.canvas.width/dpr*0.94,this.data.canvas.height/dpr*0.29, 5,wpx)//圆角
  ctx.fillStyle='#b9cfeb'
  ctx.fillRect(0*wpx, 0*wpx,this.data.canvas.width*wpx,this.data.canvas.height*wpx)
  ctx.clip()//裁剪
  ctx.closePath();
  ctx.restore();
  //中色块中 小色块
  // ctx.save();
  // ctx.beginPath()//开始创建一个路径
  // this.roundRect(ctx, 8*wpx, 55*wpx,this.data.canvas.width/dpr*0.94,this.data.canvas.height/dpr*0.03, 2,wpx)//圆角
  // ctx.fillStyle='#74b9ff'
  // ctx.fillRect(0*wpx, 0*wpx,this.data.canvas.width*wpx,this.data.canvas.height*wpx)
  // ctx.clip()//裁剪
  // ctx.closePath();
  // ctx.restore();
  //小圆点 和字
  // ctx.save();
  // ctx.beginPath()//开始创建一个路径
  // ctx.arc(20*wpx, 61*wpx, 2*wpx, 0, Math.PI * 2,false)
  // ctx.clip()//裁剪
  // ctx.fillStyle='white'
  // ctx.fillRect(0*wpx, 0*wpx, this.data.canvas.width*wpx, this.data.canvas.height*wpx)
  // ctx.closePath();
  // ctx.restore();
  // ctx.fillStyle='white';
  // ctx.font=String(7*wpx)+'px Arial';
  // ctx.fillText("MY PERSONALTY TYPE IS",26*wpx,63.5*wpx);
  //头像
  this.drawiconurl(ctx,canvas,wpx);
  //MBTI类型
  ctx.fillStyle='white';
  ctx.font=String(20*wpx)+'px Arial';
  ctx.fillText("您的MBTI类型为",40*wpx,145*wpx);
  ctx.fillStyle='#FCEE98';
  ctx.font=String(20*wpx)+'px Arial';
  ctx.fillText(MbtiType,190*wpx,145*wpx);
  //下色块 背景
  ctx.save();
  ctx.beginPath()//开始创建一个路径
  this.roundRect(ctx, 8*wpx, 169*wpx,this.data.canvas.width/dpr*0.94,this.data.canvas.height/dpr*0.435, 5,wpx)//圆角
  ctx.fillStyle='#b9cfeb'
  ctx.fillRect(0*wpx, 0*wpx,this.data.canvas.width*wpx,this.data.canvas.height*wpx)
  ctx.clip()//裁剪
  ctx.closePath();
  ctx.restore();
  //下色块中 小色块
  // ctx.save();
  // ctx.beginPath()//开始创建一个路径
  // this.roundRect(ctx, 8*wpx, 179*wpx,this.data.canvas.width/dpr*0.94,this.data.canvas.height/dpr*0.03, 2,wpx)//圆角
  // ctx.fillStyle='#74b9ff'
  // ctx.fillRect(0*wpx, 0*wpx,this.data.canvas.width*wpx,this.data.canvas.height*wpx)
  // ctx.clip()//裁剪
  // ctx.closePath();
  // ctx.restore();
  //小圆点 和字
  // ctx.save();
  // ctx.beginPath()//开始创建一个路径
  // ctx.arc(20*wpx, 185*wpx, 2*wpx, 0, Math.PI * 2,false)
  // ctx.clip()//裁剪
  // ctx.fillStyle='white'
  // ctx.fillRect(0*wpx, 0*wpx, this.data.canvas.width*wpx, this.data.canvas.height*wpx)
  // ctx.closePath();
  // ctx.restore();
  // ctx.fillStyle='white';
  // ctx.font=String(7*wpx)+'px Arial';
  // ctx.fillText("ABOUT ME",26*wpx,187.5*wpx);
  //文本 内容
  ctx.fillStyle='white';
  ctx.font=String(12*wpx)+'px Arial';
  //文本换行 参数：1、canvas对象，2、文本 3、距离左侧的距离 4、距离顶部的距离 5、（）6、文本的宽度
  this.drawText(ctx,describe,19*wpx,190*wpx,10,227*wpx);
  //底部二维码
  this.draw_we_codeurl(ctx,canvas,wpx,10,352)
  ctx.font=String(10*wpx)+'px Arial';
  ctx.fillText("长按识别二维码",55*wpx,365*wpx);
  ctx.fillText("获取你的MBIT人格分析报告",55*wpx,385*wpx);
},
//we校园图标
draw_we_codeurl(ctx,canvas,wpx,x,y){
  console.log("drawiconurl");
  let we_iconurl = "https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/gh_2927abcc72c9_258.jpg?sign=b685101cc1b9e449b4ae4ef0700028f2&t=1647171838";
  const headerImg = canvas.createImage();
  headerImg.src = we_iconurl;
  headerImg.onload = () => {
    ctx.drawImage(headerImg,x*wpx,y*wpx,40*wpx,40*wpx);
  };
},
//文本换行 参数：1、canvas对象，2、文本 3、距离左侧的距离 4、距离顶部的距离 5、6、文本的宽度
  drawText: function(ctx, str, leftWidth, initHeight, titleHeight, canvasWidth) {
      var lineWidth = 0;
      var lastSubStrIndex = 0; //每次开始截取的字符串的索引
      for (let i = 0; i < str.length; i++) {
          lineWidth += ctx.measureText(str[i]).width;
          if (lineWidth > canvasWidth) {
              ctx.fillText(str.substring(lastSubStrIndex, i), leftWidth, initHeight); //绘制截取部分
              initHeight += 20; //字体行高
              lineWidth = 0;
              lastSubStrIndex = i;
              titleHeight += 30;
          }
          if (i == str.length - 1) { //绘制剩余部分
              ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight);
          }
      }
      // 标题border-bottom 线距顶部距离
      titleHeight = titleHeight + 10;
      return titleHeight
  },
drawiconurl(ctx,canvas,wpx,){
  console.log("drawiconurl");
  let iconurl = wx.getStorageSync('args').iconUrl;
  const headerImg = canvas.createImage();
  headerImg.src = iconurl;
  headerImg.onload = () => {
    ctx.save();
    ctx.beginPath()//开始创建一个路径
    ctx.arc(134*wpx, 90*wpx, 26*wpx, 0, 2 * Math.PI, false)//画一个圆形裁剪区域
    ctx.clip()//裁剪
    ctx.fillStyle='#389e89'
    ctx.fillRect(0*wpx, 0*wpx, this.data.canvas.width*wpx, this.data.canvas.height*wpx)
    ctx.drawImage(headerImg,108*wpx,63*wpx,53*wpx,53*wpx);
    ctx.closePath();
    ctx.restore();
    
  }
},
roundRect(ctx, x, y, w, h, r,wpx) {
  console.log(w);
  console.log(h);
  console.log(r);
  // 开始绘制
  ctx.beginPath()
  // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
  ctx.setFillStyle='transparent'
  ctx.setStrokeStyle='transparent'
  // 绘制左上角圆弧
  ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5,false)   
  // 绘制border-top
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.lineTo(x + w, y + r)
  // 绘制右上角圆弧
  ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)   
  // 绘制border-right
  ctx.lineTo(x + w, y + h - r)
  ctx.lineTo(x + w - r, y + h)
  // 绘制右下角圆弧
  ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)    
  // 绘制border-bottom
  ctx.lineTo(x + r, y + h)
  ctx.lineTo(x, y + h - r)
  // 绘制左下角圆弧
  ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)   
  // 绘制border-left
  ctx.lineTo(x, y + r)
  ctx.lineTo(x + r, y)
  
  // ctx.fill()
  // ctx.stroke()
  ctx.closePath()
  // 剪切
  ctx.clip()
},

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const res = Array.from({length: this.data.li.length}, () => 0);
    this.setData({res})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  //mbti处理的函数
  process(res){
    console.log('process');
    let relu = [
      [{"1":"E"},
      {"2":"I"}],  //在这里
      [{"1":"J"},
      {"2":"P"}],
      [{"1":"N",},
      {"2": "S",}],
      [{ "1": "F"},
      {"2" : "T"}],
      [{"1": "T"},
      {"2" :"F"}],
      [{"1":"E"},
      {"2": "I"}],
      [{"1":"P"},
      { "2":"J"},],
      [{ "1": "N"},
      {"2": "S"}]]
      //计算数量
      let ret = []
      for(var i = 0;i<relu.length;i++){
        ret.push(relu[i][Number(res[i])-1])
      }
      let dict = {}
      ret.forEach((e)=>{
        if(!(dict.hasOwnProperty(e[Object.keys(e)]))){
          dict[e[Object.keys(e)]] = 1
        }
        else{
          dict[e[Object.keys(e)]] = dict[e[Object.keys(e)]] + 1
        }
      })
      let list_type = []
      //如果都只有一个
     let key  = Object.keys(dict)
      key.forEach((e)=>{
        if(dict[e]==2){
          list_type.push(e)
        }
        else if(dict[e]==1){
          if(e=="I" || e=="N" || e=="F" || e=="P"){
            list_type.push(e)
          }
        }
      })
      let all_type = [{
type:"ISTJ",
des:`1.传统性的思考者
2.行事务实、有序、实际 、 逻辑、真实及可信赖
3.十分留意且乐于任何事（工作、居家、生活均有良好组织及有序。
4.照设定成效来作出决策且不畏阻挠与闲言会坚定为之。
5.重视传统与忠诚。
6.严肃、安静、 志与全力投入、及可被信赖获致成功。`
      },{
type:"ISFJ",
des:`1.安静、和善、负责任且有良心。
2.行事尽责投入。
3.安定性高。
4.愿投入、吃苦及力求精确。
5.兴趣通常不在于科技方面。对细节事务有耐心
6.忠诚、考虑周到、且会关切他人感受
7.致力于创造有序及和谐的工作与家庭环境。`
      },{
type:'INFJ',
des:`1.因为坚忍、创意及必须达成的意图而能成功
2.会在工作中投注最大的努力。
3.默默的、诚挚的及用心的关切他人
4.因坚守原则而受敬重
5.提出造福大众利益的明确远景而为人所尊敬与追随
6.想了解什么能激励别人及对他人具洞察力
7.光明正大且坚信其价值观。`
      },{
type:'INTJ',
des:`1.固执顽固者-具有强大动力来达成目的与创意
2.有宏大的愿景且能快速在众多外界事件中找出有意义的模范
3.对所承负职务，具良好能力于策划工作并完成
4.具怀疑心、挑剔性、独立性、果决，对专业水准及绩效要求高`
},{
        type:'ISTP',
        des:`1.冷静旁观者—安静、预留余地、弹性及会以无偏见的好奇心与未预期原始的幽默观察与分析
2.有兴趣于探索原因及效果，重视效能
3.擅长于掌握问题核心及找出解决方式
4.分析成事的缘由且能实时由大量资料中找出实际问题的核心`
      },{
 type:'ISFP',
des:`1.羞怯的、安宁和善地、敏感的、亲切的、且行事谦虚。
2.喜于避开争论，不对他人强加已见或价值观
3.无意于领导却常是忠诚的追随者
4.办事不急躁，安于现状无意于以过度的急切或努力破坏现况
5.喜欢有自自己的空间及照自订的时程办事`
      },{
        type:"INFP",
        des:`1.安静观察者，具理想性与对其价值观及重要之人具忠诚心
2.希望在生活形态与内在价值观相吻合
3.具好奇心且很快能看出机会所在。常担负开发创意的触媒者 
4.除非价值观受侵犯，行事会具弹性、适应力高且承受力强
5.具想了解及发展他人潜能的企图。想作太多且作事全神贯注 
7.具有适应力、有弹性除非价值观受到威胁。`
      },{
        type:'INTP',
        des:`1.安静、自持、弹性及具适应力
2.特别喜爱追求理论与科学事理
3.习于以逻辑及分析来解决问题—问题解决者
4.最有兴趣于创意事务及特定工作，对聚会与闲聊无太大兴趣
5.追求可发挥个人强烈兴趣的生涯
6.追求发展对有兴趣事务之逻辑解释`
      },{
type:"ESTP",
des:`1.擅长现场实时解决问题—解决问题者
2.喜欢办事并乐于其中及过程
3.倾向于喜好技术事务及运动，交结同好友人
4.具适应性、容忍度、务实性；投注心力于会很快具 成效工作
5.不喜欢冗长概念的解释及理论
6.最专精于可操作、处理、分解或组合的真实事务`
      },{
type:'ESFP',
des:`1.外向、和善、接受性、乐于分享喜乐。
2.喜欢与他人一起行动且促成事件发生。
3.知晓事件未来的发展并会积极参与。
4.最擅长于人际相处能力及具备完备常识，很有弹性能立即 适应他人与环境。
5.对生命、人、物质享受的热爱者。`
      },{
type:"ENFP",
des:`1.即兴执行者。
2.几乎能达成所有有兴趣的事。
3.对难题很快就有对策并能对有困难的人施予援手。
4.依赖能改善的能力而无须预作规划准备。
5.为达目的常能找出强制自己为之的理由。
6.充满热忱、活力充沛、聪明的、富想象力的，视生命充满机会但期能得自他人肯定与支持`
      },{
        type:"ENTP",
        des:`1.反应快、聪明。
2.具激励伙伴、敏捷及直言讳专长。
3.会为了有趣对问题的两面加予争辩。
4.对解决新及挑战性的问题富有策略，但会轻忽或厌烦经常的任务与细节。
5.兴趣多元，易倾向于转移至新生的兴趣。
6.对所想要的会有技巧地找出逻辑的理由。`
      },{
        type:"ESTJ",
        des:`1 具决断力、关注细节且很快作出决策—优秀行政者
2.不喜欢抽象理论；最喜欢学习可立即运用事理。
3.喜好组织与管理活动且专注以最有效率方式行事以达致成效。
4.务实、真实、事实倾向，具企业或技术天份。
5.会忽略他人感受。
6.喜作领导者或企业主管`
      },{
        type:"ESFJ",
des:`1.诚挚、爱说话、合作性高、受欢迎、光明正大的—天生的合作者及活跃的组织成员。
2.重和谐且长于创造和谐。
3.常作对他人有益的事。
4.给予鼓励及称许会有更佳工作成效。
5.对直接及有形影响人们生活的事情感兴趣。
6.喜欢与他人共事去精确且准时地完成工作`
      },{
        type:"ENFJ",
des:`1.热忱、负责任的具能鼓励他人的领导风格。
2.对别人所想会表达真正关切并切实用心去处理。
3.能技巧性地带领团体讨论或演示文稿提案。
4.爱交际、受欢迎及富同情心。
5.对夸奖及批评很在意。
6.喜欢带领别人且能使别人或团体发挥潜能`
      },{
        type:"ENTJ",
des:`1.坦诚、具有决策力的活动领导者。
2.长于发展与实施广泛的系统以解决组织的问题。
3.专精于具内涵与智能的谈话如对公众演讲。
4.乐于经常吸收新知识且能广开信息管道。
5.容易生过度自信，会强于表达自已创见。
6.喜于目标策划及目标设定`
      },
      ]
      all_type.forEach((e)=>{
        //list_type:["p","n","t","i"]
        list_type = list_type.sort()
        let t = e.type.split("").sort()
        if(list_type.join("")===t.join("")){
          this.setData({MbtiType:e.type,describe:e.des})
          this.initcanvas(e.type,e.des)
          return -1
        }
      })
      //存数据库
      let username =20014260415
      let School = "广东石油化工学院"
      db.collection('MBTI-Test').add({
        data:{
          username:username,
          School:School,
          Time:new Date(),
          Type:this.data.MbtiType,
          use_Time:this.data.use_Time  //用时毫秒
        },
        success(res){
          console.log(res)
        }
      })
  },
  share(e){
    let that = this;
    let w = wx.getSystemInfoSync().windowWidth/375
    let args = wx.getStorageSync('args');
    wx.showLoading({
      title: '加载中',
    })
    wx.canvasToTempFilePath({
      canvas:that.data.canvas,
      width:that.data.canvasWidth,
      height:that.data.canvasHeight,
      destHeight:that.data.canvasHeight*4,
      destWidth:that.data.canvasWidth*4,
      quality:1,
        success:function(res){
          let url = res.tempFilePath
          console.log(url)
          wx.saveImageToPhotosAlbum({
            // 下载图片
            filePath: url,
            success: function (e) {
              console.log(e)
              wx.showToast({
                title: '二维码已保存成功',
                icon: 'success',
              })
            },
          })

          // wx.downloadFile({
          //   url: url,
          //   success: (res) => {
          //     console.log( res.tempFilePath)
          //     wx.showShareImageMenu({
          //       path: res.tempFilePath
          //     })
          //     wx.hideLoading()
          //   }
          // })
        }
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})