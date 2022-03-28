# import json
from database import mysql
from hashlib import md5
import redis


def hmset(r: redis.Redis, key: str, obj: dict):
    for index in obj:
        r.hset(key, index, obj[index])


def connect_redis(host, port, db):
    if host is None:
        host = "127.0.0.1"
    if port is None:
        port = int(6379)
    if db is None:
        db = int(0)
    r = redis.Redis(host=host, port=port, db=db)
    # print(r.ping())
    return r


def insert(obj: dict):
    r = connect_redis(host="127.0.0.1", port="6379", db=0)
    hmset(r, obj['hash_id'], obj)
    r.expire(obj['hash_id'], 3600 * 7 * 24)
    r.close()


def get_data(obj: dict):
    try:
        r = connect_redis(host="127.0.0.1", port="6379", db=0)
        get = r.hgetall(obj['hash_id'])
    except Exception as e:
        return {
            "msg":"Redis有问题",
            "code":"607",
            "error":str(e)
        }
    # print(len(get))
    # print(obj['methods'])
    if obj['methods'] == 'login':
        if len(get) == 0:
            returnData = mysql.search(obj)
            # print(returnData)
            if returnData['code'] != 601:
                return returnData
            else:
                try:
                    insert(returnData)
                    return returnData
                except Exception as e:
                    return {
                        "msg": "Redis有问题",
                        "code": "605",
                        "error": str(e)
                    }
        else:
            # print("123456")
            object = {}
            for i in get:
                object[i.decode()] = get[i].decode()
            return object
    else:
        if len(get) == 0 or (get[b'curriculum'] == b'' or get[b'achievement'] == b''):
            returnData = mysql.search(obj)
            if returnData['code'] != 601:
                return returnData
            else:
                try:
                    insert(returnData)
                    return returnData
                except Exception as e:
                    return {
                        "msg": "Redis有问题",
                        "code": "605",
                        "error": str(e)
                    }
        else:
            # print("123456")
            object = {}
            for i in get:
                object[i.decode()] = get[i].decode()
            return object


# if __name__ == '__main__':
#     obj = {
#         "hash_id": md5("21034530115Zhangyue12210".encode('utf8')).hexdigest(),
#         "hash_username": md5("210345301150".encode('utf8')).hexdigest(),
#         "school": "0",
#         "name": "张粤",
#         "curriculum":str([{"m":"n"}]),
#         "achievement":str([{"f":"e"}]),
#         "other":"quality:"+str([{"a":"b"}])+"classTask:"+str([{"c":"d"}])
#     }

