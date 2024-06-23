import requests
import json

url = "http://192.168.1.251:11434/api/generate" #address

headers = {
    "Content-Type": "application/json"
}
user_input = input("$ ")

data = {
    #"model": "llama2-uncensored", #LLM Model
    "model": "llama3", #LLM Model
    "prompt": user_input, #User input
    "stream": False
}

response = requests.post(url, headers=headers, data=json.dumps(data))

if response.status_code == 200:
    response_text = response.text
    data = json.loads(response.text)
    actual_response = data["response"]
    print(actual_response)
else:
    print("Error, response fail", response.status_code, response.text)