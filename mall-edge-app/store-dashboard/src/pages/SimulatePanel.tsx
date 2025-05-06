import AlarmSelect from "@/components/AlarmSelect";
import MallEventButton from "@/components/MallEventButton";
import ParkingInputs from "@/components/ParkingInputs";
import TransactionInput from "@/components/TransactionInput";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

export default function SimulatePanel() {
    const [mallId] = useState("mall-02");
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
                        placeholder="e.g., store-007"
                    />
                </div>

                <div className="space-y-4">
                    {/* Valid entry events */}
                    <MallEventButton
                        label="🚶 Mall Entry"
                        event={{
                            event_type: "entry",
                            mall_id: mallId,
                            available_slots: 75,
                            total_slots: 100
                        }}
                    />

                    <MallEventButton
                        label="🛍️ Store Entry"
                        event={{
                            event_type: "entry",
                            mall_id: mallId,
                            store_id: storeId,
                            available_slots: 50,
                            total_slots: 100
                        }}
                    />

                    {/* Valid alarm event */}
                    <MallEventButton
                        label="🦹 Report Theft"
                        event={{
                            event_type: "alarm",
                            mall_id: mallId,
                            store_id: storeId,
                            alarm_type: "theft"
                        }}
                    />

                    {/* Components for transaction, custom alarm, and parking */}
                    <TransactionInput mallId={mallId} storeId={storeId} />
                    <AlarmSelect mallId={mallId} storeId={storeId} />
                    <ParkingInputs mallId={mallId} />
                </div>
            </div>
        </div>
    );
}
