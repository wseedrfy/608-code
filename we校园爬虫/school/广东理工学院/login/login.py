import execjs
from lib.proxy import get_proxy

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
        proxy=get_proxy()

        session.get('http://jwxt.gdlgxy.edu.cn/jsxsd/',proxies=proxy)
        res = session.post('http://jwxt.gdlgxy.edu.cn/jsxsd/xk/LoginToXk', data=data,proxies=proxy)

        if "用户名或密码错误" in res.text:
            return {
                "msg":"用户名或密码错误"
            }
        if res.url=='http://jwxt.gdlgxy.edu.cn/jsxsd/framework/xsMain.jsp':
            return proxy,{
                "msg": "welcome"
            }
    except Exception as e:
        return "","出现问题:"+str(e)

