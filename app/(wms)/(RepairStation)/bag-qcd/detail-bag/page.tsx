"use client";

import DataTable from "@/components/data-tables/DataTable";
import { InfoDisplay } from "@/components/globals/additionals/Inputs";
import ScannerCard from "@/components/globals/additionals/ScannerCard";
import Modal from "@/components/globals/additionals/Modal";
import Button from "@/components/globals/buttons/ButtonPrimary";
import CardKeyValueVertical from "@/components/globals/cards/CardKeyValueVertical";
import {
  Eye,
  FileText,
  PackageSearch,
} from "lucide-react";
import { useState } from "react";

const detailBagQcd = {
  code: "QCD-BAG-001",
  rak_display: "Rak QCD A1",
  tanggal_bag: "2026-03-28",
  total_item: 120,
  status: "open",
};

const initialBagItems = [
  {
    warehouse_barcode: "QCD330101",
    name: "Premix Ayam 1 Kg",
    qty: 10,
    price: 75000,
    warehouse_price: 77000,
    category: "Pakan Ayam",
  },
  {
    warehouse_barcode: "QCD330102",
    name: "Premix Ayam 5 Kg",
    qty: 6,
    price: 210000,
    warehouse_price: 214000,
    category: "Pakan Ayam",
  },
  {
    warehouse_barcode: "QCD330103",
    name: "Premix Ikan 500 gr",
    qty: 14,
    price: 45000,
    warehouse_price: 47000,
    category: "Pakan Ikan",
  },
];

const scanLookup: Record<string, (typeof initialBagItems)[number]> = {
  QCD330101: {
    warehouse_barcode: "QCD330101",
    name: "Premix Ayam 1 Kg",
    qty: 1,
    price: 75000,
    warehouse_price: 77000,
    category: "Pakan Ayam",
  },
  QCD330102: {
    warehouse_barcode: "QCD330102",
    name: "Premix Ayam 5 Kg",
    qty: 1,
    price: 210000,
    warehouse_price: 214000,
    category: "Pakan Ayam",
  },
};

const formatRupiah = (value: number) =>
  `Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

export default function DetailBagQcdPage() {
  const [tableItems, setTableItems] = useState(initialBagItems);
  const [selectedItem, setSelectedItem] = useState<
    (typeof initialBagItems)[number] | null
  >(null);
  const [isEditStatusModalOpen, setIsEditStatusModalOpen] = useState(false);
  const [bagStatus, setBagStatus] = useState(detailBagQcd.status);
  const totalHargaAsal = tableItems.reduce(
    (sum, item) => sum + item.qty * item.price,
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
      warehouse_barcode: scannedValue,
      name: "Produk Scan Baru",
      qty: 1,
      price: 0,
      warehouse_price: 0,
      category: "-",
    };

    setTableItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.warehouse_barcode === mappedItem.warehouse_barcode,
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
                  {detailBagQcd.code}
                </span>
              ),
            },
            { label: "Rak Display", value: detailBagQcd.rak_display },
            { label: "Tanggal Bag", value: detailBagQcd.tanggal_bag },
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
              label: "Status",
              value: <span className={statusClassName}>{bagStatus}</span>,
            },
            {
              label: "Total Item",
              value: detailBagQcd.total_item,
            },
            {
              label: "Total Harga Asal",
              value: formatRupiah(totalHargaAsal),
            },
          ]}
        />
      </section>
<section>
        <ScannerCard
          title="Scan Item Bag QCD"
          placeholder="Scan barcode item bag..."
          onScanComplete={handleScanBarcode}
        />
      </section>

      <section>
        <DataTable
          title="Produk Sudah Terscan"
          data={tableItems}
          exportConfig={{ show: true }}
          columns={[
            {
              key: "warehouse_barcode",
              header: "Barcode Warehouse",
              accessor: "warehouse_barcode",
            },
            { key: "name", header: "Nama", accessor: "name" },
            { key: "qty", header: "Item", accessor: "qty" },
            {
              key: "price",
              header: "Harga Asal",
              accessor: (item: any) => formatRupiah(item.price),
            },
            {
              key: "category",
              header: "Kategori",
              accessor: (item: any) => item.category || "-",
            },
          ]}
          searchableKeys={["warehouse_barcode", "name"]}
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
            Pilih status terbaru untuk bag QCD ini.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                value: "open",
                className:
                  "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
              },
              {
                value: "close",
                className:
                  "bg-amber-100 text-amber-700 hover:bg-amber-200",
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
        title="Detail Item Bag QCD"
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
            <InfoDisplay label="Barcode" value={selectedItem.warehouse_barcode} />
            <InfoDisplay label="Nama Produk" value={selectedItem.name} />
            <InfoDisplay label="Qty" value={selectedItem.qty} />
            <InfoDisplay label="Harga Asal" value={formatRupiah(selectedItem.price)} />
            <InfoDisplay label="Kategori" value={selectedItem.category || "-"} />
          </div>
        )}
      </Modal>
    </div>
  );
}
