import React from 'react';
import { connect } from 'react-redux';

import { deleteStudent } from "../../services/studentService";

import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import Alert from "../Alert";

const Datatable = ({ headers, body, history, deleteStudent }) => {

    function handleDetailsClick(id) {
        history.push(`/admin/dashboard/students/${id}`);
    }

    function handleDeleteClick(id) {
        if(window.confirm("Biztosan törli a felhasználót?")) {
            deleteStudent(id);
        }
    }

    if(body.length === 0) {
        return <Alert type="danger" message="Nincsen hallgató az adatbázisban!" />;
    }

    return (
        <>
            <Table hover bordered responsive>
                <thead>
                    <tr>
                        { headers.map((header, index) =>
                            <th key={index}>{header}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    { body.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>{`${row.lastName} ${row.firstName}`}</td>
                            <td>{`${row.neptun}`}</td>
                            <td>{`${row.email}`}</td>
                            <td className='d-flex justify-content-around'>
                                <Button variant='info' onClick={() => handleDetailsClick(row._id)}>
                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                </Button>
                                <Button variant='danger' onClick={() => handleDeleteClick(row._id)}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default connect(null, { deleteStudent })(Datatable);
