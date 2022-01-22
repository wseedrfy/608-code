from school.茂名职业技术学院.data.achievement.achievement import achievement
from school.茂名职业技术学院.data.curriculum.curriculum import curriculum


def data(session, username, name, headers):
    return {
        "achievement": achievement(session, username, name, headers),
        "curriculum": curriculum(session, username, name, headers)
    }
