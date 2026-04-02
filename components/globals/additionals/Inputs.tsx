"use client";

import { Check, ChevronDown, Search, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface BaseInputProps {
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: any;
  value?: any;
  onChange?: (e: React.ChangeEvent<any>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps extends BaseInputProps {
  options: SelectOption[];
}

export const InputSelect = ({ label, options, className, ...props }: SelectProps) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
      {label}
    </label>
    <div className="relative">
      <select
        {...props}
        className="w-full appearance-none rounded-xl border border-slate-200 bg-white p-3 pr-10 text-sm font-medium text-slate-700 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all cursor-pointer"
      >
        <option value="" disabled selected>Pilih {label}...</option>
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      
      {/* Icon Panah Custom biar cakep */}
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </div>
    </div>
  </div>
);

export const InputSelectSearch = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Cari data...",
  className,
}: {
  label: string;
  options: { label: string; value: string | number }[];
  value: any;
  onChange: (val: any) => void;
  placeholder?: string;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUp, setIsUp] = useState(false); // State untuk menentukan arah
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Logika Smart Positioning
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = 300; // Estimasi tinggi maksimum dropdown

      // Jika ruang di bawah < 300px, buka ke atas
      if (spaceBelow < dropdownHeight) {
        setIsUp(true);
      } else {
        setIsUp(false);
      }
    }
  }, [isOpen]);

  // Close dropdown kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase())
  );

  const selectedLabel = options.find((opt) => opt.value === value)?.label || "";

  return (
    <div className={`flex flex-col gap-1.5 relative ${className}`} ref={containerRef}>
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
        {label}
      </label>

      {/* Trigger Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between w-full rounded-xl border p-3 text-sm cursor-pointer transition-all bg-white
          ${isOpen ? "border-blue-400 ring-4 ring-blue-50" : "border-slate-200"}
        `}
      >
        <span className={selectedLabel ? "text-slate-700 font-medium" : "text-slate-400"}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown Menu - Posisi Dinamis */}
      {isOpen && (
        <div
          className={`
            absolute left-0 w-full bg-white border border-slate-100 rounded-2xl shadow-2xl z-[1001] overflow-hidden 
            animate-in fade-in zoom-in-95 duration-150
            ${isUp ? "bottom-[calc(100%+8px)] origin-bottom" : "top-[calc(100%+8px)] origin-top"}
          `}
        >
          {/* Search Field */}
          <div className="p-2 border-b border-slate-50 flex items-center gap-2 bg-slate-50/50">
            <Search size={14} className="text-slate-400 ml-2" />
            <input
              autoFocus
              className="w-full bg-transparent p-2 text-sm outline-none font-medium text-slate-600"
              placeholder="Ketik untuk mencari..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <X
                size={14}
                className="text-slate-400 cursor-pointer mr-2 hover:text-red-400"
                onClick={() => setQuery("")}
              />
            )}
          </div>

          {/* List Options */}
          <div className="max-h-[200px] overflow-y-auto no-scrollbar py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                    setQuery("");
                  }}
                  className={`
                    flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer transition-colors
                    ${opt.value === value ? "bg-blue-50 text-blue-500 font-bold" : "text-slate-600 hover:bg-slate-50"}
                  `}
                >
                  {opt.label}
                  {opt.value === value && <Check size={14} />}
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-xs text-slate-400 italic">
                Data tidak ditemukan...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Format Rupiah
const formatIDR = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const InputText = ({ label, className, ...props }: BaseInputProps) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
      {label}
    </label>
    <input
      {...props}
      type="text"
      // props di atas sudah mencakup value, defaultValue, onChange, dll.
      className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
    />
  </div>
);

export const InputTextArea = (props: BaseInputProps & { rows?: number }) => (
  <div className={`flex flex-col gap-1.5 ${props.className}`}>
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
      {props.label}
    </label>
    <textarea
      {...props}
      rows={props.rows || 3}
      className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all resize-none"
    />
  </div>
);

export const InputDate = (props: BaseInputProps) => (
  <div className={`flex flex-col gap-1.5 ${props.className}`}>
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
      {props.label}
    </label>
    <input
      {...props}
      type="date"
      className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
    />
  </div>
);

export const InputRupiah = (props: BaseInputProps) => (
  <div className={`flex flex-col gap-1.5 ${props.className}`}>
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
      {props.label}
    </label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
        Rp
      </span>
      <input
        {...props}
        type="number"
        className="w-full rounded-xl border border-slate-200 p-3 pl-10 text-sm font-bold text-slate-700 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
      />
    </div>
    {props.value && (
      <p className="text-[10px] font-bold text-blue-500 italic">
        Terbaca: {formatIDR(Number(props.value))}
      </p>
    )}
  </div>
);

// Component Info (Buat nampilin detail di Pop-up)
export const InfoDisplay = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex flex-col gap-0.5 py-2 border-b border-slate-50 last:border-0">
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
      {label}
    </span>
    <span className="text-sm font-semibold text-slate-700">{value || "-"}</span>
  </div>
);


export interface NumberInputProps extends BaseInputProps {
  prefix?: string;
  suffix?: string;
}

export const InputNumber = ({
  label,
  prefix,
  suffix,
  className,
  onChange,
  ...props
}: NumberInputProps) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Hapus semua yang bukan angka
    const val = e.target.value.replace(/\D/g, "");
    
    if (onChange) {
      // Kita kirim balik event dengan value yang sudah bersih
      e.target.value = val;
      onChange(e);
    }
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative flex items-center">
        {/* Render Prefix jika ada */}
        {prefix && (
          <span className="absolute left-3 text-sm font-bold text-slate-400 select-none">
            {prefix}
          </span>
        )}

        <input
          {...props}
          type="number"
          inputMode="numeric" // Biar di HP muncul keyboard angka
          pattern="[0-9]*"    // Validasi tambahan browser
          onChange={handleChange}
          className={`
            w-full rounded-xl border border-slate-200 p-3 text-sm font-bold text-slate-700 
            focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all
            ${prefix ? "pl-10" : "pl-4"}
            ${suffix ? "pr-12" : "pr-4"}
          `}
        />

        {/* Render Suffix jika ada */}
        {suffix && (
          <span className="absolute right-3 text-sm font-bold text-slate-400 select-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};

export const InputColor = ({ label, className, value, onChange, ...props }: BaseInputProps) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative group">
        {/* Preview Lingkaran Warna di sebelah kiri */}
        <div 
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border border-slate-200 shadow-sm transition-transform group-hover:scale-110"
          style={{ backgroundColor: value || "#3b82f6" }}
        />
        
        <input
          {...props}
          type="text"
          value={value}
          onChange={onChange}
          placeholder="#000000"
          className="w-full rounded-xl border border-slate-200 p-3 pl-10 pr-12 text-sm font-bold text-slate-700 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
        />

        {/* Hidden Native Color Picker Trigger */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
          <input
            type="color"
            value={value || "#3b82f6"}
            onChange={onChange}
            className="w-8 h-8 p-0 border-0 bg-transparent cursor-pointer appearance-none [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-slate-200"
          />
        </div>
      </div>
      
      {/* Kode Hex Helper */}
      <p className="text-[10px] font-bold text-slate-400 italic">
        Format: HEX (Contoh: #FF5733)
      </p>
    </div>
  );
};