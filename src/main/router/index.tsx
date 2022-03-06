import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/presentation/components/layout";
import { AuthProvider } from "@/presentation/contexts/auth";
import { Home } from "@/presentation/pages/home";
import { Login } from "@/presentation/pages/login";
import { Team } from "@/presentation/pages/team";

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
