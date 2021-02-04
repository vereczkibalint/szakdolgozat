import React, {useEffect, useState} from "react";
import Alert from "../../../common/components/Alert";
import { useHistory } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrash} from "@fortawesome/free-solid-svg-icons";
import {deleteStudent} from "../../services/userService";
import {useDispatch} from "react-redux";

const StudentsDatatable = ({ students }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [filterBy, setFilterBy] = useState('name');
    const [filterInput, setFilterInput] = useState('');
    const [filteredData, setFilteredData] = useState([...students]);

    useEffect(() => {
        const filterData = () => {
            switch(filterBy){
                case 'name':
                    setFilteredData(students.filter(user => user.firstName.toLowerCase().includes(filterInput.toLowerCase()) || user.lastName.toLowerCase().includes(filterInput.toLowerCase())));
                    break;
                case 'neptun':
                    setFilteredData(students.filter(user => user.neptun.toLowerCase().includes(filterInput.toLowerCase())));
                    break;
                case 'email':
                    setFilteredData(students.filter(user => user.email.toLowerCase().includes(filterInput.toLowerCase())));
                    break;
                default:
                    return;
            }
        }
        filterData();
    }, [students, filterBy, filterInput]);

    if(students.length === 0) {
        return <Alert type="danger" message="Nincsen felhasználó az adatbázisban!" />;
    }

    function handleDetailsClick(studentId) {
        history.push(`/user/students/${studentId}`);
    }

    function handleDelete(studentId) {
        if(window.confirm('Biztosan törölni szeretné ezt a hallgatót?')) {
            dispatch(deleteStudent(studentId));
        }
    }

    return (
        <>
            <div className="d-flex mb-3">
                <Form.Control className="w-auto mr-3" as="select" value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
                    <option value="name">Név alapján</option>
                    <option value="neptun">NEPTUN alapján</option>
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
                    <th>Teljes név</th>
                    <th>NEPTUN kód</th>
                    <th>Email</th>
                    <th>Műveletek</th>
                </tr>
                </thead>
                <tbody>
                { filteredData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td>{`${row.lastName} ${row.firstName}`}</td>
                        <td>{`${row.neptun}`}</td>
                        <td>{`${row.email}`}</td>
                        <td className='d-flex justify-content-around'>
                            <FontAwesomeIcon icon={faEye}
                                 className="text-primary"
                                 style={{fontSize: "18px"}}
                                 cursor="pointer"
                                 onClick={() => handleDetailsClick(row._id)}
                            />
                            <FontAwesomeIcon icon={faTrash}
                                 className="text-danger"
                                 style={{fontSize: "18px"}}
                                 cursor="pointer"
                                 onClick={() => handleDelete(row._id)}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
}

export default StudentsDatatable;