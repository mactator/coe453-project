from flask import Flask
from .routes import api
from flask_cors import CORS
from .db import init_db

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')
    CORS(app)

    init_db()
    app.register_blueprint(api)

    return app
