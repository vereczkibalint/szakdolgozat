import React from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import UserDetails from "../../components/UserDetails/UserDetails";

const UserDetailsPage = () => {
    const { id } = useParams();
    const student = useSelector(state => state.user.students.find(student => student._id === id));
    const lecturer = useSelector(state => state.user.lecturers.find(lecturer => lecturer._id === id));

    if(student) {
        return <UserDetails type="student" user={student} />;
    } else {
        return <UserDetails type="lecturer" user={lecturer} />;
    }
}

export default UserDetailsPage;