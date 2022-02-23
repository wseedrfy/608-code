import time
import json
from lib import wuli
# import threading


def physical_Default(data):
    arr = data['arr']
    ub = data['ub']
    """
    arr:[],list 数据源
    ub: {"name":"",index:""}#dict b类不确定
    """

    """
    mean: 算术平均数
    sigmoid:	标准偏差
    sigmoid_x:	算术平均的标准偏差
    ur:	总相对不确定度	
    ub:	b类不确定度
    ua:	a类不确定度
    u:	总不确定度
    """

    try:
        return wuli.get_result(arr, ub)
    except:
        print("物理报错了")
    # wuli.u(arr)


def physical_Linear(data):
    return wuli.model(data['x'], data['y'])
