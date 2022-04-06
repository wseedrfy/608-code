import requests
from school.南通大学杏林学院.login.login import login
from school.南通大学杏林学院.data.data import data



def login_NTXL(username, password):
    session = requests.session()

    return login(username, password, session)

def getData_NTXL(username,password):
    session = requests.session()
    msg = login(username, password, session)
    if msg['msg']!='welcome':
        return msg
    return data(username,session)

