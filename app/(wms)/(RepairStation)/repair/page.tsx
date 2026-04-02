"use client";

import { useMemo, useState } from "react";
import Button from "@/components/globals/buttons/ButtonPrimary";
import CardKeyValueHorizontal from "@/components/globals/cards/CardKeyValueHorizontal";
import StatsSectionWrapper from "@/components/globals/cards/StatsSectionWrapper";
import DataTable from "@/components/data-tables/DataTable";
import Modal from "@/components/globals/additionals/Modal";
import {
  InfoDisplay,
  InputNumber,
  InputRupiah,
  InputSelectSearch,
  InputTextArea,
} from "@/components/globals/additionals/Inputs";
import { Activity, PackageSearch, Wrench } from "lucide-react";

const formatRupiah = (value: number) =>
  `Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

const saldoAwal = {
  item: 320,
  hargaAsal: 12_450_000,
};

const saldoAkhirRealtime = {
  item: 338,
  hargaAsal: 13_180_000,
};

type RepairStatus = "progress" | "pending" | "done";
type RepairCategory = "Feed" | "Supplement" | "Accessory";

interface RepairItem {
  barcode: string;
  name: string;
  qty: number;
  price: number;
  status: RepairStatus;
  category: RepairCategory;
  notes?: string;
  destination?: "inventory" | "qcd";
  repairDate: string;
  location: "Staging" | "Display";
}

const renderStatusBadge = (status: RepairStatus) => {
  const statusMap: Record<RepairStatus, { label: string; className: string }> = {
    progress: {
      label: "Progress",
      className: "bg-amber-100 text-amber-700",
    },
    pending: {
      label: "Pending",
      className: "bg-slate-100 text-slate-700",
    },
    done: {
      label: "Done",
      className: "bg-emerald-100 text-emerald-700",
    },
  };

  const currentStatus = statusMap[status];

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold uppercase ${currentStatus.className}`}
    >
      {currentStatus.label}
    </span>
  );
};

const produkBelumTerscan: RepairItem[] = [
  {
    barcode: "899100110001",
    name: "Premix Ayam 1 Kg",
    qty: 24,
    price: 75000,
    status: "progress",
    category: "Feed",
    repairDate: "2026-03-25",
    location: "Staging",
  },
  {
    barcode: "899100110002",
    name: "Premix Ayam 5 Kg",
    qty: 12,
    price: 210000,
    status: "pending",
    category: "Supplement",
    repairDate: "2026-03-26",
    location: "Display",
  },
  {
    barcode: "899100110003",
    name: "Premix Sapi 1 Kg",
    qty: 18,
    price: 82000,
    status: "done",
    category: "Accessory",
    repairDate: "2026-03-27",
    location: "Staging",
  },
];

export default function RepairPage() {
  const [repairRows, setRepairRows] = useState<RepairItem[]>(produkBelumTerscan);
  const [selectedRepairItem, setSelectedRepairItem] = useState<RepairItem | null>(null);
  const [repairForm, setRepairForm] = useState<{
    qty: number;
    price: number;
    category: RepairCategory;
    notes: string;
  }>({
    qty: 0,
    price: 0,
    category: "Feed",
    notes: "",
  });

  const isCategoryEditable = repairForm.price > 100000;
  const isStickerItem = repairForm.price < 100000;

  const calculatedWarehousePrice = useMemo(() => {
    // Simulasi kalkulasi harga gudang: markup 8% + biaya handling per qty.
    return Math.round(repairForm.price * 1.08 + repairForm.qty * 250);
  }, [repairForm.price, repairForm.qty]);

  const handleOpenRepairModal = (item: RepairItem) => {
    setSelectedRepairItem(item);
    setRepairForm({
      qty: item.qty,
      price: item.price,
      category: item.category,
      notes: item.notes || "",
    });
  };

  const handleCloseRepairModal = () => {
    setSelectedRepairItem(null);
  };

  const handleSaveRepair = (destination: "inventory" | "qcd") => {
    if (!selectedRepairItem) return;

    const nextCategory = isCategoryEditable
      ? repairForm.category
      : selectedRepairItem.category;

    setRepairRows((prev) =>
      prev.map((item) =>
        item.barcode === selectedRepairItem.barcode
          ? {
              ...item,
              qty: repairForm.qty,
              price: repairForm.price,
              category: nextCategory,
              notes: repairForm.notes,
              destination,
              status: destination === "inventory" ? "done" : "pending",
            }
          : item,
      ),
    );

    handleCloseRepairModal();
  };

  return (
    <div className="space-y-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Reparasi</h2>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
          {new Date().toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>

            <StatsSectionWrapper title="Ringkasan">
<section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <CardKeyValueHorizontal
          title="Saldo Awal"
          icon={<PackageSearch className="h-5 w-5" />}
          items={[
            { label: "Item", value: saldoAwal.item },
            { label: "Harga Asal", value: formatRupiah(saldoAwal.hargaAsal) },
          ]}
        />

        <CardKeyValueHorizontal
          title="Saldo Akhir / Realtime"
          icon={<Activity className="h-5 w-5" />}
          items={[
            { label: "Item", value: saldoAkhirRealtime.item },
            {
              label: "Harga Asal",
              value: formatRupiah(saldoAkhirRealtime.hargaAsal),
            },
          ]}
        />
      </section>
      </StatsSectionWrapper>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <DataTable
          title="Produk Belum Terscan"
          data={repairRows}
          columns={[
            { key: "barcode", header: "Barcode", accessor: "barcode" },
            { key: "name", header: "Nama", accessor: "name" },
            { key: "qty", header: "Item", accessor: "qty" },
            {
              key: "price",
              header: "Harga Asal",
              accessor: (item: any) => formatRupiah(item.price),
            },
            {
              key: "status",
              header: "Status",
              accessor: (item: any) => renderStatusBadge(item.status),
            },
          ]}
          searchableKeys={["barcode", "name"]}
          filters={[
            {
              label: "Filter Status",
              accessor: "status",
              options: [
                { label: "Progress", value: "progress" },
                { label: "Pending", value: "pending" },
                { label: "Done", value: "done" },
              ],
            },
          ]}
          actions={{
            customActions: [
              {
                label: "Perbaiki",
                icon: <Wrench size={18} />,
                color: "amber",
                onClick: (item) => handleOpenRepairModal(item as RepairItem),
              },
            ],
          }}
          topButton={{
            show: false,
            label: "",
          }}
          exportConfig={{
            show: true
          }}
        />
      </section>

      <Modal
        isOpen={Boolean(selectedRepairItem)}
        onClose={handleCloseRepairModal}
        title="Reparasi Barang"
        size="xl"
        footer={
          <>
            <Button
              label="Batal"
              variant="outline"
              onClick={handleCloseRepairModal}
            />
            <Button
              label="To QCD"
              variant="warning"
              onClick={() => handleSaveRepair("qcd")}
            />
            <Button
              label="To Inventory"
              variant="success"
              onClick={() => handleSaveRepair("inventory")}
            />
          </>
        }
      >
        {selectedRepairItem && (
          <div className="space-y-5">

            {/* Card Info: Tanggal Masuk & Lokasi */}
            <div className="flex divide-x divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tanggal Masuk ke Repair</p>
                <p className="mt-0.5 text-sm font-semibold text-slate-700">
                  {selectedRepairItem.repairDate}
                </p>
              </div>
              <div className="px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Lokasi Asal</p>
                <p className="mt-0.5 text-sm font-semibold text-slate-700">{selectedRepairItem.location}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Data Asal
                </h4>
                <div className="mt-3 space-y-1">
                  <InfoDisplay label="Barcode" value={selectedRepairItem.barcode} />
                  <InfoDisplay label="Nama Produk" value={selectedRepairItem.name} />
                  <InfoDisplay label="Status" value={renderStatusBadge(selectedRepairItem.status)} />
                </div>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-700">
                  Info Data Gudang
                </h4>
                <div className="mt-3 space-y-1">
                  <InfoDisplay label="Qty Gudang (Simulasi)" value={repairForm.qty} />
                  <InfoDisplay label="Harga Gudang (Kalkulasi)" value={formatRupiah(calculatedWarehousePrice)} />
                  <InfoDisplay
                    label="Kategori Gudang"
                    value={isCategoryEditable ? repairForm.category : selectedRepairItem.category}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-600">
                Form Perbaikan
              </h4>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputRupiah
                  label="Harga Asal"
                  name="price"
                  value={repairForm.price}
                  onChange={(e) =>
                    setRepairForm((prev) => ({
                      ...prev,
                      price: Number(e.target.value || 0),
                    }))
                  }
                />

                <InputNumber
                  label="Qty Asal"
                  name="qty"
                  value={repairForm.qty}
                  onChange={(e) =>
                    setRepairForm((prev) => ({
                      ...prev,
                      qty: Number(e.target.value || 0),
                    }))
                  }
                />
              </div>

              <div className="mt-4">
                {isCategoryEditable ? (
                  <InputSelectSearch
                    label="Kategori"
                    value={repairForm.category}
                    onChange={(value) =>
                      setRepairForm((prev) => ({
                        ...prev,
                        category: value as RepairCategory,
                      }))
                    }
                    options={[
                      { label: "Feed", value: "Feed" },
                      { label: "Supplement", value: "Supplement" },
                      { label: "Accessory", value: "Accessory" },
                    ]}
                    placeholder="Pilih kategori"
                  />
                ) : (
                  <div className="space-y-2">
                    {!isStickerItem && (
                      <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-medium text-amber-700">
                        Kategori hanya bisa diubah jika harga asal di atas Rp 100.000.
                      </div>
                    )}
                    {isStickerItem && (
                      <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm font-semibold text-blue-700">
                        Keterangan: ini barang stiker.
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-4">
                <InputTextArea
                  label="Keterangan"
                  name="notes"
                  rows={3}
                  value={repairForm.notes}
                  placeholder="Tulis keterangan perbaikan barang..."
                  onChange={(e) =>
                    setRepairForm((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
