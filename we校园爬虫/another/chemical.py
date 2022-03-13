import numpy as np
import json
import math

# 一共三个接口
'''
名词解释
    deta:绝对误差
    E:相对误差
    mean:平均值
    d:绝对偏差
    dr:相对偏差
    d_hat:算术平均偏差
    s:总体标准偏差
    sr:相对标准偏差
    r:重复性
    u_:不确定性
    G:G检验值
    Q:Q检验值
    F:F检验值
    t:t检验值
    model:最小二乘法
    '''
'''
接口1
{
    x: list
}
return {

    mean:平均值
    d:绝对偏差
    dr:相对偏差
    d_hat:算术平均偏差
    s:总体标准偏差
    sr:相对标准偏差
    r:重复性
   }
接口2{
    u_:不确定性
    G:G检验值
    Q:Q检验值
}
接口3
{
    x1:list 第一个人测的数据
    x2:list 第二个人测的数据，列表形式
}
return{
    F_real:F真实值
    F:F理论值

}


'''

'''
定量分析中的误差
'''
''':接口一'''


# def deta(x, x0):
#     '''
#
#     :param x: 真实值
#     :param x0: 列表形式，数据的测量值
#     :return: 绝对误差
#     '''
#     x0 = np.array(x0)
#     deta = x - x0
#     deta = round(deta, 2)
#     return deta
#
#
# def E(x, x0):
#     '''
#
#         :param x: 真实值
#         :param x0: 列表形式，数据的测量值
#         :return: 相对误差
#     '''
#     x0 = np.array(x0)
#     E = ((x - x0) / x0)
#     return '%.2f%%' % (E * 100)


def mean(x):
    '''

    :param x: 列表的形式，数据测量值
    :return: 平均值
    '''
    x = np.array(x)
    average = sum(x) / len(x)
    return round(average, 2)


def d(x):
    '''

    :param x: 测量的数值列表形式
    :return:绝对偏差
    '''
    x = np.array(x)
    d = x - mean(x)
    return d


def dr(x):
    '''

    :param x:测量的数值以列表形式
    :return: 相对偏差
    '''
    x = np.array(x)
    dr = (x - mean(x)) / mean(x)
    return dr


def d_hat(x):
    '''

    :param x:列表形式，数据的测量值
    :return:算术平均偏差
    '''
    x = np.array(x)
    n = len(x)
    d = (1 / n) * sum(abs(dr(x)))
    return d


def s(x):
    '''

    :param x: 列表形式，数据的测量值
    :return: 总体标准偏差
    '''
    x = np.array(x)
    bias = np.sqrt(sum(((x - mean(x)) ** 2)) / (len(x) - 1))
    return bias


def sr(x):
    '''

    :param x: 列表形式，数据的测量值
    :return: 相对标准偏差
    '''
    x = np.array(x)
    s1 = s(x)
    sr = s1 / mean(x)
    return sr


def r(x):
    '''

    :param x: 列表形式，数据的测量值
    :return: 重复性
    '''
    import math
    x = np.array(x)
    r = math.sqrt(8) * sr(x)
    return r


def Process(x, name, i=0, k=4):
    if i == 5:

        return 0
    else:
        res = round(x, k)
        if res != 0:

            return res
        else:
            i += 1
            return Process(x, name, i, k + 2)


'''接口二'''


# a = input("请输入你要的置信度为多少（例如：95%）")
# a为置信度
def u_(x, a):
    '''

    :param x:列表形式，数据的测量值
    :param t: 置信因子
    :return: 不确定度
    '''
    import pandas as pd
    import numpy as np

    confidence = {'测量次数n': np.array([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 21]),
                  '90%': np.array([6.314, 2.920, 2.353, 2.132, 2.015, 1.943, 1.895, 1.860, 1.833, 1.812, 1.725]),
                  '95%': np.array(
                      [12.706, 4.303, 3.182, 2.776, 2.571, 2.447, 2.365, 2.306, 2.262, 2.228, 2.086]),
                  '99%': np.array(
                      [63.657, 9.925, 5.841, 4.604, 4.032, 3.707, 3.500, 3.355, 3.250, 3.169, 2.846])}
    table = pd.DataFrame(confidence)

    b = len(x)
    t = table[a].loc[b]
    u = (t * s(x) / math.sqrt(len(x)))
    return round(u, 2)


'''
2-2分析结果的数据处理
'''


# 需要其他参数
# a为置信度
def G(x, a):
    '''

    :param x: 列表形式，数据的测量值
    :return:G检验值
    '''
    import pandas as pd
    import numpy as np
    print('------G检验表-------')
    data = pd.DataFrame({"测量次数n": np.array([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20]),
                         "95%": np.array(
                             [1.15, 1.46, 1.67, 1.82, 1.94, 2.03, 2.11, 2.18, 2.23, 2.29, 2.23, 2.37, 2.41, 2.56]),
                         "97.5%": np.array(
                             [1.15, 1.48, 1.71, 1.89, 2.02, 2.13, 2.21, 2.29, 2.36, 2.41, 2.46, 2.51, 2.55, 2.71]),
                         "99%": np.array(
                             [1.15, 1.49, 1.75, 1.94, 2.10, 2.22, 2.32, 2.41, 2.48, 2.55, 2.61, 2.66, 2.71, 2.88])})

    b = len(x)
    G_real = data[a].loc[b]
    x = sorted(x)
    x = np.array(x)
    # 判断x1最小值
    G1 = (mean(x) - x[0]) / s(x)
    G2 = (mean(x) - x[-1]) / s(x)
    if G1 > G_real:
        x.pop(0)
        print(x)
        print('x1应弃去')
    elif G1 <= G_real:
        print("x1保留")
    if G2 > G_real:
        x.pop()
        print(x)
        print('xn应弃去')
    elif G2 <= G_real:
        print("xn保留")
    return G1, G2, G_real, x


# 需要其他参数
# a为置信度
def Q(x, a):
    '''

    :param x: 列表形式，数据的测量值
    :return: Q检验值
    '''
    import numpy as np
    x = sorted(x)
    x = np.array(x)
    Q1 = (x[1] - x[0]) / (x[-1] - x[0])
    Q2 = (x[-1] - x[-2]) / (x[-1] - x[0])
    import pandas as pd
    import numpy as np

    Q = {'90%': np.array([0.94, 0.76, 0.64, 0.56, 0.51, 0.47, 0.44, 0.41]),
         '95%': np.array([0.98, 0.85, 0.73, 0.64, 0.59, 0.54, 0.51, 0.48]),
         '99%': np.array([0.99, 0.93, 0.82, 0.74, 0.68, 0.63, 0.60, 0.57])}
    table_Q = pd.DataFrame(Q,
                           index=[3, 4, 5, 6, 7, 8, 9, 10],
                           columns=['90%', '95%', '99%'])
    # a = input("请输入你要的置信度为多少（例如：95%）")
    b = len(x)
    Q_real = table_Q[a].loc[b]
    x = sorted(x)
    if Q1 > Q_real:
        x.pop(0)
        print(x)
        print('x1应弃去')
    elif Q1 <= Q_real:
        print("x1保留")
    if Q2 > Q_real:
        x.pop()
        print(x)
        print('xn应弃去')
    elif Q2 <= Q_real:
        print("xn保留")
    return Q1, Q2, Q_real, x


def get_values_chemical_two(x, a, result):
    return [
        {"name": "不确定性", "num": Process(u_(x, a), "u_", result)},
        {"name": "G检验值", "num": Process(G(x, a), "G", result)},
        {"name": "Q检验值", "num": Process(Q(x, a), "u_", result)},

    ]

    # u_:不确定性
    # G:G检验值
    # Q:Q检验值


def F(x1, x2):
    '''

    :param x1: 列表形式，第一波数据的测量值
    :param x2: 列表形式，第二波数据的测量值
    :return:F检验值
    '''
    import pandas as pd
    import numpy as np

    F = {2: np.array([19.00, 9.55, 6.94, 5.79, 5.14, 4.74, 4.46, 4.26, 4.10, 3.00]),
         3: np.array([19.16, 9.28, 6.59, 5.41, 4.76, 4.35, 4.07, 3.86, 3.71, 2.60]),
         4: np.array([19.25, 9.12, 6.39, 5.19, 4.53, 4.12, 3.84, 3.63, 3.48, 2.37]),
         5: np.array([19.30, 9.01, 6.26, 5.19, 4.53, 3.97, 3.69, 3.48, 3.33, 2.21]),
         6: np.array([19.33, 8.94, 6.16, 4.95, 4.28, 3.87, 3.85, 3.37, 3.22, 2.10]),
         7: np.array([19.36, 8.88, 6.09, 4.88, 4.21, 3.79, 3.50, 3.29, 3.14, 2.01]),
         8: np.array([19.37, 8.84, 6.04, 4.82, 4.15, 3.73, 3.44, 3.23, 3.07, 1.94]),
         9: np.array([19.38, 8.81, 6.00, 4.77, 4.10, 3.68, 3.39, 3.18, 3.02, 1.88]),
         10: np.array([19.39, 8.78, 5.96, 4.74, 4.06, 3.63, 3.34, 3.13, 2.97, 1.83]),
         'endless': np.array([19.50, 8.83, 5.63, 4.36, 3.67, 3.23, 2.93, 2.71, 2.54, 1.00])}
    table_Q = pd.DataFrame(F,
                           index=[2, 3, 4, 5, 6, 7, 8, 9, 10, 'endless'],
                           columns=[2, 3, 4, 5, 6, 7, 8, 9, 10, 'endless'])

    a = len(x1)
    c = len(x2)
    f1 = a + 1
    f2 = c + 1
    if s(x1) >= s(x2):
        F_real = table_Q[f1 - 2].loc[f2 - 2]  # 第几列第几行
        F = ((s(x1)) ** 2) / ((s(x2)) ** 2)
    elif s(x1) < s(x2):
        F_real = table_Q[f2 - 2].loc[f1 - 2]  # 第几列第几行
        F = ((s(x2)) ** 2) / ((s(x1)) ** 2)
    return F, F_real


def t(x1, x2):
    '''

    :param x1:第一个人测的数据
    :param x2: 第二个人测的数据，列表形式
    :return: t检验值
    '''
    x1 = np.array(x1)
    x2 = np.array(x2)
    n1 = len(x1)
    n2 = len(x2)
    s1 = math.sqrt((n1 - 1) * s(x1) ** 2 + (n2 - 1) * s(x2) ** 2)
    t = (abs(mean(x1) - mean(x2)) / s1) * math.sqrt((n1 * n2) / n1 + n2)
    return t


def chemical_chemistry(data):  # x是数组
    x = data['x']

    return str([
        {"name": "平均值", "num": Process(mean(x), "mean")},
        {"name": "绝对偏差", "num": d(x)},
        {"name": "绝对偏差", "num": dr(x)},
        {"name": "算术平均偏差", "num": Process(d_hat(x), "d_hat")},
        {"name": "总体标准偏差", "num": Process(s(x), "s")},
        {"name": "相对标准偏差", "num": Process(sr(x), "sr")},
        {"name": "总体标准偏差", "num": Process(r(x), "r")},
    ]
    )


def chemical_chemical_two(data):
    x = data['x']
    a = data['a']
    return str([
        {"name": "不确定性", "num": Process(u_(x, a), "u_")},
        {"name": "G检验值", "num": Process(G(x, a), "G")},
        {"name": "Q检验值", "num": Process(Q(x, a), "u_")},
    ])


def chemical_F_value(data):
    x1 = data['x1']
    x2 = data['x2']
    # 数组
    return str([{"name": "不确定性", "num": Process(F(x1, x2), "F")}])


# print(d_hat([52.80, 5856, 53.16]))
