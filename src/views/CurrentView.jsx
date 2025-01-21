import React, { useContext } from "react";
import { CurrentViewContext } from "../context/CurrentViewContext";
import HomeView from "./HomeView";
import StaffView from "./StaffView";
import AppointmentView from "./AppointmentView";

const CurrentView = () => {
    const KEY_HOME_VIEW = "home";
	const KEY_STAFF_VIEW = "staff";
    const KEY_APPOINTMENT_VIEW = "appointment";

    const { currentView } = useContext(CurrentViewContext);

    return (
        <React.Fragment>
            {currentView === KEY_HOME_VIEW && <HomeView />}
            {currentView === KEY_STAFF_VIEW && <StaffView />}
            {currentView === KEY_APPOINTMENT_VIEW && <AppointmentView />}
        </React.Fragment>
    );
};

export default CurrentView;