from school.茂名职业技术学院.code.code import code_ocr
from school.茂名职业技术学院.login.login import login
from school.茂名职业技术学院.data.data import data
import requests


def login_MZ(username, password):
    session = requests.session()
    code, cookie = code_ocr(session)
    _, msg = login(session, username, password, code)
    return msg


def getData_MZ(username, password):
    session = requests.session()
    code, cookies = code_ocr(session)
    cookie = ''
    for name, value in cookies:
        cookie += '{0}={1};'.format(name, value)
    headers = {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Cookie": cookie,
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
    }
    name, msg = login(session, username, password, code)
    if msg != {"msg": 'welcome'}:
        return msg
    return data(session, username, name, headers)
