import re
# from lib.proxy import proxy_dict

def achievement(session,proxy):
    try:
        data = {
            "kksj": "",
            "kcxz": "",
            "kcmc": "",
            "xsfs": "all"
        }
        arr = []
        cj = session.post('http://jwxt.gdlgxy.edu.cn/jsxsd/kscj/cjcx_list', data=data,proxies = proxy).text
        a, _ = re.subn('\r', '', cj)
        a, _ = re.subn('\n', '', a)
        a, _ = re.subn('\t', '', a)
        tr = re.findall('<tr.*?>.*?</tr>', a)
        for i in range(1, len(tr)):
            m = tr[i]
            m = m.replace('align="left"', "")
            m = m.replace(' ', "")
            m = m.replace('<tr>', "")
            m = m.replace('</tr>', "")
            m = m.replace('</tr>', "")
            m = m.replace('</td>', "")
            m = m.replace('style="color:red;"', "")
            m = m.replace('<!--控制绩点显示-->', "")
            m = m.replace('<!--控制成绩显示-->', "")
            m = m.replace('<tdstyle="">', "")
            m = m.split('<td>')
            aobj = []
            for i in m:
                if i != '':
                    aobj.append(i)
            aobj[4] = re.findall('\d+', aobj[4])[0]
            obj = {
                "xnxqmc": aobj[1],  # 学年学期
                "kcbh": aobj[2],  # 课程编号
                "kcmc": aobj[3],  # 课程名称
                "xdfsmc": aobj[10],  # 课程性质
                "zcj": aobj[4],  # 成绩
                "xf": aobj[5],  # 学分
                "ksxzmc": aobj[9],  # 考试情况(正常考试，补考)
                "cjjd": aobj[7]  # 绩点
            }
            arr.append(obj)
        return arr
    except Exception as e:
        print(e)
        return []
