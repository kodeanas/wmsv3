"use client";

import React, { useState, useEffect, useRef } from "react";
import { ScanBarcode, Loader2, CheckCircle2 } from "lucide-react";

interface ScannerCardProps {
  title: string;
  placeholder?: string;
  onScanComplete: (value: string) => void;
  className?: string;
}

const ScannerCard = ({ 
  title, 
  placeholder = "Scan barcode di sini...", 
  onScanComplete,
  className 
}: ScannerCardProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Timer buat deteksi berhenti ngetik (Debounce 1 detik)
    const timeoutId = setTimeout(() => {
      if (inputValue && !isProcessing) {
        handleProcessScan();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const handleProcessScan = async () => {
    setIsProcessing(true);
    
    // Animasi Load 2 Detik (Simulasi Proses)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
    onScanComplete(inputValue);

    // Reset state setelah sukses biar bisa scan lagi
    setTimeout(() => {
      setIsSuccess(false);
      setInputValue("");
      inputRef.current?.focus();
    }, 1500);
  };

  return (
    <div className={`overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all ${isProcessing ? 'ring-4 ring-blue-50 border-blue-400' : ''} ${className}`}>
      {/* Header Scan */}
      <div className="flex items-center gap-3 bg-slate-50/50 p-4 border-b border-slate-100">
        <div className={`p-2 rounded-lg ${isProcessing ? 'bg-blue-400 text-white animate-pulse' : 'bg-white text-blue-400 border border-slate-200'}`}>
          <ScanBarcode size={20} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Scanner Mode</p>
          <h3 className="text-sm font-bold text-slate-700">{title}</h3>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            disabled={isProcessing}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            className={`
              w-full rounded-2xl border-2 p-4 pt-8 text-xl font-mono font-bold transition-all outline-none
              ${isProcessing ? 'border-blue-400 bg-blue-50/30 text-blue-600' : 'border-slate-100 bg-slate-50 text-slate-700 focus:border-blue-400 focus:bg-white'}
              ${isSuccess ? 'border-emerald-400 bg-emerald-50 text-emerald-600' : ''}
            `}
          />
          
          {/* Label Floating */}
          <span className="absolute left-4 top-3 text-[10px] font-black uppercase tracking-tighter text-slate-400">
            Input Barcode / SKU
          </span>

          {/* Status Icons */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {isProcessing && <Loader2 className="h-6 w-6 animate-spin text-blue-400" />}
            {isSuccess && <CheckCircle2 className="h-6 w-6 text-emerald-500 animate-in zoom-in" />}
          </div>
        </div>

        {/* Info Helper */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs font-medium text-slate-400">
            {isProcessing ? "Sedang memproses data..." : isSuccess ? "Berhasil diverifikasi!" : "Arahkan scanner atau ketik manual"}
          </p>
          {inputValue && !isProcessing && !isSuccess && (
             <span className="text-[10px] font-bold text-blue-400 animate-pulse">Menunggu jeda 1 detik...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScannerCard;