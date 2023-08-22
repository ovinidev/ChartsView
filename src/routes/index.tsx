import { Route, Routes } from "react-router-dom";
import loadable from "@loadable/component";
import Assets from "@pages/Assets";
import Users from "@pages/Users";
import Companies from "@pages/Companies";
import Units from "@pages/Units";
import WorkOrders from "@pages/WorkOrders";
import Home from "@pages/Home";
import UserDetails from "@pages/UserDetails";
import UnitDetails from "@pages/UnitDetails";
import AssetDetails from "@pages/AssetDetails";
import WorkOrderDetails from "@pages/WorkOrderDetails";
import { useAuth } from "@contexts/useAuth";
const NotFound = loadable(() => import("@pages/NotFound"));
const Login = loadable(() => import("@pages/Login"));

export function MainRoutes() {
	const { accountInfo } = useAuth();

	if (accountInfo.isAuthenticated) {
		return (
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/maquinas" element={<Assets />} />
				<Route path="/maquinas/:assetId" element={<AssetDetails />} />
				<Route path="/empresas" element={<Companies />} />
				<Route path="/unidades" element={<Units />} />
				<Route path="/unidades/:unityId" element={<UnitDetails />} />
				<Route path="/usuarios" element={<Users />} />
				<Route path="/usuarios/:userId" element={<UserDetails />} />
				<Route path="/servicos" element={<WorkOrders />} />
				<Route path="/servicos/:workOrderId" element={<WorkOrderDetails />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		);
	}

	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
