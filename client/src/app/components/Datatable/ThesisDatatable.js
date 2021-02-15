import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteThesis } from "../../services/thesesService";
import {Table, Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faTrash} from '@fortawesome/free-solid-svg-icons';

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
                    setFilteredData(body.filter(thesis => thesis.student.lastName.concat(' ', thesis.student.firstName).toLowerCase().includes(filterInput.toLowerCase())));
                    break;
                case 'topic':
                    setFilteredData(body.filter(thesis => thesis.topic.title.toLowerCase().includes(filterInput.toLowerCase())));
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

    function handleDetailsClick(thesisId) {
        history.push(`/user/theses/${thesisId}`);
    }

    function handleDeleteClick(thesisId) {
        if(window.confirm("Biztosan törli a szakdolgozatot?")) {
            dispatch(deleteThesis(thesisId));
        }
    }

    if(body.length === 0) {
        return <Alert type="danger" message="Nincsen szakdolgozat az adatbázisban!"/>;
    }

    return (
        <Fragment>
            <div className="d-flex flex-md-row flex-column mb-3">
                <Form.Control className="w-auto mr-3 mb-3" as="select" value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
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
                        <td>{row.topic.title}</td>
                        <td>{row.title}</td>
                        <td className='d-flex justify-content-around'>
                            <FontAwesomeIcon icon={faEye}
                                className="text-primary"
                                style={{fontSize: '18px'}}
                                cursor="pointer"
                                onClick={() => handleDetailsClick(row._id)}
                            />
                            <FontAwesomeIcon icon={faTrash}
                                className="text-danger"
                                style={{fontSize: '18px'}}
                                cursor="pointer"
                                onClick={() => handleDeleteClick(row._id)}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Fragment>
    )
}

export default ThesisDatatable;
