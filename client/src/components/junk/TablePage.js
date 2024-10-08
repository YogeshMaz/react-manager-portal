import React from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import { useTable } from 'react-table'; // Assuming you're using react-table

const TablePage = () => {
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    
    const data = React.useMemo(
        () => [
            { field1: 'Value 1', field2: 'Value 2' },
            { field1: 'Value 3', field2: 'Value 4' },
        ],
        []
    ); // Sample data for the table

    const columns = React.useMemo(
        () => [
            {
                Header: 'Field 1',
                accessor: 'field1',
            },
            {
                Header: 'Field 2',
                accessor: 'field2',
            },
        ],
        []
    );

    const handleRowClick = (rowData) => {
        // Redirect to the form page with state
        navigate('/form', { state: { formData: rowData } }); // Updated to use navigate
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} onClick={() => handleRowClick(row.original)}>
                            {row.cells.map((cell) => (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TablePage;
