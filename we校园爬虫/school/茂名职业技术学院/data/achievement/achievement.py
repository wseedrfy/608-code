import re
from urllib.parse import quote


def achievement(session, username, name, headers):
    # 先获取VIEWSTATE

    achievements = []
    try:
        headers['Referer'] = 'https://jwc.mmpt.edu.cn/xscjcx.aspx?xh=' + str(username) + "&xm=" + quote(
            name) + '&gnmkdm=N121605'
        res = session.get('https://jwc.mmpt.edu.cn/xscjcx.aspx?xh=' +
                          str(username) + "&xm=" + name + '&gnmkdm=N121605',
                          headers=headers)

        get_achievement_html = res.text
        VIEWSTATE_reg = "<input type=\"hidden\" name=\"__VIEWSTATE\" value=\"(.*?)\" />"
        VIEWSTATE = re.findall(VIEWSTATE_reg, get_achievement_html)
        # 获取成绩
        res = session.post(
            'https://jwc.mmpt.edu.cn/xscjcx.aspx?xh=' +
            str(username) + "&xm=" + name + '&gnmkdm=N121605',
            data={
                "btn_zcj": "历年成绩",
                "__VIEWSTATE": VIEWSTATE,
                "ddl_kcxz": ""
            },
            headers=headers
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
        for index in every:
            achievements.append(
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
        # print(html)
        for index in html:
            achievements.append(
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

        return achievements
    except:

        print('茂职成绩有问题')
        return achievements
