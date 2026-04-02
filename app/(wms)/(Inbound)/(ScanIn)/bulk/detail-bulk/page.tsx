"use client";

import { useState } from "react";
import DataTable from "@/components/data-tables/DataTable";
import CardKeyValueVertical from "@/components/globals/cards/CardKeyValueVertical";
import CardMatrix from "@/components/globals/cards/CardMatrix";
import Modal from "@/components/globals/additionals/Modal";
import Button from "@/components/globals/buttons/ButtonPrimary";
import { InfoDisplay } from "@/components/globals/additionals/Inputs";
import { Eye, FileText, LayoutGrid, ScanLine } from "lucide-react";
import { formatRibuan } from "@/helper/formatRibuan";

const detailBulk = {
  code: "BULK-001",
  name_file: "upload-bulk-01.csv",
  uploaded_date: "2026-03-27",
  total_item: 220,
  total_price: 2450000,
  total_price_warehouse: 2015000,
  type: "Reguler",
};

const matrixCategories = ["Feed", "Supplement", "Vitamin"];

const matrixData: Record<string, Record<string, string>> = {
  Feed: {
    "Total Item": "85",
    "Harga Gudang": "Rp 820.000",
    "Harga Asli": "Rp 950.000",
  },
  Supplement: {
    "Total Item": "72",
    "Harga Gudang": "Rp 690.000",
    "Harga Asli": "Rp 780.000",
  },
  Vitamin: {
    "Total Item": "63",
    "Harga Gudang": "Rp 505.000",
    "Harga Asli": "Rp 560.000",
  },
};

const formatRupiah = (value: number) =>
  `Rp ${formatRibuan(value)}`;

const bulkItems = [
  {
    barcode: "899100110011",
    warehouse_barcode: "WH-220011",
    name: "Premix Ayam 1 Kg",
    qty: 20,
    price: 75000,
    warehouse_price: 77000,
    category: "Feed",
  },
  {
    barcode: "899100110012",
    warehouse_barcode: "WH-220012",
    name: "Premix Ayam 5 Kg",
    qty: 10,
    price: 210000,
    warehouse_price: 214000,
    category: "Feed",
  },
  {
    barcode: "899100110013",
    warehouse_barcode: "WH-220013",
    name: "Vita Sapi 1 Kg",
    qty: 15,
    price: 82000,
    warehouse_price: 83500,
    category: "Supplement",
  },
  {
    barcode: "899100110014",
    warehouse_barcode: "WH-220014",
    name: "Vita Ikan 500 gr",
    qty: 28,
    price: 45000,
    warehouse_price: 47000,
    category: "Vitamin",
  },
  {
    barcode: "899100110015",
    warehouse_barcode: "WH-220015",
    name: "Premix Sapi 5 Kg",
    qty: 8,
    price: 195000,
    warehouse_price: 198000,
    category: "Supplement",
  },
];

export default function DetailBulkPage() {
  const [selectedItem, setSelectedItem] = useState<(typeof bulkItems)[number] | null>(null);

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
                  {detailBulk.code}
                </span>
              ),
            },
            { label: "Nama File", value: detailBulk.name_file },
            { label: "Tanggal Upload", value: detailBulk.uploaded_date },
          ]}
        />

        <CardKeyValueVertical
          title="Ringkasan Scan"
          icon={<ScanLine className="h-5 w-5" />}
          items={[
            {
              label: "Tipe",
              value: (
                <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold uppercase text-blue-700">
                  {detailBulk.type}
                </span>
              ),
            },
            {
              label: "Total Harga Asal / Total Harga Gudang",
              value: `${formatRupiah(detailBulk.total_price)} / ${formatRupiah(detailBulk.total_price_warehouse)}`,
            },
            {
              label: "Total Harga Asal / Total Harga Gudang",
              value: `${formatRupiah(detailBulk.total_price)} / ${formatRupiah(detailBulk.total_price_warehouse)}`,
            },
          ]}
        />
      </section>
<CardMatrix
        title="Kategori Barang"
        icon={<LayoutGrid className="h-5 w-5" />}
        verticalKeys={matrixCategories}
        horizontalKeys={["Total Item", "Harga Gudang", "Harga Asli"]}
        renderValue={(vKey, hKey) => matrixData[vKey]?.[hKey] ?? "-"}
      />

      <DataTable
        title="Daftar Item BULK"
        data={bulkItems}
        exportConfig={{
          show: true,
        }}
        columns={[
          { key: "barcode", header: "Barcode", accessor: "barcode" },
          {
            key: "warehouse_barcode",
            header: "Barcode Gudang",
            accessor: "warehouse_barcode",
          },
          { key: "name", header: "Nama", accessor: "name" },
          { key: "qty", header: "Qty", accessor: "qty" },
          {
            key: "price",
            header: "Harga Asli",
            accessor: (item: any) => formatRupiah(item.price),
          },
          {
            key: "warehouse_price",
            header: "Harga Gudang",
            accessor: (item: any) => formatRupiah(item.warehouse_price),
          },
          { key: "category", header: "Kategori", accessor: "category" },
        ]}
        searchableKeys={["barcode", "warehouse_barcode", "name", "category"]}
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

      <Modal
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        title="Detail Item BULK"
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
            <InfoDisplay label="Barcode Gudang" value={selectedItem.warehouse_barcode} />
            <InfoDisplay label="Nama Produk" value={selectedItem.name} />
            <InfoDisplay label="Qty" value={selectedItem.qty} />
            <InfoDisplay label="Harga Asli" value={formatRupiah(selectedItem.price)} />
            <InfoDisplay label="Harga Gudang" value={formatRupiah(selectedItem.warehouse_price)} />
            <InfoDisplay label="Kategori" value={selectedItem.category} />
          </div>
        )}
      </Modal>
    </div>
  );
}
