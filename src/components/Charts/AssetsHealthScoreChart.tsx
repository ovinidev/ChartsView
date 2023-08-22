import { useBreakpointValue } from "@chakra-ui/react";
import { Asset } from "@interfaces/assets";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";

interface AssetsHealthScoreChartProps {
	data: Asset[];
}

export default function AssetsHealthScoreChart({
	data,
}: AssetsHealthScoreChartProps) {
	const isDesktop = useBreakpointValue({
		base: false,
		"9xl": true,
	});

	const options = {
		chart: {
			type: "column",
			zoomType: "x",
			width: isDesktop ? 1720 : 480,
		},
		title: {
			text: "Saúde das máquinas",
		},
		xAxis: {
			categories: data?.map((asset) => asset.name),
		},
		yAxis: {
			title: {
				text: "Valores",
			},
		},
		series: [
			{
				name: "Saúde da máquina",
				data: data?.map((asset) => asset.healthscore),
				color: "#1E3A8A",
			},
		],
	};

	return <HighchartsReact highcharts={Highcharts} options={options} />;
}
