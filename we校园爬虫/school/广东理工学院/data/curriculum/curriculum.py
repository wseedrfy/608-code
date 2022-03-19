import re
from bs4 import BeautifulSoup
# from lib.proxy import proxy_dict


def curriculum(session,proxy):
    try:
        res = session.get('http://jwxt.gdlgxy.edu.cn/jsxsd/xskb/xskb_list.do',proxies=proxy).text

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
        for section in range(1, 6):
            for day in range(1, 7):
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
                    for j in div[i]:
                        if j != '---------------------' and j != '':
                            arr.append(j)
                if len(arr) > 2:
                    n = len(arr) // 4
                    for l in range(0, n):
                        week = arr[4 * l + 2].split('(周)')[0]
                        # print(week)
                        a = re.findall('(\d+)-(\d+)', week)
                        b = week.split(',')
                        if section < 5:
                            c = f'0{section * 1}0{section * 2}'
                        elif section == 5:
                            c = f'0910'
                        else:
                            c = f'{section * 1}{section * 2}'
                        if len(b) > 1:
                            for h in b:
                                obj = {
                                    'jcdm': c,  # 第几节课
                                    'jxcdmc': arr[4 * l + 3],  # 教室
                                    'kcmc': arr[4 * l],  # 课程名称
                                    'teaxms': arr[4 * l + 1],  # 任课教师
                                    'xq': day,  # 星期几
                                    'zc': h  # 第几周
                                }
                                all.append(obj)
                        if (len(a) > 0):
                            for h in range(int(a[0][0]), int(a[0][1]) + 1):
                                obj = {
                                    'jcdm': c,  # 第几节课
                                    'jxcdmc': arr[4 * l + 3],  # 教室
                                    'kcmc': arr[4 * l],  # 课程名称
                                    'teaxms': arr[4 * l + 1],  # 任课教师
                                    'xq': day,  # 星期几
                                    'zc': h  # 第几周
                                }
                                all.append(obj)
        return all
    except Exception as e:
        print(e)
        return []
