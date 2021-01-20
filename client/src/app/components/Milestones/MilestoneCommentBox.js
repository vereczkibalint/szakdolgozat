import React, {Fragment} from "react";
import moment from 'moment';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";

const MilestoneCommentBox = ({comment}) => {
    const user = useSelector(state => state.auth.user);
    return (
        <Fragment>
        <hr />
        <div className="p-2 mt-2">
            <div className="d-flex flex-row comment-row">
                <div className="p-2">
                    <span className="round">
                        <img src={`https://eu.ui-avatars.com/api/?name=${comment.author.lastName + '+' + comment.author.firstName}&size=48`} alt="user" width="50"/>
                    </span>
                </div>
                <div className="comment-text w-100">
                    <h5>{comment.author.lastName + ' ' + comment.author.firstName}</h5>
                    <div className="comment-footer">
                        <span className="date">{moment(comment.createdAt).format('YYYY.MM.DD. HH:mm')}</span>
                        {user._id === comment.author._id && (
                            <span>
                                <FontAwesomeIcon icon={faPen} className="ml-2 text-primary" style={{cursor: 'pointer'}} />
                                <FontAwesomeIcon icon={faTrash} className="ml-2 text-danger" style={{cursor: 'pointer'}}/>
                            </span>
                        )}
                    </div>
                    <p className="m-b-5 m-t-10" dangerouslySetInnerHTML={{
                        __html: comment.body
                    }} />
                </div>
            </div>
        </div>
        </Fragment>
    );
    {/*<div className="border border-dark w-100">
            <div className="d-flex align-items-center">
                <img src={`https://eu.ui-avatars.com/api/?name=${comment.author.lastName + '+' + comment.author.firstName}&size=48`} />
                <span className="ml-3 font-weight-bold">{ comment.author.lastName + ' ' + comment.author.firstName }</span>
                <span>Írta: {comment.createdAt}</span>
            </div>
        </div>*/}
}

export default MilestoneCommentBox;