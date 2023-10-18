import { useEffect, useState } from "react";
import TextInput from "./TextInput";
import AddTableColumn from "./AddTableColumn";
import Modal from "./Modal";
import AddTableRow from "./AddTableRow";

export function TableSection({ table, setTable, readOnly }) {
    const [openColumnModal, setOpenColumnModal] = useState(false);
    const [openRowModal, setOpenRowModal] = useState(false);
    const [displayContextMenu, setDisplayContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosiiton] = useState({
        x: 0,
        y: 0,
    });

    const closeContextMenu = () => setDisplayContextMenu(false);

    const handleContext = (e) => {
        if (!readOnly) {
            e.preventDefault();
            setContextMenuPosiiton({ x: e.pageX, y: e.pageY });
            setDisplayContextMenu(true);
        }
    };

    const handlePaste = (e) => {
        if (!readOnly) {
            e.preventDefault();
            const clipboardData = e.clipboardData;
            const pastedData = clipboardData.getData("Text");

            if (/\r\n/g.test(pastedData)) {
                const rows = pastedData.split("\r\n");
                rows.pop();

                const pastedTable = rows.map((row) => row.split("\t"));
                const rowsSize = rows.length;
                const columnSize = pastedTable[0].length;
                const tableRowsSize = table.length - 1;
                const tableColumnSize = Object.keys(table[0]).length;

                if (
                    rowsSize === tableRowsSize &&
                    columnSize === tableColumnSize
                ) {
                    const newTable = [...table];
                    const keys = Object.keys(table[0]);

                    for (let row = 0; row < rowsSize; row++) {
                        keys.forEach((key, column) => {
                            newTable[row + 1][key] = pastedTable[row][column];
                        });
                    }

                    setTable(newTable);
                }
            }
        }
    };

    const handleChange = (e, row, column) => {
        const key = Object.keys(table[row])[column];
        const newTable = [...table];
        newTable[row][key] = e.target.value;
        setTable(newTable);
    };

    const addColumn = () => {
        setOpenColumnModal(true);
    };

    const addRow = () => {
        setOpenRowModal(true);
    };

    useEffect(() => {
        window.addEventListener("click", closeContextMenu);
        return () => {
            window.removeEventListener("click", closeContextMenu);
        };
    }, []);

    return (
        <div className="w-full">
            <div
                className="w-full overflow-x-auto"
                onContextMenu={handleContext}
                onPaste={handlePaste}
            >
                {table.length ? (
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {Object.keys(table[0]).map((header) => (
                                    <th
                                        scope="col"
                                        className="px-6 py-3"
                                        key={header}
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {table.slice(1).map((row, i) => (
                                <tr
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    key={i}
                                >
                                    {Object.values(row).map((data, j) => (
                                        <td className="px-6 py-4" key={j}>
                                            {readOnly ? (
                                                data
                                            ) : (
                                                <TextInput
                                                    type="text"
                                                    className="block w-full m-0"
                                                    value={data ?? ""}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            e,
                                                            i + 1,
                                                            j
                                                        )
                                                    }
                                                />
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : readOnly ? (
                    <>No data yet.</>
                ) : (
                    <>Right click to start.</>
                )}
            </div>
            {displayContextMenu && (
                <div
                    style={{
                        position: "absolute",
                        top: contextMenuPosition.y,
                        left: contextMenuPosition.x,
                        width: 100,
                    }}
                >
                    <div className="bg-white w-60 border border-gray-300 rounded-lg flex flex-col text-sm py-4 px-2 text-gray-500 shadow-lg">
                        <button
                            className="inline-flex justify-items-center pl-2 hover:bg-slate-100 cursor-pointer rounded p-1"
                            onClick={addColumn}
                        >
                            Add Column
                        </button>
                        {table.length > 0 && (
                            <button
                                className="inline-flex justify-items-center pl-2 hover:bg-slate-100 cursor-pointer rounded p-1"
                                onClick={addRow}
                            >
                                Add Row
                            </button>
                        )}
                    </div>
                </div>
            )}
            <Modal show={openColumnModal}>
                <AddTableColumn
                    table={table}
                    setTable={setTable}
                    setShowModal={setOpenColumnModal}
                />
            </Modal>
            <Modal show={openRowModal}>
                <AddTableRow
                    table={table}
                    setTable={setTable}
                    setShowModal={setOpenRowModal}
                />
            </Modal>
        </div>
    );
}
