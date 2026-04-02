"use client";

import React from "react";
import { ShoppingBag } from "lucide-react";

interface SelectedCategoryInfoProps {
  title: string;
  description: string;
  categoryName: string;
  discount: string;
}

const SelectedCategoryInfo = ({ 
  title, 
  description, 
  categoryName, 
  discount 
}: SelectedCategoryInfoProps) => {
  return (
    <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-4">
        {/* Icon Box */}
        <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm text-blue-500">
          <ShoppingBag size={24} />
        </div>
        
        {/* Text Area */}
        <div>
          <h4 className="text-sm font-bold text-slate-800 leading-tight">
            {title}
          </h4>
          <p className="text-xs font-medium text-slate-400 mt-0.5">
            {description}
          </p>
        </div>
      </div>

      {/* Right Section (Status & Value) */}
      <div className="flex items-center gap-8 pr-4">
        {/* Category Label */}
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
            KATEGORI
          </p>
          <p className="text-sm font-black text-blue-600 uppercase italic">
            {categoryName}
          </p>
        </div>

        {/* Vertical Divider */}
        <div className="h-10 w-[1px] bg-slate-100" />

        {/* Discount Label */}
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
            DISKON
          </p>
          <p className="text-lg font-black text-indigo-500 italic">
            {discount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectedCategoryInfo;