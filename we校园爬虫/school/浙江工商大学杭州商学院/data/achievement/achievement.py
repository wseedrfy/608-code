import requests
from pyquery import PyQuery as pq
import re


def achievement(sessions: requests.session(), name, username):
    achievements = []
    i = 0
    cookies = sessions.cookies.values()
    cookie = f"ASP.NET_SessionId={cookies[0]};zjgs=20111114"
    url = f'http://jxgl.zjhzcc.edu.cn/xscjcx.aspx?xh={username}&xm={name}&gnmkdm=N121604'
    headers_change = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 '
                      'Safari/537.36',
        'Referer': url,
        'Cookie': cookie
    }

    # dataform

    html = sessions.get(url,
                        headers=headers_change)
    data = {
        '__VIEWSTATE': '',
        'ddlXN': '',
        'ddlXQ': '',
        'ddl_kcxz': '',
        'hidLanguage': '',
        '__VIEWSTATEGENERATOR': '',
        'btn_zcj': '历年成绩'
    }
    doc = pq(html.text)
    __VIEWSTATE = doc('#__VIEWSTATE').attr('value')
    __VIESTATEATE = doc('#__VIEWSTATEGENERATOR').attr('value')
    # print(__VIEWSTATE)
    # print(__VIEWSTATE)
    data['__VIEWSTATE'] = __VIEWSTATE
    # print(__VIEWSTATE)
    data['__VIEWSTATEGENERATOR'] = __VIESTATEATE
    cj = sessions.post(url,
                       data=data)
    html = cj.text
    # print(html)
    i += 1
    if "Internal Server Error" in html:
        return 'Internal Server Error'
    every(html, achievements)
    gkk(html, achievements)
    # print(achievements)
    # print(len(achievements))
    return achievements


def every(html, achievements):
    ever = re.findall(
        r'<td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td>任意(.*?)课</td><td>(.*?)</td><td>(.*?)</td><td>('
        r'.*?)</td><td>(.*?)</td><td>(.*?)</td>',
        html)  # 提取任意选修课
    for index in ever:
        achievements.append(
            {
                "xnxqmc": index[0] + "-" + index[1],  # 学年学期
                "kcbh": index[2],  # 课程编号
                "kcmc": index[3],  # 课程名称
                "xdfsmc": index[4],  # 课程性质
                "zcj": int(float(index[7]) * 10) + 50,  # 成绩
                "xf": float(index[6]),  # 学分
                "ksxzmc": "正常考试",
                "cjjd": float(index[7]),  # 绩点
            }
        )


def gkk(html, achievements):
    test = re.findall(r'<td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td>('
                      r'.*?)课</td><td>&nbsp;</td><td>(.*?)</td><td>(.*?)</td><td>('
                      r'.*?)</td><td>0</td><td>&nbsp;</td>', html)
    for index in test:
        achievements.append(
            {

                "xnxqmc": index[0] + "-" + index[1],  # 学年学期
                "kcbh": index[2],  # 课程编号
                "kcmc": index[3],  # 课程名称
                "xdfsmc": index[4],  # 课程性质
                "zcj": int(float(index[6]) * 10) + 50,  # 成绩
                "xf": float(index[5]),  # 学分
                "ksxzmc": "正常考试",
                "cjjd": float(index[6]),  # 绩点
            }
        )
