import json
import requests
from school.河南工业大学.login.login import login
from school.河南工业大学.data.curriculum.curriculum import curriculum
from school.河南工业大学.data.achievement.achievement import achievement


def data(username, session):
    return json.dumps({
        "curriculum": curriculum(username, session),
        "achievement": achievement(username, session)
    })
