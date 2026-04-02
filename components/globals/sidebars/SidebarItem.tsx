// components/globals/sidebars/SidebarItem.tsx
"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link'; // Import ini Nas
import { usePathname } from 'next/navigation'; // Untuk deteksi menu aktif otomatis

interface SubItem {
  label: string;
  href: string;
}

interface SidebarItemProps {
  label: string;
  href?: string; // Tambahin href opsional buat menu utama
  isActive?: boolean;
  subItems?: SubItem[];
  isChild?: boolean;
}

export const SidebarItem = ({ label, href, isActive, subItems, isChild }: SidebarItemProps) => {
  const pathname = usePathname();
  const hasSubItems = subItems && subItems.length > 0;
  
  // Logic: Kalau menu ini atau salah satu sub-itemnya aktif, otomatis kebuka
  const isAnySubActive = subItems?.some(sub => pathname === sub.href);
  const [isOpen, setIsOpen] = useState(isAnySubActive || isActive);

  const activeClass = "bg-blue-50 text-blue-600 font-bold";
  const idleClass = "text-gray-500 hover:bg-gray-50 font-semibold";

  // Wrapper untuk konten menu
  const MenuContent = (
    <div
      className={`group flex items-center justify-between w-full px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
        (pathname === href || (isActive && !hasSubItems)) ? activeClass : idleClass
      } ${isChild ? 'pl-12 py-2 text-sm font-bold' : 'text-[15px]'}`}
    >
      <span>{label}</span>
      {hasSubItems && (
        <ChevronDown 
          size={18} 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : 'text-gray-400'}`} 
        />
      )}
    </div>
  );

  return (
    <div className="w-full">
      {hasSubItems ? (
        // Kalau punya sub-menu, cuma buat toggle dropdown
        <div onClick={() => setIsOpen(!isOpen)}>{MenuContent}</div>
      ) : (
        // Kalau menu biasa, bungkus pakai Link
        <Link href={href || "#"}>{MenuContent}</Link>
      )}

      {hasSubItems && isOpen && (
        <div className="mt-1 relative flex flex-col">
          <div className="absolute left-6 top-0 bottom-4 w-[1.5px] bg-gray-100 rounded-full" />
          {subItems.map((sub, idx) => (
            <div key={idx} className="relative">
              <div className="absolute left-6 top-4 w-4 h-[1.5px] bg-gray-100" />
              {/* Rekursif panggil diri sendiri buat sub-item */}
              <SidebarItem 
                label={sub.label} 
                href={sub.href} 
                isChild 
                isActive={pathname === sub.href}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};