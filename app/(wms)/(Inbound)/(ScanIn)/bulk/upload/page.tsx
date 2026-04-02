"use client";

import { InputSelectSearch } from "@/components/globals/additionals/Inputs";
import { FileText, FileUp } from "lucide-react";
import { useRef, useState } from "react";

const supplierOptions = [
    { label: "PT Sinar Abadi", value: "PT Sinar Abadi" },
    { label: "CV Mitra Karya", value: "CV Mitra Karya" },
    { label: "PT Bumi Logistik", value: "PT Bumi Logistik" },
    { label: "PT Nusa Distribusi", value: "PT Nusa Distribusi" },
    { label: "UD Makmur Jaya", value: "UD Makmur Jaya" },
];

const bulkTypeOptions = [
    { label: "Reguler", value: "reguler" },
    { label: "Sticker", value: "sticker" },
    { label: "Refurbish", value: "refurbish" },
];

export default function UploadBulkPage() {
    const [supplier, setSupplier] = useState<string>("");
    const [bulkType, setBulkType] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const isSupplierSelected = Boolean(supplier);
    const isBulkTypeSelected = Boolean(bulkType);
    const isFileSelected = Boolean(selectedFile);

    const clearSelectedFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleReset = () => {
        setSupplier("");
        setBulkType("");
        clearSelectedFile();
    };

    const handleUpload = () => {
        // TODO: Ganti dengan flow upload / API bulk yang sebenarnya.
        console.log("Upload bulk", {
            supplier,
            bulkType,
            fileName: selectedFile?.name,
        });
    };

    return (
        <div className="space-y-6">
            <form className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-800">Upload BULK</h2>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
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
                            onChange={(value) => setSupplier(String(value))}
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

                    <div
                        className={`rounded-xl border p-3 transition-all ${
                            isBulkTypeSelected
                                ? "border-blue-300 bg-blue-50/70"
                                : "border-slate-200 bg-slate-50/70"
                        }`}
                    >
                        <InputSelectSearch
                            label="Tipe Bulk"
                            options={bulkTypeOptions}
                            value={bulkType}
                            onChange={(value) => setBulkType(String(value))}
                            placeholder="Pilih tipe bulk..."
                        />
                        <p
                            className={`mt-2 text-xs font-semibold ${
                                isBulkTypeSelected ? "text-blue-700" : "text-slate-500"
                            }`}
                        >
                            {isBulkTypeSelected
                                ? `Tipe dipilih: ${bulkTypeOptions.find((item) => item.value === bulkType)?.label}`
                                : "Tipe bulk belum dipilih"}
                        </p>
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Upload File
                    </p>
                    <label
                        htmlFor="bulk-upload-file"
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
                        id="bulk-upload-file"
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
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                    <button
                        type="button"
                        disabled={!supplier || !bulkType || !selectedFile}
                        onClick={handleUpload}
                        className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:cursor-pointer hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                        Upload File
                    </button>
                </div>
            </form>
        </div>
    );
}