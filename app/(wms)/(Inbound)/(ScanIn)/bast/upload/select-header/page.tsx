"use client";

import RadioHeader from "@/components/globals/additionals/RadioHeader";
import { FileText, RotateCcw, CheckCheck } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Simulasi kolom header dari file yang di-upload
const fileColumnOptions = [
  { id: "col_a", label: "Column A", description: "Kolom pertama pada file" },
  { id: "col_b", label: "Column B", description: "Kolom kedua pada file" },
  { id: "col_c", label: "Column C", description: "Kolom ketiga pada file" },
  { id: "col_d", label: "Column D", description: "Kolom keempat pada file" },
  { id: "col_e", label: "Column E", description: "Kolom kelima pada file" },
  { id: "col_f", label: "Column F", description: "Kolom keenam pada file" },
];

// Simulasi nama file dari halaman upload sebelumnya
const uploadedFileName = "upload-premix-01.csv";

export default function SelectHeaderPage() {
  const router = useRouter();

  const [barcodeCol, setBarcodeCol] = useState<string | number>("");
  const [namaCol, setNamaCol] = useState<string | number>("");
  const [qtyCol, setQtyCol] = useState<string | number>("");
  const [hargaCol, setHargaCol] = useState<string | number>("");

  const allSelected = Boolean(barcodeCol && namaCol && qtyCol && hargaCol);

  const handleCancel = () => {
    router.push("/bast/upload");
  };

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">Mapping Header Kolom</h2>
        <p className="mt-0.5 text-sm text-slate-500">
          Tentukan kolom pada file yang sesuai dengan setiap data BAST
        </p>
      </div>

      {/* Info File */}
      <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 px-5 py-4">
        <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
          <FileText size={20} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-blue-500">File yang di-upload</p>
          <p className="text-sm font-semibold text-slate-800">{uploadedFileName}</p>
        </div>
      </div>

      {/* 4 Card RadioHeader */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
        <RadioHeader
          title="Kolom Barcode"
          subtitle="Pilih kolom yang berisi data barcode barang"
          options={fileColumnOptions}
          selectedValue={barcodeCol}
          onChange={setBarcodeCol}
        />
        <RadioHeader
          title="Kolom Nama"
          subtitle="Pilih kolom yang berisi nama barang"
          options={fileColumnOptions}
          selectedValue={namaCol}
          onChange={setNamaCol}
        />
        <RadioHeader
          title="Kolom Qty"
          subtitle="Pilih kolom yang berisi jumlah / kuantitas barang"
          options={fileColumnOptions}
          selectedValue={qtyCol}
          onChange={setQtyCol}
        />
        <RadioHeader
          title="Kolom Harga"
          subtitle="Pilih kolom yang berisi harga satuan barang"
          options={fileColumnOptions}
          selectedValue={hargaCol}
          onChange={setHargaCol}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-5 py-4 shadow-sm">
        <button
          type="button"
          onClick={handleCancel}
          className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition-all"
        >
          <RotateCcw size={15} />
          Batalkan Upload
        </button>

        <button
          type="button"
          disabled={!allSelected}
          onClick={() => {
            // next: proses mapping dan lanjut ke confirm / proses upload
          }}
          className="flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300 transition-all"
        >
          <CheckCheck size={15} />
          Selesai & Proses
        </button>
      </div>
    </div>
  );
}
