import json
import re
def curriculum(username,session):
    data = {
        "xnm": "2021",
        "xqm": "12",
        "kzlx": "ck"
    }
    res = session.post(f'http://43.155.99.203:30001/kbcx/xskbcx_cxXsgrkb.html?gnmkdm=N2151&su={username}', data=data)
    week = {
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

        # print(test)
        zcd = test['zcd'].split("周")
        jc = re.findall('(\d+)-(\d+)', test['jcs'])[0]
        if int(jc[0]) < 10:
            a = '0' + jc[0]
        else:
            a = jc[0]
        if int(jc[1]) < 10:
            b = '0' + jc[0]
        else:
            b = jc[0]

        for i in zcd:
            d = re.findall("(\d+)", i)
            if len(d) > 1:
                for i in range(int(d[0]), int(d[1]) + 1):
                    obj = {
                        'jcdm': a + b,  # 第几节课
                        'jxcdmc': test['cdmc'],  # 教室
                        'kcmc': test['kcmc'],  # 课程名称
                        'teaxms': test['xm'],  # 任课教师
                        'xq': week[test['xqjmc']],  # 星期几
                        'zc': i  # 第几周
                    }
                    arr.append(obj)
            elif len(d) == 1:
                obj = {
                    'jcdm': a + b,  # 第几节课
                    'jxcdmc': test['cdmc'],  # 教室
                    'kcmc': test['kcmc'],  # 课程名称
                    'teaxms': test['xm'],  # 任课教师
                    'xq': week[test['xqjmc']],  # 星期几
                    'zc': d[0]  # 第几周
                }
                arr.append(obj)
    return arr