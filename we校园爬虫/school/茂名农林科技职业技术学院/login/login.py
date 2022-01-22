import json
import base64


def login(session, username, password, code):
    try:
        user = {
            "code": username,  # 账号
            "pwd": password,  # 密码
            "imgCode": code  # 验证码
        }
        str = json.dumps(user)  # 将user转化为string
        b64encode = base64.b64encode(str.encode('utf-8'))  # 将string经b64编码
        headers = {
            "Param-Encoder": "BASE64",
            "Referer": "http://campus.gdnlxy.cn/campus-xmain/x-teach/chengji/student/score-list.html",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0"
        }  # 定义headers
        returnData = session.post('http://campus.gdnlxy.cn/campus-xmain/apic/login', headers=headers,
                                  data=b64encode).text  # 发送登录请求
        while True:
            if "账号或密码有误" in returnData:
                return {
                    "msg": "学号或密码有误"
                }
            elif '请输入账号' in returnData:
                return {
                    "msg": "请输入账号"
                }
            elif '请输入密码' in returnData:
                return {
                    "msg": "请输入密码"
                }
            elif '验证码' in returnData:
                login(session, username, password, code)
            elif returnData == '{}':
                break
            else:
                return {
                    "msg": '异常'
                }
        return {
            "msg": 'welcome'
        }
    except:
        print("茂名农林科技职业技术学院登录有错误")
