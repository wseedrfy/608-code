import re
# from school.茂名职业技术学院.data import data
from bs4 import BeautifulSoup


def curriculum(session, username, name, headers):
    course_timetable_list = []
    try:
        headers["Referer"] = "https://jwc.mmpt.edu.cn/xs_main.aspx?xh=" + str(username)

        # 获取课表页面数据
        res = session.get('https://jwc.mmpt.edu.cn/xskbcx.aspx?xh=' + str(username) + "&xm=" + name + '&gnmkdm=N121603',
                          headers=headers)
        # 获取正常上课信息
        course_timetable = BeautifulSoup(res.text, "html.parser")
        course_timetable_table = course_timetable.find(id='Table1')
        # 删除调课字段
        for font in course_timetable_table.find_all("font"):
            font.decompose()
        course_timetable_info_tag = course_timetable_table.find_all(
            align='Center', rowspan='2')

        # 正常课表

        course_timetable_info_list = []
        for i in range(len(course_timetable_info_tag)):
            course_timetable_info_base = course_timetable_info_tag[i].get_text(
                strip=True, separator="/").split("/")
            course_timetable_info_base_len = len(course_timetable_info_base)
            if course_timetable_info_base_len > 4:
                n = 4
                course_timetable_info_uint = [course_timetable_info_base[i:i + n] for i in
                                              range(0, course_timetable_info_base_len, n)]
                for uint_list in course_timetable_info_uint:
                    course_timetable_info_list.append(uint_list)
            else:
                course_timetable_info_list.append(course_timetable_info_base)

        for course_timetable_info in course_timetable_info_list:
            if len(course_timetable_info) == 4:
                # 提取第几周、周几、第几节课等参数
                # 数据切割
                split_rule = '[第]'
                course_timetable_info_split = re.split(
                    split_rule, course_timetable_info[1])
                if len(course_timetable_info_split) > 2:
                    # print(course_timetable_info_split)
                    week_chinese = course_timetable_info_split[0]  # 获取星期
                    pitch_number = re.findall(
                        r"\d+\.?\d*", course_timetable_info_split[1])  # 获取节次

                    # 对节次进行补零处理
                    for inde in range(2):
                        pitch_number[inde] = pitch_number[inde].zfill(2)

                    pitch_number = pitch_number[0] + pitch_number[1]

                    cycle = re.findall(
                        r"\d+\.?\d*", course_timetable_info_split[2])  # 获取周次
                    cycle = list(map(int, cycle))
                    if '单' in course_timetable_info_split[2]:
                        cycle.append(1)
                    elif '双' in course_timetable_info_split[2]:
                        cycle.append(2)
                    else:
                        cycle.append(0)

                    # 数字映射
                    week_map = {
                        "周一": 1,
                        "周二": 2,
                        "周三": 3,
                        "周四": 4,
                        "周五": 5,
                        "周六": 6,
                        "周日": 7,
                    }
                    # 中文转换为数字
                    week = week_map[week_chinese]

                    if cycle[2] == 0:
                        for index in range(cycle[0], cycle[1] + 1):
                            course_timetable_list.append({
                                'jcdm': pitch_number,  # 第几节课
                                'jxcdmc': course_timetable_info[3],  # 教室
                                'kcmc': course_timetable_info[0],  # 课程名称
                                'teaxms': course_timetable_info[2],  # 任课教师
                                'xq': week,  # 星期几
                                'zc': index  # 第几周
                            })
                    elif cycle[2] == 1:
                        for index in range(cycle[0], cycle[1] + 1):
                            if index % 2 != 0:
                                course_timetable_list.append({
                                    'jcdm': pitch_number,  # 第几节课
                                    'jxcdmc': course_timetable_info[3],  # 教室
                                    'kcmc': course_timetable_info[0],  # 课程名称
                                    'teaxms': course_timetable_info[2],  # 任课教师
                                    'xq': week,  # 星期几
                                    'zc': index  # 第几周
                                })
                    elif cycle[2] == 2:
                        for index in range(cycle[0], cycle[1] + 1):
                            if index % 2 == 0:
                                course_timetable_list.append({
                                    'jcdm': pitch_number,  # 第几节课
                                    'jxcdmc': course_timetable_info[3],  # 教室
                                    'kcmc': course_timetable_info[0],  # 课程名称
                                    'teaxms': course_timetable_info[2],  # 任课教师
                                    'xq': week,  # 星期几
                                    'zc': index  # 第几周
                                })
        return course_timetable_list
    except:
        # print('茂职课表有问题')
        return course_timetable_list
