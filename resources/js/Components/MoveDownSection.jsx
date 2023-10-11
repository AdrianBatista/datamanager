import { useState } from "react";
import Modal from "./Modal";
import SecondaryButton from "./SecondaryButton";
import DangerButton from "./DangerButton";

export default function MoveDownSection({
    data,
    setStructure,
    readOnly,
    field,
}) {
    const [showModal, setShowModal] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const entries = Object.entries(data ?? {});
        const index = entries.findIndex((entry) =>
            field ? entry[0] == field : 0
        );
        if (index < entries.length - 1) {
            const newEntries = [...entries];
            newEntries[index] = entries[index + 1];
            newEntries[index + 1] = entries[index];
            setStructure(Object.fromEntries(newEntries));
        }
        setShowModal(false);
    };

    return (
        <>
            <button
                className="inline-flex justify-items-center justify-center hover:bg-slate-400 cursor-pointer rounded p-1"
                onClick={handleClick}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </button>
            <Modal show={showModal} onClose={handleClose}>
                <div className="p-6">
                    <div>
                        Are you sure you want to move this field "{field}" down?
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={handleClose}>
                            Cancel
                        </SecondaryButton>

                        <DangerButton className="ml-3" onClick={handleSubmit}>
                            Yes
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </>
    );
}
