from school.茂名农林科技职业技术学院.data.achievement.achievement import achievement


def data(session):
    return {
        "achievement": achievement(session),
        "curriculum": []
    }
