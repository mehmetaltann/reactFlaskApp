from flask import Flask
from flask_cors import CORS
from app.main import main
from .extension import mongo


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config["MONGO_URI"] = "mongodb+srv://mehmetaltann:BfAyFdceTZIKOvPJ@training.xsqqies.mongodb.net/?retryWrites=true&w=majority&appName=TRAINING"
    # app.config["SECRET_KEY"] = "dabsdhasbfasdbfasdnfbasdyfubybfquıerfbh7348hrq3bf4837nfhbc8c9unc334g536gwgbvb"
    mongo.init_app(app)
    app.register_blueprint(main)
    return app
