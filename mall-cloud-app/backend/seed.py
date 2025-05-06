import sqlite3
import datetime
import random
from app.config import Config


# DB_PATH = "your_database_path.db"  # e.g., db/database.db
DB_PATH = Config.DATABASE


malls = ["mall-01", "mall-02", "mall-03"]
stores = ["store-a", "store-b", "store-c"]

events = ["entry", "transaction", "alarm"]

def random_event(mall_id, store_id):
    event_type = random.choice(events)
    amount = random.randint(5, 100) if event_type == "transaction" else None
    alarm_type = random.choice(["fire", "theft"]) if event_type == "alarm" else None
    available = random.randint(20, 100) if event_type == "entry" else None
    total = 100 if event_type == "entry" else None

    return (mall_id, store_id, event_type, amount, alarm_type, available, total, datetime.datetime.utcnow().isoformat())

def seed():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    for _ in range(100):
        mall_id = random.choice(malls)
        store_id = random.choice(stores)
        c.execute('''
            INSERT INTO events (mall_id, store_id, event_type, amount, alarm_type, available_slots, total_slots, timestamp)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', random_event(mall_id, store_id))

    conn.commit()
    conn.close()
    print("✅ Seeded 100 sample events.")

if __name__ == "__main__":
    seed()
