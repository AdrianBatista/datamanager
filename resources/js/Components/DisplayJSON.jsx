import { Fragment, useEffect, useState } from "react";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import AddSection from "./AddSection";

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
                        <div key={key} className={index > 0 ? "mt-3" : ""}>
                            <InputLabel htmlFor={key} value={key} />

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

                            {readOnly === false && (
                                <AddSection
                                    data={data}
                                    setStructure={setStructure}
                                    field={key}
                                    readOnly={readOnly}
                                />
                            )}
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
                                {key}
                                <div className="mt-3">
                                    {display(
                                        value,
                                        createSetter(setStructure, key),
                                        readOnly,
                                        key
                                    )}
                                </div>
                            </div>
                            {readOnly === false && (
                                <AddSection
                                    data={data}
                                    setStructure={setStructure}
                                    field={key}
                                    readOnly={readOnly}
                                />
                            )}
                        </Fragment>
                    );
            }
        })
    ) : (
        <>
            There is no data here yet!
            {readOnly === false && (
                <AddSection
                    data={data}
                    setStructure={setStructure}
                    field={parent}
                    readOnly={readOnly}
                />
            )}
        </>
    );
}
