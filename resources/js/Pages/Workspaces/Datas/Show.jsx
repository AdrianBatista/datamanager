import DisplayJSON from "@/Components/DisplayJSON";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function ShowData({ auth, workspace, dataModel }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {dataModel.title}
                </h2>
            }
        >
            <Head title="Workspaces" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <DisplayJSON
                                structure={JSON.parse(dataModel.structure)}
                                readOnly
                            />
                            <div className="mt-8 flex flex-row-reverse">
                                <a
                                    href={route("workspaces.datas.edit", [
                                        workspace,
                                        dataModel,
                                    ])}
                                >
                                    <PrimaryButton>Edit</PrimaryButton>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
