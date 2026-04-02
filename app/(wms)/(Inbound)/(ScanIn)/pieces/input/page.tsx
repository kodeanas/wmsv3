"use client";

import { useState } from "react";
import { InputRupiah, InputText } from "@/components/globals/additionals/Inputs";
import RadioCardGroup from "@/components/globals/additionals/CategoryRadio";
import QualityTabs from "@/components/globals/additionals/QualtiyTabs";
import CardKeyValueHorizontal from "@/components/globals/cards/CardKeyValueHorizontal";
import StatsSectionWrapper from "@/components/globals/cards/StatsSectionWrapper";
import { formatRibuan } from "@/helper/formatRibuan";

type StickerType = "Big" | "Small" | "Tiny";

interface CheckedItem {
	name: string;
	qty: number;
	originalPrice: number;
	warehousePrice: number;
	sticker?: StickerType;
}

const mockCategories = [
	{
		id: "feed",
		name: "Feed",
		discount: "0%",
	},
	{
		id: "supplement",
		name: "Supplement",
		discount: "5%",
	},
	{
		id: "vitamin",
		name: "Vitamin",
		discount: "10%",
	},
	{
		id: "medicine",
		name: "Medicine",
		discount: "15%",
	},
];

const formatRupiah = (value: number) =>
	`Rp ${formatRibuan(value)}`;

const getWarehousePrice = (price: number) => {
	if (price >= 100000) return price + 4000;
	return price + 2000;
};

const getStickerType = (price: number): StickerType => {
	if (price < 50000) return "Tiny";
	if (price < 80000) return "Small";
	return "Big";
};

export default function PiecesInputPage() {
	const [form, setForm] = useState({
		name: "",
		qty: "",
		originalPrice: "",
	});
	const [checkedItem, setCheckedItem] = useState<CheckedItem | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<string | number>("feed");
	const [notes, setNotes] = useState({
		abnormal: "",
		damaged: "",
		non: "",
	});

	const handleCheckPrice = () => {
		const parsedQty = Number(form.qty);
		const parsedPrice = Number(form.originalPrice);

		if (!form.name.trim() || !parsedQty || !parsedPrice) {
			setCheckedItem(null);
			return;
		}

		setCheckedItem({
			name: form.name,
			qty: parsedQty,
			originalPrice: parsedPrice,
			warehousePrice: getWarehousePrice(parsedPrice),
			sticker: parsedPrice < 100000 ? getStickerType(parsedPrice) : undefined,
		});
	};

	const handleSubmit = () => {
		console.log("Submitting pieces input:", {
			form,
			checkedItem,
			selectedCategory,
			notes,
		});

		setForm({
			name: "",
			qty: "",
			originalPrice: "",
		});
		setCheckedItem(null);
		setSelectedCategory("feed");
		setNotes({
			abnormal: "",
			damaged: "",
			non: "",
		});
	};

	return (
		<div className="space-y-6">
			<section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
				<div className="mb-5 flex items-center justify-between">
					<div>
						<h1 className="text-lg font-bold text-slate-800">Input Barang Pieces</h1>
						<p className="text-sm text-slate-500">
							Isi nama dan harga asal, lalu cek harga gudang sebelum pilih quality.
						</p>
					</div>
					<button
						type="button"
						onClick={handleCheckPrice}
						className="rounded-lg bg-blue-400 px-4 py-2.5 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-500"
					>
						Cek Produk
					</button>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<InputText
						label="Nama"
						name="name"
						placeholder="Masukkan nama barang"
						value={form.name}
						onChange={(e) => setForm({ ...form, name: e.target.value })}
					/>
					<InputText
						label="Qty"
						name="qty"
						placeholder="Masukkan qty"
						value={form.qty}
						onChange={(e) => setForm({ ...form, qty: e.target.value.replace(/[^0-9]/g, "") })}
					/>
					<InputRupiah
						label="Harga Asal"
						name="originalPrice"
						placeholder="Masukkan harga asal"
						value={form.originalPrice}
						onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
					/>
				</div>
			</section>

			{checkedItem && (
					<CardKeyValueHorizontal
						title="Informasi Harga Gudang"
						items={[
							{ label: "Nama", value: checkedItem.name },
							{ label: "Qty", value: checkedItem.qty },
							{ label: "Harga Asal", value: formatRupiah(checkedItem.originalPrice) },
							{ label: "Harga Gudang", value: formatRupiah(checkedItem.warehousePrice) },
							{
								label: "Aturan",
								value:
									checkedItem.originalPrice >= 100000
										? "Di atas Rp 100.000 wajib pilih kategori"
										: "Di bawah Rp 100.000 otomatis pakai sticker",
							},
						]}
					/>
			)}

			<QualityTabs
				onChange={(id, label) => console.log(id, label)}
				items={[
					{
						id: "good",
						label: "Good",
						content: checkedItem ? (
							checkedItem.originalPrice >= 100000 ? (
								<div className="space-y-4">
									<RadioCardGroup
										options={mockCategories.map((cat) => ({
											id: cat.id,
											title: cat.name,
											subTitle: "KATEGORI",
											valueText: cat.discount,
											valueLabel: "DISKON",
											percentage: cat.discount,
										}))}
										selectedValue={selectedCategory}
										onChange={setSelectedCategory}
									/>
									<button
										type="button"
										onClick={handleSubmit}
										className="w-full rounded-lg bg-blue-400 px-4 py-2.5 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-500"
									>
										Kirim
									</button>
								</div>
							) : (
								<div className="flex flex-col gap-4">
									<div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/30 p-4">
										<div className="flex items-center gap-4">
											<div className="rounded-lg border border-slate-100 bg-white p-2.5 shadow-sm">
												<svg
													className="h-5 w-5 text-blue-500"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
													/>
												</svg>
											</div>

											<div>
												<h3 className="text-sm font-bold text-slate-800">Barang Sticker / Low Value</h3>
												<p className="text-xs text-slate-500">Item di bawah Rp 100.000</p>
											</div>
										</div>

										<div className="flex items-center gap-6 pr-2">
											<div className="flex flex-col items-end">
												<span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
													Tipe
												</span>
												<span className="text-sm font-extrabold uppercase text-blue-600">
													{checkedItem.sticker}
												</span>
											</div>

											<div className="h-8 w-px bg-slate-200" />

											<div className="flex flex-col items-end">
												<span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
													Warna Sticker
												</span>
												<div className="flex items-center gap-1.5">
													<div
														className={`h-2.5 w-2.5 rounded-full ${
															checkedItem.sticker === "Big"
																? "bg-red-400"
																: checkedItem.sticker === "Small"
																	? "bg-amber-400"
																	: "bg-emerald-400"
														}`}
													/>
													<span className="text-sm font-extrabold text-slate-700">
														{checkedItem.sticker === "Big"
															? "Merah"
															: checkedItem.sticker === "Small"
																? "Kuning"
																: "Hijau"}
													</span>
												</div>
											</div>
										</div>
									</div>
									<button
										type="button"
										onClick={handleSubmit}
										className="w-full rounded-lg bg-blue-400 px-4 py-2.5 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-500"
									>
										Kirim
									</button>
								</div>
							)
						) : (
							<p className="text-sm text-slate-500">Isi form lalu cek harga terlebih dahulu</p>
						),
					},
					{
						id: "abnormal",
						label: "Abnormal",
						content: (
							<div className="space-y-4">
								<textarea
									value={notes.abnormal}
									onChange={(e) => setNotes({ ...notes, abnormal: e.target.value })}
									placeholder="Masukkan catatan untuk produk abnormal..."
									className="w-full rounded-lg border border-slate-200 p-4 text-sm focus:border-blue-400 focus:outline-none"
									rows={6}
								/>
								<button
									type="button"
									onClick={handleSubmit}
									className="w-full rounded-lg bg-blue-400 px-4 py-2.5 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-500"
								>
									Kirim
								</button>
							</div>
						),
					},
					{
						id: "damaged",
						label: "Damaged",
						content: (
							<div className="space-y-4">
								<textarea
									value={notes.damaged}
									onChange={(e) => setNotes({ ...notes, damaged: e.target.value })}
									placeholder="Masukkan catatan untuk produk damaged..."
									className="w-full rounded-lg border border-slate-200 p-4 text-sm focus:border-blue-400 focus:outline-none"
									rows={6}
								/>
								<button
									type="button"
									onClick={handleSubmit}
									className="w-full rounded-lg bg-blue-400 px-4 py-2.5 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-500"
								>
									Kirim
								</button>
							</div>
						),
					},
					{
						id: "non",
						label: "Non",
						content: (
							<div className="space-y-4">
								<textarea
									value={notes.non}
									onChange={(e) => setNotes({ ...notes, non: e.target.value })}
									placeholder="Masukkan catatan untuk produk non..."
									className="w-full rounded-lg border border-slate-200 p-4 text-sm focus:border-blue-400 focus:outline-none"
									rows={6}
								/>
								<button
									type="button"
									onClick={handleSubmit}
									className="w-full rounded-lg bg-blue-400 px-4 py-2.5 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-500"
								>
									Kirim
								</button>
							</div>
						),
					},
				]}
			/>
		</div>
	);
}
