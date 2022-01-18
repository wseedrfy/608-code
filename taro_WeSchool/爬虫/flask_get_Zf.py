from flask import Flask, request
import requests
from school_api.check_code import CHECK_CODE
import json
import time
import re
from bs4 import BeautifulSoup
from datetime import datetime
import base64
import ddddocr
from hex2b64 import HB64
import RSAJS
from pyquery import PyQuery as pq


app = Flask(__name__)


@app.route('/login', methods=["POST"])
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
        res = session.get(
            'https://jwc.mmpt.edu.cn/CheckCode.aspx', headers=headers)
        code = CHECK_CODE.verify(res.content)
        data = {
            "__VIEWSTATE": "dDw3OTkxMjIwNTU7Oz5qFv56B08dbR82AMSOW+P8WDKexA==",
            "Button1": "",
            "TextBox1": username,
            "TextBox2": password,
            "TextBox3": code
        }

        res = session.post(
            'https://jwc.mmpt.edu.cn/default2.aspx', headers=headers, data=data)
        # print(res.text)
        return str(res.text), headers

    returnData, headers = login(username, password)
    while True:
        if '用户名或密码不正确' in returnData:
            return {
                "msg": '账号密码错误'
            }
        elif '账号已锁定无法登录' in returnData:
            return {
                "msg": '密码错误，您密码输入错误已达规定次数，账号已锁定无法登录，次日自动解锁！如忘记密码，请与教务处联系!'
            }
        elif '验证码不正确' in returnData:
            returnData, headers = login(username, password)
        elif '安全退出' in returnData:
            break
        else:
            return {
                "msg": '异常，请重试'
            }
    return {
        "msg": 'welcome'
    }

# headers = {
#     "Referer": "https://jwc.mmpt.edu.cn/xs_main.aspx?xh=" + username,
#     "Content-Type": "text/html;charset=gb2312",
#     "Cookie": cookie,
#     "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
# }

# 登录接口
@app.route('/getDataZf', methods=["POST"])
def getAllData():
    data = json.loads(request.data)
    username = str(data['username'])
    password = data['password']
    a = time.time()
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
        res = session.get(
            'https://jwc.mmpt.edu.cn/CheckCode.aspx', headers=headers)
        code = CHECK_CODE.verify(res.content)
        data = {
            "__VIEWSTATE": "dDw3OTkxMjIwNTU7Oz5qFv56B08dbR82AMSOW+P8WDKexA==",
            "Button1": "",
            "TextBox1": username,
            "TextBox2": password,
            "TextBox3": code
        }

        res = session.post(
            'https://jwc.mmpt.edu.cn/default2.aspx', headers=headers, data=data)
        # print(res.text)
        return str(res.text), headers

    returnData, headers = login(username, password)
    while True:
        if '用户名或密码不正确' in returnData:
            return {
                "msg": '账号密码错误'
            }
        elif '账号已锁定无法登录' in returnData:
            return {
                "msg": '密码错误，您密码输入错误已达规定次数，账号已锁定无法登录，次日自动解锁！如忘记密码，请与教务处联系!'
            }
        elif '验证码不正确' in returnData:
            returnData, headers = login(username, password)
        elif '安全退出' in returnData:
            break
        else:
            return {
                "msg": '异常，请重试'
            }
    course_timetable_list = []
    name=''
    try:
        regname = re.compile(r'xm=(.*?)&')
        name = regname.findall(returnData)[0]
        b = time.time()
        headers["Referer"] = "https://jwc.mmpt.edu.cn/xs_main.aspx?xh=" + username

        # 获取课表页面数据
        res = session.get('https://jwc.mmpt.edu.cn/xskbcx.aspx?xh=' + username + "&xm=" + name + '&gnmkdm=N121603',
                          headers=headers)
        # 获取正常上课信息
        course_timetable = BeautifulSoup(res.text, "html.parser")
        course_timetable_table = course_timetable.find(id='Table1')
        # 删除调课字段
        for font in course_timetable_table.find_all("font"):
            font.decompose()
        course_timetable_info_tag = course_timetable_table.find_all(
            align='Center', rowspan='2')

        # 正常课表

        course_timetable_info_list = []
        for i in range(len(course_timetable_info_tag)):
            course_timetable_info_base = course_timetable_info_tag[i].get_text(
                strip=True, separator="/").split("/")
            course_timetable_info_base_len = len(course_timetable_info_base)
            if course_timetable_info_base_len > 4:
                n = 4
                course_timetable_info_uint = [course_timetable_info_base[i:i + n] for i in
                                              range(0, course_timetable_info_base_len, n)]
                for uint_list in course_timetable_info_uint:
                    course_timetable_info_list.append(uint_list)
            else:
                course_timetable_info_list.append(course_timetable_info_base)

        for course_timetable_info in course_timetable_info_list:
            if len(course_timetable_info)==4:
                # 提取第几周、周几、第几节课等参数
                # 数据切割
                split_rule = '[第]'
                course_timetable_info_split = re.split(
                    split_rule, course_timetable_info[1])
                if len(course_timetable_info_split)>2:
                    # print(course_timetable_info_split)
                    week_chinese = course_timetable_info_split[0]  # 获取星期
                    pitch_number = re.findall(
                        r"\d+\.?\d*", course_timetable_info_split[1])  # 获取节次

                    # 对节次进行补零处理
                    for inde in range(2):
                        pitch_number[inde] = pitch_number[inde].zfill(2)

                    pitch_number = pitch_number[0] + pitch_number[1]

                    cycle = re.findall(
                        r"\d+\.?\d*", course_timetable_info_split[2])  # 获取周次
                    cycle = list(map(int, cycle))
                    if '单' in course_timetable_info_split[2]:
                        cycle.append(1)
                    elif '双' in course_timetable_info_split[2]:
                        cycle.append(2)
                    else:
                        cycle.append(0)

                    # 数字映射
                    week_map = {
                        "周一": 1,
                        "周二": 2,
                        "周三": 3,
                        "周四": 4,
                        "周五": 5,
                        "周六": 6,
                        "周日": 7,
                    }
                    # 中文转换为数字
                    week = week_map[week_chinese]

                    if cycle[2] == 0:
                        for index in range(cycle[0], cycle[1] + 1):
                            course_timetable_list.append({
                                'jcdm': pitch_number,  # 第几节课
                                'jxcdmc': course_timetable_info[3],  # 教室
                                'kcmc': course_timetable_info[0],  # 课程名称
                                'teaxms': course_timetable_info[2],  # 任课教师
                                'xq': week,  # 星期几
                                'zc': index  # 第几周
                            })
                    elif cycle[2] == 1:
                        for index in range(cycle[0], cycle[1] + 1):
                            if index % 2 != 0:
                                course_timetable_list.append({
                                    'jcdm': pitch_number,  # 第几节课
                                    'jxcdmc': course_timetable_info[3],  # 教室
                                    'kcmc': course_timetable_info[0],  # 课程名称
                                    'teaxms': course_timetable_info[2],  # 任课教师
                                    'xq': week,  # 星期几
                                    'zc': index  # 第几周
                                })
                    elif cycle[2] == 2:
                        for index in range(cycle[0], cycle[1] + 1):
                            if index % 2 == 0:
                                course_timetable_list.append({
                                    'jcdm': pitch_number,  # 第几节课
                                    'jxcdmc': course_timetable_info[3],  # 教室
                                    'kcmc': course_timetable_info[0],  # 课程名称
                                    'teaxms': course_timetable_info[2],  # 任课教师
                                    'xq': week,  # 星期几
                                    'zc': index  # 第几周
                                })
    except:
        print('茂职课表有问题')

    # 获取成绩页面数据
    # 先获取VIEWSTATE
    achievement=[]
    try:
        res = session.get('https://jwc.mmpt.edu.cn/xscjcx.aspx?xh=' +
                          username + "&xm=" + name + '&gnmkdm=N121605',
                          headers=headers)
        get_achievement_html = res.text
        VIEWSTATE_reg = "<input type=\"hidden\" name=\"__VIEWSTATE\" value=\"(.*?)\" />"
        VIEWSTATE = re.findall(VIEWSTATE_reg, get_achievement_html)
        # 获取成绩
        res = session.post(
            'https://jwc.mmpt.edu.cn/xscjcx.aspx?xh=' +
            username + "&xm=" + name + '&gnmkdm=N121605',
            headers=headers,
            data={
                "btn_zcj": "历年成绩",
                "__VIEWSTATE": VIEWSTATE,
                "ddl_kcxz": ""
            }
        )
        post_achievement_html = res.text
        html = re.findall(r'<td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td>('
                          r'.*?)课</td><td>&nbsp;</td><td>(.*?)</td><td>(.*?)</td><td>('
                          r'.*?)</td><td>0</td><td>&nbsp;</td>', post_achievement_html)
        every = re.findall(
            r'<td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td>任意(.*?)课</td><td>(.*?)</td><td>(.*?)</td><td>('
            r'.*?)</td><td>(.*?)</td><td>(.*?)</td>',
            post_achievement_html)  # 提取任意选修课

        kszt = "正常考试"
        achievement = []
        for index in every:
            achievement.append(
                {
                    "xnxqmc": index[0] + "-" + index[1],  # 学年学期
                    "kcbh": index[2],  # 课程编号
                    "kcmc": index[3],  # 课程名称
                    "xdfsmc": index[4],  # 课程性质
                    "zcj": int(float(index[7]) * 10) + 50,  # 成绩
                    "xf": float(index[6]),  # 学分
                    "ksxzmc": kszt,
                    "cjjd": float(index[7]),  # 绩点
                }
            )
        for index in html:
            achievement.append(
                {

                    "xnxqmc": index[0] + "-" + index[1],  # 学年学期
                    "kcbh": index[2],  # 课程编号
                    "kcmc": index[3],  # 课程名称
                    "xdfsmc": index[4],  # 课程性质
                    "zcj": int(float(index[6]) * 10) + 50,  # 成绩
                    "xf": float(index[5]),  # 学分
                    "ksxzmc": kszt,
                    "cjjd": float(index[6]),  # 绩点
                }
            )
    except:
        print('茂职成绩有问题')

    return json.dumps({
        "curriculum": course_timetable_list,
        "achievement": achievement
    })


@app.route('/loginNL', methods=["POST"])
def login_NL():
    data = json.loads(request.data)
    username = data['username']
    password = data['password']

    def code():


        img_url = 'http://campus.gdnlxy.cn/campus-xmain/api/main-vcode'
        r = requests.get(img_url, stream=True)
        cookie = r.cookies.items()
        if r.status_code == 200:
            open('NL_code.png', 'wb').write(r.content)  # 将内容写入图片
        del r
        '''
        农林的百度api验证码
        :param:filepath:为图片路径
        :param:type_:类型本地或url load or url
        '''


        """ 读取图片 """
        image = open('NL_code.png', 'rb')
        """ 调用通用文字识别, 图片参数为本地图片 """
        ocr = ddddocr.DdddOcr()
        result = ocr.classification(image.read())
        image.close()
        return {
            'code': result,
            'cookie': cookie
        }

    def login(username, password):
        res = code()  # //参数
        user = {
            "code": username,  # 账号
            "pwd": password,  # 密码
            "imgCode": res['code']  # 验证码
        }
        str = json.dumps(user)  # 将user转化为string
        b64encode = base64.b64encode(str.encode('utf-8'))  # 将string经b64编码
        session = requests.Session()
        headers = {
            "Cookie": res['cookie'][0][0] + '=' + res['cookie'][0][1],
            "Param-Encoder": "BASE64",
            "Referer": "http://campus.gdnlxy.cn/campus-xmain/x-teach/chengji/student/score-list.html",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0"
        }  # 定义headers
        return session.post('http://campus.gdnlxy.cn/campus-xmain/apic/login', headers=headers,
                            data=b64encode).text  # 发送登录请求

    returnData = login(username, password)
    print(returnData)
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
            returnData = login(username, password)
        elif returnData == '{}':
            break
        else:
            return {
                "msg": '异常'
            }
    return {
        "msg": 'welcome'
    }


@app.route('/getDataNL', methods=["POST"])
def getAllDataNL():
    data = json.loads(request.data)
    username = data['username']
    password = data['password']

    def code():

        img_url = 'http://campus.gdnlxy.cn/campus-xmain/api/main-vcode'
        r = requests.get(img_url, stream=True)
        cookie = r.cookies.items()
        '''
        农林的百度api验证码
        :param:filepath:为图片路径
        :param:type_:类型本地或url load or url
        '''
        """ 读取图片 """
        if r.status_code == 200:
            open('NL_code.png', 'wb').write(r.content)  # 将内容写入图片
        del r

        image = open('NL_code.png', 'rb')
        ocr = ddddocr.DdddOcr()
        result = ocr.classification(image.read())
        image.close()

        """ 调用通用文字识别, 图片参数为本地图片 """

        return {
            'code': result,
            'cookie': cookie
        }

    def login(username, password):
        res = code()  # //参数
        user = {
            "code": username,  # 账号
            "pwd": password,  # 密码
            "imgCode": res['code']  # 验证码
        }
        str = json.dumps(user)  # 将user转化为string
        b64encode = base64.b64encode(str.encode('utf-8'))  # 将string经b64编码
        session = requests.Session()
        headers = {
            "Cookie": res['cookie'][0][0] + '=' + res['cookie'][0][1],
            "Param-Encoder": "BASE64",
            "Referer": "http://campus.gdnlxy.cn/campus-xmain/x-teach/chengji/student/score-list.html",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0"
        }  # 定义headers
        request = session.post('http://campus.gdnlxy.cn/campus-xmain/apic/login', headers=headers,
                               data=b64encode)  # 发送登录请求

        # 返回登录成功后的cookie
        return request.text, res['cookie'][0][0] + '=' + res['cookie'][0][1] + '; ' + request.cookies.items()[0][0] + '=' + \
            request.cookies.items()[0][1]

    returnData, cookie = login(username, password)

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
            returnData, cookie = login(username, password)
        elif returnData == '{}':
            break
        else:
            return {
                "msg": '异常'
            }

    def getAllDataNL(cookie):
        session = requests.Session()
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0",
            "Referer": "http://campus.gdnlxy.cn/campus-xmain/x-teach/chengji/student/score-list.html",
            "Cookie": cookie
        }
        currentYear = datetime.now().year
        # print(type(currentYear))
        achievement = []
        max = (currentYear - 2017) * 2
        time = {
            1: "2017-2018-1",
            2: "2018-2019-1",
            3: "2019-2020-2",
            4: "2020-2021-1",
            5: "2020-2021-2",
            6: "2019-2020-1",
            7: "2018-2019-2",
            8: "2017-2018-2",
            9: "2021-2022-1",
            10: "2021-2022-1"
        }
        for i in range(1, max):
            res = session.get(
                'http://campus.gdnlxy.cn/campus-xmain/apic/xteach-chengji-student/query-score?pn=1&ps=20&filter={'
                '"termId":' + str(i) + '}', headers=headers,
            )
            cj = (res.json())['rows']
            for index in cj:
                if (index['props'])['testWay'] == "考试" and "scoreFinal" in index:
                    jd = round(float((int(index['scoreFinal']) / 100) - 5), 1)
                    achievement.append(
                        {
                            "xnxqmc": time[i],  # 学年学期
                            "kcbh": index['courseId'],  # 课程编号
                            "kcmc": index['courseName'],  # 课程名称
                            "xdfsmc": "必修",  # 课程性质
                            "zcj": int(index['scoreFinal']) / 10,  # 成绩
                            "xf": index['xf'] / 10,  # 学分
                            "ksxzmc": "正常考试",
                            "cjjd": 0 if jd < 0 else jd,  # 绩点
                        }
                    )
        return json.dumps(achievement)

    achievement = getAllDataNL(cookie)
    return ({
        'achievement': achievement,
        'curriculum': []
    })
@app.route('/login_GKY',methods=['POST'])
def login_GKY():
    data = json.loads(request.data)
    username = data['username']
    password = data['password']

    nowTime = str(round(time.time() * 1000))
    def code():

        img_url = 'http://gkwst8.gjob.info:9903/kaptcha?time=' + nowTime
        r = requests.get(img_url, stream=True)
        cookie = r.cookies.items()

        if r.status_code == 200:
            open('GKY_code.png', 'wb').write(r.content)  # 将内容写入图片
        del r
        '''
        农林的百度api验证码
        :param:filepath:为图片路径
        :param:type_:类型本地或url load or url
        '''
        # global ocr_res
        # client = AipOcr(APP_ID, API_KEY, SECRET_KEY)

        """ 读取图片 """

        # def get_file_content(filePath):
        #     with open(filePath, 'rb') as fp:
        #         return fp.read()

        image = open('GKY_code.png', 'rb')
        """ 调用通用文字识别, 图片参数为本地图片 """
        # print(1)
        ocr = ddddocr.DdddOcr()
        result = ocr.classification(image.read())
        # ocr_res = client.basicAccurate(image.read())
        image.close()
        # result = ocr_res["words_result"][0]["words"]
        return {
            'code': result,
            'cookie': cookie
        }

    def login_GKY(username,password):
        nowTime = str(round(time.time() * 1000))
        session = requests.session()
        res = session.get('http://gkwst8.gjob.info:9903/kaptcha?time=' + nowTime, stream=True)
        open('code.png', 'wb').write(res.content)
        a = code()
        # print(a['code'])

        header = {
            "Cookie": 'JSESSIONID=' + a['cookie'][0][1],
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:96.0) Gecko/20100101 Firefox/96.0"
        }
        # print(nowTime)
        # print(res.cookies.values()[0])
        res = session.get('http://gkwst8.gjob.info:9903/xtgl/login_getPublicKey.html?time=' + nowTime, headers=header)
        res_json = json.loads(res.text)
        modulus = res_json['modulus']
        exponent = res_json['exponent']
        rsa = RSAJS.RSAKey()
        rsa.setPublic(HB64().b642hex(modulus), HB64().b642hex(exponent))
        mm = HB64().hex2b64(rsa.encrypt(password))
        # print(mm)
        url = f'http://gkwst8.gjob.info:9903//xtgl/login_slogin.html?time=' + nowTime
        res = session.get(url, headers=header)
        doc = pq(res.text)
        csrf = doc('#csrftoken').attr('value')
        # print(csrf)

        res = session.post('http://gkwst8.gjob.info:9903/xtgl/login_slogin.html?time=' + nowTime, headers=header, data={
            'yzm': a['code'],
            'yhm': username,
            'mm': mm,
            'csrftoken': csrf,
            'language': 'zh_CN'

        })
        return res
    returnData = login_GKY(username,password)

    while True:
        if "用户名或密码不正确" in returnData.text:
            return {
                "msg": "学号或密码有误"
            }

        elif "验证码输入错误" in returnData.text:
            returnData, cookie = login(username, password)
        elif not ("login_slogin.html" in returnData.url):
            break
        else:
            return {
                "msg": '异常'
            }
    return {
        "msg": 'welcome'
    }
@app.route('/getData_GKY',methods=['POST'])
def getData_GKY():
    data = json.loads(request.data)
    username = data['username']
    password = data['password']

    nowTime = str(round(time.time() * 1000))
    session = requests.session()
    def code():

        img_url = 'http://gkwst8.gjob.info:9903/kaptcha?time=' + nowTime
        r = requests.get(img_url, stream=True)
        cookie = r.cookies.items()

        if r.status_code == 200:
            open('GKY_code.png', 'wb').write(r.content)  # 将内容写入图片
        del r
        '''
        农林的百度api验证码
        :param:filepath:为图片路径
        :param:type_:类型本地或url load or url
        '''
        # global ocr_res
        # client = AipOcr(APP_ID, API_KEY, SECRET_KEY)

        """ 读取图片 """

        # def get_file_content(filePath):
        #     with open(filePath, 'rb') as fp:
        #         return fp.read()

        image = open('GKY_code.png', 'rb')
        """ 调用通用文字识别, 图片参数为本地图片 """
        # print(1)
        ocr = ddddocr.DdddOcr()
        result = ocr.classification(image.read())
        # ocr_res = client.basicAccurate(image.read())
        image.close()
        # result = ocr_res["words_result"][0]["words"]
        return {
            'code': result,
            'cookie': cookie
        }

    def login_GKY(username, password):
        nowTime = str(round(time.time() * 1000))

        res = session.get('http://gkwst8.gjob.info:9903/kaptcha?time=' + nowTime, stream=True)
        open('code.png', 'wb').write(res.content)
        a = code()
        # print(a['code'])

        header = {
            "Cookie": 'JSESSIONID=' + a['cookie'][0][1],
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:96.0) Gecko/20100101 Firefox/96.0"
        }
        # print(nowTime)
        # print(res.cookies.values()[0])
        res = session.get('http://gkwst8.gjob.info:9903/xtgl/login_getPublicKey.html?time=' + nowTime,
                          headers=header)
        res_json = json.loads(res.text)
        modulus = res_json['modulus']
        exponent = res_json['exponent']
        rsa = RSAJS.RSAKey()
        rsa.setPublic(HB64().b642hex(modulus), HB64().b642hex(exponent))
        mm = HB64().hex2b64(rsa.encrypt(password))
        # print(mm)
        url = f'http://gkwst8.gjob.info:9903//xtgl/login_slogin.html?time=' + nowTime
        res = session.get(url, headers=header)
        doc = pq(res.text)
        csrf = doc('#csrftoken').attr('value')
        # print(csrf)

        res = session.post('http://gkwst8.gjob.info:9903/xtgl/login_slogin.html?time=' + nowTime, headers=header,
                           data={
                               'yzm': a['code'],
                               'yhm': username,
                               'mm': mm,
                               'csrftoken': csrf,
                               'language': 'zh_CN'

                           })
        return res

    returnData = login_GKY(username, password)

    while True:
        if "用户名或密码不正确" in returnData.text:
            return {
                "msg": "学号或密码有误"
            }

        elif "验证码输入错误" in returnData.text:
            returnData, cookie = login(username, password)
        elif not ("login_slogin.html" in returnData.url):
            break
        else:
            return {
                "msg": '异常'
            }
    achievement = []  # 成绩
    curriculum = []  # 课表
    try:
        curriculum_data = {
            "xnm": "2021",  # 年份
            "xqm": "3",  # 学期末
            "kzlx": "ck"  # 参数
        }
        curriculum_html = session.post(
            'http://gkwst8.gjob.info:9903/kbcx/xskbcx_cxXsgrkb.html?gnmkdm=N253508&su=2018152414'

            , data=curriculum_data
        )
        curriculum_body = json.loads(curriculum_html.text)
        week_map = {
            "星期一": 1,
            "星期二": 2,
            "星期三": 3,
            "星期四": 4,
            "星期五": 5,
            "星期六": 6,
            "星期日": 7,
        }

        for index in curriculum_body['kbList']:
            s = index['zcd']
            a = s.split(',')
            for i in a:
                m = (i.split('周')[0]).split('-')
                if len(m) < 2:
                    test = {
                        'jcdm': '0' + index['jcs'][0] + '0' + index['jcs'][2],  # 第几节课
                        'jxcdmc': index['xqmc'] + index['cdmc'],
                        'teaxms': index['xm'],
                        'xq': week_map[index['xqjmc']],
                        'zc': int(m[0])
                    }
                    curriculum.append(test)
                else:
                    for h in range(int(m[0]), int(m[1]) + 1):
                        test = {
                            'jcdm': '0' + index['jcs'][0] + '0' + index['jcs'][2],  # 第几节课
                            'jxcdmc': index['xqmc'] + index['cdmc'],
                            'teaxms': index['xm'],
                            'xq': week_map[index['xqjmc']],
                            'zc': h
                        }
                        curriculum.append(test)
    except:
        print("课表有异常")

    # 成绩部分
    year = time.localtime().tm_year  # 获取当前时间

    try:
        for yeara in range(2018, year):
            achievement_data = {
                "xnm": str(yeara),  # 学年
                "xqm": ""  # 学期末

            }
            achievement_request = session.post(
                'http://gkwst8.gjob.info:9903/cjcx/cjcx_cxXsgrcj.html?doType=query&gnmkdm=N305005&su=2018152414'
                , data=achievement_data
            )
            achievement_json = json.loads(achievement_request.text)
            achievement_items = achievement_json['items']

            for index in achievement_items:
                for i in index['kcxzmc']:
                    if i == '选':
                        achievement_item = {
                            "xnxqmc": index['xnmmc'] + '-' + index['xqmmc'],
                            "kcbh": index['bh'],
                            "kcmc": index['kcmc'],
                            "xdfsmc": "选修",
                            "zcj": index['bfzcj'],
                            "xf": index['xf'],
                            "ksxzmc": index['khfsmc'],
                            "cjjd": index['jd'],
                        }
                        achievement.append(achievement_item)
                    elif i == '必':
                        achievement_item = {
                            "xnxqmc": index['xnmmc'] + '-' + index['xqmmc'],
                            "kcbh": index['bh'],
                            "kcmc": index['kcmc'],
                            "xdfsmc": "必修",
                            "zcj": index['bfzcj'],
                            "xf": index['xf'],
                            "ksxzmc": index['khfsmc'],
                            "cjjd": index['jd'],
                        }
                        achievement.append(achievement_item)
    except:
        print('成绩有异常')
    return json.dumps({
        "achievement":achievement,
        "curriculum":curriculum
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=82)
