import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendMallEvent } from "@/lib/api";

interface Props {
  mallId: string;
  storeId: string;
}

export default function TransactionInput({ mallId, storeId }: Props) {
  const [amount, setAmount] = useState("50");

  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      <Input
        className="flex-grow"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button
        className="w-full md:w-auto"
        onClick={() =>
          sendMallEvent({
            event_type: "transaction",
            mall_id: mallId,
            store_id: storeId,
            amount: parseFloat(amount),
          })
        }
      >
        💸 Transaction
      </Button>
    </div>
  );
}
