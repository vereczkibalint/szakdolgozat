import React from 'react';
import {useSelector} from "react-redux";
import { useParams } from 'react-router-dom';

import UserDetails from "../../../common/components/UserDetails";

const UserDetailsPage = () => {
    const { studentId } = useParams();
    const student = useSelector(state => state.users.students.find(student => student._id === studentId));

    return <UserDetails type="student" user={student} />;
}

export default UserDetailsPage;