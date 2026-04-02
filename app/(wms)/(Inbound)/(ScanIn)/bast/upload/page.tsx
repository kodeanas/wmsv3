"use client";

import { InputSelectSearch } from "@/components/globals/additionals/Inputs";
import { FileUp, FileText } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const supplierOptions = [
  { label: "PT Sinar Abadi", value: "PT Sinar Abadi" },
  { label: "CV Mitra Karya", value: "CV Mitra Karya" },
  { label: "PT Bumi Logistik", value: "PT Bumi Logistik" },
  { label: "PT Nusa Distribusi", value: "PT Nusa Distribusi" },
  { label: "UD Makmur Jaya", value: "UD Makmur Jaya" },
];

export default function UploadBASTPage() {
  const [supplier, setSupplier] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const isSupplierSelected = Boolean(supplier);
  const isFileSelected = Boolean(selectedFile);

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <form className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Upload BAST</h2>
        </div>

        <div
          className={`rounded-xl border p-3 transition-all ${
            isSupplierSelected
              ? "border-emerald-300 bg-emerald-50/70"
              : "border-slate-200 bg-slate-50/70"
          }`}
        >
          <InputSelectSearch
            label="Supplier"
            options={supplierOptions}
            value={supplier}
            onChange={(val) => setSupplier(String(val))}
            placeholder="Cari supplier..."
          />
          <p
            className={`mt-2 text-xs font-semibold ${
              isSupplierSelected ? "text-emerald-700" : "text-slate-500"
            }`}
          >
            {isSupplierSelected
              ? `Supplier dipilih: ${supplier}`
              : "Supplier belum dipilih"}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Upload File
          </p>
          <label
            htmlFor="bast-upload-file"
            className={`group flex h-80 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 text-center transition-all ${
              isFileSelected
                ? "border-emerald-300 bg-emerald-50/60"
                : "border-blue-200 bg-blue-50/40 hover:border-blue-400 hover:bg-blue-50"
            }`}
          >
            <div
              className={`mb-3 rounded-full p-4 transition-all group-hover:scale-105 ${
                isFileSelected
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              <FileUp size={28} />
            </div>
            {isFileSelected ? (
              <>
                <p className="text-base font-semibold text-emerald-700">
                  File siap di-upload
                </p>
                <p className="mt-1 text-sm text-emerald-600">
                  Kamu masih bisa ganti file dengan klik area ini
                </p>
              </>
            ) : (
              <>
                <p className="text-base font-semibold text-slate-700">
                  Klik untuk pilih file atau drag and drop di sini
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Format yang didukung: .xlsx, .xls, .csv
                </p>
              </>
            )}

            {selectedFile && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                <FileText size={16} />
                <span>{selectedFile.name}</span>
              </div>
            )}
          </label>

          <input
            ref={fileInputRef}
            id="bast-upload-file"
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          />

          {selectedFile && (
            <div className="flex justify-end">
              <button
                type="button"
                className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                onClick={clearSelectedFile}
              >
                Cancel File
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            onClick={() => {
              setSupplier("");
              clearSelectedFile();
            }}
          >
            Reset
          </button>
          <button
            type="button"
            disabled={!supplier || !selectedFile}
            onClick={() => router.push("/bast/upload/select-header")}
            className="rounded-lg hover:cursor-pointer bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Upload File
          </button>
        </div>
      </form>
    </div>
  );
}
