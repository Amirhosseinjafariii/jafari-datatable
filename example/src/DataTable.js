import React, { useState } from 'react';
import './style.css';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function DataTable({ data, columns, theme, deleteButton }) {
    const [tableData, setTableData] = useState(data);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [currentRow, setCurrentRow] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [modalColorClass, setModalColorClass] = useState('');

    const handleDeleteRow = (index) => {
        setTableData((prevData) => prevData.filter((_, i) => i !== index));
    };

    const handleOpenModal = (row, index) => {
        setCurrentRow(row);
        setCurrentIndex(index);
        setIsOpen(true);

        // Set the modal color class based on the table's theme
        switch (theme) {
            case 'green':
                setModalColorClass('green-modal');
                break;
            case 'blue':
                setModalColorClass('blue-modal');
                break;
            case 'orange':
                setModalColorClass('orange-modal');
                break;
            case 'purple':
                setModalColorClass('purple-modal');
                break;
            default:
                setModalColorClass('');
                break;
        }
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setCurrentRow(null);
        setCurrentIndex(null);
        setModalColorClass('');
    };
    // const handleDeleteRow = (index) => {
    //     setTableData((prevData) => prevData.filter((_, i) => i !== index));
    // };

    // const handleOpenModal = (row, index) => {
    //     setCurrentRow(row);
    //     setCurrentIndex(index);
    //     setIsOpen(true);
    // };

    // const handleCloseModal = () => {
    //     setIsOpen(false);
    //     setCurrentRow(null);
    //     setCurrentIndex(null);
    // };

    const handleChange = (e, key) => {
        const { type, value, checked } = e.target;
        setCurrentRow((prevRow) => ({
            ...prevRow,
            [key]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value),
        }));
    };

    const handleSave = () => {
        setTableData((prevData) =>
            prevData.map((row, index) => (index === currentIndex ? currentRow : row))
        );
        handleCloseModal();
    };

    const columnHeaders = columns || (data.length > 0 ? Object.keys(data[0]) : []);
    const headers = (data.length > 0 ? Object.keys(data[0]) : []);


    const getKeyFromHeader = (header) => {
        const lowerHeader = header.toLowerCase().replace(/ /g, "");
        const key = Object.keys(data[0]).find((k) => k.toLowerCase() === lowerHeader);
        return key || header;
    };

    const determineInputType = (value) => {
        if (typeof value === 'boolean') return 'checkbox';
        if (typeof value === 'number') return 'number';
        return 'text';
    };

    return (
        <>
            <table className={theme} border="1">
                <thead>
                    <tr>
                        {columnHeaders.map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                        {deleteButton && <th>Delete</th>}
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {headers.map((header, cellIndex) => {
                                const key = getKeyFromHeader(header);
                                return (
                                    <td key={cellIndex}>
                                        {typeof row[key] === 'boolean' ? (
                                            <input
                                                type="checkbox"
                                                checked={row[key]}
                                                readOnly
                                            />
                                        ) : (
                                            row[key]
                                        )}
                                    </td>
                                );
                            })}
                            {deleteButton && (
                                <td>
                                    <button onClick={() => handleDeleteRow(rowIndex)}>Delete</button>
                                </td>
                            )}
                            <td>
                                <button onClick={() => handleOpenModal(row, rowIndex)}>Open Modal</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Table content */}
            {currentRow && (
                <div
                    className={`modal ${modalColorClass}`}
                    style={{ display: modalIsOpen ? 'block' : 'none' }}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Edit Row</h2>
                            <button className="close-button" onClick={handleCloseModal}>
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            {headers.map((header) => {
                                const key = getKeyFromHeader(header);
                                const inputType = determineInputType(currentRow[key]);
                                return (
                                    <div key={header}>
                                        <label>{header}:</label>
                                        {inputType === 'checkbox' ? (
                                            <input
                                                type="checkbox"
                                                checked={currentRow[key]}
                                                onChange={(e) => handleChange(e, key)}
                                            />
                                        ) : (
                                            <input
                                                type={inputType}
                                                value={currentRow[key]}
                                                onChange={(e) => handleChange(e, key)}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleSave}>Save</button>
                            <button onClick={handleCloseModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}

export default DataTable;
