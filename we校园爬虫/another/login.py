import base64
import requests
from Crypto.Cipher import PKCS1_v1_5
from Crypto.PublicKey import RSA
import time





if __name__ == '__main__':
    a = {
        "account": "15815194056",  # 登陆用的手机号
        "password": "teng200272112",  # 登陆密码
        "remark": "111",
        # "mail": ""
    }
    yiban = YiBan_Login(a)
    yiban.login()
