import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { sendMallEvent } from "@/lib/api";

interface Props {
  mallId: string;
  storeId: string;
}

export default function AlarmSelect({ mallId, storeId }: Props) {
  return (
    <Select onValueChange={(type) =>
      sendMallEvent({
        event_type: "alarm",
        mall_id: mallId,
        store_id: storeId,
        alarm_type: type as "fire" | "theft",
      })
    }>
      <SelectTrigger className="w-full text-white">🚨 Trigger Alarm</SelectTrigger>
      <SelectContent>
        <SelectItem value="fire">Fire</SelectItem>
        <SelectItem value="theft">Theft</SelectItem>
      </SelectContent>
    </Select>
  );
}
