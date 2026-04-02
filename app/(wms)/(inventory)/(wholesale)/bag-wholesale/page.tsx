"use client";

import DataTable from "@/components/data-tables/DataTable";
import Modal from "@/components/globals/additionals/Modal";
import CardKeyValueHorizontal from "@/components/globals/cards/CardKeyValueHorizontal";
import StatsSectionWrapper from "@/components/globals/cards/StatsSectionWrapper";
import { Eye, PackageSearch } from "lucide-react";
import { useState } from "react";

const formatRupiah = (value: number) =>
	`Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

const wholesaleBagInfo = {
	totalBag: 128,
	totalHargaAsal: 25480000,
};

const bagData = [
	{
		code_bag: "WS-BAG-001",
		total_item: 120,
		total_harga_gudang: 4850000,
		status: "open",
	},
	{
		code_bag: "WS-BAG-002",
		total_item: 80,
		total_harga_gudang: 3275000,
		status: "close",
	},
	{
		code_bag: "WS-BAG-003",
		total_item: 95,
		total_harga_gudang: 4125000,
		status: "lock",
	},
];

export default function WholesaleBagPage() {
	const [isBagModalOpen, setIsBagModalOpen] = useState(false);

	const handleOpenBagModal = () => {
		setIsBagModalOpen(true);
	};

	const handleCloseBagModal = () => {
		setIsBagModalOpen(false);
	};

	const handleConfirmCreateBag = () => {
		setIsBagModalOpen(false);
	};

	return (
		<div className="space-y-6">
						<StatsSectionWrapper title="Ringkasan">
<section>
				<CardKeyValueHorizontal
					title="Info Bag Wholesale"
					icon={<PackageSearch className="h-5 w-5" />}
					items={[
						{ label: "Total Bag", value: wholesaleBagInfo.totalBag },
						{
							label: "Total Harga Asal",
							value: formatRupiah(wholesaleBagInfo.totalHargaAsal),
						},
					]}
				/>
			</section>
			</StatsSectionWrapper>

			<section>
				<DataTable
					title="Daftar Bag"
					data={bagData}
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
					topButton={{
						label: "Bag",
						onClick: handleOpenBagModal,
					}}
					actions={{
						customActions: [
							{
								label: "Detail",
								icon: <Eye size={18} />,
								color: "blue",
								href: () => "/bag-wholesale/detail-bag",
							},
						],
					}}
					exportConfig={{ show: true }}
				/>
			</section>

			<Modal
				isOpen={isBagModalOpen}
				onClose={handleCloseBagModal}
				title="Konfirmasi Pembuatan Bag"
				size="md"
				footer={
					<>
						<button
							type="button"
							onClick={handleCloseBagModal}
							className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
						>
							Batal
						</button>
						<button
							type="button"
							onClick={handleConfirmCreateBag}
							className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
						>
							Ya, saya setuju
						</button>
					</>
				}
			>
				<div className="space-y-4">
					<p className="text-sm leading-relaxed text-slate-600">
						Bag baru akan dibuat dari data bag wholesale saat ini.
					</p>
					<p className="text-sm leading-relaxed text-slate-600">
						Lanjutkan jika Anda yakin ingin membuat Bag.
					</p>
				</div>
			</Modal>
		</div>
	);
}
