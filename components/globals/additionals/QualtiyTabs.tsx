"use client";

import React, { useState, useEffect } from "react";

interface QualityTabItem {
  id: string; // value yang bakal dikirim (good, damaged, dll)
  label: string;
  content: React.ReactNode;
  color?: string; // custom warna indicator per tab
}

interface QualityTabsProps {
  items: QualityTabItem[];
  onChange: (selectedId: string, label: string) => void;
  defaultValue?: string;
}

const QualityTabs = ({ items, onChange, defaultValue }: QualityTabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue || items[0].id);

  // Trigger onChange pertama kali buat inisialisasi data di parent
  useEffect(() => {
    const current = items.find((item) => item.id === activeTab);
    if (current) onChange(current.id, current.label);
  }, []);

  const handleTabClick = (item: QualityTabItem) => {
    setActiveTab(item.id);
    onChange(item.id, item.label); // Kirim data ke parent
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Tab Headers - Dibuat rata tengah */}
      <div className="flex justify-center border-b border-slate-100 bg-slate-50/50 p-4">
        <div className="flex w-fit rounded-2xl bg-slate-100 p-1.5">
          {items.map((item) => {
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleTabClick(item)}
                className={`
                  rounded-xl px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all
                  ${isActive 
                    ? "bg-white shadow-sm text-blue-400" 
                    : "text-slate-400 hover:text-slate-600"
                  }
                `}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content (Input dinamis sesuai kondisi) */}
      <div className="animate-in fade-in slide-in-from-bottom-2 p-6 duration-300">
        {items.find((item) => item.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default QualityTabs;