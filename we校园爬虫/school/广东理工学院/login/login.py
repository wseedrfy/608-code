import execjs
import json

def encodeInp(msg):  # python 调用JS加密 返回 加密后的结果
    with open('conwork.js', encoding='utf-8') as f:
        js = execjs.compile(f.read())
        return js.call('encodeInp', msg)


def login(xh, pwd, session):
    try:

        account = encodeInp(xh)
        passwd = encodeInp(pwd)
        encoded = account + "%%%" + passwd
        data = {
            "userAccount": xh,
            "userPassword": "",
            "encoded": encoded
        }

        session.get('http://39.108.86.184:81/jsxsd/')
        res = session.post('http://39.108.86.184:81/jsxsd/xk/LoginToXk', data=data)
        if "用户名或密码错误" in res.text:
            return {
                "msg": "用户名或密码错误"
            }
        elif 'xsMain.jsp' in res.url:
            return {
                "msg": "welcome"
            }
        else:
            return {
                "msg":"错误"
            }
    except Exception as e:
        return "出现问题:" + str(e)
