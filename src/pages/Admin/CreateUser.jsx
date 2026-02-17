import AdminSidebar from "../../components/admin/AdminSidebar";
import CreateUserForm from "../../components/admin/CreateUserForm";
import { useI18n } from "../../hooks/useI18n";

const CreateUser = () => {
	const { t } = useI18n();
	return (
		<div className="flex min-h-screen bg-[#121417] text-white">
			<AdminSidebar />
			<div className="flex-1 p-8">
				<div className="container mx-auto max-w-3xl">
					<h1 className="text-3xl font-bold mb-6">{t("admin.createUserPage.title")}</h1>
					<CreateUserForm />
				</div>
			</div>
		</div>
	);
};

export default CreateUser;
