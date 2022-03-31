import re

import requests
import ddddocr
import hashlib

session = requests.session()
data = {"username": "201205103071"}
session.headers['connection']="keep-alive"
print(session.post('http://s.bitzh.edu.cn/front/isfirstuserlogin', data=data).text)
session.headers['User-Agent'] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0"
res = session.get('http://39.108.86.184:2222/cas3/login')
lt=r'name="lt" value="(.*?)"'
exc = r'name="execution" value="(.*?)"'
lt_test = re.findall(lt,res.text)[0]
exc_test =re.findall(exc,res.text)[0]
res = session.get('http://39.108.86.184:2222/cas3/verifycode.jpg')
# print(res.text)
image_url = 'code.png'
if res.status_code == 200:
    open(image_url, 'wb').write(res.content)  # 将内容写入图片
del res
image = open(image_url, 'rb')
ocr = ddddocr.DdddOcr()
code = ocr.classification(image.read())
print(code)
mm = hashlib.md5(b'cjy596200').hexdigest()

data = {
    "username": "201205103071",
    "password": mm,
    "phone": "",
    "xcode": "",
    "authcode": code,
    "lt": lt_test,
    "execution": exc_test,
    "_eventId": "submit",
    "submit": "登录",
}
res = session.post('http://39.108.86.184:2222/cas3/login', data=data)
print(res.text)
