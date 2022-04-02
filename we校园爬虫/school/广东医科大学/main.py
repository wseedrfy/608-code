import requests
from school.广东医科大学.login.login import login
from school.广东医科大学.data.data import data



def login_GYK(username, password):
    session = requests.session()

    return login(username, password, session)

def getData_GYK(username,password,other):
    session = requests.session()
    msg = login(username, password, session)
    if msg['msg']!='welcome':
        return msg
    return data(username,session)

