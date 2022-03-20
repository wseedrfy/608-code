import requests
from school.广东理工学院.login.login import login
from school.广东理工学院.data.data import data


def login_GDLG(username, password):
    session = requests.session()
    try:
        return login(username, password, session)
    except Exception as e:
        print(e)


def getData_GDLG(username, password):
    session = requests.session()
    msg = login(username, password, session)
    if msg != {"msg": "welcome"}:
        return msg
    return data(session)


print(getData_GDLG('2112402040530', 'Wbf680218/'))
