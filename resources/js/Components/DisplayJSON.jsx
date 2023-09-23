import { useEffect, useState } from "react";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";

export default function DisplayJSON({ structure, readOnly, setData }) {
    const [localStructure, setStructure] = useState(structure);

    useEffect(() => {
        setData && !readOnly ? setData("structure", localStructure) : null;
    }, [localStructure]);

    return structure ? (
        display(localStructure, setStructure, readOnly)
    ) : (
        <>There is no data here yet!</>
    );
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

function display(data, setStructure, readOnly) {
    return Object.entries(data).map(([key, value], index) => {
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
                    </div>
                );

            case "object":
                return (
                    <div
                        key={key}
                        className={`${index > 0 ? "mt-5" : ""} shadow p-4`}
                    >
                        {key}
                        <div className="mt-3">
                            {display(
                                value,
                                createSetter(setStructure, key),
                                readOnly
                            )}
                        </div>
                    </div>
                );
        }
    });
}
