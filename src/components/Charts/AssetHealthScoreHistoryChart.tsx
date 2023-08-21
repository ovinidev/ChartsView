import { Asset } from "@interfaces/assets";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import { useEffect, useState } from "react";

interface AssetHealthScoreHistoryChartProps {
	data: Asset;
}

export const AssetHealthScoreHistoryChart = ({
	data,
}: AssetHealthScoreHistoryChartProps) => {
	const healthScoreDateHistory = [
		"16/06/2023",
		"09/07/2023",
		"20/07/2023",
		"03/08/2023",
		"12/08/2023",
	];

	const [healthScoreHistory, setHealthScoreHistory] = useState<number[]>([]);

	function generateRandomNumber(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	useEffect(() => {
		const randomNumbers = [];

		for (let i = 0; i < 5; i++) {
			const randomNumber = generateRandomNumber(0, 100);
			randomNumbers.push(randomNumber);
		}

		setHealthScoreHistory(randomNumbers);
	}, []);

	const options = {
		chart: {
			type: "area",
			zoomType: "x",
		},
		title: {
			text: "Saúde da máquina ao longo do tempo",
		},
		xAxis: {
			categories: healthScoreDateHistory.concat(healthScoreDateHistory),
		},
		yAxis: {
			title: {
				text: "Status",
			},
		},
		series: [
			{
				name: data?.name,
				data: healthScoreHistory.concat(healthScoreHistory),
				color: "#1E3A8A",
			},
		],
	};

	return <HighchartsReact highcharts={Highcharts} options={options} />;
};
