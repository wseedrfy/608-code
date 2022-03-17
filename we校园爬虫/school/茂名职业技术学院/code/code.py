import ddddocr


###识别技术
def code_ocr(username,session):
    status_code=0
    code, cookies='',''
    try:
        image_url = 'MZ_code.png'+username
        res = session.get('https://jwc.mmpt.edu.cn/CheckCode.aspx')
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
        # print('错误,验证码的返回值为',status_code)
        # print("茂职验证码有问题")
        return code, cookies
