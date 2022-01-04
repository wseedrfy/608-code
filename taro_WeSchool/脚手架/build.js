const fs = require('fs')



fs.readFile('dist/index.js', (err, buffer) => {
  
  if(err) {
    console.log(err)
  }else {

    let str = buffer.toString()
    // print(str)
    str = str.replace(/\\n/g,"");        
    str = str.replace(/\\"/g,"'");  


    fs.readFile('src/index.css', (err, buffer) => {
      if(err) {
        console.log(err)
      }else {
      // css处理
      let css = buffer.toString()
      css = css.replace(/\n/g,"");   
      var regexp = /\.(.*?) {(.*?)}/g;
      allcss =  css.match(regexp);

      let s = new Set()
      for (i in allcss ){
        var regexp = /\.(.*?) {(.*?)}/;
        let p = allcss[i].match(regexp);
        s.add({[p[1]] : p[2]})
      }
      // console.log(str);
      
      let allStrClass = str.match(/class(.*)="(.*)"/g) ?  str.match(/class(.*)="(.*)"/g) : []; 

      allStrClass = [...allStrClass,  ...str.match(/class='(.*?)*?'/g)]

      console.log(allStrClass, 233)

      for (i in allStrClass){
        var regexp = /class='(.*?)'/;
        let p = allStrClass[i].match(regexp)[1];
        let newStyle = p.split(/\s+/)
        console.log(newStyle)
        let Style = ""
        for (j in newStyle ){
          for (let x of s) {
            // console.log(Object.keys(x)[0])
            if(newStyle[j] === Object.keys(x)[0]){
              Style = Style + x[Object.keys(x)[0]]
              // break;
            }
          }  
        }
        allStrClass[i] = allStrClass[i].replace( /class='(.*?)'/,  'style=\'' + Style + '\'')
        // console.log(allStrClass[i])
      }
      let allStrClass1 = str.match(/class='(.*?)*?'/g); 
      for(i in allStrClass1){
        // console.log(allStrClass1[i], allStrClass[i])
        str = str.replace(String(allStrClass1[i]), allStrClass[i])
      }
      console.log(str)


      fs.writeFile('dist/index.js', str, { encoding: 'utf8' }, err => {})
    }
    
     
    })

  }
})
