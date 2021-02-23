import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteStudent, deleteLecturer } from '../../services/userService';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

import Alert from '../../../common/components/Alert';

const Datatable = ({ headers, body, history }) => {
    const dispatch = useDispatch();

    const [filterBy, setFilterBy] = useState('name');
    const [filterInput, setFilterInput] = useState('');
    const [filteredData, setFilteredData] = useState([...body]);

    useEffect(() => {
        const filterData = () => {
            switch(filterBy){
                case 'name':
                    setFilteredData(body.filter(user => user.firstName.toLowerCase().includes(filterInput.toLowerCase()) || user.lastName.toLowerCase().includes(filterInput.toLowerCase())));
                    break;
                case 'neptun':
                    setFilteredData(body.filter(user => user.neptun.toLowerCase().includes(filterInput.toLowerCase())));
                    break;
                case 'email':
                    setFilteredData(body.filter(user => user.email.toLowerCase().includes(filterInput.toLowerCase())));
                    break;
                default:
                    return;
            }
        }
        filterData();
    }, [body, filterBy, filterInput]);

    function handleDetailsClick(user) {
        history.push(`/admin/dashboard/details/${user._id}`);
    }

    function handleDeleteClick(user) {
        if(window.confirm("Biztosan törli a felhasználót?")) {
            if(user.role === 'STUDENT') {
                dispatch(deleteStudent(user._id));
            } else {
                dispatch(deleteLecturer(user._id));
            }
        }
    }

    if(body.length === 0) {
        return <Alert type="danger" message="Nincsen felhasználó az adatbázisban!" />;
    }

    return (
        <Fragment>
            <div className="d-flex mb-3">
                <Form.Control className="w-auto mr-3" as="select" value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
                    <option value="name">Név alapján</option>
                    { headers.includes('NEPTUN kód') && (
                        <option value="neptun">NEPTUN alapján</option>
                    )}
                    <option value="email">Email alapján</option>
                </Form.Control>

                <Form.Control
                    type="text"
                    className="w-auto mr-3"
                    placeholder="Keresendő érték"
                    value={filterInput}
                    onChange={(e) => setFilterInput(e.target.value)}
                />
            </div>
            <Table hover bordered responsive>
                <thead>
                    <tr>
                        { headers.map((header, index) =>
                            <th key={index}>{header}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    { filteredData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>{`${row.lastName} ${row.firstName}`}</td>
                            { headers.includes('NEPTUN kód') && (
                                <td>{`${row.neptun}`}</td>
                            )}
                            <td>{`${row.email}`}</td>
                            <td className='d-flex justify-content-around'>
                                <Button variant='info' onClick={() => handleDetailsClick(row)}>
                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                </Button>
                                <Button variant='danger' onClick={() => handleDeleteClick(row)}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Fragment>
    )
}

export default Datatable;
