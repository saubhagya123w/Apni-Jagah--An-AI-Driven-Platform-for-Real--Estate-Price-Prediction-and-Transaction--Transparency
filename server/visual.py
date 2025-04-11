from flask import Flask, jsonify, request
import pandas as pd
from flask_cors import CORS
from sklearn.linear_model import LinearRegression
import numpy as np

app = Flask(__name__)
CORS(app)

# Load dataset
data = pd.read_csv('mumbai_property_data_2021_2024_full.csv')

# 🧠 Build prediction models per location
models = {}
for loc in data['Location'].unique():
    loc_data = data[data['Location'] == loc]
    X = loc_data[['Year']]
    y = loc_data['Price_per_sqft']
    model = LinearRegression()
    model.fit(X, y)
    models[loc] = model

# 🔄 Reusable function to predict multiple years
def predict_years(model, start_year, end_year):
    years = np.array([[y] for y in range(start_year, end_year + 1)])
    preds = model.predict(years)
    return [{'year': int(y[0]), 'predicted_price_per_sqft': round(p, 2)} for y, p in zip(years, preds)]

# =================== ROUTES =================== #

@app.route('/api/data', methods=['GET'])
def get_all_data():
    return jsonify(data.to_dict(orient='records'))

@app.route('/api/line-chart', methods=['GET'])
def get_line_chart_data():
    chart_data = data.groupby(['Year', 'Location'])['Price_per_sqft'].mean().reset_index()
    return jsonify(chart_data.to_dict(orient='records'))

@app.route('/api/bar-chart', methods=['GET'])
def get_rate_of_change_data():
    bar_data = data.groupby(['Year', 'Location'])['Rate_of_Change_%'].mean().reset_index()
    return jsonify(bar_data.to_dict(orient='records'))

@app.route('/api/heatmap', methods=['GET'])
def get_heatmap_data():
    heatmap_data = data.pivot_table(index='Location', columns='Year', values='Rate_of_Change_%', aggfunc='mean').fillna(0)
    return jsonify(heatmap_data.to_dict())

# =================== 🔮 AI FUTURE FORECAST =================== #

@app.route('/api/predict-future', methods=['POST'])
def predict_future():
    content = request.get_json()
    location = content.get('location')
    start_year = int(content.get('start_year', 2025))
    end_year = int(content.get('end_year', 2030))

    if location not in models:
        return jsonify({'error': 'Invalid location'}), 400

    model = models[location]
    predictions = predict_years(model, start_year, end_year)

    return jsonify({
        'location': location,
        'start_year': start_year,
        'end_year': end_year,
        'predictions': predictions
    })

# =================== RUN APP =================== #

if __name__ == '__main__':
    app.run(debug=True, port=5007)
