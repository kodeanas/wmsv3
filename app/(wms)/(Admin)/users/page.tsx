"use client";

import { useState } from "react";
import CardKeyValueHorizontal from "@/components/globals/cards/CardKeyValueHorizontal";
import StatsSectionWrapper from "@/components/globals/cards/StatsSectionWrapper";
import DataTable from "@/components/data-tables/DataTable";
import Modal from "@/components/globals/additionals/Modal";
import { InputText, InputSelect } from "@/components/globals/additionals/Inputs";
import Button from "@/components/globals/buttons/ButtonPrimary";
import { Users, UserCheck, Pencil, BarChart2 } from "lucide-react";

const stats = {
	totalUser: 24,
	totalLoginUser: 18,
};

type UserRow = {
	nama: string;
	role: string;
	email: string;
	status: "active" | "inactive";
};

const statusColorMap: Record<string, string> = {
	active: "bg-emerald-100 text-emerald-700",
	inactive: "bg-slate-100 text-slate-500",
};

type ScanSummary = {
	totalScan: number;
	activeDays: number;
	todayScan: number;
};

const scanSummaryMap: Record<string, ScanSummary> = {
	"anas@wms.com": { totalScan: 312, activeDays: 28, todayScan: 14 },
	"rizky@wms.com": { totalScan: 207, activeDays: 24, todayScan: 9 },
	"dewi@wms.com": { totalScan: 89, activeDays: 15, todayScan: 0 },
	"budi@wms.com": { totalScan: 174, activeDays: 21, todayScan: 7 },
	"siti@wms.com": { totalScan: 260, activeDays: 26, todayScan: 11 },
};

const userRows: UserRow[] = [
	{ nama: "Anas Malik", role: "Admin", email: "anas@wms.com", status: "active" },
	{ nama: "Rizky Pratama", role: "Staff", email: "rizky@wms.com", status: "active" },
	{ nama: "Dewi Lestari", role: "Cashier", email: "dewi@wms.com", status: "inactive" },
	{ nama: "Budi Santoso", role: "Staff", email: "budi@wms.com", status: "active" },
	{ nama: "Siti Rahayu", role: "Manager", email: "siti@wms.com", status: "active" },
];

export default function UsersPage() {
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [form, setForm] = useState({ nama: "", email: "", phone: "", password: "", role: "" });

	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [editForm, setEditForm] = useState({ nama: "", email: "", phone: "", password: "", role: "" });

	const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
	const [selectedSummaryUser, setSelectedSummaryUser] = useState<UserRow | null>(null);

	const handleChange = (field: string, value: string) =>
		setForm((prev) => ({ ...prev, [field]: value }));

	const handleEditChange = (field: string, value: string) =>
		setEditForm((prev) => ({ ...prev, [field]: value }));

	const handleSubmit = () => {
		console.log("Tambah user:", form);
		setIsAddModalOpen(false);
		setForm({ nama: "", email: "", phone: "", password: "", role: "" });
	};

	const handleEdit = (item: UserRow) => {
		setEditForm({ nama: item.nama, email: item.email, phone: "", password: "", role: item.role });
		setIsEditModalOpen(true);
	};

	const handleEditSubmit = () => {
		console.log("Edit user:", editForm);
		setIsEditModalOpen(false);
	};

	const handleOpenSummary = (item: UserRow) => {
		setSelectedSummaryUser(item);
		setIsSummaryModalOpen(true);
	};

	return (
		<div className="space-y-6 p-6">
			{/* Section Info */}
						<StatsSectionWrapper title="Ringkasan">
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<CardKeyValueHorizontal
					title="Total User"
					icon={<Users size={20} />}
					items={[{ label: "Total User", value: stats.totalUser }]}
				/>
				<CardKeyValueHorizontal
					title="Total Login User"
					icon={<UserCheck size={20} />}
					items={[{ label: "Total Login User", value: stats.totalLoginUser }]}
				/>
			</div>
			</StatsSectionWrapper>

			{/* DataTable */}
			<DataTable
				data={userRows}
				searchableKeys={["nama", "email", "role"]}
				filters={[
					{
						label: "Role",
						accessor: "role",
						options: [
							{ label: "Admin", value: "Admin" },
							{ label: "Manager", value: "Manager" },
							{ label: "Staff", value: "Staff" },
							{ label: "Cashier", value: "Cashier" },
						],
					},
					{
						label: "Status",
						accessor: "status",
						options: [
							{ label: "Active", value: "active" },
							{ label: "Inactive", value: "inactive" },
						],
					},
				]}
				columns={[
					{ header: "Nama", accessor: "nama", key: "nama" },
					{ header: "Role", accessor: "role", key: "role" },
					{ header: "Email", accessor: "email", key: "email" },
					{
						header: "Status",
						key: "status",
						accessor: (item) => (
							<span
								className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColorMap[item.status]}`}
							>
								{item.status === "active" ? "Active" : "Inactive"}
							</span>
						),
					},
				]}
				topButton={{ label: "Tambah User", onClick: () => setIsAddModalOpen(true) }}
				actions={{
					customActions: [
						{
							label: "Edit",
							icon: <Pencil size={14} />,
							color: "blue",
							onClick: handleEdit,
						},
						{
							label: "Summary",
							icon: <BarChart2 size={14} />,
							color: "emerald",
							onClick: handleOpenSummary,
						},
					],
				}}
			/>
			{/* Modal Edit User */}
			<Modal
				isOpen={isEditModalOpen}
				onClose={() => setIsEditModalOpen(false)}
				title="Edit User"
				size="md"
				footer={
					<div className="flex justify-end gap-2">
						<Button
							label="Batal"
							variant="outline"
							size="sm"
							onClick={() => setIsEditModalOpen(false)}
						/>
						<Button label="Simpan" size="sm" onClick={handleEditSubmit} />
					</div>
				}
			>
				<div className="flex flex-col gap-4">
					<InputText
						name="nama"
						label="Nama"
						placeholder="Masukkan nama lengkap"
						value={editForm.nama}
						onChange={(e) => handleEditChange("nama", e.target.value)}
					/>
					<InputText
						name="email"
						label="Email"
						placeholder="Masukkan email"
						value={editForm.email}
						onChange={(e) => handleEditChange("email", e.target.value)}
					/>
					<InputText
						name="phone"
						label="No. Telepon"
						placeholder="Masukkan nomor telepon"
						value={editForm.phone}
						onChange={(e) => handleEditChange("phone", e.target.value)}
					/>
					<div className="flex flex-col gap-1.5">
						<label className="text-xs font-bold uppercase tracking-wider text-slate-500">
							Password Baru
						</label>
						<input
							type="password"
							placeholder="Kosongkan jika tidak diubah"
							value={editForm.password}
							onChange={(e) => handleEditChange("password", e.target.value)}
							className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
						/>
					</div>
					<InputSelect
						name="role"
						label="Role"
						value={editForm.role}
						onChange={(e) => handleEditChange("role", e.target.value)}
						options={[
							{ label: "Pilih Role", value: "" },
							{ label: "Admin", value: "Admin" },
							{ label: "Manager", value: "Manager" },
							{ label: "Staff", value: "Staff" },
							{ label: "Cashier", value: "Cashier" },
						]}
					/>
				</div>
			</Modal>

			{/* Modal Summary User */}
			{selectedSummaryUser && (() => {
				const summary = scanSummaryMap[selectedSummaryUser.email];
				const avg = summary ? (summary.totalScan / summary.activeDays).toFixed(1) : "0";
				return (
					<Modal
						isOpen={isSummaryModalOpen}
						onClose={() => setIsSummaryModalOpen(false)}
						title={`Summary — ${selectedSummaryUser.nama}`}
						size="sm"
						footer={
							<div className="flex justify-end">
								<Button
									label="Tutup"
									variant="outline"
									size="sm"
									onClick={() => setIsSummaryModalOpen(false)}
								/>
							</div>
						}
					>
						<div className="flex flex-col gap-3">
							<div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
								<p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Scan Input</p>
								<p className="mt-1 text-3xl font-extrabold text-slate-700">{summary?.totalScan ?? 0}</p>
								<p className="text-xs text-slate-400">kali scan</p>
							</div>
							<div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
								<p className="text-xs font-bold uppercase tracking-wider text-slate-400">Rata-rata per Hari</p>
								<p className="mt-1 text-3xl font-extrabold text-emerald-600">{avg}</p>
								<p className="text-xs text-slate-400">scan / hari aktif ({summary?.activeDays ?? 0} hari)</p>
							</div>
							<div className="rounded-xl border border-blue-50 bg-blue-50 p-4">
								<p className="text-xs font-bold uppercase tracking-wider text-blue-400">Scan Hari Ini</p>
								<p className="mt-1 text-3xl font-extrabold text-blue-600">{summary?.todayScan ?? 0}</p>
								<p className="text-xs text-blue-300">kali scan hari ini</p>
							</div>
						</div>
					</Modal>
				);
			})()}

			{/* Modal Tambah User */}
			<Modal
				isOpen={isAddModalOpen}
				onClose={() => setIsAddModalOpen(false)}
				title="Tambah User"
				size="md"
				footer={
					<div className="flex justify-end gap-2">
						<Button
							label="Batal"
							variant="outline"
							size="sm"
							onClick={() => setIsAddModalOpen(false)}
						/>
						<Button
							label="Simpan"
							size="sm"
							onClick={handleSubmit}
						/>
					</div>
				}
			>
				<div className="flex flex-col gap-4">
					<InputText
                        name="name"
						label="Nama"
						placeholder="Masukkan nama lengkap"
						value={form.nama}
						onChange={(e) => handleChange("nama", e.target.value)}
					/>
					<InputText
                        name="email"
						label="Email"
						placeholder="Masukkan email"
						value={form.email}
						onChange={(e) => handleChange("email", e.target.value)}
					/>
					<InputText
                    name="phone"
						label="No. Telepon"
						placeholder="Masukkan nomor telepon"
						value={form.phone}
						onChange={(e) => handleChange("phone", e.target.value)}
					/>
					<div className="flex flex-col gap-1.5">
						<label className="text-xs font-bold uppercase tracking-wider text-slate-500">
							Password
						</label>
						<input
							type="password"
							placeholder="Masukkan password"
							value={form.password}
							onChange={(e) => handleChange("password", e.target.value)}
							className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
						/>
					</div>
					<InputSelect
                        name="role"
						label="Role"
						value={form.role}
						onChange={(e) => handleChange("role", e.target.value)}
						options={[
							{ label: "Pilih Role", value: "" },
							{ label: "Admin", value: "Admin" },
							{ label: "Manager", value: "Manager" },
							{ label: "Staff", value: "Staff" },
							{ label: "Cashier", value: "Cashier" },
						]}
					/>
				</div>
			</Modal>
		</div>
	);
}
