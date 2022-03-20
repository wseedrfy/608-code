import json
import requests
from school.嘉应学院.login.login import login
from school.广东医科大学.data.curriculum.curriculum import curriculum
from school.广东医科大学.data.achievement.achievement import achievement


def data(username, session):
    return json.dumps({
        "curriculum": curriculum(username, session),
        "achievement": achievement(username, session)
    })
