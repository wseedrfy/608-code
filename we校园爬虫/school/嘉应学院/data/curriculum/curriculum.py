import json
import re
from another.get_course_week import get_course_week
import requests


def curriculum(username, session):
    data = {
        "xnm": "2021",
        "xqm": "12",
        "kzlx": "ck"
    }
    res = session.post(f'http://43.155.99.203:30001/kbcx/xskbcx_cxXsgrkb.html?gnmkdm=N2151&su={username}', data=data)
    weekday = {
        "星期一": 1,
        "星期二": 2,
        "星期三": 3,
        "星期四": 4,
        "星期五": 5,
        "星期六": 6,
        "星期七": 7,
        "星期日": 7,
        "星期天": 7,
    }
    arr = []
    for test in json.loads(res.text)['kbList']:
        jc = re.findall('(\d+)-(\d+)',test['jcs'])[0]
        week = get_course_week(test['zcd'])
        if int(jc[0]) < 10:
            a = '0' + jc[0]
        else:
            a = jc[0]
        if int(jc[1]) < 10:
            b = '0' + jc[1]
        else:
            b = jc[1]
        for h in week:
            obj = {
                'jcdm': a + b,  # 第几节课
                'jxcdmc': test['cdmc'],  # 教室
                'kcmc': test['kcmc'],  # 课程名称
                'teaxms': test['xm'],  # 任课教师
                'xq': weekday[test['xqjmc']],  # 星期几
                'zc': h  # 第几周
            }
            arr.append(obj)
    return arr
