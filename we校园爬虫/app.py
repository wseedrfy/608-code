from flask import Flask,request
import json
from school.茂名职业技术学院.main import login_MZ,getData_MZ
from school.茂名农林科技职业技术学院.main import login_NL,getData_NL
from school.广东科技学院.main import login_GKY,getData_GKY
from school.浙江工商大学杭州商学院.main import login_ZJGSHZ,getData_ZJGSHZ

app = Flask(__name__)


@app.route('/login_<school_name>', methods=['POST'])
def login(school_name):
    try:
        data = json.loads(request.data)
        username = data['username']
        password = data['password']
        return eval("login_" + school_name)(username,password)
    except:
        return "没有此学校,或者方法错误"


@app.route('/getData_<school_name>', methods=['POST'])
def getData(school_name):
    try:
        data = json.loads(request.data)
        username = data['username']
        password = data['password']
        return eval("getData_" + school_name)(username,password)
    except:
        return "没有此学校,或者方法错误"


if __name__ == '__main__':
    app.run(port=82,debug=1)