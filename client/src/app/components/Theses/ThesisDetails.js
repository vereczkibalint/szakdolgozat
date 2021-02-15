import React from "react";
import Form from "react-bootstrap/Form";
import moment from "moment";

const ThesisDetails = ({thesis}) => {
    return (
        <div className="col-md-12 mt-3">
            <div className="card mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="font-weight-bold"><Form.Label htmlFor="title">Hallgató</Form.Label></h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {thesis.student.lastName + ' ' + thesis.student.firstName} <br />
                            Email: <a href={`mailto:${thesis.student.email}`}>{thesis.student.email}</a>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="font-weight-bold"><Form.Label htmlFor="title">Szakdolgozat témája</Form.Label></h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {thesis.topic.title}
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
    );
}

export default ThesisDetails;