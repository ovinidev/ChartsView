interface HealthHistoryItem {
	status: string;
	timestamp: Date;
}

interface Metrics {
	lastUptimeAt: Date;
	totalCollectsUptime: number;
	totalUptime: number;
}

interface Specifications {
	maxTemp: number;
	power?: number;
	rpm?: number | null;
}

export interface Asset {
	assignedUserIds: number[];
	companyId: number;
	healthHistory: HealthHistoryItem[];
	healthscore: number;
	id: number;
	image: string;
	metrics: Metrics;
	model: string;
	name: string;
	sensors: string[];
	specifications: Specifications;
	status: string;
	unitId: number;
}
