import DisplayJSON from "@/Components/DisplayJSON";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function EditData({ auth, workspace, dataModel }) {
    const { data, setData, put, processing, reset, errors } = useForm({
        structure: JSON.parse(dataModel.structure),
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("workspaces.datas.update", [workspace, dataModel]), {
            onSuccess: () => reset(),
        });
    };

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
                            <form onSubmit={submit}>
                                <DisplayJSON
                                    structure={data.structure}
                                    setData={setData}
                                />
                                <div className="mt-8 flex flex-row-reverse">
                                    <PrimaryButton disabled={processing}>
                                        Save
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
