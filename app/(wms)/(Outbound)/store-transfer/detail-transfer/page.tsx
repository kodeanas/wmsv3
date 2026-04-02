"use client";

import { useState } from "react";
import Button from "@/components/globals/buttons/ButtonPrimary";
import DataTable from "@/components/data-tables/DataTable";
import CardKeyValueVertical from "@/components/globals/cards/CardKeyValueVertical";
import CardMatrix from "@/components/globals/cards/CardMatrix";
import ScannerCard from "@/components/globals/additionals/ScannerCard";
import Modal from "@/components/globals/additionals/Modal";
import { InfoDisplay } from "@/components/globals/additionals/Inputs";
import { ArrowRightLeft, Eye, Flag, Package, Printer } from "lucide-react";

const formatRupiah = (value: number) =>
	`Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

const transferInfo = {
	codeTransfer: "TRF-STORE-001",
	status: "lock",
	isMoved: true,
};

const transferStats = {
	totalItem: 142,
	totalHargaGudang: 15_380_000,
};

const matrixData: Record<string, Record<string, number>> = {
	Big: { Item: 84, "Harga Gudang": 9_240_000 },
	Small: { Item: 58, "Harga Gudang": 6_140_000 },
};

const transferBagData = [
	{
		code_bag: "TRF-BAG-011",
		total_item: 45,
		total_harga_gudang: 5_625_000,
		toko_tujuan: "Toko Melati Bandung",
		tanggal_pemindahan: "2026-03-29",
		status: "lock",
		is_moved: true,
	},
	{
		code_bag: "TRF-BAG-012",
		total_item: 39,
		total_harga_gudang: 4_774_000,
		toko_tujuan: "Toko Melati Bandung",
		tanggal_pemindahan: "2026-03-29",
		status: "open",
		is_moved: false,
	},
	{
		code_bag: "TRF-BAG-013",
		total_item: 58,
		total_harga_gudang: 4_981_000,
		toko_tujuan: "Toko Melati Bandung",
		tanggal_pemindahan: "2026-03-28",
		status: "lock",
		is_moved: true,
	},
];

type TransferBagItem = (typeof transferBagData)[number];

const statusColorMap: Record<string, string> = {
	open: "bg-emerald-100 text-emerald-700",
	lock: "bg-red-100 text-red-700",
};

const movedColorMap: Record<"true" | "false", string> = {
	true: "bg-blue-100 text-blue-700",
	false: "bg-slate-100 text-slate-700",
};

export default function DetailTransferPage() {
	const [selectedTransfer, setSelectedTransfer] = useState<TransferBagItem | null>(null);
	const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);

	const handleFinish = () => {
		setIsFinishModalOpen(true);
	};

	const handleConfirmFinish = () => {
		console.log("Finish transfer toko");
		setIsFinishModalOpen(false);
	};

	const handleScanBag = (value: string) => {
		console.log("Scanned transfer bag:", value);
	};

	const handleCloseDetailModal = () => {
		setSelectedTransfer(null);
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between divide-x divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
				<div className="flex flex-1 divide-x divide-slate-100">
					<div className="px-5 py-4">
						<p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
							Code Transfer
						</p>
						<p className="mt-1 text-sm font-semibold text-slate-700">
							{transferInfo.codeTransfer}
						</p>
					</div>

					<div className="px-5 py-4">
						<p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
							Status
						</p>
						<div className="mt-1">
							<span
								className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${
									statusColorMap[transferInfo.status] || "bg-slate-100 text-slate-700"
								}`}
							>
								{transferInfo.status}
							</span>
						</div>
					</div>

					<div className="px-5 py-4">
						<p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
							Is Moved
						</p>
						<div className="mt-1">
							<span
								className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${
									movedColorMap[String(transferInfo.isMoved) as "true" | "false"]
								}`}
							>
								{String(transferInfo.isMoved)}
							</span>
						</div>
					</div>
				</div>

				<div className="flex items-center gap-2 px-5 py-4">
					<Button
						icon={<Flag size={16} />}
						label="Finish"
						onClick={handleFinish}
						size="sm"
					/>
					<Button
						icon={<ArrowRightLeft size={16} />}
						label="Transfer"
						onClick={() => console.log("Transfer")}
						variant="success"
						size="sm"
					/>
				</div>
			</div>
<div className="grid grid-cols-3 gap-6">
				<CardKeyValueVertical
					title="Ringkasan Transfer"
					icon={<Package size={20} />}
					items={[
						{ label: "Item", value: transferStats.totalItem },
						{
							label: "Harga Gudang",
							value: formatRupiah(transferStats.totalHargaGudang),
						},
					]}
				/>

				<div className="col-span-2">
					<CardMatrix
						verticalKeys={Object.keys(matrixData)}
						horizontalKeys={["Item", "Harga Gudang"]}
						renderValue={(vKey, hKey) => {
							const value = matrixData[vKey]?.[hKey] ?? 0;
							if (hKey === "Harga Gudang") {
								return formatRupiah(value);
							}
							return value;
						}}
					/>
				</div>
			</div>
<ScannerCard
				title="Scan Bag Transfer"
				placeholder="Scan code bag transfer..."
				onScanComplete={handleScanBag}
			/>

			<section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
				<DataTable
					title="Daftar Bag Transfer"
					data={transferBagData}
					exportConfig={{
						show: true,
					}}
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
							accessor: (item: TransferBagItem) => formatRupiah(item.total_harga_gudang),
						},
						{
							key: "status",
							header: "Status",
							accessor: (item: TransferBagItem) => (
								<span
									className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
										statusColorMap[item.status] || "bg-slate-100 text-slate-700"
									}`}
								>
									{item.status}
								</span>
							),
						},
					]}
					searchableKeys={["code_bag", "status"]}
					filters={[
						{
							label: "Semua Status",
							accessor: "status",
							options: [
								{ label: "open", value: "open" },
								{ label: "lock", value: "lock" },
							],
						},
					]}
					actions={{
						customActions: [
							{
								label: "Detail",
								icon: <Eye size={18} />,
								color: "blue",
								onClick: (item: TransferBagItem) => setSelectedTransfer(item),
							},
						],
					}}
				/>
			</section>

			<Modal
				isOpen={!!selectedTransfer}
				onClose={handleCloseDetailModal}
				title="Informasi Transfer"
				size="md"
				footer={
					<button
						type="button"
						onClick={handleCloseDetailModal}
						className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
					>
						Tutup
					</button>
				}
			>
				<div className="grid grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2">
					<InfoDisplay label="Total Item" value={selectedTransfer?.total_item || "-"} />
					<InfoDisplay
						label="Harga Gudang"
						value={selectedTransfer ? formatRupiah(selectedTransfer.total_harga_gudang) : "-"}
					/>
					<InfoDisplay label="Toko Tujuan" value={selectedTransfer?.toko_tujuan || "-"} />
					<InfoDisplay
						label="Tanggal Pemindahaan"
						value={selectedTransfer?.tanggal_pemindahan || "-"}
					/>
					<InfoDisplay label="Status" value={selectedTransfer?.status || "-"} />
					<InfoDisplay
						label="Is Moved"
						value={selectedTransfer ? String(selectedTransfer.is_moved) : "-"}
					/>
				</div>
			</Modal>

			<Modal
				isOpen={isFinishModalOpen}
				onClose={() => setIsFinishModalOpen(false)}
				title="Konfirmasi Finish Transfer"
				size="md"
				footer={
					<>
						<Button
							label="Batal"
							onClick={() => setIsFinishModalOpen(false)}
							variant="outline"
							size="sm"
						/>
						<Button
							label="Ya, Finish"
							onClick={handleConfirmFinish}
							variant="danger"
							size="sm"
						/>
					</>
				}
			>
				<p className="text-sm leading-relaxed text-slate-600">
					Setelah di-finish, transfer toko akan ditandai selesai. Pastikan data bag dan tujuan toko sudah benar.
				</p>
			</Modal>
		</div>
	);
}
