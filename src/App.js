import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css"
import Home from "./container/Home";
import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./components/Login";

const App = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const User =
			localStorage.getItem("user") !== "undefined"
				? JSON.parse(localStorage.getItem("user"))
				: localStorage.clear();

		if (!User) navigate("/login");
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Routes>
			<Route path='login' element={<Login />} />
			<Route path='/*' element={<Home />} />
		</Routes>
	);
};

export default App;
