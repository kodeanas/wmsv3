"use client";

import { useState } from "react";
import DataTable from "@/components/data-tables/DataTable";
import Modal from "@/components/globals/additionals/Modal";
import { InputText } from "@/components/globals/additionals/Inputs";
import Button from "@/components/globals/buttons/ButtonPrimary";
import { Pencil } from "lucide-react";

type TaxRow = {
	tax: string;
	is_active: boolean;
};

const statusColorMap: Record<string, string> = {
	true: "bg-emerald-100 text-emerald-700",
	false: "bg-slate-100 text-slate-500",
};

const taxRows: TaxRow[] = [
	{ tax: "PPN 11%", is_active: true },
	{ tax: "PPN 10%", is_active: false },
	{ tax: "PPnBM 20%", is_active: true },
	{ tax: "Bebas Pajak", is_active: false },
];

export default function TaxPage() {
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [addForm, setAddForm] = useState({ tax: "" });

	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [editForm, setEditForm] = useState<{ tax: string; is_active: boolean }>({
		tax: "",
		is_active: true,
	});

	const handleAdd = () => {
		console.log("Tambah tax:", addForm);
		setIsAddModalOpen(false);
		setAddForm({ tax: "" });
	};

	const handleEdit = (item: TaxRow) => {
		setEditForm({ tax: item.tax, is_active: item.is_active });
		setIsEditModalOpen(true);
	};

	const handleEditSubmit = () => {
		console.log("Edit tax:", editForm);
		setIsEditModalOpen(false);
	};

	return (
		<div className="space-y-6 p-6">
			<DataTable
				data={taxRows}
				searchableKeys={["tax"]}
				filters={[
					{
						label: "Status",
						accessor: "is_active",
						options: [
							{ label: "Active", value: "true" },
							{ label: "Inactive", value: "false" },
						],
					},
				]}
				columns={[
					{ header: "Tax", accessor: "tax", key: "tax" },
					{
						header: "Status",
						key: "is_active",
						accessor: (item) => (
							<span
								className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColorMap[String(item.is_active)]}`}
							>
								{item.is_active ? "Active" : "Inactive"}
							</span>
						),
					},
				]}
				topButton={{ label: "Tambah Tax", onClick: () => setIsAddModalOpen(true) }}
				actions={{
					customActions: [
						{
							label: "Edit",
							icon: <Pencil size={14} />,
							color: "blue",
							onClick: handleEdit,
						},
					],
				}}
			/>

			{/* Modal Tambah Tax */}
			<Modal
				isOpen={isAddModalOpen}
				onClose={() => setIsAddModalOpen(false)}
				title="Tambah Tax"
				size="sm"
				footer={
					<div className="flex justify-end gap-2">
						<Button
							label="Batal"
							variant="outline"
							size="sm"
							onClick={() => setIsAddModalOpen(false)}
						/>
						<Button label="Simpan" size="sm" onClick={handleAdd} />
					</div>
				}
			>
				<InputText
					name="tax"
					label="Nama Tax"
					placeholder="Contoh: PPN 11%"
					value={addForm.tax}
					onChange={(e) => setAddForm({ tax: e.target.value })}
				/>
			</Modal>

			{/* Modal Edit Tax */}
			<Modal
				isOpen={isEditModalOpen}
				onClose={() => setIsEditModalOpen(false)}
				title="Edit Tax"
				size="sm"
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
						name="tax"
						label="Nama Tax"
						placeholder="Contoh: PPN 11%"
						value={editForm.tax}
						onChange={(e) => setEditForm((prev) => ({ ...prev, tax: e.target.value }))}
					/>
					<div className="flex flex-col gap-1.5">
						<label className="text-xs font-bold uppercase tracking-wider text-slate-500">
							Status
						</label>
						<div className="flex gap-4">
							<label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
								<input
									type="radio"
									name="edit_status"
									value="true"
									checked={editForm.is_active === true}
									onChange={() => setEditForm((prev) => ({ ...prev, is_active: true }))}
									className="accent-emerald-500"
								/>
								Active
							</label>
							<label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
								<input
									type="radio"
									name="edit_status"
									value="false"
									checked={editForm.is_active === false}
									onChange={() => setEditForm((prev) => ({ ...prev, is_active: false }))}
									className="accent-slate-400"
								/>
								Inactive
							</label>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
}
