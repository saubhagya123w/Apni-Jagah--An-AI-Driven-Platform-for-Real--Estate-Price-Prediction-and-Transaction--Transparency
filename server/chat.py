from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load dataset
DATA_PATH = 'mumbai_latest_full.csv'
df = pd.read_csv(DATA_PATH)

@app.route('/api/get_locations', methods=['GET'])
def get_locations():
    """Fetch unique locations from dataset."""
    locations = df['location'].unique().tolist()
    return jsonify({'locations': locations})

@app.route('/api/compare', methods=['POST'])
def compare_locations():
    """Compare selected locations based on price_per_sqft and rating."""
    data = request.get_json()
    selected_locations = data.get('locations', [])

    if not selected_locations:
        return jsonify({'suggestions': []})

    # Filter dataset
    filtered_df = df[df['location'].isin(selected_locations)]

    # Sort by rating (desc) and price_per_sqft (asc)
    sorted_df = filtered_df.sort_values(by=['rating', 'price_per_sqft'], ascending=[False, True])

    # Get top suggestions
    suggestions = sorted_df.head(5).to_dict(orient='records')
    return jsonify({'suggestions': suggestions})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5002)