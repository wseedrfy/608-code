import requests
from school.嘉应学院.login.login import login
from school.嘉应学院.data.data import data



def login_JY(username, password):
    session = requests.session()

    return login(username, password, session)

def getData_JY(username,password,other):
    session = requests.session()
    msg = login(username, password, session)
    if msg['msg']!='welcome':
        return msg
    return data(username,session)

