"use client";

import DataTable from "@/components/data-tables/DataTable";
import { InfoDisplay } from "@/components/globals/additionals/Inputs";
import ScannerCard from "@/components/globals/additionals/ScannerCard";
import Modal from "@/components/globals/additionals/Modal";
import Button from "@/components/globals/buttons/ButtonPrimary";
import CardKeyValueVertical from "@/components/globals/cards/CardKeyValueVertical";
import { Eye, FileText, PackageSearch } from "lucide-react";
import { useState } from "react";

const detailBagStaging = {
  code: "STK-BAG-001",
  tanggal_bag: "2026-03-27",
  total_item: 120,
  status: "open",
};

const initialBagItems = [
  {
    barcode: "ST330101",
    name: "Premix Ayam 1 Kg",
    qty: 10,
    price: 75000,
    warehouse_price: 77000,
    sticker: "Big",
    date: "2026-03-27",
    user: "Rudi Santoso",
  },
  {
    barcode: "ST330102",
    name: "Premix Ayam 5 Kg",
    qty: 6,
    price: 210000,
    warehouse_price: 214000,
    sticker: "Small",
    date: "2026-03-27",
    user: "Maya Putri",
  },
  {
    barcode: "ST330103",
    name: "Premix Ikan 500 gr",
    qty: 14,
    price: 45000,
    warehouse_price: 47000,
    sticker: "Tiny",
    date: "2026-03-26",
    user: "Agus Saputra",
  },
];

const scanLookup: Record<string, (typeof initialBagItems)[number]> = {
  ST330101: {
    barcode: "ST330101",
    name: "Premix Ayam 1 Kg",
    qty: 1,
    price: 75000,
    warehouse_price: 77000,
    sticker: "Big",
    date: "2026-03-27",
    user: "Scanner Bag",
  },
  ST330102: {
    barcode: "ST330102",
    name: "Premix Ayam 5 Kg",
    qty: 1,
    price: 210000,
    warehouse_price: 214000,
    sticker: "Small",
    date: "2026-03-27",
    user: "Scanner Bag",
  },
};

const formatRupiah = (value: number) =>
  `Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

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
    <span className={`inline-flex items-center gap-2 text-sm font-semibold ${style.text}`}>
      <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
      {sticker}
    </span>
  );
};

export default function DetailBagStickerPage() {
  const [tableItems, setTableItems] = useState(initialBagItems);
  const [selectedItem, setSelectedItem] = useState<
    (typeof initialBagItems)[number] | null
  >(null);
  const [isEditStatusModalOpen, setIsEditStatusModalOpen] = useState(false);
  const [bagStatus, setBagStatus] = useState(detailBagStaging.status);

  const totalHargaGudang = tableItems.reduce(
    (sum, item) => sum + item.qty * item.warehouse_price,
    0,
  );

  const handleOpenEditStatusModal = () => {
    setIsEditStatusModalOpen(true);
  };

  const handleCloseEditStatusModal = () => {
    setIsEditStatusModalOpen(false);
  };

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
      user: "Scanner Bag",
    };

    setTableItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.barcode === mappedItem.barcode);
      if (existingIndex === -1) {
        return [mappedItem, ...prev];
      }

      return prev.map((item, index) =>
        index === existingIndex ? { ...item, qty: item.qty + 1 } : item,
      );
    });
  };

  const statusClassName =
    bagStatus === "lock"
      ? "inline-flex rounded-full bg-red-100 px-2.5 py-1 text-xs font-bold uppercase text-red-700"
      : bagStatus === "close"
        ? "inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold uppercase text-amber-700"
        : "inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold uppercase text-emerald-700";

  return (
    <div className="space-y-6">
<section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <CardKeyValueVertical
          title="Informasi Bag"
          icon={<FileText className="h-5 w-5" />}
          items={[
            {
              label: "Code Bag",
              value: (
                <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold uppercase text-blue-700">
                  {detailBagStaging.code}
                </span>
              ),
            },
            {
              label: "Status",
              value: <span className={statusClassName}>{bagStatus}</span>,
            },
          ]}
        />

        <CardKeyValueVertical
          title="Ringkasan Bag"
          icon={<PackageSearch className="h-5 w-5" />}
          action={{
            label: "Update Status",
            onClick: handleOpenEditStatusModal,
            className: "bg-amber-100 text-amber-700 hover:bg-amber-200",
          }}
          items={[
            {
              label: "Total Item",
              value: detailBagStaging.total_item,
            },
            {
              label: "Total Harga Gudang",
              value: formatRupiah(totalHargaGudang),
            },
          ]}
        />
      </section>
<section>
        <ScannerCard
          title="Scan Item Bag Staging"
          placeholder="Scan barcode item bag..."
          onScanComplete={handleScanBarcode}
        />
      </section>

      <section>
        <DataTable
          title="Daftar Item Bag Staging"
          data={tableItems}
          columns={[
            { key: "barcode", header: "Barcode", accessor: "barcode" },
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
        isOpen={isEditStatusModalOpen}
        onClose={handleCloseEditStatusModal}
        title="Update Status Bag"
        size="sm"
        footer={
          <button
            type="button"
            onClick={handleCloseEditStatusModal}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Tutup
          </button>
        }
      >
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-slate-600">
            Pilih status terbaru untuk bag staging ini.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                value: "open",
                className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
              },
              {
                value: "close",
                className: "bg-amber-100 text-amber-700 hover:bg-amber-200",
              },
              {
                value: "lock",
                className: "bg-red-100 text-red-700 hover:bg-red-200",
              },
            ].map((statusOption) => (
              <button
                key={statusOption.value}
                type="button"
                onClick={() => {
                  setBagStatus(statusOption.value);
                  handleCloseEditStatusModal();
                }}
                className={`rounded-xl px-4 py-3 text-sm font-bold uppercase transition-colors ${statusOption.className} ${
                  bagStatus === statusOption.value
                    ? "ring-2 ring-offset-2 ring-slate-300"
                    : ""
                }`}
              >
                {statusOption.value}
              </button>
            ))}
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        title="Detail Item Bag Staging"
        size="md"
        footer={<Button label="Tutup" variant="outline" onClick={() => setSelectedItem(null)} />}
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
            <InfoDisplay label="Harga Asli" value={formatRupiah(selectedItem.price)} />
            <InfoDisplay label="Sticker" value={selectedItem.sticker || "-"} />
            <InfoDisplay label="Tanggal" value={selectedItem.date || "-"} />
            <InfoDisplay label="User" value={selectedItem.user || "-"} />
          </div>
        )}
      </Modal>
    </div>
  );
}
