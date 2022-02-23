import time

import requests
from flask import Flask, request
import json

app = Flask(__name__)
Data = []


@app.route('/add')
def add():
    data = json.loads(request.data)
    username = data['username']
    password = data['password']
    submit = data['submit']
    Data.append(
        {
            "username": username,
            "password": password,
            "submit": submit
        }
    )


def run():
    for user in Data:
        requests.post(url='https://www.biubbmk.cn/api_flask_zf/YiBan_post', data=user)
        time.sleep(30)


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
    while True:
        run()
        time.sleep(3600 * 24)
