import requests

url = "https://www.17k.com/ck/book/search/merge?_versions=990&appKey=2406394919"
res=requests.get(url)
print(res.content)
