import { useBreakpointValue } from "@chakra-ui/react";
import { Asset } from "@interfaces/assets";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";

interface AssetTotalUpTimeChartProps {
	data: Asset[];
}

export default function AssetTotalUpTimeChart({
	data,
}: AssetTotalUpTimeChartProps) {
	const isDesktop = useBreakpointValue({
		base: false,
		"9xl": true,
	});
	const assetsUpTime = data.map((asset) => asset.metrics.totalUptime);
	const collectsUpTime = data.map((asset) => asset.metrics.totalCollectsUptime);

	const options = {
		chart: {
			type: "line",
			height: isDesktop ? 320 : 500,
		},
		title: {
			text: "Exemplo de Gráfico de Linha com Duas Linhas",
		},
		xAxis: {
			categories: ["10h", "8h", "6h", "4h", "2h", "1h"],
		},
		yAxis: {
			title: {
				text: "Valores",
			},
		},
		series: [
			{
				name: "Tempo de atividade",
				data: assetsUpTime,
			},
			{
				name: "Tempo de coleta",
				data: collectsUpTime,
			},
		],
	};

	return <HighchartsReact highcharts={Highcharts} options={options} />;
}
