import { Asset } from "@interfaces/assets";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";

interface HealthHistoryChartsProps {
	data: Asset;
}

export const HealthHistoryCharts = ({ data }: HealthHistoryChartsProps) => {
	const categories = [
		"inOperation",
		"inDowntime",
		"inAlert",
		"plannedStop",
		"unplannedStop",
	];

	const healthHistoryStatus = data?.healthHistory.map((asset) => {
		const status = asset.status;

		const categoryIndex = categories.indexOf(status);

		return categoryIndex;
	});

	const healthHistoryTime = data?.healthHistory.map((asset) => {
		return new Date(asset.timestamp).toLocaleDateString("pt-BR", {
			timeZone: "UTC",
		});
	});

	const options = {
		title: {
			text: "Saúde da máquina ao longo do tempo",
		},
		xAxis: {
			categories: healthHistoryTime,
		},
		yAxis: {
			title: {
				text: "Status",
			},
			categories,
		},
		series: [
			{
				name: data?.name,
				data: healthHistoryStatus,
			},
		],
	};
	return <HighchartsReact highcharts={Highcharts} options={options} />;
};
