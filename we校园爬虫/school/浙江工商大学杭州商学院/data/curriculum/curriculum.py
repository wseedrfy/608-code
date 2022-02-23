import requests
import re
from bs4 import BeautifulSoup


def curriculum(session: requests.session(), name: str, username):
    res = session.get(url='http://jxgl.zjhzcc.edu.cn/content_xs.aspx')
    # print(res.text)
    curriculums=[]
    bs = BeautifulSoup(res.text, "html.parser")
    for i in range(1, 8):
        for j in range(1, 6):
            r = '<span class="time">'
            a= str(bs.find(id=('td' + str(i) + str(j))))
            if len(re.findall(r,a)) >0:
                jxq(i, a.split('kblsbk"> ')[1],curriculums)
            # if(re.findall())
            # jxq(i,a,curriculums)
            # print(re.match(r, )
            # print()
    return curriculums


def jxq(m,html,curriculums):
    h = html.split('</span>')
    # print(h[0])
    nums = re.findall('\d+', h[0])
    r1 = '<span class="kejie">(.*?)</span> <span class="didian">(.*?)</span>'
    chinese = re.findall(r1, html)[0]
    for i in range(int(nums[2]),int(nums[3])+1):
        obj = {
            'jcdm': '0'+nums[0]+'0'+nums[1],
            'jxcdmc': chinese[1],
            'kcmc': chinese[0],
            'teaxms': "未知",
            'xq': m,
            'zc': i
        }
        curriculums.append(obj)


