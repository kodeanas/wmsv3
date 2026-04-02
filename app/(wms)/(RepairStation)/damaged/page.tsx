"use client";

import { useState } from "react";
import Button from "@/components/globals/buttons/ButtonPrimary";
import { InfoDisplay } from "@/components/globals/additionals/Inputs";
import CardKeyValueHorizontal from "@/components/globals/cards/CardKeyValueHorizontal";
import StatsSectionWrapper from "@/components/globals/cards/StatsSectionWrapper";
import DataTable from "@/components/data-tables/DataTable";
import Modal from "@/components/globals/additionals/Modal";
import { Activity, Eye, PackageSearch } from "lucide-react";

const formatRupiah = (value: number) =>
  `Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

const saldoAwal = {
  item: 145,
  hargaAsal: 8_750_000,
};

const saldoAkhirRealtime = {
  item: 152,
  hargaAsal: 9_120_000,
};

type DamagedStatus = "fixed" | "pending";

interface DamagedItem {
  barcode: string;
  name: string;
  qty: number;
  price: number;
  keterangan: string;
  status: DamagedStatus;
}

const renderStatusBadge = (status: DamagedStatus) => {
  const map: Record<DamagedStatus, { label: string; className: string }> = {
    fixed: { label: "Fixed", className: "bg-emerald-100 text-emerald-700" },
    pending: { label: "Pending", className: "bg-slate-100 text-slate-700" },
  };
  const s = map[status];
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold uppercase ${s.className}`}
    >
      {s.label}
    </span>
  );
};

const produkDamaged: DamagedItem[] = [
  {
    barcode: "899100110001",
    name: "Premix Ayam 1 Kg",
    qty: 8,
    price: 75000,
    keterangan: "Kemasan penyok",
    status: "pending",
  },
  {
    barcode: "899100110002",
    name: "Premix Ayam 5 Kg",
    qty: 3,
    price: 210000,
    keterangan: "Label tidak terbaca",
    status: "fixed",
  },
  {
    barcode: "899100110003",
    name: "Premix Sapi 1 Kg",
    qty: 5,
    price: 82000,
    keterangan: "Segel rusak",
    status: "pending",
  },
];

export default function DamagedPage() {
  const [rows, setRows] = useState<DamagedItem[]>(produkDamaged);
  const [selectedItem, setSelectedItem] = useState<DamagedItem | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleExport = (data: DamagedItem[]) => {
    console.log("Export Damaged:", data);
  };

  return (
    <div className="space-y-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Damaged</h2>
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
          title="Produk Damaged"
          data={rows}
          columns={[
            { key: "barcode", header: "Barcode", accessor: "barcode" },
            { key: "name", header: "Nama", accessor: "name" },
            { key: "qty", header: "Item", accessor: "qty" },
            {
              key: "price",
              header: "Harga Asal",
              accessor: (item: any) => formatRupiah(item.price),
            },
            { key: "keterangan", header: "Keterangan", accessor: "keterangan" },
          ]}
          searchableKeys={["barcode", "name"]}
          topButton={{
            label: "Buang Semua",
            onClick: () => setIsConfirmOpen(true),
          }}
          exportConfig={{
            show: true,
            onExport: handleExport,
          }}
          actions={{
            customActions: [
              {
                label: "Detail",
                icon: <Eye size={18} />,
                color: "blue",
                onClick: (item) => setSelectedItem(item as DamagedItem),
              },
            ],
          }}
        />
      </section>

      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Konfirmasi Buang Semua"
        size="sm"
        footer={
          <>
            <Button
              label="Batal"
              variant="outline"
              onClick={() => setIsConfirmOpen(false)}
            />
            <Button
              label="Ya Saya Setuju"
              variant="danger"
              onClick={() => {
                setRows([]);
                setIsConfirmOpen(false);
              }}
            />
          </>
        }
      >
        <p className="text-sm font-medium text-slate-600">
          Semua data pada tabel akan dihapus. Lanjutkan proses ini?
        </p>
      </Modal>

      <Modal
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        title="Detail Produk Damaged"
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
            <InfoDisplay label="Harga Asal" value={formatRupiah(selectedItem.price)} />
            <InfoDisplay label="Keterangan" value={selectedItem.keterangan} />
            <InfoDisplay label="Status" value={renderStatusBadge(selectedItem.status)} />
          </div>
        )}
      </Modal>
    </div>
  );
}
