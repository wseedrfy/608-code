from school.茂名职业技术学院.data.achievement.achievement import achievement
from school.茂名职业技术学院.data.curriculum.curriculum import curriculum
from database.sql import updata, search
# import logging


def data(session, password, username, name, headers, msg):
    # return {
    #     "achievement": achievement(session, username, name, headers),
    #     "curriculum": curriculum(session, username, name, headers)
    # }
    # if "code" in msg:
    #     try:
    #         data = search('1', username, password, "data")
    #         return {
    #             "achievement": eval(data['achievement']),
    #             "curriculum": eval(data['curriculum']),
    #             "code": msg['code']
    #         }
    #     except Exception as e:
    #         a = 1
    #         return {
    #             "achievement": [],
    #             "curriculum": [],
    #             "code": 605
    #         }
    try:
        achievements=achievement(session, username, name, headers)
        curriculums=curriculum(session, username, name, headers)
        # print(achievements.s())
        obj= {
            "username": username,
            "password": password,
            "school": "1",
            "name": name,
            "curriculum": str(curriculums),
            "achievement": str(achievements),
            "other": ""
        }
        # print(obj)
        try:
            updata(obj)
        except Exception as e:
            a=1
        return {
            "achievement": achievements,
            "curriculum": curriculums
        }

    except:
        try:
            data = search('1', username, password, "data")
            return {
                "achievement": eval(data['achievement']),
                "curriculum": eval(data['curriculum']),
                "code": msg['code']
            }
        except Exception as e:
            return {
                "achievement": [],
                "curriculum": [],
                "code": 605
            }
