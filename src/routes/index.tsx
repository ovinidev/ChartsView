import { Route, Routes } from "react-router-dom";

export function MainRoutes() {
	return (
		<Routes>
			<Route path="/" element={<div />} />
			<Route path="*" element={<div />} />
		</Routes>
	);
}
