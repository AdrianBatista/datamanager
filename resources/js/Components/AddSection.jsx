import { useState } from "react";
import Modal from "./Modal";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import SecondaryButton from "./SecondaryButton";
import DangerButton from "./DangerButton";

export default function AddSection({ data, setStructure, readOnly, field }) {
    const [showModal, setShowModal] = useState(false);
    const [newField, setNewField] = useState("");
    const [fieldType, setFieldType] = useState("Text");

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
        const newEntries = [
            ...entries.slice(0, index + 1),
            [newField, fieldType == "Text" ? "" : {}],
            ...entries.slice(index + 1),
        ];
        setStructure(Object.fromEntries(newEntries));
        setNewField("");
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
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </button>
            <Modal show={showModal} onClose={handleClose}>
                <div className="p-6">
                    <div>
                        <InputLabel htmlFor="name" value="Field Name" />
                        <TextInput
                            type="text"
                            name="name"
                            className="mt-1 block w-full"
                            value={newField}
                            onChange={(e) => setNewField(e.target.value)}
                        />
                    </div>
                    <div className="mt-5">
                        <InputLabel htmlFor="type" value="Field Type" />
                        <select
                            id="type"
                            name="type"
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                            value={fieldType}
                            onChange={(e) => setFieldType(e.target.value)}
                        >
                            <option>Text</option>
                            <option>Section</option>
                        </select>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={handleClose}>
                            Cancel
                        </SecondaryButton>

                        <DangerButton className="ml-3" onClick={handleSubmit}>
                            Add Field
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </>
    );
}
