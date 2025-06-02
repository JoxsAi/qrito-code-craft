
import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  // Predefined colors
  const predefinedColors = [
    "#000000", // Black
    "#FFFFFF", // White
    "#8A3FFC", // Purple (QRito purple)
    "#1A56DB", // Blue
    "#10B981", // Green
    "#EF4444", // Red
    "#F59E0B", // Yellow
    "#EC4899", // Pink
    "#6366F1", // Indigo
    "#14B8A6", // Teal
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          <div
            className="w-9 h-9 rounded-md border border-gray-200"
            style={{ backgroundColor: color }}
          />
          <div className="text-sm">{color}</div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium mb-1 block">
              Pick a color
            </label>
            <input
              type="color"
              value={color}
              onChange={handleColorChange}
              className="w-full h-10 cursor-pointer"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">
              Predefined colors
            </label>
            <div className="grid grid-cols-5 gap-2">
              {predefinedColors.map((presetColor) => (
                <div
                  key={presetColor}
                  className={`w-8 h-8 rounded-md cursor-pointer border ${
                    color === presetColor ? "border-black shadow-sm" : "border-gray-200"
                  }`}
                  style={{ backgroundColor: presetColor }}
                  onClick={() => onChange(presetColor)}
                  aria-label={`Select color ${presetColor}`}
                />
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block" htmlFor="hex-input">
              Hex value
            </label>
            <input
              id="hex-input"
              type="text"
              value={color}
              onChange={handleColorChange}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
              pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
              placeholder="#000000"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
