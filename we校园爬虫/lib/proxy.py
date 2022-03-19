import random
import re
import requests, json


def get_proxy():
    ip = requests.get('http://www.kxdaili.com/dailiip.html').text
    address=re.findall('\d+\.\d+\.\d+\.\d+', ip)
    port=re.findall('<td>(\d+)</td>', ip)
    # print(time)
    n = random.randint(0, len(address)-1)
    ip = address[n]+":"+port[n]

    # proxy = requests.get('https://ip.jiangxianli.com/api/proxy_ip').text
    # # return {
    # #     'http': 'http://' + proxy,
    # #     'https': 'https://' + proxy
    # # }
    # p = json.loads(proxy)['data']['ip']+":"+json.loads(proxy)['data']['port']
    #
    return {
        'http': 'http://' + ip,
        'https': 'https://' + ip
    }

print(get_proxy())

