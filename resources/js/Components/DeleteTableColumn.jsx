import SecondaryButton from "./SecondaryButton";
import DangerButton from "./DangerButton";

export default function DeleteTableColumn({
    table,
    setTable,
    readOnly,
    setShowModal,
    selectedColumn,
}) {
    const handleClose = () => {
        setShowModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!readOnly && selectedColumn !== null) {
            const newTable = table.map((row) =>
                Object.fromEntries(
                    Object.entries(row).filter(
                        ([key]) => key !== selectedColumn
                    )
                )
            );
            setTable(newTable);
        }
        setShowModal(false);
    };

    return (
        <>
            <div className="p-6">
                <div>Are you sure you want to delete this column?</div>
                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={handleClose}>
                        Cancel
                    </SecondaryButton>

                    <DangerButton className="ml-3" onClick={handleSubmit}>
                        Delete Column
                    </DangerButton>
                </div>
            </div>
        </>
    );
}
