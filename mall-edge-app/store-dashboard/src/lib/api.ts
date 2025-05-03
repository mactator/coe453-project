import { MallEvent } from "./types";

const API_URL = import.meta.env.VITE_API_URL as string;

export async function sendMallEvent(event: MallEvent): Promise<void> {
    console.log("📤 Sending event:", event);

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
