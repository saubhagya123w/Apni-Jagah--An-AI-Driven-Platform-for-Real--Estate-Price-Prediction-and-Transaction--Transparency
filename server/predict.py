# prediction_server.py

import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        city = request.form.get("city")
        location = request.form.get("location").strip().lower()
        bhk = int(request.form.get("bhk"))
        area = float(request.form.get("squareFeet"))

        print(f"Request received - City: {city}, Location: {location}, BHK: {bhk}, Area: {area}")

        def load_and_predict(csv_file, location, bhk, area):
            try:
                data = pd.read_csv(csv_file)

                # Normalize location strings
                data['location'] = data['location'].astype(str).str.strip().str.lower()
                data['bhk'] = data['bhk'].astype(int)

                print("Unique locations in dataset:", data['location'].unique())

                # Filter data
                filtered_data = data[(data['location'] == location) & (data['bhk'] == bhk)]

                if not filtered_data.empty:
                    price_per_sqft = filtered_data['price'].iloc[0] / filtered_data['area'].iloc[0]
                    prediction = round(price_per_sqft * area, 2)
                    rate = round(price_per_sqft, 2)
                    return prediction, rate
                else:
                    print("No matching data found in CSV.")
            except Exception as e:
                print(f"Error while loading or processing CSV: {e}")
            return None, None

        file_map = {
            "Mumbai": "Mumbai_2022.csv",
            "Bangalore": "Bangalore_2022.csv",
            "Chennai": "chennai_2023.csv",
            "Delhi": "delhi_2023.csv"
        }

        csv_file = file_map.get(city)
        if not csv_file:
            return jsonify({"error": f"Unsupported city: {city}"}), 400

        prediction, rate = load_and_predict(csv_file, location, bhk, area)

        if prediction is not None:
            return jsonify({"prediction": prediction, "rate": rate}), 200
        else:
            return jsonify({"error": f"No data found for location '{location}' with {bhk} BHK"}), 404

    except Exception as e:
        print(f"Server error: {e}")
        return jsonify({"error": "Internal server error"}), 500


if __name__ == '__main__':
    # ✅ Changed to port 5003
    app.run(port=5003, debug=True)
