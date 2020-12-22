import React from 'react';
import {useSelector} from "react-redux";
import ManageTheses from "../../components/Theses/ManageTheses";

const ThesesPage = () => {
    const role = useSelector(state => state.auth.user.role);
    return (
        <div className="mt-3">
            {/* role === 'STUDENT' && <OwnThesis /> */}
            { role === 'LECTURER' && <ManageTheses /> }
        </div>
    );
}

export default ThesesPage;