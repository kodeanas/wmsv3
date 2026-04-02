"use client";

import { useState } from "react";
import DataTable from "@/components/data-tables/DataTable";
import Modal from "@/components/globals/additionals/Modal";
import CardKeyValueHorizontal from "@/components/globals/cards/CardKeyValueHorizontal";
import StatsSectionWrapper from "@/components/globals/cards/StatsSectionWrapper";
import { ArrowRightLeft, PackageCheck, Store } from "lucide-react";

type StoreTransferRow = {
	nama_toko: string;
	total_item: number;
	total_harga_gudang: number;
	tanggal: string;
	status: "open" | "lock";
	is_moved: boolean;
};

const formatRupiah = (value: number) =>
	`Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

const stats = {
	totalTransferEvent: 18,
	tokoDitransfer: 9,
	totalProdukTransfer: 426,
};

const storeTransferRows: StoreTransferRow[] = [
	{
		nama_toko: "Toko Melati Bandung",
		total_item: 48,
		total_harga_gudang: 4850000,
		tanggal: "2026-03-29",
		status: "open",
		is_moved: false,
	},
	{
		nama_toko: "Toko Sentra Jaya",
		total_item: 62,
		total_harga_gudang: 7320000,
		tanggal: "2026-03-29",
		status: "lock",
		is_moved: false,
	},
	{
		nama_toko: "Toko Kencana Baru",
		total_item: 35,
		total_harga_gudang: 3580000,
		tanggal: "2026-03-28",
		status: "lock",
		is_moved: true,
	},
	{
		nama_toko: "Toko Surya Grosir",
		total_item: 57,
		total_harga_gudang: 6140000,
		tanggal: "2026-03-28",
		status: "open",
		is_moved: true,
	},
];

const statusStyles: Record<StoreTransferRow["status"], string> = {
	open: "bg-amber-50 text-amber-600",
	lock: "bg-blue-50 text-blue-600",
};

const movedStyles: Record<"true" | "false", string> = {
	true: "bg-emerald-50 text-emerald-600",
	false: "bg-slate-100 text-slate-600",
};

export default function StoreTransferPage() {
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

	return (
		<div className="space-y-6">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-xl font-bold text-slate-800">Transfer Toko</h2>
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
					title="Total Transfer Event"
					icon={<ArrowRightLeft className="h-5 w-5" />}
					items={[{ label: "Jumlah Event", value: stats.totalTransferEvent }]}
				/>

				<CardKeyValueHorizontal
					title="Toko Di Transfer"
					icon={<Store className="h-5 w-5" />}
					items={[{ label: "Total Toko", value: stats.tokoDitransfer }]}
				/>

				<CardKeyValueHorizontal
					title="Produk Di Transfer"
					icon={<PackageCheck className="h-5 w-5" />}
					items={[{ label: "Total Produk", value: stats.totalProdukTransfer }]}
				/>
			</section>
			</StatsSectionWrapper>

			<section>
				<DataTable
					title="Data Transfer Toko"
					data={storeTransferRows}
					exportConfig={{ show: true }}
					topButton={{
						label: "Buat Transfer",
						onClick: () => setIsConfirmModalOpen(true),
					}}
					filters={[
						{
							label: "Filter Status",
							accessor: "status",
							options: [
								{ label: "Open", value: "open" },
								{ label: "Lock", value: "lock" },
							],
						},
						{
							label: "Filter Is Moved",
							accessor: "is_moved",
							options: [
								{ label: "True", value: "true" },
								{ label: "False", value: "false" },
							],
						},
					]}
					dateFilter={{ show: true, accessor: "tanggal" }}
					columns={[
						{ key: "nama_toko", header: "Nama Toko", accessor: "nama_toko" },
						{ key: "total_item", header: "Total Item", accessor: "total_item" },
						{
							key: "total_harga_gudang",
							header: "Total Harga Gudang",
							accessor: (row: StoreTransferRow) => formatRupiah(row.total_harga_gudang),
						},
						{ key: "tanggal", header: "Tanggal", accessor: "tanggal" },
						{
							key: "status",
							header: "Status",
							accessor: (row: StoreTransferRow) => (
								<span
									className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase ${statusStyles[row.status]}`}
								>
									{row.status}
								</span>
							),
						},
						{
							key: "is_moved",
							header: "Is Moved",
							accessor: (row: StoreTransferRow) => {
								const movedKey = String(row.is_moved) as "true" | "false";

								return (
									<span
										className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase ${movedStyles[movedKey]}`}
									>
										{movedKey}
									</span>
								);
							},
						},
					]}
					searchableKeys={["nama_toko", "status"]}
					actions={{
						showDetail: true,
						detailHref: () => "/store-transfer/detail-transfer",
					}}
				/>
			</section>

			<Modal
				isOpen={isConfirmModalOpen}
				onClose={() => setIsConfirmModalOpen(false)}
				title="Konfirmasi Buat Transfer"
				size="sm"
				footer={
					<>
						<button
							type="button"
							onClick={() => setIsConfirmModalOpen(false)}
							className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
						>
							Batal
						</button>
						<button
							type="button"
							onClick={() => setIsConfirmModalOpen(false)}
							className="rounded-lg bg-blue-500 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-600"
						>
							Ya, Lanjutkan
						</button>
					</>
				}
			>
				<p className="text-sm text-slate-600">
					Yakin ingin membuat transfer toko baru?
				</p>
			</Modal>
		</div>
	);
}
