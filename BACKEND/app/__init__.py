from flask import Flask
from flask_cors import CORS
from app.main import main
from .extension import mongo


def create_app(config_file='settings.py'):
    app = Flask(__name__)
    app.config.from_pyfile(config_file)
    CORS(app)
    mongo.init_app(app)
    app.register_blueprint(main)
    return app
