"use client";

import { useState } from "react";
import Button from "@/components/globals/buttons/ButtonPrimary";
import CardKeyValueHorizontal from "@/components/globals/cards/CardKeyValueHorizontal";
import StatsSectionWrapper from "@/components/globals/cards/StatsSectionWrapper";
import DataTable from "@/components/data-tables/DataTable";
import Modal from "@/components/globals/additionals/Modal";
import {
  InfoDisplay,
  InputNumber,
  InputRupiah,
  InputText,
  InputTextArea,
} from "@/components/globals/additionals/Inputs";
import { Activity, Edit, PackageSearch } from "lucide-react";

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

type AbnormalStatus = "fixed" | "pending";

interface AbnormalItem {
  barcode: string;
  name: string;
  qty: number;
  price: number;
  keterangan: string;
  status: AbnormalStatus;
  barcodeGudang: string;
  namaGudang: string;
  qtyGudang: number;
  hargaGudang: number;
}

const renderStatusBadge = (status: AbnormalStatus) => {
  const map: Record<AbnormalStatus, { label: string; className: string }> = {
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

const produkAbnormal: AbnormalItem[] = [
  {
    barcode: "899100110001",
    name: "Premix Ayam 1 Kg",
    qty: 8,
    price: 75000,
    keterangan: "Kemasan penyok",
    status: "pending",
    barcodeGudang: "WH-220011",
    namaGudang: "Premix Ayam 1 Kg",
    qtyGudang: 8,
    hargaGudang: 78000,
  },
  {
    barcode: "899100110002",
    name: "Premix Ayam 5 Kg",
    qty: 3,
    price: 210000,
    keterangan: "Label tidak terbaca",
    status: "fixed",
    barcodeGudang: "WH-220012",
    namaGudang: "Premix Ayam 5 Kg",
    qtyGudang: 3,
    hargaGudang: 214000,
  },
  {
    barcode: "899100110003",
    name: "Premix Sapi 1 Kg",
    qty: 5,
    price: 82000,
    keterangan: "Segel rusak",
    status: "pending",
    barcodeGudang: "WH-220013",
    namaGudang: "Premix Sapi 1 Kg",
    qtyGudang: 5,
    hargaGudang: 84000,
  },
];

export default function AbnormalPage() {
  const [rows, setRows] = useState<AbnormalItem[]>(produkAbnormal);
  const [selected, setSelected] = useState<AbnormalItem | null>(null);
  const [form, setForm] = useState({
    name: "",
    price: 0,
    qty: 0,
    keterangan: "",
  });

  const handleOpen = (item: AbnormalItem) => {
    setSelected(item);
    setForm({
      name: item.name,
      price: item.price,
      qty: item.qty,
      keterangan: item.keterangan,
    });
  };

  const handleClose = () => setSelected(null);

  const handleSave = () => {
    if (!selected) return;
    setRows((prev) =>
      prev.map((item) =>
        item.barcode === selected.barcode
          ? {
              ...item,
              name: form.name,
              price: form.price,
              qty: form.qty,
              keterangan: form.keterangan,
            }
          : item,
      ),
    );
    handleClose();
  };

  return (
    <div className="space-y-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Abnormal</h2>
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
          title="Produk Abnormal"
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
            {
              key: "status",
              header: "Status",
              accessor: (item: any) => renderStatusBadge(item.status),
            },
            { key: "keterangan", header: "Keterangan", accessor: "keterangan" },
          ]}
          searchableKeys={["barcode", "name"]}
          filters={[
            {
              label: "Filter Status",
              accessor: "status",
              options: [
                { label: "Fixed", value: "fixed" },
                { label: "Pending", value: "pending" },
              ],
            },
          ]}
          topButton={{
            show: false,
            label: "",
          }}
          actions={{
            customActions: [
              {
                label: "Edit",
                icon: <Edit size={18} />,
                color: "blue",
                onClick: (item) => handleOpen(item as AbnormalItem),
              },
            ],
          }}
        />
      </section>

      <Modal
        isOpen={Boolean(selected)}
        onClose={handleClose}
        title="Edit Produk Abnormal"
        size="xl"
        footer={
          <>
            <Button label="Batal" variant="outline" onClick={handleClose} />
            <Button label="To Invetory" onClick={handleSave} />
          </>
        }
      >
        {selected && (
          <div className="space-y-5">
            {/* Card Info: Tanggal Masuk & Lokasi */}
            <div className="flex divide-x divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Status
                </p>
                <p className="mt-0.5 text-sm font-semibold text-slate-700">
                  {renderStatusBadge(selected.status)}
                </p>
              </div>
            </div>

            {/* 2 Card Info */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Data Asal
                </h4>
                <div className="mt-3 space-y-1">
                  <InfoDisplay label="Barcode" value={selected.barcode} />
                  <InfoDisplay label="Nama" value={selected.name} />
                  <InfoDisplay label="Qty" value={selected.qty} />
                  <InfoDisplay
                    label="Harga Asal"
                    value={formatRupiah(selected.price)}
                  />
                </div>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-700">
                  Data Gudang
                </h4>
                <div className="mt-3 space-y-1">
                  <InfoDisplay
                    label="Barcode Gudang"
                    value={selected.barcodeGudang}
                  />
                  <InfoDisplay
                    label="Nama Gudang"
                    value={selected.namaGudang}
                  />
                  <InfoDisplay label="Qty Gudang" value={selected.qtyGudang} />
                  <InfoDisplay
                    label="Harga Gudang"
                    value={formatRupiah(selected.hargaGudang)}
                  />
                </div>
              </div>
            </div>

            {/* Form Edit */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-600">
                Form Edit
              </h4>
              <InputText
                label="Nama"
                name="name"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <div className="grid grid-cols-1 mt-4 gap-4 md:grid-cols-2">
                <InputRupiah
                  label="Harga Asal"
                  name="price"
                  value={form.price}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      price: Number(e.target.value || 0),
                    }))
                  }
                />
                <InputNumber
                  label="Qty"
                  name="qty"
                  value={form.qty}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      qty: Number(e.target.value || 0),
                    }))
                  }
                />
              </div>
              <div className="mt-4">
                <InputTextArea
                  label="Keterangan"
                  name="keterangan"
                  rows={3}
                  value={form.keterangan}
                  placeholder="Tulis keterangan..."
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, keterangan: e.target.value }))
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
