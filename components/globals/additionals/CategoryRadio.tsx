"use client";

import React from "react";

interface RadioOption {
  id: string | number;
  title: string;
  subTitle: string; // Misal: "CATEGORY"
  valueText: string; // Misal: "Rp 300.000"
  valueLabel: string; // Misal: "MAX LIMIT"
  percentage: string; // Misal: "40%"
}

interface RadioCardGroupProps {
  options: RadioOption[];
  selectedValue: string | number;
  onChange: (id: string | number) => void;
  className?: string;
}

const RadioCardGroup = ({ options, selectedValue, onChange, className }: RadioCardGroupProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 ${className}`}>
      {options.map((option) => {
        const isSelected = selectedValue === option.id;

        return (
          <div
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`
              relative cursor-pointer rounded-2xl border-2 p-5 transition-all duration-200
              ${isSelected 
                ? "border-blue-500 bg-white shadow-lg shadow-blue-100" 
                : "border-slate-100 bg-white hover:border-slate-200"
              }
            `}
          >
            {/* Row Atas: SubTitle & Percentage */}
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? 'text-blue-500' : 'text-slate-400'}`}>
                {option.subTitle}
              </span>
              <div className={`px-3 py-1 rounded-lg text-xs font-black ${isSelected ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                {option.percentage}
              </div>
            </div>

            {/* Title Utama */}
            <h3 className="text-lg font-bold text-slate-800 mb-4">{option.title}</h3>

            {/* Row Bawah: Value & Selected Indicator */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-0.5">
                  {option.valueLabel}
                </p>
                <p className={`text-sm font-bold ${isSelected ? 'text-blue-500' : 'text-slate-700'}`}>
                  {option.valueText}
                </p>
              </div>

              {isSelected && (
                <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                  <span className="text-[10px] font-black text-blue-500 uppercase italic">Selected</span>
                  <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RadioCardGroup;