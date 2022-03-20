
//在js前端进行运算实在太复杂了这里实在封装数组运算的函数。
//求和
sum=(x)=>{
  let val = 0
  for(var i=0;i<x.length;i++){
    val = val+x[i]
  }
  return val
}
//数组相乘
Multi_array = (x,y)=>{
  res = []
  for (var i = 0;i<x.length;i++){
  res[i] = x[i]*y[i]
  }
  return res
}
//数组相除
except_array = (x,y)=>{
  res=[]
  for(var i=0;i<x.length;i++){
      res[i] = x[i]/y[i]
  }
  return res
}
//数组相求幂
pow_array = (x,n)=>{
  let res=[]
  for(var i=0;i<x.length;i++){
      res[i] = Math.pow(x[i],n)

  }
  return res
}
//数组求根号
sqrt_array = (x,n)=>{
  let res=[]
  for(var i=0;i<x.length;i++){
      res[i] = Math.pow(x[i],1/n)

  }
  return res
}
//开始间接不确定度的计算


//x+y
add_u=(ux,uy)=>{
  return Math.sqrt(ux**2+uy**2)
}

//N=x*y
multiply_u=(ux,uy,x,y)=>{
  let  N = sum(Multi_array(x,y))/x.length
  x_ = sum(x)/x.length
  y_ = sum(y)/y.length
  return Math.sqrt((ux/x_)**2+(uy/y_)**2)*N
}

//N=x/y
expect_u=(ux,uy,x,y)=>{
  let  N = sum(except_array(x,y))/x.length
  x_ = sum(x)/x.length
  y_ = sum(y)/y.length
  return Math.sqrt((ux/x_)**2+(uy/y_)**2)*N
}
//N = kx
linear_u=(ux,k)=>{
  return Math.abs(k)*ux
}
//N = X的n次方
pow_u=(ux,x,n)=>{
  let u_N = (n*ux)/(sum(x)/x.length)
  let N_ = pow_array(x,n)
  return u_N*N_
}
//N=X的n次根
sqrt_u=(ux,x,n)=>{
  let u_N = (1/n*ux)/(sum(x)/x.length)
  let N_ = pow_array(x,n)
  return u_N*N_
}
//N=(X的p次方y的q次方)/z的r次方
//好复杂先放弃了，正常实验也不会这种计算量吧

// complicate_u=(x,y,z,p,q,r)=>{

// }
//N=sinx
sin_u=(ux,x)=>{
  let x_ = sum(x)/x.length
  return Math.abs(Math.cos(x_)*ux)
}
//N=lnx
lnx_u=(ux,x)=>{
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