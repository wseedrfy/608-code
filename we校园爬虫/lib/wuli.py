import json

import numpy as np
import threading


'''
    函数解释：

   deta:绝对误差
    E:相对误差
    mean:算术平均值
    sigmoid:标准偏差
    sigmoid_x:算术平均的标准偏差
    u:总不确定度
    ua:a类不确定度
    ub:b类不确定度
    ur:总相对不确定度
    model:最小二乘法
    '''
"""{
    arr:[],list
    ub: {"name":"",index:""},dict
}"""

'''return {
    mean:
    sigmoid:
    sigmoid_x:
    ur:
    ub:
    ua:
    u:
}'''
'''
   {
    x:[]
    y:[]
   }

'''
''':param
return {
    k: number
    b: number
}

'''

'''
1.1.2真值与误差
'''


def deta(x, x0):
    '''

    :param x: 真实值
    :param x0: 列表形式，数据的测量值
    :return: 绝对误差
    '''
    x = np.array(x)
    deta = x - x0
    return deta


def E(x, x0):
    '''

        :param x: 真实值
        :param x0: 列表形式，数据的测量值
        :return: 相对对误差
    '''
    x = np.array(x)
    E = ((x - x0) / x0)

    return '%.2f%%' % (E * 100)


'''
1.2随机误差的处理与标准
'''


def mean(x):
    '''

    :param x: 列表的形式，数据测量值
    :param w: 保留的小数位数
    :return: 平均值
    '''
    x = np.array(x)
    average = sum(x) / len(x)
    return average


'''
有限次测量的标准偏差
'''


def sigmoid(x):
    '''

    :param x: 列表形式，数据的测量值
    :return: 标准偏差
    '''
    x = np.array(x)
    bias = np.sqrt(sum(((x - mean(x)) ** 2)) / (len(x) - 1))
    return bias


'''
有限次测量的算术平均值的标准偏差
'''


def sigmoid_x(x):
    '''

    :param result:
    :param x: -列表形式，数据的测量值
    :return: 算术测量值的标准偏差
    '''
    x = np.array(x)
    bias = sigmoid(x)
    bias = bias / np.sqrt(len(x))
    # result['sigmoid_x'] = bias
    return bias


'''
1.3.2不确定度的简化和估算方法
'''


def ua(x):
    '''

    :param x:列表形式数据,
    :return:accurate_uA,
    '''
    x = np.array(x)
    n = len(x)
    if n == 2:
        p = 8.98
    if n == 3:
        p = 2.48
    if n == 4:
        p = 1.59
    if n == 5:
        p = 1.24
    if n == 6:
        p = 1.05
    if n == 7:
        p = 0.93
    if n == 8:
        p = 0.84
    if n == 9:
        p = 0.77
    if n == 10:
        p = 0.72
    accurate_uA = round(p * sigmoid(x), 2)
    rough_uA = round(sigmoid(x), 2)
    rough_uA = sigmoid(x)
    return rough_uA
    # round(rough_uA,2)


def u(x, ub):
    import math
    ua1 = ua(x)
    ub1 = ub
    u = math.sqrt(ua1 ** 2 + ub1 ** 2)
    # u="总不确定度为{}".format(u)
    return u


def ur(x, ub, result):
    x = np.array(x)
    ur = u(x, ub) / mean(x)
    result['ur'] = '%.2f%%' % (ur * 100)
    return '%.2f%%' % (ur * 100)


'''
1.5.4最小二乘法
'''


def model(x, y, xlabel="x", ylabel="y", title="title"):
    import base64
    print(1)
    import seaborn as sns
    import matplotlib.pyplot as plt
    '''
    :param x:列表类型 -->自变量
    :param y: 列表类型 -->因变量
    :return: 线性回归的参数a和b,r检验值r
    '''

    import time

    # start = time.time()
    plt.rcParams['font.sans-serif'] = ['SimHei']
    plt.rcParams['axes.unicode_minus'] = False
    x = np.array(x)
    y = np.array(y)
    n = len(x)
    sum_x = x.sum()
    sum_y = y.sum()
    sum_x2 = (x ** 2).sum()
    xy = x * y
    sum_xy = xy.sum()
    b = (sum_xy - sum_x * sum_y / n) / (sum_x2 - sum_x ** 2 / n)
    a = y.mean() - b * x.mean()
    r = sum((x - mean(x)) * (y - mean(y))) / np.sqrt((sum((x - mean(x)) ** 2)) * sum((y - mean(y)) ** 2))
    sns.regplot(x, y)
    plt.xlabel(xlabel)
    plt.ylabel(ylabel)
    plt.title(title)
    plt.savefig("cached1.png")
    plt.show()
    cached_img = open("cached1.png", "rb")
    cached_img_b64 = str(base64.b64encode(cached_img.read()))
    # print(time.time()-start)
    print(cached_img_b64)
    return json.dumps({
        "b": a,
        "k": b,
        "r": r,
        "m": cached_img_b64
    })


def Process(x, name, result, i, k=4):
    # print(i)
    if i >= 3:
        result[name] = 0
        return 0
    else:
        res = round(x, k)
        if res != 0:
            result[name] = res
            return res

        else:
            # result[name] = Process(x, name, i + 1, k + 2)
            return Process(x, name, result, i + 1, k + 2)


def get_result(x, ub):
    result = {
        'mean': 'NaN',
        'sigmoid': 'NaN',
        'sigmoid_x': 'NaN',
        'ua': 'NaN',
        'ub': 'NaN',
        'u': 'NaN',
        'ur': 'NaN'
    }
    try:
        mean1 = mean(x)
        # result['ur'] = ur()
        treads = [
            threading.Thread(target=Process, args=(mean1, 'mean', result, 0)),
            threading.Thread(target=Process, args=(sigmoid(x), 'sigmoid', result, 0)),
            threading.Thread(target=Process, args=(ub, 'ub', result, 0)),
            threading.Thread(target=ur, args=(x, ub, result)),
            threading.Thread(target=Process, args=(ua(x), 'ua', result, 0)),
            threading.Thread(target=Process, args=(u(x, ub), 'u', result, 0)),
            threading.Thread(target=Process, args=(sigmoid_x(x), 'sigmoid_x', result, 0))
        ]
        for t in treads:
            t.start()
        for t in treads:
            t.join()
            """
                mean: 算术平均数
                sigmoid:	标准偏差
                sigmoid_x:	算术平均的标准偏差
                ur:	总相对不确定度	
                ub:	b类不确定度
                ua:	a类不确定度
                u:	总不确定度
        """
        return json.dumps(
            [
                {"name": "算术平均数", "res": result['mean']},
                {"name": "标准偏差", "res": result['sigmoid']},
                {"name": "算术平均的标准偏差", "res": result['sigmoid_x']},
                {"name": "b类不确定度", "res": result['ub']},
                {"name": "a类不确定度", "res": result['ua']},
                {"name": "总不确定度", "res": result['u']},
                {"name": "总相对不确定度", "res": result['ur']}])

    except:
        return json.dumps([
            {"name": "算术平均数", "res": result['mean']},
            {"name": "标准偏差", "res": result['sigmoid']},
            {"name": "算术平均的标准偏差", "res": result['sigmoid_x']},
            {"name": "b类不确定度", "res": result['ub']},
            {"name": "a类不确定度", "res": result['ua']},
            {"name": "总不确定度", "res": result['u']},
            {"name": "总相对不确定度", "res": result['ur']},
        ])
