"use client";

import Button from "@/components/globals/buttons/ButtonPrimary";
import DataTable from "@/components/data-tables/DataTable";
import CardKeyValueVertical from "@/components/globals/cards/CardKeyValueVertical";
import CardMatrix from "@/components/globals/cards/CardMatrix";
import ScannerCard from "@/components/globals/additionals/ScannerCard";
import Modal from "@/components/globals/additionals/Modal";
import BarcodeModal from "@/components/globals/additionals/BarcodeModal";
import { InfoDisplay } from "@/components/globals/additionals/Inputs";
import { Eye, Flag, Package, Printer } from "lucide-react";
import { useState } from "react";

const formatRupiah = (value: number) =>
  `Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

const cargoInfo = {
  codeCargo: "CRG-WS-001",
  status: "lock",
  is_sale: false,
};

const cargoStats = {
  totalItem: 260,
  totalHargaAsal: 13_450_000,
};

const matrixData: Record<string, Record<string, number>> = {
  Elektronik: { Item: 120, "Harga Asal": 7_200_000 },
  Fashion: { Item: 140, "Harga Asal": 6_250_000 },
  Otomotif: { Item: 80, "Harga Asal": 3_000_000 },
};

const bagData = [
  {
    code_bag: "WS-BAG-011",
    total_item: 45,
    total_harga_gudang: 5625000,
    status: "lock",
  },
  {
    code_bag: "WS-BAG-012",
    total_item: 22,
    total_harga_gudang: 7744000,
    status: "lock",
  },
  {
    code_bag: "WS-BAG-013",
    total_item: 38,
    total_harga_gudang: 3876000,
    status: "lock",
  },
];

type BagItem = (typeof bagData)[number];

export default function DetailCargoWholesalePage() {
  const [selectedBag, setSelectedBag] = useState<BagItem | null>(null);
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);

  const handlePrintBarcode = () => {
    setIsBarcodeModalOpen(true);
  };

  const handleFinish = () => {
    setIsFinishModalOpen(true);
  };

  const handleConfirmFinish = () => {
    console.log("Finish cargo");
    setIsFinishModalOpen(false);
  };

  const handleScanBag = (value: string) => {
    console.log("Scanned bag:", value);
  };

  const handleCloseDetailModal = () => {
    setSelectedBag(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between divide-x divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-1 divide-x divide-slate-100">
          <div className="px-5 py-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Code Cargo
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              {cargoInfo.codeCargo}
            </p>
          </div>

          <div className="px-5 py-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Status
            </p>
            <div className="mt-1">
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${
                  cargoInfo.status === "lock"
                    ? "bg-red-100 text-red-700"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {cargoInfo.status}
              </span>
            </div>
          </div>

          <div className="px-5 py-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Is Sale
            </p>
            <div className="mt-1">
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${
                  cargoInfo.is_sale
                    ? "bg-blue-100 text-blue-700"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {String(cargoInfo.is_sale)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 px-5 py-4">
          <Button
            label="Print Barcode"
            onClick={handlePrintBarcode}
            icon={<Printer size={16} />}
            variant="outline"
            size="sm"
          />
          <Button
            icon={<Flag size={16} />}
            label="Finish"
            onClick={handleFinish}
            size="sm"
          />
        </div>
      </div>

      {/* Horizontal Card + Matrix Card sebelahan */}
<div className="grid grid-cols-3 gap-6">
        <CardKeyValueVertical
          title="Ringkasan Cargo"
          icon={<Package size={20} />}
          items={[
            { label: "Item", value: cargoStats.totalItem },
            {
              label: "Harga Asal",
              value: `Rp ${cargoStats.totalHargaAsal.toLocaleString("id-ID")}`,
            },
          ]}
        />

        <div className=" col-span-2">
          <CardMatrix
            verticalKeys={Object.keys(matrixData)}
            horizontalKeys={["Item", "Harga Asal"]}
            renderValue={(vKey, hKey) => {
              const val = matrixData[vKey]?.[hKey] ?? 0;
              if (hKey === "Harga Asal") {
                return `Rp ${val.toLocaleString("id-ID")}`;
              }
              return val;
            }}
          />
        </div>
      </div>
<ScannerCard
        title="Scan Bag Cargo"
        placeholder="Scan code bag cargo..."
        onScanComplete={handleScanBag}
      />

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <DataTable
          title="Daftar Bag"
          data={bagData}
          exportConfig={{
            show: true,
          }}
          columns={[
            {
              key: "code_bag",
              header: "Code Bag",
              accessor: "code_bag",
            },
            {
              key: "total_item",
              header: "Total Item",
              accessor: "total_item",
            },
            {
              key: "total_harga_gudang",
              header: "Total Harga Gudang",
              accessor: (item: any) => formatRupiah(item.total_harga_gudang),
            },
            {
              key: "status",
              header: "Status",
              accessor: (item: any) => {
                const colorMap: Record<string, string> = {
                  open: "bg-emerald-100 text-emerald-700",
                  close: "bg-amber-100 text-amber-700",
                  lock: "bg-red-100 text-red-700",
                };

                return (
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      colorMap[item.status] || "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {item.status}
                  </span>
                );
              },
            },
          ]}
          searchableKeys={["code_bag", "status"]}
          filters={[
            {
              label: "Semua Status",
              accessor: "status",
              options: [
                { label: "open", value: "open" },
                { label: "close", value: "close" },
                { label: "lock", value: "lock" },
              ],
            },
          ]}
          actions={{
            customActions: [
              {
                label: "Detail",
                icon: <Eye size={18} />,
                color: "blue",
                onClick: (item: BagItem) => setSelectedBag(item),
              },
            ],
          }}
        />
      </section>

      <Modal
        isOpen={!!selectedBag}
        onClose={handleCloseDetailModal}
        title="Detail Bag Cargo"
        size="md"
        footer={
          <button
            type="button"
            onClick={handleCloseDetailModal}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Tutup
          </button>
        }
      >
        <div className="grid grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2">
          <InfoDisplay label="Code Bag" value={selectedBag?.code_bag || "-"} />
          <InfoDisplay label="Total Item" value={selectedBag?.total_item || "-"} />
          <InfoDisplay
            label="Harga Gudang"
            value={selectedBag ? formatRupiah(selectedBag.total_harga_gudang) : "-"}
          />
          <InfoDisplay
            label="Status"
            value={selectedBag?.status || "-"}
          />
        </div>
      </Modal>

      <Modal
        isOpen={isFinishModalOpen}
        onClose={() => setIsFinishModalOpen(false)}
        title="Konfirmasi Finish Cargo"
        size="md"
        footer={
          <>
            <Button
              label="Batal"
              onClick={() => setIsFinishModalOpen(false)}
              variant="outline"
              size="sm"
            />
            <Button
              label="Ya, Finish"
              onClick={handleConfirmFinish}
              variant="danger"
              size="sm"
            />
          </>
        }
      >
        <p className="text-sm leading-relaxed text-slate-600">
          Setelah di-finish, cargo akan ditandai selesai. Pastikan data bag dan item sudah benar.
        </p>
      </Modal>

      <BarcodeModal
        isOpen={isBarcodeModalOpen}
        onClose={() => setIsBarcodeModalOpen(false)}
        barcode={cargoInfo.codeCargo}
        categoryName=""
        discount={0}
        namaBarang={`Cargo Wholesale ${cargoInfo.codeCargo}`}
        hargaRetail={cargoStats.totalHargaAsal}
        hargaDiskon={cargoStats.totalHargaAsal}
      />
    </div>
  );
}
