import re


def get_course_week(week_text: str) -> list:
    interval = week_text.split(",")
    weeks = []

    for week in interval:
        leap = 1
        if "(单)" in week or "(双)" in week:
            week = week.replace("(双)", "")
            week = week.replace("(单)", "")
            leap = 2
        re_result = re.search("(\d+).?(\d*).*", week)
        real = re_result.groups()
        if real[-1] == '':
            weeks += [int(real[0])]
        else:
            # for start to end week
            weeks += [i for i in range(
                int(real[0]), int(real[1]) + 1, leap)]

    return weeks
