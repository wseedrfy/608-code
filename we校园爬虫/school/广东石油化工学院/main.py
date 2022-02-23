from database.sql import updata, search


def upData_GY(data):
    personalInformation = data['personalInformation']
    username = data['username']
    password = data['password']
    # "hash_id": obj['hash_id'],
    # "school": obj['school'],
    # "name": obj['name'],
    # "curriculum": obj['curriculum'],
    # "achievement": obj['achievement'],
    # "other": obj['other']
    obj = {
        "username": username,
        "password": password,
        "school": "0",
        "name": username,
        "curriculum": str(personalInformation['curriculum']),
        "achievement": str(personalInformation['achievement']),
        "other": "{" + "\"quality\":" + str(personalInformation['quality']) + ',' + "\"classTask\":" + str(
            personalInformation['classTask']) + "}"
    }
    # print(obj)
    updata(obj)
    return {
        "msg": "成功",
        "code": "602"
    }


def getData_GY(username, password):
    arr = search("0", username, password, "getData")
    # print(arr)
    other = eval(arr['other'])
    personalInformation = {
        "curriculum": eval(arr['curriculum']),
        "achievement": eval(arr['achievement']),
        "quality": other['quality'],
        "classTask":other['classTask'],
        'code':arr['code']

    }
    # print(personalInformation)
    return personalInformation
