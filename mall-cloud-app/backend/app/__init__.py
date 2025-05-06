from flask import Flask
from flask_cors import CORS
from .routes import events_bp, stats_bp, malls_bp
from .db import init_db

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')
    CORS(app)

    init_db()
    app.register_blueprint(events_bp, url_prefix='/events')
    app.register_blueprint(stats_bp, url_prefix='/stats')
    app.register_blueprint(malls_bp, url_prefix='/malls')  # optional


    return app
