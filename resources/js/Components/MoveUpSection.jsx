import { useState } from "react";
import Modal from "./Modal";
import SecondaryButton from "./SecondaryButton";
import DangerButton from "./DangerButton";

export default function MoveUpSection({ data, setStructure, readOnly, field }) {
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
        if (index > 0) {
            const newEntries = [...entries];
            newEntries[index] = entries[index - 1];
            newEntries[index - 1] = entries[index];
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
                        d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </button>
            <Modal show={showModal} onClose={handleClose}>
                <div className="p-6">
                    <div>
                        Are you sure you want to move this field "{field}" up?
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
