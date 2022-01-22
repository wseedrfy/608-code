from school.广东科技学院.data.achievement.achievement import achievement
from school.广东科技学院.data.curriculum.curriculum import curriculum


def data(session):
    return {
        "achievement": achievement(session),
        "curriculum": curriculum(session)
    }
