from school.浙江工商大学杭州商学院.data.achievement.achievement import achievement
from urllib.parse import quote


def data(username,name,session):

    return {
        'achievement':achievement(session, quote(name,'utf-8'),username),
        "curriculum": []
    }
