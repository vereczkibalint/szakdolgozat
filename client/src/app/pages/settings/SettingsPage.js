import React from "react";
import ChangePasswordForm from "../../components/Settings/ChangePasswordForm";

const SettingsPage = () => {
    return (
        <div className="mt-4">
            <h2 className="text-center">Jelszó megváltoztatása</h2>
            <ChangePasswordForm />
        </div>
    );
}

export default SettingsPage;