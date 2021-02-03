import React, {useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {fetchThesisByStudent} from "../../services/thesesService";
import {useDispatch, useSelector} from "react-redux";
import LoadingSpinner from "../../../common/components/Loading/LoadingSpinner";
import Form from "react-bootstrap/Form";
import Alert from "../../../common/components/Alert";
import {fetchAllMilestone} from "../../services/milestoneService";
import moment from "moment";
import {faCheckCircle, faFlag, faHourglass, faTimesCircle} from "@fortawesome/free-solid-svg-icons";

const OwnThesis = () => {
    const dispatch = useDispatch();

    let thesis = useSelector(state => state.theses.theses[0]);
    let milestones = useSelector(state => state.milestones.milestones);
    let thesisLoading = useSelector(state => state.theses.isLoading);
    let milestoneLoading = useSelector(state => state.milestones.isLoading);

    useEffect(() => {
        dispatch(fetchThesisByStudent());
    }, [dispatch]);

    useEffect(() => {
        if(thesis) {
            dispatch(fetchAllMilestone(thesis._id));
        }
    }, [dispatch, thesis]);

    if(thesisLoading || milestoneLoading) {
        return (
            <LoadingSpinner />
        );
    } else if(!thesisLoading && !thesis) {
      return (
          <Alert type="danger" message="Nincsen szakdolgozat az Ön felhasználójához rendelve!" />
      );
    } else {
        return (
            <div className="mt-5">
                <h2 className="text-center mb-3">Szakdolgozat adatlapja</h2>
                <div className="col-md-12" style={{width: '100%'}}>
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="font-weight-bold"><Form.Label htmlFor="title">Oktató</Form.Label></h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {thesis.lecturer.lastName + ' ' + thesis.lecturer.firstName} <br />
                                    Email: <a href={`mailto:${thesis.lecturer.email}`}>{thesis.lecturer.email}</a>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="font-weight-bold"><Form.Label htmlFor="title">Szakdolgozat témája</Form.Label></h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {thesis.topic}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="font-weight-bold"><Form.Label htmlFor="firstName">Szakdolgozat címe</Form.Label></h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {thesis.title}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="font-weight-bold">Mérföldkövek száma</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <div className="d-flex flex-md-row flex-column flex-wrap justify-content-between">
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            <FontAwesomeIcon icon={faFlag} title="Összesen" className="text-dark mb-1" style={{ fontSize: '120%'}} />
                                            <span className="font-weight-bolder text-dark">Összesen</span>
                                            <p><span className="font-weight-bolder">{milestones.length}</span> darab</p>
                                        </div>
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            <FontAwesomeIcon icon={faHourglass} title="Folyamatban" className="text-primary mb-1" style={{ fontSize: '120%'}} />
                                            <span className="font-weight-bolder text-primary">Folyamatban</span>
                                            <p><span className="text-primary font-weight-bolder">{milestones.filter(milestone => milestone.status === 'pending').length}</span> darab</p>
                                        </div>
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            <FontAwesomeIcon icon={faCheckCircle} title="Elfogadott" className="text-success mb-1" style={{ fontSize: '120%'}} />
                                            <span className="font-weight-bolder text-success">Elfogadott</span>
                                            <p><span className="text-success font-weight-bolder">{milestones.filter(milestone => milestone.status === 'accepted').length}</span> darab</p>
                                        </div>
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            <FontAwesomeIcon icon={faTimesCircle} title="Elutasított" className="text-danger mb-1" style={{ fontSize: '120%'}} />
                                            <span className="font-weight-bolder text-danger">Elutasított</span>
                                            <p><span className="text-danger font-weight-bolder">{milestones.filter(milestone => milestone.status === 'rejected').length}</span> darab</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="font-weight-bold">Létrehozás ideje</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {moment(thesis.createdAt).format('YYYY.MM.DD HH:mm')}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="font-weight-bold">Utolsó frissítés ideje</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {moment(thesis.updatedAt).format('YYYY.MM.DD HH:mm')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default OwnThesis;
