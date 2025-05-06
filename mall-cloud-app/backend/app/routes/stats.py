from flask import Blueprint, jsonify
from ..db import get_db

stats_bp = Blueprint('stats', __name__)

@stats_bp.route('/')
def overall_stats():
    db = get_db()
    c = db.cursor()
    c.execute('''
        SELECT mall_id,
               COUNT(*) AS total_events,
               SUM(CASE WHEN event_type = 'transaction' THEN amount ELSE 0 END) AS total_sales,
               SUM(CASE WHEN event_type = 'entry' THEN 1 ELSE 0 END) AS mall_entries,
               SUM(CASE WHEN event_type = 'alarm' THEN 1 ELSE 0 END) AS alarms_triggered
        FROM events
        GROUP BY mall_id
    ''')
    keys = ['mall_id', 'total_events', 'total_sales', 'mall_entries', 'alarms_triggered']
    rows = c.fetchall()
    return jsonify([dict(zip(keys, row)) for row in rows])

@stats_bp.route('/overall')
def global_stats():
    db = get_db()
    c = db.cursor()
    c.execute('''
        SELECT
            COUNT(DISTINCT mall_id) AS total_malls,
            SUM(CASE WHEN event_type = 'transaction' THEN amount ELSE 0 END) AS total_sales,
            SUM(CASE WHEN event_type = 'entry' THEN 1 ELSE 0 END) AS total_visitors,
            SUM(CASE WHEN event_type = 'alarm' THEN 1 ELSE 0 END) AS total_alarms
        FROM events
    ''')
    row = c.fetchone()
    result = {
        "total_malls": row[0],
        "total_sales": row[1],
        "total_visitors": row[2],
        "total_alarms": row[3]
    }
    return jsonify(result)

