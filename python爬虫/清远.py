import requests
import re

url = 'https://jw.qypt.edu.cn/qyjwxt/faces/login'
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
}

res = requests.get(url, headers=headers, verify=False)
# print(res.text)
s = res.text
n = re.findall(r"adf.ctrl-state(.+?)};", s)
# print(str(n[0]).split("'")[2])
adf = str(n[0]).split("'")[2]

headers_1 = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
    "Cookie": "JSESSIONID=dyVmb6m_k_SIokxJJDScov63F15IZ9kq_EMgv99J_K8OUZDNkwie!1661198959"
}
log_url = 'https://jw.qypt.edu.cn/qyjwxt/faces/login?_adf.ctrl-state=' + adf
data = {
    "it1": "20610202020143",
    "it2": "184014",
    "org.apache.myfaces.trinidad.faces.FORM": "f1",
    "javax.faces.ViewState": "!1dnmn8k20k",
    "event": "cb3",
    "event.cb3": ' <m xmlns="http://oracle.com/richClient/comm"><k v="type"><s>action</s></k></m>',
}

resp = requests.post(url=log_url, verify=False, headers=headers_1, data=data)
print(resp.content)
