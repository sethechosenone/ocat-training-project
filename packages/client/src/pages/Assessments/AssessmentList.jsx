/* eslint-disable no-extra-parens */
import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {
  const [ data, setData ] = useState([]);
  useEffect(() => {
    const fetchAssessments = async () => {
      setData(await AssessmentService.getList());
    };
    fetchAssessments();
  }, []);
  const columns = useMemo(() => [
    { Header: `Instrument Type`, accessor: `instrumentType` },
    { Header: `Cat Name`, accessor: `catName` },
    { Header: `Cat DOB`, accessor: `catDateOfBirth` },
    { Header: `Score`, accessor: `score` },
    { Header: `Risk Level`, accessor: `riskLevel` },
  ], []);

  // const { getTableBodyProps, getTableProps, headerGroups, prepareRow, rows } = useTable({ columns, assessments });
  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ border: `solid 1px` }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} style={{
                borderBottom: `solid 3px`,
                borderLeft: `solid 1px`,
                borderRight: `solid 1px`,
                borderTop: `solid 1px`,
                fontWeight: `bold`,
                padding: `10px`,
              }}>
                {column.render(`Header`)}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} style={{
                  border: `solid 1px`,
                  padding: `10px`,
                }}>
                  {cell.render(`Cell`)}
                </td>
              ))}
              <td>
                <button onClick={async () => {
                  const dataCopy = [ ...data ];
                  try {
                    await AssessmentService.delete(row.values);
                    dataCopy.splice(row.index, 1);
                    setData(dataCopy);
                  }
                  catch (err) {
                    alert(`Something went wrong trying to delete the entry: ${err}`);
                  }
                }}>
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
