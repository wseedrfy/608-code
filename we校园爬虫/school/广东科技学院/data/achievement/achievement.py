import time,json
def achievement(session):
    year = time.localtime().tm_year  # 获取当前时间
    achievements=[]
    try:
        for yeara in range(2018, year):
            achievement_data = {
                "xnm": str(yeara),  # 学年
                "xqm": ""  # 学期末

            }
            achievement_request = session.post(
                'http://gkwst8.gjob.info:9903/cjcx/cjcx_cxXsgrcj.html?doType=query&gnmkdm=N305005&su=2018152414'
                , data=achievement_data
            )
            # print(achievement_request.text)
            achievement_json = json.loads(achievement_request.text)
            achievement_items = achievement_json['items']

            for index in achievement_items:
                for i in index['kcxzmc']:
                    if i == '选':
                        achievement_item = {
                            "xnxqmc": index['xnmmc'] + '-' + index['xqmmc'],
                            "kcbh": index['bh'],
                            "kcmc": index['kcmc'],
                            "xdfsmc": "选修",
                            "zcj": index['bfzcj'],
                            "xf": index['xf'],
                            "ksxzmc": index['ksxz'],
                            "cjjd": index['jd'],
                        }
                        achievements.append(achievement_item)
                    elif i == '必':
                        achievement_item = {
                            "xnxqmc": index['xnmmc'] + '-' + index['xqmmc'],
                            "kcbh": index['bh'],
                            "kcmc": index['kcmc'],
                            "xdfsmc": "必修",
                            "zcj": index['bfzcj'],
                            "xf": index['xf'],
                            "ksxzmc": index['ksxz'],
                            "cjjd": index['jd'],
                        }
                        achievements.append(achievement_item)
        return achievements
    except:
        print('广科院成绩有异常')
        return achievements
