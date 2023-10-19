import SecondaryButton from "./SecondaryButton";
import DangerButton from "./DangerButton";

export default function DeleteTableRow({
    table,
    setTable,
    readOnly,
    setShowModal,
    selectedRow,
}) {
    const handleClose = () => {
        setShowModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!readOnly && selectedRow !== null) {
            const newTable = [
                ...table.slice(0, selectedRow + 1),
                ...table.slice(selectedRow + 2),
            ];
            setTable(newTable);
        }
        setShowModal(false);
    };

    return (
        <>
            <div className="p-6">
                <div>Are you sure you want to delete this row?</div>
                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={handleClose}>
                        Cancel
                    </SecondaryButton>

                    <DangerButton className="ml-3" onClick={handleSubmit}>
                        Delete Row
                    </DangerButton>
                </div>
            </div>
        </>
    );
}
