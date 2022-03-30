import re
import requests
from bs4 import BeautifulSoup
from school.广东理工学院.login.login import login


def curriculum(session):
    try:
        res = session.get('http://39.108.86.184:81/jsxsd/xskb/xskb_list.do').text

        a, _ = re.subn('\r', '', res)
        a, _ = re.subn('\n', '', a)
        a, _ = re.subn('\t', '', a)
        tr = re.findall('<tr.*?>.*?</tr>', a)
        # print(tr[1])

        weekday = {
            '1': 'BCC507EC7AB54FE7AE22AD76C91572B3',
            '2': 'CAB6640D553041C0A2FBED71AA3C2277',
            '3': 'E2071BA8A635496AA09A7FA4582114AF',
            '4': '2CE6A204762C49F7ADD1758508EEF177',
            '5': 'D6841451324848E5B9B825A03AD94414'
        }
        all = []
        arr_all = []
        for section in range(1, 6):
            for day in range(1, 8):
                soup = BeautifulSoup(tr[section], 'html.parser')
                id = f"{weekday[str(section)]}-{day}-2"
                div = soup.find(attrs={'id': id})
                div = str(div).replace(f'<div class="kbcontent" id="{id}" style="display: none;">', '')
                div = div.replace('<font title="老师">', '')
                div = div.replace('</font>', '')
                div = div.replace('<font title="周次(节次)">', '')
                div = div.replace('<font title="教室">', '')
                div = div.replace('</div>', '')
                div = div.replace('</br>', '')
                div = div.split('<br/>')
                arr = []
                for i in range(len(div)):
                    div[i] = div[i].split('<br>')
                    # print(div[i])
                    for j in div[i]:
                        if j != '---------------------' and j != '':
                            arr.append(j)
                # print(arr)
                if len(arr) > 6:
                    n = len(arr) // 2
                    B = arr[:n]
                    C = arr[n:]
                    isarr(B)
                    isarr(C)
                    get(B, day, all)
                    get(C, day, all)
                else:
                    if len(arr) > 2:
                        isarr(arr)
                        get(arr, day, all)

        return all
    except Exception as e:
        print(e)
        return []



def get(arr, day, all):
    week = arr[2].split('(周)')[0]
    # print(week)
    a = re.findall('(\d+)-(\d+)', week)
    b = week.split(',')
    c = re.findall('(\d+)-(\d+)', arr[2].split('(周)')[1])[0]
    if len(a)>0:
        m=a[0]
        for h in range(int(m[0]), int(m[1]) + 1):
            obj = {
                'jcdm': c[0] + c[1],  # 第几节课
                'jxcdmc': arr[3],  # 教室
                'kcmc': arr[0],  # 课程名称
                'teaxms': arr[1],  # 任课教师
                'xq': day,  # 星期几
                'zc': h  # 第几周
            }
            all.append(obj)
    elif len(b)> 0:
        for h in b:
            obj = {
                'jcdm': c[0] + c[1],  # 第几节课
                'jxcdmc': arr[3],  # 教室
                'kcmc': arr[0],  # 课程名称
                'teaxms': arr[1],  # 任课教师
                'xq': day,  # 星期几
                'zc': h  # 第几周
            }
            all.append(obj)

        # print(arr)
def isarr(arr):
    if '(' in arr[1]:
        arr[0]=arr[0]+arr[1]
        arr[1]=arr[2]
        arr[2]=arr[3]
        arr[3]=arr[4]
        arr.pop()
