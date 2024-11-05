
from flask import Flask, render_template, jsonify
import json
from flask_ngrok import run_with_ngrok

app = Flask(__name__)
run_with_ngrok(app)  # Enable ngrok for this Flask app

# Route for the index page
@app.route('/')
def index():
    return render_template('index.html')

# Route for water quality data (API endpoint)
@app.route('/api/water_quality')
def water_quality():
    with open('data/latin_america_water_quality.json') as f:
        data = json.load(f)
    return jsonify(data)

if __name__ == '__main__':
    app.run()
