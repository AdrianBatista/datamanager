import { useForm } from "@inertiajs/react";
import InputError from "./InputError";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

export default function LoadExcelForm({ workspace, setShowModal }) {
    const { data, setData, post, processing, reset, errors, progress } =
        useForm({
            file: "",
        });

    const handleClose = () => {
        setShowModal(false);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("workspaces.excels.store", workspace.id), {
            onSuccess: () => reset(),
        });
        setShowModal(false);
    };

    return (
        <>
            <div className="p-6">
                <form
                    onSubmit={submit}
                    className="flex flex-wrap gap-1"
                    id="addFile"
                >
                    <div className="block w-full sm:flex-1">
                        <input
                            type="file"
                            onChange={(e) => setData("file", e.target.files[0])}
                        />
                        {progress && (
                            <progress value={progress.percentage} max="100">
                                {progress.percentage}%
                            </progress>
                        )}
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
                        form="addFile"
                    >
                        Add File
                    </PrimaryButton>
                </div>
            </div>
        </>
    );
}
