import React from "react";
import { useHistory } from 'react-router-dom';
import GoBackButton from "../../../common/components/GoBackButton";
import CreateThesisForm from "../../components/Theses/CreateThesisForm";

const CreateThesis = () => {
    const history = useHistory();
    return (
        <div className="mt-4 w-75 mx-auto">
            <GoBackButton />
            <h1 className="text-center mb-4">Új szakdolgozat felvétele</h1>
            <CreateThesisForm history={history}/>
        </div>
    );
}

export default CreateThesis;