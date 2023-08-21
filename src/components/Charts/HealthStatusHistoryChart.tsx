import { Asset } from "@interfaces/assets";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";

interface HealthStatusHistoryChartProps {
	data: Asset;
}

export const HealthStatusHistoryChart = ({
	data,
}: HealthStatusHistoryChartProps) => {
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
		chart: {
			type: "line",
			zoomType: "x",
		},
		title: {
			text: "Status da máquina ao longo do tempo",
		},
		xAxis: {
			categories: healthHistoryTime.concat(healthHistoryTime),
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
				data: healthHistoryStatus.concat(healthHistoryStatus),
				color: "#1E3A8A",
			},
		],
	};

	return <HighchartsReact highcharts={Highcharts} options={options} />;
};
