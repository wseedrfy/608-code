import requests
from pyquery import PyQuery as pq
import ddddocr


def code_ocr(username,sessions: requests.session()):
    image_url = 'ZJ_code.png'+username
    url = 'http://jxgl.zjhzcc.edu.cn'
    res = sessions.get(url + "/default2.aspx")
    # print(res.text)
    doc = pq(res.text)
    src = doc('#icode').attr('src')
    try:
        code = sessions.get(url + src)
        if code.status_code == 200:
            open(image_url, 'wb').write(code.content)
        del code
    except:
        print("验证码下载出错")
    ocr= ddddocr.DdddOcr()
    code = ocr.classification(open(image_url, 'rb').read())
    return code