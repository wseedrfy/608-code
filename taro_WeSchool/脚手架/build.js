const fs = require('fs')
fs.readFile('dist/index.js', (err, buffer) => {
  if(err) {
    console.log(err)
  }else {

    let str = buffer.toString()
    // print(str)
    str = str.replace(/\\n/g,"");        
    str = str.replace(/\\"/g,"");  
    console.log(str);

    fs.writeFile('dist/index.js', str, { encoding: 'utf8' }, err => {})
  }
})
