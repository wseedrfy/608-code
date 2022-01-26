import ddddocr



###识别技术
def code_ocr(session):
    status_code = 0
    code = ''
    cookies = ''

    try:

        image_url = 'NL_code.png'
        res = session.get('http://campus.gdnlxy.cn/campus-xmain/api/main-vcode')
        # print(1)
        cookies = res.cookies.items()
        status_code = res.status_code
        if res.status_code == 200:
            open(image_url, 'wb').write(res.content)  # 将内容写入图片
        del res
        image = open(image_url, 'rb')
        ocr = ddddocr.DdddOcr()
        code = ocr.classification(image.read())
        return code, cookies
    except:
        print('错误,验证码的返回值为', status_code)
        print("茂名农林验证码有问题")
        return code, cookies
