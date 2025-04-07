import AppMainLayout from "../layouts/AppMainLayout";
import DashboardDoctors from "../components/DashboardDoctors";
import DashboardAppointments from "../components/DashboardAppointments";

const DashboardView = () => {
    return (
        <AppMainLayout>
            <DashboardDoctors />
            <DashboardAppointments />
        </AppMainLayout>
    );
};

export default DashboardView;
