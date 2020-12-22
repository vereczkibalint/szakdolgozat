import React from "react";
import {useSelector} from "react-redux";

import ManageMilestones from "../../components/Milestones/ManageMilestones";

const MilestonePage = () => {
    const role = useSelector(state => state.auth.user.role);
    return (
        <div className="mt-3">
            { /* role === 'STUDENT' && <OwnMilestones /> */ }
            { role === 'LECTURER' && <ManageMilestones /> }
        </div>
    );
}

export default MilestonePage;