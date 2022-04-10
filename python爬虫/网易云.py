import requests

url='https://music.163.com/'
res=requests.get(url)
print(res.text)

