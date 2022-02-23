from school.茂名职业技术学院.code.code import code_ocr
from school.茂名职业技术学院.login.login import login
from school.茂名职业技术学院.data.data import data
import requests


def login_MZ(username, password):
    session = requests.session()
    _,_,msg = login(session, username, password)
    return msg


def getData_MZ(username, password):
    session = requests.session()
    name,headers,msg = login(session, username, password)
    if msg['msg'] != 'welcome':
        return msg
    return data(session,password, username, name, headers,msg)