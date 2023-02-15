import React from 'react'
import { Table } from 'react-bootstrap';

const results = () => {  return (
    // so i want just a table with P1, P2, P3, P4, P5, and P6 classes
    // remember this is tentative, just plead with counselor to switch stuff around
    <div className='display-3'
    style={{
      textAlign: 'center',
      marginTop: '6rem'
    }}
    >
      <Table bordered>
        <thead>
          <tr>
            <th colSpan={7}>Classes (tentative list)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Class 1</td>
            <td>Class 2</td>
            <td>Class 3</td>
            <td>Class 4</td>
            <td>Class 5</td>
            <td>Class 6</td>
            <td>Class 7</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default results