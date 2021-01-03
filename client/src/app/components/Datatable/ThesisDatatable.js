import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteThesis } from "../../services/thesesService";

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

import Alert from "../../../common/components/Alert";

const ThesisDatatable = ({ headers, body, history }) => {
    const dispatch = useDispatch();

    const [filterBy, setFilterBy] = useState('student');
    const [filterInput, setFilterInput] = useState('');
    const [filteredData, setFilteredData] = useState([...body]);

    useEffect(() => {
        const filterData = () => {
            switch(filterBy){
                case 'student':
                    setFilteredData(body.filter(thesis => thesis.student.lastName.concat(' ', thesis.student.firstName).includes(filterInput)));
                    break;
                case 'topic':
                    setFilteredData(body.filter(thesis => thesis.topic.toLowerCase().includes(filterInput.toLowerCase())));
                    break;
                case 'title':
                    setFilteredData(body.filter(thesis => thesis.title.toLowerCase().includes(filterInput.toLowerCase())));
                    break;
                default:
                    return;
            }
        }
        filterData();
    }, [body, filterBy, filterInput]);

    function handleDetailsClick(thesis) {
        history.push(`/user/theses/details/${thesis._id}`);
    }

    function handleDeleteClick(thesis) {
        if(window.confirm("Biztosan törli a szakdolgozatot?")) {
            dispatch(deleteThesis(thesis._id));
        }
    }

    if(body.length === 0) {
        return <Alert type="danger" message="Nincsen szakdolgozat az adatbázisban!"/>;
    }

    return (
        <>
            <div className="d-flex mb-3">
                <Form.Control className="w-auto mr-3" as="select" value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
                    <option value="student">Hallgató alapján</option>
                    <option value="topic">Téma alapján</option>
                    <option value="title">Cím alapján</option>
                </Form.Control>

                <Form.Control
                    type="text"
                    className="w-auto mr-3"
                    placeholder="Keresendő érték"
                    value={filterInput}
                    onChange={(e) => setFilterInput(e.target.value)}
                />
            </div>
            <Table hover responsive className="text-center">
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
                        <td>{row.student.lastName.concat(' ', row.student.firstName)}</td>
                        <td>{row.topic}</td>
                        <td>{row.title}</td>
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
        </>
    )
}

export default ThesisDatatable;
