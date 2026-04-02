"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/data-tables/DataTable";
import CardKeyValueHorizontal from "@/components/globals/cards/CardKeyValueHorizontal";
import StatsSectionWrapper from "@/components/globals/cards/StatsSectionWrapper";
import Modal from "@/components/globals/additionals/Modal";
import { RotateCcw, Upload, AlertCircle } from "lucide-react";

const returnBklData = [
	{
		code: "BKL-001",
		list_items: 45,
		price: 850000,
		date: "2026-03-27",
		returned_by: "Rudi Santoso",
		status: "progress",
	},
	{
		code: "BKL-002",
		list_items: 32,
		price: 620000,
		date: "2026-03-27",
		returned_by: "Maya Putri",
		status: "done",
	},
	{
		code: "BKL-003",
		list_items: 58,
		price: 1120000,
		date: "2026-03-26",
		returned_by: "Agus Saputra",
		status: "progress",
	},
	{
		code: "BKL-004",
		list_items: 41,
		price: 780000,
		date: "2026-03-25",
		returned_by: "Lina Wijaya",
		status: "done",
	},
];

export default function ReturnBklPage() {
	const [todayLabel, setTodayLabel] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		setTodayLabel(
			new Date().toLocaleDateString("id-ID", {
				day: "2-digit",
				month: "long",
				year: "numeric",
			}),
		);
	}, []);

	const handleCreateReturn = () => {
		setIsModalOpen(true);
	};

	const handleConfirmReturn = () => {
		setIsModalOpen(false);
		console.log("Create new Return BKL document");
	};

	const handleCancelReturn = () => {
		setIsModalOpen(false);
	};

	const todayInfo = {
		totalFileUpload: returnBklData.length,
		totalItemReturn: returnBklData.reduce((sum, item) => sum + item.list_items, 0),
	};

	return (
		<div className="space-y-6">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-xl font-bold text-slate-800">Data Return BKL Hari Ini</h2>
				<span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
					{todayLabel || "-"}
				</span>
			</div>

			<StatsSectionWrapper title="Ringkasan">
				<CardKeyValueHorizontal
					title="Ringkasan Return BKL"
					icon={<RotateCcw className="h-5 w-5" />}
					items={[
						{ label: "Total Return", value: todayInfo.totalFileUpload },
						{ label: "Total Item Return", value: todayInfo.totalItemReturn },
					]}
				/>
			</StatsSectionWrapper>

			<div>
				<DataTable
					title="Daftar Return BKL"
					data={returnBklData}
					columns={[
						{ key: "code", header: "Kode", accessor: "code" },

						{ key: "list_items", header: "Total Item", accessor: "list_items" },
						{ key: "date", header: "Tanggal Return", accessor: "date" },
						{
							key: "returned_by",
							header: "Returned By",
							accessor: "returned_by",
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
					]}
					searchableKeys={["code", "returned_by"]}
					filters={[
						{
							label: "Semua Status",
							accessor: "status",
							options: [
								{ label: "progress", value: "progress" },
								{ label: "done", value: "done" },
								{ label: "cancel", value: "cancel" },
							],
						},
					]}
					dateFilter={{ accessor: "date", show: true }}
					topButton={{
						label: "Return",
						icon: <RotateCcw size={18} />,
						onClick: handleCreateReturn,
					}}
					actions={{
						showDetail: true,
						detailHref: () => "/return-bkl/detail-return-bkl",
					}}
					exportConfig={{ show: true }}
				/>
			</div>

		<Modal
			isOpen={isModalOpen}
			onClose={handleCancelReturn}
			title="Konfirmasi Pembuatan Return BKL"
			size="md"
			footer={
				<div className="flex justify-end gap-3">
					<button
						onClick={handleCancelReturn}
						className="px-5 py-2.5 border hover:cursor-pointer border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"
					>
						Batal
					</button>
					<button
						onClick={handleConfirmReturn}
						className="px-5 py-2.5 hover:cursor-pointer bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
					>
						Ya, Setuju
					</button>
				</div>
			}
		>
			<div className="space-y-5">
				<div className="flex justify-center mb-2">
					<div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full">
						<AlertCircle className="w-6 h-6 text-amber-600" />
					</div>
				</div>
				
				<div className="text-center space-y-3">
					<p className="text-slate-700 text-sm leading-relaxed">
						Anda akan membuat dokumen <span className="font-semibold text-slate-900">Return BKL baru</span>. Pastikan semua data yang diperlukan sudah disiapkan dengan benar sebelum melanjutkan.
					</p>
				</div>

				<div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 space-y-2">
					<div className="flex items-start gap-3">
						<span className="text-amber-600 text-lg mt-0.5">⚠️</span>
						<div className="space-y-1 flex-1">
							<p className="text-xs font-semibold text-amber-900">Perhatian</p>
							<p className="text-xs text-amber-800 leading-relaxed">
								Proses ini tidak dapat dibatalkan setelah dokumen dibuat. Mohon periksa kembali sebelum meneruskan.
							</p>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	</div>
	);
}