import AppMainLayout from "../layouts/AppMainLayout";
import DashboardDoctors from "../components/DashboardDoctors";
import DashboardAppointments from "../components/DashboardAppointments";
import DashboardMedications from "../components/DashboardMedications";

const DashboardView = () => {
    return (
        <AppMainLayout>
            <DashboardDoctors />
            <DashboardAppointments />
            <DashboardMedications />
        </AppMainLayout>
    );
};

export default DashboardView;
