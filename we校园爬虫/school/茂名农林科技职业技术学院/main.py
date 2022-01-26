# from school.茂名农林科技职业技术学院.code.code import code_ocr
from school.茂名农林科技职业技术学院.login.login import login
from school.茂名农林科技职业技术学院.data.data import data
import requests


def login_NL(username, password):
    session = requests.session()

    return login(session, username, password)


def getData_NL(username, password):
    session = requests.session()
    msg = login(session, username, password)
    if msg != {"msg": 'welcome'}:
        return msg
    return data(session)

