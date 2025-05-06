import sqlite3
from flask import g, Flask
from .config import Config

def get_db() -> sqlite3.Connection:
    if 'db' not in g:
        g.db = sqlite3.connect(Config.DATABASE)
        g.db.row_factory = sqlite3.Row  # Allows dictionary-style access
    return g.db

def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()

def init_db():
    conn = sqlite3.connect(Config.DATABASE)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            mall_id TEXT NOT NULL,
            store_id TEXT,
            event_type TEXT NOT NULL,
            amount REAL,
            alarm_type TEXT,
            available_slots INTEGER,
            total_slots INTEGER,
            timestamp TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

def init_app(app: Flask):
    app.teardown_appcontext(close_db)
