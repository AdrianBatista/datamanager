import { useState } from "react";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import SecondaryButton from "./SecondaryButton";
import DangerButton from "./DangerButton";

export default function AddTableRow({
    table,
    setTable,
    readOnly,
    setShowModal,
    selectedRow,
    before,
}) {
    const [newField, setNewField] = useState("");

    const handleClose = () => {
        setShowModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newTable = [];
        if (selectedRow !== null) {
            const offset = before ? 1 : 2;
            newTable = [
                ...table.slice(0, selectedRow + offset),
                Object.fromEntries(
                    Object.keys(table[0]).map((key) => [key, null])
                ),
                ...table.slice(selectedRow + offset),
            ];
        } else {
            newTable = [
                ...table,
                Object.fromEntries(
                    Object.keys(table[0]).map((key) => [key, null])
                ),
            ];
        }
        setTable(newTable);
    };

    return (
        <>
            <div className="p-6">
                <div>Are you sure you want to add a new row?</div>
                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={handleClose}>
                        Cancel
                    </SecondaryButton>

                    <DangerButton className="ml-3" onClick={handleSubmit}>
                        Add Row
                    </DangerButton>
                </div>
            </div>
        </>
    );
}
