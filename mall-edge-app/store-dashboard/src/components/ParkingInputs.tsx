import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { sendMallEvent } from "@/lib/api";

interface Props {
  mallId: string;
}

export default function ParkingInputs({ mallId }: Props) {
  const [parking, setParking] = useState({ total: 100, available: 80 });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Available Slots</Label>
          <Input
            type="number"
            value={parking.available}
            onChange={(e) => setParking((p) => ({ ...p, available: Number(e.target.value) }))}
          />
        </div>
        <div>
          <Label>Total Slots</Label>
          <Input
            type="number"
            value={parking.total}
            onChange={(e) => setParking((p) => ({ ...p, total: Number(e.target.value) }))}
          />
        </div>
      </div>
      <Button
        className="w-full"
        onClick={() =>
          sendMallEvent({
            event_type: "parking_update",
            mall_id: mallId,
            available_slots: parking.available,
            total_slots: parking.total,
          })
        }
      >
        🅿️ Update Parking
      </Button>
    </>
  );
}
