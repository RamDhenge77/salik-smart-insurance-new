
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FrequencySelectorProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const FrequencySelector = ({ id, label, value, onChange }: FrequencySelectorProps) => {
  return (
    <div className="mb-4">
      <Label htmlFor={id} className="text-sm font-medium mb-1 block">
        {label}
      </Label>
      <Select value={value.toString()} onValueChange={(val) => onChange(Number(val))}>
        <SelectTrigger id={id} className="w-full bg-white">
          <SelectValue placeholder="Select frequency" />
        </SelectTrigger>
        <SelectContent>
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <SelectItem key={num} value={num.toString()}>
              {num} day{num !== 1 ? "s" : ""}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FrequencySelector;
