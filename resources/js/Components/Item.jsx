export default function Item({ text, url, actions }) {
    return (
        <a
            className="block w-full p-3 rounded shadow flex justify-between items-center"
            href={url}
        >
            <p>{text}</p>
            {actions}
        </a>
    );
}
