import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (d: Date) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ date, setDate }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="w-40 justify-start text-left font-normal bg-background text-foreground border border-muted/50"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "yyyy-MM-dd") : <span>Pick a deadline</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            if (!d) return;
            const year = d.getFullYear().toString();
            if (year.length > 4) return; // Prevent unrealistic year
            setDate(d);
            setOpen(false); // close popover after selecting
          }}
          disabled={(d) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // normalize to midnight
            return d < today;
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
