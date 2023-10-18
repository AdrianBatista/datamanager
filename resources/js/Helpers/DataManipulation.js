export function getFieldType(fieldValue) {
    if (typeof fieldValue === "string") return "Text";
    if (Array.isArray(fieldValue)) return "Table";
    return "Section";
}
