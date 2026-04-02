"use client";

import { useState } from "react";
import DataTable from "@/components/data-tables/DataTable";
import { InfoDisplay } from "@/components/globals/additionals/Inputs";
import Modal from "@/components/globals/additionals/Modal";
import Button from "@/components/globals/buttons/ButtonPrimary";
import CardKeyValueHorizontal from "@/components/globals/cards/CardKeyValueHorizontal";
import StatsSectionWrapper from "@/components/globals/cards/StatsSectionWrapper";
import { Eye, PackageSearch } from "lucide-react";
import { formatRibuan } from "@/helper/formatRibuan";

const piecesSummary = {
  total_input: 340,
  total_price: 18750000,
  total_warehouse_price: 19200000,
};

const piecesItems = [
  {
    warehouse_barcode: "WH-220011",
    name: "Premix Ayam 1 Kg",
    qty: 20,
    price: 75000,
    warehouse_price: 77000,
    category: "Feed",
    sticker: null,
    date: "2026-03-27",
    user: "Anas",
  },
  {
    warehouse_barcode: "WH-220012",
    name: "Premix Ayam 5 Kg",
    qty: 12,
    price: 210000,
    warehouse_price: 214000,
    category: null,
    sticker: "Big",
    date: "2026-03-27",
    user: "Admin WMS",
  },
  {
    warehouse_barcode: "WH-220013",
    name: "Premix Sapi 1 Kg",
    qty: 15,
    price: 82000,
    warehouse_price: 83500,
    category: "Supplement",
    sticker: null,
    date: "",
    user: "",
  },
  {
    warehouse_barcode: "WH-220014",
    name: "Premix Ikan 500 gr",
    qty: 28,
    price: 45000,
    warehouse_price: 47000,
    category: null,
    sticker: "Tiny",
    date: "",
    user: "",
  },
  {
    warehouse_barcode: "WH-220015",
    name: "Vita Broiler 1 Kg",
    qty: 18,
    price: 97000,
    warehouse_price: 99500,
    category: null,
    sticker: "Small",
    date: "2026-03-27",
    user: "Quality Team",
  },
];

const formatRupiah = (value: number) =>
  `Rp ${formatRibuan(value)}`;

const renderStickerBadge = (sticker: string | null, category: string | null) => {
  if (category) return "-";
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

export default function PiecesPage() {
  const [selectedItem, setSelectedItem] = useState<
    (typeof piecesItems)[number] | null
  >(null);

  return (
    <div className="space-y-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Data MANUAL Hari Ini</h2>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
          {new Date().toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
      <StatsSectionWrapper title="Ringkasan">
        <CardKeyValueHorizontal
          title="Ringkasan Pieces"
          icon={<PackageSearch className="h-5 w-5" />}
          items={[
            { label: "Total Input", value: piecesSummary.total_input },
            {
              label: "Total Harga Asal",
              value: formatRupiah(piecesSummary.total_price),
            },
            {
              label: "Total Harga Gudang",
              value: formatRupiah(piecesSummary.total_warehouse_price),
            },
          ]}
        />
      </StatsSectionWrapper>

      <DataTable
        title="Daftar Input Pieces"
        data={piecesItems}
        columns={[
          {
            key: "warehouse_barcode",
            header: "Barcode Gudang",
            accessor: "warehouse_barcode",
          },
          { key: "name", header: "Nama", accessor: "name" },
          { key: "qty", header: "Qty", accessor: "qty" },
          {
            key: "warehouse_price",
            header: "Harga Gudang",
            accessor: (item: any) => formatRupiah(item.warehouse_price),
          },
          {
            key: "category",
            header: "Kategori",
            accessor: (item: any) => item.category || "-",
          },
          {
            key: "sticker",
            header: "Sticker",
            accessor: (item: any) => renderStickerBadge(item.sticker, item.category),
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
        searchableKeys={["warehouse_barcode", "name", "category", "date", "user"]}
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
        topButton={{
          label: "Input Barang",
          href: "/pieces/input",
        }}
      />

      <Modal
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        title="Detail Item Pieces"
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
            <InfoDisplay
              label="Barcode Gudang"
              value={selectedItem.warehouse_barcode}
            />
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
            <InfoDisplay label="Kategori" value={selectedItem.category || "-"} />
            <InfoDisplay
              label="Sticker"
              value={selectedItem.category ? "-" : selectedItem.sticker || "-"}
            />
            <InfoDisplay label="Tanggal" value={selectedItem.date || "-"} />
            <InfoDisplay label="User" value={selectedItem.user || "-"} />
          </div>
        )}
      </Modal>
    </div>
  );
}
