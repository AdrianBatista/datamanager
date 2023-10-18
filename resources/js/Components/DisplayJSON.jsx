import { Fragment, useEffect, useState } from "react";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import AddSection from "./AddSection";
import DeleteSection from "./DeleteSection";
import EditSection from "./EditSection";
import MoveUpSection from "./MoveUpSection";
import MoveDownSection from "./MoveDownSection";
import { getFieldType } from "@/Helpers/DataManipulation";
import { TableSection } from "./TableSection";

export default function DisplayJSON({ structure, readOnly = false, setData }) {
    const [localStructure, setStructure] = useState(structure);

    useEffect(() => {
        if (typeof setData === "function") {
            setData("structure", localStructure);
        }
    }, [localStructure]);

    return display(localStructure, setStructure, readOnly);
}

function createSetter(setter, field) {
    return function (value) {
        if (typeof value === "function") {
            setter((old) => ({ ...old, [field]: value(old[field]) }));
        } else {
            setter((old) => ({ ...old, [field]: value }));
        }
    };
}

function actionsBar(data, setStructure, field, readOnly) {
    return (
        <>
            <AddSection
                data={data}
                setStructure={setStructure}
                field={field}
                readOnly={readOnly}
            />
            <MoveUpSection
                data={data}
                setStructure={setStructure}
                field={field}
                readOnly={readOnly}
            />
            <MoveDownSection
                data={data}
                setStructure={setStructure}
                field={field}
                readOnly={readOnly}
            />
            <EditSection
                data={data}
                setStructure={setStructure}
                field={field}
                readOnly={readOnly}
            />
            <DeleteSection
                data={data}
                setStructure={setStructure}
                field={field}
                readOnly={readOnly}
            />
        </>
    );
}

function display(data, setStructure, readOnly, parent = null) {
    return data && Object.keys(data).length ? (
        Object.entries(data).map(([key, value], index) => {
            switch (getFieldType(value)) {
                case "Text":
                    return (
                        <div key={key} className={index > 0 ? "mt-6" : ""}>
                            <div className="flex justify-between items-end">
                                <InputLabel htmlFor={key} value={key} />
                                <div className="flex">
                                    {readOnly === false &&
                                        actionsBar(
                                            data,
                                            setStructure,
                                            key,
                                            readOnly
                                        )}
                                </div>
                            </div>

                            <TextInput
                                type="text"
                                name={key}
                                value={value}
                                className="mt-1 block w-full"
                                readOnly={readOnly}
                                onChange={
                                    readOnly
                                        ? null
                                        : (e) =>
                                              setStructure((old) => ({
                                                  ...old,
                                                  [key]: e.target.value,
                                              }))
                                }
                            />
                        </div>
                    );

                case "Table":
                    return (
                        <Fragment key={key}>
                            <div
                                className={`${
                                    index > 0 ? "mt-5" : ""
                                } shadow p-4`}
                            >
                                <div className="flex justify-between items-end">
                                    {key}
                                    <div className="flex">
                                        {readOnly === false &&
                                            actionsBar(
                                                data,
                                                setStructure,
                                                key,
                                                readOnly
                                            )}
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <TableSection
                                        table={value}
                                        setTable={createSetter(
                                            setStructure,
                                            key
                                        )}
                                        readOnly={readOnly}
                                    />
                                </div>
                            </div>
                        </Fragment>
                    );

                case "Section":
                    return (
                        <Fragment key={key}>
                            <div
                                className={`${
                                    index > 0 ? "mt-5" : ""
                                } shadow p-4`}
                            >
                                <div className="flex justify-between items-end">
                                    {key}
                                    <div className="flex">
                                        {readOnly === false &&
                                            actionsBar(
                                                data,
                                                setStructure,
                                                key,
                                                readOnly
                                            )}
                                    </div>
                                </div>
                                <div className="mt-3">
                                    {display(
                                        value,
                                        createSetter(setStructure, key),
                                        readOnly,
                                        key
                                    )}
                                </div>
                            </div>
                        </Fragment>
                    );
            }
        })
    ) : (
        <div className="flex items-center">
            {getFieldType(data) === "Section" ? (
                <>
                    <span className="me-2">There is no data here yet!</span>
                    {readOnly === false && (
                        <AddSection
                            data={data}
                            setStructure={setStructure}
                            field={parent}
                            readOnly={readOnly}
                        />
                    )}
                </>
            ) : (
                <div className="w-full me-2">
                    <TableSection
                        table={data}
                        setTable={setStructure}
                        readOnly={readOnly}
                    />
                </div>
            )}
        </div>
    );
}
