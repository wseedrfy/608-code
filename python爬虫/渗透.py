# import requests
import requests

url='https://www.biubbmk.cn/api_flask_zf/YiBan_CWJ'
data={
 "username":"18565242473",
 "password":"Zhangyue1221",
 "submit":
 {"c1": "正常",
  "c2": "正常",
  "c3": "正常",
  "c4": "无上述症状",
  "location_address": "北京市 北京市 东城区 ",
  "location_latitude": 21.64109,
  "location_longitude": 110.91879
 }
}
res=requests.post(url,data)
print(res.content)
