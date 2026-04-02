"use client";

import DataTable from "@/components/data-tables/DataTable";
import Modal from "@/components/globals/additionals/Modal";
import CardKeyValueHorizontal from "@/components/globals/cards/CardKeyValueHorizontal";
import StatsSectionWrapper from "@/components/globals/cards/StatsSectionWrapper";
import { Activity, PackageSearch } from "lucide-react";
import { useState } from "react";

const formatRupiah = (value: number) =>
	`Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

const saldoAwal = {
	cargoAwal: 30,
	itemAwal: 780,
	hargaAsalAwal: 32540000,
};

const saldoAkhirRealtime = {
	cargoAkhir: 34,
	itemAkhir: 826,
	hargaAsalAkhir: 35680000,
};

const cargoData = [
	{
		code_cargo: "CRG-WS-001",
		item: 120,
		bag: 8,
		harga_asal: 4850000,
		status: "open",
		is_sale: "true",
	},
	{
		code_cargo: "CRG-WS-002",
		item: 96,
		bag: 6,
		harga_asal: 3725000,
		status: "lock",
		is_sale: "false",
	},
	{
		code_cargo: "CRG-WS-003",
		item: 140,
		bag: 10,
		harga_asal: 5280000,
		status: "open",
		is_sale: "true",
	},
];

export default function CargoWholesalePage() {
	const [isCargoModalOpen, setIsCargoModalOpen] = useState(false);

	const handleOpenCargoModal = () => {
		setIsCargoModalOpen(true);
	};

	const handleCloseCargoModal = () => {
		setIsCargoModalOpen(false);
	};

	const handleConfirmCreateCargo = () => {
		setIsCargoModalOpen(false);
	};

	return (
		<div className="space-y-6">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-xl font-bold text-slate-800">Cargo Wholesale</h2>
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
						{ label: "Cargo Awal", value: saldoAwal.cargoAwal },
						{ label: "Item Awal", value: saldoAwal.itemAwal },
						{
							label: "Harga Asal Awal",
							value: formatRupiah(saldoAwal.hargaAsalAwal),
						},
					]}
				/>

				<CardKeyValueHorizontal
					title="Saldo Akhir (Realtime)"
					icon={<Activity className="h-5 w-5" />}
					items={[
						{ label: "Cargo Akhir", value: saldoAkhirRealtime.cargoAkhir },
						{ label: "Item Akhir", value: saldoAkhirRealtime.itemAkhir },
						{
							label: "Harga Asal Akhir",
							value: formatRupiah(saldoAkhirRealtime.hargaAsalAkhir),
						},
					]}
				/>
			</section>
			</StatsSectionWrapper>

			<section>
				<DataTable
					title="Daftar Cargo Wholesale"
					data={cargoData}
					columns={[
						{ key: "code_cargo", header: "Code Cargo", accessor: "code_cargo" },
						{ key: "item", header: "Item", accessor: "item" },
						{ key: "bag", header: "Bag", accessor: "bag" },
						{
							key: "harga_asal",
							header: "Harga Asal",
							accessor: (item: any) => formatRupiah(item.harga_asal),
						},
						{
							key: "status",
							header: "Status",
							accessor: (item: any) => {
								const colorMap: Record<string, string> = {
									open: "bg-emerald-100 text-emerald-700",
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
						{
							key: "is_sale",
							header: "Is Sale",
							accessor: (item: any) => (
								<span
									className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
										item.is_sale === "true"
											? "bg-blue-100 text-green-500"
											: "bg-slate-100 text-slate-700"
									}`}
								>
									{item.is_sale}
								</span>
							),
						},
					]}
					searchableKeys={["code_cargo", "status"]}
					filters={[
						{
							label: "Semua Status",
							accessor: "status",
							options: [
								{ label: "open", value: "open" },
								{ label: "lock", value: "lock" },
							],
						},
						{
							label: "Semua Is Sale",
							accessor: "is_sale",
							options: [
								{ label: "true", value: "true" },
								{ label: "false", value: "false" },
							],
						},
					]}
					actions={{
						showDetail: true,
						detailHref: () => "/cargo-wholesale/detail-cargo",
					}}
					topButton={{
						label: "Cargo",
						onClick: handleOpenCargoModal,
					}}
					exportConfig={{ show: true }}
				/>
			</section>

			<Modal
				isOpen={isCargoModalOpen}
				onClose={handleCloseCargoModal}
				title="Konfirmasi Pembuatan Cargo"
				size="md"
				footer={
					<>
						<button
							type="button"
							onClick={handleCloseCargoModal}
							className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
						>
							Batal
						</button>
						<button
							type="button"
							onClick={handleConfirmCreateCargo}
							className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
						>
							Ya, saya setuju
						</button>
					</>
				}
			>
				<div className="space-y-4">
					<p className="text-sm leading-relaxed text-slate-600">
						Cargo baru akan dibuat dari data wholesale saat ini.
					</p>
					<p className="text-sm leading-relaxed text-slate-600">
						Lanjutkan jika Anda yakin ingin membuat Cargo.
					</p>
				</div>
			</Modal>
		</div>
	);
}
