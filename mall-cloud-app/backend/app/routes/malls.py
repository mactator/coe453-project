from flask import Blueprint, jsonify
from ..db import get_db

malls_bp = Blueprint('malls', __name__)

@malls_bp.route('/')
def get_malls():
    db = get_db()
    c = db.cursor()
    c.execute('SELECT DISTINCT mall_id FROM events')
    malls = [row[0] for row in c.fetchall()]
    return jsonify(malls)

@malls_bp.route('/<mall_id>/summary')
def mall_summary(mall_id):
    db = get_db()
    c = db.cursor()
    c.execute('''
        SELECT store_id,
               COUNT(*) AS events,
               SUM(CASE WHEN event_type = 'transaction' THEN amount ELSE 0 END) AS sales
        FROM events
        WHERE mall_id = ?
        GROUP BY store_id
    ''', (mall_id,))
    keys = ['store_id', 'events', 'sales']
    rows = c.fetchall()
    return jsonify([dict(zip(keys, row)) for row in rows])
