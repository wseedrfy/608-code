import re


def login(session, username, password, code):
    status_code = 0
    try:
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
        returnData = res.text
        # print(returnData)
        regname = re.compile(r'xm=(.*?)&')
        while True:
            if '用户名或密码不正确' in returnData:
                return {
                    "msg": '账号密码错误'
                }
            elif '账号已锁定无法登录' in returnData:
                return {
                    "msg": '密码错误，您密码输入错误已达规定次数，账号已锁定无法登录，次日自动解锁！如忘记密码，请与教务处联系!'
                }
            elif '密码错误' in returnData:
                return {
                    "msg": '密码错误'
                }
            elif '验证码不正确' in returnData:
                login(session, username, password, code)
            elif '安全退出' in returnData:
                break
            else:
                return {
                    "msg": '异常，请重试'
                }
        name = regname.findall(returnData)[0]
        return name, {
            "msg": 'welcome',

        }
    except:
        print("茂名职业技术学院登录有问题，返回代码为", status_code)
    # print(res.text)
