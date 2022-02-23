from school.浙江工商大学杭州商学院.data.achievement.achievement import achievement
from urllib.parse import quote
from school.浙江工商大学杭州商学院.data.curriculum.curriculum import curriculum


def data(username,name,session):

    return {
        'achievement':achievement(session, quote(name,'utf-8'),username),
        "curriculum": curriculum(session,quote(name,'utf-8'),username)
    }
