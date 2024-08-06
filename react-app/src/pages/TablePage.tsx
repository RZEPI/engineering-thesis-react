import { useState } from "react"

export default function TablePage() {
    const [TableContent, setContent] = useState<[number, string, number][]>([[0, "Marcel", 130]])

    const TableList = TableContent.map(tuple =>
        <tr>
            <td>{tuple[0]}</td>
            <td>{tuple[1]}</td>
            <td>{tuple[2]}</td>
        </tr>
    )

    function addRecord()
    {
        const newTuple: [number, string, number] = [55, "Tomek", 456];
        setContent([...TableContent, newTuple]);
    }

    return (
        <div>
            <table>
                {TableList}
            </table>
            <button onClick={addRecord}>Add</button>
        </div>
    );
}
