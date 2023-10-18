import { useState } from "react";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import SecondaryButton from "./SecondaryButton";
import DangerButton from "./DangerButton";

export default function AddTableColumn({
    table,
    setTable,
    readOnly,
    setShowModal,
}) {
    const [newField, setNewField] = useState("");

    const handleClose = () => {
        setShowModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newField.length > 0) {
            let newTable = [];
            if (table.length == 0) {
                newTable = [{ [newField]: null }, { [newField]: null }];
            } else {
                newTable = table.map((row) => ({
                    ...row,
                    [newField]: null,
                }));
            }
            setTable(newTable);
        }
    };

    return (
        <>
            <div className="p-6">
                <div>
                    <InputLabel htmlFor="name" value="Column Name" />
                    <TextInput
                        type="text"
                        name="name"
                        className="mt-1 block w-full"
                        value={newField}
                        onChange={(e) => setNewField(e.target.value)}
                    />
                </div>
                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={handleClose}>
                        Cancel
                    </SecondaryButton>

                    <DangerButton className="ml-3" onClick={handleSubmit}>
                        Add Column
                    </DangerButton>
                </div>
            </div>
        </>
    );
}
