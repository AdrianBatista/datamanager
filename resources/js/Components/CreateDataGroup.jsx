import { useForm } from "@inertiajs/react";
import InputError from "./InputError";
import PrimaryButton from "./PrimaryButton";
import TextInput from "./TextInput";
import SecondaryButton from "./SecondaryButton";

export default function CreateDataGroup({ workspace, setShowModal }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        title: "",
    });

    const handleClose = () => {
        setShowModal(false);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("workspaces.datas.store", workspace.id), {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <div className="p-6">
                <form
                    onSubmit={submit}
                    className="flex flex-wrap gap-1"
                    id="createGroup"
                >
                    <div className="block w-full sm:flex-1">
                        <TextInput
                            id="title"
                            name="title"
                            value={data.title}
                            placeholder="Data group's title"
                            className="block w-full"
                            onChange={(e) => setData("title", e.target.value)}
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>
                </form>
                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={handleClose}>
                        Cancel
                    </SecondaryButton>

                    <PrimaryButton
                        disabled={processing}
                        className="ml-3"
                        form="createGroup"
                    >
                        Create Group
                    </PrimaryButton>
                </div>
            </div>
        </>
    );
}
