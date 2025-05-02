// components/MallEventButton.tsx
import { Button } from "@/components/ui/button";
import { sendMallEvent } from "@/lib/api";
import { MallEvent } from "@/lib/types";

interface Props {
  label: string;
  event: MallEvent;
}

export default function MallEventButton({ label, event }: Props) {
  return (
    <Button className="w-full" onClick={() => sendMallEvent(event)}>
      {label}
    </Button>
  );
}
