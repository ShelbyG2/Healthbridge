import React from "react";

const colors = [
  "bg-[#4c86f9]",
  "bg-[#49a84c]",
  "bg-[#f6bb02]",
  "bg-[#f6bb02]",
  "bg-[#2196f3]",
];

export const LoadSpinner = () => (
  <div className="flex justify-center items-center w-[100px] h-[100px] gap-[6px]">
    {colors.map((color, i) => (
      <span
        key={i}
        className={`w-[4px] h-[50px] ${color} animate-scale`}
        style={{
          animationDelay: `${-0.9 + i * 0.1}s`,
          animationDuration: "0.9s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
        }}
      />
    ))}
  </div>
);

export default LoadSpinner;