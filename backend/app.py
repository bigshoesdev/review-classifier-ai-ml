from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from transformers import pipeline
from model_trainer import train_and_evaluate
from chatgpt_handler import get_chatgpt_response, log_conversation

app = Flask(__name__)
CORS(app)

sentiment_pipeline = pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english"
)


@app.route('/train', methods=['POST'])
def train():
    if 'file' not in request.files:
        return jsonify({'error': 'CSV file is required'}), 400
    try:
        df = pd.read_csv(request.files['file'])
        result = train_and_evaluate(df)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/sentiment', methods=['POST'])
def sentiment():
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({'error': 'Missing "text" in request body'}), 400
    try:
        result = sentiment_pipeline(data['text'])[0]
        return jsonify({
            "label": result['label'],
            "score": round(result['score'], 4)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    if not data or 'prompt' not in data:
        return jsonify({'error': 'Missing "prompt" in request'}), 400
    try:
        prompt = data['prompt']
        response = get_chatgpt_response(prompt)
        log_conversation(prompt, response)
        return jsonify({"response": response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
