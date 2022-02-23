from hashlib import md5
from database.redis_command import get_data
import database.mysql


def search(school, username, password,methods):
    obj = {
        "hash_id": md5((username + password + school).encode('utf8')).hexdigest(),
        "hash_username": md5((username + school).encode('utf8')).hexdigest(),
        "methods": methods
    }
    return get_data(obj)


def updata(obj: dict):
    username = obj['username']
    school = obj['school']
    password = obj['password']
    obj['hash_id'] = md5((username + password + school).encode('utf8')).hexdigest()
    obj['hash_username'] = md5((username + school).encode('utf8')).hexdigest()
    returnData = database.mysql.search(obj)
    if 'code' in returnData and returnData['code'] == 603:
        return database.mysql.insert(obj)
    elif 'code' in returnData and returnData['code'] == 604:
        return returnData
    else:
        database.mysql.updata(obj)
