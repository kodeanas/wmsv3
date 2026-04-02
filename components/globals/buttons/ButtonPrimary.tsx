"use client";

import React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react"; // Buat efek loading kalau perlu

interface ButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "danger" | "success" | "warning" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string; // Buat tambahan styling mendadak
}

const Button = ({
  label,
  onClick,
  href,
  type = "button",
  variant = "primary",
  size = "md",
  icon,
  isLoading = false,
  disabled = false,
  className = "",
}: ButtonProps) => {
  
  // Mapping Warna (Blue 400 tetap jagoan utamanya)
  const variants = {
    primary: "bg-blue-400 text-white hover:bg-blue-500 shadow-md shadow-blue-400/20",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-500/20",
    success: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-500/20",
    warning: "bg-amber-500 text-white hover:bg-amber-600 shadow-md shadow-amber-500/20",
    outline: "border-2 border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-400",
    ghost: "text-slate-500 hover:bg-slate-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs font-bold",
    md: "px-5 py-2.5 text-sm font-bold",
    lg: "px-8 py-3.5 text-base font-extrabold",
  };

  const baseStyle = `
    inline-flex items-center justify-center gap-2 rounded-xl transition-all 
    active:scale-95 disabled:opacity-50 disabled:pointer-events-none 
    ${variants[variant]} ${sizes[size]} ${className}
  `;

  // Konten di dalam button (Icon + Label + Loading)
  const content = (
    <>
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
      <span>{label}</span>
    </>
  );

  // Jika ada href, render sebagai Link Next.js
  if (href && !disabled) {
    return (
      <Link href={href} className={baseStyle}>
        {content}
      </Link>
    );
  }

  // Jika tidak ada href, render sebagai Button biasa
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={baseStyle}
      suppressHydrationWarning // Jaga-jaga buat error browser tadi
    >
      {content}
    </button>
  );
};

export default Button;