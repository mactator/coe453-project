from flask import Blueprint, request, jsonify
from ..db import get_db
import datetime

events_bp = Blueprint('events', __name__)

@events_bp.route('/', methods=['POST'])
def receive_event():
    data = request.get_json()
    db = get_db()
    c = db.cursor()

    event_type = data.get("event_type")
    mall_id = data.get("mall_id")
    store_id = data.get("store_id")
    timestamp = data.get("timestamp", datetime.datetime.utcnow().isoformat())

    amount = data.get("amount")
    alarm_type = data.get("alarm_type")
    available_slots = data.get("available_slots")
    total_slots = data.get("total_slots")

    c.execute('''
        INSERT INTO events (mall_id, store_id, event_type, amount, alarm_type, available_slots, total_slots, timestamp)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (mall_id, store_id, event_type, amount, alarm_type, available_slots, total_slots, timestamp))

    db.commit()
    return jsonify({"status": "success"}), 201

@events_bp.route('/', methods=['GET'])
def get_events():
    db = get_db()
    c = db.cursor()
    c.execute('SELECT * FROM events ORDER BY timestamp DESC')
    rows = c.fetchall()
    keys = ['id', 'mall_id', 'store_id', 'event_type', 'amount', 'alarm_type', 'available_slots', 'total_slots', 'timestamp']
    return jsonify([dict(zip(keys, row)) for row in rows])
