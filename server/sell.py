# property_submission_server.py

import os
import mysql.connector
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploaded_images'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

db_config = {
    'host': '127.0.0.1',
    'user': 'root',
    'password': '1234qwert',
    'database': 'saubhagya12'
}

@app.route("/sell-property", methods=["POST"])
def sell_property():
    try:
        city = request.form.get("city")
        location = request.form.get("location")
        bhk = int(request.form.get("bhk"))
        area = float(request.form.get("squareFeet"))
        description = request.form.get("description")
        predicted_price = float(request.form.get("predicted_price"))
        rate = float(request.form.get("rate"))

        # Image upload
        image_file = request.files["image"]
        filename = secure_filename(image_file.filename)
        image_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        image_file.save(image_path)

        # Save to DB
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        insert_query = """
            INSERT INTO properties (city, location, bhk, area, description, image_path, predicted_price, rate)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(insert_query, (city, location, bhk, area, description, image_path, predicted_price, rate))
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "Property submitted successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/get-properties", methods=["GET"])
def get_properties():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM properties ORDER BY id DESC")
        properties = cursor.fetchall()
        cursor.close()
        conn.close()

        for prop in properties:
            # ✅ Adjusted image URL to match new port 5004
            prop['image_url'] = f"http://localhost:5004/{prop['image_path']}"

        return jsonify(properties), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/uploaded_images/<filename>')
def uploaded_images(filename):
    return app.send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    # ✅ Changed to port 5004
    app.run(port=5004, debug=True)
