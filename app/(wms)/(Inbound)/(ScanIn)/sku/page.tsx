"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/data-tables/DataTable";
import CardKeyValueHorizontal from "@/components/globals/cards/CardKeyValueHorizontal";
import StatsSectionWrapper from "@/components/globals/cards/StatsSectionWrapper";
import { PackageSearch, Upload } from "lucide-react";
import { formatRibuan } from "@/helper/formatRibuan";

const skuData = [
	{
		code: "SKU-001",
		name_file: "upload-sku-01.csv",
		list_items: 180,
		price: 3250000,
		warehouse_price: 3315000,
		date: "2026-03-27",
		uploaded_by: "Rudi Santoso",
		status: "done",
	},
	{
		code: "SKU-002",
		name_file: "upload-sku-02.csv",
		list_items: 145,
		price: 2680000,
		warehouse_price: 2740000,
		date: "2026-03-27",
		uploaded_by: "Maya Putri",
		status: "progress",
	},
	{
		code: "SKU-003",
		name_file: "upload-sku-03.csv",
		list_items: 210,
		price: 3870000,
		warehouse_price: 3945000,
		date: "2026-03-26",
		uploaded_by: "Agus Saputra",
		status: "cancel",
	},
	{
		code: "SKU-004",
		name_file: "upload-sku-04.csv",
		list_items: 132,
		price: 2410000,
		warehouse_price: 2475000,
		date: "2026-03-25",
		uploaded_by: "Lina Wijaya",
		status: "done",
	},
];

const formatRupiah = (value: number) =>
	`Rp ${formatRibuan(value)}`;

export default function SkuPage() {
	const [todayLabel, setTodayLabel] = useState("");

	useEffect(() => {
		setTodayLabel(
			new Date().toLocaleDateString("id-ID", {
				day: "2-digit",
				month: "long",
				year: "numeric",
			}),
		);
	}, []);

	const todayInfo = {
		totalFileUpload: skuData.length,
		totalItemInput: skuData.reduce((sum, item) => sum + item.list_items, 0),
		totalSourcePrice: skuData.reduce((sum, item) => sum + item.price, 0),
	};

	return (
		<div className="space-y-6">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-xl font-bold text-slate-800">Data SKU Hari Ini</h2>
				<span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
					{todayLabel || "-"}
				</span>
			</div>

			<StatsSectionWrapper title="Ringkasan">
				<CardKeyValueHorizontal
					title="Ringkasan SKU"
					icon={<PackageSearch className="h-5 w-5" />}
					items={[
						{ label: "Total File Upload", value: todayInfo.totalFileUpload },
						{ label: "Total Item Input", value: todayInfo.totalItemInput },
						{
							label: "Total Harga Asal",
							value: formatRupiah(todayInfo.totalSourcePrice),
						},
					]}
				/>
			</StatsSectionWrapper>

			<div>
				<DataTable
					title="Daftar File SKU"
					data={skuData}
					columns={[
						{ key: "code", header: "Kode", accessor: "code" },
						{ key: "name_file", header: "Nama File", accessor: "name_file" },
						{ key: "list_items", header: "Total Item", accessor: "list_items" },
						{
							key: "price",
							header: "Harga Asal",
							accessor: (item: any) => formatRupiah(item.price),
						},
						{ key: "date", header: "Tanggal Upload", accessor: "date" },
						{
							key: "uploaded_by",
							header: "Uploaded By",
							accessor: "uploaded_by",
						},
						{
							key: "status",
							header: "Status",
							accessor: (item: any) => {
								const map: Record<string, { label: string; className: string }> = {
									done: { label: "Done", className: "bg-green-100 text-green-700" },
									progress: { label: "Progress", className: "bg-yellow-100 text-yellow-700" },
									cancel: { label: "Cancel", className: "bg-red-100 text-red-700" },
								};
								const s = map[item.status] ?? { label: item.status, className: "bg-gray-100 text-gray-700" };
								return (
									<span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${s.className}`}>
										{s.label}
									</span>
								);
							},
						},
					]}
					searchableKeys={["code", "name_file", "uploaded_by"]}
					dateFilter={{ accessor: "date", show: true }}
					topButton={{
						label: "Upload",
						href: "/sku/upload",
						icon: <Upload size={18} />,
					}}
					actions={{
						showDetail: true,
						detailHref: () => "/sku/detail-sku",
					}}
					exportConfig={{ show: true }}
				/>
			</div>
		</div>
	);
}
