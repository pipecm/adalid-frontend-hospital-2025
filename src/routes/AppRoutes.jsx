import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import HomeView from "../views/HomeView"
import StaffView from "../views/StaffView"
import AppointmentView from "../views/AppointmentView"
import LoginView from "../views/LoginView";
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
    return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/login" element={<LoginView />}></Route>
					<Route path="/" element={
						<ProtectedRoute allowedRoles={["admin", "user"]}>
							<HomeView />
						</ProtectedRoute>
					}>
					</Route>
					<Route path="/staff" element={
						<ProtectedRoute allowedRoles={["admin", "user"]}>
							<StaffView />
						</ProtectedRoute>
					}>
					</Route>
					<Route path="/appointments" element={
						<ProtectedRoute allowedRoles={["admin", "user"]}>
							<AppointmentView />
						</ProtectedRoute>
					}>
					</Route>
				</Routes>
			</Router>
		</AuthProvider>
    );
};

export default AppRoutes;