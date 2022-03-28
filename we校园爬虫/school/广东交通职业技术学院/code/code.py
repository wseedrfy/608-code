import ddddocr
import time

###识别技术
import requests


def code_ocr(username):
    code = ''
    cookies = ''
    nowTime = str(round(time.time() * 1000))

    try:
        session = requests.Session()
        image_url = 'GDJT_code.png'+username

        res = session.get('http://jw.gdcp.cn/index_mobile.jsp')
        if res.status_code!=200:
            return {
                "msg":"教务系统关闭"
            }
        cookies = res.cookies.items()
        res = session.get('http://jw.gdcp.cn/yzm?d=' + nowTime)
        # cookies = res.cookies
        if res.status_code == 200:
            open(image_url, 'wb').write(res.content)  # 将内容写入图片
        del res
        image = open(image_url, 'rb')
        ocr = ddddocr.DdddOcr()
        code = ocr.classification(image.read())
        image.close()
        import os
        if os.path.exists("GDJT_code.png" + username):
            os.remove("GDJT_code.png" + username)
        return {
            "code": code,
            "cookies": cookies,
            "nowTime": nowTime
        }

    except Exception as e:
        return {
            "error": str(e),
            "code": code,
            "cookies": cookies,
            "nowTime": nowTime
        }



