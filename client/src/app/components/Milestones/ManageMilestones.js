import React, {useEffect} from "react";
import MilestoneListing from "./MilestoneListing";
import {useDispatch} from "react-redux";
import {milestoneClearState} from "../../actions/milestoneActions";

const ManageMilestones = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(milestoneClearState());
    }, [dispatch]);

    return (
        <div style={{width: "85%"}} className="mt-5 mx-auto">
            <h2 className="text-center mb-4">Mérföldkövek kezelése</h2>
            <MilestoneListing />
        </div>
    );
}

export default ManageMilestones;