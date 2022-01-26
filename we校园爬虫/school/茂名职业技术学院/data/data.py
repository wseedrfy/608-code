import time
from multiprocessing import Process
from school.茂名职业技术学院.data.achievement.achievement import achievement
from school.茂名职业技术学院.data.curriculum.curriculum import curriculum


def data(session, username, name, headers):
    t= time.time()
    achievements=achievement(session, username, name, headers)
    curriculums=curriculum(session, username, name, headers)
    print(time.time()-t)
    return {
        "achievement": achievements,
        "curriculum": curriculums

    }