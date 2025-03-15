import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import HomeView from "../views/HomeView"
import StaffView from "../views/StaffView"
import AppointmentView from "../views/AppointmentView"
import LoginView from "../views/LoginView";
import ProtectedRoute from './ProtectedRoute';
import DoctorProfileView from "../views/DoctorProfileView";
import SignUpPatientView from "../views/SignUpPatientView";

const AppRoutes = () => {
    return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/login" element={<LoginView />}></Route>
					<Route path="/patient-signup" element={<SignUpPatientView />}></Route>
					<Route path="/" element={
						<ProtectedRoute allowedRoles={["user", "doctor"]}>
							<HomeView />
						</ProtectedRoute>
					}>
					</Route>
					<Route path="/staff" element={
						<ProtectedRoute allowedRoles={["user", "doctor"]}>
							<StaffView />
						</ProtectedRoute>
					}>
					</Route>
					<Route path="/appointments" element={
						<ProtectedRoute allowedRoles={["user"]}>
							<AppointmentView />
						</ProtectedRoute>
					}>
					</Route>
					<Route path="/doctor" element={
						<ProtectedRoute allowedRoles={["doctor"]}>
							<DoctorProfileView />
						</ProtectedRoute>
					}>
					</Route>
				</Routes>
			</Router>
		</AuthProvider>
    );
};

export default AppRoutes;