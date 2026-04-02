"use client";

import DataTable from "@/components/data-tables/DataTable";
import CardKeyValueVertical from "@/components/globals/cards/CardKeyValueVertical";
import ScannerCard from "@/components/globals/additionals/ScannerCard";
import { Eye, FileText, RotateCcw } from "lucide-react";
import { useState } from "react";

import { InfoDisplay } from "@/components/globals/additionals/Inputs";
import Modal from "@/components/globals/additionals/Modal";
import Button from "@/components/globals/buttons/ButtonPrimary";
import { formatRibuan } from "@/helper/formatRibuan";

const detailReturnBkl = {
  code: "BKL-001",
  return_date: "2026-03-27",
  total_item: 45,
  total_return_item: 45,
  status: "progress",
};

const initialReturnItems = [
  {
    barcode: "WH-330101",
    name: "Premix Ayam 1 Kg",
    qty: 10,
    price: 75000,
    warehouse_price: 77000,
    sticker: "Big",
    date: "2026-03-27",
    user: "Rudi Santoso",
  },
  {
    barcode: "WH-330102",
    name: "Premix Ayam 5 Kg",
    qty: 6,
    price: 210000,
    warehouse_price: 214000,
    sticker: "Small",
    date: "2026-03-27",
    user: "Maya Putri",
  },
  {
    barcode: "WH-330103",
    name: "Premix Ikan 500 gr",
    qty: 14,
    price: 45000,
    warehouse_price: 47000,
    sticker: "Tiny",
    date: "2026-03-26",
    user: "Agus Saputra",
  },
];

const scanLookup: Record<string, (typeof initialReturnItems)[number]> = {
  WH330101: {
    barcode: "WH330101",
    name: "Premix Ayam 1 Kg",
    qty: 1,
    price: 75000,
    warehouse_price: 77000,
    sticker: "Big",
    date: "2026-03-27",
    user: "Scanner Return",
  },
  WH330102: {
    barcode: "WH330102",
    name: "Premix Ayam 5 Kg",
    qty: 1,
    price: 210000,
    warehouse_price: 214000,
    sticker: "Small",
    date: "2026-03-27",
    user: "Scanner Return",
  },
};

const formatRupiah = (value: number) =>
  `Rp ${formatRibuan(value)}`;

const renderStickerBadge = (sticker: string | null) => {
  if (!sticker) return "-";

  const stickerMap: Record<string, { dot: string; text: string }> = {
    Big: { dot: "bg-red-400", text: "text-red-600" },
    Small: { dot: "bg-amber-400", text: "text-amber-600" },
    Tiny: { dot: "bg-emerald-400", text: "text-emerald-600" },
  };

  const style = stickerMap[sticker] || {
    dot: "bg-slate-400",
    text: "text-slate-600",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 text-sm font-semibold ${style.text}`}
    >
      <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
      {sticker}
    </span>
  );
};

export default function DetailReturnBklPage() {
  const [isEditStatusModalOpen, setIsEditStatusModalOpen] = useState(false);
  const [tableItems, setTableItems] = useState(initialReturnItems);
  const [selectedItem, setSelectedItem] = useState<
    (typeof initialReturnItems)[number] | null
  >(null);

  const handleScanBarcode = (rawValue: string) => {
    const scannedValue = rawValue.trim().toUpperCase();
    if (!scannedValue) return;

    const mappedItem = scanLookup[scannedValue] ?? {
      barcode: scannedValue,
      name: "Produk Scan Baru",
      qty: 1,
      price: 0,
      warehouse_price: 0,
      sticker: null,
      date: new Date().toISOString().slice(0, 10),
      user: "Scanner Return",
    };

    setTableItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.barcode === mappedItem.barcode,
      );
      if (existingIndex === -1) {
        return [mappedItem, ...prev];
      }

      return prev.map((item, index) =>
        index === existingIndex ? { ...item, qty: item.qty + 1 } : item,
      );
    });
  };

  const statusClassName =
    detailReturnBkl.status === "done"
      ? "inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold uppercase text-emerald-700"
      : "inline-flex rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-bold uppercase text-yellow-700";

  const handleOpenEditStatusModal = () => {
    setIsEditStatusModalOpen(true);
  };

  const handleCloseEditStatusModal = () => {
    setIsEditStatusModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <CardKeyValueVertical
          title="Informasi File"
          icon={<FileText className="h-5 w-5" />}
          items={[
            {
              label: "Code",
              value: (
                <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold uppercase text-blue-700">
                  {detailReturnBkl.code}
                </span>
              ),
            },
            { label: "Tanggal Return", value: detailReturnBkl.return_date },
          ]}
        />

        <CardKeyValueVertical
          title="Ringkasan Return"
          icon={<RotateCcw className="h-5 w-5" />}
		  action={{
			label: "Finish",
			onClick: handleOpenEditStatusModal,
		  }}
          items={[
            {
              label: "Status",
              value: (
                <span className={statusClassName}>
                  {detailReturnBkl.status}
                </span>
              ),
            },
            {
              label: "Total Item",
              value: detailReturnBkl.total_return_item,
            },
          ]}
        />
      </section>
      <section>
        <ScannerCard
          title="Scan Item Return BKL"
          placeholder="Scan barcode item return..."
          onScanComplete={handleScanBarcode}
        />
      </section>

      <section>
        <DataTable
          title="Daftar Item Return BKL"
          data={tableItems}
          columns={[
            {
              key: "barcode",
              header: "Barcode",
              accessor: "barcode",
            },
            { key: "name", header: "Nama", accessor: "name" },
            { key: "qty", header: "Qty", accessor: "qty" },
            {
              key: "warehouse_price",
              header: "Harga Gudang",
              accessor: (item: any) => formatRupiah(item.warehouse_price),
            },
            {
              key: "sticker",
              header: "Sticker",
              accessor: (item: any) => renderStickerBadge(item.sticker),
            },
            {
              key: "date",
              header: "Tanggal",
              accessor: (item: any) => item.date || "-",
            },
            {
              key: "user",
              header: "User",
              accessor: (item: any) => item.user || "-",
            },
          ]}
          searchableKeys={["barcode", "name", "date", "user"]}
          actions={{
            customActions: [
              {
                label: "Detail",
                icon: <Eye size={18} />,
                color: "blue",
                onClick: (item) => setSelectedItem(item),
              },
            ],
          }}
        />
      </section>

      <Modal
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        title="Detail Item Return BKL"
        size="md"
        footer={
          <Button
            label="Tutup"
            variant="outline"
            onClick={() => setSelectedItem(null)}
          />
        }
      >
        {selectedItem && (
          <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 md:grid-cols-2 md:gap-x-6">
            <InfoDisplay label="Barcode" value={selectedItem.barcode} />
            <InfoDisplay label="Nama Produk" value={selectedItem.name} />
            <InfoDisplay label="Qty" value={selectedItem.qty} />
            <InfoDisplay
              label="Harga Gudang"
              value={formatRupiah(selectedItem.warehouse_price)}
            />
            <InfoDisplay
              label="Harga Asli"
              value={formatRupiah(selectedItem.price)}
            />
            <InfoDisplay label="Sticker" value={selectedItem.sticker || "-"} />
            <InfoDisplay label="Tanggal" value={selectedItem.date || "-"} />
            <InfoDisplay label="User" value={selectedItem.user || "-"} />
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isEditStatusModalOpen}
        onClose={handleCloseEditStatusModal}
        title="Finish Return BKL"
        size="sm"
        footer={
          <>
            <button
              type="button"
              onClick={handleCloseEditStatusModal}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={handleCloseEditStatusModal}
              className="rounded-lg border border-blue-300 bg-blue-400 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Ya, Finish
            </button>
          </>
        }
      >
        {/* Kasih konfirmasi */}
        <p className="text-center text-sm text-slate-600">
          Apakah Anda yakin ingin mengubah status menjadi "Done"? Pastikan semua
          item telah discan dengan benar.
        </p>
      </Modal>
    </div>
  );
}
