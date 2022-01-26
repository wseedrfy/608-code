import requests

from school.浙江工商大学杭州商学院.login.login import login
from school.浙江工商大学杭州商学院.data.data import data
import time


def login_ZJGSHZ(username, password):
    session = requests.session()
    _, res = login(session, username, password)
    return res


def getData_ZJGSHZ(username, password):
    # t=time.time()
    while True:
        session = requests.session()
        name, res = login(session, username, password)
        if res != {'msg': 'welcome'}:
            return res
        get_data = data(username, name, session)
        # print(isinstance(get_data['achievement'], str))
        # print(get_data)
        if not(isinstance(get_data['achievement'], str)):
            break
    # print(time.time()-t)
    return get_data


