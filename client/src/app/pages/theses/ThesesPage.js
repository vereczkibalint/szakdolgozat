import React from 'react';
import {useSelector} from "react-redux";
import ManageTheses from "../../components/Theses/ManageTheses";

const ThesesPage = () => {
    const user = useSelector(state => state.auth.user);
    return (
        <div className="mt-3">
            {/* user.role === 'STUDENT' && <OwnThesis /> */}
            { user.role === 'LECTURER' && <ManageTheses /> }
        </div>
    );
}

export default ThesesPage;