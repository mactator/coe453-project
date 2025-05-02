import sqlite3
from flask import g
from .config import Config

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(Config.DATABASE)
    return db

def init_db():
    conn = sqlite3.connect(Config.DATABASE)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            mall_id TEXT,
            store_id TEXT,
            event_type TEXT,
            amount REAL,
            alarm_type TEXT,
            available_slots INTEGER,
            total_slots INTEGER,
            timestamp TEXT
        )
    ''')
    conn.commit()
    conn.close()
