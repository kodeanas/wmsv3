import React, { ReactNode, useRef } from "react";
import { Filter, RotateCcw } from "lucide-react";

interface StatsSectionWrapperProps {
  title: string;
  description?: string;
  children: ReactNode;
  onFilterChange?: (startDate: string, endDate: string) => void;
  onApplyFilter?: () => void;
  onResetFilter?: () => void;
  className?: string; // Tambahan prop buat custom spacing luar
}

const StatsSectionWrapper = ({
  title,
  description,
  children,
  onFilterChange,
  onApplyFilter,
  onResetFilter,
  className = "",
}: StatsSectionWrapperProps) => {
  const startInputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);

  const handleReset = () => {
    if (startInputRef.current) startInputRef.current.value = "";
    if (endInputRef.current) endInputRef.current.value = "";
    if (onResetFilter) onResetFilter();
  };

  return (
    <section className={`space-y-6 ${className}`}>
      {/* --- Filter Bar Header --- */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-white p-5 rounded-xl shadow-sm border border-slate-200">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h2>
          {description && <p className="text-sm text-slate-500">{description}</p>}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 group">
            <input
              ref={startInputRef}
              type="date"
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              onChange={(e) => onFilterChange?.(e.target.value, endInputRef.current?.value || "")}
            />
            <span className="text-slate-400 font-medium text-xs">s/d</span>
            <input
              ref={endInputRef}
              type="date"
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              onChange={(e) => onFilterChange?.(startInputRef.current?.value || "", e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2.5 text-slate-500 transition-all hover:bg-slate-50 hover:text-blue-400 active:scale-95"
              title="Reset Filter"
            >
              <RotateCcw size={18} />
            </button>

            <button
              onClick={onApplyFilter}
              className="flex items-center gap-2 rounded-lg bg-blue-400 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-500 active:scale-95 shadow-md shadow-blue-100"
            >
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* --- Content Area (Bebas Atur Grid di Sini) --- */}
      <div>
        {children}
      </div>
    </section>
  );
};

export default StatsSectionWrapper;