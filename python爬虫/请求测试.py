import requests
import time
url = "http://api.85e6f.com/v2/home/getconfig?pathParams=key"
data = {
    "bodyParams": "",
}
res = requests.post(url,data)
print(res.text)
