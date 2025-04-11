import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
from werkzeug.utils import secure_filename
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Email config
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('EMAIL_USER')
app.config['MAIL_PASSWORD'] = os.getenv('EMAIL_PASS')
mail = Mail(app)

@app.route('/submit-property', methods=['POST'])
def submit_property():
    name = request.form.get('name')
    email = request.form.get('email')
    uploaded_file = request.files.get('document')

    if not name or not email or not uploaded_file:
        return jsonify({'message': 'Missing required fields'}), 400

    filename = secure_filename(uploaded_file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    uploaded_file.save(filepath)

    msg = Message(
        subject="Property Submission Received",
        sender=app.config['MAIL_USERNAME'],
        recipients=[email]
    )
    msg.body = f"Hello {name},\n\nYour property document has been submitted successfully. We will review it and notify you when it's posted.\n\nThank you!"
    mail.send(msg)

    return jsonify({'message': 'Property submitted and email sent successfully!'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5008)

