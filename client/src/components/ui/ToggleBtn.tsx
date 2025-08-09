import React from "react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function ToggleSwitch({ checked, onChange }: ToggleSwitchProps) {
  return (
    <label className="relative inline-block w-[3.5em] h-[2em]">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange(!checked)}
        className="hidden"
      />
      <span
        className={`absolute top-0 left-0 w-full h-full rounded-full transition-all duration-300 ease-in-out ${
          checked ? "bg-[#4296f4]" : "bg-[#cccccc]"
        }`}
      >
        <span
          className={`absolute top-[calc((2em-1.5em)/2)] bg-white rounded-full transition-all duration-300 ease-in-out shadow-[10px_0_40px_rgba(0,0,0,0.1)] ${
            checked
              ? "translate-x-[calc(3.5em-1.5em-(calc((2em-1.5em)/2)))] shadow-[-10px_0_40px_rgba(0,0,0,0.1)]"
              : "translate-x-[calc((2em-1.5em)/2)]"
          } w-[1.5em] h-[1.5em]`}
        />
      </span>
    </label>
  );
}
