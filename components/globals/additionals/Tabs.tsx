"use client";

import React, { useState } from "react";

interface TabItem {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  align?: "left" | "center" | "right"; // Prop baru buat atur posisi
}

const Tabs = ({ items, align = "left" }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  // Mapping posisi ke class Tailwind
  const alignmentClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div 
        className={`flex border-b border-slate-200 overflow-x-auto no-scrollbar ${alignmentClasses[align]}`}
      >
        {items.map((tab, index) => {
          const isActive = activeTab === index;
          
          return (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`
                relative hover:cursor-pointer whitespace-nowrap px-6 py-3 text-sm font-semibold transition-all
                ${isActive 
                  ? "text-blue-400" 
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                }
              `}
            >
              {tab.label}
              
              {/* Indicator Line (Blue 400) */}
              {isActive && (
                <div className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-400 shadow-[0_1px_4px_rgba(96,165,250,0.5)]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content Area */}
      <div className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {items[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;