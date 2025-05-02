// src/lib/api.ts
import { MallEvent } from "./types";

const API_URL = "http://localhost:5001/event";

export async function sendMallEvent(event: MallEvent): Promise<void> {
    console.log("📤 Sending event:", event); // 🔍 Log event sent

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(event),
        });

        console.log("📥 Response status:", res.status);

        if (!res.ok) {
            const error = await res.text();
            console.error("API Error:", error);
            throw new Error(error);
        }

        const json = await res.json();
        console.log("✅ Sent:", json);
    } catch (err) {
        console.error("❌ Fetch Error:", err);
    }
}
