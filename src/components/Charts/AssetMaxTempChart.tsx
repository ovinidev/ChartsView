import { Asset } from "@interfaces/assets";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";

interface AssetMaxTempChartProps {
	data: Asset;
}

export const AssetMaxTempChart = ({ data }: AssetMaxTempChartProps) => {
	const maxTempDateHistory = [
		"18/06/2023",
		"15/07/2023",
		"22/07/2023",
		"23/08/2023",
		"30/08/2023",
	];

	const maxTemp = data.specifications.maxTemp;

	function generateRandomNumber() {
		return Math.floor(Math.random() * (maxTemp - 1) + 1);
	}

	function generateRandomMaxTempBasedOnMaxTemp() {
		const randomNumbers = [];

		for (let i = 0; i < maxTempDateHistory.length; i++) {
			randomNumbers.push(generateRandomNumber());
		}

		return randomNumbers;
	}

	const options = {
		chart: {
			type: "line",
			zoomType: "x",
		},
		title: {
			text: "Temperatura máxima ao longo do tempo",
		},
		xAxis: {
			categories: maxTempDateHistory,
		},
		yAxis: {
			title: {
				text: "Temperatura °C",
			},
			categories: generateRandomMaxTempBasedOnMaxTemp(),
		},
		series: [
			{
				name: data?.name,
				data: generateRandomMaxTempBasedOnMaxTemp(),
				color: "#1E3A8A",
			},
		],
	};

	return <HighchartsReact highcharts={Highcharts} options={options} />;
};
