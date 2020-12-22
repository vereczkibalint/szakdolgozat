import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllMilestone} from "../../services/milestoneService";
import LoadingSpinner from "../../../common/components/Loading/LoadingSpinner";
import Form from "react-bootstrap/Form";
import {fetchAllTheses} from "../../services/thesesService";
import Alert from "../../../common/components/Alert";
import {Table} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheckCircle, faEye,
    faHourglassHalf,
    faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

const ManageMilestones = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllTheses());
        dispatch(fetchAllMilestone());
    }, [dispatch]);

    const [thesisId, setThesisId] = useState('');
    const theses = useSelector(state => state.theses);
    const milestones = useSelector(state => state.milestones);
    const [filteredMilestones, setFilteredMilestones] = useState([...milestones.milestones]);

    useEffect(() => {
        const filterMilestones = () => {
            setFilteredMilestones(milestones.milestones.filter(milestone => milestone.thesis._id === thesisId));
        }
        if(thesisId !== ''){
            filterMilestones();
        }
    }, [thesisId, milestones.milestones]);

    return (
        <div className="mt-4 w-auto mx-auto">
            <h2 className="text-center mb-3">Mérföldkövek kezelése</h2>
            <Form.Group>
                <Form.Label htmlFor="thesisIdSelect">Szakdolgozat:</Form.Label>
                <Form.Control
                    id="thesisIdSelect"
                    as="select"
                    disabled={theses.isLoading}
                    onChange={(e) => setThesisId(e.target.value)}
                >
                    <option value="" key="">Kérem válasszon!</option>
                    { theses.theses.map(thesis => (
                        <option value={thesis._id} key={thesis._id}>{thesis.student.lastName.concat(' ',thesis.student.firstName)}</option>
                      ))
                    }
                </Form.Control>
            </Form.Group>

            { milestones.isLoading &&
                <div className="d-flex align-content-center justify-content-center mt-5">
                    <LoadingSpinner />
                </div>
            }

            { !milestones.isLoading && milestones.length === 0 ? (
                <Alert type="danger" message="Nem található mérföldkő az adatbázisban!" />
            ) :
                <Table hover responsive className="text-center">
                    <thead>
                        <tr>
                            <td>Sorszám</td>
                            <td>Hallgató neve</td>
                            <td>Szakdolgozat címe</td>
                            <td>Mérföldkő megnevezése</td>
                            <td>Állapot</td>
                            <td>Műveletek</td>
                        </tr>
                    </thead>
                    <tbody>
                    { filteredMilestones.map((milestone, index) => (
                        <tr key={milestone._id}>
                            <td>{index+1}</td>
                            <td>{milestone.thesis.student.lastName.concat(' ', milestone.thesis.student.firstName)}</td>
                            <td>{milestone.thesis.title}</td>
                            <td>{milestone.title}</td>
                            <td>
                                {
                                    {
                                        'pending': <FontAwesomeIcon title="Folyamatban" icon={faHourglassHalf} />,
                                        'accepted': <FontAwesomeIcon title="Elfogadva" style={{color: 'green'}} icon={faCheckCircle} />,
                                        'rejected': <FontAwesomeIcon title="Elutasítva" style={{color: 'red'}} icon={faTimesCircle} />
                                    }[milestone.status]
                                }
                            </td>
                            <td className="d-flex justify-content-around align-content-center">
                                <FontAwesomeIcon style={{color: 'blue', fontSize: '18px', cursor: 'pointer'}} icon={faEye} />
                            </td>
                        </tr>
                      ))
                    }
                    </tbody>
                </Table>
            }
        </div>
    );
}

export default ManageMilestones;