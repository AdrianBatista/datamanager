export default function Item({ text, url }) {
    return (
        <a className="block w-full p-3 rounded shadow flex gap-1" href={url}>
            {text}
        </a>
    );
}
