import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Table, Form, Button, InputGroup, FormControl} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck, faPen, faPlus, faTimes, faTrash} from '@fortawesome/free-solid-svg-icons';
import moment from "moment";
import Alert from "../../../common/components/Alert";
import {deleteThesisTheme, insertThesisTheme, updateThesisTheme} from "../../services/thesesThemeService";

const ThesisDatatable = ({ headers, body }) => {
    const dispatch = useDispatch();

    const userId = useSelector(state => state.auth.user._id);

    const [newThesisTheme, setNewThesisTheme] = useState('');

    const [filterInput, setFilterInput] = useState('');
    const [filteredData, setFilteredData] = useState([...body]);

    const [editMode, setEditMode] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [themeToUpdate, setThemeToUpdate] = useState('');

    useEffect(() => {
        const filterData = () => {
            setFilteredData(body.filter(thesis => thesis.title.toLowerCase().includes(filterInput.toLowerCase())));
        }
        filterData();
    }, [body, filterInput]);

    const canSubmit = newThesisTheme && newThesisTheme.length >= 5;

    function handleThemeCreate() {
        if(canSubmit) {
            let newTheme = {
                lecturer: userId,
                title: newThesisTheme
            };
            dispatch(insertThesisTheme(newTheme));
        }
    }

    function handleDeleteClick(themeId) {
        if(window.confirm("Biztosan törli a témát?")) {
            dispatch(deleteThesisTheme(themeId));
        }
    }

    function toggleEditMode(theme) {
        setEditMode(prevState => !prevState);
        setThemeToUpdate(theme);
        setUpdatedTitle(theme.title);
    }

    const canUpdate = updatedTitle && updatedTitle.length >= 5;

    function handleTitleUpdateSave() {
        if(canUpdate) {
            let updatedTheme = {
                _id: themeToUpdate._id,
                title: updatedTitle
            };
            dispatch(updateThesisTheme(updatedTheme));
            toggleEditMode(themeToUpdate);
        }
    }

    return (
        <>
            <div className="d-flex flex-md-row flex-column justify-content-between mb-3">
                <InputGroup className="mb-3 w-auto">
                    <FormControl
                        placeholder="Új téma megnevezése (legalább 5 karakter)"
                        className="w-50"
                        onChange={(e) => setNewThesisTheme(e.target.value)}
                    />
                    <InputGroup.Append>
                        <Button variant="success" onClick={() => handleThemeCreate()} disabled={!canSubmit}>
                            <FontAwesomeIcon icon={faPlus}/> Felvétel
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
                <Form.Control
                    type="text"
                    className="w-auto mr-3"
                    placeholder="Szűrés név alapján"
                    value={filterInput}
                    onChange={(e) => setFilterInput(e.target.value)}
                />
            </div>
            { body.length === 0 && (
                <Alert type="danger" message="Nincsen rögzített szakdolgozati téma!"/>
            )}
            { body.length > 0 && filteredData.length === 0 && (
                <Alert type="danger" message="Nincsen szakdolgozati téma a megadott feltétellel!"/>
            )}
            <Table hover responsive className="text-center">
                <thead>
                <tr>
                    { headers.map((header, index) =>
                        <th key={index}>{header}</th>
                    )}
                </tr>
                </thead>
                <tbody>
                { filteredData.length > 0 && filteredData.map((row, rowIndex) => {
                    if(editMode && themeToUpdate._id === row._id) {
                        return (
                            <tr key={rowIndex}>
                                <td>
                                    <Form.Control
                                        value={updatedTitle}
                                        isInvalid={updatedTitle.length <5}
                                        onChange={(e) => setUpdatedTitle(e.target.value)} />
                                    <Form.Text className="text-muted text-left">
                                        Legalább 5 karakter.
                                    </Form.Text>
                                </td>
                                <td>{moment(row.createdAt).format('YYYY.MM.DD HH:mm')}</td>
                                <td className='d-flex justify-content-around'>
                                    <FontAwesomeIcon icon={faCheck}
                                         className="text-success"
                                         style={{fontSize: '18px'}}
                                         cursor="pointer"
                                         onClick={() => handleTitleUpdateSave()} />

                                    <FontAwesomeIcon icon={faTimes}
                                         className="text-danger"
                                         style={{fontSize: '18px'}}
                                         cursor="pointer"
                                         onClick={() => toggleEditMode(row)}/>
                                </td>
                            </tr>
                        );
                    } else {
                        return (
                            <tr key={rowIndex}>
                                <td>{row.title}</td>
                                <td>{moment(row.createdAt).format('YYYY.MM.DD HH:mm')}</td>
                                <td className='d-flex justify-content-around'>
                                    <FontAwesomeIcon icon={faPen}
                                         className="text-primary"
                                         style={{fontSize: '18px'}}
                                         cursor="pointer"
                                         onClick={() => toggleEditMode(row)}/>

                                    <FontAwesomeIcon icon={faTrash}
                                         className="text-danger"
                                         style={{fontSize: '18px'}}
                                         cursor="pointer"
                                         onClick={() => handleDeleteClick(row._id)}/>
                                </td>
                            </tr>
                        );
                    }
                })}
                </tbody>
            </Table>
        </>
    )
}

export default ThesisDatatable;
