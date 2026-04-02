"use client";

import { InfoDisplay } from "@/components/globals/additionals/Inputs";
import Modal from "@/components/globals/additionals/Modal";
import CardMatrix from "@/components/globals/cards/CardMatrix";
import CardKeyValueVertical from "@/components/globals/cards/CardKeyValueVertical";
import DataTable from "@/components/data-tables/DataTable";
import Tabs from "@/components/globals/additionals/Tabs";
import { FileText, ScanLine, ScanSearch, Eye } from "lucide-react";
import { useState } from "react";
import Button from "@/components/globals/buttons/ButtonPrimary";
import { formatRibuan } from "@/helper/formatRibuan";

const detailBAST = {
  code: "BAST-001",
  name_file: "upload-premix-01.csv",
  uploaded_date: "2026-03-27",
  total_item: 120,
  total_item_scanned: 95,
  total_price: 950000,
  total_price_scanned: 760000,
  status: "progress",
};

const unscannedProducts = [
  {
    barcode: "899100110001",
    name: "Premix Ayam 1 Kg",
    qty: 24,
    price: 75000,
  },
  {
    barcode: "899100110002",
    name: "Premix Ayam 5 Kg",
    qty: 12,
    price: 210000,
  },
  {
    barcode: "899100110003",
    name: "Premix Sapi 1 Kg",
    qty: 18,
    price: 82000,
  },
  {
    barcode: "899100110004",
    name: "Premix Ikan 500 gr",
    qty: 30,
    price: 45000,
  },
];

const scannedProducts = [
  {
    barcode: "899100110011",
    warehouse_barcode: "WH-220011",
    name: "Premix Ayam 1 Kg",
    qty: 20,
    price: 75000,
    warehouse_price: 77000,
    category: "Feed",
    sticker: null,
  },
  {
    barcode: "899100110012",
    warehouse_barcode: "WH-220012",
    name: "Premix Ayam 5 Kg",
    qty: 10,
    price: 210000,
    warehouse_price: 214000,
    category: null,
    sticker: "Big",
  },
  {
    barcode: "899100110013",
    warehouse_barcode: "WH-220013",
    name: "Premix Sapi 1 Kg",
    qty: 15,
    price: 82000,
    warehouse_price: 83500,
    category: "Supplement",
    sticker: null,
  },
  {
    barcode: "899100110014",
    warehouse_barcode: "WH-220014",
    name: "Premix Ikan 500 gr",
    qty: 28,
    price: 45000,
    warehouse_price: 47000,
    category: null,
    sticker: "Tiny",
  },
];

const formatRupiah = (value: number) =>
  `Rp ${formatRibuan(value)}`;

const matrixVerticalKeys = [
  "Lolos",
  "Abnormal",
  "Damaged",
  "Non",
  "Total Scan",
  "Total Ekspektasi",
  "Discrepancy",
];

const matrixHorizontalKeys = [
  "Item",
  "Percentase Item",
  "Harga",
  "Percentase Harga",
];

const matrixData: Record<string, Record<string, string>> = {
  Lolos: {
    Item: "78",
    "Percentase Item": "65.00%",
    Harga: formatRupiah(610000),
    "Percentase Harga": "64.21%",
  },
  Abnormal: {
    Item: "9",
    "Percentase Item": "7.50%",
    Harga: formatRupiah(82000),
    "Percentase Harga": "8.63%",
  },
  Damaged: {
    Item: "4",
    "Percentase Item": "3.33%",
    Harga: formatRupiah(28000),
    "Percentase Harga": "2.95%",
  },
  Non: {
    Item: "4",
    "Percentase Item": "3.33%",
    Harga: formatRupiah(40000),
    "Percentase Harga": "4.21%",
  },
  "Total Scan": {
    Item: "95",
    "Percentase Item": "79.17%",
    Harga: formatRupiah(760000),
    "Percentase Harga": "80.00%",
  },
  "Total Ekspektasi": {
    Item: "120",
    "Percentase Item": "100.00%",
    Harga: formatRupiah(950000),
    "Percentase Harga": "100.00%",
  },
  Discrepancy: {
    Item: "25",
    "Percentase Item": "20.83%",
    Harga: formatRupiah(190000),
    "Percentase Harga": "20.00%",
  },
};

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

export default function DetailBASTPage() {
  const [isEditStatusModalOpen, setIsEditStatusModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof unscannedProducts)[number] | null
  >(null);
  const [selectedScannedProduct, setSelectedScannedProduct] = useState<
    (typeof scannedProducts)[number] | null
  >(null);
  const statusClassName =
    detailBAST.status === "done"
      ? "inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold uppercase text-emerald-700"
      : "inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold uppercase text-amber-700";

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
                  {detailBAST.code}
                </span>
              ),
            },
            { label: "Nama File", value: detailBAST.name_file },
            { label: "Tanggal Upload", value: detailBAST.uploaded_date },
          ]}
        />

        <CardKeyValueVertical
          title="Ringkasan Scan"
          icon={<ScanLine className="h-5 w-5" />}
          items={[
            {
              label: "Status",
              value: (
                <span className={statusClassName}>{detailBAST.status}</span>
              ),
            },
            {
              label: "Total Item / Total Terscan",
              value: `${detailBAST.total_item} / ${detailBAST.total_item_scanned}`,
            },
            {
              label: "Total Price / Total Terscan",
              value: `${formatRupiah(detailBAST.total_price)} / ${formatRupiah(detailBAST.total_price_scanned)}`,
            },
          ]}
          action={{
            label: "Finish",
            onClick: handleOpenEditStatusModal,
          }}
        />
      </section>
      <section>
        <CardMatrix
          title="Matrix Hasil Scan"
          icon={<ScanLine className="h-5 w-5" />}
          verticalKeys={matrixVerticalKeys}
          horizontalKeys={matrixHorizontalKeys}
          renderValue={(vKey, hKey) => matrixData[vKey]?.[hKey] || "-"}
        />
      </section>
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <Tabs
          align="center"
          items={[
            {
              label: "Produk Belum Terscan",
              content: (
                <DataTable
                  title="Produk Belum Terscan"
                  data={unscannedProducts}
                  columns={[
                    { key: "barcode", header: "Barcode", accessor: "barcode" },
                    { key: "name", header: "Nama", accessor: "name" },
                    { key: "qty", header: "Item", accessor: "qty" },
                    {
                      key: "price",
                      header: "Harga Asal",
                      accessor: (item: any) => formatRupiah(item.price),
                    },
                  ]}
                  searchableKeys={["barcode", "name"]}
                  topButton={{
                    label: "Ke Scanner",
                    href: "/bast/detail-bast/scanner",
                    icon: <ScanSearch size={18} />,
                  }}
                  actions={{
                    customActions: [
                      {
                        label: "Detail",
                        icon: <Eye size={18} />,
                        color: "blue",
                        onClick: (item) => setSelectedProduct(item),
                      },
                    ],
                  }}
                />
              ),
            },
            {
              label: "Produk Sudah Terscan",
              content: (
                <DataTable
                  title="Produk Sudah Terscan"
                  data={scannedProducts}
                  columns={[
                    { key: "barcode", header: "Barcode", accessor: "barcode" },
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
                      key: "warehouse_price",
                      header: "Harga Gudang",
                      accessor: (item: any) =>
                        formatRupiah(item.warehouse_price),
                    },
                    {
                      key: "category",
                      header: "Kategori",
                      accessor: (item: any) => item.category || "-",
                    },
                    {
                      key: "sticker",
                      header: "Sticker",
                      accessor: (item: any) => renderStickerBadge(item.sticker),
                    },
                  ]}
                  searchableKeys={["barcode", "warehouse_barcode", "name"]}
                  topButton={{
                    label: "Ke Scanner",
                    href: "/bast/detail-bast/scanner",
                    icon: <ScanSearch size={18} />,
                  }}
                  actions={{
                    customActions: [
                      {
                        label: "Detail",
                        icon: <Eye size={18} />,
                        color: "blue",
                        onClick: (item) => setSelectedScannedProduct(item),
                      },
                    ],
                  }}
                />
              ),
            },
          ]}
        />
      </section>
      <Modal
        isOpen={isEditStatusModalOpen}
        onClose={handleCloseEditStatusModal}
        title="Finish BAST"
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

      <Modal
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        title="Detail Produk"
        size="md"
        footer={
          <>
            <Button
              label="Tutup"
              variant="outline"
              onClick={() => setSelectedProduct(null)}
            />
          </>
        }
      >
        {selectedProduct && (
          <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 md:grid-cols-2 md:gap-x-6">
            <InfoDisplay label="Barcode" value={selectedProduct.barcode} />
            <InfoDisplay label="Nama Produk" value={selectedProduct.name} />
            <InfoDisplay label="Qty" value={selectedProduct.qty} />
            <InfoDisplay
              label="Harga Asal"
              value={formatRupiah(selectedProduct.price)}
            />
          </div>
        )}
      </Modal>

      <Modal
        isOpen={Boolean(selectedScannedProduct)}
        onClose={() => setSelectedScannedProduct(null)}
        title="Detail Produk Sudah Terscan"
        size="md"
        footer={
          <>
            <Button
              label="Tutup"
              variant="outline"
              onClick={() => setSelectedScannedProduct(null)}
            />
          </>
        }
      >
        {selectedScannedProduct && (
          <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 md:grid-cols-2 md:gap-x-6">
            <InfoDisplay
              label="Barcode"
              value={selectedScannedProduct.barcode}
            />
            <InfoDisplay
              label="Barcode Warehouse"
              value={selectedScannedProduct.warehouse_barcode}
            />
            <InfoDisplay
              label="Nama Produk"
              value={selectedScannedProduct.name}
            />
            <InfoDisplay label="Qty" value={selectedScannedProduct.qty} />
            <InfoDisplay
              label="Harga Asal"
              value={formatRupiah(selectedScannedProduct.price)}
            />
            <InfoDisplay
              label="Harga Gudang"
              value={formatRupiah(selectedScannedProduct.warehouse_price)}
            />
            <InfoDisplay
              label="Kategori"
              value={selectedScannedProduct.category || "-"}
            />
            <InfoDisplay
              label="Sticker"
              value={renderStickerBadge(selectedScannedProduct.sticker)}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
