import React from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import UserDetails from "../../../common/components/UserDetails";

const UserDetailsPage = () => {
    const { id } = useParams();
    const student = useSelector(state => state.users.students.find(student => student._id === id));
    const lecturer = useSelector(state => state.users.lecturers.find(lecturer => lecturer._id === id));
    const admin = useSelector(state => state.users.admins.find(admin => admin._id === id));

    if(student) {
        return <UserDetails type="student" user={student} />;
    } else if(lecturer) {
        return <UserDetails type="lecturer" user={lecturer} />;
    } else {
        return <UserDetails type="admin" user={admin} />;
    }
}

export default UserDetailsPage;
