import requests
from school.广东理工学院.login.login import login
from school.广东理工学院.data.data import data


def login_GDLG(username, password):
    session = requests.session()
    return login(username, password, session)


def getData_GDLG(username, password):
    session = requests.session()
    msg = login(username, password, session)
    if msg != {"msg": "welcome"}:
        return msg
    return data(session)


print(login_GDLG("2112408040416", "Sdlsjs2bsd+"))
