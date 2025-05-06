from flask import Blueprint, request, jsonify
from .db import get_db
import datetime
import requests  # Add this
import logging   # Optional: for error visibility

api = Blueprint('api', __name__)

PUBLIC_DB_URL = "http://13.48.126.205:5001/events/"  # public endpoint
 

@api.route('/event', methods=['POST'])
def receive_event():
    data = request.get_json()
    db = get_db()
    c = db.cursor()

    event_type = data.get("event_type")
    mall_id = data.get("mall_id")
    store_id = data.get("store_id")
    timestamp = data.get("timestamp", datetime.datetime.utcnow().isoformat())

    # optional fields
    amount = data.get("amount")
    alarm_type = data.get("alarm_type")
    available_slots = data.get("available_slots")
    total_slots = data.get("total_slots")

    # Insert into local DB
    c.execute('''
        INSERT INTO events (mall_id, store_id, event_type, amount, alarm_type, available_slots, total_slots, timestamp)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (mall_id, store_id, event_type, amount, alarm_type, available_slots, total_slots, timestamp))
    db.commit()

    # Forward to public DB
    try:
        response = requests.post(PUBLIC_DB_URL, json={
            "mall_id": mall_id,
            "store_id": store_id,
            "event_type": event_type,
            "amount": amount,
            "alarm_type": alarm_type,
            "available_slots": available_slots,
            "total_slots": total_slots,
            "timestamp": timestamp
        }, timeout=5)

        if response.status_code != 201:
            logging.warning(f"Failed to post to public DB: {response.text}")
    except requests.RequestException as e:
        logging.warning(f"Exception while posting to public DB: {e}")

    return jsonify({"status": "success"}), 201


@api.route('/events', methods=['GET'])
def get_events():
    db = get_db()
    c = db.cursor()
    c.execute('SELECT * FROM events ORDER BY timestamp DESC')
    rows = c.fetchall()

    keys = ['id', 'mall_id', 'store_id', 'event_type', 'amount', 'alarm_type', 'available_slots', 'total_slots', 'timestamp']
    events = [dict(zip(keys, row)) for row in rows]

    return jsonify(events)
