import AlarmSelect from "@/components/AlarmSelect";
import MallEventButton from "@/components/MallEventButton";
import ParkingInputs from "@/components/ParkingInputs";
import TransactionInput from "@/components/TransactionInput";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import { useState } from "react";

export default function SimulatePanel() {
    const [mallId] = useState("mall-01");
    const [storeId, setStoreId] = useState("store-01");

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-base-200">
            <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-xl space-y-8">
                <h1 className="text-3xl font-bold text-center text-primary">🧪 Mall Simulator Panel</h1>


                <div>
                    <Label>Store ID</Label>
                    <Input
                        value={storeId}
                        onChange={(e) => setStoreId(e.target.value)}
                        className="w-full"
                        placeholder="e.g., store_007"
                    />
                </div>

                <div className="space-y-4">
                    <MallEventButton label="🚶 Mall Entry" event={{ event_type: "mall_entry", mall_id: mallId }} />
                    <MallEventButton label="🛍️ Store Entry" event={{ event_type: "store_entry", mall_id: mallId, store_id: storeId }} />

                    <TransactionInput mallId={mallId} storeId={storeId} />
                    <AlarmSelect mallId={mallId} storeId={storeId} />
                    <ParkingInputs mallId={mallId} />

                    <MallEventButton label="🦹 Report Theft" event={{ event_type: "steal", mall_id: mallId, store_id: storeId }} />
                </div>
            </div>
        </div>
    );
}
