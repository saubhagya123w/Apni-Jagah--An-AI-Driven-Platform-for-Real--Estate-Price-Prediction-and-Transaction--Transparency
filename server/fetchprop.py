from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from db_config import get_db_connection
import os

app = Flask(__name__)
CORS(app)

# Folder where uploaded images are stored (at the root level of your project)
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'property images')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# ------------------------------
# Route: Fetch all property data
# ------------------------------
@app.route('/get-properties', methods=['GET'])
def get_properties():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM properties")
        data = cursor.fetchall()
        cursor.close()
        conn.close()

        # Update image_path to be accessible via frontend
        for item in data:
            if item.get("image_path"):
                filename = os.path.basename(item["image_path"])
                item["image_path"] = f"/property_images/{filename}"  # Adjusted path for React

        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ---------------------------------
# Route: Serve uploaded image files
# ---------------------------------
@app.route('/property_images/<filename>')
def serve_uploaded_image(filename):
    try:
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
    except FileNotFoundError:
        return jsonify({"error": "Image not found"}), 404

# ------------------
# Run the Flask app
# ------------------
if __name__ == '__main__':
    # Create folder if it doesn't exist
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    # Run on port 5005 for frontend integration
    app.run(debug=True, port=5005)
