import { Route, Routes } from "react-router-dom";
import loadable from "@loadable/component";
import Assets from "@pages/Assets";
import Users from "@pages/Users";
import Units from "@pages/Companies";
import Companies from "@pages/Units";
const NotFound = loadable(() => import("@pages/NotFound"));

export function MainRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Assets />} />
			<Route path="/empresas" element={<Companies />} />
			<Route path="/unidades" element={<Units />} />
			<Route path="/usuarios" element={<Users />} />
			<Route path="/workoders" element={<div />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
