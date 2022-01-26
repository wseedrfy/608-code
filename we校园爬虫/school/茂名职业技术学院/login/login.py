import re
from school.茂名职业技术学院.code.code import code_ocr


def login(session, username, password):
    headers = {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Cookie": '',
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) "
                      "Chrome/95.0.4638.69 Safari/537.36 "
    }

    def login_test(session, username, password):
        status_code = 0
        try:
            code, cookies = code_ocr(session)
            cookie = ''
            for name, value in cookies:
                cookie += '{0}={1};'.format(name, value)
            headers["Cookie"] = cookie
            data = {
                "__VIEWSTATE": "dDw3OTkxMjIwNTU7Oz5qFv56B08dbR82AMSOW+P8WDKexA==",
                "Button1": "",
                "TextBox1": username,
                "TextBox2": password,
                "TextBox3": code
            }

            res = session.post(
                'https://jwc.mmpt.edu.cn/default2.aspx', data=data)
            status_code = res.status_code
            return res.text
        except:
            print("茂名职业技术学院登录有问题，返回代码为", status_code)
        # print(res.text)

    returnData = login_test(session, username, password)
    name = ''
    while True:
        if '用户名或密码不正确' in returnData:
            return name , headers, {
                "msg": '账号密码错误'
            }
        elif '账号已锁定无法登录' in returnData:
            return name , headers, {
                "msg": '密码错误，您密码输入错误已达规定次数，账号已锁定无法登录，次日自动解锁！如忘记密码，请与教务处联系!'
            }
        elif '密码错误' in returnData:
            return name , headers, {
                "msg": '密码错误'
            }
        elif '验证码不正确' in returnData:
            returnData = login_test(session, username, password)
        elif '安全退出' in returnData:
            break
        else:
            return name , headers, {
                "msg": '异常，请重试'
            }
    regname = re.compile(r'xm=(.*?)&')
    name = regname.findall(returnData)[0]
    return name, headers, {
        "msg": 'welcome',

    }
