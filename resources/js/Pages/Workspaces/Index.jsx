import InputError from "@/Components/InputError";
import Item from "@/Components/Item";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Workspaces({ auth, workspaces }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        title: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("workspaces.store"), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Workspaces
                </h2>
            }
        >
            <Head title="Workspaces" />

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
                                        placeholder="Workspace's title"
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
                                        Create Workspace
                                    </PrimaryButton>
                                </div>
                            </form>
                            <InputError
                                message={errors.title}
                                className="mt-2"
                            />
                            <div className="mt-4 flex flex-col gap-1">
                                {workspaces.map((workspace) => (
                                    <Item
                                        key={workspace.id}
                                        text={workspace.title}
                                        url={"workspaces/" + workspace.id}
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
