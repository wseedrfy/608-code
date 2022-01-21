var xlsx = require('xlsx');
var fs = require('fs');
const fpath = './tmp/test.xlsx'
// var sheets = xlsx.parse('./tmp/test.xlsx', {sheetStubs:false});
exports.main = async (event) => {
  let datas = parseXlsxData(fpath,0,1)
  // console.log(datas)
  // let datas = parseXlsxData(fpath)
  let kxq = 0
  let kbb = 0
  let data = []
  console.log(datas)
  for(i in datas){
    if(!datas[i][0]){
      continue
    }
    // console.log(datas[i][0])
    if(  datas[i][0].match(/星期/)){
      kxq = i
      // console.log(111)
    }else if( datas[i][0].match(/班 别/)){
      kbb = i
      // console.log(112)
    }else if (!(datas[i].length > 30) ){
      let jcdmSplit
      for(j in datas[i]){
        if(j > 0 && datas[i][j]){
          jcdmSplit = datas[kbb][j].split('，')
          let z = datas[i][j].split(/\s+/)
          console.log(z[z.length - 1].match(/[u4e00-u9fa5]/))
          let jxcdmc = z[z.length - 1].match(/![u4e00-u9fa5](.*?)/) || ''

          data.push(
            {
              jxcdmc,
              jcdm: (Number(jcdmSplit[0]) < 10 ? "0" + jcdmSplit[0] : jcdmSplit[0]) + (Number(jcdmSplit[1]) < 10 ? "0" + jcdmSplit[1] : jcdmSplit[1])
            }
          )
        }

      }

    }
  }
  console.log(data)

  // xlsx解析函数，通过路径参数，和表名称(没有名称用Sheet2表示第二张表)参数解析xlsx文件,
    // 参数3为无效列数，设置无效列会把生成的数组的行数据从后向前删除字段值
  function parseXlsxData(fpath,sheetName,colNone=0){
    
    const sourceData = xlsx.readFile(fpath, {})    // 通过xlsx库获取源数据
    
    sheetName =  sourceData.SheetNames[0]

    let sheetData = sourceData.Sheets[sheetName]		// 获取xlsx表数据，默认获取第一张
    if(!sheetData) return '你访问的数据表不存在'
    
    // 获取行数col和列数row
    let ref = sheetData['!ref']
    let refParse = ref.match(/[a-z]+|[0-9]+/ig)

    let col = refParse[3] - refParse[1] + 1

  
    let rowNumberRefParse2 = (refParse[2].length-1) * 90

    for(i = 1; i< refParse[2].length ; i++){
      rowNumberRefParse2 += refParse[2][i].charCodeAt() 
      rowNumberRefParse2 -= 65
    }

    let row = rowNumberRefParse2 - refParse[0].charCodeAt()


    // 获取单元格合并数据并建立数组索引
    let merges = sheetData['!merges']
    // console.log(col, row, 233)
    let mergesParses = xlsxMergeParse(merges)
    
    let mergeIndexs = mergeIndex(mergesParses)
    // console.log(sheetData)
    // 根据表的行数和列数创建一个表，在创建每个单元格时插入数据，数据填充普通单元格直接引用sheetData，
      //合并单元格通过映射下标计算引用sheetData
    let datas = []
    for(let i = 1;i< col + 1 ;i++){
      let row = []
      
      for(let j = refParse[0].charCodeAt();j<rowNumberRefParse2+1-colNone;j++){
        let letter = String.fromCharCode(j)
        let k = j-64
  
        row.push(sheetData[letter+i] ? sheetData[letter+i].w : autoFill([i,k],mergeIndexs,mergesParses,sheetData))
      }
      datas.push(row)
    }
    // console.log(datas)
    return datas
  }
  
  
  
  // 解析单元格合并数据方法
  // 解析表格单元格合并数据  把参与合并的单元格全部计算并统计位置信息
  function xlsxMergeParse(merges){
    let arr = []
    
    merges.map(v=>{
      let {s,e} = v
      let result = []
      let addNum = 1	//使数组下标加一，符合Excel单元格下标
      if(s.c === e.c){
        for(let i = s.r;i<e.r+1;i++){result.push([i+addNum,s.c+addNum])}
      }else{
        for(let i = s.c;i<e.c+1;i++){result.push([s.r+addNum,i+addNum])}
      } 
      arr.push(result)
    })
    
    return arr
    
  }
  
  // 单元格合并数据建立索引
  // 单元格合并数据为三维数组，为了提升数据处理效率，添加索引（变为一维数组，序列化位置信息）
  function mergeIndex(mergesParse){
    
    let datas = []
    
    mergesParse.map((v,i) => {
      let row = []
      v.map((v1,i1) => {
        row.push(v1.join(','))
        row.push([i,i1].join('-'))
      })
      datas.push(row)
    })
    
    return datas.flat(Infinity)
  }
  
  // 根据单元格下标计算应该填充的值
  function autoFill(point,index,mergesParses,sheetData){
    
    // 判断此单元格是否属于合并单元格
    let isNeed = index.indexOf(point.join(','))
    if(isNeed < 0) return undefined
    
    // 通过索引获取映射的合并数据三维数组的下标
    let target = index[isNeed+1]
    let result = target.split('-')[0]
    result = mergesParses[result][0]
    
    // 返回合并单元格左上单元格数据
    result = sheetData[String.fromCharCode(result[1]+64)+result[0]].w
    return result
  }
}