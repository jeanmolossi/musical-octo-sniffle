import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "../components/layout";
import { AuthProvider } from "../contexts/auth";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { Team } from "../pages/team";

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					index
					element={
						<AuthProvider>
							<Login />
						</AuthProvider>
					}
				/>
				<Route path="/" element={<Layout />}>
					<Route path="/home" element={<Home />} />
					<Route path="/team" element={<Team />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
