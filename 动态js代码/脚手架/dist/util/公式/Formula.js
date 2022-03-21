
//在js前端进行运算实在太复杂了这里实在封装数组运算的函数。
//求和
const sum=(x)=>{
  let val = 0
  for(var i=0;i<x.length;i++){
    val = val+x[i]
  }
  return val
}
//数组相乘
const Multi_array = (x,y)=>{
  var res = []
  for (var i = 0;i<x.length;i++){
  res[i] = x[i]*y[i]
  }
  return res
}
//数组相除
const except_array = (x,y)=>{
  var res=[]
  for(var i=0;i<x.length;i++){
      res[i] = x[i]/y[i]
  }
  return res
}
//数组相求幂
const pow_array = (x,n)=>{
  let res=[]
  for(var i=0;i<x.length;i++){
      res[i] = Math.pow(x[i],n)

  }
  return res
}
//数组求根号
const sqrt_array = (x,n)=>{
  let res=[]
  for(var i=0;i<x.length;i++){
      res[i] = Math.pow(x[i],1/n)

  }
  return res
}
//开始间接不确定度的计算


//x+y
const add_u=(ux,uy)=>{
  return Math.round(Math.sqrt(ux**2+uy**2)*100)/100
}

//N=x*y
const multiply_u=(ux,uy,x,y)=>{
  let  N = sum(Multi_array(x,y))/x.length
  let x_ = sum(x)/x.length
  let y_ = sum(y)/y.length
  return Math.round( (Math.sqrt((ux/x_)**2+(uy/y_)**2)*N)*100)/100
}

//N=x/y
const expect_u=(ux,uy,x,y)=>{
  let  N = sum(except_array(x,y))/x.length
  let x_ = sum(x)/x.length
  let y_ = sum(y)/y.length
  return   Math.round(Math.sqrt((ux/x_)**2+(uy/y_)**2)*N*100)/100

}
//N = kx
const linear_u=(ux,k)=>{
  return Math.round(Math.abs(k)*ux*100)/100
}
//N = X的n次方
const pow_u=(ux,x,n)=>{
  let u_N = (n*ux)/(sum(x)/x.length)
  let N_ = pow_array(x,n)
  return u_N*N_
}
//N=X的n次根
const sqrt_u=(ux,x,n)=>{
  let u_N = (1/n*ux)/(sum(x)/x.length)
  let N_ = pow_array(x,n)
  return u_N*N_
}
//N=(X的p次方y的q次方)/z的r次方
//好复杂先放弃了，正常实验也不会这种计算量吧

// complicate_u=(x,y,z,p,q,r)=>{

// }
//N=sinx
const sin_u=(ux,x)=>{
  let x_ = sum(x)/x.length
  return Math.abs(Math.cos(x_)*ux)
}
//N=lnx
const lnx_u=(ux,x)=>{
  return ux/(sum(x)/x.length)
}
module.exports = {
  add_u,
  multiply_u,
  expect_u,
  linear_u,
  pow_u,
  sqrt_u,
  sin_u,
  lnx_u

  // setStarAndComment
}