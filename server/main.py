import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Prediction and listings route
@app.route("/predict", methods=["POST"])
def predict():
    city = request.form.get("city")
    location = request.form.get("location")
    bhk = int(request.form.get("bhk"))
    area = float(request.form.get("squareFeet"))

    def load_and_predict(csv_file, location, bhk, area):
        try:
            data = pd.read_csv(csv_file)
            filtered_data = data[(data['location'] == location) & (data['bhk'] == bhk)]

            if not filtered_data.empty:
                price_per_sqft = filtered_data['price'].iloc[0] / filtered_data['area'].iloc[0]
                prediction = price_per_sqft * area
                rate = price_per_sqft
                listings = filtered_data[['location', 'bhk', 'area', 'price']].to_dict(orient="records")
                return prediction, rate, listings
            else:
                return None, None, None
        except Exception as e:
            return None, None, None

    if city == "Mumbai":
        prediction, rate, listings = load_and_predict("Mumbai_2022.csv", location, bhk, area)
    elif city == "Bangalore":
        prediction, rate, listings = load_and_predict("Bangalore_2022.csv", location, bhk, area)
    elif city == "Chennai":
        prediction, rate, listings = load_and_predict("chennai_2023.csv", location, bhk, area)
    elif city == "Delhi":
        prediction, rate, listings = load_and_predict("delhi_2023.csv", location, bhk, area)
    else:
        return jsonify({"error": "City not supported"}), 400

    if prediction is not None:
        return jsonify({
            "prediction": float(prediction),
            "rate": float(rate),
            "listings": listings
        })
    else:
        return jsonify({"error": "No matching data found"}), 404

# ✅ Run the app on custom host and port
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)

