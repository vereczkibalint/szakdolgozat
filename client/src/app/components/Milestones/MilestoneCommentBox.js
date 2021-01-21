import React, {Fragment} from "react";
import moment from 'moment';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {deleteMilestoneComment} from "../../services/milestoneService";

const MilestoneCommentBox = ({editComment, milestoneId, comment}) => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const handleCommentDelete = () => {
        if(window.confirm('Biztosan törölni szeretné a hozzászólást?')) {
            dispatch(deleteMilestoneComment(milestoneId, comment._id));
        }
    }

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
                                <FontAwesomeIcon icon={faPen} className="ml-2 text-primary" style={{cursor: 'pointer'}} onClick={() => editComment(comment)} />
                                <FontAwesomeIcon icon={faTrash} className="ml-2 text-danger" style={{cursor: 'pointer'}} onClick={() => handleCommentDelete()} />
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
}

export default MilestoneCommentBox;