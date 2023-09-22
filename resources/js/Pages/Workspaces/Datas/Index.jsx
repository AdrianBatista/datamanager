import InputError from "@/Components/InputError";
import Item from "@/Components/Item";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Datas({ auth, workspace }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        title: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("workspaces.datas.store", workspace.id), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Data Groups
                </h2>
            }
        >
            <Head title="Datas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form
                                onSubmit={submit}
                                className="flex flex-wrap gap-1"
                            >
                                <div className="block w-full sm:flex-1">
                                    <TextInput
                                        id="title"
                                        name="title"
                                        value={data.title}
                                        placeholder="Data group's title"
                                        className="block w-full"
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="flex-1 sm:flex-initial">
                                    <PrimaryButton
                                        disabled={processing}
                                        className="block w-full h-full"
                                    >
                                        Create Group
                                    </PrimaryButton>
                                </div>
                            </form>
                            <InputError
                                message={errors.title}
                                className="mt-2"
                            />
                            <div className="mt-4 flex flex-col gap-1">
                                {workspace.datas.map((data) => (
                                    <Item
                                        key={data.id}
                                        text={data.title}
                                        url={route("workspaces.datas.show", [
                                            workspace.id,
                                            data.id,
                                        ])}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
