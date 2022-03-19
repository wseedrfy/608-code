from school.广东理工学院.data.curriculum.curriculum import curriculum
from school.广东理工学院.data.achievement.achievement import achievement
def data(session):
    return {
        "curriculum":curriculum(session),
        "achievement":achievement(session)
    }