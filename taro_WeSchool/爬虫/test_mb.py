from flask import Flask, request
import requests
from requests.sessions import session
from school_api.check_code import CHECK_CODE
import json
from bs4 import BeautifulSoup

app = Flask(__name__)


@app.route('/test', methods=["POST"])
def login():
    data = json.loads(request.data)
    username = data['username']
    password = data['password']
    session = requests.Session()
    def login(username, password):
        res = session.get('https://jwc.mmpt.edu.cn/default2.aspx')
        cookies = res.cookies.items()
        cookie = ''
        for name, value in cookies:
            cookie += '{0}={1};'.format(name, value)
        # print(cookie)
        headers = {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Cookie": cookie,
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
        }
        res = session.get('https://jwc.mmpt.edu.cn/CheckCode.aspx', headers=headers)
        code = CHECK_CODE.verify(res.content)
        data = {
            "__VIEWSTATE": "dDw3OTkxMjIwNTU7Oz5qFv56B08dbR82AMSOW+P8WDKexA==",
            "Button1": "",
            "TextBox1": username,
            "TextBox2": password,
            "TextBox3": code
        }

        res = session.post('https://jwc.mmpt.edu.cn/default2.aspx', headers=headers, data=data)
        # print(res.text)
        return str(res.text), headers

    returnData, headers = login(username, password)
    while True:
        if '用户名或密码不正确' in returnData:
            return {
                "msg": '账号密码错误'
            }
        elif '验证码' in returnData:
            returnData, headers = login(username, password)
        elif '安全退出' in returnData:
            break
        else:
            return {
                "msg": '异常'
            }
    return {
        "msg": 'wlecome'
    }

# headers = {
#     "Referer": "https://jwc.mmpt.edu.cn/xs_main.aspx?xh=" + username,
#     "Content-Type": "text/html;charset=gb2312",
#     "Cookie": cookie,
#     "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
# }

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=1)
