import React, { useRef, useState } from 'react'
import { render } from 'react-dom'

function Tools() {
  const tableInputRef = useRef([]);
  const [tableOutput, setTableOutput] = useState('');
  const tables = ['工科专业', '工科大类', '优势专业', '工科在校生'];
  const updateTableInput = (value, tableIndex) => {
    tableInputRef.current[tableIndex] = formatData(value, tableIndex);
    setTableOutput(JSON.stringify(tableInputRef.current.filter(e => e), null, 2));
  }
  const formatData = (value, tableIndex) => {
    let lines = value.split('\n');
    if (lines.length <= 1) {
      return null;
    }
    let columns = lines.splice(0, 1)[0].split('\t');
    if (!lines[lines.length - 1]) {
      lines.splice(lines.length - 1);
    }
    // console.log('columns', columns);
    // console.log('lines', lines);
    let data = {
      name: tables[tableIndex],
      columns: columns.map((element, i) => {
        return { code: `c${i+1}`, name: element, width: i == 0 ? 60 : null };
      }),
      data: lines.map((element) => {
        let row = element.split('\t');
        let data = {};
        row.forEach((e, i) => {
          data[`c${i+1}`] = e;
        })
        return data;
      }),
    }
    if (tableIndex == tables.length - 1) {
      // 在校生人数求和
      let sum = 0;
      data.data.forEach(row => {
        console.log(row);
        sum += parseInt(row[`c${data.columns.length}`]);
      })
      data.num = sum;
    } else {
      data.num = data.data.length;
    }
    data.data.push({
      c1: '合计',
      [`c${data.columns.length}`]: data.num,
    });
    return data;
  }
  return (
    <>
      {
        tables.map((name, i) => {
          return (
            <div key={`input-${i}`} style={{ display: 'inline-block', margin: '1rem' }}>
              <p>{name}</p>
              <textarea cols="30" rows="10" onChange={e => updateTableInput(e.target.value, i)}></textarea>
            </div>
          )
        })
      }
      <div style={{ margin: '1rem' }}>
        <p>Output</p>
        <textarea cols="30" rows="10" readOnly={true} value={tableOutput}></textarea>
      </div>
    </>
  )
}

render(
  <Tools />,
  document.getElementById('root')
)
