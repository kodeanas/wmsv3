"use client";

import { useState } from "react";
import ScannerCard from "@/components/globals/additionals/ScannerCard";
import CardKeyValueHorizontal from "@/components/globals/cards/CardKeyValueHorizontal";
import QualityTabs from "@/components/globals/additionals/QualtiyTabs";
import RadioCardGroup from "@/components/globals/additionals/CategoryRadio";
import { formatRibuan } from "@/helper/formatRibuan";

interface ScannedData {
  barcodeAsal: string;
  nama: string;
  qty: number;
  harga: number;
  barcodeGudang: string;
  namaGudang: string;
  qtyGudang: number;
  hargaGudang: number;
  sticker?: "Big" | "Small" | "Tiny";
}

const mockDB: Record<string, ScannedData> = {
  "899100110001": {
    barcodeAsal: "899100110001",
    nama: "Premix Ayam 1 Kg",
    qty: 24,
    harga: 75000,
    barcodeGudang: "WH-220011",
    namaGudang: "Premix Ayam 1 Kg",
    qtyGudang: 24,
    hargaGudang: 77000,
    sticker: "Small",
  },
  "899100110002": {
    barcodeAsal: "899100110002",
    nama: "Premix Ayam 5 Kg",
    qty: 12,
    harga: 210000,
    barcodeGudang: "WH-220012",
    namaGudang: "Premix Ayam 5 Kg",
    qtyGudang: 12,
    hargaGudang: 214000,
  },
  "899100110003": {
    barcodeAsal: "899100110003",
    nama: "Premix Sapi 1 Kg",
    qty: 18,
    harga: 82000,
    barcodeGudang: "WH-220013",
    namaGudang: "Premix Sapi 1 Kg",
    qtyGudang: 18,
    hargaGudang: 83500,
    sticker: "Big",
  },
};

const mockCategories = [
  {
    id: "feed",
    name: "Feed",
    discount: "0%",
  },
  {
    id: "supplement",
    name: "Supplement",
    discount: "5%",
  },
  {
    id: "vitamin",
    name: "Vitamin",
    discount: "10%",
  },
  {
    id: "medicine",
    name: "Medicine",
    discount: "15%",
  },
];

export default function ScannerBASTPage() {
  const [scannedData, setScannedData] = useState<ScannedData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | number>("feed");
  const [notes, setNotes] = useState({
    abnormal: "",
    damaged: "",
    non: "",
  });

  const handleScan = (value: string) => {
    const found = mockDB[value];
    setScannedData(found ?? null);
  };

  const handleSubmit = async () => {
    // TODO: Ganti dengan API call yang sebenarnya
    console.log("Submitting data:", {
      scannedData,
      selectedCategory,
      notes,
    });
    
    // Reset semua data setelah submit
    setScannedData(null);
    setSelectedCategory("feed");
    setNotes({
      abnormal: "",
      damaged: "",
      non: "",
    });
  };

  const fileInfo = {
    code: "BAST-001",
    name: "upload-premix-01.csv",
    totalUnscanned: 25,
    totalScanned: 95,
  };

  return (
    <div className="space-y-5">
      {/* Section Info File */}
      <div className="flex divide-x divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Kode File */}
        <div className="px-5 py-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Kode File</p>
          <p className="mt-0.5 font-mono text-sm font-semibold text-slate-700">{fileInfo.code}</p>
        </div>

        {/* Nama File */}
        <div className="px-5 py-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Nama File</p>
          <p className="mt-0.5 text-sm font-semibold text-slate-700">{fileInfo.name}</p>
        </div>

        {/* Total Terscan */}
        <div className="bg-emerald-50 px-5 py-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Terscan</p>
          <p className="mt-0.5 text-sm font-bold text-emerald-700">{fileInfo.totalScanned} Produk</p>
        </div>

        {/* Total Belum Terscan */}
        <div className="bg-amber-50 px-5 py-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-amber-500">Belum Terscan</p>
          <p className="mt-0.5 text-sm font-bold text-amber-700">{fileInfo.totalUnscanned} Produk</p>
        </div>
      </div>

      {/* Data Cards */}
      {scannedData && (
<div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <CardKeyValueHorizontal
              title="Data Asal"
              items={[
                { label: "Barcode", value: scannedData.barcodeAsal },
                { label: "Nama", value: scannedData.nama },
                { label: "Qty", value: scannedData.qty },
                { label: "Harga", value: `Rp ${formatRibuan(scannedData.harga)}` },
              ]}
            />
            <CardKeyValueHorizontal
              title="Data Gudang"
              items={[
                { label: "Barcode", value: scannedData.barcodeGudang },
                { label: "Nama", value: scannedData.namaGudang },
                { label: "Qty", value: scannedData.qtyGudang },
                { label: "Harga", value: `Rp ${formatRibuan(scannedData.hargaGudang)}` },
              ]}
            />
          </div>
)}

      {!scannedData && (
        <ScannerCard title="Scan Produk BAST" onScanComplete={handleScan} />
      )}

      <QualityTabs
        onChange={(id, label) => console.log(id, label)}
        items={[
          {
            id: "good",
            label: "Good",
            content: scannedData ? (
              scannedData.harga >= 100000 ? (
                <div className="space-y-4">
                  <RadioCardGroup
                    options={mockCategories.map((cat) => ({
                      id: cat.id,
                      title: cat.name,
                      subTitle: "KATEGORI",
                      valueText: cat.discount,
                      valueLabel: "DISKON",
                      percentage: cat.discount,
                    }))}
                    selectedValue={selectedCategory}
                    onChange={setSelectedCategory}
                  />
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full rounded-lg bg-blue-400 px-4 py-2.5 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-500"
                  >
                    Kirim
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/30 p-4">
                    {/* Left: Icon & Label */}
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg border border-slate-100 bg-white p-2.5 shadow-sm">
                        <svg
                          className="h-5 w-5 text-blue-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          />
                        </svg>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-slate-800">Barang Sticker / Low Value</h3>
                        <p className="text-xs text-slate-500">Item di bawah Rp 100.000</p>
                      </div>
                    </div>

                    {/* Right: Type & Color */}
                    <div className="flex items-center gap-6 pr-2">
                      <div className="flex flex-col items-end">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                          Tipe
                        </span>
                        <span className="text-sm font-extrabold uppercase text-blue-600">
                          {scannedData.sticker}
                        </span>
                      </div>

                      <div className="h-8 w-px bg-slate-200" />

                      <div className="flex flex-col items-end">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                          Warna Sticker
                        </span>
                        <div className="flex items-center gap-1.5">
                          <div
                            className={`h-2.5 w-2.5 rounded-full ${
                              scannedData.sticker === "Big"
                                ? "bg-red-400"
                                : scannedData.sticker === "Small"
                                  ? "bg-amber-400"
                                  : "bg-emerald-400"
                            }`}
                          />
                          <span className="text-sm font-extrabold text-slate-700">
                            {scannedData.sticker === "Big" ? "Merah" : scannedData.sticker === "Small" ? "Kuning" : "Hijau"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full hover:cursor-pointer rounded-lg bg-blue-400 px-4 py-2.5 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-500"
                  >
                    Kirim
                  </button>
                </div>
              )
            ) : (
              <p className="text-sm text-slate-500">Scan produk terlebih dahulu</p>
            ),
          },
          { 
            id: "abnormal", 
            label: "Abnormal", 
            content: (
              <div className="space-y-4">
                <textarea
                  value={notes.abnormal}
                  onChange={(e) => setNotes({ ...notes, abnormal: e.target.value })}
                  placeholder="Masukkan catatan untuk produk abnormal..."
                  className="w-full rounded-lg border border-slate-200 p-4 text-sm focus:border-blue-400 focus:outline-none"
                  rows={6}
                />
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full hover:cursor-pointer rounded-lg bg-blue-400 px-4 py-2.5 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-500"
                >
                  Kirim
                </button>
              </div>
            ) 
          },
          { 
            id: "damaged", 
            label: "Damaged", 
            content: (
              <div className="space-y-4">
                <textarea
                  value={notes.damaged}
                  onChange={(e) => setNotes({ ...notes, damaged: e.target.value })}
                  placeholder="Masukkan catatan untuk produk damaged..."
                  className="w-full rounded-lg border border-slate-200 p-4 text-sm focus:border-blue-400 focus:outline-none"
                  rows={6}
                />
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full hover:cursor-pointer rounded-lg bg-blue-400 px-4 py-2.5 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-500"
                >
                  Kirim
                </button>
              </div>
            ) 
          },
          { 
            id: "non", 
            label: "Non", 
            content: (
              <div className="space-y-4">
                <textarea
                  value={notes.non}
                  onChange={(e) => setNotes({ ...notes, non: e.target.value })}
                  placeholder="Masukkan catatan untuk produk non..."
                  className="w-full rounded-lg border border-slate-200 p-4 text-sm focus:border-blue-400 focus:outline-none"
                  rows={6}
                />
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full hover:cursor-pointer rounded-lg bg-blue-400 px-4 py-2.5 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-500"
                >
                  Kirim
                </button>
              </div>
            ) 
          },
        ]}
      />
    </div>
  );
}