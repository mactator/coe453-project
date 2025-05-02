// src/lib/types.ts

export type MallEvent =
  | { event_type: "mall_entry"; mall_id: string }
  | { event_type: "store_entry"; mall_id: string; store_id: string }
  | { event_type: "transaction"; mall_id: string; store_id: string; amount: number }
  | { event_type: "alarm"; mall_id: string; store_id: string; alarm_type: "fire" | "theft" }
  | { event_type: "parking_update"; mall_id: string; available_slots: number; total_slots: number }
  | { event_type: "steal"; mall_id: string; store_id: string };
