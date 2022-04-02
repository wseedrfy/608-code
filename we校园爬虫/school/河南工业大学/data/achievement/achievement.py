import requests
import time
from school.河南工业大学.login.login import login
import json


def achievement(username, session):
    nowTime = str(round(time.time() * 1000))
    url = f'https://jwglxt.haut.edu.cn/jwglxt/cjcx/cjcx_cxXsgrcj.html?doType=query&gnmkdm=N305005&su={username}'
    data = {
        "xnm": "",
        "xqm": "",
        "_search": "false",
        "nd": nowTime,
        "queryModel.showCount": "5000",
        "queryModel.currentPage": "1",
        "queryModel.sortName": "",
        "queryModel.sortOrder": "asc",
        "time": "5",
    }
    arr = []
    items = json.loads(session.post(url, data=data).text)['items']
    for item in items:
        if 'kcxzmc' in item and "必修" in item['kcxzmc']:
            kcxzmc = "必修"
        else:
            kcxzmc = "公选课"

        obj = {
            "xnxqmc": item['xnmmc'] + "-" + item['xqmmc'],  # 学年学期
            "kcbh": item['bh'],  # 课程编号
            "kcmc": item['kcmc'],  # 课程名称
            "xdfsmc": kcxzmc,  # 课程性质
            "zcj": item['bfzcj'],  # 成绩
            "xf": item['xf'],  # 学分
            "ksxzmc": item['ksxz'],  # 考试情况(正常考试，补考)
            "cjjd": item['jd'],  # 绩点
        }
        arr.append(obj)
    return arr




