"use client";

import React from "react";

export interface RadioHeaderOption {
  id: string | number;
  label: string;
  description?: string;
}

interface RadioHeaderProps {
  title: string;
  subtitle?: string;
  options: RadioHeaderOption[];
  selectedValue: string | number;
  onChange: (id: string | number) => void;
  className?: string;
}

const RadioHeader = ({
  title,
  subtitle,
  options,
  selectedValue,
  onChange,
  className,
}: RadioHeaderProps) => {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden ${className}`}>
      {/* Title Card */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
        <h3 className="text-base font-bold text-slate-800">{title}</h3>
        {subtitle && (
          <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
        )}
      </div>

      {/* Radio List */}
      <ul className="divide-y divide-slate-50">
        {options.map((option) => {
          const isSelected = selectedValue === option.id;

          return (
            <li
              key={option.id}
              onClick={() => onChange(option.id)}
              className={`flex cursor-pointer items-center gap-4 px-6 py-4 transition-all ${
                isSelected
                  ? "bg-blue-50/60"
                  : "hover:bg-slate-50"
              }`}
            >
              {/* Radio Circle */}
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                  isSelected
                    ? "border-blue-500 bg-blue-500"
                    : "border-slate-300 bg-white"
                }`}
              >
                {isSelected && (
                  <div className="h-2 w-2 rounded-full bg-white shadow-inner" />
                )}
              </div>

              {/* Label & Description */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-semibold truncate ${
                    isSelected ? "text-blue-700" : "text-slate-700"
                  }`}
                >
                  {option.label}
                </p>
                {option.description && (
                  <p className="mt-0.5 text-xs text-slate-400 truncate">
                    {option.description}
                  </p>
                )}
              </div>

              {/* Selected Badge */}
              {isSelected && (
                <span className="shrink-0 rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-blue-600 animate-in fade-in zoom-in duration-200">
                  Dipilih
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RadioHeader;
