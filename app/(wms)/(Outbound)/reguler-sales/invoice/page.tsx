"use client";

import DataTable from "@/components/data-tables/DataTable";
import { InfoDisplay } from "@/components/globals/additionals/Inputs";
import {
  BadgePercent,
  Box,
  Pencil,
  Hash,
  LayoutList,
  User,
} from "lucide-react";
import { useState } from "react";
import Modal from "@/components/globals/additionals/Modal";
import Button from "@/components/globals/buttons/ButtonPrimary";

const formatRupiah = (value: number) =>
  `Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

const invoiceData = {
  kodeInvoice: "INV-2026-0329-001",
  buyer: {
    nama: "Toko Maju Jaya",
    classTerpakai: "Silver",
    classBerikutnya: "Gold",
    sisaBelanja: 3,
    tanggalBelanja: "2026-03-29",
    voucher: "DISC10",
    namaKasir: "Anas Syihabuddin",
  },
  summary: {
    totalHargaProduk: 3250000,
    diskonClass: 325000,
    diskonVoucher: 100000,
    ppn: 356500,
    grandTotal: 3181500,
    box: {
      item: 2,
      harga: 10000,
    },
  },
};

const listItems = [
  {
    barcode: "WH330101",
    nama: "Premix Ayam 1 Kg",
    qty: 10,
    harga_satuan: 75000,
    diskon: 7500,
    subtotal: 675000,
  },
  {
    barcode: "WH330102",
    nama: "Premix Ayam 5 Kg",
    qty: 6,
    harga_satuan: 210000,
    diskon: 21000,
    subtotal: 1134000,
  },
  {
    barcode: "WH330103",
    nama: "Premix Ikan 500 gr",
    qty: 14,
    harga_satuan: 45000,
    diskon: 4500,
    subtotal: 567000,
  },
  {
    barcode: "WH330104",
    nama: "Suplemen Sapi 2 Kg",
    qty: 8,
    harga_satuan: 109000,
    diskon: 10900,
    subtotal: 874000,
  },
];

export default function InvoicePage() {
  const { kodeInvoice, buyer, summary } = invoiceData;
  const [isBoxModalOpen, setIsBoxModalOpen] = useState(false);
  const [boxForm, setBoxForm] = useState({
    item: summary.box.item,
    harga: summary.box.harga,
  });

  const totalBox = boxForm.item * boxForm.harga;
  const grandTotalWithBox = summary.grandTotal + totalBox;

  return (
    <div className="space-y-6">
      {/* Document Code Header */}
      <div className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3">
        <Hash className="h-5 w-5 text-blue-400" />
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
            Kode Dokumen Invoice
          </span>
          <span className="text-base font-black tracking-tight text-blue-700">
            {kodeInvoice}
          </span>
        </div>
      </div>

      {/* Section 1 — Info Buyer */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/50 p-4">
          <User className="h-5 w-5 text-blue-400" />
          <h3 className="font-semibold text-slate-700">Info Buyer</h3>
        </div>
        <div className="grid grid-cols-1 gap-x-8 p-5 sm:grid-cols-2 md:grid-cols-3">
          <InfoDisplay label="Nama Buyer" value={buyer.nama} />
          <InfoDisplay label="Class Terpakai" value={
            <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold uppercase text-amber-700">
              {buyer.classTerpakai}
            </span>
          } />
          <InfoDisplay
            label="Class Berikutnya"
            value={
              <div className="flex flex-col gap-0.5">
                <span className="inline-flex w-fit rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold uppercase text-blue-700">
                  {buyer.classBerikutnya}
                </span>
                <span className="text-xs text-slate-400">
                  Tinggal {buyer.sisaBelanja}x belanja lagi
                </span>
              </div>
            }
          />
          <InfoDisplay label="Tanggal Belanja" value={buyer.tanggalBelanja} />
          <InfoDisplay
            label="Voucher Dipakai"
            value={
              <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold uppercase text-emerald-700">
                {buyer.voucher}
              </span>
            }
          />
          <InfoDisplay label="Nama Kasir" value={buyer.namaKasir} />
        </div>
      </div>

      {/* Section 2 — Summary */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/50 p-4">
          <BadgePercent className="h-5 w-5 text-blue-400" />
          <h3 className="font-semibold text-slate-700">Ringkasan Pembayaran</h3>
        </div>
        <div className="grid grid-cols-1 gap-x-10 p-5 sm:grid-cols-2">
          <div>
            <InfoDisplay
              label="Total Harga Produk"
              value={formatRupiah(summary.totalHargaProduk)}
            />
            <InfoDisplay
              label="Diskon Class"
              value={
                <span className="text-red-500">- {formatRupiah(summary.diskonClass)}</span>
              }
            />
            <InfoDisplay
              label="Diskon Voucher"
              value={
                <span className="text-red-500">- {formatRupiah(summary.diskonVoucher)}</span>
              }
            />
            <InfoDisplay
              label="PPN"
              value={
                <span className="text-amber-600">+ {formatRupiah(summary.ppn)}</span>
              }
            />
          </div>
          <div className="flex flex-col justify-end gap-3">
            {/* Grand Total tanpa box */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Grand Total
                  </span>
                  <p className="text-[10px] text-slate-400">(belum termasuk box)</p>
                </div>
                <span className="text-base font-black text-slate-700">
                  {formatRupiah(summary.grandTotal)}
                </span>
              </div>
            </div>
            {/* Grand Total termasuk box */}
            <div className="rounded-xl bg-blue-50 px-4 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-500">
                    Grand Total
                  </span>
                  <p className="text-[10px] text-blue-400">(sudah termasuk box)</p>
                </div>
                <span className="text-base font-black text-blue-700">
                  {formatRupiah(grandTotalWithBox)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Box / Kardus — compact card */}
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-slate-100 p-2 text-slate-500">
            <Box className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Pembelian Box / Kardus
            </p>
            <p className="text-sm font-semibold text-slate-700">
              {boxForm.item} box &times; {formatRupiah(boxForm.harga)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Box</p>
            <p className="text-base font-black text-slate-700">{formatRupiah(totalBox)}</p>
          </div>
          <button
            type="button"
            onClick={() => setIsBoxModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-200"
          >
            <Pencil size={13} />
            Adjust
          </button>
        </div>
      </div>

      <Modal
        isOpen={isBoxModalOpen}
        onClose={() => setIsBoxModalOpen(false)}
        title="Adjust Box / Kardus"
        size="sm"
        footer={
          <>
            <Button label="Batal" variant="outline" onClick={() => setIsBoxModalOpen(false)} />
            <Button label="Simpan" variant="primary" onClick={() => setIsBoxModalOpen(false)} />
          </>
        }
      >
        <div className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Jumlah Box
            </label>
            <input
              type="number"
              min={0}
              value={boxForm.item}
              onChange={(e) =>
                setBoxForm((prev) => ({ ...prev, item: Number(e.target.value) }))
              }
              className="w-full rounded-xl border border-slate-200 p-3 text-sm font-medium text-slate-700 outline-none transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Harga per Box
            </label>
            <input
              type="number"
              min={0}
              value={boxForm.harga}
              onChange={(e) =>
                setBoxForm((prev) => ({ ...prev, harga: Number(e.target.value) }))
              }
              className="w-full rounded-xl border border-slate-200 p-3 text-sm font-medium text-slate-700 outline-none transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            />
          </div>
          <div className="rounded-xl bg-slate-50 px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Box</span>
              <span className="text-sm font-black text-slate-700">
                {formatRupiah(boxForm.item * boxForm.harga)}
              </span>
            </div>
          </div>
        </div>
      </Modal>

      {/* Section 3 — List Item */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/50 p-4">
          <LayoutList className="h-5 w-5 text-blue-400" />
          <h3 className="font-semibold text-slate-700">List Item Pembelian</h3>
        </div>
        <div className="p-6">
          <DataTable
            title=""
            data={listItems}
            exportConfig={{ show: true }}
            columns={[
              { key: "barcode", header: "Barcode", accessor: "barcode" },
              { key: "nama", header: "Nama Produk", accessor: "nama" },
              { key: "qty", header: "Qty", accessor: "qty" },
              {
                key: "harga_satuan",
                header: "Harga Satuan",
                accessor: (row: any) => formatRupiah(row.harga_satuan),
              },
              {
                key: "diskon",
                header: "Diskon",
                accessor: (row: any) => (
                  <span className="text-red-500">
                    - {formatRupiah(row.diskon)}
                  </span>
                ),
              },
              {
                key: "subtotal",
                header: "Subtotal",
                accessor: (row: any) => (
                  <span className="font-semibold">
                    {formatRupiah(row.subtotal)}
                  </span>
                ),
              },
            ]}
            searchableKeys={["barcode", "nama"]}
          />
        </div>
      </div>
    </div>
  );
}
