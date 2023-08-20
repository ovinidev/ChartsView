import { Asset } from "@interfaces/assets";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";

interface AssetStatusChartProps {
	data: Asset[];
}

export const AssetStatusChart = ({ data }: AssetStatusChartProps) => {
	const inOperationsCount = data.filter(
		(asset) => asset.status === "inOperation",
	).length;
	const inDowntimeCount = data.filter(
		(asset) => asset.status === "inDowntime",
	).length;
	const inAlertCount = data.filter(
		(asset) => asset.status === "inAlert",
	).length;
	const plannedStopCount = data.filter(
		(asset) => asset.status === "plannedStopCount",
	).length;
	const unplannedStopCount = data.filter(
		(asset) => asset.status === "unplannedStopCount",
	).length;

	const options = {
		chart: {
			type: "pie",
		},
		title: {
			text: "Status atual das máquinas",
		},
		series: [
			{
				name: "Status das máquinas",
				colorByPoint: true,
				data: [
					{
						name: "Em operação",
						y: inOperationsCount,
					},
					{
						name: "Paradas",
						y: inDowntimeCount,
					},
					{
						name: "Em alerta",
						y: inAlertCount,
					},
					{
						name: "Parada planejada",
						y: plannedStopCount,
					},
					{
						name: "Não planejado",
						y: unplannedStopCount,
					},
				],
			},
		],
	};

	return <HighchartsReact highcharts={Highcharts} options={options} />;
};
