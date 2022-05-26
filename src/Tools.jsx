import React, { useState } from 'react'
import { render } from 'react-dom'

function Tools() {
    const [tableOutput, setTableOutput] = useState('');
    const updateTableInput = (value) => {
        let lines = value.split('\n');
        if (lines.length <= 1) {
            setTableOutput('内容不完整');
            return;
        }
        let columns = lines.splice(0, 1)[0].split('\t');
        if (!lines[lines.length - 1]) {
            lines.splice(lines.length - 1);
        }
        console.log('columns', columns);
        console.log('lines', lines);
        setTableOutput(JSON.stringify({
            columns: columns.map((element, i) => {
                return { code: `c${i}`, name: element, width: i == 0 ? 60 : null };
            }),
            data: lines.map((element) => {
                let row = element.split('\t');
                let data = {};
                row.forEach((e, i) => {
                    data[`c${i}`] = e;
                })
                return data;
            }),
        }, null, 2));
    }
    return (
        <>
            <textarea cols="30" rows="10" onChange={e => updateTableInput(e.target.value)}></textarea>
            <br />
            <textarea cols="30" rows="10" readOnly={true} value={tableOutput}></textarea>
        </>
    )
}

render(
    <Tools />,
    document.getElementById('root')
)
