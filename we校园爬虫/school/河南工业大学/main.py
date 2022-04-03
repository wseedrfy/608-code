import requests
from school.河南工业大学.login.login import login
from school.河南工业大学.data.data import data



def login_HNGY(username, password):
    session = requests.session()

    return login(username, password, session)

def getData_HNGY(username,password,other):
    session = requests.session()
    msg = login(username, password, session)
    if msg['msg']!='welcome':
        return msg
    return data(username,session)

