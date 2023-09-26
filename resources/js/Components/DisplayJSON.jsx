import { Fragment, useEffect, useState } from "react";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import AddSection from "./AddSection";
import DeleteSection from "./DeleteSection";

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

function display(data, setStructure, readOnly, parent = null) {
    return data && Object.keys(data).length ? (
        Object.entries(data).map(([key, value], index) => {
            switch (typeof value) {
                case "string":
                    return (
                        <div key={key} className={index > 0 ? "mt-6" : ""}>
                            <div className="flex justify-between items-end">
                                <InputLabel htmlFor={key} value={key} />
                                <div className="flex">
                                    {readOnly === false && (
                                        <>
                                            <AddSection
                                                data={data}
                                                setStructure={setStructure}
                                                field={key}
                                                readOnly={readOnly}
                                            />
                                            <DeleteSection
                                                data={data}
                                                setStructure={setStructure}
                                                field={key}
                                                readOnly={readOnly}
                                            />
                                        </>
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

                case "object":
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
                                        {readOnly === false && (
                                            <>
                                                <AddSection
                                                    data={data}
                                                    setStructure={setStructure}
                                                    field={key}
                                                    readOnly={readOnly}
                                                />
                                                <DeleteSection
                                                    data={data}
                                                    setStructure={setStructure}
                                                    field={key}
                                                    readOnly={readOnly}
                                                />
                                            </>
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
            <span className="me-2">There is no data here yet!</span>
            {readOnly === false && (
                <AddSection
                    data={data}
                    setStructure={setStructure}
                    field={parent}
                    readOnly={readOnly}
                />
            )}
        </div>
    );
}
