import React, { useContext } from "react";
import { MenuContext } from "../context/MenuContext";
import HomeView from "./HomeView";
import StaffView from "./StaffView";
import AppointmentView from "./AppointmentView";

const CurrentView = () => {
    const KEY_HOME_VIEW = "home";
	const KEY_STAFF_VIEW = "staff";
    const KEY_APPOINTMENT_VIEW = "appointment";
	const KEY_CONTACT_VIEW = "contact";

    const { currentView } = useContext(MenuContext);

    return (
        <React.Fragment>
            {currentView === KEY_HOME_VIEW && <HomeView />}
            {currentView === KEY_STAFF_VIEW && <StaffView />}
            {currentView === KEY_APPOINTMENT_VIEW && <AppointmentView />}
        </React.Fragment>
    );
};

export default CurrentView;