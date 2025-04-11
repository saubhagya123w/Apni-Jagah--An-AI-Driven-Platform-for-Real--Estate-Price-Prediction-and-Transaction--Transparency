import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Prediction and neighborhood listings route
@app.route("/predict", methods=["POST"])
def predict():
    city = request.form.get("city")
    location = request.form.get("location").strip().lower()
    bhk = int(request.form.get("bhk"))
    area = float(request.form.get("squareFeet"))

    def load_and_predict(csv_file, location, bhk, area):
        try:
            data = pd.read_csv(csv_file)
            data['location'] = data['location'].astype(str).str.lower()

            # Get listings from similar neighborhoods
            neighborhood_data = data[data['location'].str.contains(location)]

            if neighborhood_data.empty:
                return None, None, []

            # Try to get the best match for prediction
            match_data = neighborhood_data[neighborhood_data['bhk'] == bhk]

            if match_data.empty:
                # Fallback to average of all BHKs in the neighborhood
                match_data = neighborhood_data

            # Calculate average price per sqft for prediction
            match_data = match_data[match_data['area'] > 0]  # avoid division by zero
            match_data['price_per_sqft'] = match_data['price'] / match_data['area']
            avg_price_per_sqft = match_data['price_per_sqft'].mean()
            prediction = avg_price_per_sqft * area

            # Select neighborhood listings
            listings = neighborhood_data[['location', 'bhk', 'area', 'price']].copy()
            listings['price_per_sqft'] = listings['price'] / listings['area']
            listings = listings.to_dict(orient="records")

            return prediction, avg_price_per_sqft, listings

        except Exception as e:
            print("Error:", e)
            return None, None, []

    # Choose the city file
    city_files = {
        "Mumbai": "Mumbai_2022.csv",
        "Bangalore": "Bangalore_2022.csv",
        "Chennai": "chennai_2023.csv",
        "Delhi": "delhi_2023.csv"
    }

    if city not in city_files:
        return jsonify({"error": "City not supported"}), 400

    prediction, rate, listings = load_and_predict(city_files[city], location, bhk, area)

    if prediction is not None:
        return jsonify({
            "prediction": round(prediction, 2),
            "rate": round(rate, 2),
            "listings": listings
        })
    else:
        return jsonify({"error": "No matching data found"}), 404


# ✅ Run the app on port 5006
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5006)



#neighbourhood
