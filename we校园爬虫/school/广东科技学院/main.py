import requests
from school.广东科技学院.login.login import login
from school.广东科技学院.data.data import data


def login_GKY(username, password):
    session = requests.session()
    return login(session, username, password)


def getData_GKY(username, password,other):
    session = requests.session()
    msg = login(session, username, password)
    if msg != {"msg": 'welcome'}:
        return msg
    return data(session)
