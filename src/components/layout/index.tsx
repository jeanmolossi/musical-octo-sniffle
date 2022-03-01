import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { HiOutlineViewGrid, HiOutlineUser } from "react-icons/hi";
import { Button } from "../../components/button";
import styles from "./styles.module.scss";
import { AuthProvider, useAuth } from "../../contexts/auth";

const LayoutComponent = () => {
	const { logout } = useAuth();

	return (
		<div className={styles.container}>
			<nav className={styles.sidebar}>
				<header>
					<span>Company</span>
				</header>

				<ul className={styles.menu}>
					<li>
						<NavLink to={"/home"}>
							<HiOutlineViewGrid size={20} /> Tasks
						</NavLink>
					</li>
					<li>
						<NavLink to={"/team"}>
							<HiOutlineUser size={20} />
							Team
						</NavLink>
					</li>
				</ul>

				<Button label="logout" onClick={logout} />
			</nav>
			<main className={styles.main}>
				<Outlet />
			</main>
		</div>
	);
};

export const Layout = () => {
	return (
		<AuthProvider>
			<LayoutComponent />
		</AuthProvider>
	);
};
