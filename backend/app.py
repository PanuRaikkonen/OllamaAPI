from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://192.168.1.251:3000"}})

LLM_URL = "http://192.168.1.251:11434/api/generate"
context = None

@app.route('/api/generate', methods=['POST', 'OPTIONS'])
def generate():
    global context
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'Preflight request handled successfully'})
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response
    elif request.method == 'POST':
        data = request.get_json()
        model = data.get('model')
        prompt = data.get('prompt')

        payload = {
            "model": model,
            "prompt": prompt,
            "context": context,
            "stream": False
        }

        response = requests.post(LLM_URL, headers={"Content-Type": "application/json"}, data=json.dumps(payload))
        if response.status_code == 200:
            data = response.json()
            context = data.get('context', None)
            return jsonify({"response": data["response"]})
        else:
            return jsonify({"error": "Failed to get response from LLM"}), response.status_code

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=11434, debug=True)