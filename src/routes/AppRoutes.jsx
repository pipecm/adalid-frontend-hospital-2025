import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import HomeView from "../views/HomeView"
import StaffView from "../views/StaffView"
import AppointmentView from "../views/AppointmentView"
import LoginView from "../views/LoginView";
import ProtectedRoute from './ProtectedRoute';
import DoctorProfileView from "../views/DoctorProfileView";
import SignUpPatientView from "../views/SignUpPatientView";
import DashboardView from "../views/DashboardView";

const AppRoutes = () => {
    return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/login" 			element={<LoginView />}>		</Route>
					<Route path="/patient-signup" 	element={<SignUpPatientView />}></Route>

					<Route path="/" element={
						<ProtectedRoute allowedRoles={["patient", "doctor", "admin"]}>
							<HomeView />
						</ProtectedRoute>
					}>
					</Route>
					<Route path="/staff" element={
						<ProtectedRoute allowedRoles={["patient", "doctor", "admin"]}>
							<StaffView />
						</ProtectedRoute>
					}>
					</Route>
					<Route path="/appointments" element={
						<ProtectedRoute allowedRoles={["patient", "admin"]}>
							<AppointmentView />
						</ProtectedRoute>
					}>
					</Route>
					<Route path="/doctor" element={
						<ProtectedRoute allowedRoles={["doctor", "admin"]}>
							<DoctorProfileView />
						</ProtectedRoute>
					}>
					</Route>
					<Route path="/dashboard" element={
						<ProtectedRoute allowedRoles={["admin"]}>
							<DashboardView />
						</ProtectedRoute>
					}>
					</Route>
				</Routes>
			</Router>
		</AuthProvider>
    );
};

export default AppRoutes;