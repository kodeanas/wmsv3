"use client";

import DataTable from "@/components/data-tables/DataTable";
import CardKeyValueHorizontal from "@/components/globals/cards/CardKeyValueHorizontal";
import StatsSectionWrapper from "@/components/globals/cards/StatsSectionWrapper";
import { FileText, PackageCheck, ShoppingCart, Wallet } from "lucide-react";

const formatRupiah = (value: number) =>
  `Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

const stats = {
  itemTerjual: 348,
  buyerBelanja: 27,
  grandTotal: 18750000,
};

const salesRows = [
  {
    kode: "SALE-001",
    buyer: "Toko Maju Jaya",
    grand_total: 3250000,
    tanggal: "2026-03-29",
  },
  {
    kode: "SALE-002",
    buyer: "UD Berkah Abadi",
    grand_total: 1875000,
    tanggal: "2026-03-29",
  },
  {
    kode: "SALE-003",
    buyer: "CV Sumber Rezeki",
    grand_total: 5100000,
    tanggal: "2026-03-28",
  },
  {
    kode: "SALE-004",
    buyer: "Toko Sejahtera",
    grand_total: 720000,
    tanggal: "2026-03-28",
  },
];

export default function RegulerSalesPage() {
  return (
    <div className="space-y-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Penjualan Reguler</h2>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
          {new Date().toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
            <StatsSectionWrapper title="Ringkasan">
<section className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <CardKeyValueHorizontal
          title="Item Terjual"
          icon={<PackageCheck className="h-5 w-5" />}
          items={[{ label: "Total Item", value: stats.itemTerjual }]}
        />

        <CardKeyValueHorizontal
          title="Buyer Belanja"
          icon={<ShoppingCart className="h-5 w-5" />}
          items={[{ label: "Total Buyer", value: stats.buyerBelanja }]}
        />

        <CardKeyValueHorizontal
          title="Grand Total"
          icon={<Wallet className="h-5 w-5" />}
          items={[
            { label: "Total Penjualan", value: formatRupiah(stats.grandTotal) },
          ]}
        />
      </section>
      </StatsSectionWrapper>

      <section>
        <DataTable
          title="Data Penjualan Reguler"
          data={salesRows}
          exportConfig={{ show: true }}
          topButton={{ label: "Ke Kasir", href: "/cashier" }}
          columns={[
            { key: "kode", header: "Kode", accessor: "kode" },
            { key: "buyer", header: "Buyer", accessor: "buyer" },
            {
              key: "grand_total",
              header: "Grand Total",
              accessor: (row: any) => formatRupiah(row.grand_total),
            },
            { key: "tanggal", header: "Tanggal", accessor: "tanggal" },
          ]}
          searchableKeys={["kode", "buyer"]}
          actions={{
            customActions: [
              {
                label: "Invoice",
                icon: <FileText size={18} />,
                color: "blue",
                href: (item: any) => `/reguler-sales/invoice?kode=${item.kode}`,
              },
            ],
          }}
        />
      </section>
    </div>
  );
}
