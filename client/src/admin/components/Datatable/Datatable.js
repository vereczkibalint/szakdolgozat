import React, { Fragment, useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteStudent, deleteLecturer, deleteAdmin} from '../../services/userService';

import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faTrash} from '@fortawesome/free-solid-svg-icons';

import Alert from '../../../common/components/Alert';

const Datatable = ({ headers, body, history }) => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
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
            switch(user.role) {
                case 'STUDENT':
                    dispatch(deleteStudent(user._id));
                    break;
                case 'LECTURER':
                    dispatch(deleteLecturer(user._id));
                    break;
                case 'ADMIN':
                    dispatch(deleteAdmin(user._id));
                    break;
                default:
                    break;
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
            <Table hover responsive>
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
                                <FontAwesomeIcon icon={faEye} className="text-primary" style={{ fontSize: '18px'}} cursor="pointer" onClick={() => handleDetailsClick(row)}/>
                                { row._id !== user._id && (
                                    <FontAwesomeIcon icon={faTrash} className="text-danger" style={{ fontSize: '18px'}} cursor="pointer" onClick={() => handleDeleteClick(row)}/>
                                ) }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Fragment>
    )
}

export default Datatable;
