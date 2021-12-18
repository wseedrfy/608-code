from flask import Flask, request
import requests
from requests.sessions import session
from school_api.check_code import CHECK_CODE
import json
import time
import re
from bs4 import BeautifulSoup

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

# 登录接口
@app.route('/getDataZf', methods=["POST"])
def getAllData():
    data = json.loads(request.data)
    username = data['username']
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
    course_timetable_info_tag = course_timetable_table.find_all(align='Center', rowspan='2')

    # 正常课表
    course_timetable_list = []
    for i in range(len(course_timetable_info_tag)):
        course_timetable_info = course_timetable_info_tag[i].get_text(strip=True, separator="|").split("|")

        # 提取第几周、周几、第几节课等参数
        # 数据切割
        split_rule = '[第]'
        course_timetable_info_split = re.split(split_rule, course_timetable_info[1])

        week_chinese = course_timetable_info_split[0]  # 获取星期
        pitch_number = re.findall(r"\d+\.?\d*", course_timetable_info_split[1])  # 获取节次

        # 对节次进行补零处理
        for inde in range(2):
            pitch_number[inde] = pitch_number[inde].zfill(2)

        pitch_number = pitch_number[0] + pitch_number[1]

        cycle = re.findall(r"\d+\.?\d*", course_timetable_info_split[2])  # 获取周次
        cycle = list(map(int, cycle))

        # 数字映射
        week_map = {
            "周一": 1,
            "周二": 2,
            "周三": 3,
            "周四": 4,
            "周五": 5,
            "周六": 6,
            "周日": 7,
            "周天": 7,
            "周七": 7
        }
        # 中文转换为数字
        week = week_map[week_chinese]

        for index in range(cycle[0], cycle[1] + 1):
            course_timetable_list.append({
                'jcdm': pitch_number,  # 第几节课
                'jxcdmc': course_timetable_info[3],  # 教室
                'kcmc': course_timetable_info[0],  # 课程名称
                'teaxms': course_timetable_info[2],  # 任课教师
                'xq': week,  # 星期几
                'zc': index  # 第几周
            })

    # 获取调、停、补课信息
    switching_table = course_timetable.find(id='DBGrid')

    # 调、停、补课信息
    switching_list = []

    for ind, tr in enumerate(switching_table.find_all('tr')):
        if ind != 0:
            tds = tr.find_all('td')
            switching_list.append({
                '编号': tds[0].text,
                '课程名称': tds[1].text,
                '原上课地点': tds[2].text,
                '现上课地点': tds[3].text,
                '申请时间': tds[4].text,
            })

    print(switching_list)
    # 获取成绩页面数据
    # 先获取VIEWSTATE
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
            "__VIEWSTATE": VIEWSTATE
        }
    )
    post_achievement_html = res.text
    html = re.findall(r'<td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td>('
                      r'.*?)课</td><td>&nbsp;</td><td>(.*?)</td><td>(.*?)</td><td>('
                      r'.*?)</td><td>0</td><td>&nbsp;</td>', post_achievement_html)
    achievement = []
    for index in html:
        kszt = "正常考试"
        if index[4] != '必修':
            kszt = "不正常考试"

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

    return json.dumps({
        "curriculum": course_timetable_list,
        "achievement": achievement
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=1)
