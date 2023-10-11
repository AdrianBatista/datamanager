import { useState } from "react";
import Modal from "./Modal";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import SecondaryButton from "./SecondaryButton";
import DangerButton from "./DangerButton";

function getFieldType(fieldValue) {
    switch (typeof fieldValue) {
        case "string":
            return "Text";
        case "object":
            return "Section";
    }
}

export default function EditSection({ data, setStructure, readOnly, field }) {
    const [showModal, setShowModal] = useState(false);
    const [newField, setNewField] = useState(field);
    const [fieldType, setFieldType] = useState(getFieldType(data[field]));

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
            ...entries.slice(0, index),
            [newField, data[field]],
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
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
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
                            disabled
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
                            Edit Field
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </>
    );
}
