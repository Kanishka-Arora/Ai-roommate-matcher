from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure the API key for Gemini
API_KEY = "AIzaSyDTBHVgPnCzwvED2DXoZKKrOVgeHdk1djg"
genai.configure(api_key=API_KEY)

@app.route('/get_response', methods=['POST'])
def get_response():
    # Get the prompt from the request
    data = request.get_json()
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    try:
        # Generate the response using Gemini
        model = genai.GenerativeModel('gemini-1.5-flash')
        contents = [prompt + " think this is a roommate maching system and you are a roommate who is looking for a new roommate. Please answer the question in a friendly and helpful manner. also some qutions was already ask and the answers of the persone were looking for are given below. Please use this information to answer the question. " ]
        response = model.generate_content(contents)

        # Return the response from Gemini
        return jsonify({"response": response.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
