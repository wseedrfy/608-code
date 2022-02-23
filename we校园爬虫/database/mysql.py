from hashlib import md5
from sqlalchemy import create_engine, Column, String, Text, Integer
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# 数据库配置
HOST = 'localhost'
PORT = '3306'
DATABASE = 'WeSchool'
USERNAME = 'root'
PASSWORD = 'WeSchool'

# 本地数据库
DB_URI = "mysql+pymysql://{username}:{password}@{host}:{port}/{db}?charset=utf8".format(username=USERNAME,
                                                                                        password=PASSWORD, host=HOST,
                                                                                        port=PORT, db=DATABASE)
engine = create_engine(DB_URI, echo=False)
DBsession = sessionmaker(bind=engine)

Base = declarative_base()


class Person(Base):
    __tablename__ = 'user'
    # __abstract__ = True
    hash_id = Column(String(35))
    hash_username = Column(String(35), primary_key=True)
    school = Column(Integer)
    name = Column(String(20))
    curriculum = Column(Text)
    achievement = Column(Text)
    other = Column(Text)

    def __init__(self, obj: dict):
        self.hash_id = obj['hash_id']
        self.hash_username = obj['hash_username']
        self.school = obj['school']
        self.name = obj['name']
        self.curriculum = obj['curriculum']
        self.achievement = obj['achievement']
        self.other = obj['other']


def insert(obj: dict):
    session = DBsession()
    a = Person(obj)
    session.add(a)
    session.commit()
    session.close()


def updata(obj: dict):
    hash_username = obj['hash_username']
    session = DBsession()
    person = session.query(Person).filter_by(hash_username=hash_username).update({
        "hash_id": obj['hash_id'],
        "school": obj['school'],
        "name": obj['name'],
        "curriculum": obj['curriculum'],
        "achievement": obj['achievement'],
        "other": obj['other']

    })
    session.commit()
    session.close()



def search(obj: dict):
    session = DBsession()
    hash_id = obj['hash_id']
    hash_username = obj['hash_username']
    person = session.query(Person).filter_by(hash_username=hash_username).first()
    try:
        if person is None:
            session.close()
            return {
                "msg": "数据库中没有此人信息",
                "code": 603
            }
        if person.hash_id == hash_id:
            session.close()
            # print(person.achievement)
            return {
                "hash_id": person.hash_id,
                "hash_username": person.hash_username,
                "school": person.school,
                "name": person.name,
                "curriculum": person.curriculum,
                "achievement": person.achievement,
                "other": person.other,
                'msg': 'welcome',
                'code': 601
            }
        else:
            session.close()
            return {
                "msg": "账号或者密码错误",
                "code": 604,
                "name": "兜底"
            }
    except:
        # print("有错误")
        session.close()


if __name__ == '__main__':
    # print(md5("210345301150".encode('utf8')).hexdigest())
    # hash_id = obj['hash_id']
    # hash_username = obj['hash_username']
    # school = obj['school']
    # name = obj['name']
    # curriculum = obj['curriculum']
    # achievement = obj['achievement']
    # other = obj['other']
    obj = {
        "hash_id": md5("21034530115Zhangyue12210".encode('utf8')).hexdigest(),
        "hash_username": md5("210345301150".encode('utf8')).hexdigest(),
        "school": "0",
        "name": "张粤",
        "curriculum": str([{"m": "n"}]),
        "achievement": str([{"f": "e"}]),
        "other": "quality:" + str([{"a": "b"}]) + "classTask:" + str([{"c": "d"}])
    }
    search(obj)
