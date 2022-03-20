import json
import requests
from school.嘉应学院.login.login import login
from school.嘉应学院.data.curriculum.curriculum import curriculum
from school.嘉应学院.data.achievement.achievement import achievement


def data(username, session):
    return json.dumps({
        "curriculum": curriculum(username, session),
        "achievement": achievement(username, session)
    })
