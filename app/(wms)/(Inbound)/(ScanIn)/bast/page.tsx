"use client";

import CardKeyValueVertical from "@/components/globals/cards/CardKeyValueVertical";
import StatsSectionWrapper from "@/components/globals/cards/StatsSectionWrapper";
import DataTable from "@/components/data-tables/DataTable";
import { FileText, CheckCircle2, ScanSearch, Upload } from "lucide-react";
import { formatRibuan } from "@/helper/formatRibuan";

const bastData = [
  {
    code: "BAST-001",
    name_file: "upload-premix-01.csv",
    list_items: 120,
    price: 950000,
    status: "progress",
    date: "2026-03-27",
    uploaded_by: "Rudi Santoso",
  },
  {
    code: "BAST-002",
    name_file: "upload-premix-02.csv",
    list_items: 80,
    price: 810000,
    status: "done",
    date: "2026-03-26",
    uploaded_by: "Maya Putri",
  },
  {
    code: "BAST-003",
    name_file: "upload-premix-03.csv",
    list_items: 150,
    price: 1230000,
    status: "cancel",
    date: "2026-03-25",
    uploaded_by: "Agus Saputra",
  },
  {
    code: "BAST-004",
    name_file: "upload-premix-04.csv",
    list_items: 60,
    price: 520000,
    status: "progress",
    date: "2026-03-27",
    uploaded_by: "Lina Wijaya",
  },
];

export default function BASTPage() {
  return (
    <div className="space-y-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Data BAST Hari Ini</h2>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
          {new Date().toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
            <StatsSectionWrapper title="Ringkasan">
<div className="grid grid-cols-2 gap-6">
        <CardKeyValueVertical
          title="Data File"
          icon={<FileText className="w-6 h-6" />}
          items={[
            { label: "Total File Upload", value: "25" },
            { label: "Total File Masih Progress", value: "3" },
          ]}
        />
        <CardKeyValueVertical
          title="Scan Summary"
          icon={<CheckCircle2 className="w-6 h-6" />}
          items={[
            { label: "Total Item ter Scan", value: "118" },
            { label: "Total Harga Asal Terscan", value: `Rp ${formatRibuan(890000)}` },
          ]}
        />
      </div>
      </StatsSectionWrapper>

      <div>
        <DataTable
          title="Daftar File BAST"
          data={bastData}
          columns={[
            { key: "code", header: "Kode", accessor: "code" },
            { key: "name_file", header: "Nama File", accessor: "name_file" },
            { key: "list_items", header: "Total Item", accessor: "list_items" },
            {
              key: "price",
              header: "Harga Asal",
              accessor: (item: any) =>
                `Rp ${formatRibuan(item.price)}`,
            },
            {
              key: "status",
              header: "Status",
              accessor: (item: any) => {
                const colorMap: Record<string, string> = {
                  progress: "bg-yellow-100 text-yellow-700",
                  done: "bg-emerald-100 text-emerald-700",
                  cancel: "bg-red-100 text-red-700",
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
            { key: "date", header: "Tanggal Upload", accessor: "date" },
            {
              key: "uploaded_by",
              header: "Uploaded By",
              accessor: "uploaded_by",
            },
          ]}
          searchableKeys={["code", "name_file", "uploaded_by"]}
          filters={[
            {
              label: "Semua Status",
              accessor: "status",
              options: [
                { label: "All", value: "" },
                { label: "progress", value: "progress" },
                { label: "done", value: "done" },
                { label: "cancel", value: "cancel" },
              ],
            },
          ]}
          dateFilter={{ accessor: "date", show: true }}
          topButton={{
            label: "Upload",
            href: "/bast/upload",
            icon: <Upload size={18} />,
          }}
          actions={{
            customActions: [
              {
                label: "Scan",
                icon: <ScanSearch size={18} />,
                color: "emerald",
                href: () => "#",
              },
            ],
            showDetail: true,
            detailHref: (item) => `/bast/detail-bast`,
          }}
          exportConfig={{ show: true }}
        />
      </div>
    </div>
  );
}
