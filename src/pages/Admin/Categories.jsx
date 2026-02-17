import { useState } from "react";
import toast from "react-hot-toast";
import { Loading } from "../../components";
import AdminSidebar from "../../components/admin/AdminSidebar";
import {
	useAdminCreateCategory,
	useAdminDeleteCategory,
	useAdminGetCategories,
	useAdminUpdateCategory,
	useAdminUpdateCategoryStatus,
} from "../../hooks/admin/useAdminCategories";
import { useI18n } from "../../hooks/useI18n";

const Categories = () => {
	const { t } = useI18n();
	const { data: categories, isLoading } = useAdminGetCategories();
	const createCategoryMutation = useAdminCreateCategory();
	const updateCategoryMutation = useAdminUpdateCategory();
	const updateStatusMutation = useAdminUpdateCategoryStatus();
	const deleteCategoryMutation = useAdminDeleteCategory();

	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [editingCategory, setEditingCategory] = useState(null);
	const [formData, setFormData] = useState({
		name: "",
		displayNameEn: "",
		displayNameAr: "",
		descriptionEn: "",
		descriptionAr: "",
		imageUrl: "",
		isEnabled: true,
		order: 0,
	});

	const handleCreateClick = () => {
		setFormData({
			name: "",
			displayNameEn: "",
			displayNameAr: "",
			descriptionEn: "",
			descriptionAr: "",
			imageUrl: "",
			isEnabled: true,
			order: categories?.length || 0,
		});
		setIsCreateModalOpen(true);
	};

	const handleEditClick = (category) => {
		setFormData({
			name: category.name,
			displayNameEn: category.displayNameEn || "",
			displayNameAr: category.displayNameAr || "",
			descriptionEn: category.descriptionEn || "",
			descriptionAr: category.descriptionAr || "",
			imageUrl: category.imageUrl || "",
			isEnabled: category.isEnabled,
			order: category.order,
		});
		setEditingCategory(category);
	};

	const handleCancel = () => {
		setIsCreateModalOpen(false);
		setEditingCategory(null);
		setFormData({
			name: "",
			displayNameEn: "",
			displayNameAr: "",
			descriptionEn: "",
			descriptionAr: "",
			imageUrl: "",
			isEnabled: true,
			order: 0,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (editingCategory) {
				await updateCategoryMutation.mutateAsync({
					id: editingCategory.id,
					data: formData,
				});
				toast.success(t("admin.categories.categoryUpdatedSuccess"));
			} else {
				await createCategoryMutation.mutateAsync(formData);
				toast.success(t("admin.categories.categoryCreatedSuccess"));
			}
			handleCancel();
		} catch (error) {
			toast.error(error?.response?.data?.message || t("admin.categories.failedToSaveCategory"));
		}
	};

	const handleToggle = async (category) => {
		try {
			await updateStatusMutation.mutateAsync({
				name: category.name,
				isEnabled: !category.isEnabled,
			});
			toast.success(
				`${category.displayName} ${!category.isEnabled ? t("admin.categories.enabledSuccess") : t("admin.categories.disabledSuccess")}`,
			);
		} catch {
			toast.error(t("admin.categories.failedToUpdateStatus"));
		}
	};

	const handleDelete = async (category) => {
		if (!window.confirm(t("admin.categories.deleteConfirm", { name: category.displayName }))) {
			return;
		}

		try {
			await deleteCategoryMutation.mutateAsync(category.id);
			toast.success(t("admin.categories.categoryDeletedSuccess"));
		} catch (error) {
			toast.error(error?.response?.data?.message || t("admin.categories.failedToDeleteCategory"));
		}
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Loading />
			</div>
		);
	}

	return (
		<div className="flex min-h-screen bg-[#121417] text-white">
			<AdminSidebar />
			<div className="flex-1 p-8">
				<div className="container mx-auto">
					<div className="flex justify-between items-center mb-8">
						<h1 className="text-3xl font-bold">{t("admin.categories.categoryManagement")}</h1>
						<button
							onClick={handleCreateClick}
							className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
						>
							{t("admin.categories.createCategory")}
						</button>
					</div>

					<div className="bg-[#27292C] rounded-lg p-6">
						<div className="space-y-4">
							{categories && categories.length > 0 ? (
								categories.map((category) => (
									<div
										key={category.id}
										className="flex items-center justify-between p-4 bg-[#121417] rounded-lg"
									>
										<div className="flex-1">
											<div className="flex items-center gap-2">
												<h3 className="text-lg font-semibold text-white">
													{category.displayNameEn} / {category.displayNameAr}
												</h3>
												{category.isPredefined && (
													<span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded">
														{t("admin.categories.predefined")}
													</span>
												)}
											</div>
											<p className="text-sm text-white/60 mt-1">{category.name}</p>
											{(category.descriptionEn || category.descriptionAr) && (
												<p className="text-sm text-white/40 mt-1">
													{category.descriptionEn && <span>EN: {category.descriptionEn}</span>}
													{category.descriptionEn && category.descriptionAr && <span> | </span>}
													{category.descriptionAr && <span>AR: {category.descriptionAr}</span>}
												</p>
											)}
										</div>
										<div className="flex items-center gap-4">
											<span
												className={`px-3 py-1 rounded-full text-sm font-medium ${
													category.isEnabled ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
												}`}
											>
												{category.isEnabled ? t("admin.categories.enabled") : t("admin.categories.disabled")}
											</span>
											<button
												onClick={() => handleEditClick(category)}
												className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
											>
												{t("admin.categories.edit")}
											</button>
											{!category.isPredefined && (
												<button
													onClick={() => handleDelete(category)}
													disabled={deleteCategoryMutation.isPending}
													className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
												>
													{t("admin.categories.delete")}
												</button>
											)}
											<button
												onClick={() => handleToggle(category)}
												disabled={updateStatusMutation.isPending}
												className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
													category.isEnabled ? "bg-blue-500" : "bg-gray-600"
												} ${updateStatusMutation.isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
											>
												<span
													className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
														category.isEnabled ? "translate-x-6" : "translate-x-1"
													}`}
												/>
											</button>
										</div>
									</div>
								))
							) : (
								<div className="text-center py-8 text-white/60">{t("admin.categories.noCategoriesFound")}</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Create/Edit Modal */}
			{(isCreateModalOpen || editingCategory) && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
					<div className="bg-[#27292C] rounded-lg p-6 w-full max-w-md">
						<h2 className="text-2xl font-bold mb-4">
							{editingCategory ? t("admin.categories.editCategory") : t("admin.categories.createCategory")}
						</h2>
						<form
							onSubmit={handleSubmit}
							className="space-y-4"
						>
							<div>
								<label className="block text-sm font-medium mb-1">{t("admin.categories.name")}</label>
								<input
									type="text"
									value={formData.name}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
									required
									disabled={!!editingCategory}
									className="w-full px-4 py-2 bg-[#121417] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
									placeholder={t("admin.categories.namePlaceholder")}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">{t("admin.categories.displayNameEn")}</label>
								<input
									type="text"
									value={formData.displayNameEn}
									onChange={(e) => setFormData({ ...formData, displayNameEn: e.target.value })}
									required
									className="w-full px-4 py-2 bg-[#121417] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
									placeholder={t("admin.categories.displayNamePlaceholderEn")}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">{t("admin.categories.displayNameAr")}</label>
								<input
									type="text"
									value={formData.displayNameAr}
									onChange={(e) => setFormData({ ...formData, displayNameAr: e.target.value })}
									required
									className="w-full px-4 py-2 bg-[#121417] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
									placeholder={t("admin.categories.displayNamePlaceholderAr")}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">{t("admin.categories.descriptionEn")}</label>
								<textarea
									value={formData.descriptionEn}
									onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
									rows={3}
									className="w-full px-4 py-2 bg-[#121417] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
									placeholder={t("admin.categories.descriptionPlaceholderEn")}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">{t("admin.categories.descriptionAr")}</label>
								<textarea
									value={formData.descriptionAr}
									onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
									rows={3}
									className="w-full px-4 py-2 bg-[#121417] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
									placeholder={t("admin.categories.descriptionPlaceholderAr")}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">{t("admin.categories.imageUrl")}</label>
								<input
									type="url"
									value={formData.imageUrl}
									onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
									className="w-full px-4 py-2 bg-[#121417] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
									placeholder={t("admin.categories.imageUrlPlaceholder")}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">{t("admin.categories.order")}</label>
								<input
									type="number"
									value={formData.order}
									onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value, 10) || 0 })}
									min="0"
									className="w-full px-4 py-2 bg-[#121417] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
								/>
							</div>
							<div className="flex items-center gap-2">
								<input
									type="checkbox"
									id="isEnabled"
									checked={formData.isEnabled}
									onChange={(e) => setFormData({ ...formData, isEnabled: e.target.checked })}
									className="w-4 h-4"
								/>
								<label
									htmlFor="isEnabled"
									className="text-sm"
								>
									{t("admin.categories.enabled")}
								</label>
							</div>
							<div className="flex gap-4 pt-4">
								<button
									type="submit"
									disabled={createCategoryMutation.isPending || updateCategoryMutation.isPending}
									className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
								>
									{editingCategory ? t("admin.categories.update") : t("admin.categories.create")}
								</button>
								<button
									type="button"
									onClick={handleCancel}
									className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
								>
									{t("admin.categories.cancel")}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default Categories;
