"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface BarcodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  barcode: string;
  categoryName: string;
  discount: number;
  namaBarang: string;
  hargaRetail: number;
  hargaDiskon: number;
}

type Bar = { x: number; width: number };

const generateBarcodeBars = (code: string, scale: number) => {
  const bars: Bar[] = [];
  let x = 0;

  for (let i = 0; i < code.length; i++) {
    const charCode = code.charCodeAt(i);
    for (let b = 0; b < 3; b++) {
      const width = Math.max(1, Math.round((((charCode + b * 13) % 2) + 1) * scale));
      const gap = Math.max(1, Math.round(((charCode + b) % 2 === 0 ? 2 : 1) * scale));
      bars.push({ x, width });
      x += width + gap;
    }
  }

  return { bars, width: x + 2 };
};

const BarcodeVisual = ({
  code,
  scale = 2.1,
  className,
}: {
  code: string;
  scale?: number;
  className?: string;
}) => {
  const { bars, width } = generateBarcodeBars(code, scale);
  const barHeight = 36;
  const textY = 48;
  const svgHeight = 56;
  const safeTextWidth = Math.max(1, width - 8);

  return (
    <svg
      viewBox={`0 0 ${width} ${svgHeight}`}
      width="100%"
      height={svgHeight}
      preserveAspectRatio="none"
      className={className}
      style={{ display: "block", overflow: "hidden" }}
    >
      {bars.map((bar, i) => (
        <rect
          key={i}
          x={bar.x}
          y={0}
          width={bar.width}
          height={barHeight}
          fill="black"
        />
      ))}
      <text
        x={width / 2}
        y={textY}
        fontSize="9"
        textAnchor="middle"
        fontFamily="monospace"
        lengthAdjust="spacingAndGlyphs"
        textLength={safeTextWidth}
        fill="#334155"
      >
        {code}
      </text>
    </svg>
  );
};

const BarcodeModal = ({
  isOpen,
  onClose,
  barcode,
  categoryName,
  discount,
  namaBarang,
  hargaRetail,
  hargaDiskon,
}: BarcodeModalProps) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  if (!isOpen) return null;

  const truncatedName = namaBarang.length > 20 ? namaBarang.substring(0, 20) : namaBarang;
  const formatPrice = (value: number) => value.toLocaleString("id-ID");

  // Preview UI sengaja berbeda dari print agar tetap nyaman dibaca di modal.
  const renderPreviewLabel = () => (
    <div className="mx-auto w-full max-w-md">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        Preview UI (bukan ukuran cetak)
      </p>

      <div className="rounded border border-slate-300 bg-white p-3 shadow-sm">
        <div className={categoryName ? "grid grid-cols-[1fr_auto] items-start gap-3" : "block"}>
          <div className="overflow-hidden rounded border border-slate-100 bg-white px-2 py-1">
            <BarcodeVisual code={barcode} scale={2.1} />
          </div>

          {categoryName && (
            <div className="min-w-19.5 border border-slate-800 px-2 py-1 text-center">
              <p className="text-[9px] font-bold uppercase leading-tight text-slate-800">
                {categoryName}
              </p>
              <p className="text-[9px] font-bold text-slate-800">({discount}%)</p>
            </div>
          )}
        </div>

        <div className="my-2 border-t border-slate-200" />

        <div className="space-y-1">
          <p className="text-[10px] text-slate-600">{truncatedName}</p>
          <div className="flex items-center gap-1.5">
            <span className="w-20 text-[10px] font-semibold text-slate-700">Harga Retail</span>
            <span className="text-[10px] text-slate-400">:</span>
            <span className="text-[10px] text-slate-400 line-through">
              Rp {hargaRetail.toLocaleString("id-ID")}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-20 text-[10px] font-semibold text-slate-700">Harga Diskon</span>
            <span className="text-[10px] text-slate-400">:</span>
            <span className="text-[10px] font-bold text-slate-800">
              Rp {hargaDiskon.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const PRINT_STYLES = `
    @page { size: 7cm 4cm; margin: 0; }
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      width: 7cm;
      height: 4cm;
      font-family: Arial, sans-serif;
      overflow: hidden;
    }
    .print-root {
      width: 7cm;
      height: 4cm;
      overflow: hidden;
    }
    .label {
      box-sizing: border-box;
      width: 7cm;
      height: 4cm;
      padding: 0.16cm 0.2cm;
      border: 1px solid #cbd5e1;
      color: #0f172a;
      display: flex;
      flex-direction: column;
      gap: 0.06cm;
    }
    .row-top {
      display: grid;
      grid-template-columns: 1fr 1.7cm;
      align-items: flex-start;
      gap: 0.12cm;
      width: 100%;
    }
    .barcode-wrap {
      border: 1px solid #e2e8f0;
      border-radius: 2px;
      padding: 0.03cm 0.05cm;
      overflow: hidden;
      min-width: 0;
    }
    .barcode-svg {
      width: 100%;
      height: 1.45cm;
      display: block;
    }
    .category {
      border: 1px solid #1e293b;
      width: 1.7cm;
      text-align: center;
      font-size: 9px;
      font-weight: 700;
      padding: 0.07cm 0.08cm;
      line-height: 1.2;
    }
    .divider {
      border-top: 1px solid #e2e8f0;
      margin: 0.01cm 0 0.03cm;
    }
    .name {
      font-size: 10px;
      color: #475569;
      margin-bottom: 0.02cm;
      line-height: 1.2;
    }
    .line {
      display: flex;
      align-items: center;
      gap: 0.08cm;
      font-size: 9px;
      margin-bottom: 0.02cm;
      line-height: 1.15;
    }
    .label-key {
      width: 1.55cm;
      font-weight: 700;
      color: #1e293b;
    }
    .strike {
      text-decoration: line-through;
      color: #64748b;
    }
    .bold {
      font-weight: 700;
      color: #0f172a;
    }
  `;

  const buildPrintBarcodeSvg = () => {
    const { bars, width } = generateBarcodeBars(barcode, 1.8);
    const safeTextWidth = Math.max(1, width - 6);
    const svgBars = bars
      .map(
        (bar) =>
          `<rect x="${bar.x}" y="0" width="${bar.width}" height="40" fill="black" />`,
      )
      .join("");

    return `
      <svg class="barcode-svg" viewBox="0 0 ${width} 58" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        ${svgBars}
        <text x="${width / 2}" y="53" font-size="9" text-anchor="middle" font-family="monospace" lengthAdjust="spacingAndGlyphs" textLength="${safeTextWidth}" fill="#334155">${barcode}</text>
      </svg>
    `;
  };

  const buildPrintBody = () => {
    const barcodeSvg = buildPrintBarcodeSvg();

    return `
      <div class="print-root">
        <div class="label">
        <div class="row-top" style="${categoryName ? '' : 'grid-template-columns: 1fr;'}">
          <div class="barcode-wrap">${barcodeSvg}</div>
          ${categoryName ? `<div class="category"><div>${categoryName}</div><div>(${discount}%)</div></div>` : ''}
        </div>
        <div class="divider"></div>
        <div class="name">${truncatedName}</div>
        <div class="line">
          <span class="label-key">Harga Retail</span>
          <span>:</span>
          <span class="strike">Rp ${formatPrice(hargaRetail)}</span>
        </div>
        <div class="line">
          <span class="label-key">Harga Diskon</span>
          <span>:</span>
          <span class="bold">Rp ${formatPrice(hargaDiskon)}</span>
        </div>
        </div>
      </div>
    `;
  };

  const buildPrintHtml = () => {
    const body = buildPrintBody();

    return `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Print Barcode</title>
          <style>${PRINT_STYLES}</style>
        </head>
        <body>${body}</body>
      </html>
    `;
  };

  // Method 2: print khusus dengan layout fix 7cm x 4cm
  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "width=420,height=280");
    if (!printWindow) return;

    printWindow.document.open();
    printWindow.document.write(buildPrintHtml());
    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-sm bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Preview Barcode</h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body - Label Preview */}
        <div className="p-5">
          {renderPreviewLabel()}
        </div>

        {/* Footer */}
        <div className="flex gap-2 px-5 pb-5">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg border border-slate-300 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 px-4 py-2 rounded-lg bg-blue-500 text-sm font-semibold text-white hover:bg-blue-600 transition-colors"
          >
            Cetak
          </button>
        </div>
      </div>
    </div>
  );
};

export default BarcodeModal;
