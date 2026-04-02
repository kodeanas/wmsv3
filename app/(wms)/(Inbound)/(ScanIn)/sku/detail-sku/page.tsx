"use client";

import { useState } from "react";
import DataTable from "@/components/data-tables/DataTable";
import Modal from "@/components/globals/additionals/Modal";
import Button from "@/components/globals/buttons/ButtonPrimary";
import CardMatrix from "@/components/globals/cards/CardMatrix";
import CardKeyValueVertical from "@/components/globals/cards/CardKeyValueVertical";
import { Eye, FileText, ScanLine } from "lucide-react";
import { formatRibuan } from "@/helper/formatRibuan";

const detailSKU = {
  code: "SKU-001",
  name_file: "upload-sku-01.csv",
  uploaded_date: "2026-03-27",
  total_item: 180,
  total_price: 3250000,
  status: "progress",
};

const formatRupiah = (value: number) =>
  `Rp ${formatRibuan(value)}`;

const matrixVerticalKeys = [
  "Lolos",
  "Damaged",
  "Total Terdata",
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
    Item: "119",
    "Percentase Item": "66.11%",
    Harga: formatRupiah(2210000),
    "Percentase Harga": "68.00%",
  },
  Damaged: {
    Item: "6",
    "Percentase Item": "3.33%",
    Harga: formatRupiah(98000),
    "Percentase Harga": "3.02%",
  },
  "Total Terdata": {
    Item: "123",
    "Percentase Item": "69.44%",
    Harga: formatRupiah(2280000),
    "Percentase Harga": "71.00%",
  },
  "Total Ekspektasi": {
    Item: "180",
    "Percentase Item": "100.00%",
    Harga: formatRupiah(3250000),
    "Percentase Harga": "100.00%",
  },
  Discrepancy: {
    Item: "38",
    "Percentase Item": "21.11%",
    Harga: formatRupiah(635000),
    "Percentase Harga": "19.54%",
  },
};

const initialSkuItems = [
  {
    barcode: "899100110011",
    name: "Premix Ayam 1 Kg",
    price_per_pcs: 75000,
    total_item: 20,
    total_good: 16,
    total_damaged: 2,
  },
  {
    barcode: "899100110012",
    name: "Premix Ayam 5 Kg",
    price_per_pcs: 210000,
    total_item: 12,
    total_good: 9,
    total_damaged: 1,
  },
  {
    barcode: "899100110013",
    name: "Premix Sapi 1 Kg",
    price_per_pcs: 82000,
    total_item: 15,
    total_good: 11,
    total_damaged: 1,
  },
  {
    barcode: "899100110014",
    name: "Premix Ikan 500 gr",
    price_per_pcs: 45000,
    total_item: 28,
    total_good: 22,
    total_damaged: 2,
  },
];

export default function DetailSKUPage() {
  const [isEditStatusModalOpen, setIsEditStatusModalOpen] = useState(false);
  const [skuItems, setSkuItems] = useState(initialSkuItems);
  const [selectedItem, setSelectedItem] = useState<
    (typeof initialSkuItems)[number] | null
  >(null);
  const [inputTotals, setInputTotals] = useState({
    good: "",
    damaged: "",
  });

  const openInputModal = (item: (typeof initialSkuItems)[number]) => {
    setSelectedItem(item);
    setInputTotals({
      good: String(item.total_good),
      damaged: String(item.total_damaged),
    });
  };

  const closeInputModal = () => {
    setSelectedItem(null);
    setInputTotals({ good: "", damaged: "" });
  };

  const handleSaveTotals = () => {
    if (!selectedItem) return;

    const parsedGood = Number(inputTotals.good || 0);
    const parsedDamaged = Number(inputTotals.damaged || 0);
    const safeGood = Math.max(0, Math.min(parsedGood, selectedItem.total_item));
    const safeDamaged = Math.max(
      0,
      Math.min(parsedDamaged, selectedItem.total_item - safeGood),
    );

    setSkuItems((prev) =>
      prev.map((item) =>
        item.barcode === selectedItem.barcode
          ? {
              ...item,
              total_good: safeGood,
              total_damaged: safeDamaged,
            }
          : item,
      ),
    );

    closeInputModal();
  };

  const statusClassName =
    detailSKU.status === "done"
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
                  {detailSKU.code}
                </span>
              ),
            },
            { label: "Nama File", value: detailSKU.name_file },
            { label: "Tanggal Upload", value: detailSKU.uploaded_date },
          ]}
        />

        <CardKeyValueVertical
          action={{
            label: "Finish",
            onClick: handleOpenEditStatusModal,
          }}
          title="Ringkasan Scan"
          icon={<ScanLine className="h-5 w-5" />}
          items={[
            {
              label: "Status",
              value: (
                <span className={statusClassName}>{detailSKU.status}</span>
              ),
            },
            {
              label: "Total Item",
              value: `${detailSKU.total_item}`,
            },
            {
              label: "Total Harga Asal",
              value: `${formatRupiah(detailSKU.total_price)}`,
            },
          ]}
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
      <section>
        <DataTable
          title="Daftar Item SKU"
          data={skuItems}
          exportConfig={{
            show: true,
          }}
          pageSize={50}
          columns={[
            { key: "barcode", header: "Barcode", accessor: "barcode" },
            { key: "name", header: "Nama", accessor: "name" },
            {
              key: "price_per_pcs",
              header: "Harga Per Pcs",
              accessor: (item: any) => formatRupiah(item.price_per_pcs),
            },
            { key: "total_item", header: "Total Item", accessor: "total_item" },
            { key: "total_good", header: "Total Good", accessor: "total_good" },
            {
              key: "total_damaged",
              header: "Total Damaged",
              accessor: "total_damaged",
            },
            {
              key: "total_discrepancy",
              header: "Total Discrepancy",
              accessor: (item: any) =>
                Math.max(
                  item.total_item - item.total_good - item.total_damaged,
                  0,
                ),
            },
          ]}
          searchableKeys={["barcode", "name"]}
          actions={{
            customActions: [
              {
                label: "Input",
                icon: <Eye size={18} />,
                color: "blue",
                onClick: (item) => openInputModal(item),
              },
            ],
          }}
        />
      </section>

      <Modal
        isOpen={Boolean(selectedItem)}
        onClose={closeInputModal}
        title="Input Total Good & Damaged"
        size="md"
        footer={
          <div className="flex gap-2">
            <Button label="Batal" variant="outline" onClick={closeInputModal} />
            <Button label="Simpan" onClick={handleSaveTotals} />
          </div>
        }
      >
        {selectedItem && (
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {selectedItem.barcode}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-700">
                {selectedItem.name}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Total Item:{" "}
                <span className="font-bold">{selectedItem.total_item}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Total Good
                </label>
                <input
                  type="number"
                  min={0}
                  max={selectedItem.total_item}
                  value={inputTotals.good}
                  onChange={(e) =>
                    setInputTotals((prev) => ({
                      ...prev,
                      good: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-200 p-3 text-sm focus:border-blue-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Total Damaged
                </label>
                <input
                  type="number"
                  min={0}
                  max={selectedItem.total_item}
                  value={inputTotals.damaged}
                  onChange={(e) =>
                    setInputTotals((prev) => ({
                      ...prev,
                      damaged: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-200 p-3 text-sm focus:border-blue-400 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isEditStatusModalOpen}
        onClose={handleCloseEditStatusModal}
        title="Finish SKU"
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
