"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { InputSelectSearch } from "@/components/globals/additionals/Inputs";

type BuyerOption = {
  id: string;
  name: string;
};

type BagOption = {
  id: string;
  name: string;
  hargaAsal: number;
};

const buyers: BuyerOption[] = [
  { id: "BUY-011", name: "CV Kualitas Prima" },
  { id: "BUY-012", name: "PT Standar Mulia" },
  { id: "BUY-013", name: "Toko Karya Bersama" },
];

const bagOptions: BagOption[] = [
  { id: "QCD-BAG-01", name: "Bag QCD Grade A", hargaAsal: 1850000 },
  { id: "QCD-BAG-02", name: "Bag QCD Grade B", hargaAsal: 1420000 },
  { id: "QCD-BAG-03", name: "Bag QCD Mix", hargaAsal: 2230000 },
];

const formatRupiah = (value: number) =>
  `Rp ${Math.max(0, value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

export default function QcdFormSalesPage() {
  const [selectedBuyerId, setSelectedBuyerId] = useState("");
  const [selectedBagId, setSelectedBagId] = useState("");
  const [discountPercentInput, setDiscountPercentInput] = useState("0");
  const [discountedPriceInput, setDiscountedPriceInput] = useState("0");
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);

  const selectedBuyer = buyers.find((buyer) => buyer.id === selectedBuyerId);
  const selectedBag = bagOptions.find((bag) => bag.id === selectedBagId);
  const hargaAsal = selectedBag?.hargaAsal ?? 0;

  const discountPercent = Number(discountPercentInput || "0");
  const hargaSetelahDiskon = Number(discountedPriceInput || "0");
  const nominalDiskon = Math.max(0, hargaAsal - hargaSetelahDiskon);

  const isFormReady = useMemo(
    () => Boolean(selectedBuyer && selectedBag),
    [selectedBuyer, selectedBag],
  );

  const handleDiscountPercentChange = (rawValue: string) => {
    const cleaned = rawValue.replace(/[^\d]/g, "");
    const parsedPercent = Math.min(100, Number(cleaned || "0"));

    setDiscountPercentInput(String(parsedPercent));

    if (!hargaAsal) {
      setDiscountedPriceInput("0");
      return;
    }

    const calculatedPrice = Math.round(hargaAsal * (1 - parsedPercent / 100));
    setDiscountedPriceInput(String(Math.max(0, calculatedPrice)));
  };

  const handleDiscountedPriceChange = (rawValue: string) => {
    const cleaned = rawValue.replace(/[^\d]/g, "");
    const parsedPrice = Math.max(0, Number(cleaned || "0"));

    setDiscountedPriceInput(String(parsedPrice));

    if (!hargaAsal) {
      setDiscountPercentInput("0");
      return;
    }

    const clampedPrice = Math.min(parsedPrice, hargaAsal);
    const calculatedPercent = ((hargaAsal - clampedPrice) / hargaAsal) * 100;
    setDiscountPercentInput(String(Math.round(calculatedPercent)));
  };

  const handleSelectBag = (bagId: string) => {
    setSelectedBagId(bagId);

    const nextBag = bagOptions.find((bag) => bag.id === bagId);
    if (!nextBag) {
      setDiscountPercentInput("0");
      setDiscountedPriceInput("0");
      return;
    }

    const currentPercent = Math.min(100, Number(discountPercentInput || "0"));
    const nextPrice = Math.round(nextBag.hargaAsal * (1 - currentPercent / 100));
    setDiscountedPriceInput(String(Math.max(0, nextPrice)));
  };

  const handleFinishSales = () => {
    setIsFinishModalOpen(false);
    console.log("Finish QCD Sales", {
      buyer: selectedBuyer?.name,
      bag: selectedBag?.name,
      hargaAsal,
      discountPercent,
      hargaSetelahDiskon,
    });
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">Form Penjualan QCD</h1>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-600">Info</h2>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Pilih Buyer</label>
            <select
              value={selectedBuyerId}
              onChange={(event) => setSelectedBuyerId(event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
            >
              <option value="">Pilih buyer</option>
              {buyers.map((buyer) => (
                <option key={buyer.id} value={buyer.id}>
                  {buyer.name}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Harga Asal
            </p>
            <p className="text-base font-bold text-slate-700">{formatRupiah(hargaAsal)}</p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Diskon dari Harga Asal (%)</label>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                value={discountPercentInput}
                onChange={(event) => handleDiscountPercentChange(event.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 pr-8 text-sm outline-none focus:border-blue-400"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                %
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Harga Setelah Diskon</label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                Rp
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={discountedPriceInput}
                onChange={(event) => handleDiscountedPriceChange(event.target.value)}
                className="w-full rounded-lg border border-slate-200 py-2 pl-10 pr-3 text-sm outline-none focus:border-blue-400"
              />
            </div>
            <p className="text-xs text-slate-500">Format: {formatRupiah(hargaSetelahDiskon)}</p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-600">Select Barang</h2>

        <InputSelectSearch
          className="mt-4"
          label="Pilih Bag"
          options={bagOptions.map((bag) => ({
            label: bag.name,
            value: bag.id,
          }))}
          value={selectedBagId}
          onChange={handleSelectBag}
          placeholder="Cari bag..."
        />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-600">
            <p>Buyer: {selectedBuyer?.name ?? "-"}</p>
            <p>Nominal Diskon: {formatRupiah(nominalDiskon)}</p>
          </div>
          <button
            type="button"
            onClick={() => setIsFinishModalOpen(true)}
            disabled={!isFormReady}
            className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Finish
          </button>
        </div>
      </section>

      {isFinishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-700">Konfirmasi Finish Penjualan</h3>
              <button
                type="button"
                onClick={() => setIsFinishModalOpen(false)}
                className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              <p>Buyer: {selectedBuyer?.name}</p>
              <p>Bag: {selectedBag?.name}</p>
              <p>Harga Asal: {formatRupiah(hargaAsal)}</p>
              <p>Diskon: {discountPercent}%</p>
              <p>Harga Setelah Diskon: {formatRupiah(hargaSetelahDiskon)}</p>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsFinishModalOpen(false)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleFinishSales}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
              >
                <CheckCircle2 className="h-4 w-4" />
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
