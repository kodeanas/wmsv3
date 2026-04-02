"use client";

import CardKeyValueVertical from "@/components/globals/cards/CardKeyValueVertical";
import StatsSectionWrapper from "@/components/globals/cards/StatsSectionWrapper";
import DataTable from "@/components/data-tables/DataTable";
import { FileText, ScanLine, ScanSearch, Upload } from "lucide-react";
import { formatRibuan } from "@/helper/formatRibuan";

const bulkData = [
  {
    code: "BULK-001",
    name_file: "upload-bulk-01.csv",
    list_items: 220,
    price: 2450000,
    warehouse_price: 2510000,
    date: "2026-03-27",
    uploaded_by: "Rudi Santoso",
  },
  {
    code: "BULK-002",
    name_file: "upload-bulk-02.csv",
    list_items: 175,
    price: 1980000,
    warehouse_price: 2045000,
    date: "2026-03-27",
    uploaded_by: "Maya Putri",
  },
  {
    code: "BULK-003",
    name_file: "upload-bulk-03.csv",
    list_items: 260,
    price: 3120000,
    warehouse_price: 3195000,
    date: "2026-03-26",
    uploaded_by: "Agus Saputra",
  },
  {
    code: "BULK-004",
    name_file: "upload-bulk-04.csv",
    list_items: 145,
    price: 1540000,
    warehouse_price: 1600000,
    date: "2026-03-25",
    uploaded_by: "Lina Wijaya",
  },
];

export default function BulkPage() {
  const formatRupiah = (value: number) => `Rp ${formatRibuan(value)}`;

  const todayInfo = {
    uploadedFiles: 8,
    incomingList: 146,
    warehousePrice: "Rp 18.450.000",
    sourcePrice: "Rp 17.980.000",
  };

  return (
    <div className="space-y-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Data BULK Hari Ini</h2>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
          {new Date().toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>

            <StatsSectionWrapper title="Ringkasan">
<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CardKeyValueVertical
          title="Data File"
          icon={<FileText className="h-6 w-6" />}
          items={[
            { label: "File Yang Di Upload", value: todayInfo.uploadedFiles },
            { label: "List Yang Masuk", value: todayInfo.incomingList },
          ]}
        />
        <CardKeyValueVertical
          title="Ringkasan Harga"
          icon={<ScanLine className="h-6 w-6" />}
          items={[
            { label: "Harga Gudang", value: todayInfo.warehousePrice },
            { label: "Harga Asal", value: todayInfo.sourcePrice },
          ]}
        />
      </div>
      </StatsSectionWrapper>

      <div>
        <DataTable
          title="Daftar File BULK"
          data={bulkData}
          columns={[
            { key: "code", header: "Kode", accessor: "code" },
            { key: "name_file", header: "Nama File", accessor: "name_file" },
            { key: "list_items", header: "Total Item", accessor: "list_items" },
            {
              key: "price",
              header: "Harga Asal",
              accessor: (item: any) => formatRupiah(item.price),
            },
            {
              key: "warehouse_price",
              header: "Harga Gudang",
              accessor: (item: any) => formatRupiah(item.warehouse_price),
            },
            { key: "date", header: "Tanggal Upload", accessor: "date" },
            {
              key: "uploaded_by",
              header: "Uploaded By",
              accessor: "uploaded_by",
            },
          ]}
          searchableKeys={["code", "name_file", "uploaded_by"]}
          dateFilter={{ accessor: "date", show: true }}
          topButton={{
            label: "Upload",
            href: "/bulk/upload",
            icon: <Upload size={18} />,
          }}
          actions={{
            showDetail: true,
            detailHref: (item: any) => `/bulk/detail-bulk`,
          }}
          exportConfig={{ show: true }}
        />
      </div>
    </div>
  );
}
